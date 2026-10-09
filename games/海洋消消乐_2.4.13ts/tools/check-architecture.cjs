/* Source boundaries and Cocos UUID preservation, independent from editor caches. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const rel = p => path.relative(root, p).split(path.sep).join('/');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const all = walk(path.join(root, 'assets'));
const sources = all.filter(p => /\.(ts|js)$/.test(p));
const sourceSet = new Set(sources);
const errors = [];
const modules = new Set(sources.map(p => path.basename(p).replace(/\.(ts|js)$/, '')));
let imports = 0;
for (const file of sources) {
  if (file.endsWith('.d.ts')) continue;
  const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  function check(specifier) {
    imports++;
    if (!specifier.startsWith('.')) {
      if (!modules.has(specifier)) errors.push(`${rel(file)}: unknown runtime module ${specifier}`);
      return;
    }
    const stem = path.resolve(path.dirname(file), specifier);
    const target = ['', '.ts', '.js', '.d.ts', '/index.ts'].map(ext => stem + ext).find(p => sourceSet.has(p));
    if (!target) { errors.push(`${rel(file)}: unresolved or wrong-case import ${specifier}`); return; }
    if (rel(file).startsWith('assets/Script/Framework/') &&
        !/^assets\/Script\/(Framework|ThirdParty)\//.test(rel(target))) {
      errors.push(`${rel(file)}: framework imports higher layer ${rel(target)}`);
    }
  }
  function visit(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) check(node.moduleSpecifier.text);
    if (ts.isCallExpression(node) && node.expression.getText(ast) === 'require' && node.arguments.length && ts.isStringLiteral(node.arguments[0])) check(node.arguments[0].text);
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const uuids = new Map();
for (const file of sources) {
  const meta = file + '.meta';
  if (!fs.existsSync(meta)) { errors.push(`Missing meta: ${rel(file)}`); continue; }
  const uuid = readJson(meta).uuid;
  if (uuids.has(uuid)) errors.push(`Duplicate script UUID: ${rel(file)} / ${uuids.get(uuid)}`);
  uuids.set(uuid, rel(file));
}
const manifest = readJson(path.join(root, 'docs/source-migration.json'));
const retirement = readJson(path.join(root, 'docs/retired-hotel-island.json'));
const specialRetirement = readJson(path.join(root, 'docs/retired-special-art.json'));
const retiredArtIds = new Set(specialRetirement.retiredUuids);
for (const entry of specialRetirement.files) {
  if (fs.existsSync(path.join(root, entry.path))) errors.push(`Retired special art remains: ${entry.path}`);
}
for (const file of all.filter(p => /\.(prefab|fire|json|meta|anim)$/.test(p))) {
  const ids = fs.readFileSync(file, 'utf8').match(/[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}/g) || [];
  for (const id of new Set(ids)) {
    if (retiredArtIds.has(id)) errors.push(`${rel(file)}: reference to retired special art ${id}`);
  }
}
const retiredScripts = new Map([...retirement.files,...specialRetirement.files].filter(item => item.uuid).map(item => [item.path, item.uuid]));
for (const entry of retirement.files) {
  if (fs.existsSync(path.join(root, entry.path))) errors.push(`Retired file remains: ${entry.path}`);
}
for (const entry of manifest) {
  if (retiredScripts.get(entry.after) !== entry.uuid && uuids.get(entry.uuid) !== entry.after) errors.push(`Changed/missing original script UUID: ${entry.after}`);
  if (entry.before !== entry.after && fs.existsSync(path.join(root, entry.before))) errors.push(`Old source remains: ${entry.before}`);
}
// Creator 2.x accepts both 22- and 23-character compressed script class IDs.
function expand(id) {
  if (![22, 23].includes(id.length)) return id;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const head = id.length === 22 ? 2 : 5;
  let hex = id.slice(0, head);
  for (let i = head; i < id.length; i += 2) {
    const a = chars.indexOf(id[i]), b = chars.indexOf(id[i + 1]);
    if (a < 0 || b < 0) return id;
    hex += (a >> 2).toString(16) + (((a & 3) << 2) | (b >> 4)).toString(16) + (b & 15).toString(16);
  }
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
let bindings = 0;
for (const file of all.filter(p => /\.(prefab|fire)$/.test(p))) {
  const data = readJson(file);
  function inspect(value) {
    if (!value || typeof value !== 'object') return;
    const id = value.__type__;
    if (typeof id === 'string' && [22, 23, 36].includes(id.length) && !id.startsWith('cc.')) {
      bindings++;
      if (!uuids.has(expand(id))) errors.push(`${rel(file)}: missing script ${id}`);
    }
    // Dynamic tutorial requires use these serialized filenames.
    if (Array.isArray(value.tasks)) for (const task of value.tasks) {
      if (typeof task === 'string' && task.startsWith('_Guide') && !modules.has(task)) errors.push(`${rel(file)}: missing guide module ${task}`);
    }
    for (const child of Object.values(value)) inspect(child);
  }
  inspect(data);
}
console.log(`Checked ${sources.length} sources, ${imports} imports, ${manifest.length - retiredScripts.size} preserved original UUIDs, ${retiredScripts.size} retired scripts, ${bindings} component bindings.`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('PASS: framework boundaries, imports, script UUIDs and scene/prefab bindings.');
console.log(`Checked ${specialRetirement.files.length} retired special-art files and ${retiredArtIds.size} retired resource UUIDs.`);
