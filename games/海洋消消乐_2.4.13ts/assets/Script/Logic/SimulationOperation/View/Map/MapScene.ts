import UIMgr from "../../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";
import TrafficSystem from "./TrafficSystem/TrafficSystem";
import M from "../../../../Base/Manager/M";
import Level from "../../../Data/Interface/Level";
import MapIslandUtils from "./MapIslandUtils";
import Exchange from "./Exchange";
import { Util } from "../../../../Base/Utils/Util";
import { GuideUtils } from "../../../../../GodGuide/GuideUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MapScene extends cc.Component {
    @property(cc.Camera)
    mapCamera: cc.Camera = null;

    @property(cc.Camera)
    buildingCamera: cc.Camera = null;

    @property(TrafficSystem)
    trafficSystem: TrafficSystem = null;

    @property(cc.Node)
    mapNode: cc.Node = null;

    @property(cc.Node)
    mapBg: cc.Node = null;

    // buildingSpMap: Map<cc.Node, cc.Sprite> = new Map<cc.Node, cc.Sprite>();
    onLoad() {
        // M.init();
        M.changeScene();
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END);
        gsap.TweenLite.killTweensOf(this.mapNode);
        MapIslandUtils.mapLoadFinished = false;
    }

    start() {
        // this.mapCamera.zoomRatio = 0.75;

        let windowSize = cc.view.getVisibleSize();
        let minRatio = windowSize.height / this.mapBg.height;

        gsap.TweenLite.to(this.mapNode, 1.5, {
            scale: minRatio, onComplete: () => {
                UIMgr.ins.showUI(UIHudDef.MenuPanel);
                // this.test();
                MapIslandUtils.mapLoadFinished = true;
                MapIslandUtils.MapScale = minRatio;
                EventMgr.ins.send(Event.Map.MapTouchMoveEnable, true);
                GuideUtils.stopGuide = true;
                this.moveToLastBuild(() => {
                    GuideUtils.stopGuide = false;
                    GuideUtils.pushGuide("_Guide_level3_1", true);
                });
            }
        });

        // this.mapCamera.zoomRatio = 1;
        // EventMgr.ins.send(Event.Map.MapTouchMoveEnable, true);
    }

    /** 进入的时候定位到最小一个id开放了但是未修理或者未二选一 */
    public moveToLastBuild(moveEndNext) {
        var buildId = 0;
        if (!MapIslandUtils.checkBuildFinished(15)) {   //如果引导没有完成 先定位到引导
            buildId = 15;
        } else if (!MapIslandUtils.checkBuildFinished(16)) {
            buildId = 16;
        } else {
            buildId = MapIslandUtils.getSmallOpenBuildingId();
        }
        MapIslandUtils.mapMoveTo(buildId, moveEndNext);
    }

    onEnable() {
        // console.error("MapScene onEnable");
    }

    onDisable() {
        UIMgr.ins.closeUI(UIHudDef.MenuPanel);
    }

    public test() {
        let exchanges = this.node.getComponentsInChildren(Exchange);
        var buidlingPosition = {};
        exchanges.forEach((exchange: Exchange) => {
            if (exchange.enabled) {
                let key = exchange.buildingId;
                let lock = Util.Tool.getChildByName(exchange.node, "Lock");
                if (lock) {
                    console.error(key, lock.position);
                    buidlingPosition[key] = lock.position;
                }
            }
        });

        console.error(JSON.stringify(buidlingPosition));
    }
}
