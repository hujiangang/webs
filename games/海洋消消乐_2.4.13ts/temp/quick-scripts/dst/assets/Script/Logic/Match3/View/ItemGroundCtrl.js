
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/ItemGroundCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'edc59dLu7NC9ruCos3FByBh', 'ItemGroundCtrl');
// Script/Logic/Match3/View/ItemGroundCtrl.ts

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
var BaseItemView_1 = require("./BaseItemView");
var M_1 = require("../../../Base/Manager/M");
var Constant_1 = require("../../Data/Const/Constant");
var SpinePlayerCtrl_1 = require("../../../Base/CustomComponent/SpinePlayerCtrl");
var Event_1 = require("../../Data/Const/Event");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var ResCtrl_1 = require("../ResCtrl");
var Common_1 = require("../../Common/Common");
var Tuituji_1 = require("./Comp/Tuituji");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShuiCaoIdleAniName = ['shuicao_2', 'shuicao'];
var ShuiCaoHitAni = ['shuicao_hit2', 'shuicao_hit'];
var ItemGroundCtrl = /** @class */ (function (_super) {
    __extends(ItemGroundCtrl, _super);
    function ItemGroundCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.elementSprite = null;
        _this.buriedSprite = null;
        _this.WallPrefab = null;
        _this.tuitujiPrefab = null;
        _this.LotusleafFrame = null;
        _this.girlRoadFrame = null;
        _this.Ivy = null;
        _this.exitPrefab = null;
        _this.shanhuAni = null;
        _this.ivyCtrl = null;
        _this.showLv = -1;
        _this._downLayer = null;
        _this._tuitujiCtrl = null;
        _this.complexViewNode = null;
        return _this;
    }
    ItemGroundCtrl.prototype.onLoad = function () {
    };
    ItemGroundCtrl.prototype.start = function () {
    };
    ItemGroundCtrl.prototype.init = function (model, downLayer) {
        _super.prototype.init.call(this, model);
        if (model) {
            this._downLayer = downLayer;
            this.cleanDisplay();
            this.buriedSprite.node.active = false;
            this.node.setPosition(model.getPosition());
            this.showPlug();
            this.showExit();
            this.showWall();
        }
    };
    ItemGroundCtrl.prototype.cleanDisplay = function () {
        this.elementSprite.node.scale = 1;
        this.elementSprite.node.angle = 0;
        this.elementSprite.node.active = false;
        this.elementSprite.node.destroyAllChildren();
    };
    //播放珊瑚动画，销毁"
    ItemGroundCtrl.prototype.PlayShanhuAnim = function () {
        if ((this.model.getType() == Constant_1.GroundType.Mushroom)) {
            //cc.log("播放珊瑚动画");
            var node_1 = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.ShanhuAnim, this.shanhuAni);
            var _animation = node_1.getComponent(cc.Animation);
            node_1.parent = this.elementSprite.node;
            //node.setPosition(0, 0);
            _animation.play("shanhuFX");
            //回收
            var a1 = cc.delayTime(1.2);
            var a2 = cc.callFunc(function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.ShanhuAnim, node_1);
            });
            node_1.runAction(cc.sequence(a1, a2));
        }
    };
    ItemGroundCtrl.prototype.updateView = function () {
        if (this.showLv != this.model.getLv()) {
            switch (this.model.getType()) {
                case Constant_1.GroundType.Water:
                    break;
                case Constant_1.GroundType.Leaves:
                    this.showLeaves();
                    break;
                case Constant_1.GroundType.Ivy:
                    this.showIvy();
                    break;
                case Constant_1.GroundType.Flower:
                    this.showFlower();
                    break;
                case Constant_1.GroundType.Firefly:
                    this.showFirefly();
                    break;
                case Constant_1.GroundType.Tuituji:
                    this.showTuituji();
                    break;
                case Constant_1.GroundType.Mushroom:
                    this.showMushroom();
                    break;
                case Constant_1.GroundType.None:
                    this.elementSprite.node.active = false;
                    break;
            }
        }
    };
    ItemGroundCtrl.prototype.showExit = function () {
        if (this.model.isExit) {
            var exitNode = M_1.default.nodePool.createItem(this.exitPrefab);
            exitNode.parent = this.node;
        }
    };
    ItemGroundCtrl.prototype.showPlug = function () {
        if (this.model.isGirlRoad) {
            this.node['baseSprite'].spriteFrame = this.girlRoadFrame;
        }
        else if (this.model.isConveyer) {
            this.addLotusleaf();
        }
    };
    ItemGroundCtrl.prototype.updateTuitujiPower = function () {
        if (this._tuitujiCtrl) {
            this._tuitujiCtrl.collectItem();
        }
    };
    ItemGroundCtrl.prototype.hideMushroom = function () {
        //播放动画咯!
        this.cleanDisplay();
        // cc.log("播放珊瑚动画，销毁");
    };
    ItemGroundCtrl.prototype.showMushroom = function () {
        this.elementSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.elementSprite.node.active = true;
        this.elementSprite.spriteFrame = ResCtrl_1.default.ins.getMushroomFrame(this.model.getLv());
        this.elementSprite.node.setScale(90 / this.elementSprite.node.width);
        this.showLv = this.model.getLv();
        if (this.model.getLv() == 0) {
            this.PlayShanhuAnim();
        }
    };
    ItemGroundCtrl.prototype.showTuituji = function () {
        this.elementSprite.node.active = true;
        var node = cc.instantiate(this.tuitujiPrefab);
        node.parent = this.elementSprite.node;
        this._tuitujiCtrl = node.getComponent(Tuituji_1.default);
        this._tuitujiCtrl.init(this.model.tuitujiCfg);
        this.showLv = this.model.getLv();
    };
    ItemGroundCtrl.prototype.showFirefly = function () {
        this.elementSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.elementSprite.node.active = true;
        this.elementSprite.spriteFrame = ResCtrl_1.default.ins.getFirefly(this.model.getLv() - 1);
        this.elementSprite.node.setScale(86 / this.elementSprite.node.width);
        this.showLv = this.model.getLv();
    };
    ItemGroundCtrl.prototype.showFlower = function () {
        this.elementSprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        this.elementSprite.node.active = true;
        this.elementSprite.spriteFrame = ResCtrl_1.default.ins.getFlowerFrame(this.model.getLv() - 1);
        this.showLv = this.model.getLv();
        if (this.showLv <= 0) {
            M_1.default.event.send(Event_1.Event.GameCMD.ChangeCell, Constant_1.CellType.Flower, 4, false);
            this.model.setLv(this.model.gridData.flowers);
        }
    };
    ItemGroundCtrl.prototype.showWall = function () {
        if (this.model && this.model.Wall) {
            for (var key in this.model.Wall) {
                var angle = this.model.Wall[key];
                if (angle != undefined) {
                    var wn = cc.instantiate(this.WallPrefab);
                    wn.parent = this.node;
                    wn.angle = angle;
                    var gap = angle < 90 ? 7 : -7;
                    if (Math.abs(angle) / 90 == 1) {
                        wn.x += gap;
                    }
                    else {
                        wn.y += gap;
                    }
                }
            }
        }
    };
    ItemGroundCtrl.prototype.showIvy = function () {
        var _this = this;
        if (!this.ivyCtrl) {
            this.elementSprite.node.active = true;
            var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.ShuiCao, this.Ivy);
            this.ivyCtrl = node.getComponent(SpinePlayerCtrl_1.default);
            if (this.model.zIndex == -1) {
                node.parent = this._downLayer;
                node.zIndex = 3;
                node.setPosition(this.model.getPosition());
            }
            else {
                node.parent = this.elementSprite.node;
                node.setPosition(0, 0);
            }
            this.ivyCtrl.play(ShuiCaoIdleAniName[this.model.getLv() - 1], 0, true);
            node.y -= Common_1.default.GRID_H / 2 - 10;
        }
        else {
            this.ivyCtrl.play(ShuiCaoHitAni[this.showLv - 1], 0, false, function () {
                if (_this.model.getLv() != 0) {
                    _this.ivyCtrl.play(ShuiCaoIdleAniName[_this.model.getLv() - 1], 0, true);
                }
                else {
                    M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.ShuiCao, _this.ivyCtrl.node);
                }
            });
        }
        this.showLv = this.model.getLv();
    };
    ItemGroundCtrl.prototype.addBorder = function (border) {
        this.elementSprite.node.active = true;
        border.parent = this.elementSprite.node;
    };
    ItemGroundCtrl.prototype.cleanOtherDisplay = function () {
        this.buriedSprite.spriteFrame = null;
        this.buriedSprite.node.active = false;
    };
    ItemGroundCtrl.prototype.addLotusleaf = function () {
        this.elementSprite.node.active = true;
        var node = cc.instantiate(this.elementSprite.node);
        node.name = 'Lotusleaf';
        node.parent = this.elementSprite.node;
        node.getComponent(cc.Sprite).spriteFrame = this.LotusleafFrame;
    };
    /**有可能是性能热点.....待优化.. */
    ItemGroundCtrl.prototype.playAnimation = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var score = Common_1.default.getSpecialAddScoreByType(_this.model.getType());
            var wpos = Common_1.default.convertCurWorldPos(_this.model.getPosition());
            M_1.default.event.send(Event_1.Event.Effect.Broken, wpos, null, _this.model.getType());
            if (score) {
                M_1.default.event.send(Event_1.Event.UI.AddScore, score, wpos);
            }
            _this.scheduleOnce(resolve, TimeConfig_1.GapTime.DelayChangeBroken);
        });
    };
    ItemGroundCtrl.prototype.showLeaves = function () {
        this.elementSprite.node.active = true;
        this.elementSprite.spriteFrame = ResCtrl_1.default.ins.getLeavesFrame(this.model.getLv() - 1);
        this.showLv = this.model.getLv();
    };
    ItemGroundCtrl.prototype.update = function (dt) {
        if (this.model) {
            this.updateView();
        }
    };
    __decorate([
        property(cc.Sprite)
    ], ItemGroundCtrl.prototype, "elementSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], ItemGroundCtrl.prototype, "buriedSprite", void 0);
    __decorate([
        property(cc.Prefab)
    ], ItemGroundCtrl.prototype, "WallPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], ItemGroundCtrl.prototype, "tuitujiPrefab", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ItemGroundCtrl.prototype, "LotusleafFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ItemGroundCtrl.prototype, "girlRoadFrame", void 0);
    __decorate([
        property(cc.Prefab)
    ], ItemGroundCtrl.prototype, "Ivy", void 0);
    __decorate([
        property(cc.Prefab)
    ], ItemGroundCtrl.prototype, "exitPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], ItemGroundCtrl.prototype, "shanhuAni", void 0);
    ItemGroundCtrl = __decorate([
        ccclass
    ], ItemGroundCtrl);
    return ItemGroundCtrl;
}(BaseItemView_1.default));
exports.default = ItemGroundCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxJdGVtR3JvdW5kQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwrQ0FBMEM7QUFDMUMsNkNBQXdDO0FBQ3hDLHNEQUE4RTtBQUM5RSxpRkFBNEU7QUFDNUUsZ0RBQStDO0FBQy9DLDBEQUFzRDtBQUN0RCxzQ0FBaUM7QUFDakMsOENBQXlDO0FBQ3pDLDBDQUFxQztBQUkvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFNLGtCQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3BELElBQU0sYUFBYSxHQUFHLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBR3REO0lBQTRDLGtDQUE2QjtJQUF6RTtRQUFBLHFFQXFSQztRQWxSRyxtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsbUJBQWEsR0FBbUIsSUFBSSxDQUFDO1FBR3JDLFNBQUcsR0FBYyxJQUFJLENBQUM7UUFHdEIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZUFBUyxHQUFjLElBQUksQ0FBQztRQUVwQixhQUFPLEdBQW9CLElBQUksQ0FBQztRQUVoQyxZQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFcEIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0Isa0JBQVksR0FBWSxJQUFJLENBQUE7UUFFN0IscUJBQWUsR0FBWSxJQUFJLENBQUE7O0lBZ1AxQyxDQUFDO0lBN09HLCtCQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsOEJBQUss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REMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNTO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzswREFDYTtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3lEQUNZO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ0U7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNRO0lBM0JYLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FxUmxDO0lBQUQscUJBQUM7Q0FyUkQsQUFxUkMsQ0FyUjJDLHNCQUFZLEdBcVJ2RDtrQkFyUm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR3JvdW5kQ2VsbE1vZGVsIGZyb20gXCIuLi9Nb2RlbC9Hcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCBCYXNlSXRlbVZpZXcgZnJvbSBcIi4vQmFzZUl0ZW1WaWV3XCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IE5vZGVQb29sS2V5LCBDZWxsVHlwZSwgR3JvdW5kVHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgU3BpbmVQbGF5ZXJDdHJsIGZyb20gXCIuLi8uLi8uLi9CYXNlL0N1c3RvbUNvbXBvbmVudC9TcGluZVBsYXllckN0cmxcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IEdhcFRpbWUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9UaW1lQ29uZmlnXCI7XG5pbXBvcnQgUmVzQ3RybCBmcm9tIFwiLi4vUmVzQ3RybFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IFR1aXR1amkgZnJvbSBcIi4vQ29tcC9UdWl0dWppXCI7XG5pbXBvcnQgR2FtZU1vZGVsIGZyb20gXCIuLi9Nb2RlbC9HYW1lTW9kZWxcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuY29uc3QgU2h1aUNhb0lkbGVBbmlOYW1lID0gWydzaHVpY2FvXzInLCAnc2h1aWNhbyddO1xuY29uc3QgU2h1aUNhb0hpdEFuaSA9IFsnc2h1aWNhb19oaXQyJywgJ3NodWljYW9faGl0J107XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtR3JvdW5kQ3RybCBleHRlbmRzIEJhc2VJdGVtVmlldzxHcm91bmRDZWxsTW9kZWw+IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgZWxlbWVudFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgYnVyaWVkU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBXYWxsUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0dWl0dWppUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIExvdHVzbGVhZkZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgZ2lybFJvYWRGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBJdnk6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGV4aXRQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHNoYW5odUFuaTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXZ5Q3RybDogU3BpbmVQbGF5ZXJDdHJsID0gbnVsbDtcblxuICAgIHByaXZhdGUgc2hvd0x2OiBudW1iZXIgPSAtMTtcblxuICAgIHByaXZhdGUgX2Rvd25MYXllcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIF90dWl0dWppQ3RybDogVHVpdHVqaSA9IG51bGxcblxuICAgIHB1YmxpYyBjb21wbGV4Vmlld05vZGU6IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQobW9kZWw6IEdyb3VuZENlbGxNb2RlbCwgZG93bkxheWVyPzogY2MuTm9kZSkge1xuICAgICAgICBzdXBlci5pbml0KG1vZGVsKTtcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9kb3duTGF5ZXIgPSBkb3duTGF5ZXI7XG4gICAgICAgICAgICB0aGlzLmNsZWFuRGlzcGxheSgpO1xuICAgICAgICAgICAgdGhpcy5idXJpZWRTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihtb2RlbC5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1BsdWcoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0V4aXQoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1dhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhbkRpc3BsYXkoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuZGVzdHJveUFsbENoaWxkcmVuKCk7XG4gICAgfVxuXG5cbiAgICAvL+aSreaUvuePiueRmuWKqOeUu++8jOmUgOavgVwiXG4gICAgcHVibGljIFBsYXlTaGFuaHVBbmltKCkge1xuXG4gICAgICAgIGlmICgodGhpcy5tb2RlbC5nZXRUeXBlKCkgPT0gR3JvdW5kVHlwZS5NdXNocm9vbSkpIHtcbiAgICAgICAgICAgIC8vY2MubG9nKFwi5pKt5pS+54+K55Ga5Yqo55S7XCIpO1xuXG4gICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LlNoYW5odUFuaW0sIHRoaXMuc2hhbmh1QW5pKTtcbiAgICAgICAgICAgIHZhciBfYW5pbWF0aW9uID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5lbGVtZW50U3ByaXRlLm5vZGU7XG4gICAgICAgICAgICAvL25vZGUuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgICAgICAgICBfYW5pbWF0aW9uLnBsYXkoXCJzaGFuaHVGWFwiKTtcblxuICAgICAgICAgICAgLy/lm57mlLZcbiAgICAgICAgICAgIGNvbnN0IGExID0gY2MuZGVsYXlUaW1lKDEuMik7XG4gICAgICAgICAgICB2YXIgYTIgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5TaGFuaHVBbmltLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMSwgYTIpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dMdiAhPSB0aGlzLm1vZGVsLmdldEx2KCkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5tb2RlbC5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEdyb3VuZFR5cGUuV2F0ZXI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3JvdW5kVHlwZS5MZWF2ZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xlYXZlcygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEdyb3VuZFR5cGUuSXZ5OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dJdnkoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBHcm91bmRUeXBlLkZsb3dlcjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxvd2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3JvdW5kVHlwZS5GaXJlZmx5OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGaXJlZmx5KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3JvdW5kVHlwZS5UdWl0dWppOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUdWl0dWppKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3JvdW5kVHlwZS5NdXNocm9vbTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TXVzaHJvb20oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBHcm91bmRUeXBlLk5vbmU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93RXhpdCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuaXNFeGl0KSB7XG4gICAgICAgICAgICBjb25zdCBleGl0Tm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLmV4aXRQcmVmYWIpO1xuICAgICAgICAgICAgZXhpdE5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dQbHVnKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbC5pc0dpcmxSb2FkKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVbJ2Jhc2VTcHJpdGUnXS5zcHJpdGVGcmFtZSA9IHRoaXMuZ2lybFJvYWRGcmFtZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGVsLmlzQ29udmV5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTG90dXNsZWFmKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlVHVpdHVqaVBvd2VyKCkge1xuICAgICAgICBpZiAodGhpcy5fdHVpdHVqaUN0cmwpIHtcbiAgICAgICAgICAgIHRoaXMuX3R1aXR1amlDdHJsLmNvbGxlY3RJdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZU11c2hyb29tKCkge1xuICAgICAgICAvL+aSreaUvuWKqOeUu+WSryFcbiAgICAgICAgdGhpcy5jbGVhbkRpc3BsYXkoKTtcbiAgICAgICAgLy8gY2MubG9nKFwi5pKt5pS+54+K55Ga5Yqo55S777yM6ZSA5q+BXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd011c2hyb29tKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUuc3ByaXRlRnJhbWUgPSBSZXNDdHJsLmlucy5nZXRNdXNocm9vbUZyYW1lKHRoaXMubW9kZWwuZ2V0THYoKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLnNldFNjYWxlKDkwIC8gdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUud2lkdGgpO1xuICAgICAgICB0aGlzLnNob3dMdiA9IHRoaXMubW9kZWwuZ2V0THYoKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbC5nZXRMdigpID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuUGxheVNoYW5odUFuaW0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd1R1aXR1amkoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnR1aXR1amlQcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlO1xuICAgICAgICB0aGlzLl90dWl0dWppQ3RybCA9IG5vZGUuZ2V0Q29tcG9uZW50KFR1aXR1amkpXG4gICAgICAgIHRoaXMuX3R1aXR1amlDdHJsLmluaXQodGhpcy5tb2RlbC50dWl0dWppQ2ZnKTtcbiAgICAgICAgdGhpcy5zaG93THYgPSB0aGlzLm1vZGVsLmdldEx2KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93RmlyZWZseSgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLnNwcml0ZUZyYW1lID0gUmVzQ3RybC5pbnMuZ2V0RmlyZWZseSh0aGlzLm1vZGVsLmdldEx2KCkgLSAxKTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuc2V0U2NhbGUoODYgLyB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS53aWR0aCk7XG4gICAgICAgIHRoaXMuc2hvd0x2ID0gdGhpcy5tb2RlbC5nZXRMdigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0Zsb3dlcigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLlRSSU1NRUQ7XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5zcHJpdGVGcmFtZSA9IFJlc0N0cmwuaW5zLmdldEZsb3dlckZyYW1lKHRoaXMubW9kZWwuZ2V0THYoKSAtIDEpO1xuICAgICAgICB0aGlzLnNob3dMdiA9IHRoaXMubW9kZWwuZ2V0THYoKTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0x2IDw9IDApIHtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELkNoYW5nZUNlbGwsIENlbGxUeXBlLkZsb3dlciwgNCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zZXRMdih0aGlzLm1vZGVsLmdyaWREYXRhLmZsb3dlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93V2FsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5XYWxsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm1vZGVsLldhbGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhbmdsZSA9IHRoaXMubW9kZWwuV2FsbFtrZXldXG4gICAgICAgICAgICAgICAgaWYgKGFuZ2xlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3biA9IGNjLmluc3RhbnRpYXRlKHRoaXMuV2FsbFByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgIHduLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgd24uYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdhcCA9IGFuZ2xlIDwgOTAgPyA3IDogLTc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhhbmdsZSkgLyA5MCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3bi54ICs9IGdhcDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHduLnkgKz0gZ2FwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93SXZ5KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXZ5Q3RybCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuU2h1aUNhbywgdGhpcy5JdnkpO1xuICAgICAgICAgICAgdGhpcy5pdnlDdHJsID0gbm9kZS5nZXRDb21wb25lbnQoU3BpbmVQbGF5ZXJDdHJsKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLnpJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5fZG93bkxheWVyXG4gICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSAzO1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24odGhpcy5tb2RlbC5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZTtcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pdnlDdHJsLnBsYXkoU2h1aUNhb0lkbGVBbmlOYW1lW3RoaXMubW9kZWwuZ2V0THYoKSAtIDFdLCAwLCB0cnVlKTtcbiAgICAgICAgICAgIG5vZGUueSAtPSBDb21tb24uR1JJRF9IIC8gMiAtIDEwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pdnlDdHJsLnBsYXkoU2h1aUNhb0hpdEFuaVt0aGlzLnNob3dMdiAtIDFdLCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmdldEx2KCkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml2eUN0cmwucGxheShTaHVpQ2FvSWRsZUFuaU5hbWVbdGhpcy5tb2RlbC5nZXRMdigpIC0gMV0sIDAsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuU2h1aUNhbywgdGhpcy5pdnlDdHJsLm5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0x2ID0gdGhpcy5tb2RlbC5nZXRMdigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRCb3JkZXIoYm9yZGVyOiBjYy5Ob2RlKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGJvcmRlci5wYXJlbnQgPSB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYW5PdGhlckRpc3BsYXkoKSB7XG4gICAgICAgIHRoaXMuYnVyaWVkU3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5idXJpZWRTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZExvdHVzbGVhZigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlKTtcbiAgICAgICAgbm9kZS5uYW1lID0gJ0xvdHVzbGVhZic7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5lbGVtZW50U3ByaXRlLm5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLkxvdHVzbGVhZkZyYW1lO1xuICAgIH1cblxuICAgIC8qKuacieWPr+iDveaYr+aAp+iDveeDreeCuS4uLi4u5b6F5LyY5YyWLi4gKi9cbiAgICBwdWJsaWMgcGxheUFuaW1hdGlvbigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gQ29tbW9uLmdldFNwZWNpYWxBZGRTY29yZUJ5VHlwZSh0aGlzLm1vZGVsLmdldFR5cGUoKSk7XG4gICAgICAgICAgICBjb25zdCB3cG9zID0gQ29tbW9uLmNvbnZlcnRDdXJXb3JsZFBvcyh0aGlzLm1vZGVsLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5Ccm9rZW4sIHdwb3MsIG51bGwsIHRoaXMubW9kZWwuZ2V0VHlwZSgpKTtcbiAgICAgICAgICAgIGlmIChzY29yZSkge1xuICAgICAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5BZGRTY29yZSwgc2NvcmUsIHdwb3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShyZXNvbHZlLCBHYXBUaW1lLkRlbGF5Q2hhbmdlQnJva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93TGVhdmVzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUuc3ByaXRlRnJhbWUgPSBSZXNDdHJsLmlucy5nZXRMZWF2ZXNGcmFtZSh0aGlzLm1vZGVsLmdldEx2KCkgLSAxKTtcbiAgICAgICAgdGhpcy5zaG93THYgPSB0aGlzLm1vZGVsLmdldEx2KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==