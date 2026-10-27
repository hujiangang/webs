const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

test('shared loading progress starts empty, follows actual completion and clamps invalid input', () => {
  class Graphics {
    constructor() { this.shapes = []; }
    clear() { this.shapes = []; }
    roundRect(x, y, width, height, radius) {
      assert.ok([x, y, width, height, radius].every(Number.isFinite));
      assert.ok(width >= 0 && radius <= width / 2);
      this.shapes.push({ x, y, width, height, radius });
    }
    fill() {}
  }
  const ink = new Graphics(), node = { valid: true, setContentSize() {}, addComponent: () => ink };
  const label = { string: '', node: { getComponent: () => null } };
  const UI = { node: () => node, text: () => label };
  const file = path.resolve(__dirname, '../../assets/Script/Game/Common/UI/LoadingProgress.ts');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 }
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: () => ({ default: UI }), cc: {
    Graphics, LabelOutline: class {}, isValid: target => target.valid, color: () => ({ fromHEX: value => value })
  } }, { filename: file });
  const progress = new exports.default({}, 490);
  assert.equal(label.string, '0%');
  const emptyShapes = ink.shapes.length;
  assert.equal(progress.set(100), 100);
  assert.equal(label.string, '100%');
  assert.equal(ink.shapes.length, emptyShapes + 1, 'only positive progress adds fill');
  const fullWidth = ink.shapes[ink.shapes.length - 1].width;
  assert.equal(progress.set(25), 25);
  assert.equal(ink.shapes[ink.shapes.length - 1].width, fullWidth / 4);
  assert.equal(label.string, '25%');
  assert.equal(progress.set(120), 100);
  for (const invalid of [-5, NaN, Infinity]) {
    assert.equal(progress.set(invalid), 0);
    assert.equal(label.string, '0%');
    assert.equal(ink.shapes.length, emptyShapes, 'zero must not retain a minimum visible fill');
  }
  node.valid = false;
  assert.equal(progress.set(80), 80);
  assert.equal(label.string, '0%', 'late progress must not modify a destroyed view');
});
