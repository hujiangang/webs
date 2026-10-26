import Apps from "../Apps";
import GameBootstrap from "../GameBootstrap";
import Common from "../../Game/Common/Common";
import { Scene } from "../../Game/Data/Const/Constant";
import UI from '../../Game/Common/UI/ForestUI';
import MountainArt from '../../Game/Common/UI/MountainArt';
import ToyArt from '../../Game/Common/UI/ToyArt';
import LoadingProgress from '../../Game/Common/UI/LoadingProgress';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingScene extends cc.Component {

    @property(cc.Label)
    loadingLabel: cc.Label = null;

    @property(cc.Label)
    versionLabel: cc.Label = null;

    @property(cc.Node)
    loding: cc.Node = null;

    @property(cc.Node)
    progress: cc.Node = null;

    @property(cc.Node)
    startButton: cc.Node = null;

    private progressView: LoadingProgress = null;
    private displayedProgress = 0;

    async onLoad() {
        MountainArt.prepareCanvas();
        this.createLoadingView();
        if (this.startButton) this.startButton.active = false;
        if (this.versionLabel) this.versionLabel.string = Apps.Version;
        try {
            await Promise.all([GameBootstrap.run(), ToyArt.load()]);
            if (!cc.isValid(this.node)) return;
            this._updateProgress(10);
            this._preLoadHome();
            GameBootstrap.initializeDailyTasks();
        } catch (error) {
            console.error("游戏初始化失败:", error);
            if (cc.isValid(this.node) && this.loadingLabel) this.loadingLabel.string = "初始化失败，请重新进入";
        }
    }

    private createLoadingView() {
        cc.debug.setDisplayStats(false);
        // Keep Canvas, camera and serialized component alive; only replace old art.
        ['background','loading','version','buttons','New Button','New Label'].forEach(name=>{
            const old=this.node.getChildByName(name);if(old)old.active=false;
        });
        const w=cc.winSize.width,h=cc.winSize.height;
        const root=UI.node(this.node,'MountainLoading');root.setContentSize(w,h);
        UI.background(root,w,h,'loading');
        const fallback=UI.text(root,'菌子消消乐',72,0,h*.23,'#FFFFFF',w-70,150);
        MountainArt.frame('title').then(frame=>{
            if(!frame||!cc.isValid(root))return;
            fallback.node.active=false;
            const logo=UI.node(root,'GameTitle',0,h*.23),sprite=logo.addComponent(cc.Sprite);
            sprite.spriteFrame=frame;sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
            const original=frame.getOriginalSize(),width=Math.min(w*.89,690);
            logo.setContentSize(width,width*original.height/original.width);
            logo.opacity=0;logo.scale=.96;cc.tween(logo).to(.3,{opacity:255,scale:1},{easing:'backOut'}).start();
        });
        const y=-h/2+170;
        this.progressView=new LoadingProgress(root,Math.min(490,w-140),0,y);
        this.loadingLabel=UI.text(root,'正在准备游戏',26,0,y-61,'#FFFFFF',w-90,44);
        this.versionLabel=UI.text(root,'',19,0,-h/2+40,'#DFE8CD',250,30);
        this._updateProgress(0);
    }

    // Shared match dialogs load before the lobby; entering a level stays a user action.
    private _preLoadHome() {
        const preloadArr = [
            "prefab/ui/GameLoading",
            "prefab/ui/GameShowTarget",
            "prefab/ui/GameWin",
            "prefab/ui/GameFail",
            "prefab/ui/GameFailEncourage",
            "texture/guide/guide_role_2"
        ];
        cc.loader.loadResArray(preloadArr, (completedCount: number, totalCount: number, item: any) => {
            this._updateProgress(Math.ceil(10 + (completedCount / totalCount) * 40));
        }, (err, resource: any[]) => {
            if (!cc.isValid(this.node)) return;
            if (err) {
                console.error('预加载三消资源出错!', err);
                if (this.loadingLabel) this.loadingLabel.string = "资源加载失败，请重新进入";
                return;
            }
            cc.director.preloadScene(Scene.Home, (completedCount: number, totalCount: number, item: any) => {
                this._updateProgress(Math.ceil(50 + (completedCount / totalCount) * 50));
            }, (error: Error) => {
                if (!cc.isValid(this.node)) return;
                if (error) {
                    console.error('预加载主页出错!', error);
                    if (this.loadingLabel) this.loadingLabel.string = "主页加载失败，请重新进入";
                    return;
                }
                this._updateProgress(100);
                this.scheduleOnce(() => {
                    Common.jumpScene(Scene.Home);
                }, 0.2);
            });
        });
    }

    private _updateProgress(progress: number) {
        if(!cc.isValid(this.node))return;
        if(!Number.isFinite(progress))return;
        this.displayedProgress=Math.max(this.displayedProgress,Math.min(100,progress));
        if(this.loadingLabel)this.loadingLabel.string=this.displayedProgress===100?'准备完成':'正在加载游戏';
        if(this.progressView)this.progressView.set(this.displayedProgress);
    }
}
