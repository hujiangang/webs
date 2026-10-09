import ToyArt from '../Common/UI/ToyArt';
import GameBootstrap from '../../Application/GameBootstrap';
import M from '../../Application/M';
import Apps from '../../Application/Apps';
import Common from '../Common/Common';
import { Scene, MaxPowerCount } from '../Data/Const/Constant';
import { HomeNavigation, HomePages } from './HomeNavigation';
import Level from '../Data/Interface/Level';
import { SpecialCases, createSpecialValidation } from '../../Debug/SpecialValidation';
import UI, { Palette } from '../Common/UI/ForestUI';
import PlayerPanels from '../Common/UI/PlayerPanels';
import { JournalEntry, PropPresentation, levelPathLimit } from './LobbyCatalog';

const {ccclass}=cc._decorator;
@ccclass
export default class HomeScene extends cc.Component {
    private navigation=new HomeNavigation();
    private ready=false;
    private entering=false;
    private touchStart:cc.Vec2=null;
    private content:cc.Node=null;
    private tabs:cc.Node=null;
    private header:cc.Node=null;
    private menu:cc.Node=null;
    private coins:cc.Label=null;
    private power:cc.Label=null;
    private journal:JournalEntry[]=[];
    async onLoad(){
        cc.debug.setDisplayStats(false);Common.curScene=Scene.Home;
        UI.background(this.node,cc.winSize.width,cc.winSize.height);
        this.content=UI.node(this.node,'Pages');this.header=UI.node(this.node,'Header');this.tabs=UI.node(this.node,'Tabs');
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
        this.showPage();
        try {
            await Promise.all([GameBootstrap.run(),ToyArt.load()]);if(!cc.isValid(this.node))return;
            this.ready=true;this.showPage();this.schedule(this.refreshBalances,1);
            cc.loader.loadRes('config/mushroom-journal',cc.JsonAsset,(error,asset:cc.JsonAsset)=>{
                if(!error && cc.isValid(this.node)){this.journal=asset.json.entries||[];if(this.navigation.index===2)this.showPage();}
            });
        }catch(error){console.error('主页初始化失败',error);if(cc.isValid(this.node))this.notice('加载失败，请重新进入');}
    }
    private refreshBalances(){
        if(this.coins)this.coins.string=String(M.runtime.getCurrency(0));
        if(this.power)this.power.string=M.runtime.getCurrency(2)+' / '+MaxPowerCount;
    }
    private showPage(){
        UI.clear(this.content);UI.clear(this.tabs);UI.clear(this.header);this.menu=null;
        const w=Math.min(cc.winSize.width-48,700),h=cc.winSize.height;
        const y=h/2-96;
        const avatar=UI.box(this.header,'Avatar',90,90,-w/2+45,y,'#75CDF6',28,true);UI.icon(avatar,'mushroom',0,0,88);UI.tap(avatar,()=>{if(this.ready)PlayerPanels.profile(this.node);});
        const energy=UI.panel(this.header,'Energy',192,64,-w/2+216,y,'#ECF6FF',32);UI.icon(energy,'heart',-63,0,70);this.power=UI.text(energy,'—',27,25,0,Palette.ink,125);
        const wallet=UI.panel(this.header,'Wallet',192,64,w/2-196,y,'#ECF6FF',32);UI.icon(wallet,'coin',-62,0,70);this.coins=UI.text(wallet,'—',29,22,0,Palette.ink,126);
        UI.tap(wallet,()=>{this.navigation.select(0);this.showPage();});
        const menu=UI.box(this.header,'MenuButton',76,76,w/2-38,y,Palette.blue,28,true);UI.icon(menu,'menu',0,0,46);UI.tap(menu,()=>this.toggleMenu());
        if(this.ready)this.refreshBalances();
        const bar=UI.panel(this.tabs,'BottomNavigation',cc.winSize.width+8,157,0,-h/2+75,'#2457B8',0);
        HomePages.forEach((page,i)=>{
            const selected=i===this.navigation.index,x=(i-1)*w/3;
            const tab=selected?UI.panel(bar,'Tab-'+page.id,w/3-14,139,x,9,'#43A5ED',25):UI.node(bar,'Tab-'+page.id,x,0);
            tab.setContentSize(w/3-14,139);
            UI.icon(tab,['shop','mushroom','book'][i],0,25,selected?105:94);UI.text(tab,page.title,29,0,-43,'#FFFFFF',180);
            UI.tap(tab,()=>{if(!this.entering){this.navigation.select(i);this.showPage();}});
        });
        if(!this.ready){UI.text(this.content,'正在加载…',30);return;}
        if(this.navigation.index===0)this.drawShop(w,h);
        else if(this.navigation.index===2)this.drawJournal(w,h);
        else this.drawLevels(w,h);
    }
    private drawLevels(w:number,h:number){
        const current=Math.min(500,M.runtime.getMatch3Level()),gap=250,topLevel=levelPathLimit(current,500);
        const viewHeight=h-540,view=UI.node(this.content,'LevelViewport',0,50);view.setContentSize(w,viewHeight);view.addComponent(cc.Mask);
        const firstY=120,list=UI.node(view,'LevelList',0,viewHeight/2);list.anchorY=1;
        list.setContentSize(w,Math.max(viewHeight,firstY+(topLevel-1)*gap+145));
        const scroll=view.addComponent(cc.ScrollView);scroll.content=list;scroll.horizontal=false;scroll.vertical=true;
        scroll.inertia=true;scroll.brake=.7;scroll.elastic=true;scroll.bounceDuration=.28;
        const rail=UI.node(list,'Rail');const g=rail.addComponent(cc.Graphics);
        for(const line of [{w:24,c:'#276CC5'},{w:12,c:'#A6DAFF'}]){g.strokeColor=cc.color().fromHEX(line.c);g.lineWidth=line.w;g.moveTo(0,-firstY);g.lineTo(0,-firstY-(topLevel-1)*gap);g.stroke();}
        const nodes=UI.node(list,'VisibleLevels');let rendered=-1;
        const render=()=>{
            const start=Math.max(0,Math.min(Math.max(0,topLevel-12),Math.floor(scroll.getScrollOffset().y/gap)-2));
            if(start===rendered)return;rendered=start;UI.clear(nodes);
            for(let i=start;i<Math.min(topLevel,start+12);i++){
                const lv=topLevel-i,active=lv===current,locked=lv>current;
                const n=UI.box(nodes,'Level-'+lv,active?218:182,active?196:164,0,-firstY-i*gap,locked?'#869BB8':active?Palette.green:Palette.blue,42,true);
                UI.text(n,String(lv),active?75:61,0,3,'#FFFFFF',160,100);
                if(locked)UI.icon(n,'lock',72,-63,60);
                if(lv<current)UI.icon(n,'star',70,-63,54);
                UI.tap(n,()=>locked?this.notice('通过当前关卡后解锁'):this.startGame(lv));
            }
        };
        view.on('scrolling',render);render();
        const start=UI.button(this.content,'开始游戏',Math.min(500,w-70),106,0,-h/2+237,()=>this.startGame(),Palette.green);
        UI.text(this.content,'第 '+current+' 关',30,0,-h/2+315,'#FFFFFF',300,45);
    }

    private drawShop(w:number,h:number){
        UI.text(this.content,'商店',43,0,h/2-224,'#FFFFFF');
        const cardW=(w-30)/2,cardH=Math.min(390,(h-415)/2-16),top=h/2-290;
        [100,101,102,103].forEach((type,i)=>{
            const info=PropPresentation[type],cfg=M.table.PropInfo.getByPrimaryKey(type);
            const card=UI.panel(this.content,'Shop-'+type,cardW,cardH,(i%2-.5)*(cardW+30),top-cardH/2-Math.floor(i/2)*(cardH+24));
            const icon=UI.propIcon(card,type,166);icon.y=cardH/2-99;
            UI.text(card,info.name,31,0,cardH/2-204,Palette.ink,cardW-28,46);
            UI.text(card,'拥有 '+((M.runtime.getPropData(type)||{count:0}).count),23,0,cardH/2-248,Palette.muted,cardW-28,38);
            const buy=UI.button(card,'',cardW-42,74,0,-cardH/2+54,()=>PlayerPanels.buyProp(this.node,type,()=>this.showPage()),Palette.green);
            UI.icon(buy,'coin',-64,0,43);UI.text(buy,cfg?String(cfg.price):'—',31,25,0,'#FFFFFF',145,55);
        });
    }
    private drawJournal(w:number,h:number){
        UI.text(this.content,'图鉴',43,0,h/2-224,'#FFFFFF');
        if(!this.journal.length){UI.text(this.content,'图鉴正在准备中',26,0,0);return;}
        const height=h-475,view=UI.node(this.content,'JournalViewport',0,-50);view.setContentSize(w+6,height);view.addComponent(cc.Mask);
        const cw=(w-30)/2,ch=Math.min(380,(h-415)/2-16),gap=24;
        const list=UI.node(view,'JournalList',0,height/2);list.anchorY=1;list.setContentSize(w,Math.max(height,Math.ceil(this.journal.length/2)*(ch+gap)+8));
        const scroll=view.addComponent(cc.ScrollView);scroll.content=list;scroll.horizontal=false;scroll.vertical=true;scroll.bounceDuration=.28;
        this.journal.forEach((entry,i)=>{
            const card=UI.panel(list,'Journal-'+entry.id,cw,ch,(i%2-.5)*(cw+30),-ch/2-4-Math.floor(i/2)*(ch+gap));
            const image=UI.node(card,'Mushroom',0,ch/2-119);image.setContentSize(202,202);const sprite=image.addComponent(cc.Sprite);sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
            cc.loader.loadRes(entry.image,cc.SpriteFrame,(err,frame:cc.SpriteFrame)=>{if(!err&&cc.isValid(image))sprite.spriteFrame=frame;});
            UI.text(card,entry.name,29,0,-ch/2+97,Palette.ink,cw-30,48);
            UI.text(card,entry.description?'查看介绍  ›':'资料待补充',23,0,-ch/2+49,Palette.muted,cw-30,36);
            UI.tap(card,()=>this.showJournalEntry(entry));
        });
    }
    private showJournalEntry(entry:JournalEntry){
        const m=UI.modal(this.node,entry.name,650),p=m.panel;
        const image=UI.node(p,'Mushroom',0,135);image.setContentSize(168,168);const sprite=image.addComponent(cc.Sprite);sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
        cc.loader.loadRes(entry.image,cc.SpriteFrame,(err,frame:cc.SpriteFrame)=>{if(!err&&cc.isValid(image))sprite.spriteFrame=frame;});
        UI.text(p,entry.description||'菌种名称和介绍资料待补充。',25,0,-45,Palette.ink,490,160);
        UI.text(p,entry.habitat||'生长环境 · 待补充',22,0,-170,Palette.muted,490,65);
        UI.text(p,entry.note||'图鉴资料由作者后续整理',21,0,-247,Palette.muted,490,45);
    }
    private toggleMenu(){
        if(this.menu){this.menu.destroy();this.menu=null;return;}
        const w=Math.min(cc.winSize.width-48,700),h=cc.winSize.height;
        const entries:Array<{title:string;icon:string;action:()=>void}>=[{title:'设置',icon:'settings',action:()=>PlayerPanels.settings(this.node)},{title:'信息',icon:'profile',action:()=>PlayerPanels.profile(this.node)}];
        if(Apps.isDebug)entries.push({title:'开发验收',icon:'star',action:()=>this.showSpecialValidation()});
        const height=entries.length*76+20;
        this.menu=UI.panel(this.header,'Dropdown',222,height,w/2-111,h/2-155-height/2,'#EDF6FF',24);this.menu.zIndex=50;this.menu.addComponent(cc.BlockInputEvents);
        entries.forEach((entry,i)=>{
            const row=UI.node(this.menu,'Menu-'+i,0,height/2-48-i*76);row.setContentSize(210,72);
            UI.icon(row,entry.icon,-69,0,37,Palette.blue);UI.text(row,entry.title,27,23,0,Palette.ink,145,55);
            UI.tap(row,()=>{this.menu.destroy();this.menu=null;entry.action();});
        });
    }
    private notice(text:string){const n=UI.box(this.node,'Notice',Math.min(600,cc.winSize.width-60),85,0,-cc.winSize.height/2+365,'#46547A',24,true);n.zIndex=1000;UI.text(n,text,24,0,0,'#FFFFFF',n.width-30);this.scheduleOnce(()=>{if(cc.isValid(n))n.destroy();},2);}
    private startGame(level=0){
        if(!this.ready||this.entering)return;this.entering=true;M.runtime.SelectLevel=level;M.ui.closeAllUI();
        const accepted=cc.director.loadScene(Scene.Match,(error)=>{if(error&&cc.isValid(this.node)){this.entering=false;this.notice('加载失败，请重试');}else if(!error)Common.curScene=Scene.Match;});
        if(!accepted)this.entering=false;
    }
    private box(...args:Parameters<typeof UI.box>){return UI.box(...args);}
    private label(parent:cc.Node,text:string,size:number,y:number,color=Palette.ink){return UI.text(parent,text,size,0,y,color);}
    private showSpecialValidation(): void {
        if (!Apps.isDebug || !this.ready || this.entering) return;
        const panel=this.box(this.node,"SpecialValidationPanel",cc.winSize.width,cc.winSize.height,0,0,"#EDF4E9",0);
        panel.zIndex=100;
        panel.addComponent(cc.BlockInputEvents);
        this.label(panel,"特殊元素验收（开发）",32,cc.winSize.height/2-95);
        this.label(panel,"进入后，将中心左侧特殊元素向右交换",22,cc.winSize.height/2-145);
        const cellWidth=(cc.winSize.width-60)/3;
        SpecialCases.forEach((entry,index)=>{
            const button=this.box(panel,'Case-'+index,cellWidth-12,72,(index%3-1)*cellWidth,cc.winSize.height/2-225-Math.floor(index/3)*90,'#DFE9D8',18);
            this.label(button,entry.name,20,0);
            button.on(cc.Node.EventType.TOUCH_END,()=>{
                if(this.entering)return;
                Level.ins.LvDataPool.set(9998,createSpecialValidation(index));
                this.startGame(9998);
            },this);
        });
        [true,false].forEach((win,i)=>UI.button(panel,win?'胜利结算验收':'失败结算验收',260,64,(i-.5)*285,-cc.winSize.height/2+220,()=>{
            const cfg=createSpecialValidation(0);cfg.levelInfo.movesLimit=1;cfg.collect[0].count=win?1:999;
            const id=win?9997:9996;Level.ins.LvDataPool.set(id,cfg);this.startGame(id);
        }));
        UI.button(panel,'剩余步数奖励验收',320,64,0,-cc.winSize.height/2+310,()=>{
            const cfg=createSpecialValidation(0);cfg.levelInfo.movesLimit=3;cfg.collect[0].count=1;
            Level.ins.LvDataPool.set(9995,cfg);this.startGame(9995);
        });
        const close=this.box(panel,'Close',250,72,0,-cc.winSize.height/2+90,'#5A8050',20);
        this.label(close,'返回主页',26,0,'#FFFFFF');
        close.on(cc.Node.EventType.TOUCH_END,()=>panel.destroy(),this);
    }

    private onTouchStart(event:cc.Event.EventTouch){this.touchStart=event.getLocation();}
    private onTouchCancel(){this.touchStart=null;}
    private onTouchEnd(event:cc.Event.EventTouch){
        if(!this.touchStart||this.entering)return;
        const delta=event.getLocation().sub(this.touchStart);this.touchStart=null;
        const before=this.navigation.index;if(this.navigation.swipe(delta.x,delta.y)!==before)this.showPage();
    }
}

