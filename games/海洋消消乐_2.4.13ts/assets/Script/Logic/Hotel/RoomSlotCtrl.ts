import BuildingLock from "../SimulationOperation/View/Map/Component/BuildingLock";
import { Util } from "../../Base/Utils/Util";
import { ISlotData, HotelData } from "./HotelData";
import { HotelManager } from "./HotelManager";
import { ROOM_DETAIL_SCALE } from "../Data/Const/Constant";
import M from "../../Base/Manager/M";
import { Event } from "../Data/Const/Event";
import Common from "../Common/Common";
import HotelRoomCfg from "../../Base/Tabls/HotelRoomCfg";
import RoomSlotDetailItemCtrl from "./RoomSlotDetailItemCtrl";

const { ccclass, property, executeInEditMode } = cc._decorator;
@ccclass
@executeInEditMode
export class RoomSlotCtrl extends cc.Component {

    @property(cc.Sprite)
    slotSp: cc.Sprite = null;

    @property(cc.Vec2)
    iconPos: cc.Vec2 = null

    @property([cc.SpriteFrame])
    iconFrames: cc.SpriteFrame[] = []

    @property([cc.Vec2])
    offsets: cc.Vec2[] = []

    @property(cc.Prefab)
    animationPrefab: cc.Prefab = null

    @property
    isSpine: boolean = true

    @property
    animationName: string = ''

    private _roomId: number = -1;
    private _slotId: number = -1;
    private _subId: number = -1;
    private _soltData: ISlotData = null;
    private _unlockIconItem: cc.Node = null;
    private _isDetail: boolean = false;

    private _touchPointNode: cc.Node = null;
    private _isSelect: boolean = false;
    public index: number = null;

    private _cfg: HotelRoomCfg = null;
    private _spineItem: any = null;
    private _animationItem: { node: cc.Node, ctrl: cc.Animation } = null;
    private _animationNames: string[] = null;
    private _animationIndex: number = 0;

    private _originPos: cc.Vec3 = null;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
        if (M.event) {
            M.event.register(Event.Hotel.ShowSubSlot, this._showSubSlot, this);
            M.event.register(Event.Hotel.HideSubSlot, this._hideSelect, this);
            M.event.register(Event.Hotel.ChangeSlot, this._stateChanged, this);
            M.event.register(Event.Hotel.UpateSubSlotState, this.updateIconDisplay, this);
        }
    }

    onDestroy() {
        this.clearUnlockIconItem();
        if (M.event) {
            M.event.unRegister(Event.Hotel.ShowSubSlot, this._showSubSlot, this);
            M.event.unRegister(Event.Hotel.HideSubSlot, this._hideSelect, this);
            M.event.unRegister(Event.Hotel.ChangeSlot, this._stateChanged, this);
            M.event.unRegister(Event.Hotel.UpateSubSlotState, this.updateIconDisplay, this);
        }
    }

    public init(index: number, roomId: number, slotId: number | string, slotData: ISlotData, unlockItem: cc.Prefab, isDetail: boolean = false) {
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

        this._cfg = HotelData.getSlotConfig(this._roomId, this._slotId);
        this._touchPointNode = this.node.parent.getChildByName('touchPoint');
        if (this._soltData && this._soltData.state > 0) {
            this.showSlot(this._soltData.subId);
            this.name = `room_${this._roomId}_${this._slotId}_${this._soltData.subId}`;
        } else {
            this.addUnlockItem(index, unlockItem);
            this.name = `room_${roomId}_${slotId}`;
        }
    }

    public addUnlockItem(index, unlockItem: cc.Prefab) {
        if (!HotelManager.checkSlotUnlockShow(this._roomId, index)) {
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
        lockItem.getComponent(BuildingLock).setHotelData(this._roomId, this._slotId);

        const ox = this.node.width * this.node.scaleX / 2 - this.node.anchorX * (this.node.width * this.node.scaleX)
        const oy = this.node.height * this.node.scaleY / 2 - this.node.anchorY * (this.node.height * this.node.scaleY);

        lockItem.setPosition(this.node.position.add(cc.v3(ox, oy)).add(<any>this.iconPos));

        lockItem.setScale(ROOM_DETAIL_SCALE - 1)
        HotelData.addLockItem(this._roomId, this._slotId, lockItem);
        lockItem.parent = this._touchPointNode;
        this._unlockIconItem = lockItem;
    }

    //如果已经解锁 展示家具
    public showSlot(subId: number, next?) {
        if (this.iconFrames[subId - 1]) {
            this.slotSp.enabled = true;
            this.slotSp.spriteFrame = this.iconFrames[subId - 1];
            let offsetPos = this.offsets[subId - 1];
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
    }

    //刚购买完毕开始解锁
    public doUnlock(subId: number, next?) {
        this.clearUnlockIconItem();
        this._tempFrame = null;
        this._tempPosition = null;
        this.showSlot(subId, () => {
            this.show(next, subId);
        });
    }

    private _tempFrame: cc.SpriteFrame = null;
    private _tempPosition: cc.Vec3 = null;
    private updateIconDisplay(ctrl: RoomSlotDetailItemCtrl) {
        if (this._slotId == ctrl.slotId) {
            if (!this._tempFrame) {
                this._tempFrame = this.slotSp.spriteFrame
                this._tempPosition = this.node.position;
            }
            this.showSlot(ctrl.subId);
            if (this._havaAnimationNeedPlay(ctrl.subId)) {
                this._playAnimation();
                this.updateSelctHightLight();
            } else {
                this._hideAnimation();
            }
        }
    }

    private updateSelctHightLight() {
        if (/*this._isSelect &&*/ this._hightLight) {
            this._hightLight.getComponent(cc.Sprite).spriteFrame = this.slotSp.spriteFrame;
            this._setHightLightPosition();
        }
    }

    private _havaAnimationNeedPlay(subId): boolean {
        return this.animationPrefab && this._cfg && this._cfg.animationOpts && this._cfg.animationOpts.get(subId)
    }

    //解锁动画
    private show(next, subId: number) {
        if (!this.node) return;
        if (this._havaAnimationNeedPlay(subId)) {
            this.slotSp.enabled = false;
            if (this.isSpine) {
                if (!this._spineItem) {
                    this._spineItem = Common.createSpineNode(this.node, this.animationPrefab, null);
                }
                this._spineItem.node.opacity = 255;
                this._spineItem.node.active = true;
                if (this._spineItem && this._spineItem.ctrl) {
                    this._spineItem.ctrl.play(this.animationName, 1, false, () => {
                        next && next();
                        this.slotSp.enabled = true;
                        this._spineItem.node.runAction(cc.sequence(cc.fadeOut(0.1), cc.callFunc(() => {
                            this._spineItem.node.active = false;
                        })));
                    });
                }
            } else {
                this._playAnimation();
            }
        } else {
            this._hideAnimation();
            this.node.opacity = 0;
            let op = this.node.position;
            this.node.y = this.node.y - 140;
            const a0 = cc.fadeIn(0.25);
            const a1 = cc.moveTo(0.25, cc.v2(this.node.x, this.node.y + 236)).easing(cc.easeCubicActionOut());
            const a2 = cc.moveTo(0.085, op);
            const a3 = cc.scaleTo(0.05, this.node.scaleX, this.node.scaleY - 0.05);
            const a4 = cc.scaleTo(0.05, this.node.scaleX, this.node.scaleY);
            const a5 = cc.callFunc(() => {
                next && next();
            })
            this.node.runAction(cc.sequence(cc.spawn(a0, a1), a2, a3, a4, a5));
        }
    }

    private _initAniamtion() {
        if (!this._animationItem) {
            this._animationItem = Common.createEffPrefab(this.node, null, this.animationPrefab);
            this._animationItem.ctrl.on('stop', <any>this._onAnimationStop, this);
        }
        if (this.animationName) {
            this._animationNames = this.animationName.split('|');
        }
    }

    private _onAnimationStop() {
        this._playAnimation();
    }

    private _hideAnimation() {
        if (this._animationItem) {
            this._animationItem.node.active = false;
        }
        this.slotSp.enabled = true;
    }

    private _playAnimation() {
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
    }

    private _showSubSlot(cfg: HotelRoomCfg) {
        if (this._isDetail && cfg.roomId == this._roomId && cfg.slotId == this._slotId) {
            this._showSelect();
        }
    }

    private onClick() {
        if (this.slotSp.spriteFrame) {
            if (this._isDetail) {
                this._playTouchAction();
                if (this._isSelect) {
                    M.event.send(Event.Hotel.HideSubSlot, this._slotId);
                } else {
                    M.event.send(Event.Hotel.TouchSlotIcon, this._slotId);
                    this._showSelect();
                    M.event.send(Event.Hotel.ChangeSlot, this._slotId);
                }
            }
        }
    }

    private _playTouchAction() {
        //墙纸,窗户,地板不可以
        if (this._slotId == 1 || this._slotId == 2 || this._slotId == 3) {
            return;
        }
        this.node.stopAllActions();
        const a0 = cc.scaleTo(0.12, this.node.scaleX, this.node.scaleY - 0.05);
        const a1 = cc.scaleTo(0.12, this.node.scaleX, this.node.scaleY + 0.05);
        const a2 = cc.scaleTo(0.12, this.node.scaleX, this.node.scaleY);
        this.node.runAction(cc.sequence(a0, a1, a2));
    }

    private _hightLight: cc.Node = null;
    private _showSelect() {
        if (this._isSelect) { return; }
        this._isSelect = true;

        const lightMask = Common.createSprite(null, this.slotSp.spriteFrame, this.node);
        this._hightLight = lightMask.node;
        this._hightLight.zIndex = 100;

        this._setHightLightPosition();

        //滤色..
        lightMask.srcBlendFactor = cc.macro.BlendFactor.SRC_ALPHA;
        lightMask.dstBlendFactor = cc.macro.BlendFactor.DST_ALPHA;

        // const a0 = cc.tintTo(1, 0, 0, 0);
        // const a1 = cc.tintTo(1, 255, 255, 255)

        this._hightLight.opacity = 0;
        const a0 = cc.fadeTo(0.5, 80);
        const a1 = cc.fadeTo(0.5, 0)
        this._hightLight.runAction(cc.repeatForever(cc.sequence(a0, a1)));
    }

    private _setHightLightPosition() {
        if (this._hightLight) {
            if (this.node.anchorX != 0.5) {
                this._hightLight.x = (this.node.scaleX * this.node.width * (1 - this.node.anchorX))
            }
            if (this.node.anchorY != 0.5) {
                this._hightLight.y = (this.node.scaleY * this.node.height * (1 - this.node.anchorY))
            }
        }
    }

    private _stateChanged(slotId: number = null) {
        if (slotId != this._slotId && this._isSelect) {
            this._hideSelect();
        }
    }

    private _hideSelect(slotId: number = null) {
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
    }

    private clearUnlockIconItem() {
        if (this._unlockIconItem) {
            this._unlockIconItem.destroy();
            this._unlockIconItem = null;
        }
    }
}   