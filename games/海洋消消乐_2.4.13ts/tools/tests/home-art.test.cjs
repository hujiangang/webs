const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '../..');

function harness() {
  const requests = [], created = [], frames = [];
  class Node {
    constructor(name) { this.name = name; this.children = []; this.components = []; this.valid = true; created.push(this); }
    set parent(value) { this.owner = value; value.children.push(this); }
    setPosition(x, y) { this.x = x; this.y = y; }
    setContentSize(width, height) { this.width = width; this.height = height; }
    getComponent(Type) { return this.components.find(component => component instanceof Type); }
    addComponent(Type) { const component = new Type(); this.components.push(component); return component; }
    destroy() { this.valid = false; }
  }
  class Sprite {}
  Sprite.SizeMode = { CUSTOM: 'custom' };
  class Graphics { rect() {} fill() {} }
  class SpriteFrame {
    constructor(texture, rect, rotated, offset, originalSize) {
      Object.assign(this, { texture, rect, originalSize }); frames.push(this);
    }
    getOriginalSize() { return this.originalSize; }
  }
  const cc = { Node, Sprite, Graphics, SpriteFrame, Texture2D: class {},
    loader: { loadRes: (...args) => requests.push(args) }, isValid: node => node.valid,
    rect: (x, y, width, height) => ({ x, y, width, height }),
    v2: (x, y) => ({ x, y }), size: (width, height) => ({ width, height }),
    color: (r, g, b) => ({ r, g, b }) };
  const file = 'assets/Script/Game/Home/HomeArt.ts';
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, cc, console: { warn() {} } }, { filename: file });
  return { Art: exports.default, requests, created, frames, Node, Sprite, Graphics };
}

function textureFor(request) {
  const filename = path.join(root, 'assets/resources', request[0] + '.png');
  const png = fs.readFileSync(filename);
  assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}

test('home artwork shares all four concurrent requests, tolerates partial failure and retries only missing art', async () => {
  const { Art, requests } = harness();
  assert.equal(Art.frame('hero'), null);
  const first = Art.load();
  assert.equal(first, Art.load());
  assert.equal(requests.length, 4);
  assert.equal(new Set(requests.map(request => request[0])).size, 4);
  for (const request of requests) {
    if (request[0].endsWith('/hero')) request[2](new Error('missing'), null);
    else request[2](null, textureFor(request));
  }
  await first;
  assert.equal(Art.frame('hero'), null);
  for (const key of ['background', 'marker', 'shop', 'game', 'book']) assert.ok(Art.frame(key));
  const successfulFrame = Art.frame('marker');
  const retry = Art.load();
  assert.notEqual(retry, first);
  assert.equal(requests.length, 5);
  assert.match(requests[4][0], /\/hero$/);
  requests[4][2](null, textureFor(requests[4]));
  await retry;
  assert.ok(Art.frame('hero'));
  assert.equal(Art.frame('marker'), successfulFrame);
  await Art.load();
  assert.equal(requests.length, 5, 'cached artwork must not download again');
});

test('home artwork crops remain within the actual PNG dimensions and sprites preserve their cropped aspect ratio', async () => {
  const { Art, requests, frames, Node, Sprite } = harness();
  const pending = Art.load();
  for (const request of requests) request[2](null, textureFor(request));
  await pending;
  for (const frame of frames) {
    const r = frame.rect;
    assert.ok([r.x, r.y, r.width, r.height].every(Number.isInteger));
    assert.ok(r.x >= 0 && r.y >= 0 && r.width > 0 && r.height > 0);
    assert.ok(r.x + r.width <= frame.texture.width && r.y + r.height <= frame.texture.height, 'crop must remain inside its source PNG');
    assert.deepEqual(frame.originalSize, { width: r.width, height: r.height });
  }
  const parent = new Node('Canvas');
  for (const key of ['hero', 'marker', 'shop', 'game', 'book']) {
    const node = Art.sprite(parent, key, key, 300, 200, 12, 23);
    assert.equal(node.getComponent(Sprite).spriteFrame, Art.frame(key));
    assert.ok(node.width <= 300 && node.height <= 200);
    const size = Art.frame(key).getOriginalSize();
    assert.ok(Math.abs(node.width / node.height - size.width / size.height) < 1e-10);
    assert.equal(node.x, 12); assert.equal(node.y, 23);
  }
});

test('late home artwork never attaches to destroyed nodes and a failed background keeps its fallback', async () => {
  const { Art, requests, Node, Sprite, Graphics } = harness();
  const parent = new Node('Canvas');
  const removedSprite = Art.sprite(parent, 'RemovedHero', 'hero', 400, 240);
  const removedBackground = Art.background(parent, 750, 1334);
  const liveSprite = Art.sprite(parent, 'LiveHero', 'hero', 400, 240);
  const liveBackground = Art.background(parent, 750, 1624);
  removedSprite.destroy(); removedBackground.destroy();
  const pending = Art.load();
  assert.equal(requests.length, 4, 'sprite and background should share the same batch');
  for (const request of requests) request[2](null, textureFor(request));
  await pending;
  await Promise.resolve();
  assert.equal(removedSprite.components.length, 0);
  assert.equal(removedBackground.children.length, 0);
  assert.equal(liveSprite.getComponent(Sprite).spriteFrame, Art.frame('hero'));
  assert.equal(liveBackground.children.length, 1);
  const artwork = liveBackground.children[0];
  assert.ok(artwork.width >= 750 && artwork.height >= 1624);
  const size = Art.frame('background').getOriginalSize();
  assert.ok(Math.abs(artwork.width / artwork.height - size.width / size.height) < 1e-10);

  const failed = harness(), fallback = failed.Art.background(new failed.Node('Canvas'), 750, 1334);
  const failedLoad = failed.Art.load();
  for (const request of failed.requests) request[2](new Error('offline'), null);
  await failedLoad;
  await Promise.resolve();
  assert.equal(fallback.valid, true);
  assert.equal(fallback.children.length, 0);
  assert.ok(fallback.components[0] instanceof failed.Graphics);
  assert.ok(liveBackground.components[0] instanceof Graphics);
});
