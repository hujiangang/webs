
import M from "../../Base/Manager/M";
import Common from "../Common/Common";
import { Scene, APPID } from "../Data/Const/Constant";
import Level from "../Data/Interface/Level";
import Paths from "../../Base/Utils/Paths";
import DailyTaskInfo from "../../Base/Tabls/DailyTaskInfo";
import { BaseTable } from "../../Base/Manager/Table/BaseTable";
import { GameTableMgr } from "../../Base/Manager/GameTableMgr";
import Apps from "../../Base/Apps";

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

        M.init();
        M.platform.init({ appId: APPID });

        /**进行登录，测试环境网络异常时不阻塞进入主玩法 */
        const data = await this._withTimeout(M.net.login(), 3000, null, "登录");
        /**解析远程用户数据! */
        M.runtime.initRemotData(data);
        /**解析配置表 */
        await this._withTimeout(GameTableMgr.ins.execute(), 5000, false, "配置表加载");
        this._updateProgress(10);
        /**预加载三消主玩法 */
        this._preLoadMatch3();
        /**每日任务模块 */
        this._initDailyTask();
    }
    /*
        private _preLoadMapScene() {
            cc.director.preloadScene(Scene.Map, null, (error: Error, asset: cc.SceneAsset) => {
                let buildingArr = [];
                let buildingState = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState);
                let exchanges = asset.scene.getComponentsInChildren(Exchange);
                exchanges.forEach((exchange: Exchange) => {
                    if (exchange.enabled) {
                        let key = exchange.buildingId;
                        let singleBuildState = buildingState ? buildingState[key] : null;
                        if (singleBuildState) {
                            buildingArr.push('prefab/map/' + exchange.path + singleBuildState.state);
                        } else {
                            buildingArr.push('prefab/map/' + exchange.path + exchange.state);
                        }
                    }
                });
                for (let i = 1; i <= 25; i++) {
                    buildingArr.push('texture/map/bg/map_' + (i < 10 ? '0' + i : i));
                }
                cc.loader.loadResArray(buildingArr, null, (err, resource: any[]) => {
                    if (!err) {
                        console.log('预加载map资源完毕!');
                    } else {
                        console.warn("加载出错" + err);
                    }
                })
            });
        }
    */

    /**预加载酒店的关系信息 */
    // private _preLoadAccData() {
    //     //请求访客信息
    //     M.net.getOnlineList().then(data => {

    //     });
    //     //请求好友信息
    //     M.net.getFriendList().then(data => {

    //     });
    //     //请求事件信息
    //     M.net.getInteractiveList().then(data => {

    //     });
    // }

    //进入游戏直接加载三消主玩法
    private _preLoadMatch3() {
        const testLevel = Apps.isDebug ? 9999 : null;
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
            if (err) {
                console.error('预加载三消资源出错!', err);
                return;
            }
            cc.director.preloadScene(Scene.Match, (completedCount: number, totalCount: number, item: any) => {
                this._updateProgress(Math.ceil(50 + (completedCount / totalCount) * 50));
            }, (error: Error) => {
                if (error) {
                    console.error('预加载三消场景出错!', error);
                    return;
                }
                // 预加载测试关卡或当前关卡
                Level.ins.getLvCfgData(testLevel);
                this._updateProgress(100);
                this.scheduleOnce(() => {
                    M.runtime.SelectLevel = testLevel || 0;
                    Common.jumpScene(Scene.Match);
                }, 0.2);
            });
        });
    }

    private _initDailyTask() {
        //请求配置!
        cc.loader.load(Paths.DailyTaskConfig, async (err, tex) => {
            if (err || !tex) {
                console.error('获取任务配置出错!');
                return
            }
            GameTableMgr.ins.DailyTaskInfo = new BaseTable<number, DailyTaskInfo>("id", "DailyTaskInfo", DailyTaskInfo, null);
            GameTableMgr.ins.DailyTaskInfo['readyOK'](tex);

            //解表完成~
            try {
                M.runtime.DailyTaskProgress = await this._withTimeout(M.net.getDailyTask(), 3000, null, "每日任务数据");
                M.runtime.initTaskNativeData();
                console.error(' M.runtime.DailyTaskProgress: ', M.runtime.DailyTaskProgress);
            } catch (error) {
                console.warn('每日任务初始化失败，不影响主玩法进入:', error);
            }

        });
    }

    private _updateProgress(progress: number) {
        this.loadingLabel.string = '加载中 ' + progress + '%';
    }

    private _withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T, name: string): Promise<T> {
        return new Promise<T>((resolve) => {
            let finished = false;
            const timer = setTimeout(() => {
                if (finished) {
                    return;
                }
                finished = true;
                console.warn(`${name}超时，使用本地兜底继续游戏`);
                resolve(fallback);
            }, timeoutMs);

            promise.then((result: T) => {
                if (finished) {
                    return;
                }
                finished = true;
                clearTimeout(timer);
                resolve(result);
            }).catch((error) => {
                if (finished) {
                    return;
                }
                finished = true;
                clearTimeout(timer);
                console.warn(`${name}失败，使用本地兜底继续游戏:`, error);
                resolve(fallback);
            });
        });
    }

    public async testDownloadZip() {
        const url = 'https://mini-game-cent251001060.cos.ap-guangzhou.myqcloud.com/soe/test.zip';

        const result = await M.platform.downLoadFile({ url: url, filePath: null });
        // console.error('download ok : ', result);

    }
}
