const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '../..');

function load(file, dependencies, globals) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017}}).outputText;
  const exports = {};
  vm.runInNewContext(code, {exports, require: name => {
    assert.ok(Object.hasOwn(dependencies, name), 'Unexpected dependency: ' + name);
    return dependencies[name];
  }, console, ...globals}, {filename: file});
  return exports;
}
function imports(file) {
  return Object.fromEntries([...fs.readFileSync(path.join(root, file), 'utf8').matchAll(/from\s+["']([^"']+)["']/g)].map(match => [match[1], {}]));
}

class Node {
  constructor(name = '') { this.name=name; this.children=[]; this.components=new Map(); this.active=true; this.scale=1; this.width=100; this.height=100; this.x=0; this.y=0; }
  get parent() { return this.owner; }
  set parent(parent) { this.removeFromParent(); this.owner=parent; if(parent)parent.children.push(this); }
  removeFromParent() { if(this.owner)this.owner.children=this.owner.children.filter(node=>node!==this); this.owner=null; }
  destroy() { this.destroyed=true; this.removeFromParent(); }
  setContentSize(width,height) { if(typeof width==='object')({width,height}=width); this.width=width; this.height=height; }
  getContentSize() { return {width:this.width,height:this.height}; }
  setAnchorPoint(x,y) { this.anchorX=x; this.anchorY=y; }
  setPosition(x,y) { if(typeof x==='object')({x,y}=x); this.x=x; this.y=y; }
  setScale(value) { this.scale=value; }
  stopAllActions() {}
  getChildByName(name) { return this.children.find(node=>node.name===name)||null; }
  getComponent(Type) { return this.components.get(Type)||null; }
  addComponent(Type) { const instance=new Type(); instance.node=this; this.components.set(Type,instance); return instance; }
}
class Component {
  constructor() { this.jobs=new Map(); }
  schedule(fn,interval,repeat) { this.jobs.set(fn,{remaining:repeat==null?Infinity:repeat+1}); }
  unschedule(fn) { this.jobs.delete(fn); }
  unscheduleAllCallbacks() { this.jobs.clear(); }
  tick() { for(const [fn,job] of [...this.jobs]) { fn(); if(--job.remaining===0)this.jobs.delete(fn); } }
}
class Label { constructor() { this.string=''; } getComponent() { return null; } }
class Graphics { roundRect(){} fill(){} moveTo(){} lineTo(){} stroke(){} }
class Widget {} Widget.AlignMode={ALWAYS:1}; Widget.prototype.updateAlignment=function(){};
const cc={Component,Node,Label,Graphics,Widget,Layout:class{},Sprite:class{},Animation:class{},Prefab:class{},
  _decorator:{ccclass:Type=>Type,property:()=>()=>{}},winSize:{width:750,height:1334},
  color:()=>({fromHEX:value=>value}),v2:(x,y)=>({x,y})};
const UI={
  node(parent,name,x=0,y=0) { const node=new Node(name); node.parent=parent; node.setPosition(x,y); return node; },
  box(parent,name,width,height,x,y) { const node=this.node(parent,name,x,y); node.setContentSize(width,height); return node; },
  text(parent,value,size,x,y) { const node=this.node(parent,'text',x,y); const label=node.addComponent(Label); label.string=value; return label; },
  tap(){},icon(){}
};

function infoHarness() {
  const file='assets/Script/Game/Match3/View/UI/InfoPanelCtrl.ts',deps=imports(file);
  let targets=new Map([['0',35],['2',22]]), energyResets=0;
  const runtime={CurLevel:1,currentScore:0},model={stepLimit:25,getCollect:()=>targets};
  class CollectItem {}
  const created=[];
  deps['./CollectItemCtrl']={default:CollectItem};
  deps['../../Model/GameModel']={default:{ins:model}};
  deps['../../../Data/RuntimeMgr']={default:{ins:runtime}};
  deps['../../Model/EnergyModel']={EnergyModel:{ins:{setCurLevel:()=>energyResets++}}};
  deps['../../../Common/Common']={default:{getWorldPos:node=>({x:node.x,y:node.y})}};
  deps['../../../Common/UI/ForestUI']={default:UI,Palette:{ink:'#213f2f'}};
  deps['../../../../Application/M']={default:{nodePool:{createItem:()=>{
    const node=new Node('target');
    const ctrl={init(key,count){this.key=key;this.amount=count;},icon:{node:new Node('icon')},count:{node:new Node('count')}};
    node.components.set(CollectItem,ctrl); created.push({node,ctrl}); return node;
  }}}};
  const {default:Info}=load(file,deps,{cc});
  const info=new Info();info.node=new Node('top');info.collectItemPrefab={};
  const view={stepLabel:new Label(),levelLabel:new Label(),scoreLabel:new Label(),collectContent:new Node('CollectTargets'),collectWidth:300};
  return {Info,info,view,runtime,model,created,setTargets:value=>targets=value,get energyResets(){return energyResets;}};
}

test('runtime info bindings refresh moves, score, level and replace targets on retry',()=>{
  const h=infoHarness(),{info,view}=h;
  info.bindView(view); info.init();
  assert.equal(view.stepLabel.string,'25'); assert.equal(view.levelLabel.string,'第 1 关'); assert.equal(view.scoreLabel.string,'0');
  assert.equal(view.collectContent.children.length,2); assert.equal(h.energyResets,1);
  assert.equal(h.created[0].ctrl.count.string,'35'); assert.equal(h.created[1].ctrl.count.string,'22');
  const oldTargets=view.collectContent.children.slice();
  h.model.stepLimit=19; h.runtime.currentScore=780; info.onUpdateInfo();
  assert.equal(view.stepLabel.string,'19'); assert.equal(view.scoreLabel.string,'780');
  h.runtime.CurLevel=2;h.runtime.currentScore=0;h.model.stepLimit=30;h.setTargets(new Map([['1',12],['3',18],['box',3],['stone',4]]));
  info.init();
  assert.equal(view.levelLabel.string,'第 2 关'); assert.equal(view.stepLabel.string,'30'); assert.equal(view.scoreLabel.string,'0');
  assert.equal(view.collectContent.children.length,4,'retry must not append targets to the previous set');
  assert.ok(oldTargets.every(node=>node.destroyed&&!node.parent),'old target listeners can be destroyed with their nodes');
  assert.ok(view.collectContent.width*view.collectContent.scale<=view.collectWidth,'four goals must fit the live target panel');
  assert.deepEqual(info.getCollectPos('0'),{x:0,y:0},'removed target must not leave a stale fly-to endpoint');
  assert.equal(h.energyResets,2,'combo tracking still resets for every new game');
  h.setTargets(null);info.init();assert.equal(view.collectContent.children.length,0);assert.equal(view.collectContent.scale,1);
});

test('runtime countdown binds safely, completes a zero-move win once and cancels on rebind',()=>{
  const file='assets/Script/Game/Common/UI/OverHightLightCtrl.ts',events=[],model={stepLimit:0};
  const {default:Countdown}=load(file,{
    '../../Match3/Model/GameModel':{default:{ins:model}},
    '../../../Application/M':{default:{event:{send:(...args)=>events.push(args)}}},
    '../../Data/Const/Event':{Event:{GameCMD:{GameOverFall:'fall',ShowGameResult:'result'}}}
  },{cc});
  const countdown=new Countdown();
  assert.doesNotThrow(()=>{countdown.showStepNode();countdown.showCountDown();});
  assert.equal(countdown.jobs.size,0,'startup before binding cannot leave a countdown callback');
  const view={stepNode:new Node('Moves'),stepLabel:new Label(),countDownNode:new Node('BonusCountdown'),countDownLabel:new Label()};
  view.stepLabel.string='0';countdown.bindView(view);countdown.showCountDown();
  assert.equal(view.countDownLabel.string,'5');assert.deepEqual(events,[['fall']]);
  for(let i=0;i<8;i++)countdown.tick();
  assert.equal(view.countDownLabel.string,'0');assert.equal(view.stepLabel.string,'0');
  assert.deepEqual(events,[['fall'],['result',true]]);assert.equal(countdown.jobs.size,0);
  events.length=0;view.stepLabel.string='2';countdown.showCountDown();countdown.tick();
  assert.equal(view.stepLabel.string,'1');countdown.tick();assert.equal(view.stepLabel.string,'0');assert.deepEqual(events,[['fall']]);
  const next={stepNode:new Node('Moves'),stepLabel:new Label(),countDownNode:new Node('BonusCountdown'),countDownLabel:new Label()};
  next.stepLabel.string='25';countdown.bindView(next);countdown.tick();
  assert.equal(countdown.jobs.size,0);assert.equal(next.countDownNode.active,false);assert.equal(next.stepLabel.string,'25');
  assert.deepEqual(events,[['fall']],'cancelled settlement must not send a result into a retried game');
  countdown.showCountDown();countdown.onDestroy();assert.equal(countdown.jobs.size,0);
});

test('MainUiCtrl creates one HUD, rebinds it on retry and retains scoring and win rewards without legacy stars',()=>{
  const h=infoHarness(),file='assets/Script/Game/Match3/View/UI/MainUiCtrl.ts',deps=imports(file),events=[],dialogs=[],savedStars=[],nextLevels=[],currencies=[];
  const {default:Countdown}=load('assets/Script/Game/Common/UI/OverHightLightCtrl.ts',{
    '../../Match3/Model/GameModel':{default:{ins:h.model}},
    '../../../Application/M':{default:{event:{send:(...args)=>events.push(args)}}},
    '../../Data/Const/Event':{Event:{GameCMD:{GameOverFall:'fall',ShowGameResult:'result'}}}
  },{cc});
  const countdown=new Countdown(),runtime={...h.runtime,
    addScore(amount){h.runtime.currentScore+=amount;return h.runtime.currentScore;},
    savaLvData(stars){savedStars.push(stars);return true;},
    addCurrency(type,amount){currencies.push([type,amount]);},setMatch3Level(level){nextLevels.push(level);}
  };
  deps['../../../Common/UI/ForestUI']={default:UI};
  deps['./InfoPanelCtrl']={default:h.Info};
  deps['../../../Common/UI/OverHightLightCtrl']={default:Countdown};
  deps['../../../Data/Const/Event']={Event:{Effect:{AddScore:'score'}}};
  deps['../../../Data/Interface/UIData']={UIHudDef:{GameOverWin:'win'}};
  deps['../../../Common/UI/UIMgr']={default:{ins:{showUI:(...args)=>dialogs.push(args)}}};
  deps['../../../Services/ReportMgr']={default:{ins:{reportMatchOver(){}}}};
  deps['../../../../Application/M']={default:{runtime,event:{send:(...args)=>events.push(args)},table:{
    LevelUpReward:{getByPrimaryKey:()=>({rewards:[{type:0,count:50}]})},PropInfo:{getData:()=>[]}
  }}};
  const {default:HUD}=load(file,deps,{cc:{...cc,log(){}}});
  const hud=new HUD();hud.node=new Node('ui');hud.topBar=h.info.node;hud.topBar.parent=hud.node;
  hud.topBar.components.set(h.Info,h.info);hud.propBar=new Node('propsBar');hud.propBar.parent=hud.node;
  const props=Array.from({length:4},(_,index)=>{const node=new Node(String(index));node.parent=hud.propBar;return node;});
  const main={overHightLightNode:{getComponent:()=>countdown}},cfg={collect:new Map(),levelInfo:{score:[500,1000,2000]}};
  hud.init(main,cfg);
  const firstRoot=hud.node.getChildByName('ModernHUD'),collect=hud.getCollectContent(),step=h.info.stepLable;
  assert.ok(firstRoot);assert.equal(collect.children.length,2);assert.equal(countdown.stepLabel,step);assert.equal(step.string,'25');
  assert.equal(hud.propBar.parent,firstRoot);assert.deepEqual(hud.propBar.children,props);
  hud.updateScore(640,{x:12,y:34});assert.equal(h.runtime.currentScore,640);assert.equal(h.info.scoreLable.string,'640');
  assert.deepEqual(events,[['score',640,{x:12,y:34},false]],'score feedback must still be sent');
  countdown.showCountDown();assert.equal(countdown.jobs.size,1);
  h.info.stepLable=new Label();h.model.stepLimit=30;h.runtime.currentScore=0;h.runtime.CurLevel=2;
  h.setTargets(new Map([['3',20]]));hud.init(main,cfg);
  assert.equal(hud.node.children.filter(node=>node.name==='ModernHUD').length,1,'retry must not duplicate HUD panels');
  assert.equal(hud.node.getChildByName('ModernHUD'),firstRoot);assert.equal(hud.getCollectContent(),collect);
  assert.equal(h.info.stepLable,step,'retry must bind the surviving labels again');
  assert.equal(step.string,'30');assert.equal(h.info.currentLvLable.string,'第 2 关');assert.equal(h.info.scoreLable.string,'0');
  assert.equal(collect.children.length,1);assert.equal(countdown.jobs.size,0);assert.equal(countdown.countDownNode.active,false);
  assert.equal(hud.propBar.children.length,4);assert.equal(h.energyResets,2);
  hud.showResultDialog(true,10,40);
  assert.deepEqual(savedStars,[3],'removing the obsolete star bar must preserve existing saved progress semantics');
  assert.deepEqual(currencies,[[0,50]]);assert.deepEqual(nextLevels,[2]);
  assert.equal(dialogs.length,1);assert.equal(dialogs[0][0],'win');assert.equal(dialogs[0][1].data,3);assert.equal(dialogs[0][1].rewardCoins,50);
});

test('Match3 startup cancels settlement before loading, then binds the HUD before restoring moves and tutorial goals',async()=>{
  const file='assets/Script/Game/Match3/MainCtrl.ts',deps=imports(file),order=[],targets=new Node('CollectContent'),tutorial={};
  let releaseLevel,releaseArt,artReached,viewBound=false;
  const artPending=new Promise(resolve=>artReached=resolve);
  const data={levelInfo:{score:[1,2,3]},collect:new Map()};
  deps['../../Application/M']={default:{runtime:{SelectLevel:0,addGameCount(){},gameStar(){}},event:{send(){}}}};
  deps['../Data/Interface/Level']={default:{ins:{getLvCfgData:()=>{
    order.push('load-level');return new Promise(resolve=>releaseLevel=()=>resolve(data));
  },preLoadNextCfg(){}}}};
  deps['../Data/Const/Event']={Event:{UI:{UpdateTmpLoadingProgress:'loading'}}};
  deps['../Data/Const/Constant']={NewbieOpt:false,GameState:{preReady:'ready'}};
  deps['./Model/GameModel']={default:class{}};
  deps['../Common/UI/ToyArt']={default:{load:()=>new Promise(resolve=>{releaseArt=resolve;artReached();})}};
  deps['./Skin/Match3Skin']={default:{load:async()=>order.push('skin')}};
  deps['./ResCtrl']={default:{load:async()=>order.push('resources')}};
  const {default:Main}=load(file,deps,{cc:{...cc,find:()=>new Node('Canvas')},window:{}});
  const main=Object.create(Main.prototype);main.node=new Node('main');
  main.uiNode={getComponent:()=>({init(owner,cfg){assert.equal(owner,main);assert.equal(cfg,data);viewBound=true;order.push('hud');},getCollectContent:()=>targets})};
  main.effNode={getComponent:()=>({})};main.overMask={};main.maskNode=new Node('board');
  main.overHightLightNode={getComponent:()=>({
    cancelCountDown(){order.push('cancel-settlement');},
    showStepNode(){assert.equal(viewBound,true,'move restoration must not access missing scene-era labels');order.push('moves');}
  })};
  main.TutorialPanel={getComponent:()=>tutorial};main.initBg=()=>order.push('background');main.initMapGridView=()=>order.push('board');
  const startup=main.initGame();
  assert.deepEqual(order,['cancel-settlement','load-level'],'old settlement must be cancelled before the first asynchronous level load');
  assert.equal(viewBound,false);releaseLevel();await artPending;
  assert.equal(viewBound,false);assert.deepEqual(order,['cancel-settlement','load-level'],'HUD must wait for art and model initialization');
  releaseArt();await startup;
  assert.deepEqual(order,['cancel-settlement','load-level','skin','resources','hud','moves','background','board']);
  assert.equal(tutorial.goal,targets,'tutorial must point to the current target container');
});
