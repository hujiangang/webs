import UIBase from "../../../Base/UI/UIBase";
import { Event } from "../../Data/Const/Event";
import UIMgr from "../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../Data/Interface/UIData";
import RuntimeMgr from "../../Data/RuntimeMgr";
import M from "../../../Base/Manager/M";
import { Util } from "../../../Base/Utils/Util";
import Level from "../../Data/Interface/Level";
import { ILevel } from "../../Data/Interface/Level/ILevel";
import Common from "../Common";
import { Scene } from '../../Data/Const/Constant';
import { CurrencyId, IUserInfo } from "../../../Base/BaseConst";
import MapIslandUtils from "../../SimulationOperation/View/Map/MapIslandUtils";
import EventMgr from "../../../Base/Manager/EventMgr";

const { ccclass, property } = cc._decorator;

export enum DockMenu {
    Top,
    Bottom,
    Left,
    Right
}

export const allMenu = [DockMenu.Top, DockMenu.Left, DockMenu.Right, DockMenu.Bottom];

const dockMoveTime = 0.5;

@ccclass
export default class MenuPanel extends UIBase {

    @property(cc.Node)
    topDock: cc.Node = null;

    @property(cc.Node)
    bottomDock: cc.Node = null;

    @property(cc.Node)
    leftDock: cc.Node = null;

    @property(cc.Node)
    rightDock: cc.Node = null;

    @property(cc.Node)
    starDock: cc.Node = null;

    @property(cc.Node)
    coinDock: cc.Node = null;

    @property(cc.Label)
    labelCoin: cc.Label = null;

    @property(cc.Label)
    labelStar: cc.Label = null;

    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;
    @property(cc.Label)
    labelTip1: cc.Label = null;
    @property(cc.Label)
    labelTip2: cc.Label = null;

    onLoad() {
        super.onLoad();
        EventMgr.ins.register(Event.UI.UpdateCurrency, this.updateInfo, this);
    }

    start() {
        this.labelTip2.string = "可驱散下一片密云!!";

        this.starDock.y -= M.platform.getTopBangPosition();
        this.coinDock.y -= M.platform.getTopBangPosition();

        this.showDock(allMenu);

        // this.starDock.on(cc.Node.EventType.TOUCH_END, () => {
        // UIMgr.ins.showUI(UIHudDef.TalkPanel)
        // })

        this.initPanelUIInfo();
    }

    // initUIEvent(): Array<[Event.UI, Function]> {
    //     return [[Event.UI.ShowDock, this.showDock], [Event.UI.HideDock, this.hideDock]]
    // }

    showDock(docks: DockMenu[]) {
        let width = cc.winSize.width;
        let height = cc.winSize.height;
        docks.forEach((dock: DockMenu) => {
            if (dock == DockMenu.Top) {
                let y = height / 2 - this.topDock.height / 2;
                gsap.TweenLite.to(this.topDock, dockMoveTime, { y: y });
            } else if (dock == DockMenu.Left) {
                let x = -width / 2 + this.leftDock.width / 2;
                gsap.TweenLite.to(this.leftDock, dockMoveTime, { x: x });
            } else if (dock == DockMenu.Right) {
                let x = width / 2 - this.rightDock.width / 2;
                gsap.TweenLite.to(this.rightDock, dockMoveTime, { x: x });
            } else if (dock == DockMenu.Bottom) {
                let y = -height / 2 + this.bottomDock.height / 2;
                gsap.TweenLite.to(this.bottomDock, dockMoveTime, { y: y });
            }
        })
    }

    hideDock(docks: DockMenu[]) {
        let width = cc.winSize.width;
        let height = cc.winSize.height;
        docks.forEach((dock: DockMenu) => {
            if (dock == DockMenu.Top) {
                let y = height / 2 + this.topDock.height / 2;
                gsap.TweenLite.to(this.topDock, dockMoveTime, { y: y });
            } else if (dock == DockMenu.Left) {
                let x = -width / 2 - this.leftDock.width / 2;
                gsap.TweenLite.to(this.leftDock, dockMoveTime, { x: x });
            } else if (dock == DockMenu.Right) {
                let x = width / 2 + this.rightDock.width / 2;
                gsap.TweenLite.to(this.rightDock, dockMoveTime, { x: x });
            } else if (dock == DockMenu.Bottom) {
                let y = -height / 2 - this.bottomDock.height / 2;
                gsap.TweenLite.to(this.bottomDock, dockMoveTime, { y: y });
            }
        })
    }

    private initPanelUIInfo() {
        this.labelStar.string = M.runtime.getStarCount().toString();
        let nextBuildingId = MapIslandUtils.getNextUnlockBuildingId();
        if (nextBuildingId == -1) {
            this.tipsNode.active = false;
        } else {
            var buildConfig = MapIslandUtils.getBuildConfigById(nextBuildingId);
            this.labelTip1.string = `岛主${buildConfig.starlv}`;
        }
        this.updateInfo();
        this._updateAvatar();
    }

    public updateInfo() {
        this.labelCoin.string = M.runtime.getFormateCoin();
    }

    private _updateAvatar() {
        M.platform.getUserInfo().then((userdata) => {
            if (userdata && userdata.avatarUrl) {
                Common.getRemotPic(userdata.avatarUrl).then((frame) => {
                    frame && (this.avatarSprite.spriteFrame = frame);
                })
            }
        });
    }


    public onSelectLvClick() {
        UIMgr.ins.hideUI(UIHudDef.MenuPanel);
        // Common.jumpScene(Scene.Level);
        MapIslandUtils.leaveMapIsland();
    }

    onDisable() {
        super.onDisable();
        // console.error("MenuPanel onDisable");
    }
    public onDestroy() {
        super.onDestroy();
        // console.error("MenuPanel onDestroy");
        EventMgr.ins.unRegister(Event.UI.UpdateCurrency, this.updateInfo, this);
    }
}
