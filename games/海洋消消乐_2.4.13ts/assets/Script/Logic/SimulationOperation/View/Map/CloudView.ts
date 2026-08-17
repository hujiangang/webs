import SpinePlayerCtrl from "../../../../Base/CustomComponent/SpinePlayerCtrl";
import UIBase from "../../../../Base/UI/UIBase";
import { Scene } from "../../../Data/Const/Constant";
import { StorageMgr } from "../../../../Base/Manager/StorageMgr";
import Exchange from "./Exchange";
import UIMgr from "../../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import Common from "../../../Common/Common";
import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";

export enum ICloudData {
    JumpIsland = 1,  //打开海岛
    LeaveIsland,     //关闭海岛
    OpenHotel,       //打开酒店
    RoomRefresh,     //酒店完成解锁
    VisitFriendHotel
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class CloudView extends UIBase {

    private _spinePlayerCtrl: SpinePlayerCtrl;
    private _data: ICloudData = null;
    private _hasPlayer: boolean = false;
    private _hasLoaded: boolean = false;
    public onLoad() {
        super.onLoad();
    }

    onInit(param) {
        let spinePlayerCtrl = this._spinePlayerCtrl = this.getComponent(SpinePlayerCtrl);
        spinePlayerCtrl.enabled = true;
        spinePlayerCtrl.paused = true;

        this._data = param;

        this.timePlay();

        //可以在云遮挡的时候加载资源
        // if (param == ICloudData.JumpIsland) {
        //     this.preloadIslandMap();
        // } else if (param == ICloudData.LeaveIsland) {
        //     this._hasLoaded = true;
        //     this.playCloud();
        // } else if (param == ICloudData.OpenHotel) {

        // }
        // else if (param == )

        //可以在云遮挡的时候加载资源
        switch (param) {
            case ICloudData.JumpIsland:
                this.preloadIslandMap();
                break;
            case ICloudData.LeaveIsland:
                this._hasLoaded = true;
                this.playCloud();
                break;
            case ICloudData.OpenHotel:
                this._hasLoaded = true;
                // cc.director.loadScene("HotelScene");
                break;
            case ICloudData.RoomRefresh:
                this._hasLoaded = true;
                EventMgr.ins.send(Event.Hotel.RoomFinished);
                break;
            case ICloudData.VisitFriendHotel:
                this._hasLoaded = true;


                break;
        }
    }

    public preloadIslandMap() {
        this.playCloud();
        // cc.director.preloadScene(Scene.Map, null, (error: Error, asset: cc.SceneAsset) => {
        //     this._hasLoaded = true;
        //     let buildingArr = [];
        //     let buildingState = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState);
        //     let exchanges = asset.scene.getComponentsInChildren(Exchange);
        //     exchanges.forEach((exchange: Exchange) => {
        //         if (exchange.enabled) {
        //             let key = exchange.buildingId;
        //             let singleBuildState = buildingState ? buildingState[key] : null;
        //             if (singleBuildState) {
        //                 buildingArr.push('prefab/map/' + exchange.path + singleBuildState.state);
        //             } else {
        //                 buildingArr.push('prefab/map/' + exchange.path + exchange.state);
        //             }
        //         }
        //     });
        //     // for (let i = 1; i <= 25; i++) {
        //     //     buildingArr.push('texture/map/bg/map_' + (i < 10 ? '0' + i : i));
        //     // }
        //     cc.loader.loadResArray(buildingArr, null, (err, resource: any[]) => {
        //         if (!err) {
        //             // console.warn('预加载map资源完毕!');
        //         } else {
        //             console.warn("加载出错" + err);
        //         }
        //         this.playCloud();
        //     })
        // });
    }

    public timePlay() {
        this.scheduleOnce(this.playCloud, 1);
    }

    public playCloud() {
        if (this._hasPlayer || !this._hasLoaded || this._spinePlayerCtrl == null) return;
        this._hasPlayer = true;
        this.unschedule(this.playCloud);
        this.doBeforePlay();
    }

    public doBeforePlay() {
        if (this._data == ICloudData.JumpIsland) {
            Common.jumpScene(Scene.Map, this.beginPlay.bind(this));
        } else if (this._data == ICloudData.LeaveIsland) {
            Common.jumpScene(Scene.Level, this.beginPlay.bind(this));
        } else {
            this.beginPlay();
        }
    }

    public beginPlay() {
        if (this._spinePlayerCtrl == null) return;
        this._spinePlayerCtrl.paused = false;
        this._spinePlayerCtrl.play("cloud", 0, false, this.playCloudComplete);
    }

    public playCloudComplete() {
        UIMgr.ins.closeUI(UIHudDef.CloudView, true);
    }

    onDestroy() {
        super.onDestroy();
        // console.error("clear");
        this.unschedule(this.playCloud);
        this._spinePlayerCtrl = null;
        this._hasPlayer = false;
        this._hasLoaded = false;
    }
}