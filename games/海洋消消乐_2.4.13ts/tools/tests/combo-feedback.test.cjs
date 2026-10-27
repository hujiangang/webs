const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '../..');

function load(file, dependencies, globals = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => {
    if (!(name in dependencies)) throw new Error('Unexpected dependency: ' + name);
    return dependencies[name];
  }, console: { warn() {} }, ...globals }, { filename: file });
  return exports;
}

function harness() {
  const requests = [], tweens = [], freed = [], sounds = [], nodes = [], pool = [];
  class Sprite { constructor() { this.enabled = true; } }
  Sprite.SizeMode = { CUSTOM: 0 };
  class Label { constructor() { this.enabled = true; } }
  Label.HorizontalAlign = Label.VerticalAlign = { CENTER: 0 };Label.Overflow = { SHRINK: 0 };
  class LabelOutline {}
  class Animation {
    constructor() { this.finishedListeners = [() => { throw new Error('Legacy listener must be removed'); }];this.enabled = true;this.playCount = 0; }
    off(event) { assert.equal(event, 'finished');this.finishedListeners = []; }
    stop() { this.stopped = true; }
    play() { this.playCount++; }
  }
  class Node {
    constructor(name = '') { this.name = name;this.children = [];this.components = new Map();this.valid = true;nodes.push(this); }
    set parent(value) {
      if (this._parent) this._parent.children = this._parent.children.filter(n => n !== this);
      this._parent = value;if (value) value.children.push(this);
    }
    get parent() { return this._parent; }
    getComponent(type) { return this.components.get(type) || null; }
    addComponent(type) { const value = new type();value.node = this;this.components.set(type, value);return value; }
    getChildByName(name) { return this.children.find(child => child.name === name) || null; }
    setContentSize(width, height) { this.width = width;this.height = height; }
    setPosition(x, y) { this.x = x;this.y = y; }
    setScale(value) { this.scale = value; }
    stopAllActions() {}
    destroy() { this.valid = false;this.children.slice().forEach(child => child.destroy());this.parent = null; }
  }
  const cc = { Node, Sprite, Label, LabelOutline, Animation, Texture2D: class {}, winSize: { width: 750 },
    isValid: n => !!n && n.valid !== false, color: (r, g, b) => ({ r, g, b }),
    v2: (x, y) => ({ x, y }), size: (width, height) => ({ width, height }), rect: (x, y, width, height) => ({ x, y, width, height }),
    SpriteFrame: class { constructor(texture, rect, rotated, offset, size) { this.texture = texture;this.rect = rect;this.size = size; }getOriginalSize() { return this.size; } },
    loader: { loadRes: (...args) => requests.push(args) },
    Tween: { stopAllByTarget: node => tweens.filter(tween => tween.node === node).forEach(tween => tween.stopped = true) },
    tween: node => {
      const tween = { node, time: 0, to(duration) { this.time += duration;return this; }, delay(duration) { this.hold = duration;this.time += duration;return this; },
        call(callback) { this.done = callback;return this; }, start() { tweens.push(this);return this; } };
      return tween;
    }
  };
  let gets = 0;
  const M = { event: { send: (...args) => sounds.push(args) }, nodePool: {
    getItem: () => { gets++;const node = pool.pop() || new Node('PooledCombo');if (!node.getComponent(Animation)) node.addComponent(Animation);return node; },
    freeItem: (key, node) => { freed.push(node);node.parent = null;pool.push(node); }
  } };
  const { default: Feedback } = load('assets/Script/Game/Match3/View/ComboFeedback.ts', {
    '../../../Application/M': { default: M }, '../../Data/Const/Constant': { NodePoolKey: { ComboEff: 'combo' } },
    '../../Data/Const/Event': { Event: { Sound: { PlaySoundEff: 'sound' } } }, '../../Common/AudioCtrl': { AudioID: { ComboPraise:119, ComboGreat:120, ComboAwesome:121, ComboFantastic:122, ComboBlossom:123 } }
  }, { cc });
  return { Feedback, cc, M, requests, tweens, freed, sounds, nodes, gets: () => gets };
}
async function flush() { for (let i = 0; i < 5; i++) await Promise.resolve(); }
const texture = { width: 1536, height: 1024 };

test('combo art shares its pending load and keeps all four word crops inside the original image', async () => {
  const h = harness(), first = h.Feedback.preload();assert.equal(first, h.Feedback.preload());assert.equal(h.requests.length, 1);
  assert.equal(h.requests[0][0], 'texture/mountain-ui/combo-praise');h.requests[0][2](null, texture);await first;
  const frames = h.Feedback.frames;assert.deepEqual(Object.keys(frames), ['great', 'awesome', 'fantastic', 'blossom']);
  for (const frame of Object.values(frames)) { const r = frame.rect;assert.ok(r.x >= 0 && r.y >= 0 && r.x + r.width <= 1536 && r.y + r.height <= 1024); }
  assert.ok(frames.great.rect.y + frames.great.rect.height <= frames.awesome.rect.y);
  assert.ok(frames.awesome.rect.y + frames.awesome.rect.height <= frames.fantastic.rect.y);
  assert.ok(frames.fantastic.rect.y + frames.fantastic.rect.height <= frames.blossom.rect.y);
  await h.Feedback.preload();assert.equal(h.requests.length, 1);
});

test('pooled combo nodes replace stale frames and finished callbacks cannot recycle a node twice', async () => {
  const h = harness(), parent = new h.cc.Node(), fx = new h.Feedback(parent, {});let starts = 0;let reused;
  for (const [index, name] of ['great', 'awesome', 'great'].entries()) {
    const pending = fx.play(name, () => starts++);if (index === 0) h.requests[0][2](null, texture);await flush();
    const tween = h.tweens[index], node = tween.node;
    if (reused) assert.equal(node, reused);reused = node;
    assert.equal(node.getComponent(h.cc.Sprite).spriteFrame, h.Feedback.frames[name]);
    const animation = node.getComponent(h.cc.Animation);assert.equal(animation.finishedListeners.length, 0);assert.equal(animation.playCount, 0);assert.equal(animation.enabled, false);
    assert.ok(Math.abs(tween.time - .9) < 1e-9);tween.done();tween.done();assert.equal(await pending, true);
    assert.equal(h.freed.length, index + 1);
  }
  assert.equal(starts, 3);fx.dispose();assert.equal(h.freed.length, 3);
});

test('combo disposal cancels in-flight and active presentations without late sound or double recycling', async () => {
  const h = harness(), parent = new h.cc.Node(), cancelled = new h.Feedback(parent, {});let starts = 0;
  const beforeLoad = cancelled.play('great', () => starts++);cancelled.dispose();h.requests[0][2](null, texture);assert.equal(await beforeLoad, false);
  assert.equal(h.gets(), 0);assert.equal(starts, 0);
  const active = new h.Feedback(parent, {}), pending = active.play('awesome', () => starts++);await flush();
  active.dispose();active.dispose();h.tweens[0].done();assert.equal(await pending, false);assert.equal(h.freed.length, 1);assert.equal(starts, 1);
  assert.equal(await active.play('blossom'), false);assert.equal(h.gets(), 1);
});

test('preview holds the word for three seconds and its cancel function stops playback once', async () => {
  const h = harness(), parent = new h.cc.Node(), cancel = h.Feedback.preview(parent, 'fantastic', 18);
  h.requests[0][2](null, texture);await flush();assert.equal(h.tweens[0].hold, 3);assert.equal(h.tweens[0].node.y, 18);
  assert.deepEqual(h.sounds, [['sound', 122]]);cancel();cancel();h.tweens[0].done();await flush();
  assert.equal(h.tweens[0].node.valid, false);assert.equal(h.freed.length, 0);
});

test('round reset cancels pending and active feedback while allowing the same presenter to start the next round', async () => {
  const h = harness(), parent = new h.cc.Node(), fx = new h.Feedback(parent, {});let starts = 0;
  const stale = fx.play('great', () => starts++);fx.cancel();
  let current = fx.play('awesome', () => starts++);assert.equal(h.requests.length, 1);
  h.requests[0][2](null, texture);await flush();assert.equal(await stale, false);assert.equal(starts, 1);assert.equal(h.gets(), 1);
  const oldTween = h.tweens[0];fx.cancel();assert.equal(await current, false);assert.equal(h.freed.length, 1);
  current = fx.play('blossom', () => starts++);await flush();assert.equal(h.tweens[1].node, oldTween.node);
  oldTween.done();assert.equal(h.freed.length, 1, 'the old round cannot return a reused node to its pool');
  assert.equal(oldTween.node.getComponent(h.cc.Sprite).spriteFrame, h.Feedback.frames.blossom);
  h.tweens[1].done();assert.equal(await current, true);assert.equal(h.freed.length, 2);assert.equal(starts, 2);
});

test('failed art uses an isolated text child and a later successful load restores image presentation', async () => {
  const h = harness(), parent = new h.cc.Node(), fx = new h.Feedback(parent, {});
  let pending = fx.play('great');h.requests[0][2](new Error('offline'), null);await flush();
  const node = h.tweens[0].node;assert.equal(node.getComponent(h.cc.Sprite).enabled, false);assert.equal(node.getComponent(h.cc.Label), null);
  assert.equal(node.getChildByName('FallbackPraise').getComponent(h.cc.Label).string, 'Great!');h.tweens[0].done();await pending;
  pending = fx.play('blossom');assert.equal(h.requests.length, 2);h.requests[1][2](null, texture);await flush();
  assert.equal(h.tweens[1].node, node);assert.equal(node.getComponent(h.cc.Sprite).enabled, true);assert.equal(node.getChildByName('FallbackPraise').active, false);
  h.tweens[1].done();await pending;
});

test('production combo dispatch retains only the existing 3/6/9/12 thresholds and emits one sound per display', () => {
  const constants = load('assets/Script/Game/Data/Const/Constant.ts', { '../../../Framework/Utils/Util': { Util: { Enum: { convert2EventEnum() {} } } } });
  const file = 'assets/Script/Game/Match3/View/EffLayerCtrl.ts', dependencies = {}, played = [], sounds = [];
  for (const item of fs.readFileSync(path.join(root, file), 'utf8').matchAll(/from\s+["']([^"']+)["']/g)) dependencies[item[1]] = {};
  dependencies['../../Data/Const/Constant'] = constants;
  dependencies['../../../Application/M'] = { default: { event: { send: (...args) => sounds.push(args) } } };
  dependencies['../../Data/Const/Event'] = { Event: { Sound: { PlaySoundEff: 'sound' } } };
  dependencies['./ComboFeedback'] = { default: harness().Feedback };
  const { default: Layer } = load(file, dependencies, { cc: { Component: class {}, Prefab: class {}, _decorator: { ccclass: value => value, property: () => () => {} } } });
  let comboCancels = 0, specialCancels = 0;
  const layer = new Layer();layer.comboFeedback = { play: (name, started) => { played.push(name);started(); }, cancel: () => comboCancels++ };
  layer.special = { cancel: () => specialCancels++ };
  for (let count = 1; count <= 15; count++) layer.playComboEff(count);
  assert.deepEqual(played, ['great', 'awesome', 'fantastic', 'blossom']);assert.deepEqual(sounds, [120,121,122,123].map(id=>['sound',id]));
  layer.cancelSpecialEffects();assert.equal(comboCancels, 1);assert.equal(specialCancels, 1);
});

test('all development previews pronounce the same word selected by the production dispatcher', async () => {
  const h=harness(),parent=new h.cc.Node();
  for(const [i,name] of ['great','awesome','fantastic','blossom'].entries()){
    const cancel=h.Feedback.preview(parent,name);
    if(i===0)h.requests[0][2](null,texture);
    await flush();
    assert.equal(h.Feedback.voiceFor(name),120+i);
    assert.deepEqual(h.sounds[i],['sound',120+i]);
    cancel();await flush();
  }
  assert.equal(h.Feedback.voiceFor('unknown'),null);
});
