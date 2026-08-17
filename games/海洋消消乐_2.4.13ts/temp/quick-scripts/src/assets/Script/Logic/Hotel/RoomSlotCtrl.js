"use strict";
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