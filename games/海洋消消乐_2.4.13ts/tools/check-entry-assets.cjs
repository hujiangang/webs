/* Guard the removal of legacy loading/lobby assets, including dynamic resource paths. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const manifestPath = 'docs/retired-loading-lobby-assets.json';
const scannedExtensions = new Set(['.json', '.fire', '.prefab', '.meta', '.anim', '.effect', '.material', '.mtl', '.plist', '.fnt', '.pac', '.ts', '.js']);
const sourceExtensions = new Set(['.ts', '.js']);
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(file);
    return entry.isFile() ? [file] : [];
  });
}

// Literal concatenations are common in resource constants; do not match short filenames
// or strings merely containing a retired path as part of a different resource name.
function constantString(node) {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return constantString(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = constantString(node.left), right = constantString(node.right);
    return left === null || right === null ? null : left + right;
  }
  return null;
}

function checkEntryAssets(projectRoot = path.resolve(__dirname, '..')) {
  const root = path.resolve(projectRoot), errors = new Set();
  const result = { errors: [], scannedFiles: 0, retiredFiles: 0, retiredUuids: 0, dynamicPaths: 0 };
  const manifestFile = path.join(root, manifestPath);
  if (!fs.existsSync(manifestFile)) {
    result.errors.push(`Missing retirement manifest: ${manifestPath}`);
    return result;
  }
  let manifest;
  try { manifest = readJson(manifestFile); }
  catch (error) {
    result.errors.push(`Cannot read ${manifestPath}: ${error.message}`);
    return result;
  }
  if (!manifest || !Array.isArray(manifest.files) || !Array.isArray(manifest.retiredUuids) || !Array.isArray(manifest.dynamicResourcePaths)) {
    result.errors.push(`${manifestPath}: expected files, retiredUuids and dynamicResourcePaths arrays`);
    return result;
  }
  const assetRoot = path.join(root, 'assets');
  for (const entry of manifest.files) {
    if (!entry || typeof entry.path !== 'string' || !entry.path.trim()) {
      errors.add(`${manifestPath}: invalid retired file path`);
      continue;
    }
    const file = path.resolve(root, entry.path), relative = path.relative(assetRoot, file);
    if (!relative || relative.startsWith('..' + path.sep) || relative === '..' || path.isAbsolute(relative)) {
      errors.add(`${manifestPath}: retired file must be within assets: ${entry.path}`);
      continue;
    }
    if (fs.existsSync(file)) errors.add(`Retired file still exists: ${entry.path}`);
  }
  const uuids = new Set(), resourcePaths = new Set();
  for (const uuid of manifest.retiredUuids) {
    if (typeof uuid !== 'string' || !uuid.trim()) errors.add(`${manifestPath}: invalid retired UUID`);
    else uuids.add(uuid.toLowerCase());
  }
  for (const resourcePath of manifest.dynamicResourcePaths) {
    if (typeof resourcePath !== 'string' || !resourcePath.trim() || !resourcePath.includes('/') || resourcePath.includes('\\') || resourcePath.split('/').some(part => !part || part === '.' || part === '..') || path.posix.isAbsolute(resourcePath) || path.win32.isAbsolute(resourcePath) || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(resourcePath)) {
      errors.add(`${manifestPath}: expected a complete relative resources path: ${String(resourcePath)}`);
    } else resourcePaths.add(resourcePath);
  }
  result.retiredFiles = manifest.files.length;
  result.retiredUuids = uuids.size;
  result.dynamicPaths = resourcePaths.size;
  if (!fs.existsSync(assetRoot) || !fs.statSync(assetRoot).isDirectory()) {
    errors.add('Missing assets directory; retirement references could not be checked');
    result.errors = [...errors];
    return result;
  }
  // The boundary accepts Cocos subasset references such as "uuid@f9941" while
  // rejecting a UUID fragment embedded in a longer alphanumeric identifier.
  const uuidPattern = uuids.size ? new RegExp(`(?<![A-Za-z0-9])(?:${[...uuids].sort((a, b) => b.length - a.length).map(escapeRegex).join('|')})(?![A-Za-z0-9])`, 'gi') : null;
  for (const file of walk(assetRoot)) {
    const extension = path.extname(file).toLowerCase();
    if (!scannedExtensions.has(extension)) continue;
    result.scannedFiles++;
    const relative = path.relative(root, file).split(path.sep).join('/');
    let text;
    try { text = fs.readFileSync(file, 'utf8'); }
    catch (error) { errors.add(`${relative}: cannot read asset: ${error.message}`); continue; }
    if (uuidPattern) {
      uuidPattern.lastIndex = 0;
      for (const match of text.matchAll(uuidPattern)) {
        const line = text.slice(0, match.index).split('\n').length;
        errors.add(`${relative}:${line}: retired UUID reference: ${match[0]}`);
      }
    }
    if (sourceExtensions.has(extension) && resourcePaths.size) {
      const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, extension === '.js' ? ts.ScriptKind.JS : ts.ScriptKind.TS);
      function visit(node) {
        const value = constantString(node);
        if (value !== null && resourcePaths.has(value)) {
          const line = ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1;
          errors.add(`${relative}:${line}: retired dynamic resource path: ${value}`);
          return;
        }
        ts.forEachChild(node, visit);
      }
      visit(ast);
    }
  }
  result.errors = [...errors];
  return result;
}

module.exports = { checkEntryAssets };
if (require.main === module) {
  const result = checkEntryAssets();
  if (result.errors.length) {
    console.error(result.errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Entry asset retirement checks passed: ${result.retiredFiles} files removed; ${result.retiredUuids} UUIDs and ${result.dynamicPaths} dynamic paths absent from ${result.scannedFiles} source assets.`);
  }
}
