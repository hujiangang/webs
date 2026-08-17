import { GuideUtils } from "../../../../GodGuide/GuideUtils";
import EventMgr from "../../../Base/Manager/EventMgr";
import { Event } from "../../../Logic/Data/Const/Event";
import M from "../../../Base/Manager/M";
import MapIslandUtils from "../../../Logic/SimulationOperation/View/Map/MapIslandUtils";
import { HotelData } from "../../../Logic/Hotel/HotelData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelGoMapBtn extends cc.Component {
    @property(cc.Node)
    openNode: cc.Node = null;

    @property(cc.Label)
    starLabel: cc.Label = null;

    @property(cc.Animation)
    animation: cc.Animation = null;

    onDestroy() {
        EventMgr.ins.unRegister(Event.Map.UnLockIsland, this.doAnimation, this);
    }

    onLoad() {
        EventMgr.ins.register(Event.Map.UnLockIsland, this.doAnimation, this);
    }

    start() {
        // let star = M.runtime.getStarCount();
        // let needStar = MapIslandUtils.openMapNeedStar();
        // if (star >= needStar  && GuideUtils.checkGuideDone(303)) {
        //     this.openNode.opacity = 0;
        // }
        let roomConfig = HotelData.getHotelRoomConfig(1);
        const lvData = M.runtime.getNativeLvData(roomConfig.openLevel);
        if (lvData && lvData.star > 0 && lvData.score > 0) {
            this.openNode.opacity = 0;
        } else {
            this.starLabel.string = `第${roomConfig.openLevel}关开启` //needStar.toString();
        }
    }

    //播放解锁动画
    doAnimation() {
        this.openNode.opacity = 255;
        this.animation.play();
    }

    onFinished() {
        // console.error("onFInish");
        // EventMgr.ins.send(Event.Map.GuideMask, true);
        EventMgr.ins.send(Event.UI.LevelSceneTouched, true);
        // GuideUtils.checkGuide();
    }

    public onClickBtn() {
        let roomConfig = HotelData.getHotelRoomConfig(1);
        const lvData = M.runtime.getNativeLvData(roomConfig.openLevel);

        MapIslandUtils.openMapIsland();

        // if (lvData && lvData.star > 0 && lvData.score > 0) {
        //     MapIslandUtils.openMapIsland();
        // } else {
        //     M.tips.show("通关第四关开启海岛酒店!");
        // }
    }
}