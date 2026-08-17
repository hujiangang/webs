import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";
import { Util } from "../../../../Base/Utils/Util";
import SpinePlayerCtrl from "../../../../Base/CustomComponent/SpinePlayerCtrl";
import ShowBuildTool from "./ShowBuildTool";
import UIMgr from "../../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import IslandUnlockCfg from "../../../../Base/Tabls/IslandUnlockCfg";
import { MapIslandManager } from "./MapIslandManager";
import BuildingLock from "./Component/BuildingLock";
import MapIslandUtils from "./MapIslandUtils";
import M from "../../../../Base/Manager/M";
import { GuideUtils } from "../../../../../GodGuide/GuideUtils";

const { ccclass, property } = cc._decorator;

let ShowInEditMode: boolean = false;

@ccclass
// @executeInEditMode
export default class Exchange extends cc.Component {
    @property(cc.Integer)
    buildingId: number = -1;

    @property(cc.String)
    buildingName: string = '';

    @property(cc.String)
    path: string = '';

    @property(cc.Integer)
    state: number = 0;

    @property(cc.Boolean)
    showInEdit: boolean = false;

    // @property([cc.SpriteFrame])
    // icons: cc.SpriteFrame[] = [];

    @property(cc.Boolean)
    unlockState: boolean = false;  //是否已经解锁 解锁为true

    // @property([Exchange])
    // nextUnlock: Exchange[] = [];

    // @property([Exchange])
    // auxiliaryArr: Exchange[] = [];

    @property(cc.Prefab)
    lockIconPrefab: cc.Prefab = null;  //修理的icon显示

    private _lockIconItem: cc.Node = null;

    public inAnim = false;

    private rootPath = 'prefab/map/';

    private stateArr: cc.Node[] = [];

    private tempState: number;

    // private buildingCamera: cc.Camera;
    //建筑的配置
    private _config: IslandUnlockCfg = null;

    onLoad() {


        // let buildingState = StorageMgr.Storage.getObject('BuildingState');
        // let buildingLock = StorageMgr.Storage.getObject('BuildingLock');
        // let key = this.path.replace('/', '_');


        // let key = this.buildingId;
        // if (buildingState && buildingState[key]) {
        //     this.state = buildingState[key];
        // }

        // if (buildingLock && buildingLock[key] != undefined) {
        //     this.lockState = buildingLock[key];
        // }
        // this.buildingCamera = cc.find('Canvas/Map/BuildingCamera').getComponent(cc.Camera);
        this._config = MapIslandManager.getBuildConfigById(this.buildingId);

        this.state = MapIslandUtils.getBuildingState(this.buildingId);
        // console.error(this.buildingId, this.state);
        //查看是否已经解锁有装扮 如果已经解锁 0表示已经修缮没有选择二选一 1or2表示已经选定了
        if (this._config == null) {
            console.error("获取不到配置" + this.path);
            return;
        }
        let star = M.runtime.getStarCount();//99;
        if (star >= this._config.starlv) {
            this.unlockState = true;
            if (this.state == 0) {
                // console.error(this.buildingId + "去可以修缮解锁了");
            } else if (this.state >= 1) {
                // console.error("表示已经选定完毕,无需再处理");
            }
        }
    }

    onEnable() {
        if (CC_EDITOR) {
            if (ShowInEditMode || this.showInEdit) {
                this.node.removeAllChildren();
                this.loadBuilding(this.state);
            } else {
                this.node.removeAllChildren();
            }
        } else {
            this.loadBuilding(this.state);
        }
    }

    // renderBuilding(building: cc.Node, state) {
    //     this.buildingCamera.node.active = true;
    //     building.active = true;

    //     let box = building.getBoundingBoxToWorld();

    //     let pos = building.parent.convertToNodeSpaceAR(box.center);
    //     let texture = new cc.RenderTexture();
    //     let visibleRect = cc.view.getViewportRect();
    //     texture.initWithSize(box.width, box.height);

    //     this.buildingCamera.targetTexture = texture;
    //     this.buildingCamera.node.setPosition(pos);

    //     this.buildingCamera.render(building);

    //     let node = new cc.Node();
    //     let buildingSp = node.addComponent(cc.Sprite);
    //     node.parent = building.parent;
    //     node.group = 'map';
    //     node.scaleY = -1;

    //     this.stateArr[state] = node;

    //     buildingSp.node.setPosition(pos);
    //     buildingSp.spriteFrame = new cc.SpriteFrame(texture);

    //     building.active = false;
    //     this.buildingCamera.node.active = false;
    // }

    public loadBuilding(state: number, fix: boolean = false) {
        // if (this.inAnim) return;

        let path = this.rootPath + this.path + state;
        if (this.path) {
            if (!this.stateArr[state]) {
                cc.loader.loadRes(path, cc.Prefab, (err, prefab: cc.Prefab) => {
                    if (!err) {
                        let node = cc.instantiate(prefab);
                        this.node.addChild(node);
                        // this.scheduleOnce(() => {
                        //     this.renderBuilding(node, state);
                        // }, 1)

                        this.stateArr[state] = node;

                        this.showNodeByState(state, fix);
                    } else {
                        this.showNodeByState(state, fix);
                    }
                })
            } else {
                this.showNodeByState(state, fix);
            }
        }
    }

    private showNodeByState(state: number, fix: boolean) {
        this.stateArr.forEach((node: cc.Node, idx: number) => {
            if (node && typeof (node) != 'number') node.active = state == idx;
        });
        // this.auxiliaryArr.forEach((exchange) => {
        //     exchange.loadBuilding(state);
        // })
        this.tempState = state;
        if (fix) this.setState(true);

        this.showLockIcon();
    }

    public setState(confirm: boolean) {
        if (confirm) {
            if (this.state != this.tempState && !this.inAnim) {
                this.inAnim = true;

                this.showHammer(this.tempState, this.state);

                this.state = this.tempState;
                this.tempState = null;
                this.showLockIcon();
                MapIslandUtils.setBuildingState(this.buildingId, this.state);
            }
        } else {
            if (this.tempState) {
                this.loadBuilding(this.state);
                this.tempState = null;
            }
        }
    }

    /** 展示修缮的点击icon */
    private showLockIcon() {
        if (this.state > 0 || !this.unlockState) {
            this._lockIconItem && this._lockIconItem.destroy();
            this._lockIconItem = null;
            return;
        }
        if (this._lockIconItem) return;
        var node = this.stateArr[this.state];
        if (node) {
            var lockItem = cc.instantiate(this.lockIconPrefab);
            var lock = node.getChildByName("Lock");
            lockItem.getComponent<BuildingLock>(BuildingLock).setData(this._config.iconId, this._config.buildId, this);
            lockItem.setPosition(lock ? lock.position : cc.v2(0, 0));
            lockItem.scale = 2;
            this.node.addChild(lockItem, 3, "LockItem");
            this._lockIconItem = lockItem;
        }
    }

    private showHammer(toState: number, fromState: number) {
        if (this.stateArr.length > 1) {
            let toNode = this.stateArr[toState];
            toNode && (toNode.opacity = 0.01);
            let fromNode = this.stateArr[fromState];
            fromNode && (fromNode.active = true);
        }
        cc.loader.loadRes(this.rootPath + 'Hammer', cc.Prefab, (err, prefab: cc.Prefab) => {
            if (!err) {
                let node = cc.instantiate(prefab);
                this.node.parent.parent.addChild(node);

                let showBuildTool = (this.stateArr.length ? this.stateArr[fromState] : this.node).getComponentInChildren(ShowBuildTool);
                node.position = showBuildTool.node.position;
                // let points = showBuildTool.points;

                let cnt = Util.Tool.rangeInt(2, 3);
                let sp = node.getComponent(SpinePlayerCtrl);
                let call = () => {
                    cnt--;
                    if (cnt < 0) {
                        node.removeFromParent();
                        node.destroy();
                        this.exchangeAnim(toState, fromState);
                    } else {
                        // let point1 = points[Util.Tool.rangeInt(0, points.length - 1)];
                        // let point2 = points[Util.Tool.rangeInt(0, points.length - 1)];
                        // node.position = defaultPos.add(point1.add(point2).mul(0.5));

                        sp.play('chuizi_ani', 0, false, call);
                    }
                }
                sp.play('chuizi_ani', 0, false, call);
            }
        })
    }

    private exchangeAnim(toState: number, fromState: number) {
        if (this.stateArr.length) {
            let toNode = this.stateArr[toState];
            if (!toNode) {
                this.loadBuilding(toState);
                if (GuideUtils.curGuideId == -1) {
                    UIMgr.ins.showUI(UIHudDef.BuildSuccess, this.buildingId)
                }
            } else {
                toNode.runAction(cc.sequence(cc.fadeIn(1), cc.callFunc(() => {
                    if (fromState == 0) {
                        if (GuideUtils.curGuideId == -1) {
                            UIMgr.ins.showUI(UIHudDef.BuildSuccess, this.buildingId)
                        }
                    }
                }, this)));
                let particle = toNode.getComponentInChildren(cc.ParticleSystem);
                if (particle) {
                    particle.node.active = true;
                    particle.resetSystem();
                };
            }

            let fromNode = this.stateArr[fromState];
            fromNode.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(() => {
                fromNode.active = false;
                fromNode.opacity = 255;
                this.inAnim = false;
            }, this)))
        } else {
            EventMgr.ins.send(Event.Map.Upgrade, toState);
        }
    }

    private setLockState(lockState: number) {
        MapIslandUtils.setBuildingState(this.buildingId, lockState);
        // this.lockState = lockState;
        // let buildingLock = StorageMgr.Storage.getObject('BuildingLock') || {};
        // let key = this.path.replace('/', '_');
        // buildingLock[key] = this.lockState;
        // StorageMgr.Storage.setObject('BuildingLock', buildingLock);
    }

    public unLock() {
        this.tempState = 1;
        this.setState(true);
        // this.
        // EventMgr.ins.send(Event.Map.UnLock);

        // this.nextUnlock.forEach((exchange: Exchange) => {
        //     exchange.setLockState(0);
        // })
        // EventMgr.ins.send(Event.Map.ShowLock);
    }


}