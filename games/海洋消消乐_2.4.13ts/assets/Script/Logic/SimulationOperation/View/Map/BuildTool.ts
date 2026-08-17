import Exchange from "./Exchange";
import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";
import { MapIslandManager } from "./MapIslandManager";
import MapIslandUtils from "./MapIslandUtils";
import { MoneyManager } from "../../../Data/MoneyManager";
import M from "../../../../Base/Manager/M";
import UIMgr from "../../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import ReportMgr from "../../../../Base/Manager/ReportMgr";
import Common from "../../../Common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildTool extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    arrow: cc.Node = null;

    @property(cc.Node)
    exchange: cc.Node = null;

    @property(cc.Node)
    exchangeBtn: cc.Node = null;

    @property(cc.Node)
    unlock: cc.Node = null;

    @property(cc.Node)
    fix: cc.Node = null;

    @property(cc.Node)
    upgrade: cc.Node = null;

    @property([cc.SpriteFrame])
    iconBg: cc.SpriteFrame[] = [];

    private curExchange: Exchange = null;

    private lastNode: cc.Node = null;

    //当前选定的建筑id
    private _buildingId: number = null;
    //建筑解锁按钮的位置坐标
    private _buildingLockPos: cc.Vec2 = null;

    onLoad() {
        EventMgr.ins.register(Event.Map.ShowTool, this.showTool, this);
        EventMgr.ins.register(Event.Map.HideTool, this.hideTool, this);
        this.node.active = false;
    }

    onDestroy() {
        EventMgr.ins.unRegister(Event.Map.ShowTool, this.showTool, this);
        EventMgr.ins.unRegister(Event.Map.HideTool, this.hideTool, this);
    }

    onDisable() {
        this.lastNode = null;
        this.curExchange = null;
    }

    // private showTool(position?: cc.Vec2, node?: cc.Node) {
    //     let size = cc.winSize;
    //     position && (this.node.position = position.sub(cc.v2(size.width / 2 + this.arrow.x, size.height / 2 + this.arrow.y - this.arrow.height / 2)));

    //     let curExchange = this.curExchange = node ? node.parent.getComponent(Exchange) : this.curExchange;
    //     if (curExchange.inAnim) {
    //         this.node.active = false;
    //         return;
    //     }

    //     if (curExchange.unlockState && curExchange.state == 0) {
    //         if (curExchange.icons.length) {
    //             this.showUnlock(curExchange);
    //         } else {
    //             this.showFix(curExchange);
    //         }
    //     } else if (curExchange.unlockState) {
    //         if (this.lastNode !== node) {
    //             this.lastNode = node;
    //             // if (curExchange.path == 'canting/canting') {
    //             //     curExchange.state < 2 && this.showUpgrade(curExchange);
    //             // } else {
    //             this.showExchenge(curExchange);
    //             // }
    //         }
    //     } else {
    //         this.node.active = false;
    //     }
    // }

    private showTool(buildingId: number, position: cc.Vec2, exchange: Exchange) {
        this._buildingId = buildingId;
        this.curExchange = exchange;
        this._buildingLockPos = position;

        let buildFixed = MapIslandUtils.getBuildFixed(buildingId);
        if (!buildFixed) {
            //显示解锁面板
            this.showUnlock(buildingId, position);
        } else {
            //显示二选一界面
            this.showExchenge(exchange);
        }
    }

    // private showUpgrade(curExchange: Exchange) {
    //     this.exchange.active = false;
    //     this.unlock.active = false;
    //     this.fix.active = false;
    //     this.upgrade.active = true;
    //     this.node.active = true;

    //     this.upgrade.getChildByName('name').getComponent(cc.Label).string = curExchange.buildingName;
    //     this.upgrade.getChildByName('price').getComponent(cc.Label).string = '1';
    // }

    //金币解锁界面
    private showUnlock(buildingId: number, position: cc.Vec2) {
        this.exchange.active = false;
        this.unlock.active = true;
        this.fix.active = false;
        this.upgrade.active = false;
        this.node.active = true;

        var buildingConfig = MapIslandManager.getBuildConfigById(buildingId);
        if (buildingConfig) {
            if (position) {
                // var mapScale = MapIslandUtils.MapScale;
                // let lockPosition = cc.v2();
                // position.scale(new cc.Vec2(mapScale, mapScale), lockPosition);
                // console.error(buildingId, position, lockPosition, mapScale);
                // this.testPoint(lockPosition);
                // this.unlock.position = lockPosition.sub(cc.v2(0, -170));//-this.unlock.height / 2 + 20));// position.sub(cc.v2(size.width / 2 + this.arrow.x, size.height / 2 + this.arrow.y - this.arrow.height / 2));
                this.unlock.position = this.getToolPos(position).sub(cc.v2(0, -170));
            }
            this.unlock.getChildByName('name').getComponent(cc.Label).string = buildingConfig.desc;
            this.unlock.getChildByName('price').getComponent(cc.Label).string = "x" + Common.bytesToSize(buildingConfig.price[0].num);
        }
    }

    /** 将建筑的坐标转换成显示小弹窗的坐标 */
    public getToolPos(buildPos: cc.Vec2): cc.Vec2 {
        let out = cc.v2();
        var mapScale = MapIslandUtils.MapScale;
        let lockPosition = cc.v2();
        buildPos.scale(new cc.Vec2(mapScale, mapScale), lockPosition);
        MapIslandUtils.cameraGetWorldToScreenPoint(lockPosition, out);
        // out.x += MapIslandUtils.mapCamera.node.x;
        // out.y += MapIslandUtils.mapCamera.node.y;
        this.node.setPosition(MapIslandUtils.mapCamera.node.position);
        return out;
    }

    // private testPoint(position: cc.Vec2) {
    //     var g = this.getComponent(cc.Graphics);
    //     g.fillRect(position.x, position.y, 10, 10);
    //     g.stroke();
    //     g.fill();
    //     // this.node.addChild(g);
    // }

    //建筑二选一界面
    private showExchenge(curExchange: Exchange) {
        this.fix.active = false;
        this.unlock.active = false;
        this.exchange.active = true;
        this.upgrade.active = false;
        this.content.children.forEach((node: cc.Node) => {
            node.active = false;
        })
        this.node.active = true;

        if (this._buildingLockPos) {
            // var mapScale = MapIslandUtils.MapScale;
            // let lockPosition = cc.v2();
            // this._buildingLockPos.scale(new cc.Vec2(mapScale, mapScale), lockPosition);
            // this.exchange.position = lockPosition.sub(cc.v2(0, -190));// -this.exchange.height / 2 + 20));// position.sub(cc.v2(size.width / 2 + this.arrow.x, size.height / 2 + this.arrow.y - this.arrow.height / 2));
            this.exchange.position = this.getToolPos(this._buildingLockPos).sub(cc.v2(0, -190));
        }

        this.content.getComponent(cc.ToggleContainer).allowSwitchOff = !curExchange.state;
        for (var i = 1; i < 3; ++i) {
            let item: cc.Node = null;
            if (i <= this.content.childrenCount) {
                item = this.content.children[i - 1];
            } else {
                item = cc.instantiate(this.item);
                this.content.addChild(item);
            }
            item.getComponent(cc.Toggle).checkEvents[0].customEventData = i.toString();
            item.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = this.iconBg[i - 1];
            cc.loader.loadRes(MapIslandUtils.getBuildIcon(this._buildingId, i), cc.SpriteFrame, (err, texture) => {
                item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = texture;
            });
            item.active = true;
            item.getComponent(cc.Toggle).isChecked = false;//curExchange.state == i - 1;
        }
        this.exchangeBtn.active = false;
        // let icons = curExchange.icons;
        // let len = icons.length;
        // for (let i = 0; i < len; i++) {
        //     let item: cc.Node;
        //     if (i < this.content.childrenCount) {
        //         item = this.content.children[i];
        //     } else {
        //         item = cc.instantiate(this.item);
        //         item.getComponent(cc.Toggle).checkEvents[0].customEventData = (i + 1) + '';
        //         this.content.addChild(item);
        //     }
        //     item.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = this.iconBg[i % 2];
        //     item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = icons[i];
        //     item.active = true;
        //     item.getComponent(cc.Toggle).isChecked = curExchange.state == i + 1;
        // }
    }

    // private showFix(curExchange: Exchange) {
    //     this.exchange.active = false;
    //     this.unlock.active = false;
    //     this.fix.active = true;
    //     this.upgrade.active = false;
    //     this.node.active = true;

    //     this.fix.getChildByName('name').getComponent(cc.Label).string = curExchange.buildingName;
    //     this.fix.getChildByName('price').getComponent(cc.Label).string = '1';
    // }


    private hideTool() {
        this.curExchange && this.curExchange.setState(false);
        this.node.active = false;
    }

    private selectItem(toggle: cc.Toggle, customEventData) {
        if (toggle.isChecked) {
            this.content.getComponent(cc.ToggleContainer).allowSwitchOff = false;
            this.curExchange.loadBuilding(Number(customEventData), false);
            this.exchangeBtn.active = true;
        }
        this.content.emit(cc.Node.EventType.TOUCH_END);
    }

    private closeTool() {
        if (this.curExchange) {
            // this.curExchange.loadBuilding(0)
            this.curExchange.setState(true);
        }
        this.node.active = false;
    }

    private upgradeBuilding() {
        this.curExchange.loadBuilding(this.curExchange.state + 1, true);
        this.node.active = false;
    }

    //点击解锁建筑
    private onClickUnlock() {
        // this.curExchange.unLock();
        // this.showTool();
        var _buildingConfig = MapIslandManager.getBuildConfigById(this._buildingId);
        if (_buildingConfig) {
            let moneyCheck = MoneyManager.CheckMoneyJson(_buildingConfig.price[0], true);
            if (moneyCheck) { //付钱修理了
                MapIslandUtils.setBuildFixed(this._buildingId);
                ReportMgr.ins.reportDecorate(this._buildingId.toString());
                // EventMgr.ins.send(Event.Map.Upgrade, toState);
                if (_buildingConfig.choose == 0) {  //无需二选一
                    M.tips.show(_buildingConfig.desc + " 修复成功了!");
                    this.curExchange.unLock();
                    this.hideTool();
                } else {
                    M.tips.show(_buildingConfig.desc + "解锁成功了!");
                    this.showExchenge(this.curExchange);
                }
            } else {
                UIMgr.ins.showUI(UIHudDef.SelectShowTarget, { type: UIHudDef.SelectShowTarget, data: null });
            }
        }
    }

    private fixBuilding() {
        this.curExchange.loadBuilding(1, true);
        this.node.active = false;
    }
}
