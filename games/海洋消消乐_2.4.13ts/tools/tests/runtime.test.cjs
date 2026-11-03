const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '../..');

// Execute production TypeScript with only the engine boundary replaced.
function load(file, dependencies = {}, globals = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => {
    if (!(name in dependencies)) throw new Error('Unexpected dependency: ' + name);
    return dependencies[name];
  }, console: { warn() {}, log() {} }, setTimeout, clearTimeout, ...globals }, { filename: file });
  return exports;
}
const { withTimeout } = load('assets/Script/Framework/Async/withTimeout.ts');

test('Match3 scene retains only controller hosts and prefab resources for the runtime HUD', () => {
  const scene=JSON.parse(fs.readFileSync(path.join(root,'assets/Scene/Match3.fire'),'utf8'));
  const component=type=>scene.find(item=>item.__type__===type);
  const bound=(owner,key,type)=>{
    assert.ok(owner[key] && Number.isInteger(owner[key].__id__),key+' binding is required');
    const target=scene[owner[key].__id__];
    assert.ok(target,key+' must reference an existing scene record');
    assert.equal(target.__type__,type,key+' must reference the correct component type');
    return target;
  };
  const hud=component('6c69bLGHLpD0ZesIClYcPLN');
  assert.ok(hud,'MainUiCtrl must be attached');
  for(const [key,name] of [['topBar','top'],['propBar','propsBar']]) {
    const node=bound(hud,key,'cc.Node');
    assert.equal(node._name,name);
    assert.ok(node._components.some(ref=>!scene[ref.__id__].__type__.startsWith('cc.')),key+' requires its game controller');
    assert.equal(node._children.length,0,key+' must not carry a hidden legacy picture hierarchy');
    assert.ok(node._components.every(ref=>scene[ref.__id__].__type__!=='cc.Sprite'),key+' must not carry an unused sprite');
  }
  for(const key of ['bottomBar','centerBar','dotPrefab','scoreBar','scoreNode','tmpTestPropShowLable','version'])
    assert.equal(Object.hasOwn(hud,key),false,'legacy HUD binding '+key+' must be removed');
  const info=component('66365FI5kZETLe/pwz9l3ID');
  assert.ok(info,'InfoPanelCtrl must remain attached');
  assert.equal(info.node.__id__,hud.topBar.__id__);
  assert.ok(info.collectItemPrefab && info.collectItemPrefab.__uuid__,'target prefab resource is still required');
  for(const key of ['energyProgress','stepLable','currentLvLable','scoreLable','collectContent'])
    assert.equal(Object.hasOwn(info,key),false,'runtime binding '+key+' must not reference deleted artwork');
  const main=component('9517dpB0FtF360gsWHLfv7H');
  assert.ok(main,'MainCtrl must be attached');
  assert.equal(Object.hasOwn(main,'bg'),false,'background must not require an obsolete scene sprite');
  const highlightNode=bound(main,'overHightLightNode','cc.Node');
  const highlight=highlightNode._components.map(ref=>scene[ref.__id__]).find(item=>item.__type__==='fce55gWXklC94HtJAPn/viu');
  assert.ok(highlight,'OverHightLightCtrl must remain attached');
  assert.equal(highlightNode._children.length,0,'countdown controller must not carry old picture nodes');
  for(const key of ['countDownNode','stepNode','stepLabel','countDownLabel'])
    assert.equal(Object.hasOwn(highlight,key),false,'countdown view '+key+' must be bound at runtime');

  const oldPictures=new Set([
    'a377ab27-eee8-4fcd-9f15-e444289601e1', // old moves plaque
    '01684c5b-279e-4542-8677-044141856f52', // old top decoration
    '6d2ae00d-d6e7-4240-a676-6927ea5f7855', // old target panel
    '1348b56c-bc03-4fd8-b9d4-c12c41545ed6', // old score fill
    'cabe3dd8-4e2e-4ab8-afb1-5b3d58699677', // score arrows
    '822b9b63-289f-4eb2-8a99-87ce677691d9', // old stars
    'a4077ac5-48a3-45a5-92d4-1ab9b7f7a225', // score track
    '65ce9ccc-bb4e-434b-8778-023bf0d61f5b', // alternate stars
    '3ed07d6c-1be8-4db9-bc75-9386ece2d555', // unused energy track
    '56b1291d-b8c6-4294-baf2-cf7fa8fa11d5', // old score background
    'edb6fafa-5ea0-40d2-8973-32cc3fc3cdad'  // old countdown image
  ]);
  for(const item of scene) {
    assert.equal(oldPictures.has(item._spriteFrame?.__uuid__),false,'removed HUD pictures must not survive as inactive scene sprites');
    assert.ok(!['ScoreProgressBar','progress_arrow','Auto_record','tmpTestLabel','overCountDown','socre','stepLimtTitle','stepLimtLable'].includes(item._name),'removed node survived: '+item._name);
  }
});

test('HUD restores only required controller hosts before initializing subcontrollers', () => {
  const file='assets/Script/Game/Match3/View/UI/MainUiCtrl.ts';
  const deps={};
  for(const m of fs.readFileSync(path.join(root,file),'utf8').matchAll(/from\s+["']([^"']+)["']/g))deps[m[1]]={};
  const nodes={top:{name:'top'},propsBar:{name:'propsBar'},'bottom/propsBar':{name:'propsBar'}};
  const lookups=[];
  const {default:HUD}=load(file,deps,{cc:{Component:class{},Node:class{},Prefab:class{},ProgressBar:class{},Label:class{},
    _decorator:{ccclass:T=>T,property:()=>()=>{}},find:name=>{lookups.push(name);return nodes[name];}}});
  const hud=new HUD();hud.node={parent:{},getChildByName:name=>nodes[name]};
  const boundTop={};hud.topBar=boundTop;
  let initialized=false;
  hud.initEvent=()=>{};hud.initView=()=>{};
  hud.initSubCtrl=()=>{assert.equal(hud.propBar.name,'propsBar');initialized=true;};
  hud.onLoad();assert.equal(initialized,true);assert.equal(hud.topBar,boundTop);
  assert.ok(lookups.every(name=>['top','propsBar','bottom/propsBar'].includes(name)),'preview recovery must not look for deleted artwork');
});

test('art atlases share one load, keep special frames and slice both old and mountain icons inside their textures', async()=>{
  const requests=[],frames=[];
  const {default:Art}=load('assets/Script/Game/Common/UI/ToyArt.ts',{}, {cc:{
    loader:{loadRes:(...args)=>requests.push(args)},Texture2D:class{},
    v2:(x,y)=>({x,y}),size:(width,height)=>({width,height}),
    rect:(x,y,width,height)=>({x,y,width,height}),SpriteFrame:class{constructor(texture,rect,rotated,offset,originalSize){this.texture=texture;this.rect=rect;this.originalSize=originalSize;frames.push(this);assert.deepEqual(originalSize,{width:rect.width,height:rect.height});}}
  }});
  assert.equal(Art.frame(100),null);
  const pending=Art.load();assert.equal(pending,Art.load());assert.equal(requests.length,1);
  requests[0][2](null,{width:1254,height:1254});
  const specialTypes=[100,101,102,103,104,10],specialFrames=specialTypes.map(type=>Art.frame(type));
  assert.equal(frames.length,16);assert.equal(Art.frame('mushroom').rect.x,941);
  for(let row=0;row<4;row++)for(let col=0;col<4;col++){
    const r=frames[row*4+col].rect;assert.ok(Number.isInteger(r.x)&&Number.isInteger(r.y));
    assert.ok(r.x+r.width<=1254&&r.y+r.height<=1254);
    if(col<3)assert.equal(r.x+r.width,frames[row*4+col+1].rect.x);
  }
  const mountainTexture={width:1254,height:1254};requests[1][2](null,mountainTexture);
  assert.equal(frames.length,25);
  for(const key of ['hammer','shuffle','cross','coin','heart','star','shop','book','lock']){
    const frame=Art.frame(key),r=frame.rect;
    assert.equal(frame.texture,mountainTexture,key+' must use the new UI atlas');
    assert.ok([r.x,r.y,r.width,r.height].every(Number.isInteger));
    assert.ok(r.x>=0&&r.y>=0&&r.width>0&&r.height>0);
    assert.ok(r.x+r.width<=mountainTexture.width&&r.y+r.height<=mountainTexture.height,key+' must stay inside its texture');
  }
  const mushroomFrame={name:'unchanged mushroom sprite'};requests[2][2](null,mushroomFrame);await pending;
  assert.equal(Art.frame('mushroom'),mushroomFrame);
  specialTypes.forEach((type,i)=>assert.equal(Art.frame(type),specialFrames[i],type+' must retain its special-piece frame'));
  assert.deepEqual(requests.map(args=>args[0]),['texture/toy-ui/toy-atlas','texture/mountain-ui/icons','texture/match3/objects/cells/obj0']);
  await Art.load();assert.equal(requests.length,3);
});

test('mountain art shares pending requests, resolves failed resources to null and permits retry',async()=>{
  const requests=[];
  const {default:Art}=load('assets/Script/Game/Common/UI/MountainArt.ts',{}, {cc:{loader:{loadRes:(...args)=>requests.push(args)},SpriteFrame:class{}}});
  const first=Art.frame('game-rain');assert.equal(first,Art.frame('game-rain'));assert.equal(requests.length,1);
  assert.equal(requests[0][0],'texture/mountain-ui/game-rain');
  requests[0][2](new Error('offline'),null);assert.equal(await first,null);
  const retry=Art.frame('game-rain');assert.notEqual(retry,first);assert.equal(requests.length,2);
  const frame={name:'rain'};requests[1][2](null,frame);assert.equal(await retry,frame);
  assert.equal(Art.frame('game-rain'),retry);assert.equal(requests.length,2);
});

test('mountain background ignores a late resource after destruction and covers the viewport for a live root',async()=>{
  const requests=[],created=[];
  class Node {
    constructor(name){this.name=name;this.children=[];this.components=[];this.valid=true;created.push(this);}
    set parent(parent){this.owner=parent;parent.children.push(this);}
    setContentSize(width,height){this.width=width;this.height=height;}
    addComponent(Type){const component=new Type();this.components.push(component);return component;}
    destroy(){this.valid=false;}
  }
  class Graphics {rect(){}fill(){}}
  class Sprite {} Sprite.SizeMode={CUSTOM:'custom'};
  const {default:Art}=load('assets/Script/Game/Common/UI/MountainArt.ts',{}, {cc:{Node,Graphics,Sprite,SpriteFrame:class{},
    loader:{loadRes:(...args)=>requests.push(args)},color:()=>({fromHEX:value=>value}),isValid:node=>node.valid}});
  const parent=new Node('Canvas'),removed=Art.background(parent,750,1334,'pine');
  assert.equal(removed.children.length,0);removed.destroy();
  requests[0][2](null,{getOriginalSize:()=>({width:941,height:1672})});await Promise.resolve();
  assert.equal(removed.children.length,0);assert.equal(created.filter(node=>node.name==='Artwork').length,0);
  const live=Art.background(parent,750,1624,'pine');await Promise.resolve();
  assert.equal(requests.length,1,'successful frame should be reused');assert.equal(live.children.length,1);
  const artwork=live.children[0];assert.ok(artwork.width>=750&&artwork.height>=1624);
  assert.ok(Math.abs(artwork.width/artwork.height-941/1672)<1e-10,'background must preserve its aspect ratio');
  const fallback=Art.background(parent,750,1334,'red-earth');requests[1][2](new Error('missing'),null);await Promise.resolve();
  assert.equal(fallback.valid,true);assert.equal(fallback.children.length,0);assert.ok(fallback.components[0] instanceof Graphics);
});

test('mountain theme cycles by level while match startup preserves the configured ground mapping',async()=>{
  const {default:Art}=load('assets/Script/Game/Common/UI/MountainArt.ts');
  for(const [level,theme] of [[0,'pine'],[1,'pine'],[20,'pine'],[21,'rain'],[40,'rain'],[41,'red-earth'],[60,'red-earth'],[61,'pine']])assert.equal(Art.gameTheme(level),theme);
  const stubImports=file=>Object.fromEntries([...fs.readFileSync(path.join(root,file),'utf8').matchAll(/from\s+["']([^"']+)["']/g)].map(m=>[m[1],{}]));
  const commonFile='assets/Script/Game/Common/Common.ts';
  const {default:Common}=load(commonFile,stubImports(commonFile),{window:{},cc:{v2:(x,y)=>({x,y})}});
  const file='assets/Script/Game/Match3/MainCtrl.ts',deps=stubImports(file),runtime={CurLevel:21},themes=[],jobs=[];
  deps['../Common/Common']={default:Common};deps['../../Application/M']={default:{runtime}};
  deps['../Common/UI/MountainArt']={default:{gameTheme:level=>Art.gameTheme(level),background:(parent,w,h,theme)=>{themes.push(theme);return {};}}};
  const {default:Main}=load(file,deps,{window:{},cc:{Component:class{},Sprite:class{},Node:class{},_decorator:{ccclass:T=>T,property:()=>()=>{}},winSize:{width:750,height:1334},find:()=>null}});
  const main=Object.create(Main.prototype),canvas={getChildByName:()=>null};main.node={parent:canvas};
  let background=1,started=0;main.gameModel={getLvData:()=>({levelInfo:{background}})};
  main.sendUpdateLoadingEvent=value=>assert.equal(value,100);main.scheduleOnce=callback=>jobs.push(callback);main.startGame=()=>started++;
  for(const [groundId,level,ground,theme] of [[1,21,'water','rain'],[2,21,'grass','rain'],[3,21,'sand','rain'],[3,41,'sand','red-earth']]){
    background=groundId;runtime.CurLevel=level;await main.initBg();
    assert.equal(main.currentBgIndex,groundId);assert.equal(runtime.CurBgIndex,groundId);assert.equal(main.groundType,ground);assert.equal(themes[themes.length-1],theme);
  }
  assert.equal(started,0);jobs.forEach(job=>job());assert.equal(started,4,'visual background must not hold up the scheduled game start');
});

test('last-move settlement waits for queued tasks, exchange and delayed bomb activation', () => {
  const file='assets/Script/Game/Match3/Model/GameModel.ts';
  const source=fs.readFileSync(path.join(root,file),'utf8'),deps={};
  for(const match of source.matchAll(/from\s+["']([^"']+)["']/g))deps[match[1]]={};
  const {default:Model}=load(file,deps);
  const model=Object.create(Model.prototype);
  model.task={gameTaskPool:[{}]};model.fallDict=new Set();model.cellDict=new Set();
  assert.equal(model.checkHaveFalling(),true);
  model.task.gameTaskPool=[];
  const cell={isEmpty:false,isFall:false,isDeath:false,extCtrl:{isResolvingExchange:true}};
  model.cellDict.add(cell);assert.equal(model.checkHaveFalling(),true);
  cell.extCtrl.isResolvingExchange=false;assert.equal(model.checkHaveFalling(),false);
  cell.isDeath=true;assert.equal(model.checkHaveFalling(),true);
});

test('win countdown starts at zero moves, never goes negative and is cancelled on restart', () => {
  const events=[];
  class Component {
    constructor(){this.jobs=new Set();}
    schedule(fn){this.jobs.add(fn);}
    unschedule(fn){this.jobs.delete(fn);}
    unscheduleAllCallbacks(){this.jobs.clear();}
  }
  const {default:Countdown}=load('assets/Script/Game/Common/UI/OverHightLightCtrl.ts',{
    '../../Match3/Model/GameModel':{default:{ins:{stepLimit:0}}},
    '../../../Application/M':{default:{event:{send:event=>events.push(event)}}},
    '../../Data/Const/Event':{Event:{GameCMD:{GameOverFall:'fall',ShowGameResult:'result'}}}
  },{cc:{_decorator:{ccclass:T=>T,property:()=>()=>{}},Component,Node:class{},Label:class{}}});
  const c=new Countdown();c.bindView({stepLabel:{string:'0'},stepNode:{},countDownNode:{},countDownLabel:{}});
  c.showCountDown();assert.deepEqual(events,['fall']);assert.equal(c.countDownLabel.string,'5');
  c.showStepNode();assert.equal(c.jobs.size,0);assert.equal(c.countDownNode.active,false);
  events.length=0;c.stepLabel.string='2';c.showCountDown();const reduce=[...c.jobs][0];
  reduce();assert.equal(c.stepLabel.string,'1');reduce();assert.equal(c.stepLabel.string,'0');
  assert.equal(c.jobs.has(reduce),false);assert.deepEqual(events,['fall']);
  c.onDestroy();assert.equal(c.jobs.size,0);
});

test('effect timeline: completion fires once; cancel resolves false and permits a new session', async () => {
  const {default: Timeline}=load('assets/Script/Game/Match3/View/EffectTimeline.ts');
  const timeline=new Timeline();let released=0,completed=0;
  const first=timeline.run(.3,()=>{},()=>released++).then(done=>{if(done)completed++;return done;});
  timeline.update(.2);assert.equal(released,0);timeline.update(.2);timeline.update(1);
  assert.equal(await first,true);assert.equal(completed,1);assert.equal(released,1);
  const abandoned=timeline.run(.3,()=>{},()=>released++).then(done=>{if(done)completed++;return done;});
  timeline.cancel();timeline.update(10);assert.equal(await abandoned,false);assert.equal(completed,1);
  assert.equal(released,2);assert.equal(timeline.count,0);
  const next=timeline.run(.1,()=>{},()=>released++);timeline.update(.2);assert.equal(await next,true);
});

function effectsHarness() {
  const strokes=[];let destroyed=0;
  class Graphics { clear(){} moveTo(x,y){this.from=[x,y];} lineTo(x,y){strokes.push([this.from,[x,y]]);} stroke(){} circle(){} fill(){} close(){} }
  Graphics.LineCap={ROUND:0};Graphics.LineJoin={ROUND:0};
  class Sprite {} Sprite.SizeMode={CUSTOM:0};
  class Node {
    constructor(){this.active=true;} addComponent(Type){const component=new Type();component.node=this;return component;}
    setContentSize(w,h){this.width=w;this.height=h;} setPosition(x,y){this.position=typeof x==='object'?x:{x,y};} destroy(){destroyed++;} convertToNodeSpaceAR(p){return p;}
  }
  const Common={GRID_W:84,GRID_H:84,convertCurWorldPos:p=>p,getPos:(x,y)=>({x:(x-3)*84,y:(4-y)*84})};
  const {default:Effects}=load('assets/Script/Game/Match3/View/SpecialEffects.ts',{
    './SpecialPieceArt':{default:{supports:type=>type>=100&&type<=104,frame:type=>({type})}},'./EffectTimeline':load('assets/Script/Game/Match3/View/EffectTimeline.ts'),
    '../../Common/Common':{default:Common},'../Model/GameModel':{default:{GridSize:{W:7,H:9}}}
  },{cc:{_decorator:{ccclass:Type=>Type},Component:class{},Node,Graphics,Sprite,v2:(x,y)=>({x,y}),color:()=>({fromHEX(){return this;}})}});
  const effects=new Effects();effects.node=new Node();return {effects,strokes,get destroyed(){return destroyed;}};
}

test('effect pool: overflow preserves completion; scene destruction cancels every pending effect', async () => {
  const h=effectsHarness(),effects=h.effects;
  const pending=Array.from({length:100},()=>effects.run(.2,()=>{}));
  assert.equal(effects.active,64);effects.update(.3);
  assert.ok((await Promise.all(pending)).every(Boolean));assert.equal(effects.active,0);assert.equal(effects.pool.length,64);
  const cancelled=Array.from({length:100},()=>effects.run(.2,()=>{}));
  effects.onDestroy();assert.ok((await Promise.all(cancelled)).every(done=>!done));
  assert.equal(effects.active,0);assert.equal(effects.pool.length,0);assert.equal(h.destroyed,64);
  assert.equal(await effects.run(.2,()=>{}),false);
});

test('line effects stop at board edges, including an off-centre origin', async () => {
  const h=effectsHarness(),p={x:84,y:84};
  const row=h.effects.line(p,101);h.effects.update(.25);
  assert.deepEqual(h.strokes.at(-1),[[-378,0],[210,0]]);
  h.effects.update(.3);assert.equal(await row,true);
  const column=h.effects.line(p,102);h.effects.update(.25);
  assert.deepEqual(h.strokes.at(-1),[[0,-462],[0,294]]);
  h.effects.update(.3);assert.equal(await column,true);
});

test('comet flight reaches its target, resets pooled icon geometry and rainbow cancellation settles',async()=>{
  const h=effectsHarness(),a={x:0,y:0,sub(b){return {mag:()=>Math.hypot(b.x,b.y)};}},b={x:252,y:168,sub(a){return {x:this.x-a.x,y:this.y-a.y,mag(){return Math.hypot(this.x,this.y);}};}};
  const flight=h.effects.flight(a,b,1,100);h.effects.update(.45);h.effects.update(.6);assert.equal(await flight,true);
  const icon=h.effects.pool[0].icon.node;assert.equal(icon.position.x,252);assert.ok(Math.abs(icon.position.y-168)<.001);
  const charge=h.effects.charge(a,104,.4);h.effects.update(.1);assert.deepEqual(icon.position,{x:0,y:0});assert.equal(icon.width,84);
  h.effects.update(.4);assert.equal(await charge,true);
  const link=h.effects.link(a,b);h.effects.update(.2);h.effects.cancel();assert.equal(await link,false);assert.equal(h.effects.active,0);
});

test('rainbow callback follows a completed hit and cancelled links cannot eliminate',async()=>{
  const file='assets/Script/Game/Match3/View/EffLayerCtrl.ts',deps={};
  for(const match of fs.readFileSync(path.join(root,file),'utf8').matchAll(/from\s+["']([^"']+)["']/g))deps[match[1]]={};
  const {default:Layer}=load(file,deps,{cc:{Component:class{},Prefab:class{},_decorator:{ccclass:T=>T,property:()=>()=>{}}}});
  const layer=Object.create(Layer.prototype);let finish,calls=0;
  layer.special={link:()=>new Promise(resolve=>finish=resolve)};
  layer.onShootStar({}, {},()=>calls++);assert.equal(calls,0);finish(true);await Promise.resolve();assert.equal(calls,1);
  layer.onShootStar({}, {},()=>calls++);finish(false);await Promise.resolve();assert.equal(calls,1);
});

test('special pieces reuse the production atlas and reject normal element IDs', () => {
  const frames=new Map([10,100,101,102,103,104].map(type=>[type,{type}]));
  const {default:Art,SpecialTypes}=load('assets/Script/Game/Match3/View/SpecialPieceArt.ts',{'../../Common/UI/ToyArt':{default:{frame:type=>frames.get(type)}}});
  for(const type of SpecialTypes)assert.equal(Art.frame(type),frames.get(type));
  assert.equal(Art.frame(0),null);assert.equal(Art.supports(0),false);
});

test('level path exposes only one locked preview and never scrolls into the locked progression',()=>{
  const {levelPathLimit}=load('assets/Script/Game/Home/LobbyCatalog.ts');
  for(const current of [1,3,51,499,500])assert.equal(levelPathLimit(current,500),Math.min(500,current+1));
});

test('validation fixtures cover all fifteen unordered combinations without changing player levels', () => {
  const {SpecialCases,createSpecialValidation}=load('assets/Script/Debug/SpecialValidation.ts');
  assert.equal(SpecialCases.length,21);
  const pairs=SpecialCases.filter(c=>c.second!=null);assert.equal(pairs.length,15);
  for(let i=0;i<SpecialCases.length;i++){
    const level=createSpecialValidation(i);
    assert.equal(level.levelInfo.levelReward,0);assert.equal(level.grid[0].map[4][2].type,SpecialCases[i].first);
    assert.equal(level.grid[0].map[0].filter(c=>c.born).length,7);
  }
});

function bombHarness(effectResult=true) {
  const CellType={Fish:10,Bomb1:100,Bomb2:101,Bomb3:102,Bomb4:103,Bomb5:104};
  const cells=Array.from({length:9},(_,y)=>Array.from({length:7},(_,x)=>({pos:{x,y},isDeath:false,getType:()=>(x+y)%4})));
  let eliminations=0;
  const game={CellList:cells,Lock:{unLockFallPos(){},unLockFallLockByKey(){}},isHavaObs:()=>false,execElimate(){eliminations++;}};
  const {BombModel}=load('assets/Script/Game/Match3/Model/BombModel.ts',{
    './CellBase':{CellBase:class {},MsgType:{}},'./GameModel':{default:{ins:game,GridSize:{H:9}}},
    '../../Common/Common':{default:{safeGet2ArrayValue:(items,p)=>items[p.y]&&items[p.y][p.x],convertCurWorldPos:p=>p,isMergeBomb:(a,b,x,y)=>(a===x&&b===y)||(a===y&&b===x)}},
    '../../Data/RuntimeMgr':{default:{}},'../../Common/GroupAnimatCtrl':{default:{}},'../../Data/Const/Constant':{CellType,ElimateType:{}},
    '../../Data/Const/TimeConfig':{GapTime:{}},'../View/EffLayerCtrl':{default:{ins:{playBombAndBomb:()=>Promise.resolve(effectResult)}}}
  },{cc:{v2:(x,y)=>({x,y})},console:{error(){}}});
  return {bomb:new BombModel(),cells,get eliminations(){return eliminations;}};
}
test('bomb rules: row, column, area, comet origin and small-bomb footprints remain intact', () => {
  const {bomb}=bombHarness(),pos={x:3,y:4};
  assert.equal(bomb.getBombCloseAry(101,pos).size,7);
  assert.equal(bomb.getBombCloseAry(102,pos).size,9);
  assert.equal(bomb.getBombCloseAry(100,pos).size,20); // centre is handled separately
  assert.equal(bomb.getBombCloseAry(103,pos).size,4);
  assert.equal(bomb.getBombCloseAry(10,pos).size,8);
  assert.equal(bomb.getBombCloseAry(100,{x:0,y:0}).size,7);
});
test('all fifteen bomb pairs still select their original combination rule', () => {
  const {bomb}=bombHarness();let selected;
  for(const method of ['fireRainbow','_caihongZhangyu','fireExecTypePlane','fireThreePlane','threeColAndRow','colAndRow','doubleRoundBomb'])bomb[method]=()=>{selected=method;};
  for(let first=100;first<=104;first++)for(let second=first;second<=104;second++){
    selected=null;bomb.onBombMergeBomb(first,second,{},1);
    const expected=second===104?(first===103?'_caihongZhangyu':'fireRainbow'):
      second===103?(first===103?'fireThreePlane':'fireExecTypePlane'):
      first===100?(second===100?'doubleRoundBomb':'threeColAndRow'):'colAndRow';
    assert.equal(selected,expected,`${first}+${second}`);
  }
});
test('cancelled combination cannot dispatch elimination into a subsequent game', async () => {
  const h=bombHarness(false);
  const target={extCtrl:{playBombSingleDestoryEff(){}},extData:{position:{x:0,y:0}},pos:{x:3,y:4},forcedResetType(){throw new Error('stale target');}};
  await h.bomb.doubleRoundBomb(target);
  assert.equal(h.eliminations,0);
});

test('old delayed combinations stay owned until completion and are killed on reset', () => {
  const deps={};
  const source=fs.readFileSync(path.join(root,'assets/Script/Game/Common/GroupAnimatCtrl.ts'),'utf8');
  for(const match of source.matchAll(/from ["']([^"']+)["']/g))deps[match[1]]={default:{}};
  deps['../../Framework/Utils/SingletonFactory']={SingletonFactory:{getInstance:Type=>new Type()}};
  deps['../Data/Const/Constant']={CellType:{},ElimateType:{}};
  class Timeline {totalProgress(){return this.progress||0;}kill(){this.killed=true;}}
  const {default:Group}=load('assets/Script/Game/Common/GroupAnimatCtrl.ts',deps,{gsap:{TimelineMax:Timeline}});
  const ctrl=Group.ins,old=ctrl.createTimeLine();
  for(const item of ctrl._animationPool)item.ts-=10000;
  const finished=ctrl.createTimeLine();finished.progress=1;
  const next=ctrl.createTimeLine();
  assert.equal(ctrl._animationPool.size,2);ctrl.destory();
  assert.equal(old.killed,true);assert.equal(next.killed,true);assert.equal(ctrl._animationPool.size,0);
});

test('shop purchase debits the configured coins and grants exactly one prop; rejection is unchanged', () => {
  const {purchaseProp}=load('assets/Script/Game/Home/LobbyCatalog.ts');
  let coins=1000,count=2,reads=0;
  const runtime={getCurrency:()=>coins,getPropData:()=>{reads++;return {count};},addCurrency:(type,n)=>{assert.equal(type,0);coins+=n;},updatePropCount:(type,n)=>{assert.equal(type,101);count+=n;}};
  const cfg={id:101,price:650,currencyType:0};
  assert.equal(purchaseProp(runtime,cfg),true);assert.equal(coins,350);assert.equal(count,3);assert.equal(reads,1);
  assert.equal(purchaseProp(runtime,cfg),false);assert.equal(coins,350);assert.equal(count,3);
  assert.equal(purchaseProp(runtime,{...cfg,price:-1}),false);assert.equal(purchaseProp(runtime,{...cfg,currencyType:1}),false);
});

test('level list includes the current level and clamps both ends of the configured progression', () => {
  const {levelWindow}=load('assets/Script/Game/Home/LobbyCatalog.ts');
  for(const level of [1,2,51,499,500]){
    const list=levelWindow(level,500);assert.equal(list.length,20);assert.ok(list.includes(level));assert.ok(list.every(n=>n>=1&&n<=500));
  }
});

test('local player bootstrap preserves saved coins, energy and inventory', () => {
  let saved={coin:850,power:12,propData:{101:{count:4}}},writes=0;
  const {default:Player}=load('assets/Script/Game/Data/Player/PlayerInfo.ts',{
    '../Const/Constant':{NativeKey:{PlayerInfo:'player'}},'../StorageMgr':{StorageMgr:{Storage:{getObject:(key,fallback)=>saved||fallback,setObject(){writes++;},removeAll(){throw new Error('must not erase save');}}}}
  });
  const player=new Player();player.initRemotData(null);assert.equal(player.coin,850);assert.equal(player.power,12);assert.equal(player.propData[101].count,4);assert.equal(writes,0);
  saved=null;const fresh=new Player();fresh.initRemotData(null);assert.equal(fresh.power,30);assert.equal(fresh.coin,0);assert.equal(writes,1);
});

test('home navigation: middle default, page limits, horizontal swipes and vertical scrolling', () => {
  const { HomeNavigation, HomePages } = load('assets/Script/Game/Home/HomeNavigation.ts');
  const navigation = new HomeNavigation();
  assert.equal(HomePages.length, 3);
  assert.equal(navigation.index, 1);
  assert.equal(navigation.swipe(-100, 5), 2);
  assert.equal(navigation.swipe(-100, 5), 2);
  assert.equal(navigation.swipe(100, 5), 1);
  assert.equal(navigation.swipe(100, 5), 0);
  assert.equal(navigation.swipe(100, 5), 0);
  assert.equal(navigation.select(1), 1);
  assert.equal(navigation.swipe(20, 0), 1);
  assert.equal(navigation.swipe(80, 100), 1);
  assert.equal(navigation.select(-1), 0);
  assert.equal(navigation.select(99), 2);
});

test('startup timeout: success, rejection, timeout and late rejection', async () => {
  assert.equal(await withTimeout(Promise.resolve(7), 50, 0, 'ok'), 7);
  assert.equal(await withTimeout(Promise.reject(new Error('offline')), 50, 0, 'fail'), 0);
  let rejectLate;
  const pending = new Promise((_, reject) => { rejectLate = reject; });
  assert.equal(await withTimeout(pending, 5, 'local', 'timeout'), 'local');
  rejectLate(new Error('late'));
  await new Promise(resolve => setTimeout(resolve, 5));
});

function tableHarness() {
  const requests = [];
  const { BytesTable } = load('assets/Script/Game/Config/Loader/BytesTable.ts', {
    '../Paths': { default: { NativeTablePath: 'csv/' } }
  }, { cc: { JsonAsset: class {}, loader: { loadRes(...args) { requests.push(args); } } } });
  const { BaseTable } = load('assets/Script/Game/Config/Loader/BaseTable.ts', {
    './BytesTable': { BytesTable },
    '../../../Framework/Utils/Util': { Util: { Tool: { isNumber: x => typeof x === 'number' } } },
    '../../../Framework/Utils/Log': { Log: { i() {} } }
  });
  return { BaseTable, requests };
}
test('tables: concurrent callers share a load, lookup works and loaded tables stay cached', async () => {
  const { BaseTable, requests } = tableHarness();
  const table = new BaseTable('id', 'example', null, null);
  const first = table.load();
  assert.equal(table.load(), first);
  assert.equal(requests.length, 1);
  requests[0][2](null, { json: [{ id: 1, value: 42 }] });
  await first;
  assert.equal(table.isReady, true);
  assert.equal(table.getByPrimaryKey(1).value, 42);
  await table.load();
  assert.equal(requests.length, 1);
});
test('tables: failed loads can retry; malformed JSON rejects instead of hanging', async () => {
  const { BaseTable, requests } = tableHarness();
  const table = new BaseTable('id', 'example', null, null);
  const first = table.load();
  requests[0][2](new Error('missing'));
  await assert.rejects(first, /missing/);
  const second = table.load();
  requests[1][2](null, { json: 'invalid json' });
  await assert.rejects(second);
  const third = table.load();
  requests[2][2](null, { json: [{ id: 2 }] });
  await third;
  assert.equal(table.getByPrimaryKey(2).id, 2);
});
test('tables: externally supplied daily task data does not initiate another load', async () => {
  const { BaseTable, requests } = tableHarness();
  const table = new BaseTable('id', 'DailyTaskInfo', null, null);
  table.setData([{ id: 3 }]);
  await table.load();
  assert.equal(requests.length, 0);
  assert.equal(table.getByPrimaryKey(3).id, 3);
});

test('cache monitor uses public cache, starts once and can stop', () => {
  const handlers = new Set();
  let count = 0, time = 1000, warnings = 0;
  const loader = {};
  Object.defineProperty(loader, '_cache', { get: () => ({}) });
  const { default: CacheMgr } = load('assets/Script/Framework/Resources/CacheMgr.ts', {
    '../Utils/SingletonFactory': { SingletonFactory: { getInstance: Type => new Type() } }
  }, {
    Date: { now: () => time },
    cc: {
      loader, Director: { EVENT_AFTER_UPDATE: 'update' },
      director: { on: (_, fn, target) => handlers.add(target), off: (_, fn, target) => handlers.delete(target) },
      assetManager: { assets: { get count() { return count; } } }
    }
  });
  const cache = CacheMgr.ins;
  cache.onWarning = () => warnings++;
  cache.start(); cache.start();
  assert.equal(handlers.size, 1);
  cache.check();
  count = 301; time += 1000; cache.check();
  assert.equal(warnings, 1);
  time += 1000; cache.check();
  assert.equal(warnings, 1);
  cache.stop();
  assert.equal(handlers.size, 0);
});

test('bootstrap shares startup and retries a synchronous initialization failure', async () => {
  let starts = 0, logins = 0, tableLoads = 0;
  const manager = {
    init() { if (++starts === 1) throw new Error('init failed'); },
    platform: { init() {} }, net: { login() { logins++; return Promise.resolve(null); } },
    runtime: { initRemotData() {} }
  };
  const { default: Bootstrap } = load('assets/Script/Application/GameBootstrap.ts', {
    './M': { default: manager },
    '../Game/Data/Const/Constant': { APPID: 'local-test' },
    '../Game/Config/GameTableMgr': { GameTableMgr: { ins: { execute() { tableLoads++; return Promise.resolve(true); } } } },
    '../Game/Config/Paths': { default: {} },
    '../Game/Config/Tables/DailyTaskInfo': { default: class {} },
    '../Game/Config/Loader/BaseTable': { BaseTable: class {} },
    '../Framework/Async/withTimeout': { withTimeout }
  });
  await assert.rejects(Bootstrap.run(), /init failed/);
  const startup = Bootstrap.run();
  assert.equal(Bootstrap.run(), startup);
  await startup;
  await Bootstrap.run();
  assert.equal(starts, 2);
  assert.equal(logins, 1);
  assert.equal(tableLoads, 1);
});
