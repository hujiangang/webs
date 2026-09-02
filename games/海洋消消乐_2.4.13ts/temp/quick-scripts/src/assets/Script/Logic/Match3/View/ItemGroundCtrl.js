"use strict";
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