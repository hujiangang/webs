"use strict";
cc._RF.push(module, '07a90nMs9lHZLtIB2or7Fn3', 'Exchange');
// Script/Logic/SimulationOperation/View/Map/Exchange.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Data/Const/Event");
var Util_1 = require("../../../../Base/Utils/Util");
var SpinePlayerCtrl_1 = require("../../../../Base/CustomComponent/SpinePlayerCtrl");
var ShowBuildTool_1 = require("./ShowBuildTool");
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var MapIslandManager_1 = require("./MapIslandManager");
var BuildingLock_1 = require("./Component/BuildingLock");
var MapIslandUtils_1 = require("./MapIslandUtils");
var M_1 = require("../../../../Base/Manager/M");
var GuideUtils_1 = require("../../../../../GodGuide/GuideUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShowInEditMode = false;
var Exchange = /** @class */ (function (_super) {
    __extends(Exchange, _super);
    // @executeInEditMode
    function Exchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildingId = -1;
        _this.buildingName = '';
        _this.path = '';
        _this.state = 0;
        _this.showInEdit = false;
        // @property([cc.SpriteFrame])
        // icons: cc.SpriteFrame[] = [];
        _this.unlockState = false; //是否已经解锁 解锁为true
        // @property([Exchange])
        // nextUnlock: Exchange[] = [];
        // @property([Exchange])
        // auxiliaryArr: Exchange[] = [];
        _this.lockIconPrefab = null; //修理的icon显示
        _this._lockIconItem = null;
        _this.inAnim = false;
        _this.rootPath = 'prefab/map/';
        _this.stateArr = [];
        // private buildingCamera: cc.Camera;
        //建筑的配置
        _this._config = null;
        return _this;
    }
    Exchange.prototype.onLoad = function () {
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
        this._config = MapIslandManager_1.MapIslandManager.getBuildConfigById(this.buildingId);
        this.state = MapIslandUtils_1.default.getBuildingState(this.buildingId);
        // console.error(this.buildingId, this.state);
        //查看是否已经解锁有装扮 如果已经解锁 0表示已经修缮没有选择二选一 1or2表示已经选定了
        if (this._config == null) {
            console.error("获取不到配置" + this.path);
            return;
        }
        var star = M_1.default.runtime.getStarCount(); //99;
        if (star >= this._config.starlv) {
            this.unlockState = true;
            if (this.state == 0) {
                // console.error(this.buildingId + "去可以修缮解锁了");
            }
            else if (this.state >= 1) {
                // console.error("表示已经选定完毕,无需再处理");
            }
        }
    };
    Exchange.prototype.onEnable = function () {
        if (CC_EDITOR) {
            if (ShowInEditMode || this.showInEdit) {
                this.node.removeAllChildren();
                this.loadBuilding(this.state);
            }
            else {
                this.node.removeAllChildren();
            }
        }
        else {
            this.loadBuilding(this.state);
        }
    };
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
    Exchange.prototype.loadBuilding = function (state, fix) {
        // if (this.inAnim) return;
        var _this = this;
        if (fix === void 0) { fix = false; }
        var path = this.rootPath + this.path + state;
        if (this.path) {
            if (!this.stateArr[state]) {
                cc.loader.loadRes(path, cc.Prefab, function (err, prefab) {
                    if (!err) {
                        var node = cc.instantiate(prefab);
                        _this.node.addChild(node);
                        // this.scheduleOnce(() => {
                        //     this.renderBuilding(node, state);
                        // }, 1)
                        _this.stateArr[state] = node;
                        _this.showNodeByState(state, fix);
                    }
                    else {
                        _this.showNodeByState(state, fix);
                    }
                });
            }
            else {
                this.showNodeByState(state, fix);
            }
        }
    };
    Exchange.prototype.showNodeByState = function (state, fix) {
        this.stateArr.forEach(function (node, idx) {
            if (node && typeof (node) != 'number')
                node.active = state == idx;
        });
        // this.auxiliaryArr.forEach((exchange) => {
        //     exchange.loadBuilding(state);
        // })
        this.tempState = state;
        if (fix)
            this.setState(true);
        this.showLockIcon();
    };
    Exchange.prototype.setState = function (confirm) {
        if (confirm) {
            if (this.state != this.tempState && !this.inAnim) {
                this.inAnim = true;
                this.showHammer(this.tempState, this.state);
                this.state = this.tempState;
                this.tempState = null;
                this.showLockIcon();
                MapIslandUtils_1.default.setBuildingState(this.buildingId, this.state);
            }
        }
        else {
            if (this.tempState) {
                this.loadBuilding(this.state);
                this.tempState = null;
            }
        }
    };
    /** 展示修缮的点击icon */
    Exchange.prototype.showLockIcon = function () {
        if (this.state > 0 || !this.unlockState) {
            this._lockIconItem && this._lockIconItem.destroy();
            this._lockIconItem = null;
            return;
        }
        if (this._lockIconItem)
            return;
        var node = this.stateArr[this.state];
        if (node) {
            var lockItem = cc.instantiate(this.lockIconPrefab);
            var lock = node.getChildByName("Lock");
            lockItem.getComponent(BuildingLock_1.default).setData(this._config.iconId, this._config.buildId, this);
            lockItem.setPosition(lock ? lock.position : cc.v2(0, 0));
            lockItem.scale = 2;
            this.node.addChild(lockItem, 3, "LockItem");
            this._lockIconItem = lockItem;
        }
    };
    Exchange.prototype.showHammer = function (toState, fromState) {
        var _this = this;
        if (this.stateArr.length > 1) {
            var toNode = this.stateArr[toState];
            toNode && (toNode.opacity = 0.01);
            var fromNode = this.stateArr[fromState];
            fromNode && (fromNode.active = true);
        }
        cc.loader.loadRes(this.rootPath + 'Hammer', cc.Prefab, function (err, prefab) {
            if (!err) {
                var node_1 = cc.instantiate(prefab);
                _this.node.parent.parent.addChild(node_1);
                var showBuildTool = (_this.stateArr.length ? _this.stateArr[fromState] : _this.node).getComponentInChildren(ShowBuildTool_1.default);
                node_1.position = showBuildTool.node.position;
                // let points = showBuildTool.points;
                var cnt_1 = Util_1.Util.Tool.rangeInt(2, 3);
                var sp_1 = node_1.getComponent(SpinePlayerCtrl_1.default);
                var call_1 = function () {
                    cnt_1--;
                    if (cnt_1 < 0) {
                        node_1.removeFromParent();
                        node_1.destroy();
                        _this.exchangeAnim(toState, fromState);
                    }
                    else {
                        // let point1 = points[Util.Tool.rangeInt(0, points.length - 1)];
                        // let point2 = points[Util.Tool.rangeInt(0, points.length - 1)];
                        // node.position = defaultPos.add(point1.add(point2).mul(0.5));
                        sp_1.play('chuizi_ani', 0, false, call_1);
                    }
                };
                sp_1.play('chuizi_ani', 0, false, call_1);
            }
        });
    };
    Exchange.prototype.exchangeAnim = function (toState, fromState) {
        var _this = this;
        if (this.stateArr.length) {
            var toNode = this.stateArr[toState];
            if (!toNode) {
                this.loadBuilding(toState);
                if (GuideUtils_1.GuideUtils.curGuideId == -1) {
                    UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.BuildSuccess, this.buildingId);
                }
            }
            else {
                toNode.runAction(cc.sequence(cc.fadeIn(1), cc.callFunc(function () {
                    if (fromState == 0) {
                        if (GuideUtils_1.GuideUtils.curGuideId == -1) {
                            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.BuildSuccess, _this.buildingId);
                        }
                    }
                }, this)));
                var particle = toNode.getComponentInChildren(cc.ParticleSystem);
                if (particle) {
                    particle.node.active = true;
                    particle.resetSystem();
                }
                ;
            }
            var fromNode_1 = this.stateArr[fromState];
            fromNode_1.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function () {
                fromNode_1.active = false;
                fromNode_1.opacity = 255;
                _this.inAnim = false;
            }, this)));
        }
        else {
            EventMgr_1.default.ins.send(Event_1.Event.Map.Upgrade, toState);
        }
    };
    Exchange.prototype.setLockState = function (lockState) {
        MapIslandUtils_1.default.setBuildingState(this.buildingId, lockState);
        // this.lockState = lockState;
        // let buildingLock = StorageMgr.Storage.getObject('BuildingLock') || {};
        // let key = this.path.replace('/', '_');
        // buildingLock[key] = this.lockState;
        // StorageMgr.Storage.setObject('BuildingLock', buildingLock);
    };
    Exchange.prototype.unLock = function () {
        this.tempState = 1;
        this.setState(true);
        // this.
        // EventMgr.ins.send(Event.Map.UnLock);
        // this.nextUnlock.forEach((exchange: Exchange) => {
        //     exchange.setLockState(0);
        // })
        // EventMgr.ins.send(Event.Map.ShowLock);
    };
    __decorate([
        property(cc.Integer)
    ], Exchange.prototype, "buildingId", void 0);
    __decorate([
        property(cc.String)
    ], Exchange.prototype, "buildingName", void 0);
    __decorate([
        property(cc.String)
    ], Exchange.prototype, "path", void 0);
    __decorate([
        property(cc.Integer)
    ], Exchange.prototype, "state", void 0);
    __decorate([
        property(cc.Boolean)
    ], Exchange.prototype, "showInEdit", void 0);
    __decorate([
        property(cc.Boolean)
    ], Exchange.prototype, "unlockState", void 0);
    __decorate([
        property(cc.Prefab)
    ], Exchange.prototype, "lockIconPrefab", void 0);
    Exchange = __decorate([
        ccclass
        // @executeInEditMode
    ], Exchange);
    return Exchange;
}(cc.Component));
exports.default = Exchange;

cc._RF.pop();