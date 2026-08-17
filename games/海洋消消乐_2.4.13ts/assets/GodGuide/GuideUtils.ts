import LoadGuide from "./LoadGuide";
import { StorageMgr } from "../Script/Base/Manager/StorageMgr";
import ReportMgr from "../Script/Base/Manager/ReportMgr";
import { DLogIdTutorial } from "../Script/Base/Utils/DLogId";
import { EGuideEvent } from "./GodGuide";
import { GuideData } from "./GuideData";
import UIMgr from "../Script/Base/Manager/UIMgr";
import { UIHudDef } from "../Script/Logic/Data/Interface/UIData";
import M from "../Script/Base/Manager/M";
import { Event } from "../Script/Logic/Data/Const/Event";
import Apps from "../Script/Base/Apps";

/** 引导 onStart条件判断状态 */
export enum EGuideStart {
    None = 0,
    ConditionNotReach,  //条件没有满足
    Stop,               //中断本引导后续 
}

export class GuideUtils {
    private static _loadGuide: LoadGuide = null;
    /** 当前指引id */
    private static _curGuideId = -1;
    /** 已经完成的id */
    private static _doneGuideId = {};

    //手动停止引导
    private static _stopGuide: boolean = false;

    //GodGuide的node
    public static get godGuideNode(): cc.Node {
        if (this._loadGuide && this._loadGuide._godGuide) {
            return this._loadGuide._godGuide.node;
        }
        return null;
    }

    //手动停止引导
    public static set stopGuide(stop) {
        this._stopGuide = stop;
        if (this.godGuideNode) {
            if (this.godGuideNode.hasEventListener(EGuideEvent.Stop)) {
                this.godGuideNode.emit(EGuideEvent.Stop);
            }
        }
    }

    public static get stopGuide() {
        return this._stopGuide;
    }

    public static initGuide(guidePrefab) {
        if (cc.find("GuideLayer") != null) {
            return;
        }
        return;
        this._doneGuideId = StorageMgr.Storage.getObject(StorageMgr.Storage.GuideIds) || {};
        var guideLayer = new cc.Node('GuideLayer');
        guideLayer.x = cc.winSize.width / 2;
        guideLayer.y = cc.winSize.height / 2;
        guideLayer.width = cc.winSize.width;
        guideLayer.height = cc.winSize.height;
        cc.game.addPersistRootNode(guideLayer);

        const loadGuide = guideLayer.addComponent(LoadGuide);
        loadGuide.parent = guideLayer;
        loadGuide.tasks = this.getGuideConfig();
        loadGuide.PREFAB = guidePrefab;
        loadGuide.init();
        GuideUtils.setLoadGuide(loadGuide);
    }

    public static getGuideConfig() {
        return ["_Guide_level1", "_Guide_level3",/* "_Guide_level3_1", "_Guide_level3_2",*/ "_Guide_level4"];
    }

    public static setLoadGuide(loadGuide: LoadGuide) {
        this._loadGuide = loadGuide;
    }
    public static set curGuideId(id) {
        this._curGuideId = id;
    }

    public static get curGuideId() {
        return this._curGuideId;
    }

    public static set doneGuideId(id) {
        this._doneGuideId[id] = 1;
        StorageMgr.Storage.setObject(StorageMgr.Storage.GuideIds, this._doneGuideId, true);
        GuideUtils.reportDLog(id);
    }

    //检查这个指引是否完成
    public static checkGuideDone(id) {
        // if (id == 303) return false;
        if (this._doneGuideId[id]) {
            return true;
        }
        return false;
    }

    public static checkGuide() {
        if (this._loadGuide) {
            this._stopGuide = false;
            GuideUtils.logError("Guide checkGuide");
            this._loadGuide.runTask();
        }
    }

    //实施推入配置文件
    public static pushGuide(taskName, forceRun: boolean = false) {
        if (this._loadGuide) {
            this._loadGuide.pushTask(taskName, forceRun);
        }
    }

    public static logError(message?: any, ...optionalParams: any[]) {
        // Apps.isOpenGM && console.error(message, ...optionalParams);
    }

    //消除关卡开始
    public static onMatch3Begin(level: number) {
        console.error("关卡开始", level);
        if (level == 11) {
            this.pushGuide("_Guide_level11");
        } else {
            if (GuideData.firstFailed) {
                GuideUtils.pushGuide("_Guide_level11_1");
            }
        }
    }

    /*** 消除关卡结束 
    * @param isWin 是否胜利
    */
    public static onMatch3Over(level: number, isWin: boolean) {
        if (!isWin && level > 11) {
            if (!this.checkGuideDone(1100001)) {
                GuideData.firstFailed = true;
            }
        }
    }

    //消除关卡结束点击下一关
    public static onMatch3Next(level: number) {
        if (level == 10) {
            GuideUtils.pushGuide("_Guide_level10");
        } else if (level == 15) {
            GuideUtils.pushGuide("_Guide_level15_rank");
        } else if (level == 30) {
            GuideUtils.pushGuide("_Guide_level30");
        }
    }

    //打开关卡开始游戏界面
    public static onMatch3SelectShowTarget(level: number) {
        if (!level) level = M.runtime.getMatch3Level();
        if (level == 21 && !GuideUtils.checkGuideDone(2101)) {
            GuideUtils.pushGuide("_Guide_level21");
        }
    }

    /** 判断游戏结束是否弹出下一关继续游戏 */
    public static checkMatchNext(): boolean {
        let noNext = [1001, 1501, 3001]; //1001=引导领取10关宝箱 1501=引导去排行榜 3001=引导章节解锁
        if (noNext.indexOf(GuideUtils.curGuideId) != -1) {
            return false;
        }
        return true;
    }

    //上报引导
    public static reportDLog(guidId) {
        let dlogStr = null;
        if (guidId == 2) {
            dlogStr = DLogIdTutorial.lv1_click;
        } else if (guidId == 3) {
            dlogStr = DLogIdTutorial.lv1_clickgame;
        } else if (guidId == 302) {
            dlogStr = DLogIdTutorial.lv3_clickback;
        } else if (guidId == 303) {
            dlogStr = DLogIdTutorial.lv3_clickbeach;
        } else if (guidId == 3030004) {
            dlogStr = DLogIdTutorial.lv3_clickrepair1;
        } else if (guidId == 3030005) {
            dlogStr = DLogIdTutorial.lv3_clickbuy1;
        } else if (guidId == 3030008) {
            dlogStr = DLogIdTutorial.lv3_clickchoose1;
        } else if (guidId == 3031002) {
            dlogStr = DLogIdTutorial.lv3_clickrepair2;
        } else if (guidId == 3031004) {
            dlogStr = DLogIdTutorial.lv3_clickbuy2;
        } else if (guidId == 3031006) {
            dlogStr = DLogIdTutorial.lv3_clickgame;
        } else if (guidId == 402) {
            dlogStr = DLogIdTutorial.lv4_clickback;
        } else if (guidId == 403) {
            dlogStr = DLogIdTutorial.lv4_clickbeach;
        } else if (guidId == 405) {
            dlogStr = DLogIdTutorial.lv4_clickrepair2;
        } else if (guidId == 406) {
            dlogStr = DLogIdTutorial.lv4_clickbuy2;
        } else if (guidId == 408) {
            dlogStr = DLogIdTutorial.lv4_clickchoose2;
        } else {
            return;
        }
        // console.error(dlogStr);
        ReportMgr.ins.reportTutorial(dlogStr);
    }

    public static test(index) {
        // UIMgr.ins.showUI(UIHudDef.PropDropView, { itemId: 100, num: 1 });

        // M.event.send(Event.UI.ChapterUnlock, { index: index, play: false });

        let async = require("async");
        let tasks = [1, 2, 3, 4, 5, 6];
        async.eachSeries(tasks, (task, cb) => {
            console.error(task);
            if (task == 2) {
                // tasks.splice(0, 1);
            } else {
                cb();
            }
        }, err => {
            console.error("run ", err);
        });
    }
}

window["GuideUtils"] = GuideUtils;