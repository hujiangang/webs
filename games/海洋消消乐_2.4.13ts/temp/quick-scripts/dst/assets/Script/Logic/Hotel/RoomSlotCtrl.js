
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/RoomSlotCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '73e78ENxG1NzrA7yztPPqVR', 'RoomSlotCtrl');
// Script/Logic/Hotel/RoomSlotCtrl.ts

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
exports.RoomSlotCtrl = void 0;
var BuildingLock_1 = require("../SimulationOperation/View/Map/Component/BuildingLock");
var HotelData_1 = require("./HotelData");
var HotelManager_1 = require("./HotelManager");
var Constant_1 = require("../Data/Const/Constant");
var M_1 = require("../../Base/Manager/M");
var Event_1 = require("../Data/Const/Event");
var Common_1 = require("../Common/Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
var RoomSlotCtrl = /** @class */ (function (_super) {
    __extends(RoomSlotCtrl, _super);
    function RoomSlotCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.slotSp = null;
        _this.iconPos = null;
        _this.iconFrames = [];
        _this.offsets = [];
        _this.animationPrefab = null;
        _this.isSpine = true;
        _this.animationName = '';
        _this._roomId = -1;
        _this._slotId = -1;
        _this._subId = -1;
        _this._soltData = null;
        _this._unlockIconItem = null;
        _this._isDetail = false;
        _this._touchPointNode = null;
        _this._isSelect = false;
        _this.index = null;
        _this._cfg = null;
        _this._spineItem = null;
        _this._animationItem = null;
        _this._animationNames = null;
        _this._animationIndex = 0;
        _this._originPos = null;
        _this._tempFrame = null;
        _this._tempPosition = null;
        _this._hightLight = null;
        return _this;
    }
    RoomSlotCtrl.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
        if (M_1.default.event) {
            M_1.default.event.register(Event_1.Event.Hotel.ShowSubSlot, this._showSubSlot, this);
            M_1.default.event.register(Event_1.Event.Hotel.HideSubSlot, this._hideSelect, this);
            M_1.default.event.register(Event_1.Event.Hotel.ChangeSlot, this._stateChanged, this);
            M_1.default.event.register(Event_1.Event.Hotel.UpateSubSlotState, this.updateIconDisplay, this);
        }
    };
    RoomSlotCtrl.prototype.onDestroy = function () {
        this.clearUnlockIconItem();
        if (M_1.default.event) {
            M_1.default.event.unRegister(Event_1.Event.Hotel.ShowSubSlot, this._showSubSlot, this);
            M_1.default.event.unRegister(Event_1.Event.Hotel.HideSubSlot, this._hideSelect, this);
            M_1.default.event.unRegister(Event_1.Event.Hotel.ChangeSlot, this._stateChanged, this);
            M_1.default.event.unRegister(Event_1.Event.Hotel.UpateSubSlotState, this.updateIconDisplay, this);
        }
    };
    RoomSlotCtrl.prototype.init = function (index, roomId, slotId, slotData, unlockItem, isDetail) {
        if (isDetail === void 0) { isDetail = false; }
        this.index = index;
        this._soltData = slotData;
        this._subId = slotData ? slotData.subId : 1;
        this._roomId = roomId;
        this._isDetail = isDetail;
        this._slotId = Number(slotId);
        // this._isSelect = false;
        this.slotSp.spriteFrame = null;
        if (!this._originPos) {
            this._originPos = this.node.position;
        }
        this._cfg = HotelData_1.HotelData.getSlotConfig(this._roomId, this._slotId);
        this._touchPointNode = this.node.parent.getChildByName('touchPoint');
        if (this._soltData && this._soltData.state > 0) {
            this.showSlot(this._soltData.subId);
            this.name = "room_" + this._roomId + "_" + this._slotId + "_" + this._soltData.subId;
        }
        else {
            this.addUnlockItem(index, unlockItem);
            this.name = "room_" + roomId + "_" + slotId;
        }
    };
    RoomSlotCtrl.prototype.addUnlockItem = function (index, unlockItem) {
        if (!HotelManager_1.HotelManager.checkSlotUnlockShow(this._roomId, index)) {
            return;
        }
        if (this._unlockIconItem) {
            return;
        }
        //缩略图与访客界面不显示这个
        if (!this._isDetail) {
            return;
        }
        var lockItem = cc.instantiate(unlockItem);
        lockItem.getComponent(BuildingLock_1.default).setHotelData(this._roomId, this._slotId);
        var ox = this.node.width * this.node.scaleX / 2 - this.node.anchorX * (this.node.width * this.node.scaleX);
        var oy = this.node.height * this.node.scaleY / 2 - this.node.anchorY * (this.node.height * this.node.scaleY);
        lockItem.setPosition(this.node.position.add(cc.v3(ox, oy)).add(this.iconPos));
        lockItem.setScale(Constant_1.ROOM_DETAIL_SCALE - 1);
        HotelData_1.HotelData.addLockItem(this._roomId, this._slotId, lockItem);
        lockItem.parent = this._touchPointNode;
        this._unlockIconItem = lockItem;
    };
    //如果已经解锁 展示家具
    RoomSlotCtrl.prototype.showSlot = function (subId, next) {
        if (this.iconFrames[subId - 1]) {
            this.slotSp.enabled = true;
            this.slotSp.spriteFrame = this.iconFrames[subId - 1];
            var offsetPos = this.offsets[subId - 1];
            if (offsetPos) {
                this.node.setPosition(this._originPos.add(offsetPos));
            }
            this.updateSelctHightLight();
            if (this._havaAnimationNeedPlay(subId) && !this.isSpine) {
                this._playAnimation();
            }
            next && next();
        }
        // Util.Loader.loadSpriteFrame(`texture/hotel/room${this._roomId}/${subId}/slot_${this._slotId}`, (err: any, res: cc.SpriteFrame) => {
        //     if (!err) {
        //         this.slotSp.spriteFrame = res;
        //         let offsetPos = this.offsets[subId - 1];
        //         if (offsetPos) {
        //             this.node.setPosition(this._originPos.add(offsetPos));
        //         }
        //         next && next();
        //     }
        // });
    };
    //刚购买完毕开始解锁
    RoomSlotCtrl.prototype.doUnlock = function (subId, next) {
        var _this = this;
        this.clearUnlockIconItem();
        this._tempFrame = null;
        this._tempPosition = null;
        this.showSlot(subId, function () {
            _this.show(next, subId);
        });
    };
    RoomSlotCtrl.prototype.updateIconDisplay = function (ctrl) {
        if (this._slotId == ctrl.slotId) {
            if (!this._tempFrame) {
                this._tempFrame = this.slotSp.spriteFrame;
                this._tempPosition = this.node.position;
            }
            this.showSlot(ctrl.subId);
            if (this._havaAnimationNeedPlay(ctrl.subId)) {
                this._playAnimation();
                this.updateSelctHightLight();
            }
            else {
                this._hideAnimation();
            }
        }
    };
    RoomSlotCtrl.prototype.updateSelctHightLight = function () {
        if ( /*this._isSelect &&*/this._hightLight) {
            this._hightLight.getComponent(cc.Sprite).spriteFrame = this.slotSp.spriteFrame;
            this._setHightLightPosition();
        }
    };
    RoomSlotCtrl.prototype._havaAnimationNeedPlay = function (subId) {
        return this.animationPrefab && this._cfg && this._cfg.animationOpts && this._cfg.animationOpts.get(subId);
    };
    //解锁动画
    RoomSlotCtrl.prototype.show = function (next, subId) {
        var _this = this;
        if (!this.node)
            return;
        if (this._havaAnimationNeedPlay(subId)) {
            this.slotSp.enabled = false;
            if (this.isSpine) {
                if (!this._spineItem) {
                    this._spineItem = Common_1.default.createSpineNode(this.node, this.animationPrefab, null);
                }
                this._spineItem.node.opacity = 255;
                this._spineItem.node.active = true;
                if (this._spineItem && this._spineItem.ctrl) {
                    this._spineItem.ctrl.play(this.animationName, 1, false, function () {
                        next && next();
                        _this.slotSp.enabled = true;
                        _this._spineItem.node.runAction(cc.sequence(cc.fadeOut(0.1), cc.callFunc(function () {
                            _this._spineItem.node.active = false;
                        })));
                    });
                }
            }
            else {
                this._playAnimation();
            }
        }
        else {
            this._hideAnimation();
            this.node.opacity = 0;
            var op = this.node.position;
            this.node.y = this.node.y - 140;
            var a0 = cc.fadeIn(0.25);
            var a1 = cc.moveTo(0.25, cc.v2(this.node.x, this.node.y + 236)).easing(cc.easeCubicActionOut());
            var a2 = cc.moveTo(0.085, op);
            var a3 = cc.scaleTo(0.05, this.node.scaleX, this.node.scaleY - 0.05);
            var a4 = cc.scaleTo(0.05, this.node.scaleX, this.node.scaleY);
            var a5 = cc.callFunc(function () {
                next && next();
            });
            this.node.runAction(cc.sequence(cc.spawn(a0, a1), a2, a3, a4, a5));
        }
    };
    RoomSlotCtrl.prototype._initAniamtion = function () {
        if (!this._animationItem) {
            this._animationItem = Common_1.default.createEffPrefab(this.node, null, this.animationPrefab);
            this._animationItem.ctrl.on('stop', this._onAnimationStop, this);
        }
        if (this.animationName) {
            this._animationNames = this.animationName.split('|');
        }
    };
    RoomSlotCtrl.prototype._onAnimationStop = function () {
        this._playAnimation();
    };
    RoomSlotCtrl.prototype._hideAnimation = function () {
        if (this._animationItem) {
            this._animationItem.node.active = false;
        }
        this.slotSp.enabled = true;
    };
    RoomSlotCtrl.prototype._playAnimation = function () {
        if (!this._animationItem) {
            this._initAniamtion();
        }
        this.slotSp.enabled = false;
        this._animationItem.node.active = true;
        this._animationItem.ctrl.play(this._animationNames[this._animationIndex]);
        this._animationIndex++;
        if (this._animationIndex >= this._animationNames.length) {
            this._animationIndex = 0;
        }
    };
    RoomSlotCtrl.prototype._showSubSlot = function (cfg) {
        if (this._isDetail && cfg.roomId == this._roomId && cfg.slotId == this._slotId) {
            this._showSelect();
        }
    };
    RoomSlotCtrl.prototype.onClick = function () {
        if (this.slotSp.spriteFrame) {
            if (this._isDetail) {
                this._playTouchAction();
                if (this._isSelect) {
                    M_1.default.event.send(Event_1.Event.Hotel.HideSubSlot, this._slotId);
                }
                else {
                    M_1.default.event.send(Event_1.Event.Hotel.TouchSlotIcon, this._slotId);
                    this._showSelect();
                    M_1.default.event.send(Event_1.Event.Hotel.ChangeSlot, this._slotId);
                }
            }
        }
    };
    RoomSlotCtrl.prototype._playTouchAction = function () {
        //墙纸,窗户,地板不可以
        if (this._slotId == 1 || this._slotId == 2 || this._slotId == 3) {
            return;
        }
        this.node.stopAllActions();
        var a0 = cc.scaleTo(0.12, this.node.scaleX, this.node.scaleY - 0.05);
        var a1 = cc.scaleTo(0.12, this.node.scaleX, this.node.scaleY + 0.05);
        var a2 = cc.scaleTo(0.12, this.node.scaleX, this.node.scaleY);
        this.node.runAction(cc.sequence(a0, a1, a2));
    };
    RoomSlotCtrl.prototype._showSelect = function () {
        if (this._isSelect) {
            return;
        }
        this._isSelect = true;
        var lightMask = Common_1.default.createSprite(null, this.slotSp.spriteFrame, this.node);
        this._hightLight = lightMask.node;
        this._hightLight.zIndex = 100;
        this._setHightLightPosition();
        //滤色..
        lightMask.srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
        lightMask.dstBlendFactor = cc.macro.BlendFactor.DST_ALPHA;
        // const a0 = cc.tintTo(1, 0, 0, 0);
        // const a1 = cc.tintTo(1, 255, 255, 255)
        this._hightLight.opacity = 0;
        var a0 = cc.fadeTo(0.5, 80);
        var a1 = cc.fadeTo(0.5, 0);
        this._hightLight.runAction(cc.repeatForever(cc.sequence(a0, a1)));
    };
    RoomSlotCtrl.prototype._setHightLightPosition = function () {
        if (this._hightLight) {
            if (this.node.anchorX != 0.5) {
                this._hightLight.x = (this.node.scaleX * this.node.width * (1 - this.node.anchorX));
            }
            if (this.node.anchorY != 0.5) {
                this._hightLight.y = (this.node.scaleY * this.node.height * (1 - this.node.anchorY));
            }
        }
    };
    RoomSlotCtrl.prototype._stateChanged = function (slotId) {
        if (slotId === void 0) { slotId = null; }
        if (slotId != this._slotId && this._isSelect) {
            this._hideSelect();
        }
    };
    RoomSlotCtrl.prototype._hideSelect = function (slotId) {
        if (slotId === void 0) { slotId = null; }
        slotId = slotId || this._slotId;
        if ((!slotId || (slotId && this._slotId == slotId)) && this._hightLight) {
            this._hightLight.stopAllActions();
            this._hightLight.destroy();
            this._hightLight = null;
            this._isSelect = false;
            if (this._tempFrame) {
                this.slotSp.spriteFrame = this._tempFrame;
                this.node.setPosition(this._tempPosition);
            }
        }
    };
    RoomSlotCtrl.prototype.clearUnlockIconItem = function () {
        if (this._unlockIconItem) {
            this._unlockIconItem.destroy();
            this._unlockIconItem = null;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], RoomSlotCtrl.prototype, "slotSp", void 0);
    __decorate([
        property(cc.Vec2)
    ], RoomSlotCtrl.prototype, "iconPos", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RoomSlotCtrl.prototype, "iconFrames", void 0);
    __decorate([
        property([cc.Vec2])
    ], RoomSlotCtrl.prototype, "offsets", void 0);
    __decorate([
        property(cc.Prefab)
    ], RoomSlotCtrl.prototype, "animationPrefab", void 0);
    __decorate([
        property
    ], RoomSlotCtrl.prototype, "isSpine", void 0);
    __decorate([
        property
    ], RoomSlotCtrl.prototype, "animationName", void 0);
    RoomSlotCtrl = __decorate([
        ccclass,
        executeInEditMode
    ], RoomSlotCtrl);
    return RoomSlotCtrl;
}(cc.Component));
exports.RoomSlotCtrl = RoomSlotCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXFJvb21TbG90Q3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUZBQWtGO0FBRWxGLHlDQUFtRDtBQUNuRCwrQ0FBOEM7QUFDOUMsbURBQTJEO0FBQzNELDBDQUFxQztBQUNyQyw2Q0FBNEM7QUFDNUMsMkNBQXNDO0FBSWhDLElBQUEsS0FBMkMsRUFBRSxDQUFDLFVBQVUsRUFBdEQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsaUJBQWlCLHVCQUFrQixDQUFDO0FBRy9EO0lBQWtDLGdDQUFZO0lBQTlDO1FBQUEscUVBMFZDO1FBdlZHLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsYUFBTyxHQUFZLElBQUksQ0FBQTtRQUd2QixnQkFBVSxHQUFxQixFQUFFLENBQUE7UUFHakMsYUFBTyxHQUFjLEVBQUUsQ0FBQTtRQUd2QixxQkFBZSxHQUFjLElBQUksQ0FBQTtRQUdqQyxhQUFPLEdBQVksSUFBSSxDQUFBO1FBR3ZCLG1CQUFhLEdBQVcsRUFBRSxDQUFBO1FBRWxCLGFBQU8sR0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyQixhQUFPLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckIsWUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFDNUIscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixxQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxlQUFTLEdBQVksS0FBSyxDQUFDO1FBQzVCLFdBQUssR0FBVyxJQUFJLENBQUM7UUFFcEIsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFDMUIsZ0JBQVUsR0FBUSxJQUFJLENBQUM7UUFDdkIsb0JBQWMsR0FBMEMsSUFBSSxDQUFDO1FBQzdELHFCQUFlLEdBQWEsSUFBSSxDQUFDO1FBQ2pDLHFCQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRTVCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBNkczQixnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFDbEMsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUF1STlCLGlCQUFXLEdBQVksSUFBSSxDQUFDOztJQTZEeEMsQ0FBQztJQWhURyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsSUFBSSxXQUFDLENBQUMsS0FBSyxFQUFFO1lBQ1QsV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xFLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkUsV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDakY7SUFDTCxDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksV0FBQyxDQUFDLEtBQUssRUFBRTtZQUNULFdBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckUsV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRSxXQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JFLFdBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ25GO0lBQ0wsQ0FBQztJQUVNLDJCQUFJLEdBQVgsVUFBWSxLQUFhLEVBQUUsTUFBYyxFQUFFLE1BQXVCLEVBQUUsUUFBbUIsRUFBRSxVQUFxQixFQUFFLFFBQXlCO1FBQXpCLHlCQUFBLEVBQUEsZ0JBQXlCO1FBQ3JJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVEsSUFBSSxDQUFDLE9BQU8sU0FBSSxJQUFJLENBQUMsT0FBTyxTQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBTyxDQUFDO1NBQzlFO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVEsTUFBTSxTQUFJLE1BQVEsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFFTSxvQ0FBYSxHQUFwQixVQUFxQixLQUFLLEVBQUUsVUFBcUI7UUFDN0MsSUFBSSxDQUFDLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtZQUN4RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsT0FBTztTQUNWO1FBQ0QsZUFBZTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLE9BQU87U0FDVjtRQUNELElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdFLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUcsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvRyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVuRixRQUFRLENBQUMsUUFBUSxDQUFDLDRCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLHFCQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1RCxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVELGFBQWE7SUFDTiwrQkFBUSxHQUFmLFVBQWdCLEtBQWEsRUFBRSxJQUFLO1FBQ2hDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksU0FBUyxFQUFFO2dCQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDekQ7WUFDRCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN6QjtZQUNELElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNsQjtRQUVELHNJQUFzSTtRQUN0SSxrQkFBa0I7UUFDbEIseUNBQXlDO1FBQ3pDLG1EQUFtRDtRQUNuRCwyQkFBMkI7UUFDM0IscUVBQXFFO1FBQ3JFLFlBQVk7UUFDWiwwQkFBMEI7UUFDMUIsUUFBUTtRQUNSLE1BQU07SUFDVixDQUFDO0lBRUQsV0FBVztJQUNKLCtCQUFRLEdBQWYsVUFBZ0IsS0FBYSxFQUFFLElBQUs7UUFBcEMsaUJBT0M7UUFORyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFJTyx3Q0FBaUIsR0FBekIsVUFBMEIsSUFBNEI7UUFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUE7Z0JBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDM0M7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0lBRU8sNENBQXFCLEdBQTdCO1FBQ0ksS0FBSSxxQkFBc0IsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQy9FLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVPLDZDQUFzQixHQUE5QixVQUErQixLQUFLO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3RyxDQUFDO0lBRUQsTUFBTTtJQUNFLDJCQUFJLEdBQVosVUFBYSxJQUFJLEVBQUUsS0FBYTtRQUFoQyxpQkFxQ0M7UUFwQ0csSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTztRQUN2QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDbkY7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO29CQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO3dCQUNwRCxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ2YsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUMzQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBQ3BFLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVCxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN6QjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNoQyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztZQUNsRyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN2RSxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ25CLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0RTtJQUNMLENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pFO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0lBRU8sdUNBQWdCLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRU8sbUNBQVksR0FBcEIsVUFBcUIsR0FBaUI7UUFDbEMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVPLDhCQUFPLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDaEIsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN2RDtxQkFBTTtvQkFDSCxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkIsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN0RDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRU8sdUNBQWdCLEdBQXhCO1FBQ0ksYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7WUFDN0QsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFHTyxrQ0FBVyxHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV0QixJQUFNLFNBQVMsR0FBRyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFOUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsTUFBTTtRQUNOLFNBQVMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQzFELFNBQVMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBRTFELG9DQUFvQztRQUNwQyx5Q0FBeUM7UUFFekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTyw2Q0FBc0IsR0FBOUI7UUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQ3RGO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQ3ZGO1NBQ0o7SUFDTCxDQUFDO0lBRU8sb0NBQWEsR0FBckIsVUFBc0IsTUFBcUI7UUFBckIsdUJBQUEsRUFBQSxhQUFxQjtRQUN2QyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVPLGtDQUFXLEdBQW5CLFVBQW9CLE1BQXFCO1FBQXJCLHVCQUFBLEVBQUEsYUFBcUI7UUFDckMsTUFBTSxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyRSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDN0M7U0FDSjtJQUNMLENBQUM7SUFFTywwQ0FBbUIsR0FBM0I7UUFDSSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjtJQUNMLENBQUM7SUF0VkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDSztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29EQUNNO0lBR2pDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2lEQUNHO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ2E7SUFHakM7UUFEQyxRQUFRO2lEQUNjO0lBR3ZCO1FBREMsUUFBUTt1REFDaUI7SUFyQmpCLFlBQVk7UUFGeEIsT0FBTztRQUNQLGlCQUFpQjtPQUNMLFlBQVksQ0EwVnhCO0lBQUQsbUJBQUM7Q0ExVkQsQUEwVkMsQ0ExVmlDLEVBQUUsQ0FBQyxTQUFTLEdBMFY3QztBQTFWWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdWlsZGluZ0xvY2sgZnJvbSBcIi4uL1NpbXVsYXRpb25PcGVyYXRpb24vVmlldy9NYXAvQ29tcG9uZW50L0J1aWxkaW5nTG9ja1wiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCB7IElTbG90RGF0YSwgSG90ZWxEYXRhIH0gZnJvbSBcIi4vSG90ZWxEYXRhXCI7XG5pbXBvcnQgeyBIb3RlbE1hbmFnZXIgfSBmcm9tIFwiLi9Ib3RlbE1hbmFnZXJcIjtcbmltcG9ydCB7IFJPT01fREVUQUlMX1NDQUxFIH0gZnJvbSBcIi4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IEhvdGVsUm9vbUNmZyBmcm9tIFwiLi4vLi4vQmFzZS9UYWJscy9Ib3RlbFJvb21DZmdcIjtcbmltcG9ydCBSb29tU2xvdERldGFpbEl0ZW1DdHJsIGZyb20gXCIuL1Jvb21TbG90RGV0YWlsSXRlbUN0cmxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZXhlY3V0ZUluRWRpdE1vZGUgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuQGV4ZWN1dGVJbkVkaXRNb2RlXG5leHBvcnQgY2xhc3MgUm9vbVNsb3RDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgc2xvdFNwOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlZlYzIpXG4gICAgaWNvblBvczogY2MuVmVjMiA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGljb25GcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXVxuXG4gICAgQHByb3BlcnR5KFtjYy5WZWMyXSlcbiAgICBvZmZzZXRzOiBjYy5WZWMyW10gPSBbXVxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBhbmltYXRpb25QcmVmYWI6IGNjLlByZWZhYiA9IG51bGxcblxuICAgIEBwcm9wZXJ0eVxuICAgIGlzU3BpbmU6IGJvb2xlYW4gPSB0cnVlXG5cbiAgICBAcHJvcGVydHlcbiAgICBhbmltYXRpb25OYW1lOiBzdHJpbmcgPSAnJ1xuXG4gICAgcHJpdmF0ZSBfcm9vbUlkOiBudW1iZXIgPSAtMTtcbiAgICBwcml2YXRlIF9zbG90SWQ6IG51bWJlciA9IC0xO1xuICAgIHByaXZhdGUgX3N1YklkOiBudW1iZXIgPSAtMTtcbiAgICBwcml2YXRlIF9zb2x0RGF0YTogSVNsb3REYXRhID0gbnVsbDtcbiAgICBwcml2YXRlIF91bmxvY2tJY29uSXRlbTogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfaXNEZXRhaWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3RvdWNoUG9pbnROb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIF9pc1NlbGVjdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2NmZzogSG90ZWxSb29tQ2ZnID0gbnVsbDtcbiAgICBwcml2YXRlIF9zcGluZUl0ZW06IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uSXRlbTogeyBub2RlOiBjYy5Ob2RlLCBjdHJsOiBjYy5BbmltYXRpb24gfSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uTmFtZXM6IHN0cmluZ1tdID0gbnVsbDtcbiAgICBwcml2YXRlIF9hbmltYXRpb25JbmRleDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgX29yaWdpblBvczogY2MuVmVjMyA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DbGljaywgdGhpcyk7XG4gICAgICAgIGlmIChNLmV2ZW50KSB7XG4gICAgICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkhvdGVsLlNob3dTdWJTbG90LCB0aGlzLl9zaG93U3ViU2xvdCwgdGhpcyk7XG4gICAgICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkhvdGVsLkhpZGVTdWJTbG90LCB0aGlzLl9oaWRlU2VsZWN0LCB0aGlzKTtcbiAgICAgICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuSG90ZWwuQ2hhbmdlU2xvdCwgdGhpcy5fc3RhdGVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuSG90ZWwuVXBhdGVTdWJTbG90U3RhdGUsIHRoaXMudXBkYXRlSWNvbkRpc3BsYXksIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNsZWFyVW5sb2NrSWNvbkl0ZW0oKTtcbiAgICAgICAgaWYgKE0uZXZlbnQpIHtcbiAgICAgICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5Ib3RlbC5TaG93U3ViU2xvdCwgdGhpcy5fc2hvd1N1YlNsb3QsIHRoaXMpO1xuICAgICAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkhvdGVsLkhpZGVTdWJTbG90LCB0aGlzLl9oaWRlU2VsZWN0LCB0aGlzKTtcbiAgICAgICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5Ib3RlbC5DaGFuZ2VTbG90LCB0aGlzLl9zdGF0ZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkhvdGVsLlVwYXRlU3ViU2xvdFN0YXRlLCB0aGlzLnVwZGF0ZUljb25EaXNwbGF5LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGluZGV4OiBudW1iZXIsIHJvb21JZDogbnVtYmVyLCBzbG90SWQ6IG51bWJlciB8IHN0cmluZywgc2xvdERhdGE6IElTbG90RGF0YSwgdW5sb2NrSXRlbTogY2MuUHJlZmFiLCBpc0RldGFpbDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5fc29sdERhdGEgPSBzbG90RGF0YTtcbiAgICAgICAgdGhpcy5fc3ViSWQgPSBzbG90RGF0YSA/IHNsb3REYXRhLnN1YklkIDogMTtcbiAgICAgICAgdGhpcy5fcm9vbUlkID0gcm9vbUlkO1xuICAgICAgICB0aGlzLl9pc0RldGFpbCA9IGlzRGV0YWlsO1xuICAgICAgICB0aGlzLl9zbG90SWQgPSBOdW1iZXIoc2xvdElkKTtcbiAgICAgICAgLy8gdGhpcy5faXNTZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zbG90U3Auc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuX29yaWdpblBvcykge1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luUG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2ZnID0gSG90ZWxEYXRhLmdldFNsb3RDb25maWcodGhpcy5fcm9vbUlkLCB0aGlzLl9zbG90SWQpO1xuICAgICAgICB0aGlzLl90b3VjaFBvaW50Tm9kZSA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoUG9pbnQnKTtcbiAgICAgICAgaWYgKHRoaXMuX3NvbHREYXRhICYmIHRoaXMuX3NvbHREYXRhLnN0YXRlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zaG93U2xvdCh0aGlzLl9zb2x0RGF0YS5zdWJJZCk7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBgcm9vbV8ke3RoaXMuX3Jvb21JZH1fJHt0aGlzLl9zbG90SWR9XyR7dGhpcy5fc29sdERhdGEuc3ViSWR9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVW5sb2NrSXRlbShpbmRleCwgdW5sb2NrSXRlbSk7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBgcm9vbV8ke3Jvb21JZH1fJHtzbG90SWR9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRVbmxvY2tJdGVtKGluZGV4LCB1bmxvY2tJdGVtOiBjYy5QcmVmYWIpIHtcbiAgICAgICAgaWYgKCFIb3RlbE1hbmFnZXIuY2hlY2tTbG90VW5sb2NrU2hvdyh0aGlzLl9yb29tSWQsIGluZGV4KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl91bmxvY2tJY29uSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8v57yp55Wl5Zu+5LiO6K6/5a6i55WM6Z2i5LiN5pi+56S66L+Z5LiqXG4gICAgICAgIGlmICghdGhpcy5faXNEZXRhaWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbG9ja0l0ZW0gPSBjYy5pbnN0YW50aWF0ZSh1bmxvY2tJdGVtKTtcbiAgICAgICAgbG9ja0l0ZW0uZ2V0Q29tcG9uZW50KEJ1aWxkaW5nTG9jaykuc2V0SG90ZWxEYXRhKHRoaXMuX3Jvb21JZCwgdGhpcy5fc2xvdElkKTtcblxuICAgICAgICBjb25zdCBveCA9IHRoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5zY2FsZVggLyAyIC0gdGhpcy5ub2RlLmFuY2hvclggKiAodGhpcy5ub2RlLndpZHRoICogdGhpcy5ub2RlLnNjYWxlWClcbiAgICAgICAgY29uc3Qgb3kgPSB0aGlzLm5vZGUuaGVpZ2h0ICogdGhpcy5ub2RlLnNjYWxlWSAvIDIgLSB0aGlzLm5vZGUuYW5jaG9yWSAqICh0aGlzLm5vZGUuaGVpZ2h0ICogdGhpcy5ub2RlLnNjYWxlWSk7XG5cbiAgICAgICAgbG9ja0l0ZW0uc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uLmFkZChjYy52MyhveCwgb3kpKS5hZGQoPGFueT50aGlzLmljb25Qb3MpKTtcblxuICAgICAgICBsb2NrSXRlbS5zZXRTY2FsZShST09NX0RFVEFJTF9TQ0FMRSAtIDEpXG4gICAgICAgIEhvdGVsRGF0YS5hZGRMb2NrSXRlbSh0aGlzLl9yb29tSWQsIHRoaXMuX3Nsb3RJZCwgbG9ja0l0ZW0pO1xuICAgICAgICBsb2NrSXRlbS5wYXJlbnQgPSB0aGlzLl90b3VjaFBvaW50Tm9kZTtcbiAgICAgICAgdGhpcy5fdW5sb2NrSWNvbkl0ZW0gPSBsb2NrSXRlbTtcbiAgICB9XG5cbiAgICAvL+WmguaenOW3sue7j+ino+mUgSDlsZXnpLrlrrblhbdcbiAgICBwdWJsaWMgc2hvd1Nsb3Qoc3ViSWQ6IG51bWJlciwgbmV4dD8pIHtcbiAgICAgICAgaWYgKHRoaXMuaWNvbkZyYW1lc1tzdWJJZCAtIDFdKSB7XG4gICAgICAgICAgICB0aGlzLnNsb3RTcC5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2xvdFNwLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uRnJhbWVzW3N1YklkIC0gMV07XG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zID0gdGhpcy5vZmZzZXRzW3N1YklkIC0gMV07XG4gICAgICAgICAgICBpZiAob2Zmc2V0UG9zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuX29yaWdpblBvcy5hZGQob2Zmc2V0UG9zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGN0SGlnaHRMaWdodCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hhdmFBbmltYXRpb25OZWVkUGxheShzdWJJZCkgJiYgIXRoaXMuaXNTcGluZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlBbmltYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHQgJiYgbmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXRpbC5Mb2FkZXIubG9hZFNwcml0ZUZyYW1lKGB0ZXh0dXJlL2hvdGVsL3Jvb20ke3RoaXMuX3Jvb21JZH0vJHtzdWJJZH0vc2xvdF8ke3RoaXMuX3Nsb3RJZH1gLCAoZXJyOiBhbnksIHJlczogY2MuU3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgLy8gICAgIGlmICghZXJyKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zbG90U3Auc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgIC8vICAgICAgICAgbGV0IG9mZnNldFBvcyA9IHRoaXMub2Zmc2V0c1tzdWJJZCAtIDFdO1xuICAgICAgICAvLyAgICAgICAgIGlmIChvZmZzZXRQb3MpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuX29yaWdpblBvcy5hZGQob2Zmc2V0UG9zKSk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIG5leHQgJiYgbmV4dCgpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvL+WImui0reS5sOWujOavleW8gOWni+ino+mUgVxuICAgIHB1YmxpYyBkb1VubG9jayhzdWJJZDogbnVtYmVyLCBuZXh0Pykge1xuICAgICAgICB0aGlzLmNsZWFyVW5sb2NrSWNvbkl0ZW0oKTtcbiAgICAgICAgdGhpcy5fdGVtcEZyYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGVtcFBvc2l0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaG93U2xvdChzdWJJZCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93KG5leHQsIHN1YklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGVtcEZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdGVtcFBvc2l0aW9uOiBjYy5WZWMzID0gbnVsbDtcbiAgICBwcml2YXRlIHVwZGF0ZUljb25EaXNwbGF5KGN0cmw6IFJvb21TbG90RGV0YWlsSXRlbUN0cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Nsb3RJZCA9PSBjdHJsLnNsb3RJZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl90ZW1wRnJhbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wRnJhbWUgPSB0aGlzLnNsb3RTcC5zcHJpdGVGcmFtZVxuICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2hvd1Nsb3QoY3RybC5zdWJJZCk7XG4gICAgICAgICAgICBpZiAodGhpcy5faGF2YUFuaW1hdGlvbk5lZWRQbGF5KGN0cmwuc3ViSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsY3RIaWdodExpZ2h0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVBbmltYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2VsY3RIaWdodExpZ2h0KCkge1xuICAgICAgICBpZiAoLyp0aGlzLl9pc1NlbGVjdCAmJiovIHRoaXMuX2hpZ2h0TGlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2h0TGlnaHQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNsb3RTcC5zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIHRoaXMuX3NldEhpZ2h0TGlnaHRQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGF2YUFuaW1hdGlvbk5lZWRQbGF5KHN1YklkKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvblByZWZhYiAmJiB0aGlzLl9jZmcgJiYgdGhpcy5fY2ZnLmFuaW1hdGlvbk9wdHMgJiYgdGhpcy5fY2ZnLmFuaW1hdGlvbk9wdHMuZ2V0KHN1YklkKVxuICAgIH1cblxuICAgIC8v6Kej6ZSB5Yqo55S7XG4gICAgcHJpdmF0ZSBzaG93KG5leHQsIHN1YklkOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX2hhdmFBbmltYXRpb25OZWVkUGxheShzdWJJZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2xvdFNwLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3BpbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3NwaW5lSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGluZUl0ZW0gPSBDb21tb24uY3JlYXRlU3BpbmVOb2RlKHRoaXMubm9kZSwgdGhpcy5hbmltYXRpb25QcmVmYWIsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9zcGluZUl0ZW0ubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwaW5lSXRlbS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NwaW5lSXRlbSAmJiB0aGlzLl9zcGluZUl0ZW0uY3RybCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGluZUl0ZW0uY3RybC5wbGF5KHRoaXMuYW5pbWF0aW9uTmFtZSwgMSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgJiYgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zbG90U3AuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGluZUl0ZW0ubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZU91dCgwLjEpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpbmVJdGVtLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlBbmltYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZGVBbmltYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIGxldCBvcCA9IHRoaXMubm9kZS5wb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5ub2RlLnkgLSAxNDA7XG4gICAgICAgICAgICBjb25zdCBhMCA9IGNjLmZhZGVJbigwLjI1KTtcbiAgICAgICAgICAgIGNvbnN0IGExID0gY2MubW92ZVRvKDAuMjUsIGNjLnYyKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSArIDIzNikpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gICAgICAgICAgICBjb25zdCBhMiA9IGNjLm1vdmVUbygwLjA4NSwgb3ApO1xuICAgICAgICAgICAgY29uc3QgYTMgPSBjYy5zY2FsZVRvKDAuMDUsIHRoaXMubm9kZS5zY2FsZVgsIHRoaXMubm9kZS5zY2FsZVkgLSAwLjA1KTtcbiAgICAgICAgICAgIGNvbnN0IGE0ID0gY2Muc2NhbGVUbygwLjA1LCB0aGlzLm5vZGUuc2NhbGVYLCB0aGlzLm5vZGUuc2NhbGVZKTtcbiAgICAgICAgICAgIGNvbnN0IGE1ID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQgJiYgbmV4dCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oYTAsIGExKSwgYTIsIGEzLCBhNCwgYTUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRBbmlhbXRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW5pbWF0aW9uSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uSXRlbSA9IENvbW1vbi5jcmVhdGVFZmZQcmVmYWIodGhpcy5ub2RlLCBudWxsLCB0aGlzLmFuaW1hdGlvblByZWZhYik7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25JdGVtLmN0cmwub24oJ3N0b3AnLCA8YW55PnRoaXMuX29uQW5pbWF0aW9uU3RvcCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uTmFtZXMgPSB0aGlzLmFuaW1hdGlvbk5hbWUuc3BsaXQoJ3wnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX29uQW5pbWF0aW9uU3RvcCgpIHtcbiAgICAgICAgdGhpcy5fcGxheUFuaW1hdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hpZGVBbmltYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25JdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25JdGVtLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbG90U3AuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGxheUFuaW1hdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmltYXRpb25JdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0QW5pYW10aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbG90U3AuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hbmltYXRpb25JdGVtLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uSXRlbS5jdHJsLnBsYXkodGhpcy5fYW5pbWF0aW9uTmFtZXNbdGhpcy5fYW5pbWF0aW9uSW5kZXhdKTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uSW5kZXgrKztcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvbkluZGV4ID49IHRoaXMuX2FuaW1hdGlvbk5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd1N1YlNsb3QoY2ZnOiBIb3RlbFJvb21DZmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGV0YWlsICYmIGNmZy5yb29tSWQgPT0gdGhpcy5fcm9vbUlkICYmIGNmZy5zbG90SWQgPT0gdGhpcy5fc2xvdElkKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93U2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnNsb3RTcC5zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheVRvdWNoQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Ib3RlbC5IaWRlU3ViU2xvdCwgdGhpcy5fc2xvdElkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuSG90ZWwuVG91Y2hTbG90SWNvbiwgdGhpcy5fc2xvdElkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd1NlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuSG90ZWwuQ2hhbmdlU2xvdCwgdGhpcy5fc2xvdElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9wbGF5VG91Y2hBY3Rpb24oKSB7XG4gICAgICAgIC8v5aKZ57q4LOeql+aItyzlnLDmnb/kuI3lj6/ku6VcbiAgICAgICAgaWYgKHRoaXMuX3Nsb3RJZCA9PSAxIHx8IHRoaXMuX3Nsb3RJZCA9PSAyIHx8IHRoaXMuX3Nsb3RJZCA9PSAzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIGNvbnN0IGEwID0gY2Muc2NhbGVUbygwLjEyLCB0aGlzLm5vZGUuc2NhbGVYLCB0aGlzLm5vZGUuc2NhbGVZIC0gMC4wNSk7XG4gICAgICAgIGNvbnN0IGExID0gY2Muc2NhbGVUbygwLjEyLCB0aGlzLm5vZGUuc2NhbGVYLCB0aGlzLm5vZGUuc2NhbGVZICsgMC4wNSk7XG4gICAgICAgIGNvbnN0IGEyID0gY2Muc2NhbGVUbygwLjEyLCB0aGlzLm5vZGUuc2NhbGVYLCB0aGlzLm5vZGUuc2NhbGVZKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMCwgYTEsIGEyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGlnaHRMaWdodDogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc2hvd1NlbGVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0KSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLl9pc1NlbGVjdCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgbGlnaHRNYXNrID0gQ29tbW9uLmNyZWF0ZVNwcml0ZShudWxsLCB0aGlzLnNsb3RTcC5zcHJpdGVGcmFtZSwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5faGlnaHRMaWdodCA9IGxpZ2h0TWFzay5ub2RlO1xuICAgICAgICB0aGlzLl9oaWdodExpZ2h0LnpJbmRleCA9IDEwMDtcblxuICAgICAgICB0aGlzLl9zZXRIaWdodExpZ2h0UG9zaXRpb24oKTtcblxuICAgICAgICAvL+a7pOiJsi4uXG4gICAgICAgIGxpZ2h0TWFzay5zcmNCbGVuZEZhY3RvciA9IGNjLm1hY3JvLkJsZW5kRmFjdG9yLlNSQ19BTFBIQTtcbiAgICAgICAgbGlnaHRNYXNrLmRzdEJsZW5kRmFjdG9yID0gY2MubWFjcm8uQmxlbmRGYWN0b3IuRFNUX0FMUEhBO1xuXG4gICAgICAgIC8vIGNvbnN0IGEwID0gY2MudGludFRvKDEsIDAsIDAsIDApO1xuICAgICAgICAvLyBjb25zdCBhMSA9IGNjLnRpbnRUbygxLCAyNTUsIDI1NSwgMjU1KVxuXG4gICAgICAgIHRoaXMuX2hpZ2h0TGlnaHQub3BhY2l0eSA9IDA7XG4gICAgICAgIGNvbnN0IGEwID0gY2MuZmFkZVRvKDAuNSwgODApO1xuICAgICAgICBjb25zdCBhMSA9IGNjLmZhZGVUbygwLjUsIDApXG4gICAgICAgIHRoaXMuX2hpZ2h0TGlnaHQucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoYTAsIGExKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldEhpZ2h0TGlnaHRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hpZ2h0TGlnaHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuYW5jaG9yWCAhPSAwLjUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oaWdodExpZ2h0LnggPSAodGhpcy5ub2RlLnNjYWxlWCAqIHRoaXMubm9kZS53aWR0aCAqICgxIC0gdGhpcy5ub2RlLmFuY2hvclgpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5hbmNob3JZICE9IDAuNSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpZ2h0TGlnaHQueSA9ICh0aGlzLm5vZGUuc2NhbGVZICogdGhpcy5ub2RlLmhlaWdodCAqICgxIC0gdGhpcy5ub2RlLmFuY2hvclkpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VkKHNsb3RJZDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBpZiAoc2xvdElkICE9IHRoaXMuX3Nsb3RJZCAmJiB0aGlzLl9pc1NlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5faGlkZVNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGlkZVNlbGVjdChzbG90SWQ6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgc2xvdElkID0gc2xvdElkIHx8IHRoaXMuX3Nsb3RJZDtcbiAgICAgICAgaWYgKCghc2xvdElkIHx8IChzbG90SWQgJiYgdGhpcy5fc2xvdElkID09IHNsb3RJZCkpICYmIHRoaXMuX2hpZ2h0TGlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2h0TGlnaHQuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2h0TGlnaHQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5faGlnaHRMaWdodCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9pc1NlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RlbXBGcmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xvdFNwLnNwcml0ZUZyYW1lID0gdGhpcy5fdGVtcEZyYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLl90ZW1wUG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclVubG9ja0ljb25JdGVtKCkge1xuICAgICAgICBpZiAodGhpcy5fdW5sb2NrSWNvbkl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3VubG9ja0ljb25JdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuX3VubG9ja0ljb25JdGVtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn0gICAiXX0=