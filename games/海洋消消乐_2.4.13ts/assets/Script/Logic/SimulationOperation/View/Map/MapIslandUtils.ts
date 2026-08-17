import { Util } from "../../../../Base/Utils/Util";
import { MapIslandManager } from "./MapIslandManager";
import { StorageMgr } from "../../../../Base/Manager/StorageMgr";
import M from "../../../../Base/Manager/M";
import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";
import { IGuideConfig } from "../../../../../GodGuide/GodGuide";
import UIMgr from "../../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import { ICloudData } from "./CloudView";
import { Scene, WaringTips } from "../../../Data/Const/Constant";
export interface IBuildingState {
    buildingId: number,
    fixed: boolean,  //是否修理
    state: number    //当前建筑状态(0,1,2)   
}

export default class MapIslandUtils {
    private static _mapScale: number = 0;
    private static _mapLoadFinished: boolean = false;

    private static _camera: cc.Camera = null;

    public static set mapCamera(camera: cc.Camera) {
        this._camera = camera;
    }

    public static get mapCamera() {
        return this._camera;
    }

    public static set mapLoadFinished(mapLoadFinished) {
        this._mapLoadFinished = mapLoadFinished;
    }

    //海岛地图是否加载完毕
    public static get mapLoadFinished() {
        return this._mapLoadFinished;
    }

    public static set MapScale(scale: number) {
        this._mapScale = scale;
    }

    /** 主地图的缩放值 */
    public static get MapScale(): number {
        return this._mapScale;
    }

    //获取建筑二选一icon路径
    public static getBuildIcon(buildingId: number, state = 1): string {
        return `texture/map/ui/buildIcon/building_B_${buildingId}_${state}`;
    }

    //获取建筑分享icon路径
    public static getBuildShareIcon(buildingId: number, state = 1): string {
        return `texture/map/ui/buildShare/buildShare_B_${buildingId}_${state}`;
    }

    /** 获取建筑的当前状态  */
    public static getBuildingState(buildingId: number): number {
        let buildingStates = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState) || {};
        let singleBuildingState = buildingStates[buildingId];
        return singleBuildingState ? singleBuildingState.state : 0;
    }

    //设置建筑状态
    public static setBuildingState(buildingId: number, state: number) {
        let buildingStates = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState) || {};
        let singleBuildingState = buildingStates[buildingId];
        if (singleBuildingState == null) {
            singleBuildingState = { buildingId: buildingId, fixed: false, state: state };
        } else {
            singleBuildingState.state = state;
        }
        buildingStates[buildingId] = singleBuildingState;
        StorageMgr.Storage.setObject(StorageMgr.Storage.BuildingState, buildingStates, true);
    }

    /**获取建筑是否已经修理 */
    public static getBuildFixed(buildingId: number): boolean {
        let buildingStates = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState) || {};
        let singleBuildingState = buildingStates[buildingId];
        return singleBuildingState ? singleBuildingState.fixed : false;
    }

    //设置建筑修理状态
    public static setBuildFixed(buildingId: number) {
        let buildingStates = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState) || {};
        let singleBuildingState = buildingStates[buildingId];
        if (singleBuildingState == null) {
            singleBuildingState = { buildingId: buildingId, fixed: true, state: 0 };
        } else {
            singleBuildingState.fixed = true;
        }
        buildingStates[buildingId] = singleBuildingState;
        StorageMgr.Storage.setObject(StorageMgr.Storage.BuildingState, buildingStates, true);
    }

    public static getBuildConfigById(buildingId: number) {
        return MapIslandManager.getBuildConfigById(buildingId);
    }

    /** 获取下一个星星解锁的建筑id */
    public static getNextUnlockBuildingId() {
        var star = M.runtime.getStarCount();
        var config = M.table.IslandUnlockCfg.getData();
        for (var i = 0; i < config.length; ++i) {
            if (star < config[i].starlv) {
                return config[i].buildId;
            }
        }
        return -1;
    }

    /** 获取最小一个建筑id 已经开放了但是未修理或者未二选一 */
    public static getSmallOpenBuildingId(): number {
        var config = M.table.IslandUnlockCfg.getData();
        var star = M.runtime.getStarCount();

        let buildingStates = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState);
        if (buildingStates == null) {
            return config[0].buildId;
        } else {
            let bigBuildingId = 1;
            for (let id in buildingStates) {
                if (buildingStates[id] && buildingStates[id].fixed && buildingStates[id].state == 0) {
                    return buildingStates[id].buildingId;
                }
                bigBuildingId = Number(id);
            }
            for (var i = 0; i < config.length; ++i) {
                let iconfig = config[i];
                if (buildingStates[iconfig.buildId] == null && iconfig.starlv <= star) {
                    return iconfig.buildId;
                }
            }
            return bigBuildingId;
        }
    }

    /** 根据建筑id获取建筑位置 */
    public static getBuildPosByBuildId(buildingId: number): cc.Vec2 {
        let _mapBuildPos = { "1": { "x": -778.735, "y": -1283.624, "z": 0 }, "2": { "x": -877.871, "y": -1022.928, "z": 0 }, "3": { "x": -1698.228, "y": -340.702, "z": 0 }, "4": { "x": -1474.884, "y": -398.388, "z": 0 }, "5": { "x": -1276.322, "y": -162.589, "z": 0 }, "6": { "x": -927.726, "y": -365.137, "z": 0 }, "7": { "x": -907.5, "y": 66, "z": 0 }, "8": { "x": -534.028, "y": 196.112, "z": 0 }, "9": { "x": -412, "y": -129, "z": 0 }, "10": { "x": 78.136, "y": -790.895, "z": 0 }, "11": { "x": 0, "y": -81.065, "z": 0 }, "12": { "x": -404.968, "y": 636.378, "z": 0 }, "13": { "x": 0, "y": 387.765, "z": 0 }, "14": { "x": 81.937, "y": 847.765, "z": 0 }, "15": { "x": 791.125, "y": -558.105, "z": 0 }, "16": { "x": 900.651, "y": -81.548, "z": 0 }, "17": { "x": 372.904, "y": 668.322, "z": 0 }, "18": { "x": 752.595, "y": 850.622, "z": 0 }, "19": { "x": 1227.135, "y": 701.697, "z": 0 }, "20": { "x": 1431.102, "y": 782.251, "z": 0 }, "21": { "x": 1154.27, "y": 1103.031, "z": 0 }, "22": { "x": 1565.413, "y": 961.177, "z": 0 }, "23": { "x": 1781.137, "y": 803.848, "z": 0 }, "24": { "x": 1974.198, "y": 271.749, "z": 0 }, "25": { "x": 1753.702, "y": 1299.591, "z": 0 }, "26": { "x": 1728.51, "y": 597.399, "z": 0 }, "27": { "x": 2102.261, "y": 1456.261, "z": 0 } };
        return _mapBuildPos[buildingId];
    }

    /** 使地图中心移动到指定的建筑id */
    public static mapMoveTo(buildingId: number, moveEndNext) {
        // buildingId = 7;
        var buildPos = MapIslandUtils.getBuildPosByBuildId(buildingId);
        if (buildPos) {
            EventMgr.ins.send(Event.Map.CameraMoveTo, cc.v2(buildPos.x, buildPos.y), moveEndNext);
        }
    }

    //将海岛的物件的世界坐标转换成摄像机的屏幕坐标
    public static cameraGetWorldToScreenPoint(point, out) {
        this._camera && this._camera.getWorldToScreenPoint(point, out);
    }

    // public static test(point: cc.Vec2) {
    //     let out = cc.v2();
    //     let point1 = point.scale(cc.v2(this._mapScale, this._mapScale));
    //     this.cameraGetWorldToScreenPoint(point1, out);
    //     console.error(point, point1, out);
    // }

    public static convertMapItemPosition(node: cc.Node, stepConfig: IGuideConfig): cc.Vec2 {
        if (!this._camera) return null;
        let out = cc.v3();
        var commandType = stepConfig.command.type;
        if (commandType == "MapItem") {   //地图上的物件 需要缩放
            node.position.scale(cc.v3(this._mapScale, this._mapScale, 1), out);
        } else if (commandType == undefined) {  //没有特殊标注 无需任何处理
            return null;
        } else if (commandType == "MapUI") {
            return null;
        }
        let out1 = cc.v2();
        this.cameraGetWorldToScreenPoint(out, out1);
        return out1;
    }

    public static setWin() {
        UIMgr.ins.showUI(UIHudDef.GameOverWin, { type: UIHudDef.GameOverWin, data: 1 });
    }

    private static _loadBgCompleted: boolean = false;

    //预加载海岛的背景图
    public static preloadMapBg() {
        // if (this._loadBgCompleted) return;
        // cc.director.preloadScene(Scene.Map);
        // let buildingArr = [];
        // for (let i = 1; i <= 25; i++) {
        //     buildingArr.push('texture/map/bg/map_' + (i < 10 ? '0' + i : i));
        // }
        // cc.loader.loadResArray(buildingArr, null, (err, resource: any[]) => {
        //     if (!err) {
        //         console.log('预加载map资源完毕!');
        //     } else {
        //         console.warn("加载出错" + err);
        //     }
        //     this._loadBgCompleted = true;
        // })
    }

    //打开海岛
    public static openMapIsland() {
        // let star = M.runtime.getStarCount();
        // let needStar = this.openMapNeedStar()
        // if (star < needStar) {
        //     M.tips.show(Util.Tool.stringFormat(WaringTips.CannotOpenIsland, needStar));
        //     return;
        // }
        // UIMgr.ins.showUI(UIHudDef.CloudView, ICloudData.JumpIsland);
        // cc.director.loadScene("HotelScene");
        UIMgr.ins.showUI(UIHudDef.CloudView, ICloudData.OpenHotel);
    }

    /** 开启需要的星级 */
    public static openMapNeedStar() {
        let config = M.table.IslandUnlockCfg.getData();
        return config[0].starlv;
    }

    //离开海岛
    public static leaveMapIsland() {
        UIMgr.ins.showUI(UIHudDef.CloudView, ICloudData.LeaveIsland);
    }

    //检查建筑是否已经修理
    public static checkBuildFixed(buildingId: number) {
        return this.getBuildFixed(buildingId);
    }

    //检查建筑是否已经完工
    public static checkBuildFinished(buildingId: number) {
        return this.getBuildingState(buildingId) != 0;
    }
}
window["MapIslandUtils"] = MapIslandUtils;