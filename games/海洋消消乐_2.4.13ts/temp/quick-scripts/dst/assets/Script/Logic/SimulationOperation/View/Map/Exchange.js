
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/Exchange.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxFeGNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBeUQ7QUFDekQsbURBQWtEO0FBQ2xELG9EQUFtRDtBQUNuRCxvRkFBK0U7QUFDL0UsaURBQTRDO0FBQzVDLHdEQUFtRDtBQUNuRCx5REFBMEQ7QUFFMUQsdURBQXNEO0FBQ3RELHlEQUFvRDtBQUNwRCxtREFBOEM7QUFDOUMsZ0RBQTJDO0FBQzNDLGlFQUFnRTtBQUUxRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFJLGNBQWMsR0FBWSxLQUFLLENBQUM7QUFJcEM7SUFBc0MsNEJBQVk7SUFEbEQscUJBQXFCO0lBQ3JCO1FBQUEscUVBMlNDO1FBelNHLGdCQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFHeEIsa0JBQVksR0FBVyxFQUFFLENBQUM7UUFHMUIsVUFBSSxHQUFXLEVBQUUsQ0FBQztRQUdsQixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBR2xCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBRTVCLDhCQUE4QjtRQUM5QixnQ0FBZ0M7UUFHaEMsaUJBQVcsR0FBWSxLQUFLLENBQUMsQ0FBRSxnQkFBZ0I7UUFFL0Msd0JBQXdCO1FBQ3hCLCtCQUErQjtRQUUvQix3QkFBd0I7UUFDeEIsaUNBQWlDO1FBR2pDLG9CQUFjLEdBQWMsSUFBSSxDQUFDLENBQUUsV0FBVztRQUV0QyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUUvQixZQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWQsY0FBUSxHQUFHLGFBQWEsQ0FBQztRQUV6QixjQUFRLEdBQWMsRUFBRSxDQUFDO1FBSWpDLHFDQUFxQztRQUNyQyxPQUFPO1FBQ0MsYUFBTyxHQUFvQixJQUFJLENB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RUFBRSxDQUFDLE9BQU8sQ0FBQztnREFDTztJQU01QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2lEQUNRO0lBUzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ2E7SUE3QmhCLFFBQVE7UUFGNUIsT0FBTztRQUNSLHFCQUFxQjtPQUNBLFFBQVEsQ0EyUzVCO0lBQUQsZUFBQztDQTNTRCxBQTJTQyxDQTNTcUMsRUFBRSxDQUFDLFNBQVMsR0EyU2pEO2tCQTNTb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL0V2ZW50TWdyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuaW1wb3J0IFNwaW5lUGxheWVyQ3RybCBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9DdXN0b21Db21wb25lbnQvU3BpbmVQbGF5ZXJDdHJsXCI7XG5pbXBvcnQgU2hvd0J1aWxkVG9vbCBmcm9tIFwiLi9TaG93QnVpbGRUb29sXCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9VSU1nclwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgSXNsYW5kVW5sb2NrQ2ZnIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL1RhYmxzL0lzbGFuZFVubG9ja0NmZ1wiO1xuaW1wb3J0IHsgTWFwSXNsYW5kTWFuYWdlciB9IGZyb20gXCIuL01hcElzbGFuZE1hbmFnZXJcIjtcbmltcG9ydCBCdWlsZGluZ0xvY2sgZnJvbSBcIi4vQ29tcG9uZW50L0J1aWxkaW5nTG9ja1wiO1xuaW1wb3J0IE1hcElzbGFuZFV0aWxzIGZyb20gXCIuL01hcElzbGFuZFV0aWxzXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEd1aWRlVXRpbHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vR29kR3VpZGUvR3VpZGVVdGlsc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5sZXQgU2hvd0luRWRpdE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuQGNjY2xhc3Ncbi8vIEBleGVjdXRlSW5FZGl0TW9kZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhjaGFuZ2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxuICAgIGJ1aWxkaW5nSWQ6IG51bWJlciA9IC0xO1xuXG4gICAgQHByb3BlcnR5KGNjLlN0cmluZylcbiAgICBidWlsZGluZ05hbWU6IHN0cmluZyA9ICcnO1xuXG4gICAgQHByb3BlcnR5KGNjLlN0cmluZylcbiAgICBwYXRoOiBzdHJpbmcgPSAnJztcblxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxuICAgIHN0YXRlOiBudW1iZXIgPSAwO1xuXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXG4gICAgc2hvd0luRWRpdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgLy8gaWNvbnM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShjYy5Cb29sZWFuKVxuICAgIHVubG9ja1N0YXRlOiBib29sZWFuID0gZmFsc2U7ICAvL+aYr+WQpuW3sue7j+ino+mUgSDop6PplIHkuLp0cnVlXG5cbiAgICAvLyBAcHJvcGVydHkoW0V4Y2hhbmdlXSlcbiAgICAvLyBuZXh0VW5sb2NrOiBFeGNoYW5nZVtdID0gW107XG5cbiAgICAvLyBAcHJvcGVydHkoW0V4Y2hhbmdlXSlcbiAgICAvLyBhdXhpbGlhcnlBcnI6IEV4Y2hhbmdlW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgbG9ja0ljb25QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7ICAvL+S/rueQhueahGljb27mmL7npLpcblxuICAgIHByaXZhdGUgX2xvY2tJY29uSXRlbTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwdWJsaWMgaW5BbmltID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHJvb3RQYXRoID0gJ3ByZWZhYi9tYXAvJztcblxuICAgIHByaXZhdGUgc3RhdGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSB0ZW1wU3RhdGU6IG51bWJlcjtcblxuICAgIC8vIHByaXZhdGUgYnVpbGRpbmdDYW1lcmE6IGNjLkNhbWVyYTtcbiAgICAvL+W7uuetkeeahOmFjee9rlxuICAgIHByaXZhdGUgX2NvbmZpZzogSXNsYW5kVW5sb2NrQ2ZnID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuXG4gICAgICAgIC8vIGxldCBidWlsZGluZ1N0YXRlID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdCgnQnVpbGRpbmdTdGF0ZScpO1xuICAgICAgICAvLyBsZXQgYnVpbGRpbmdMb2NrID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdCgnQnVpbGRpbmdMb2NrJyk7XG4gICAgICAgIC8vIGxldCBrZXkgPSB0aGlzLnBhdGgucmVwbGFjZSgnLycsICdfJyk7XG5cblxuICAgICAgICAvLyBsZXQga2V5ID0gdGhpcy5idWlsZGluZ0lkO1xuICAgICAgICAvLyBpZiAoYnVpbGRpbmdTdGF0ZSAmJiBidWlsZGluZ1N0YXRlW2tleV0pIHtcbiAgICAgICAgLy8gICAgIHRoaXMuc3RhdGUgPSBidWlsZGluZ1N0YXRlW2tleV07XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBpZiAoYnVpbGRpbmdMb2NrICYmIGJ1aWxkaW5nTG9ja1trZXldICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyAgICAgdGhpcy5sb2NrU3RhdGUgPSBidWlsZGluZ0xvY2tba2V5XTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB0aGlzLmJ1aWxkaW5nQ2FtZXJhID0gY2MuZmluZCgnQ2FudmFzL01hcC9CdWlsZGluZ0NhbWVyYScpLmdldENvbXBvbmVudChjYy5DYW1lcmEpO1xuICAgICAgICB0aGlzLl9jb25maWcgPSBNYXBJc2xhbmRNYW5hZ2VyLmdldEJ1aWxkQ29uZmlnQnlJZCh0aGlzLmJ1aWxkaW5nSWQpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBNYXBJc2xhbmRVdGlscy5nZXRCdWlsZGluZ1N0YXRlKHRoaXMuYnVpbGRpbmdJZCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IodGhpcy5idWlsZGluZ0lkLCB0aGlzLnN0YXRlKTtcbiAgICAgICAgLy/mn6XnnIvmmK/lkKblt7Lnu4/op6PplIHmnInoo4Xmia4g5aaC5p6c5bey57uP6Kej6ZSBIDDooajnpLrlt7Lnu4/kv67nvK7msqHmnInpgInmi6nkuozpgInkuIAgMW9yMuihqOekuuW3sue7j+mAieWumuS6hlxuICAgICAgICBpZiAodGhpcy5fY29uZmlnID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLojrflj5bkuI3liLDphY3nva5cIiArIHRoaXMucGF0aCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXIgPSBNLnJ1bnRpbWUuZ2V0U3RhckNvdW50KCk7Ly85OTtcbiAgICAgICAgaWYgKHN0YXIgPj0gdGhpcy5fY29uZmlnLnN0YXJsdikge1xuICAgICAgICAgICAgdGhpcy51bmxvY2tTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcih0aGlzLmJ1aWxkaW5nSWQgKyBcIuWOu+WPr+S7peS/rue8ruino+mUgeS6hlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA+PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIuihqOekuuW3sue7j+mAieWumuWujOavlSzml6DpnIDlho3lpITnkIZcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHtcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgaWYgKFNob3dJbkVkaXRNb2RlIHx8IHRoaXMuc2hvd0luRWRpdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEJ1aWxkaW5nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9hZEJ1aWxkaW5nKHRoaXMuc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVuZGVyQnVpbGRpbmcoYnVpbGRpbmc6IGNjLk5vZGUsIHN0YXRlKSB7XG4gICAgLy8gICAgIHRoaXMuYnVpbGRpbmdDYW1lcmEubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIC8vICAgICBidWlsZGluZy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgLy8gICAgIGxldCBib3ggPSBidWlsZGluZy5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcblxuICAgIC8vICAgICBsZXQgcG9zID0gYnVpbGRpbmcucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGJveC5jZW50ZXIpO1xuICAgIC8vICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XG4gICAgLy8gICAgIGxldCB2aXNpYmxlUmVjdCA9IGNjLnZpZXcuZ2V0Vmlld3BvcnRSZWN0KCk7XG4gICAgLy8gICAgIHRleHR1cmUuaW5pdFdpdGhTaXplKGJveC53aWR0aCwgYm94LmhlaWdodCk7XG5cbiAgICAvLyAgICAgdGhpcy5idWlsZGluZ0NhbWVyYS50YXJnZXRUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAvLyAgICAgdGhpcy5idWlsZGluZ0NhbWVyYS5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XG5cbiAgICAvLyAgICAgdGhpcy5idWlsZGluZ0NhbWVyYS5yZW5kZXIoYnVpbGRpbmcpO1xuXG4gICAgLy8gICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAvLyAgICAgbGV0IGJ1aWxkaW5nU3AgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgIC8vICAgICBub2RlLnBhcmVudCA9IGJ1aWxkaW5nLnBhcmVudDtcbiAgICAvLyAgICAgbm9kZS5ncm91cCA9ICdtYXAnO1xuICAgIC8vICAgICBub2RlLnNjYWxlWSA9IC0xO1xuXG4gICAgLy8gICAgIHRoaXMuc3RhdGVBcnJbc3RhdGVdID0gbm9kZTtcblxuICAgIC8vICAgICBidWlsZGluZ1NwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAvLyAgICAgYnVpbGRpbmdTcC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcblxuICAgIC8vICAgICBidWlsZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAvLyAgICAgdGhpcy5idWlsZGluZ0NhbWVyYS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vIH1cblxuICAgIHB1YmxpYyBsb2FkQnVpbGRpbmcoc3RhdGU6IG51bWJlciwgZml4OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuaW5BbmltKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLnJvb3RQYXRoICsgdGhpcy5wYXRoICsgc3RhdGU7XG4gICAgICAgIGlmICh0aGlzLnBhdGgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZUFycltzdGF0ZV0pIHtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYjogY2MuUHJlZmFiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5yZW5kZXJCdWlsZGluZyhub2RlLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LCAxKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQXJyW3N0YXRlXSA9IG5vZGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05vZGVCeVN0YXRlKHN0YXRlLCBmaXgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Tm9kZUJ5U3RhdGUoc3RhdGUsIGZpeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOb2RlQnlTdGF0ZShzdGF0ZSwgZml4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd05vZGVCeVN0YXRlKHN0YXRlOiBudW1iZXIsIGZpeDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnN0YXRlQXJyLmZvckVhY2goKG5vZGU6IGNjLk5vZGUsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZSAmJiB0eXBlb2YgKG5vZGUpICE9ICdudW1iZXInKSBub2RlLmFjdGl2ZSA9IHN0YXRlID09IGlkeDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRoaXMuYXV4aWxpYXJ5QXJyLmZvckVhY2goKGV4Y2hhbmdlKSA9PiB7XG4gICAgICAgIC8vICAgICBleGNoYW5nZS5sb2FkQnVpbGRpbmcoc3RhdGUpO1xuICAgICAgICAvLyB9KVxuICAgICAgICB0aGlzLnRlbXBTdGF0ZSA9IHN0YXRlO1xuICAgICAgICBpZiAoZml4KSB0aGlzLnNldFN0YXRlKHRydWUpO1xuXG4gICAgICAgIHRoaXMuc2hvd0xvY2tJY29uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0YXRlKGNvbmZpcm06IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGNvbmZpcm0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlICE9IHRoaXMudGVtcFN0YXRlICYmICF0aGlzLmluQW5pbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5BbmltID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0hhbW1lcih0aGlzLnRlbXBTdGF0ZSwgdGhpcy5zdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy50ZW1wU3RhdGU7XG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wU3RhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xvY2tJY29uKCk7XG4gICAgICAgICAgICAgICAgTWFwSXNsYW5kVXRpbHMuc2V0QnVpbGRpbmdTdGF0ZSh0aGlzLmJ1aWxkaW5nSWQsIHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVtcFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQnVpbGRpbmcodGhpcy5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wU3RhdGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIOWxleekuuS/rue8rueahOeCueWHu2ljb24gKi9cbiAgICBwcml2YXRlIHNob3dMb2NrSWNvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPiAwIHx8ICF0aGlzLnVubG9ja1N0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrSWNvbkl0ZW0gJiYgdGhpcy5fbG9ja0ljb25JdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuX2xvY2tJY29uSXRlbSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvY2tJY29uSXRlbSkgcmV0dXJuO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuc3RhdGVBcnJbdGhpcy5zdGF0ZV07XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgbG9ja0l0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxvY2tJY29uUHJlZmFiKTtcbiAgICAgICAgICAgIHZhciBsb2NrID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcIkxvY2tcIik7XG4gICAgICAgICAgICBsb2NrSXRlbS5nZXRDb21wb25lbnQ8QnVpbGRpbmdMb2NrPihCdWlsZGluZ0xvY2spLnNldERhdGEodGhpcy5fY29uZmlnLmljb25JZCwgdGhpcy5fY29uZmlnLmJ1aWxkSWQsIHRoaXMpO1xuICAgICAgICAgICAgbG9ja0l0ZW0uc2V0UG9zaXRpb24obG9jayA/IGxvY2sucG9zaXRpb24gOiBjYy52MigwLCAwKSk7XG4gICAgICAgICAgICBsb2NrSXRlbS5zY2FsZSA9IDI7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobG9ja0l0ZW0sIDMsIFwiTG9ja0l0ZW1cIik7XG4gICAgICAgICAgICB0aGlzLl9sb2NrSWNvbkl0ZW0gPSBsb2NrSXRlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0hhbW1lcih0b1N0YXRlOiBudW1iZXIsIGZyb21TdGF0ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlQXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCB0b05vZGUgPSB0aGlzLnN0YXRlQXJyW3RvU3RhdGVdO1xuICAgICAgICAgICAgdG9Ob2RlICYmICh0b05vZGUub3BhY2l0eSA9IDAuMDEpO1xuICAgICAgICAgICAgbGV0IGZyb21Ob2RlID0gdGhpcy5zdGF0ZUFycltmcm9tU3RhdGVdO1xuICAgICAgICAgICAgZnJvbU5vZGUgJiYgKGZyb21Ob2RlLmFjdGl2ZSA9IHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHRoaXMucm9vdFBhdGggKyAnSGFtbWVyJywgY2MuUHJlZmFiLCAoZXJyLCBwcmVmYWI6IGNjLlByZWZhYikgPT4ge1xuICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuYWRkQ2hpbGQobm9kZSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2hvd0J1aWxkVG9vbCA9ICh0aGlzLnN0YXRlQXJyLmxlbmd0aCA/IHRoaXMuc3RhdGVBcnJbZnJvbVN0YXRlXSA6IHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihTaG93QnVpbGRUb29sKTtcbiAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gc2hvd0J1aWxkVG9vbC5ub2RlLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIC8vIGxldCBwb2ludHMgPSBzaG93QnVpbGRUb29sLnBvaW50cztcblxuICAgICAgICAgICAgICAgIGxldCBjbnQgPSBVdGlsLlRvb2wucmFuZ2VJbnQoMiwgMyk7XG4gICAgICAgICAgICAgICAgbGV0IHNwID0gbm9kZS5nZXRDb21wb25lbnQoU3BpbmVQbGF5ZXJDdHJsKTtcbiAgICAgICAgICAgICAgICBsZXQgY2FsbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY250LS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGNoYW5nZUFuaW0odG9TdGF0ZSwgZnJvbVN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBwb2ludDEgPSBwb2ludHNbVXRpbC5Ub29sLnJhbmdlSW50KDAsIHBvaW50cy5sZW5ndGggLSAxKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcG9pbnQyID0gcG9pbnRzW1V0aWwuVG9vbC5yYW5nZUludCgwLCBwb2ludHMubGVuZ3RoIC0gMSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm9kZS5wb3NpdGlvbiA9IGRlZmF1bHRQb3MuYWRkKHBvaW50MS5hZGQocG9pbnQyKS5tdWwoMC41KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNwLnBsYXkoJ2NodWl6aV9hbmknLCAwLCBmYWxzZSwgY2FsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3AucGxheSgnY2h1aXppX2FuaScsIDAsIGZhbHNlLCBjYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4Y2hhbmdlQW5pbSh0b1N0YXRlOiBudW1iZXIsIGZyb21TdGF0ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlQXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRvTm9kZSA9IHRoaXMuc3RhdGVBcnJbdG9TdGF0ZV07XG4gICAgICAgICAgICBpZiAoIXRvTm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEJ1aWxkaW5nKHRvU3RhdGUpO1xuICAgICAgICAgICAgICAgIGlmIChHdWlkZVV0aWxzLmN1ckd1aWRlSWQgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5CdWlsZFN1Y2Nlc3MsIHRoaXMuYnVpbGRpbmdJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZUluKDEpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmcm9tU3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEd1aWRlVXRpbHMuY3VyR3VpZGVJZCA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuQnVpbGRTdWNjZXNzLCB0aGlzLmJ1aWxkaW5nSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB0aGlzKSkpO1xuICAgICAgICAgICAgICAgIGxldCBwYXJ0aWNsZSA9IHRvTm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLlBhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAocGFydGljbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydGljbGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZS5yZXNldFN5c3RlbSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBmcm9tTm9kZSA9IHRoaXMuc3RhdGVBcnJbZnJvbVN0YXRlXTtcbiAgICAgICAgICAgIGZyb21Ob2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDEpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgICAgICB0aGlzLmluQW5pbSA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgdGhpcykpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuTWFwLlVwZ3JhZGUsIHRvU3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRMb2NrU3RhdGUobG9ja1N0YXRlOiBudW1iZXIpIHtcbiAgICAgICAgTWFwSXNsYW5kVXRpbHMuc2V0QnVpbGRpbmdTdGF0ZSh0aGlzLmJ1aWxkaW5nSWQsIGxvY2tTdGF0ZSk7XG4gICAgICAgIC8vIHRoaXMubG9ja1N0YXRlID0gbG9ja1N0YXRlO1xuICAgICAgICAvLyBsZXQgYnVpbGRpbmdMb2NrID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdCgnQnVpbGRpbmdMb2NrJykgfHwge307XG4gICAgICAgIC8vIGxldCBrZXkgPSB0aGlzLnBhdGgucmVwbGFjZSgnLycsICdfJyk7XG4gICAgICAgIC8vIGJ1aWxkaW5nTG9ja1trZXldID0gdGhpcy5sb2NrU3RhdGU7XG4gICAgICAgIC8vIFN0b3JhZ2VNZ3IuU3RvcmFnZS5zZXRPYmplY3QoJ0J1aWxkaW5nTG9jaycsIGJ1aWxkaW5nTG9jayk7XG4gICAgfVxuXG4gICAgcHVibGljIHVuTG9jaygpIHtcbiAgICAgICAgdGhpcy50ZW1wU3RhdGUgPSAxO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHRydWUpO1xuICAgICAgICAvLyB0aGlzLlxuICAgICAgICAvLyBFdmVudE1nci5pbnMuc2VuZChFdmVudC5NYXAuVW5Mb2NrKTtcblxuICAgICAgICAvLyB0aGlzLm5leHRVbmxvY2suZm9yRWFjaCgoZXhjaGFuZ2U6IEV4Y2hhbmdlKSA9PiB7XG4gICAgICAgIC8vICAgICBleGNoYW5nZS5zZXRMb2NrU3RhdGUoMCk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50Lk1hcC5TaG93TG9jayk7XG4gICAgfVxuXG5cbn0iXX0=