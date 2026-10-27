const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function audioHarness(options = { bgm: true, eff: true }) {
  const requests = [], music = [], effects = [], saves = [], listeners = new Map();
  const counts = { pause: 0, resume: 0, stopMusic: 0, stopEffects: 0 };
  const volumes = { music: [], effects: [] };
  const stoppedEffectIds = [], finishCallbacks = new Map();
  let playing = false, current = null, nextId = 0;
  const events = { PlaySoundEff: 'effect', PlayBGM: 'music', StopBGM: 'stop', UpdateOpt: 'option' };
  const eventBus = {
    register: (event, handler, target) => listeners.set(event, (...args) => handler.apply(target, args)),
    unRegister: event => listeners.delete(event)
  };
  const dependencies = {
    '../../Framework/Events/EventMgr': { default: { ins: eventBus } },
    '../Data/Const/Event': { Event: { Sound: events } },
    '../Config/Paths': { default: { SoundPath: 'sound/' } },
    '../Data/Const/Constant': { NativeKey: { Sound: 'audio-options' } },
    '../Data/StorageMgr': { StorageMgr: { Storage: {
      getObject: () => ({ ...options }), setObject: (key, value) => saves.push({ ...value })
    } } }
  };
  const engine = {
    isMusicPlaying: () => playing,
    playMusic: (clip, loop) => { music.push({ clip, loop }); current = clip; playing = true; return nextId++; },
    pauseMusic: () => { counts.pause++; playing = false; },
    resumeMusic: () => { counts.resume++; playing = current != null; },
    stopMusic: () => { counts.stopMusic++; playing = false; current = null; },
    setMusicVolume: value => volumes.music.push(value), setEffectsVolume: value => volumes.effects.push(value),
    playEffect: (clip, loop) => { const id=nextId++;effects.push({ clip, loop, id });return id; },
    stopEffect: id => stoppedEffectIds.push(id),
    setFinishCallback: (id, callback) => finishCallbacks.set(id, callback),
    stopAllEffects: () => counts.stopEffects++,
    stopAll: () => assert.fail('background music operations must not stop every effect')
  };
  const file = path.resolve(__dirname, '../../assets/Script/Game/Common/AudioCtrl.ts');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 }
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => {
    assert.ok(name in dependencies, 'known dependency: ' + name); return dependencies[name];
  }, cc: { _decorator: { ccclass: value => value }, Node: class {}, AudioClip: class {},
    game: { addPersistRootNode() {} }, loader: { loadRes: (...args) => requests.push(args) }, audioEngine: engine
  } }, { filename: file });
  const controller = new exports.default();
  return { controller, IDs: exports.AudioID, requests, music, effects, saves, counts, volumes, stoppedEffectIds, finishCallbacks,
    send: (event, ...args) => { const listener = listeners.get(events[event]); if (listener) listener(...args); },
    resolve: (index, name, error = null) => requests[index][2](error, name ? { name } : null) };
}

test('music defaults to home, coalesces pending starts and resumes engine audio ID zero', () => {
  const h = audioHarness();
  assert.equal(h.IDs.BGM1, 100); assert.equal(h.IDs.BGM2, 103);
  assert.equal(h.IDs.merge_boom, 118); assert.equal(h.IDs.ComboPraise, 119);
  assert.deepEqual([h.IDs.ComboGreat,h.IDs.ComboAwesome,h.IDs.ComboFantastic,h.IDs.ComboBlossom],[120,121,122,123]);
  h.send('PlayBGM'); h.send('PlayBGM');
  assert.equal(h.requests.length, 1); assert.equal(h.requests[0][0], 'sound/bgm1');
  h.resolve(0, 'home');
  assert.equal(h.music.length, 1); assert.equal(h.music[0].loop, true);
  assert.equal(h.volumes.music[0], 0.32);
  h.send('UpdateOpt', 'bgm', false);
  assert.equal(h.counts.pause, 1);
  h.send('UpdateOpt', 'bgm', true);
  assert.equal(h.counts.resume, 1, 'the first playback ID 0 remains resumable');
  assert.equal(h.requests.length, 1, 'resume must not request or restart the track');
  assert.deepEqual(h.saves[h.saves.length - 1], { bgm: true, eff: true });
});

test('only the latest scene music can play when asynchronous loads finish out of order', () => {
  const h = audioHarness();
  h.send('PlayBGM', h.IDs.BGM1); h.send('PlayBGM', h.IDs.BGM2);
  h.resolve(1, 'game'); h.resolve(0, 'late home');
  assert.equal(h.music.length, 1); assert.equal(h.music[0].clip.name, 'game');
  h.send('PlayBGM', h.IDs.BGM1);
  h.send('StopBGM'); h.resolve(2, 'home after stop');
  assert.equal(h.music.length, 1, 'stop invalidates a pending music callback');
  h.send('UpdateOpt', 'bgm', true);
  assert.equal(h.requests.length, 3, 'explicitly stopped music stays stopped');
  assert.equal(h.counts.stopEffects, 0, 'switching or stopping music preserves active effects');
});

test('muting a pending load cannot leak playback and scene changes while muted retain the right destination', () => {
  const h = audioHarness();
  h.send('PlayBGM', h.IDs.BGM1);
  h.send('UpdateOpt', 'bgm', false);
  h.send('PlayBGM', h.IDs.BGM2);
  h.resolve(0, 'muted home');
  assert.equal(h.music.length, 0); assert.equal(h.requests.length, 1);
  h.send('UpdateOpt', 'bgm', true);
  assert.equal(h.requests[1][0], 'sound/bgm2');
  h.resolve(1, null, new Error('download failed'));
  h.send('PlayBGM', h.IDs.BGM2);
  assert.equal(h.requests.length, 3, 'a failed download remains retryable');
  h.resolve(2, 'game');
  assert.equal(h.music.length, 1); assert.equal(h.music[0].clip.name, 'game');
});

test('effect mute and controller cleanup invalidate pending audio callbacks', () => {
  const h = audioHarness({ bgm: false, eff: true });
  h.send('PlayBGM', h.IDs.BGM1); h.send('PlayBGM', h.IDs.BGM2);
  assert.equal(h.requests.length, 0, 'persisted music mute must prevent downloading and playback');
  h.send('PlaySoundEff', h.IDs.Click1);
  h.send('UpdateOpt', 'eff', false); h.send('UpdateOpt', 'eff', true);
  h.resolve(0, 'old click');
  assert.equal(h.effects.length, 0); assert.equal(h.counts.stopEffects, 1);
  h.send('PlaySoundEff', h.IDs.ComboPraise); h.resolve(1, 'combo praise');
  assert.equal(h.requests[1][0], 'sound/combo_praise');
  assert.equal(h.effects.length, 1);
  assert.equal(h.volumes.effects[0], 0.5);
  h.send('UpdateOpt', 'bgm', true);
  assert.equal(h.requests[2][0], 'sound/bgm2');
  h.send('PlaySoundEff', h.IDs.Hammer);
  h.controller.unRegisterEvent();
  h.resolve(2, 'late game'); h.resolve(3, 'late hammer');
  assert.equal(h.music.length, 0); assert.equal(h.effects.length, 1);
  h.send('PlaySoundEff', h.IDs.Click1);
  assert.equal(h.requests.length, 4);
});

test('each praise voice uses its own clip and only the latest request can play', () => {
  const h=audioHarness();
  h.send('PlaySoundEff',h.IDs.ComboGreat);h.send('PlaySoundEff',h.IDs.ComboAwesome);
  assert.equal(h.requests[0][0],'sound/combo_great');assert.equal(h.requests[1][0],'sound/combo_awesome');
  h.resolve(1,'awesome');h.resolve(0,'late great');
  assert.deepEqual(h.effects.map(effect=>effect.clip.name),['awesome']);
  assert.equal(h.effects[0].id,0);
  h.send('PlaySoundEff',h.IDs.Click1);h.resolve(2,'click');
  assert.deepEqual(h.stoppedEffectIds,[],'ordinary effects do not interrupt speech');
  h.send('PlaySoundEff',h.IDs.ComboFantastic);
  assert.deepEqual(h.stoppedEffectIds,[0],'new speech stops the previous voice even when its engine ID is zero');
  assert.equal(h.requests[3][0],'sound/combo_fantastic');h.resolve(3,'fantastic');
  h.send('PlaySoundEff',h.IDs.ComboBlossom);
  assert.equal(h.requests[4][0],'sound/combo_blossom');h.resolve(4,'blossom');
  assert.deepEqual(h.effects.map(effect=>effect.clip.name),['awesome','click','fantastic','blossom']);
  assert.deepEqual(h.stoppedEffectIds,[0,2]);
  assert.equal(h.counts.stopEffects,0,'speech replacement must preserve unrelated effects');
});

test('praise mute, scene changes and cleanup stop active speech and reject late speech loads', () => {
  const h=audioHarness();
  h.send('PlaySoundEff',h.IDs.ComboGreat);h.send('UpdateOpt','eff',false);h.send('UpdateOpt','eff',true);
  h.resolve(0,'muted great');assert.equal(h.effects.length,0);
  h.send('PlaySoundEff',h.IDs.ComboAwesome);h.resolve(1,'awesome');
  h.send('UpdateOpt','eff',false);assert.deepEqual(h.stoppedEffectIds,[0]);
  h.send('UpdateOpt','eff',true);assert.equal(h.requests.length,2,'re-enable must not replay old speech');
  h.send('PlaySoundEff',h.IDs.ComboFantastic);h.resolve(2,'fantastic');
  h.send('PlayBGM',h.IDs.BGM1);assert.deepEqual(h.stoppedEffectIds,[0,1]);
  h.send('PlaySoundEff',h.IDs.ComboBlossom);h.controller.unRegisterEvent();
  h.resolve(3,'late music');h.resolve(4,'late blossom');
  assert.deepEqual(h.effects.map(effect=>effect.clip.name),['awesome','fantastic']);
  assert.equal(h.music.length,0);
});

test('an old speech finish callback cannot release the newer speech handle', () => {
  const h=audioHarness();
  h.send('PlaySoundEff',h.IDs.ComboGreat);h.resolve(0,'great');
  const oldFinish=h.finishCallbacks.get(0);
  h.send('PlaySoundEff',h.IDs.ComboAwesome);h.resolve(1,'awesome');oldFinish();
  h.send('PlaySoundEff',h.IDs.ComboFantastic);h.resolve(2,'fantastic');
  assert.deepEqual(h.stoppedEffectIds,[0,1]);
  h.finishCallbacks.get(2)();
  h.send('PlaySoundEff',h.IDs.ComboBlossom);
  assert.deepEqual(h.stoppedEffectIds,[0,1],'a completed voice has no stale playback handle to stop');
});
