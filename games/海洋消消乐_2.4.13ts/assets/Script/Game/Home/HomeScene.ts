import ToyArt from '../Common/UI/ToyArt';
import MountainArt from '../Common/UI/MountainArt';
import HomeArt from './HomeArt';
import GameBootstrap from '../../Application/GameBootstrap';
import M from '../../Application/M';
import Apps from '../../Application/Apps';
import { AudioID } from '../Common/AudioCtrl';
import { Event } from '../Data/Const/Event';
import Common from '../Common/Common';
import { Scene, MaxPowerCount } from '../Data/Const/Constant';
import { HomeNavigation, HomePages } from './HomeNavigation';
import Level from '../Data/Interface/Level';
import { UIHudDef } from '../Data/Interface/UIData';
import { SpecialCases, createSpecialValidation } from '../../Debug/SpecialValidation';
import UI, { Palette } from '../Common/UI/ForestUI';
import PlayerPanels from '../Common/UI/PlayerPanels';
import { JournalEntry, PropPresentation, levelPathLimit } from './LobbyCatalog';
import ComboFeedback, { ComboPraiseName } from '../Match3/View/ComboFeedback';

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
    private journalFrame:cc.SpriteFrame=null;
    async onLoad(){
        MountainArt.prepareCanvas();
        cc.debug.setDisplayStats(false);Common.curScene=Scene.Home;
        HomeArt.background(this.node,cc.winSize.width,cc.winSize.height);
        this.content=UI.node(this.node,'Pages');this.header=UI.node(this.node,'Header');this.tabs=UI.node(this.node,'Tabs');
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
        this.showPage();
        try {
            await Promise.all([GameBootstrap.run(),ToyArt.load(),HomeArt.load(),
                MountainArt.frame('journal-book').then(frame=>this.journalFrame=frame)]);if(!cc.isValid(this.node))return;
            this.ready=true;this.showPage();this.schedule(this.refreshBalances,1);
            M.event.send(Event.Sound.PlayBGM,AudioID.BGM1);
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
        const y=h/2-83;
        const avatar=UI.panel(this.header,'Avatar',84,84,-w/2+42,y,'#355B44',25);UI.icon(avatar,'mushroom',0,2,77);UI.tap(avatar,()=>{if(this.ready)PlayerPanels.profile(this.node);});
        const energy=UI.panel(this.header,'Energy',182,60,-w/2+215,y,'#F5ECD3',30);UI.icon(energy,'heart',-62,2,64);this.power=UI.text(energy,'—',26,24,0,Palette.ink,118);
        const wallet=UI.panel(this.header,'Wallet',170,60,w/2-171,y,'#F5ECD3',30);UI.icon(wallet,'coin',-59,2,64);this.coins=UI.text(wallet,'—',29,23,0,Palette.ink,110);
        UI.tap(wallet,()=>{this.navigation.select(0);this.showPage();});
        const menu=UI.panel(this.header,'MenuButton',72,72,w/2-36,y,'#355B44',23);UI.icon(menu,'menu',0,1,43,'#F6EDCF');UI.tap(menu,()=>this.toggleMenu());
        if(this.ready)this.refreshBalances();
        const bar=UI.panel(this.tabs,'BottomNavigation',cc.winSize.width+16,120,0,-h/2+54,'#284C3C',28);
        const edge=UI.node(bar,'TopRim'),rim=edge.addComponent(cc.Graphics);rim.lineWidth=3;rim.strokeColor=cc.color(230,204,125,205);rim.moveTo(-w/2,57);rim.lineTo(w/2,57);rim.stroke();
        HomePages.forEach((page,i)=>{
            const selected=i===this.navigation.index,x=(i-1)*w/3;
            const tab=UI.node(bar,'Tab-'+page.id,x,8);tab.setContentSize(w/3-14,140);
            if(selected){
                const seat=UI.node(tab,'SelectedTab'),gold=seat.addComponent(cc.Graphics),half=Math.min(96,w/6-12);
                gold.fillColor=cc.color().fromHEX('#9E7937');gold.moveTo(-half,-52);gold.lineTo(-half+10,43);gold.bezierCurveTo(-half+15,110,half-15,110,half-10,43);gold.lineTo(half,-52);gold.close();gold.fill();
                gold.fillColor=cc.color().fromHEX('#DFC16B');gold.moveTo(-half+4,-46);gold.lineTo(-half+14,43);gold.bezierCurveTo(-half+18,102,half-18,102,half-14,43);gold.lineTo(half-4,-46);gold.close();gold.fill();
                gold.fillColor=cc.color().fromHEX('#38523B');gold.roundRect(-half+8,-46,half*2-16,45,16);gold.fill();
                gold.lineWidth=2;gold.strokeColor=cc.color(255,242,183,240);gold.moveTo(-half+14,43);gold.bezierCurveTo(-half+18,102,half-18,102,half-14,43);gold.stroke();
            }
            const key=(['shop','game','book'] as Array<'shop'|'game'|'book'>)[i];
            if(this.ready&&HomeArt.frame(key))HomeArt.sprite(tab,'NavigationIcon',key,128,96,0,selected?42:30);
            else UI.icon(tab,['shop','mushroom','book'][i],0,selected?42:30,87);
            UI.text(tab,page.title,selected?29:26,0,-29,selected?'#FFF6D8':'#DFE5CE',180);
            UI.tap(tab,()=>{if(!this.entering){this.navigation.select(i);this.showPage();}});
        });
        if(!this.ready){UI.text(this.content,'正在加载…',30);return;}
        if(this.navigation.index===0)this.drawShop(w,h);
        else if(this.navigation.index===2)this.drawJournal(w,h);
        else this.drawLevels(w,h);
    }
    private drawLevels(w:number,h:number){
        const titleWidth=Math.min(420,w*.65),brand=UI.node(this.content,'HomeTitle',0,h*.30);brand.setContentSize(titleWidth,titleWidth/3);
        MountainArt.frame('title').then(frame=>{
            if(!frame||!cc.isValid(brand))return;
            const sprite=brand.addComponent(cc.Sprite);sprite.spriteFrame=frame;sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
            const size=frame.getOriginalSize();brand.setContentSize(titleWidth,titleWidth*size.height/size.width);
        });
        const current=Math.min(500,M.runtime.getMatch3Level()),gap=Math.min(300,Math.max(266,h*.21)),topLevel=levelPathLimit(current,500);
        // Keep the current plaque and its action together, including on taller screens.
        const currentY=-Math.min(220,h*.14),viewTop=h/2-Math.min(430,h*.32),viewBottom=-h/2+160;
        const viewHeight=viewTop-viewBottom,view=UI.node(this.content,'LevelViewport',0,(viewTop+viewBottom)/2);view.setContentSize(w,viewHeight);view.addComponent(cc.Mask);
        const firstY=viewTop-currentY-(topLevel>current?gap:0),list=UI.node(view,'LevelList',0,viewHeight/2);list.anchorY=1;
        list.setContentSize(w,Math.max(viewHeight+1,firstY+(topLevel-1)*gap+195));
        const scroll=view.addComponent(cc.ScrollView);scroll.content=list;scroll.horizontal=false;scroll.vertical=true;
        scroll.inertia=true;scroll.brake=.7;scroll.elastic=true;scroll.bounceDuration=.28;
        const nodes=UI.node(list,'VisibleLevels');let rendered=-1;
        const levelX=(lv:number)=>lv===current?0:lv>current?28:(lv%2?-40:40);
        const render=()=>{
            const start=Math.max(0,Math.min(Math.max(0,topLevel-12),Math.floor(scroll.getScrollOffset().y/gap)-2));
            if(start===rendered)return;rendered=start;UI.clear(nodes);
            const rail=UI.node(nodes,'LevelPath'),g=rail.addComponent(cc.Graphics);
            for(let i=start;i<Math.min(topLevel-1,start+12);i++){
                const lv=topLevel-i,y=-firstY-i*gap,x=levelX(lv),nextX=levelX(lv-1);
                const from=y-(lv===current?152:66),to=y-gap+(lv-1===current?121:66);
                const stones=Math.max(1,Math.floor((from-to)/25));
                for(let k=0;k<stones;k++){
                    const t=(k+.5)/stones,px=x+(nextX-x)*t+Math.sin(t*Math.PI)*13,py=from+(to-from)*t,sw=13+(k%3)*3;
                    g.fillColor=cc.color(41,49,30,100);g.moveTo(px-sw,py-6);g.lineTo(px+sw-2,py-8);g.lineTo(px+sw+4,py+1);g.lineTo(px-sw+2,py+5);g.close();g.fill();
                    g.fillColor=cc.color(181+(k%2)*12,165+(k%2)*11,126+(k%2)*8,220);g.moveTo(px-sw,py-2);g.lineTo(px+sw-2,py-4);g.lineTo(px+sw+4,py+5);g.lineTo(px-sw+2,py+9);g.close();g.fill();
                }
            }
            for(let i=start;i<Math.min(topLevel,start+12);i++){
                const lv=topLevel-i,active=lv===current,locked=lv>current;
                const n=active?this.currentLevel(nodes,lv,Math.min(550,w-90),levelX(lv),-firstY-i*gap):this.levelMarker(nodes,lv,locked,levelX(lv),-firstY-i*gap);
                UI.tap(n,()=>locked?this.notice('通过当前关卡后解锁'):this.startGame(lv));
            }
        };
        view.on('scrolling',render);render();
    }

    private currentLevel(parent:cc.Node,level:number,width:number,x:number,y:number):cc.Node {
        const height=width*803/1549,n=UI.node(parent,'Level-'+level,x,y);n.setContentSize(width,height);
        if(HomeArt.frame('hero'))HomeArt.sprite(n,'CurrentLevelArt','hero',width,height);
        else {
            UI.panel(n,'PlaqueFallback',width*.82,height*.56,0,height*.13,'#F3E6C3',44);
            UI.box(n,'PlayFallback',width*.86,height*.29,0,-height*.20,'#DCA43A',38,true);
        }
        UI.text(n,'第 '+level+' 关',level>99?50:57,0,height*.22,Palette.ink,width*.68,height*.27);
        const buttonY=-height*.21;
        const caption=UI.text(n,'开始游戏',39,27,buttonY,'#FFFFFF',width*.59,height*.23);
        const outline=caption.node.getComponent(cc.LabelOutline);if(outline){outline.color=cc.color().fromHEX('#85511A');outline.width=2;}
        const play=UI.node(n,'Play',-width*.27,buttonY),arrow=play.addComponent(cc.Graphics);
        arrow.fillColor=cc.color().fromHEX('#835018');arrow.moveTo(-9,-17);arrow.lineTo(-9,17);arrow.lineTo(16,0);arrow.close();arrow.fill();
        arrow.fillColor=cc.color().fromHEX('#FFF7D9');arrow.moveTo(-8,-14);arrow.lineTo(-8,16);arrow.lineTo(13,1);arrow.close();arrow.fill();
        return n;
    }

    private levelMarker(parent:cc.Node,level:number,locked:boolean,x:number,y:number):cc.Node {
        const n=UI.node(parent,'Level-'+level,x,y);n.setContentSize(176,169);
        if(HomeArt.frame('marker'))HomeArt.sprite(n,'LevelMarkerArt','marker',190,180);
        else UI.panel(n,'MarkerFallback',146,139,0,0,'#768173',31);
        UI.text(n,String(level),locked?46:50,0,locked?-18:0,locked?'#EEE9D2':'#FFF4D0',126,68);
        if(locked)UI.icon(n,'lock',0,43,48,'#DCD2AC');
        else {
            const stamp=UI.node(n,'Completed',61,-48),mark=stamp.addComponent(cc.Graphics);
            mark.fillColor=cc.color().fromHEX('#E7D6A0');mark.circle(0,0,19);mark.fill();mark.lineWidth=5;mark.strokeColor=cc.color().fromHEX('#365E43');mark.lineCap=cc.Graphics.LineCap.ROUND;
            mark.moveTo(-9,0);mark.lineTo(-3,-6);mark.lineTo(10,7);mark.stroke();
        }
        return n;
    }

    private catalogShade(h:number):void {
        const shade=UI.node(this.content,'CatalogShade'),wash=shade.addComponent(cc.Graphics);
        wash.fillColor=cc.color(18,36,25,68);wash.rect(-cc.winSize.width/2,-h/2,cc.winSize.width,h);wash.fill();
    }

    /** Keep the book's proportions; the selected bottom tab already identifies the page. */
    private journalSurface(w:number,h:number):cc.Node {
        this.catalogShade(h);
        const sourceW=1176,sourceH=1337,frame=this.journalFrame;
        const scale=Math.min(w/sourceW,(h-446)/sourceH),width=sourceW*scale,height=sourceH*scale;
        const centerY=Math.max(0,h-1334)*.12;
        const panel=UI.node(this.content,'CatalogSurface',0,centerY);panel.setContentSize(width,height);
        if(frame){const sprite=panel.addComponent(cc.Sprite);sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;sprite.spriteFrame=frame;panel.setContentSize(width,height);}
        else UI.panel(panel,'Fallback',width,height,0,0,'#F3E8CB',24);
        return panel;
    }

    private drawShop(w:number,h:number){
        this.catalogShade(h);
        const width=w-12,height=Math.min(832,h-440),rowHeight=(height-24)/4;
        const display=UI.node(this.content,'ShopItems',0,Math.max(0,h-1334)*.12);display.setContentSize(width,height);
        const surface=display.addComponent(cc.Graphics);
        surface.fillColor=cc.color(15,30,22,95);surface.roundRect(-width/2,-height/2-7,width,height,28);surface.fill();
        surface.fillColor=cc.color().fromHEX('#344F43');surface.roundRect(-width/2,-height/2,width,height,28);surface.fill();
        surface.lineWidth=2;surface.strokeColor=cc.color(174,193,150,145);
        surface.roundRect(-width/2+2,-height/2+2,width-4,height-4,26);surface.stroke();
        [100,101,102,103].forEach((type,i)=>{
            const info=PropPresentation[type],cfg=M.table.PropInfo.getByPrimaryKey(type);
            const row=UI.node(display,'Shop-'+type,0,height/2-12-rowHeight*(i+.5));row.setContentSize(width-24,rowHeight);
            const icon=UI.propIcon(row,type,Math.min(156,rowHeight-34));icon.setPosition(-width/2+99,0);
            const name=UI.text(row,info.name,31,-61,28,'#F1EFD9',182,46);name.horizontalAlign=cc.Label.HorizontalAlign.LEFT;
            const owned=UI.text(row,'拥有 '+((M.runtime.getPropData(type)||{count:0}).count),24,-61,-25,'#BECBB5',182,36);owned.horizontalAlign=cc.Label.HorizontalAlign.LEFT;
            const buy=UI.purchaseButton(row,'',184,86,width/2-116,0,()=>PlayerPanels.buyProp(this.node,type,()=>this.showPage()));
            UI.icon(buy,'coin',-48,0,34);UI.text(buy,cfg?String(cfg.price):'—',32,22,0,'#293F32',116,50);
            if(i<3){const rule=row.addComponent(cc.Graphics);rule.lineWidth=2;rule.strokeColor=cc.color(174,193,150,45);rule.moveTo(-width/2+32,-rowHeight/2);rule.lineTo(width/2-32,-rowHeight/2);rule.stroke();}
        });
    }

    private drawJournal(w:number,h:number){
        const book=this.journalSurface(w,h);
        if(!this.journal.length){UI.text(book,'图鉴正在准备中',26,0,0);return;}
        const scale=book.width/1176,paperWidth=1016*scale,paperHeight=1120*scale;
        const view=UI.node(book,'JournalViewport',0,0);view.setContentSize(paperWidth,paperHeight);view.addComponent(cc.Mask);
        const rowHeight=paperHeight/2,cellWidth=paperWidth/2-36;
        const list=UI.node(view,'JournalList',0,paperHeight/2);list.anchorY=1;
        list.setContentSize(paperWidth,Math.max(paperHeight,Math.ceil(this.journal.length/2)*rowHeight));
        const scroll=view.addComponent(cc.ScrollView);scroll.content=list;scroll.horizontal=false;scroll.vertical=true;scroll.elastic=true;scroll.bounceDuration=.28;
        this.journal.forEach((entry,i)=>{
            const card=UI.node(list,'Journal-'+entry.id,(i%2-.5)*paperWidth/2,-rowHeight/2-Math.floor(i/2)*rowHeight);
            card.setContentSize(cellWidth,rowHeight-12);
            const number=UI.text(card,String(i+1).padStart(2,'0'),22,-cellWidth/2+22,rowHeight*.39,'#8B7850',48,30);
            number.horizontalAlign=cc.Label.HorizontalAlign.LEFT;
            const base=UI.node(card,'SpecimenShadow',0,-rowHeight*.02),g=base.addComponent(cc.Graphics);
            g.fillColor=cc.color(98,81,39,23);g.ellipse(0,0,70,10);g.fill();
            this.journalSprite(card,entry.image,0,rowHeight*.16,Math.min(205,rowHeight*.59,cellWidth-12));
            const placeholder=/^菌子\s*\d+\s*[·・]\s*待命名$/.test(entry.name);
            UI.text(card,placeholder?'待命名':entry.name,30,0,-rowHeight*.20,'#2C4537',cellWidth-8,48);
            UI.text(card,entry.description?'查看介绍  ›':'资料待补充  ›',24,0,-rowHeight*.35,'#756749',cellWidth-8,36);
            if(i<2){const rule=UI.node(card,'EntryRule'),line=rule.addComponent(cc.Graphics);line.strokeColor=cc.color(137,112,67,70);line.lineWidth=2;line.moveTo(-cellWidth*.36,-rowHeight/2+5);line.lineTo(cellWidth*.36,-rowHeight/2+5);line.stroke();}
            UI.tap(card,()=>this.showJournalEntry(entry));
        });
    }
    private showJournalEntry(entry:JournalEntry){
        const m=UI.modal(this.node,entry.name,650),p=m.panel;
        this.journalSprite(p,entry.image,0,133,180);
        UI.text(p,entry.description||'菌种名称和介绍资料待补充。',25,0,-45,Palette.ink,490,160);
        UI.text(p,entry.habitat||'生长环境 · 待补充',22,0,-170,Palette.muted,490,65);
        UI.text(p,entry.note||'图鉴资料由作者后续整理',21,0,-247,Palette.muted,490,45);
    }
    private journalSprite(parent:cc.Node,path:string,x:number,y:number,size:number){
        const image=UI.node(parent,'Mushroom',x,y),sprite=image.addComponent(cc.Sprite);sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
        cc.loader.loadRes(path,cc.SpriteFrame,(err,frame:cc.SpriteFrame)=>{
            if(err||!cc.isValid(image))return;sprite.spriteFrame=frame;const rect=frame.getRect(),scale=size/Math.max(rect.width,rect.height);image.setContentSize(rect.width*scale,rect.height*scale);
        });
    }
    private toggleMenu(){
        if(this.menu){this.menu.destroy();this.menu=null;return;}
        const w=Math.min(cc.winSize.width-48,700),h=cc.winSize.height;
        const entries:Array<{title:string;icon:string;action:()=>void}>=[{title:'设置',icon:'settings',action:()=>PlayerPanels.settings(this.node)},{title:'信息',icon:'profile',action:()=>PlayerPanels.profile(this.node)}];
        if(Apps.isDebug){
            entries.push({title:'开发验收',icon:'star',action:()=>this.showSpecialValidation()});
            entries.push({title:'连消预览',icon:'star',action:()=>this.showComboPreview()});
        }
        const height=entries.length*76+20;
        this.menu=UI.box(this.header,'Dropdown',222,height,w/2-111,h/2-155-height/2,'#3D5B49',25,true);this.menu.zIndex=50;this.menu.addComponent(cc.BlockInputEvents);
        entries.forEach((entry,i)=>{
            const row=UI.node(this.menu,'Menu-'+i,0,height/2-48-i*76);row.setContentSize(210,72);
            UI.icon(row,entry.icon,-69,0,39,'#E2CC94');UI.text(row,entry.title,27,23,0,'#FFF2D4',145,55);
            UI.tap(row,()=>{this.menu.destroy();this.menu=null;entry.action();});
        });
    }
    private notice(text:string){const n=UI.box(this.node,'Notice',Math.min(600,cc.winSize.width-60),85,0,-cc.winSize.height/2+365,'#304C3D',24,true);n.zIndex=1000;UI.text(n,text,24,0,0,'#FFFFFF',n.width-30);this.scheduleOnce(()=>{if(cc.isValid(n))n.destroy();},2);}
    private startGame(level=0){
        if(!this.ready||this.entering)return;this.entering=true;M.runtime.SelectLevel=level;M.ui.closeAllUI();
        // Keep a themed loading surface across scene activation while Match3 resources arrive.
        M.ui.showUI(UIHudDef.GameLoading,null,()=>{
            const failed=()=>{M.ui.hideUI(UIHudDef.GameLoading);if(cc.isValid(this.node)){this.entering=false;this.notice('加载失败，请重试');}};
            const accepted=cc.director.loadScene(Scene.Match,(error)=>{if(error)failed();else Common.curScene=Scene.Match;});
            if(!accepted)failed();
        });
    }
    private box(...args:Parameters<typeof UI.box>){return UI.box(...args);}
    private label(parent:cc.Node,text:string,size:number,y:number,color=Palette.ink){return UI.text(parent,text,size,0,y,color);}
    private showComboPreview():void {
        if(!Apps.isDebug)return;
        let cancel:()=>void=null;
        const modal=UI.modal(this.node,'连消提示预览',560,()=>{if(cancel)cancel();});
        const stage=UI.box(modal.panel,'ComboPreviewStage',540,190,0,104,'#344F43',24);
        UI.text(modal.panel,'点击下方按钮，预览图像与声音',22,0,-17,Palette.muted,510,40);
        (['great','awesome','fantastic','blossom'] as ComboPraiseName[]).forEach((name,i)=>{
            UI.button(modal.panel,name[0].toUpperCase()+name.slice(1)+'!',240,68,(i%2-.5)*260,-91-Math.floor(i/2)*88,()=>{
                if(cancel)cancel();cancel=ComboFeedback.preview(stage,name,0,3);
            });
        });
        cancel=ComboFeedback.preview(stage,'great',0,3);
    }
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

