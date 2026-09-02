"use strict";
cc._RF.push(module, '67adbiMeRZMFZWjsInFMQV8', 'ItemUpgroundCtrl');
// Script/Logic/Match3/View/ItemUpgroundCtrl.ts

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
var Event_1 = require("../../Data/Const/Event");
var Common_1 = require("../../Common/Common");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var Constant_1 = require("../../Data/Const/Constant");
var ResCtrl_1 = require("../ResCtrl");
var Match3Skin_1 = require("../Skin/Match3Skin");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ItemUpgroundCtrl = /** @class */ (function (_super) {
    __extends(ItemUpgroundCtrl, _super);
    function ItemUpgroundCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ice = null;
        _this.lock = null;
        _this.box = null;
        _this.n_conchItem = null;
        _this.n_grassItem = null;
        _this.curShowType = -1;
        _this.curShowLv = -1;
        return _this;
    }
    ItemUpgroundCtrl.prototype.onLoad = function () {
    };
    ItemUpgroundCtrl.prototype.start = function () {
    };
    ItemUpgroundCtrl.prototype.onDestroy = function () {
        this.unscheduleAllCallbacks();
        // M.event.unRegister(Event.Model.CheckGameOver, this.execNov, this);
    };
    ItemUpgroundCtrl.prototype.registerEvent = function () {
        // if (this.model && this.model.isNov) {
        // M.event.register(Event.Model.CheckGameOver, this.execNov, this);
        // }
    };
    ItemUpgroundCtrl.prototype.init = function (model) {
        var _this = this;
        _super.prototype.init.call(this, model);
        if (model) {
            if (model.isHavaSpe) {
                this.node.scale = 1;
                this.node.angle = 0;
                //初始化所有特殊元素显示
                var specials = model.getSpecials();
                specials.forEach(function (spe) {
                    _this.showItem(spe.type, spe.lv);
                });
            }
            // this.syncPortal();
            this.node.setPosition(model.getPosition());
        }
        this.registerEvent();
    };
    ItemUpgroundCtrl.prototype.setBox = function (lv) {
        this.setFrame(this.box, ResCtrl_1.default.ins.getBoxFrame(lv - 1, this.model.boxType));
    };
    ItemUpgroundCtrl.prototype.setStone = function (lv) {
        this.box.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        this.setFrame(this.box, ResCtrl_1.default.ins.getStoneFrame(lv - 1));
    };
    ItemUpgroundCtrl.prototype.setIce = function (lv) {
        this.setFrame(this.ice, ResCtrl_1.default.ins.getIceFrame(lv - 1));
    };
    ItemUpgroundCtrl.prototype.setLock = function (lv) {
        this.setFrame(this.lock, ResCtrl_1.default.ins.getLockFrame(lv - 1));
    };
    ItemUpgroundCtrl.prototype.setFrame = function (target, frame) {
        if (!target)
            return;
        // target.node.scale = 1;
        target.node.setScale(90 / target.node.width);
        target.node.setPosition(0, 0);
        target.node.setAnchorPoint(cc.v2(0.5, 0.5));
        if (frame) {
            target.node.active = true;
            target.spriteFrame = frame;
        }
        else {
            target.node.active = false;
        }
    };
    ItemUpgroundCtrl.prototype.syncShowData = function () {
        this.curShowLv = this.model.getLv();
        this.curShowType = this.model.getType();
    };
    ItemUpgroundCtrl.prototype.showItem = function (type, lv) {
        switch (type) {
            case Constant_1.UpGroundType.Box:
                this.setBox(lv);
                break;
            case Constant_1.UpGroundType.Ice:
                this.setIce(lv);
                break;
            case Constant_1.UpGroundType.Lock:
                this.setLock(lv);
                break;
            case Constant_1.UpGroundType.Stone:
                this.setStone(lv);
                break;
            case Constant_1.UpGroundType.Nov_grass:
                this.showCloseGrass();
                break;
            case Constant_1.UpGroundType.Nov_conch:
                this.showConchNov(type);
                break;
            case Constant_1.UpGroundType.None:
                var names = [, 'box', 'lock', 'ice'];
                this.setFrame(this[names[this.curShowType]], null);
                break;
        }
        this.syncShowData();
    };
    ItemUpgroundCtrl.prototype.hideConchNov = function () {
        this.box.node.destroyAllChildren();
        this.box.spriteFrame = null;
    };
    ItemUpgroundCtrl.prototype.showCloseGrass = function () {
        var novicePrefab = Match3Skin_1.default.getPrefabList("novice")[0];
        if (novicePrefab) {
            this.n_grassItem = Common_1.default.createSpineNode(this.box.node, novicePrefab);
        }
    };
    ItemUpgroundCtrl.prototype.showConchNov = function (type) {
        // if (this.model.getLv() > 0) {
        //     this.box.node.scale = 1.85;
        //     this.box.node.setAnchorPoint(cc.v2(0, 0));
        //     this.box.node.setPosition(this.box.node.position.add(cc.v3(Common.GRID_W / 2, Common.GRID_H / 2)));
        //     this.n_conchItem.node.color = cc.Color.GRAY;
        //     this.scheduleOnce(() => {
        //         this.n_conchItem.ctrl.play('beike_xiuxian_heibai', 0, true);
        //     }, 0);
        //     this.scheduleOnce(() => {
        //         const rect = this.box.node.getBoundingBoxToWorld();
        //         GameModel.ins.CollectPos = cc.v2(rect.x + 84, rect.y + 84);
        //     }, 1);
        // }
    };
    ItemUpgroundCtrl.prototype.updateShowSp = function () {
        if (this.curShowType != this.model.getType() || this.curShowLv != this.model.getLv()) {
            if (this.curShowType != this.model.getType()) {
                this.box.node.active = false;
                this.ice.node.active = false;
                this.lock.node.active = false;
            }
            this.showItem(this.model.getType(), this.model.getLv());
        }
    };
    ItemUpgroundCtrl.prototype.updateBindCellPos = function () {
        // 这里如果有传送阵或者其他的上层障碍物...会被冰块带着跑路.
        if (this.model.isFollowNode && this.model.BindCell && this.model.BindCell.extData) {
            this.node.setPosition(this.model.BindCell.extData.getPosition());
        }
    };
    /**有可能是性能热点.....待优化.. */
    ItemUpgroundCtrl.prototype.playAnimation = function (type) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.model && _this.model.isHavaSpe) {
                //执行动画!   
                var worldPos = Common_1.default.convertCurWorldPos(_this.model.getPosition());
                var name = null;
                if (type == Constant_1.UpGroundType.Box) {
                    if (_this.model.getType() != 0) {
                        name = "box" + _this.model.getLv() + "to" + (_this.model.getLv() - 1);
                    }
                    resolve();
                }
                else {
                    _this.scheduleOnce(resolve, TimeConfig_1.GapTime.DelayChangeBroken);
                }
                M_1.default.event.send(Event_1.Event.Effect.Broken, worldPos, null, type, name);
                var score = Common_1.default.getSpecialAddScoreByType(_this.model.getType());
                if (score) {
                    M_1.default.event.send(Event_1.Event.UI.AddScore, score, worldPos);
                }
            }
            else {
                resolve(true);
            }
        });
    };
    // private execNov(callback) {
    //     if (this.model) {
    //         if (this.model.getType() == UpGroundType.Nov_grass) {
    //             if (this.n_grassItem) {
    //                 this.n_grassItem.node.runAction(cc.fadeOut(1));
    //                 this.scheduleOnce(() => {
    //                     this.playAnimation().then(() => {
    //                         this.model.forcedElimateNov();
    //                         callback();
    //                     });
    //                 }, 1)
    //             }
    //         } else if (this.model.getType() == UpGroundType.Nov_conch) {
    //             if (this.n_conchItem) {
    //                 const a0 = cc.delayTime(0.3);
    //                 const a1 = cc.tintTo(0.5, 255, 255, 255);
    //                 const a2 = cc.callFunc(() => {
    //                     const b0 = cc.scaleTo(0.3, 1);
    //                     const b1 = cc.fadeOut(0.3);
    //                     const b2 = cc.callFunc(() => {
    //                         const bombCell = GameModel.ins.createCell({ cfg: { type: CellType.Bomb1 }, pos: this.model.pos, createType: CreateType.Nov });
    //                         bombCell.isExecBomb = true;
    //                         bombCell.extData.setPosition(bombCell.extData.position.add(cc.v3(Common.GRID_W / 2, Common.GRID_H / 2)))
    //                         this.hideConchNov();
    //                     }, this)
    //                     const b3 = cc.delayTime(GapTime.BeikeDelaySuction);
    //                     const b4 = cc.callFunc(() => {
    //                         callback();
    //                     })
    //                     this.box.node.runAction(cc.sequence(cc.spawn(b0, b1), b2, b3, b4));
    //                 })
    //                 this.n_conchItem.node.runAction(cc.sequence(a0, a1, a2));
    //             }
    //         } else {
    //             callback();
    //         }
    //     }
    // }
    ItemUpgroundCtrl.prototype.update = function (dt) {
        if (this.model) {
            this.updateShowSp();
            this.updateBindCellPos();
        }
    };
    __decorate([
        property(cc.Sprite)
    ], ItemUpgroundCtrl.prototype, "ice", void 0);
    __decorate([
        property(cc.Sprite)
    ], ItemUpgroundCtrl.prototype, "lock", void 0);
    __decorate([
        property(cc.Sprite)
    ], ItemUpgroundCtrl.prototype, "box", void 0);
    ItemUpgroundCtrl = __decorate([
        ccclass
    ], ItemUpgroundCtrl);
    return ItemUpgroundCtrl;
}(BaseItemView_1.default));
exports.default = ItemUpgroundCtrl;

cc._RF.pop();