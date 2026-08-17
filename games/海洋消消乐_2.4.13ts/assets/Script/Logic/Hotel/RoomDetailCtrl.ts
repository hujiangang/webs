import Common from "../Common/Common";
import Paths from "../../Base/Utils/Paths";
import { HotelRoomCtrl } from "./HotelRoomCtrl";
import M from "../../Base/Manager/M";
import { HotelData, IRoomData } from "./HotelData";
import RoomDetailItemCtrl from "./RoomDetailItemCtrl";
import { Event } from "../Data/Const/Event";
import RoomSlotDetailItemCtrl from "./RoomSlotDetailItemCtrl";
import HotelRoomCfg from "../../Base/Tabls/HotelRoomCfg";
import { CurrencyId } from "../../Base/BaseConst";
import OnLineGuestCtrl from "./Access/OnLineGuestCtrl";
import { UIHudDef } from "../Data/Interface/UIData";
import GuestPanelCtrl from "./Access/GuestPanelCtrl";
import { ICloudData } from "../SimulationOperation/View/Map/CloudView";
import { ROOM_DETAIL_SCALE } from "../Data/Const/Constant";
import { MoneyManager } from "../Data/MoneyManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoomDetailCtrl extends cc.Component {

    @property(cc.Node)
    bottomSlotContent: cc.Node = null;

    @property(cc.Node)
    bottomNode: cc.Node = null;

    @property(cc.Node)
    guestInfoPanel: cc.Node = null;

    @property(cc.Node)
    selfInfoPanel: cc.Node = null;

    @property(cc.Node)
    roomContent: cc.Node = null;

    @property(cc.Prefab)
    partsPrefab: cc.Prefab = null;

    @property(cc.Node)
    slotDetailView: cc.Node = null;

    @property(cc.Node)
    slotDetailContent: cc.Node = null;


    @property(cc.Prefab)
    slotDetailItemPrefab: cc.Prefab = null;

    @property(cc.Label)
    diamondLabel: cc.Label = null;

    @property(cc.Label)
    coinLabel: cc.Label = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Label)
    visitCountLabel: cc.Label = null;

    @property(cc.Node)
    guestListView: cc.Node = null;

    @property(cc.Node)
    onlineEye: cc.Node = null;

    @property(cc.Label)
    onlineCount: cc.Label = null;

    @property(cc.Node)
    moneyBox: cc.Node = null;

    @property(cc.Node)
    socreBox: cc.Node = null;

    @property(cc.ScrollView)
    slotScrollView: cc.ScrollView = null;

    @property(cc.Label)
    confirmBtnLab: cc.Label = null;

    private _roomCtrl: HotelRoomCtrl = null;
    private _roomId: number = null;

    private _myView: cc.Node = null;
    private _guestView: cc.Node = null;




    /**访客列表 */
    private _visitList: Array<{ id: number, nickname: string, avatar_url: string }> = null;

    onLoad() {

        M.event.register(Event.Hotel.ShowSubSlot, this._onShowSubSlot, this);
        M.event.register(Event.Hotel.HideSubSlot, this._onHideSubSlot, this);
        M.event.register(Event.Hotel.ShowGuestRoom, this.showGuestRoom, this);
        M.event.register(Event.Hotel.TouchSlotIcon, this._onSlotIconClick, this);
    }

    onDestroy() {
        M.event.unRegister(Event.Hotel.ShowSubSlot, this._onShowSubSlot, this);
        M.event.unRegister(Event.Hotel.HideSubSlot, this._onHideSubSlot, this);
        M.event.unRegister(Event.Hotel.ShowGuestRoom, this.showGuestRoom, this);
        M.event.unRegister(Event.Hotel.TouchSlotIcon, this._onSlotIconClick, this);
    }

    private _onSlotIconClick(slotid: number) {
        // const slotNode = this._slotMap.get(slotid);
        // let baseX = slotNode.x / slotNode.parent.width;
        // if (baseX > 0.75) {
        //     baseX = 1;
        // } else if (baseX < 0.22) {
        //     baseX = 0;
        // }
        // this.slotScrollView.scrollTo(cc.v2(baseX, 0), 0.3);


        this._onShowSubSlot(HotelData.getSlotConfig(this._roomId, slotid));

    }

    public showGuestRoom(data: { id: number, nickname: string, avatar_url: string, score: string, appreciate: number, _hotelDatas: any }) {
        if (data && data._hotelDatas) {
            this._showGuestPanel(true);
            this._myView.active = false;
            this.onlineEye.active = false;
            const roomData: IRoomData = data._hotelDatas[1];
            this.guestInfoPanel.getComponent(GuestPanelCtrl).init(data);
            if (roomData) {
                Common.getRes<cc.Prefab>(`${Paths.RoomPrefabPath}RoomItem_${roomData.roomId}`, cc.Prefab).then(roomPrefab => {
                    if (roomPrefab) {
                        const roomItem = this._guestView = cc.instantiate(roomPrefab);
                        roomItem.parent = this.roomContent;
                        roomItem.scale = ROOM_DETAIL_SCALE;
                        roomItem.setPosition(cc.v2(0, 0));
                        this.roomContent.setContentSize(roomItem.width * ROOM_DETAIL_SCALE, roomItem.height * ROOM_DETAIL_SCALE);
                        this.roomContent.y = 0;
                        this.roomContent.parent.y = 0;
                        this._roomCtrl = roomItem.getComponent(HotelRoomCtrl);
                        this._roomCtrl.init(roomData.roomId, roomData);
                    }
                });
            }
        }
    }

    public show(roomId: number) {
        this.onlineEye.active = false;
        this.slotDetailView.active = false;
        this.bottomNode.active = true;
        this._showGuestPanel(false);
        this._showMoneyBox(false);
        this.diamondLabel.string = M.runtime.getCurrencyStr(CurrencyId.Diamond);
        this.coinLabel.string = M.runtime.getFormateCoin();
        this.guestListView.active = false;
        this.guestListView.parent.getChildByName('jt').active = false;
        if (!this._roomCtrl && this._roomId != roomId) {
            this.roomContent.destroyAllChildren();
            Common.getRes<cc.Prefab>(`${Paths.RoomPrefabPath}RoomItem_${roomId}`, cc.Prefab).then(roomPrefab => {
                if (roomPrefab) {
                    const roomItem = this._myView = cc.instantiate(roomPrefab);
                    roomItem.parent = this.roomContent;
                    roomItem.scale = ROOM_DETAIL_SCALE;
                    roomItem.setPosition(cc.v2(0, 0));
                    this.roomContent.parent.setContentSize(roomItem.width * ROOM_DETAIL_SCALE, roomItem.height * ROOM_DETAIL_SCALE);
                    this.roomContent.parent.y = 0;
                    this._roomCtrl = roomItem.getComponent(HotelRoomCtrl);
                    this._roomCtrl.init(roomId, null, this);
                    this.updateSlotData({ roomId, slots: null, score: 0 })
                }
            });
        } else {
            this._roomCtrl.init(roomId, null, this)
        }
        this._roomId = roomId;
        this.bottomSlotContent.removeAllChildren();
        this._initSlot();
        this._showOnlineList();
    }

    private _showOnlineList() {
        M.net.getOnlineList().then(list => {
            console.error('online list', list);
            this._visitList = list;
            if (list && list.length > 0) {
                this.onlineEye.active = true;
                this.onlineCount.string = list.length;
            }
        })
    }

    private _showMoneyBox(opt: boolean = false) {
        if (opt) {
            this.moneyBox.active = true;
            this.socreBox.active = false;
            this.moneyBox.opacity = 0;
            this.moneyBox.runAction(cc.fadeIn(0.3));
        } else {
            this.moneyBox.active = false;
            this.socreBox.active = true;
            this.socreBox.opacity = 0;
            this.socreBox.runAction(cc.fadeIn(0.3))
        }
    }

    private _showGuestPanel(opt: boolean = true) {
        this.guestInfoPanel.active = opt;
        this.bottomNode.active = !opt;
        this.selfInfoPanel.active = !opt;
    }

    private _initSlot() {
        // if (!this._slotMap) {
        //     this._slotMap = new Map();
        // }
        // const config = HotelData.getRoomSlotsConfig(this._roomId);
        // if (config) {
        //     config.forEach((value, key) => {
        //         const slot = cc.instantiate(this.partsPrefab)
        //         slot.parent = this.bottomSlotContent;
        //         slot.getComponent(RoomDetailItemCtrl).init(key + 1, value);
        //         this._slotMap.set(value.slotId, slot);
        //     });
        // }
    }

    private _onHideSubSlot() {
        this._showMoneyBox(false);
        this.slotDetailView.active = false;
    }

    public onCloseSelectSubSlostView() {

        M.event.send(Event.Hotel.HideSubSlot);
    }

    public onConfirmSelectSubSlostView() {
        if (M.runtime.RoomCurrentSelectSubSlotCfg) {
            if (MoneyManager.CheckMoneyJson(M.runtime.RoomCurrentSelectSubSlotCfg, true)) {
                M.event.send(Event.Hotel.SelectSubSlot);
            } else {
                M.ui.showUI(UIHudDef.SelectShowTarget, { type: UIHudDef.SelectShowTarget, data: null });
            }
        }
    }

    public onGuestCloseBtnClick() {
        M.ui.showUI(UIHudDef.CloudView, ICloudData.VisitFriendHotel, () => {
            M.ui.hideUI(UIHudDef.FriendRank);
            this._guestView && this._guestView.destroy();
            this._myView && (this._myView.active = true);
            this._showGuestPanel(false);
            M.net.exitVisit(M.runtime.CurrentGuestUserid);
            M.runtime.CurrentGuestUserid = null;
        })
    }

    public onFriendListBtnClick() {
        //sdfsdfs
        M.ui.showUI(UIHudDef.FriendRank);
    }

    public onGuestBtnClick() {
        if (this._visitList) {
            this.guestListView.active = true;
            this.guestListView.parent.getChildByName('jt').active = true;
            this.guestListView.getComponent(OnLineGuestCtrl).init(this._visitList);
        }
    }

    public updateSlotData(roomData: IRoomData) {
        let socre = 0;
        if (this._roomCtrl && this._roomCtrl.node.scale != 1) {
            //计算当前房间的积分值
            if (roomData.slots) {
                let suit = {};
                for (const key in roomData.slots) {
                    const data = roomData.slots[key];
                    const cfg = HotelData.getSlotConfig(data.roomId, data.slotId);
                    if (cfg && cfg.prices[data.subId]) {
                        socre += cfg.prices[data.subId].extData;
                    }
                    if (!suit[data.roomId]) {
                        suit[data.roomId] = 0;
                    }
                    suit[data.roomId]++;
                }
                //确认套装数量!
                for (const roomid in suit) {
                    const count = suit[roomid];
                    const bonus = HotelData.getSlotBonusByCount(Number(roomid), count);
                    if (bonus) {
                        socre += Math.round((socre * (bonus / 100)));
                        if (roomData.roomId == Number(roomid)) {
                            //show tips
                            console.error(roomid);
                            M.tips.show('激活了套装加成!')
                        }
                    }
                }
                HotelData.updateRoomScore(roomData.roomId, socre);
            } else {
                socre = HotelData.getScoreByRoomId(roomData.roomId);
            }
            this.scoreLabel.string = `${socre}`;
        }
    }

    private _onShowSubSlot(slotCfg: HotelRoomCfg) {
        //是否需要动画 ???? 
        if (slotCfg) {
            this._showMoneyBox(true);
            this.slotDetailContent.removeAllChildren();
            this.slotDetailView.active = true;
            M.runtime.RoomCurrentSelectSubSlotCfg = null;
            const frames = this._roomCtrl.getSoltFrames(slotCfg.slotId);
            slotCfg.prices.forEach(item => {
                const slotSubNode = cc.instantiate(this.slotDetailItemPrefab);
                slotSubNode.parent = this.slotDetailContent;
                slotSubNode.getComponent(RoomSlotDetailItemCtrl).init(slotCfg.roomId, slotCfg.slotId, item, frames[item.id - 1]);
            });
            // M.event.send(Event.Hotel.ChangeSlot, slotCfg.slotId);
        }
    }

    public onOtherClick(a) {
        // M.event.send(Event.Hotel.HideSubSlot);
        M.event.send(Event.Hotel.MapScrollBegin);

        this.guestListView.active = false;
        this.guestListView.parent.getChildByName('jt').active = false;
    }

    public onExitBtnClick() {
        M.event.send(Event.Hotel.HideSubSlot);
        this.node.active = false;
    }

}
