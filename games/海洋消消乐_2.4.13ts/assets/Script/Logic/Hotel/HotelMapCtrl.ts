import M from "../../Base/Manager/M";
import { IHotelCfg } from "../../Base/Tabls/HotelCfg";
import { HotelManager } from "./HotelManager";
import { HotelRoomCtrl } from "./HotelRoomCtrl";
import EventMgr from "../../Base/Manager/EventMgr";
import { Event } from "../Data/Const/Event";
import UIMgr from "../../Base/Manager/UIMgr";
import { UIHudDef } from "../Data/Interface/UIData";
import Apps from "../../Base/Apps";
import Common from "../Common/Common";
import Paths from "../../Base/Utils/Paths";
import RoomDetailCtrl from "./RoomDetailCtrl";
import { HotelData } from "./HotelData";
import { Util } from "../../Base/Utils/Util";

const { ccclass, property } = cc._decorator;
@ccclass
export class HotelMapCtrl extends cc.Component {
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    roomView: cc.Node = null;

    @property(cc.Node)
    roomItemContent: cc.Node = null;

    @property(cc.Prefab)
    roomItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    roomBotItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    roomTopItemPrefab: cc.Prefab = null;

    // @property(cc.Label)
    // labelCoin: cc.Label = null;


    private _curOpenRoomId: number = 0;
    /** roomItem脚本存放 */
    private _roomItemMaps = new Map<number, HotelRoomCtrl>();
    /** roomItem的y轴间隔 */
    private _roomItemGapY = 372;
    private _roomItemTopHeight = 450;   //房间高度 -上层
    private _roomItemHeight = 703;      //房间高度 -中层
    private _roomItemBotHeight = 703;   //房间高度 -下层
    private _roomItemTopGapY = 300;     //房间距离顶部空隙
    private _roomItemBottomGapY = 230;//340;  //房间距离底部空隙

    //#region -------房间相关---------
    /** 初始化房间Item */
    private initRoomItem() {

        if (Apps.isDebug) {
            Util.Tool.showDebugView(true);
        }
        this.roomItemContent.removeAllChildren();
        this._roomItemMaps.clear();

        // this.addRoomTopItem();

        let datas = M.table.HotelCfg.getData();
        let lastRoomId = 0;

        datas.forEach((data: IHotelCfg, index) => {
            // 判断是否全部完成??? 或者达成某种程度
            let lastRoomFinished = HotelManager.checkRoomSlotsFinished(lastRoomId);
            if (lastRoomFinished) {
                //添加RoomItem
                this.addRoomItem(data.roomId);
                this._curOpenRoomId = data.roomId;
            }
            lastRoomId = data.roomId;
        });
    }

    /** 添加一个头部展示room */
    private addRoomTopItem() {
        let roomNode = cc.instantiate(this.roomTopItemPrefab);
        this.roomItemContent.addChild(roomNode);
        roomNode.setPosition(cc.v2(0, -roomNode.height / 2 - this._roomItemTopGapY));
    }

    private roomCounter = 0;
    private addRoomItem(roomId: number) {
        this.roomCounter++;
        Common.getRes<cc.Prefab>(`${Paths.RoomPrefabPath}RoomItem_${roomId}`, cc.Prefab).then(roomPrefab => {
            if (roomPrefab) {
                let curChildNum = this.roomItemContent.childrenCount - 1;
                let roomNode = cc.instantiate(roomPrefab);
                roomNode.name = roomId.toString();
                roomNode.setPosition(cc.v2(0, this._getRoomPosY(curChildNum) - this._roomItemHeight / 2));
                roomNode.parent = this.roomItemContent;
                let roomCtrl = roomNode.getComponent(HotelRoomCtrl);
                roomCtrl.init(roomId);
                this._roomItemMaps.set(roomId, roomCtrl);
                this.roomCounter--;
                if (this.roomCounter <= 0) {
                    this._loadRoomItemComplet();
                }
            }
        })
    }

    private _loadRoomItemComplet() {
        if (this.roomItemContent.childrenCount <= 1) {
            this.addRoomBotItem();
            this.addRoomBotItem();
        } else {
            this.addRoomBotItem();
        }
        this.updateRoomItemZIndex();
        this.updateScrollHeight();
        if (this.roomItemContent.childrenCount > 3) {
            this.scrollTo(this._curOpenRoomId);
        }
    }

    /** 添加最底部的一个未解锁的酒店 */
    private addRoomBotItem() {
        let curChildNum = this.roomItemContent.childrenCount - 1;
        let roomNode = cc.instantiate(this.roomBotItemPrefab);
        this.roomItemContent.addChild(roomNode);
        roomNode.setPosition(cc.v2(0, this._getRoomPosY(curChildNum) - this._roomItemBotHeight / 2));
    }

    private _getRoomPosY(index: number): number {
        return -this._roomItemTopGapY - this._roomItemTopHeight / 2 + (this._roomItemHeight - this._roomItemTopHeight) / 2 - 25
            - index * this._roomItemHeight
            + (1 + index - 1) * this._roomItemGapY
    }

    private updateRoomItemZIndex() {
        let numChildren = this.roomItemContent.childrenCount;
        for (let i = numChildren - 1; i >= 0; --i) {
            let child = this.roomItemContent.children[i];
            child.zIndex = numChildren - 1 - i;
        }
    }

    //更新scrollView的内容高度
    private updateScrollHeight() {
        let numChildren = this.roomItemContent.childrenCount;
        this.scrollView.content.height = this.roomItemContent.height = ((numChildren - 2) * this._roomItemHeight) - ((numChildren - 1) * this._roomItemGapY) + this._roomItemBotHeight + this._roomItemTopHeight + this._roomItemTopGapY + this._roomItemBottomGapY;
        this.bg.height = this.scrollView.content.height * 1.2;
        this.bg.y += this.bg.height * 0.1;
    }

    //定位到当前房间
    private scrollTo(curRoomId: number) {
        this.scheduleOnce(() => {
            let curRoom = this.getRoomCtrlById(1);
            if (curRoom) {
                let roomPos = curRoom.node.position;
                let ss = Math.abs((roomPos.y) / this.roomItemContent.height);
                console.error(roomPos.y, this.roomItemContent.height, 1 - ss, ss)
                this.scrollView.scrollTo(cc.v2(0, 1 - ss));
            }
        }, 0.02);
    }

    public onScrollEvent(sender, eventType: cc.ScrollView.EventType, customEventData) {
        console.error(eventType);
        if (eventType == cc.ScrollView.EventType.SCROLL_BEGAN) {
            EventMgr.ins.send(Event.Hotel.MapScrollBegin);
        }
    }

    /** 有房间解锁完毕 下一步操作 */
    private doUnlockRoom() {
        M.tips.show("恭喜开启了新房间!");
        this.initRoomItem();
    }

    /** 返回roomItem控制脚本 */
    private getRoomCtrlById(roomId) {
        return this._roomItemMaps.get(roomId);
    }
    //#endregion

    //#region -------界面UI相关------- 
    public updateInfo() {
        // this.labelCoin.string = M.runtime.getFormateCoin();
    }

    public onClickHead() {
        if (Apps.isOpenGM) {
            UIMgr.ins.showUI(UIHudDef.GMView);
        }
    }

    //#endregion

    public onLoad() {
        EventMgr.ins.register(Event.UI.UpdateCurrency, this.updateInfo, this);
        EventMgr.ins.register(Event.Hotel.RoomFinished, this.doUnlockRoom, this);
        M.init();
        M.table.execute().then(() => {
            HotelData.initData();
            this.initRoomItem();
            this.updateInfo();
            this.initTouch();
        });
    }

    onTouchBegin(event: cc.Event.EventTouch) {
        const pos = event.touch.getLocation()

    }

    public onRoomClick(event) {
        const rooms = this._roomItemMaps.values()
        let room: IteratorResult<HotelRoomCtrl> = null
        while (room = rooms.next(), !room.done) {
            const ctrl = room.value;
            if (ctrl.touch(event.touch.getLocation())) {
                console.error('点到了!', ctrl.name);
                this._showBigView(Number(ctrl.node.name))
                break;
            }
        }
    }


    private _showBigView(roomId: number) {
        this.roomView.active = true;
        this.roomView.getComponent(RoomDetailCtrl).show(roomId);


    }

    initTouch() {

        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);

    }

    onDestroy() {
        this._roomItemMaps.clear();
        EventMgr.ins.unRegister(Event.UI.UpdateCurrency, this.updateInfo, this);
        EventMgr.ins.unRegister(Event.Hotel.RoomFinished, this.doUnlockRoom, this);
    }

}