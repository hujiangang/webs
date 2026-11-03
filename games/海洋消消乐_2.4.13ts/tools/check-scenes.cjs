/* Validate source scenes only; editor caches and build outputs are intentionally excluded. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const rel = file => path.relative(root, file).split(path.sep).join('/');
const errors = [], uuids = new Map(), names = new Set();
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const files = walk(path.join(root, 'assets'));
const scenes = files.filter(file => file.endsWith('.fire'));
const nodeType = item => item && ['cc.Node', 'cc.PrivateNode', 'cc.Scene'].includes(item.__type__);
const ref = value => value && Number.isInteger(value.__id__) ? value.__id__ : -1;
for (const file of files.filter(file => file.endsWith('.fire.meta'))) {
  if (!fs.existsSync(file.slice(0, -5))) errors.push(`${rel(file)}: orphan scene meta`);
}
for (const file of scenes) {
  const fail = message => errors.push(`${rel(file)}: ${message}`);
  try {
    const meta = read(file + '.meta'), data = read(file), name = path.basename(file, '.fire');
    if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(meta.uuid || '')) fail('missing/invalid UUID');
    if (uuids.has(meta.uuid)) fail(`duplicate UUID with ${uuids.get(meta.uuid)}`);
    if (names.has(name)) fail('duplicate scene name');
    uuids.set(meta.uuid, name); names.add(name);
    if (meta.importer !== 'scene') fail('meta importer must be scene');
    if (!Array.isArray(data) || !data.length) { fail('expected serialized object array'); continue; }
    const sceneIndex = ref(data[0].scene), scene = data[sceneIndex];
    if (data[0].__type__ !== 'cc.SceneAsset' || scene?.__type__ !== 'cc.Scene') fail('invalid SceneAsset root');
    if (scene?._id !== meta.uuid) fail('scene UUID does not match meta');
    const edges = data.map(() => []);
    function inspect(value, owner) {
      if (!value || typeof value !== 'object') return;
      if (Object.hasOwn(value, '__id__')) {
        const id = value.__id__;
        if (!Number.isInteger(id) || id < 0 || id >= data.length) fail(`record ${owner}: invalid __id__ ${id}`);
        else edges[owner].push(id);
      }
      for (const child of Object.values(value)) inspect(child, owner);
    }
    data.forEach(inspect);
    const reachable = new Set(), queue = [0];
    while (queue.length) {
      const id = queue.pop();
      if (!reachable.has(id)) { reachable.add(id); queue.push(...edges[id]); }
    }
    const orphaned = data.flatMap((_, id) => reachable.has(id) ? [] : [id]);
    if (orphaned.length) fail(`unreachable records: ${orphaned.join(', ')}`);
    data.forEach((item, id) => {
      if (nodeType(item)) {
        const children = (item._children || []).map(ref), components = (item._components || []).map(ref);
        if (new Set(children).size !== children.length || new Set(components).size !== components.length) fail(`node ${id}: duplicate child/component`);
        for (const child of children) {
          if (!nodeType(data[child]) || ref(data[child]._parent) !== id) fail(`node ${id}: inconsistent child ${child}`);
        }
        if (item.__type__ !== 'cc.Scene') {
          const parent = data[ref(item._parent)];
          if (!nodeType(parent) || !(parent._children || []).some(value => ref(value) === id)) fail(`node ${id}: inconsistent parent`);
        } else if (item._parent !== null) fail(`scene ${id}: expected null parent`);
        for (const component of components) {
          if (!data[component] || nodeType(data[component]) || ref(data[component].node) !== id) fail(`node ${id}: inconsistent component ${component}`);
        }
      } else if (item && Object.hasOwn(item, 'node')) {
        const owner = data[ref(item.node)];
        if (!nodeType(owner) || !(owner._components || []).some(value => ref(value) === id)) fail(`component ${id}: inconsistent node`);
      }
    });
  } catch (error) { fail(error.code === 'ENOENT' ? 'missing scene/meta file' : `cannot validate: ${error.message}`); }
}
const startup = ['project.json', 'builder.json', 'builder.panel.json'].map((name, index) => {
  const config = read(path.join(root, 'settings', name)), id = config[index ? 'startScene' : 'start-scene'];
  if (!uuids.has(id)) errors.push(`${name}: startup scene does not exist`);
  if ((config.excludeScenes || []).includes(id)) errors.push(`${name}: startup scene is excluded`);
  return id;
});
if (new Set(startup).size !== 1) errors.push('Startup scene differs between project and builder settings');
const constantFile = path.join(root, 'assets/Script/Game/Data/Const/Constant.ts');
const ast = ts.createSourceFile(constantFile, fs.readFileSync(constantFile, 'utf8'), ts.ScriptTarget.Latest, true);
const values = [];
function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'Scene' && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
    for (const property of node.initializer.properties) {
      if (ts.isPropertyAssignment(property) && ts.isStringLiteral(property.initializer)) values.push(property.initializer.text);
      else errors.push('Scene constants must contain literal scene names');
    }
  }
  ts.forEachChild(node, visit);
}
visit(ast);
for (const name of values) if (!names.has(name)) errors.push(`Scene constant has no asset: ${name}`);
for (const name of names) if (!values.includes(name)) errors.push(`Scene asset has no constant: ${name}`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Scene checks passed: ${scenes.length} scenes; serialized references, UUIDs, hierarchy, constants and startup settings agree.`);
