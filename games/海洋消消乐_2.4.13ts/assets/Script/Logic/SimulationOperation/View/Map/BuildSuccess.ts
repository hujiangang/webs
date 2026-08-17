import UIBase from "../../../../Base/UI/UIBase";
import UIMgr from "../../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import MapIslandUtils from "./MapIslandUtils";
import { Util } from "../../../../Base/Utils/Util";
import { GuideUtils } from "../../../../../GodGuide/GuideUtils";
import M from "../../../../Base/Manager/M";
import ShareMgr from "../../../../Base/Manager/ShareMgr";
import { HotelData } from "../../../Hotel/HotelData";
import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";
import { ICloudData } from "./CloudView";
import { WaringTips } from "../../../Data/Const/Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export class BuildSuccess extends UIBase {

    @property(cc.Sprite)
    photo: cc.Sprite = null;

    @property(cc.Label)
    buildName: cc.Label = null;

    @property(cc.RichText)
    labelShareTip: cc.RichText = null;

    @property(cc.Label)
    labelButton: cc.Label = null;

    private _buildingId: number = null;

    private _isShare: boolean = false;

    public onInit(buildingId: number) {
        this._buildingId = buildingId;
    }

    onStart() {
        this.initRoomData();
    }

    // private initIslandData() {
    //     var buildState = MapIslandUtils.getBuildingState(this._buildingId);
    //     var config = MapIslandUtils.getBuildConfigById(this._buildingId);
    //     Util.Loader.loadSpriteFrame(MapIslandUtils.getBuildShareIcon(this._buildingId, buildState), (err, resource) => {
    //         this.photo.spriteFrame = resource;
    //     });
    //     this.buildName.string = config.desc;

    //     let openShare = this._isShare = config.isShare == 1;
    //     if (openShare) {
    //         this.labelButton.string = "炫 耀";
    //     } else {
    //         this.labelButton.string = "确 定";
    //     }
    // }

    /** 新海岛酒店版本 */
    private initRoomData() {
        //检查是否有下一个房间可以解锁
        let nextRoomConfig = HotelData.getHotelRoomConfig(this._buildingId + 1);
        if (nextRoomConfig == null) {
            console.error("没有下一个房间可以解锁了");
            // return;
        }

        let roomConfig = HotelData.getHotelRoomConfig(this._buildingId);
        if (roomConfig) {
            Util.Loader.loadSpriteFrame("texture/hotel/shareIcon/room_share_" + this._buildingId, (err, resource) => {
                this.photo.spriteFrame = resource;
            });
            this.buildName.string = roomConfig.roomName;
            let openShare = this._isShare = true;
            let shareData = ShareMgr.ins.getConfig(this._buildingId, "buildId");
            if (openShare && shareData) {
                this.labelButton.string = "炫 耀";
                this.labelShareTip.node.active = true;
                this.labelShareTip.string = Util.Tool.stringFormat(WaringTips.ShareTip, shareData.reward[0].num)
            } else {
                this.labelButton.string = "确 定";
                this.labelShareTip.node.active = false;
            }
        }
    }

    public close() {
        // if (this._isShare) {
        //     ShareMgr.ins.doShareBuild(this._buildingId, (result) => {
        //         UIMgr.ins.closeUI(UIHudDef.BuildSuccess);
        //         GuideUtils.pushGuide("_Guide_level3_2");
        //     });
        // } else {
        //     UIMgr.ins.closeUI(UIHudDef.BuildSuccess);
        //     GuideUtils.pushGuide("_Guide_level3_2");
        // }

        if (this._isShare) {
            ShareMgr.ins.doShareBuild(this._buildingId, (result) => {
                UIMgr.ins.hideUI(UIHudDef.BuildSuccess);

                if (result) {
                    let shareData = ShareMgr.ins.getConfig(this._buildingId, "buildId");
                    UIMgr.ins.showUI(UIHudDef.CommonReward, shareData.reward[0], null, this.doCloseCallback.bind(this));
                } else {
                    this.doCloseCallback();
                }
            });
        } else {
            UIMgr.ins.closeUI(UIHudDef.BuildSuccess);
            UIMgr.ins.showUI(UIHudDef.CloudView, ICloudData.RoomRefresh);
        }
    }

    private doCloseCallback() {
        let nextRoomConfig = HotelData.getHotelRoomConfig(this._buildingId + 1);
        if (nextRoomConfig == null) {
            console.error("没有下一个房间可以解锁了");
            return;
        }
        UIMgr.ins.showUI(UIHudDef.CloudView, ICloudData.RoomRefresh);
    }
}