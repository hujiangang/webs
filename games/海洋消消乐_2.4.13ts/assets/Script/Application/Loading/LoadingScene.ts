import Apps from "../Apps";
import GameBootstrap from "../GameBootstrap";
import Common from "../../Game/Common/Common";
import { Scene } from "../../Game/Data/Const/Constant";

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

    async onLoad() {
        if (this.startButton) this.startButton.active = false;
        if (this.versionLabel) this.versionLabel.string = Apps.Version;
        try {
            await GameBootstrap.run();
            if (!cc.isValid(this.node)) return;
            this._updateProgress(10);
            this._preLoadHome();
            GameBootstrap.initializeDailyTasks();
        } catch (error) {
            console.error("游戏初始化失败:", error);
            if (cc.isValid(this.node) && this.loadingLabel) this.loadingLabel.string = "初始化失败，请重新进入";
        }
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
        if (cc.isValid(this.node) && this.loadingLabel) this.loadingLabel.string = '加载中 ' + progress + '%';
    }
}
