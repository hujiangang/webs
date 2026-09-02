
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/ItemUpgroundCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxJdGVtVXBncm91bmRDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLCtDQUEwQztBQUMxQyw2Q0FBd0M7QUFDeEMsZ0RBQStDO0FBQy9DLDhDQUF5QztBQUN6QywwREFBc0Q7QUFFdEQsc0RBQXlEO0FBQ3pELHNDQUFpQztBQUNqQyxpREFBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQStCO0lBQTdFO1FBQUEscUVBNE9DO1FBek9HLFNBQUcsR0FBYyxJQUFJLENBQUM7UUFHdEIsVUFBSSxHQUFjLElBQUksQ0FBQztRQUd2QixTQUFHLEdBQWMsSUFBSSxDQUFDO1FBRWQsaUJBQVcsR0FBNkMsSUFBSSxDQUFDO1FBQzdELGlCQUFXLEdBQTZDLElBQUksQ0FBQztRQUU3RCxpQkFBVyxHQUFpQixDQUFDLENBQUMsQ0FBQztRQUMvQixlQUFTLEdBQVcsQ0FBQyxDQUFDLENBQUM7O0lBNk5uQyxDQUFDO0lBM05HLGlDQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsZ0NBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIscUVBQXFFO0lBQ3pFLENBQUM7SUFFTyx3Q0FBYSxHQUFyQjtRQUNJLHdDQUF3QztRQUN4QyxtRUFBbUU7UUFDbkUsSUFBSTtJQUNSLENBQUM7SUFFTSwrQkFBSSxHQUFYLFVBQVksS0FBd0I7UUFBcEMsaUJBZ0JDO1FBZkcsaUJBQU0sSUFBSSxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxD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USxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ0U7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDRztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNFO0lBVEwsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0E0T3BDO0lBQUQsdUJBQUM7Q0E1T0QsQUE0T0MsQ0E1TzZDLHNCQUFZLEdBNE96RDtrQkE1T29CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVcEdyb3VuZENlbGxNb2RlbCBmcm9tIFwiLi4vTW9kZWwvVXBHcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCBTcGVjaWFsQ2VsbCBmcm9tIFwiLi4vTW9kZWwvU3BlY2lhbENlbGxcIjtcbmltcG9ydCBCYXNlSXRlbVZpZXcgZnJvbSBcIi4vQmFzZUl0ZW1WaWV3XCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCB7IEdhcFRpbWUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9UaW1lQ29uZmlnXCI7XG5pbXBvcnQgU3BpbmVQbGF5ZXJDdHJsIGZyb20gXCIuLi8uLi8uLi9CYXNlL0N1c3RvbUNvbXBvbmVudC9TcGluZVBsYXllckN0cmxcIjtcbmltcG9ydCB7IFVwR3JvdW5kVHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgUmVzQ3RybCBmcm9tIFwiLi4vUmVzQ3RybFwiO1xuaW1wb3J0IE1hdGNoM1NraW4gZnJvbSBcIi4uL1NraW4vTWF0Y2gzU2tpblwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVVwZ3JvdW5kQ3RybCBleHRlbmRzIEJhc2VJdGVtVmlldzxVcEdyb3VuZENlbGxNb2RlbD4ge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY2U6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGxvY2s6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGJveDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIHByaXZhdGUgbl9jb25jaEl0ZW06IHsgbm9kZTogY2MuTm9kZSwgY3RybDogU3BpbmVQbGF5ZXJDdHJsIH0gPSBudWxsO1xuICAgIHByaXZhdGUgbl9ncmFzc0l0ZW06IHsgbm9kZTogY2MuTm9kZSwgY3RybDogU3BpbmVQbGF5ZXJDdHJsIH0gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjdXJTaG93VHlwZTogVXBHcm91bmRUeXBlID0gLTE7XG4gICAgcHJpdmF0ZSBjdXJTaG93THY6IG51bWJlciA9IC0xO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAvLyBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuTW9kZWwuQ2hlY2tHYW1lT3ZlciwgdGhpcy5leGVjTm92LCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnQoKSB7XG4gICAgICAgIC8vIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaXNOb3YpIHtcbiAgICAgICAgLy8gTS5ldmVudC5yZWdpc3RlcihFdmVudC5Nb2RlbC5DaGVja0dhbWVPdmVyLCB0aGlzLmV4ZWNOb3YsIHRoaXMpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQobW9kZWw6IFVwR3JvdW5kQ2VsbE1vZGVsKSB7XG4gICAgICAgIHN1cGVyLmluaXQobW9kZWwpO1xuICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbC5pc0hhdmFTcGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgLy/liJ3lp4vljJbmiYDmnInnibnmrorlhYPntKDmmL7npLpcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVjaWFscyA9IG1vZGVsLmdldFNwZWNpYWxzKCk7XG4gICAgICAgICAgICAgICAgc3BlY2lhbHMuZm9yRWFjaCgoc3BlOiBTcGVjaWFsQ2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dJdGVtKHNwZS50eXBlLCBzcGUubHYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhpcy5zeW5jUG9ydGFsKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obW9kZWwuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRCb3gobHY6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEZyYW1lKHRoaXMuYm94LCBSZXNDdHJsLmlucy5nZXRCb3hGcmFtZShsdiAtIDEsIHRoaXMubW9kZWwuYm94VHlwZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3RvbmUobHY6IG51bWJlcikge1xuICAgICAgICB0aGlzLmJveC5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5UUklNTUVEO1xuICAgICAgICB0aGlzLnNldEZyYW1lKHRoaXMuYm94LCBSZXNDdHJsLmlucy5nZXRTdG9uZUZyYW1lKGx2IC0gMSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SWNlKGx2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRGcmFtZSh0aGlzLmljZSwgUmVzQ3RybC5pbnMuZ2V0SWNlRnJhbWUobHYgLSAxKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRMb2NrKGx2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRGcmFtZSh0aGlzLmxvY2ssIFJlc0N0cmwuaW5zLmdldExvY2tGcmFtZShsdiAtIDEpKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgc2V0RnJhbWUodGFyZ2V0OiBjYy5TcHJpdGUsIGZyYW1lOiBjYy5TcHJpdGVGcmFtZSkge1xuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgICAvLyB0YXJnZXQubm9kZS5zY2FsZSA9IDE7XG4gICAgICAgIHRhcmdldC5ub2RlLnNldFNjYWxlKDkwIC8gdGFyZ2V0Lm5vZGUud2lkdGgpO1xuICAgICAgICB0YXJnZXQubm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgdGFyZ2V0Lm5vZGUuc2V0QW5jaG9yUG9pbnQoY2MudjIoMC41LCAwLjUpKVxuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgIHRhcmdldC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0YXJnZXQuc3ByaXRlRnJhbWUgPSBmcmFtZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN5bmNTaG93RGF0YSgpIHtcbiAgICAgICAgdGhpcy5jdXJTaG93THYgPSB0aGlzLm1vZGVsLmdldEx2KCk7XG4gICAgICAgIHRoaXMuY3VyU2hvd1R5cGUgPSB0aGlzLm1vZGVsLmdldFR5cGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dJdGVtKHR5cGU6IFVwR3JvdW5kVHlwZSwgbHY6IG51bWJlcikge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVXBHcm91bmRUeXBlLkJveDpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJveChsdik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVwR3JvdW5kVHlwZS5JY2U6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJY2UobHYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVcEdyb3VuZFR5cGUuTG9jazpcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvY2sobHYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVcEdyb3VuZFR5cGUuU3RvbmU6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdG9uZShsdik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVwR3JvdW5kVHlwZS5Ob3ZfZ3Jhc3M6XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q2xvc2VHcmFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVcEdyb3VuZFR5cGUuTm92X2NvbmNoOlxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvbmNoTm92KHR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVcEdyb3VuZFR5cGUuTm9uZTpcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lcyA9IFssICdib3gnLCAnbG9jaycsICdpY2UnXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZyYW1lKHRoaXNbbmFtZXNbdGhpcy5jdXJTaG93VHlwZV1dLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY1Nob3dEYXRhKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGVDb25jaE5vdigpIHtcbiAgICAgICAgdGhpcy5ib3gubm9kZS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5ib3guc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0Nsb3NlR3Jhc3MoKSB7XG4gICAgICAgIGNvbnN0IG5vdmljZVByZWZhYiA9IE1hdGNoM1NraW4uZ2V0UHJlZmFiTGlzdChcIm5vdmljZVwiKVswXTtcbiAgICAgICAgaWYgKG5vdmljZVByZWZhYikge1xuICAgICAgICAgICAgdGhpcy5uX2dyYXNzSXRlbSA9IENvbW1vbi5jcmVhdGVTcGluZU5vZGUodGhpcy5ib3gubm9kZSwgbm92aWNlUHJlZmFiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0NvbmNoTm92KHR5cGUpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMubW9kZWwuZ2V0THYoKSA+IDApIHtcbiAgICAgICAgLy8gICAgIHRoaXMuYm94Lm5vZGUuc2NhbGUgPSAxLjg1O1xuICAgICAgICAvLyAgICAgdGhpcy5ib3gubm9kZS5zZXRBbmNob3JQb2ludChjYy52MigwLCAwKSk7XG4gICAgICAgIC8vICAgICB0aGlzLmJveC5ub2RlLnNldFBvc2l0aW9uKHRoaXMuYm94Lm5vZGUucG9zaXRpb24uYWRkKGNjLnYzKENvbW1vbi5HUklEX1cgLyAyLCBDb21tb24uR1JJRF9IIC8gMikpKTtcbiAgICAgICAgLy8gICAgIHRoaXMubl9jb25jaEl0ZW0ubm9kZS5jb2xvciA9IGNjLkNvbG9yLkdSQVk7XG4gICAgICAgIC8vICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5uX2NvbmNoSXRlbS5jdHJsLnBsYXkoJ2JlaWtlX3hpdXhpYW5faGVpYmFpJywgMCwgdHJ1ZSk7XG4gICAgICAgIC8vICAgICB9LCAwKTtcbiAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5ib3gubm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcbiAgICAgICAgLy8gICAgICAgICBHYW1lTW9kZWwuaW5zLkNvbGxlY3RQb3MgPSBjYy52MihyZWN0LnggKyA4NCwgcmVjdC55ICsgODQpO1xuICAgICAgICAvLyAgICAgfSwgMSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNob3dTcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VyU2hvd1R5cGUgIT0gdGhpcy5tb2RlbC5nZXRUeXBlKCkgfHwgdGhpcy5jdXJTaG93THYgIT0gdGhpcy5tb2RlbC5nZXRMdigpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJTaG93VHlwZSAhPSB0aGlzLm1vZGVsLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm94Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5pY2Uubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2subm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2hvd0l0ZW0odGhpcy5tb2RlbC5nZXRUeXBlKCksIHRoaXMubW9kZWwuZ2V0THYoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUJpbmRDZWxsUG9zKCkge1xuICAgICAgICAvLyDov5nph4zlpoLmnpzmnInkvKDpgIHpmLXmiJbogIXlhbbku5bnmoTkuIrlsYLpmpznoo3niakuLi7kvJrooqvlhrDlnZfluKbnnYDot5Hot68uXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmlzRm9sbG93Tm9kZSAmJiB0aGlzLm1vZGVsLkJpbmRDZWxsICYmIHRoaXMubW9kZWwuQmluZENlbGwuZXh0RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMubW9kZWwuQmluZENlbGwuZXh0RGF0YS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuacieWPr+iDveaYr+aAp+iDveeDreeCuS4uLi4u5b6F5LyY5YyWLi4gKi9cbiAgICBwdWJsaWMgcGxheUFuaW1hdGlvbih0eXBlOiBVcEdyb3VuZFR5cGUpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaXNIYXZhU3BlKSB7XG4gICAgICAgICAgICAgICAgLy/miafooYzliqjnlLshICAgXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ybGRQb3MgPSBDb21tb24uY29udmVydEN1cldvcmxkUG9zKHRoaXMubW9kZWwuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFVwR3JvdW5kVHlwZS5Cb3gpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0VHlwZSgpICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBgYm94JHt0aGlzLm1vZGVsLmdldEx2KCl9dG8ke3RoaXMubW9kZWwuZ2V0THYoKSAtIDF9YFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShyZXNvbHZlLCBHYXBUaW1lLkRlbGF5Q2hhbmdlQnJva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5Ccm9rZW4sIHdvcmxkUG9zLCBudWxsLCB0eXBlLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZSA9IENvbW1vbi5nZXRTcGVjaWFsQWRkU2NvcmVCeVR5cGUodGhpcy5tb2RlbC5nZXRUeXBlKCkpXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5BZGRTY29yZSwgc2NvcmUsIHdvcmxkUG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIGV4ZWNOb3YoY2FsbGJhY2spIHtcbiAgICAvLyAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAvLyAgICAgICAgIGlmICh0aGlzLm1vZGVsLmdldFR5cGUoKSA9PSBVcEdyb3VuZFR5cGUuTm92X2dyYXNzKSB7XG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMubl9ncmFzc0l0ZW0pIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5uX2dyYXNzSXRlbS5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDEpKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKCkudGhlbigoKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5mb3JjZWRFbGltYXRlTm92KCk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgICAgICAgICB9LCAxKVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlbC5nZXRUeXBlKCkgPT0gVXBHcm91bmRUeXBlLk5vdl9jb25jaCkge1xuICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLm5fY29uY2hJdGVtKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGEwID0gY2MuZGVsYXlUaW1lKDAuMyk7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGExID0gY2MudGludFRvKDAuNSwgMjU1LCAyNTUsIDI1NSk7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGEyID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgYjAgPSBjYy5zY2FsZVRvKDAuMywgMSk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBiMSA9IGNjLmZhZGVPdXQoMC4zKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGIyID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvbWJDZWxsID0gR2FtZU1vZGVsLmlucy5jcmVhdGVDZWxsKHsgY2ZnOiB7IHR5cGU6IENlbGxUeXBlLkJvbWIxIH0sIHBvczogdGhpcy5tb2RlbC5wb3MsIGNyZWF0ZVR5cGU6IENyZWF0ZVR5cGUuTm92IH0pO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJvbWJDZWxsLmlzRXhlY0JvbWIgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJvbWJDZWxsLmV4dERhdGEuc2V0UG9zaXRpb24oYm9tYkNlbGwuZXh0RGF0YS5wb3NpdGlvbi5hZGQoY2MudjMoQ29tbW9uLkdSSURfVyAvIDIsIENvbW1vbi5HUklEX0ggLyAyKSkpXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQ29uY2hOb3YoKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBiMyA9IGNjLmRlbGF5VGltZShHYXBUaW1lLkJlaWtlRGVsYXlTdWN0aW9uKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGI0ID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3gubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oYjAsIGIxKSwgYjIsIGIzLCBiNCkpO1xuICAgIC8vICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLm5fY29uY2hJdGVtLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGEwLCBhMSwgYTIpKTtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2hvd1NwKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJpbmRDZWxsUG9zKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=