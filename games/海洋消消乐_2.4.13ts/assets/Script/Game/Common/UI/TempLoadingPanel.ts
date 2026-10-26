import EventMgr from "../../../Framework/Events/EventMgr";
import { Event } from "../../Data/Const/Event";
import UIBase from "./UIBase";
import UI from './ForestUI';
import MountainArt from './MountainArt';
import LoadingProgress from './LoadingProgress';

const { ccclass, property } = cc._decorator;

@ccclass
export default class TempLoadingPanel extends UIBase {

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(cc.Label)
    progrss: cc.Label = null;

    @property([cc.SpriteFrame])
    frames: cc.SpriteFrame[] = [];

    private progressView:LoadingProgress = null;

    onLoad() {
        super.onLoad();
        this._initView();
        this._initEvent();
    }

    onDestroy() {
        EventMgr.ins.unRegister(Event.UI.UpdateTmpLoadingProgress, this._onUpdateProgress, this);
    }

    private _initEvent() {
        EventMgr.ins.register(Event.UI.UpdateTmpLoadingProgress, this._onUpdateProgress, this);
    }

    private _initView() {
        this.node.children.forEach(child=>child.active=false);
        const root=UI.node(this.node,'MountainTransition');root.setContentSize(cc.winSize);
        UI.background(root,cc.winSize.width,cc.winSize.height,'loading');
        const title=UI.node(root,'Title',0,cc.winSize.height*.20);
        MountainArt.frame('title').then(frame=>{
            if(!frame||!cc.isValid(title))return;
            const sprite=title.addComponent(cc.Sprite);sprite.spriteFrame=frame;sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
            const size=frame.getOriginalSize(),width=Math.min(cc.winSize.width-80,640);
            title.setContentSize(width,width*size.height/size.width);
        });
        const y=-cc.winSize.height/2+170;
        this.progressView=new LoadingProgress(root,Math.min(490,cc.winSize.width-140),0,y);
        this.tipsLabel=UI.text(root,'正在准备关卡',26,0,y-61,'#FFFFFF',cc.winSize.width-90,44);
        this.progrss=this.progressView.percent;
    }

    onShow(closeCallBack?:Function){super.onShow(closeCallBack);this._onUpdateProgress(0);}


    private _onUpdateProgress(jd: number) {
        if(this.progressView)this.progressView.set(jd);
    }

    start() {

    }
}
