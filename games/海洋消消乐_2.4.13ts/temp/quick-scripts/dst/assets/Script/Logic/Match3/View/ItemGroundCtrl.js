
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
var Match3Skin_1 = require("../Skin/Match3Skin");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShuiCaoIdleAniName = ['shuicao_2', 'shuicao'];
var ShuiCaoHitAni = ['shuicao_hit2', 'shuicao_hit'];
var ItemGroundCtrl = /** @class */ (function (_super) {
    __extends(ItemGroundCtrl, _super);
    function ItemGroundCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.elementSprite = null;
        _this.buriedSprite = null;
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
            var node_1 = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.ShanhuAnim, Match3Skin_1.default.requirePrefab("shanhuAni"));
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
            var exitNode = M_1.default.nodePool.createItem(Match3Skin_1.default.requirePrefab("exit"));
            exitNode.parent = this.node;
        }
    };
    ItemGroundCtrl.prototype.showPlug = function () {
        if (this.model.isGirlRoad) {
            this.node['baseSprite'].spriteFrame = Match3Skin_1.default.getGirlRoadFrame();
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
        var node = cc.instantiate(Match3Skin_1.default.requirePrefab("tuituji"));
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
                    var wn = cc.instantiate(Match3Skin_1.default.requirePrefab("wall"));
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
            var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.ShuiCao, Match3Skin_1.default.requirePrefab("ivy"));
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
        node.getComponent(cc.Sprite).spriteFrame = Match3Skin_1.default.getLotusleafFrame();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxJdGVtR3JvdW5kQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwrQ0FBMEM7QUFDMUMsNkNBQXdDO0FBQ3hDLHNEQUE4RTtBQUM5RSxpRkFBNEU7QUFDNUUsZ0RBQStDO0FBQy9DLDBEQUFzRDtBQUN0RCxzQ0FBaUM7QUFDakMsOENBQXlDO0FBQ3pDLDBDQUFxQztBQUVyQyxpREFBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsSUFBTSxrQkFBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNwRCxJQUFNLGFBQWEsR0FBRyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUd0RDtJQUE0QyxrQ0FBNkI7SUFBekU7UUFBQSxxRUFnUUM7UUE3UEcsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFFdkIsYUFBTyxHQUFvQixJQUFJLENBQUM7UUFFaEMsWUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXBCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGtCQUFZLEdBQVksSUFBSSxDQUFBO1FBRTdCLHFCQUFlLEdBQVksSUFBSSxDQUFBOztJQWdQMUMsQ0FBQztJQTdPRywrQkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDhCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRU0sNkJBQUksR0FBWCxVQUFZLEtBQXNCLEVBQUUsU0FBbUI7UUFDbkQsaUJBQU0sSUFBSSxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRU0scUNBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFHRCxZQUFZO0lBQ0wsdUNBQWMsR0FBckI7UUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQy9DLG1CQUFtQjtZQUVuQixJQUFNLE1BQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFBVyxDQUFDLFVBQVUsRUFBRSxvQkFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQy9GLElBQUksVUFBVSxHQUFHLE1BQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pELE1BQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDdEMseUJBQXlCO1lBQ3pCLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFNUIsSUFBSTtZQUNKLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDakIsV0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQVcsQ0FBQyxVQUFVLEVBQUUsTUFBSSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkM7SUFFTCxDQUFDO0lBRU0sbUNBQVUsR0FBakI7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzFCLEtBQUsscUJBQVUsQ0FBQyxLQUFLO29CQUNqQixNQUFNO2dCQUNWLEtBQUsscUJBQVUsQ0FBQyxNQUFNO29CQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLE1BQU07Z0JBQ1YsS0FBSyxxQkFBVSxDQUFDLEdBQUc7b0JBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNmLE1BQU07Z0JBQ1YsS0FBSyxxQkFBVSxDQUFDLE1BQU07b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsTUFBTTtnQkFDVixLQUFLLHFCQUFVLENBQUMsT0FBTztvQkFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixNQUFNO2dCQUNWLEtBQUsscUJBQVUsQ0FBQyxPQUFPO29CQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLE1BQU07Z0JBQ1YsS0FBSyxxQkFBVSxDQUFDLFFBQVE7b0JBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsTUFBTTtnQkFDVixLQUFLLHFCQUFVLENBQUMsSUFBSTtvQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDdkMsTUFBTTthQUNiO1NBQ0o7SUFDTCxDQUFDO0lBRU0saUNBQVEsR0FBZjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDbkIsSUFBTSxRQUFRLEdBQUcsV0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsb0JBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6RSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRU0saUNBQVEsR0FBZjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEdBQUcsb0JBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3ZFO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRU0sMkNBQWtCLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRU0scUNBQVksR0FBbkI7UUFDSSxRQUFRO1FBQ1IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLHVCQUF1QjtJQUMzQixDQUFDO0lBRU8scUNBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRU8sb0NBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVPLG9DQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3hELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVPLG1DQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3pELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbEIsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO0lBQ0wsQ0FBQztJQUVPLGlDQUFRLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQy9CLEtBQUssSUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQy9CLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNsQyxJQUFJLEtBQUssSUFBSSxTQUFTLEVBQUU7b0JBQ3BCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0JBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDNUQsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUN0QixFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDakIsSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO3FCQUNmO3lCQUFNO3dCQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO3FCQUNmO2lCQUNKO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFTyxnQ0FBTyxHQUFmO1FBQUEsaUJBeUJDO1FBeEJHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QyxJQUFNLElBQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFBVyxDQUFDLE9BQU8sRUFBRSxvQkFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBZSxDQUFDLENBQUM7WUFDbEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO2dCQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDMUI7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsQ0FBQyxJQUFJLGdCQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDcEM7YUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7Z0JBQ3hELElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ3pCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMxRTtxQkFBTTtvQkFDSCxXQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBVyxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMvRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLGtDQUFTLEdBQWhCLFVBQWlCLE1BQWU7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQzVDLENBQUM7SUFFTSwwQ0FBaUIsR0FBeEI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUMxQyxDQUFDO0lBRU8scUNBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxvQkFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDOUUsQ0FBQztJQUVELHdCQUF3QjtJQUNqQixzQ0FBYSxHQUFwQjtRQUFBLGlCQVVDO1FBVEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBTSxLQUFLLEdBQUcsZ0JBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDakUsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQy9DO1lBQ0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLG1DQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELCtCQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQTVQRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3lEQUNZO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ1c7SUFOZCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBZ1FsQztJQUFELHFCQUFDO0NBaFFELEFBZ1FDLENBaFEyQyxzQkFBWSxHQWdRdkQ7a0JBaFFvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdyb3VuZENlbGxNb2RlbCBmcm9tIFwiLi4vTW9kZWwvR3JvdW5kQ2VsbE1vZGVsXCI7XG5pbXBvcnQgQmFzZUl0ZW1WaWV3IGZyb20gXCIuL0Jhc2VJdGVtVmlld1wiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBOb2RlUG9vbEtleSwgQ2VsbFR5cGUsIEdyb3VuZFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IFNwaW5lUGxheWVyQ3RybCBmcm9tIFwiLi4vLi4vLi4vQmFzZS9DdXN0b21Db21wb25lbnQvU3BpbmVQbGF5ZXJDdHJsXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgeyBHYXBUaW1lIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvVGltZUNvbmZpZ1wiO1xuaW1wb3J0IFJlc0N0cmwgZnJvbSBcIi4uL1Jlc0N0cmxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBUdWl0dWppIGZyb20gXCIuL0NvbXAvVHVpdHVqaVwiO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi4vTW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgTWF0Y2gzU2tpbiBmcm9tIFwiLi4vU2tpbi9NYXRjaDNTa2luXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbmNvbnN0IFNodWlDYW9JZGxlQW5pTmFtZSA9IFsnc2h1aWNhb18yJywgJ3NodWljYW8nXTtcbmNvbnN0IFNodWlDYW9IaXRBbmkgPSBbJ3NodWljYW9faGl0MicsICdzaHVpY2FvX2hpdCddO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUdyb3VuZEN0cmwgZXh0ZW5kcyBCYXNlSXRlbVZpZXc8R3JvdW5kQ2VsbE1vZGVsPiB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGVsZW1lbnRTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGJ1cmllZFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXZ5Q3RybDogU3BpbmVQbGF5ZXJDdHJsID0gbnVsbDtcblxuICAgIHByaXZhdGUgc2hvd0x2OiBudW1iZXIgPSAtMTtcblxuICAgIHByaXZhdGUgX2Rvd25MYXllcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIF90dWl0dWppQ3RybDogVHVpdHVqaSA9IG51bGxcblxuICAgIHB1YmxpYyBjb21wbGV4Vmlld05vZGU6IGNjLk5vZGUgPSBudWxsXG5cblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQobW9kZWw6IEdyb3VuZENlbGxNb2RlbCwgZG93bkxheWVyPzogY2MuTm9kZSkge1xuICAgICAgICBzdXBlci5pbml0KG1vZGVsKTtcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9kb3duTGF5ZXIgPSBkb3duTGF5ZXI7XG4gICAgICAgICAgICB0aGlzLmNsZWFuRGlzcGxheSgpO1xuICAgICAgICAgICAgdGhpcy5idXJpZWRTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihtb2RlbC5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1BsdWcoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0V4aXQoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1dhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhbkRpc3BsYXkoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuZGVzdHJveUFsbENoaWxkcmVuKCk7XG4gICAgfVxuXG5cbiAgICAvL+aSreaUvuePiueRmuWKqOeUu++8jOmUgOavgVwiXG4gICAgcHVibGljIFBsYXlTaGFuaHVBbmltKCkge1xuXG4gICAgICAgIGlmICgodGhpcy5tb2RlbC5nZXRUeXBlKCkgPT0gR3JvdW5kVHlwZS5NdXNocm9vbSkpIHtcbiAgICAgICAgICAgIC8vY2MubG9nKFwi5pKt5pS+54+K55Ga5Yqo55S7XCIpO1xuXG4gICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LlNoYW5odUFuaW0sIE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcInNoYW5odUFuaVwiKSk7XG4gICAgICAgICAgICB2YXIgX2FuaW1hdGlvbiA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlO1xuICAgICAgICAgICAgLy9ub2RlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICAgICAgX2FuaW1hdGlvbi5wbGF5KFwic2hhbmh1RlhcIik7XG5cbiAgICAgICAgICAgIC8v5Zue5pS2XG4gICAgICAgICAgICBjb25zdCBhMSA9IGNjLmRlbGF5VGltZSgxLjIpO1xuICAgICAgICAgICAgdmFyIGEyID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuU2hhbmh1QW5pbSwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTEsIGEyKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVWaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5zaG93THYgIT0gdGhpcy5tb2RlbC5nZXRMdigpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZWwuZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBHcm91bmRUeXBlLldhdGVyOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEdyb3VuZFR5cGUuTGVhdmVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dMZWF2ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBHcm91bmRUeXBlLkl2eTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93SXZ5KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3JvdW5kVHlwZS5GbG93ZXI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Zsb3dlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEdyb3VuZFR5cGUuRmlyZWZseTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RmlyZWZseSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEdyb3VuZFR5cGUuVHVpdHVqaTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VHVpdHVqaSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEdyb3VuZFR5cGUuTXVzaHJvb206XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd011c2hyb29tKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3JvdW5kVHlwZS5Ob25lOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0V4aXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmlzRXhpdCkge1xuICAgICAgICAgICAgY29uc3QgZXhpdE5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0oTWF0Y2gzU2tpbi5yZXF1aXJlUHJlZmFiKFwiZXhpdFwiKSk7XG4gICAgICAgICAgICBleGl0Tm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd1BsdWcoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmlzR2lybFJvYWQpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZVsnYmFzZVNwcml0ZSddLnNwcml0ZUZyYW1lID0gTWF0Y2gzU2tpbi5nZXRHaXJsUm9hZEZyYW1lKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlbC5pc0NvbnZleWVyKSB7XG4gICAgICAgICAgICB0aGlzLmFkZExvdHVzbGVhZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVR1aXR1amlQb3dlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX3R1aXR1amlDdHJsKSB7XG4gICAgICAgICAgICB0aGlzLl90dWl0dWppQ3RybC5jb2xsZWN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGVNdXNocm9vbSgpIHtcbiAgICAgICAgLy/mkq3mlL7liqjnlLvlkq8hXG4gICAgICAgIHRoaXMuY2xlYW5EaXNwbGF5KCk7XG4gICAgICAgIC8vIGNjLmxvZyhcIuaSreaUvuePiueRmuWKqOeUu++8jOmUgOavgVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dNdXNocm9vbSgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLnNwcml0ZUZyYW1lID0gUmVzQ3RybC5pbnMuZ2V0TXVzaHJvb21GcmFtZSh0aGlzLm1vZGVsLmdldEx2KCkpO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5zZXRTY2FsZSg5MCAvIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLndpZHRoKTtcbiAgICAgICAgdGhpcy5zaG93THYgPSB0aGlzLm1vZGVsLmdldEx2KCk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0THYoKSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLlBsYXlTaGFuaHVBbmltKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dUdWl0dWppKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBjb25zdCBub2RlID0gY2MuaW5zdGFudGlhdGUoTWF0Y2gzU2tpbi5yZXF1aXJlUHJlZmFiKFwidHVpdHVqaVwiKSk7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5lbGVtZW50U3ByaXRlLm5vZGU7XG4gICAgICAgIHRoaXMuX3R1aXR1amlDdHJsID0gbm9kZS5nZXRDb21wb25lbnQoVHVpdHVqaSlcbiAgICAgICAgdGhpcy5fdHVpdHVqaUN0cmwuaW5pdCh0aGlzLm1vZGVsLnR1aXR1amlDZmcpO1xuICAgICAgICB0aGlzLnNob3dMdiA9IHRoaXMubW9kZWwuZ2V0THYoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dGaXJlZmx5KCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUuc3ByaXRlRnJhbWUgPSBSZXNDdHJsLmlucy5nZXRGaXJlZmx5KHRoaXMubW9kZWwuZ2V0THYoKSAtIDEpO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5zZXRTY2FsZSg4NiAvIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLndpZHRoKTtcbiAgICAgICAgdGhpcy5zaG93THYgPSB0aGlzLm1vZGVsLmdldEx2KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93Rmxvd2VyKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuVFJJTU1FRDtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLnNwcml0ZUZyYW1lID0gUmVzQ3RybC5pbnMuZ2V0Rmxvd2VyRnJhbWUodGhpcy5tb2RlbC5nZXRMdigpIC0gMSk7XG4gICAgICAgIHRoaXMuc2hvd0x2ID0gdGhpcy5tb2RlbC5nZXRMdigpO1xuICAgICAgICBpZiAodGhpcy5zaG93THYgPD0gMCkge1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkdhbWVDTUQuQ2hhbmdlQ2VsbCwgQ2VsbFR5cGUuRmxvd2VyLCA0LCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNldEx2KHRoaXMubW9kZWwuZ3JpZERhdGEuZmxvd2Vycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dXYWxsKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLldhbGwpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMubW9kZWwuV2FsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5tb2RlbC5XYWxsW2tleV1cbiAgICAgICAgICAgICAgICBpZiAoYW5nbGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHduID0gY2MuaW5zdGFudGlhdGUoTWF0Y2gzU2tpbi5yZXF1aXJlUHJlZmFiKFwid2FsbFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIHduLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgd24uYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdhcCA9IGFuZ2xlIDwgOTAgPyA3IDogLTc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhhbmdsZSkgLyA5MCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3bi54ICs9IGdhcDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHduLnkgKz0gZ2FwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93SXZ5KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXZ5Q3RybCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuU2h1aUNhbywgTWF0Y2gzU2tpbi5yZXF1aXJlUHJlZmFiKFwiaXZ5XCIpKTtcbiAgICAgICAgICAgIHRoaXMuaXZ5Q3RybCA9IG5vZGUuZ2V0Q29tcG9uZW50KFNwaW5lUGxheWVyQ3RybCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC56SW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuX2Rvd25MYXllclxuICAgICAgICAgICAgICAgIG5vZGUuekluZGV4ID0gMztcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMubW9kZWwuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5lbGVtZW50U3ByaXRlLm5vZGU7XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXZ5Q3RybC5wbGF5KFNodWlDYW9JZGxlQW5pTmFtZVt0aGlzLm1vZGVsLmdldEx2KCkgLSAxXSwgMCwgdHJ1ZSk7XG4gICAgICAgICAgICBub2RlLnkgLT0gQ29tbW9uLkdSSURfSCAvIDIgLSAxMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXZ5Q3RybC5wbGF5KFNodWlDYW9IaXRBbmlbdGhpcy5zaG93THYgLSAxXSwgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5nZXRMdigpICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdnlDdHJsLnBsYXkoU2h1aUNhb0lkbGVBbmlOYW1lW3RoaXMubW9kZWwuZ2V0THYoKSAtIDFdLCAwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LlNodWlDYW8sIHRoaXMuaXZ5Q3RybC5ub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dMdiA9IHRoaXMubW9kZWwuZ2V0THYoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQm9yZGVyKGJvcmRlcjogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBib3JkZXIucGFyZW50ID0gdGhpcy5lbGVtZW50U3ByaXRlLm5vZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFuT3RoZXJEaXNwbGF5KCkge1xuICAgICAgICB0aGlzLmJ1cmllZFNwcml0ZS5zcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYnVyaWVkU3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRMb3R1c2xlYWYoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVsZW1lbnRTcHJpdGUubm9kZSk7XG4gICAgICAgIG5vZGUubmFtZSA9ICdMb3R1c2xlYWYnO1xuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuZWxlbWVudFNwcml0ZS5ub2RlO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gTWF0Y2gzU2tpbi5nZXRMb3R1c2xlYWZGcmFtZSgpO1xuICAgIH1cblxuICAgIC8qKuacieWPr+iDveaYr+aAp+iDveeDreeCuS4uLi4u5b6F5LyY5YyWLi4gKi9cbiAgICBwdWJsaWMgcGxheUFuaW1hdGlvbigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gQ29tbW9uLmdldFNwZWNpYWxBZGRTY29yZUJ5VHlwZSh0aGlzLm1vZGVsLmdldFR5cGUoKSk7XG4gICAgICAgICAgICBjb25zdCB3cG9zID0gQ29tbW9uLmNvbnZlcnRDdXJXb3JsZFBvcyh0aGlzLm1vZGVsLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5Ccm9rZW4sIHdwb3MsIG51bGwsIHRoaXMubW9kZWwuZ2V0VHlwZSgpKTtcbiAgICAgICAgICAgIGlmIChzY29yZSkge1xuICAgICAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5BZGRTY29yZSwgc2NvcmUsIHdwb3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShyZXNvbHZlLCBHYXBUaW1lLkRlbGF5Q2hhbmdlQnJva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93TGVhdmVzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVsZW1lbnRTcHJpdGUuc3ByaXRlRnJhbWUgPSBSZXNDdHJsLmlucy5nZXRMZWF2ZXNGcmFtZSh0aGlzLm1vZGVsLmdldEx2KCkgLSAxKTtcbiAgICAgICAgdGhpcy5zaG93THYgPSB0aGlzLm1vZGVsLmdldEx2KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==