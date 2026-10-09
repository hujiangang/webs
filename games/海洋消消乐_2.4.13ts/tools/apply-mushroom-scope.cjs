// One-time source cleanup after the archived hotel/island asset removal.
const fs = require('node:fs');
const ts = require('typescript');
if (fs.existsSync('assets/Scene/HomeScene.fire')) {
  throw new Error('Scope migration already completed. This one-time tool must not run on the new Home project.');
}
function edit(file, change) {
  const source = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, change(source), 'utf8');
}
function dropMembers(file, names) {
  edit(file, source => {
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const ranges = [];
    function visit(node) {
      if ((ts.isMethodDeclaration(node) || ts.isPropertyDeclaration(node)) && names.includes(node.name.getText(ast))) ranges.push([node.getFullStart(), node.end]);
      ts.forEachChild(node, visit);
    }
    visit(ast);
    for (const [start, end] of ranges.sort((a,b) => b[0]-a[0])) source = source.slice(0,start)+source.slice(end);
    return source;
  });
}
const game = 'assets/Script/Game/';
for (const file of ['Common/UI/DialogPanel.ts','Common/UI/BoxOpenCtrl.ts','Common/UI/GameFailEncouragePanel.ts','Match3/MainCtrl.ts']) {
  edit(game+file, s => s.split('\n').filter(line => !line.includes('GuideUtils') && !line.includes('hideUI(UIHudDef.MenuPanel)')).join('\n'));
}
edit('assets/Script/Application/M.ts', s => s.split('\n').filter(line => !line.includes('GuideUtils') && !line.includes('UIBase')).join('\n'));
edit(game+'Common/UI/UIBase.ts', s => s.replace(/    \/\*\* Bound by application composition;[^\n]*\n    public static onGameWinShown[^\n]*\n\n/, '').replace(/        if \(this.uiHudDef == UIHudDef.GameOverWin\) \{\s*UIBase.onGameWinShown[^\n]*\n        \}/, ''));
const tables = ['HotelCfg','HotelRoomCfg','IslandUnlockCfg','SlotBonusCfg'];
edit(game+'Config/GameTableMgr.ts', s => s.split('\n').filter(line => !tables.some(name => line.startsWith('import '+name+' '))).join('\n'));
dropMembers(game+'Config/GameTableMgr.ts', tables);
dropMembers(game+'Services/NetMgr.ts', ['exitVisit','visitFriend','interactive','getInteractiveList','getOnlineList','getFriendList']);
dropMembers(game+'Data/RuntimeMgr.ts', ['RoomCurrentSelectSubSlotCfg','CurrentGuestUserid']);
edit(game+'Data/RuntimeMgr.ts', s => s.replace(/^import \{ IConfigItem \}[^\n]*\n/m, ''));
edit(game+'Data/Const/Constant.ts', s => s.replace("    Map: 'MapScene',\n", '').replace("    Level: 'LevelScene',\n", '').replace("    Hotel: 'HotelScene'", "    Home: 'HomeScene'"));
const retiredUI = ['MenuPanel','GuideLayer','TalkPanel','BuildSuccess','CloudView','RoomFinishView','FriendRank'];
edit(game+'Data/Interface/UIData.ts', s => {
  const ast = ts.createSourceFile('UIData.ts', s, ts.ScriptTarget.Latest, true);
  const enumeration = ast.statements.find(n => ts.isEnumDeclaration(n) && n.name.text === 'UIHudDef');
  let next = 0;
  const members = enumeration.members.map(n => {
    const value = n.initializer ? Number(n.initializer.getText(ast)) : next;
    next = value + 1;
    return retiredUI.includes(n.name.getText(ast)) ? null : `    ${n.name.getText(ast)} = ${value},`;
  }).filter(Boolean);
  s = s.slice(0,enumeration.getStart(ast)) + 'export enum UIHudDef {\n'+members.join('\n')+'\n}' + s.slice(enumeration.end);
  return s.split('\n').filter(line => !retiredUI.some(name => line.includes('[UIHudDef.'+name+','))).join('\n');
});
