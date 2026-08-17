"use strict";
cc._RF.push(module, '55c8a+uqO9Ih4FhatZOUC6i', 'BuildTool');
// Script/Logic/SimulationOperation/View/Map/BuildTool.ts

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
var EventMgr_1 = require("../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Data/Const/Event");
var MapIslandManager_1 = require("./MapIslandManager");
var MapIslandUtils_1 = require("./MapIslandUtils");
var MoneyManager_1 = require("../../../Data/MoneyManager");
var M_1 = require("../../../../Base/Manager/M");
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var ReportMgr_1 = require("../../../../Base/Manager/ReportMgr");
var Common_1 = require("../../../Common/Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuildTool = /** @class */ (function (_super) {
    __extends(BuildTool, _super);
    function BuildTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.item = null;
        _this.arrow = null;
        _this.exchange = null;
        _this.exchangeBtn = null;
        _this.unlock = null;
        _this.fix = null;
        _this.upgrade = null;
        _this.iconBg = [];
        _this.curExchange = null;
        _this.lastNode = null;
        //当前选定的建筑id
        _this._buildingId = null;
        //建筑解锁按钮的位置坐标
        _this._buildingLockPos = null;
        return _this;
    }
    BuildTool.prototype.onLoad = function () {
        EventMgr_1.default.ins.register(Event_1.Event.Map.ShowTool, this.showTool, this);
        EventMgr_1.default.ins.register(Event_1.Event.Map.HideTool, this.hideTool, this);
        this.node.active = false;
    };
    BuildTool.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.ShowTool, this.showTool, this);
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.HideTool, this.hideTool, this);
    };
    BuildTool.prototype.onDisable = function () {
        this.lastNode = null;
        this.curExchange = null;
    };
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
    BuildTool.prototype.showTool = function (buildingId, position, exchange) {
        this._buildingId = buildingId;
        this.curExchange = exchange;
        this._buildingLockPos = position;
        var buildFixed = MapIslandUtils_1.default.getBuildFixed(buildingId);
        if (!buildFixed) {
            //显示解锁面板
            this.showUnlock(buildingId, position);
        }
        else {
            //显示二选一界面
            this.showExchenge(exchange);
        }
    };
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
    BuildTool.prototype.showUnlock = function (buildingId, position) {
        this.exchange.active = false;
        this.unlock.active = true;
        this.fix.active = false;
        this.upgrade.active = false;
        this.node.active = true;
        var buildingConfig = MapIslandManager_1.MapIslandManager.getBuildConfigById(buildingId);
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
            this.unlock.getChildByName('price').getComponent(cc.Label).string = "x" + Common_1.default.bytesToSize(buildingConfig.price[0].num);
        }
    };
    /** 将建筑的坐标转换成显示小弹窗的坐标 */
    BuildTool.prototype.getToolPos = function (buildPos) {
        var out = cc.v2();
        var mapScale = MapIslandUtils_1.default.MapScale;
        var lockPosition = cc.v2();
        buildPos.scale(new cc.Vec2(mapScale, mapScale), lockPosition);
        MapIslandUtils_1.default.cameraGetWorldToScreenPoint(lockPosition, out);
        // out.x += MapIslandUtils.mapCamera.node.x;
        // out.y += MapIslandUtils.mapCamera.node.y;
        this.node.setPosition(MapIslandUtils_1.default.mapCamera.node.position);
        return out;
    };
    // private testPoint(position: cc.Vec2) {
    //     var g = this.getComponent(cc.Graphics);
    //     g.fillRect(position.x, position.y, 10, 10);
    //     g.stroke();
    //     g.fill();
    //     // this.node.addChild(g);
    // }
    //建筑二选一界面
    BuildTool.prototype.showExchenge = function (curExchange) {
        this.fix.active = false;
        this.unlock.active = false;
        this.exchange.active = true;
        this.upgrade.active = false;
        this.content.children.forEach(function (node) {
            node.active = false;
        });
        this.node.active = true;
        if (this._buildingLockPos) {
            // var mapScale = MapIslandUtils.MapScale;
            // let lockPosition = cc.v2();
            // this._buildingLockPos.scale(new cc.Vec2(mapScale, mapScale), lockPosition);
            // this.exchange.position = lockPosition.sub(cc.v2(0, -190));// -this.exchange.height / 2 + 20));// position.sub(cc.v2(size.width / 2 + this.arrow.x, size.height / 2 + this.arrow.y - this.arrow.height / 2));
            this.exchange.position = this.getToolPos(this._buildingLockPos).sub(cc.v2(0, -190));
        }
        this.content.getComponent(cc.ToggleContainer).allowSwitchOff = !curExchange.state;
        var _loop_1 = function () {
            var item = null;
            if (i <= this_1.content.childrenCount) {
                item = this_1.content.children[i - 1];
            }
            else {
                item = cc.instantiate(this_1.item);
                this_1.content.addChild(item);
            }
            item.getComponent(cc.Toggle).checkEvents[0].customEventData = i.toString();
            item.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = this_1.iconBg[i - 1];
            cc.loader.loadRes(MapIslandUtils_1.default.getBuildIcon(this_1._buildingId, i), cc.SpriteFrame, function (err, texture) {
                item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = texture;
            });
            item.active = true;
            item.getComponent(cc.Toggle).isChecked = false; //curExchange.state == i - 1;
        };
        var this_1 = this;
        for (var i = 1; i < 3; ++i) {
            _loop_1();
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
    };
    // private showFix(curExchange: Exchange) {
    //     this.exchange.active = false;
    //     this.unlock.active = false;
    //     this.fix.active = true;
    //     this.upgrade.active = false;
    //     this.node.active = true;
    //     this.fix.getChildByName('name').getComponent(cc.Label).string = curExchange.buildingName;
    //     this.fix.getChildByName('price').getComponent(cc.Label).string = '1';
    // }
    BuildTool.prototype.hideTool = function () {
        this.curExchange && this.curExchange.setState(false);
        this.node.active = false;
    };
    BuildTool.prototype.selectItem = function (toggle, customEventData) {
        if (toggle.isChecked) {
            this.content.getComponent(cc.ToggleContainer).allowSwitchOff = false;
            this.curExchange.loadBuilding(Number(customEventData), false);
            this.exchangeBtn.active = true;
        }
        this.content.emit(cc.Node.EventType.TOUCH_END);
    };
    BuildTool.prototype.closeTool = function () {
        if (this.curExchange) {
            // this.curExchange.loadBuilding(0)
            this.curExchange.setState(true);
        }
        this.node.active = false;
    };
    BuildTool.prototype.upgradeBuilding = function () {
        this.curExchange.loadBuilding(this.curExchange.state + 1, true);
        this.node.active = false;
    };
    //点击解锁建筑
    BuildTool.prototype.onClickUnlock = function () {
        // this.curExchange.unLock();
        // this.showTool();
        var _buildingConfig = MapIslandManager_1.MapIslandManager.getBuildConfigById(this._buildingId);
        if (_buildingConfig) {
            var moneyCheck = MoneyManager_1.MoneyManager.CheckMoneyJson(_buildingConfig.price[0], true);
            if (moneyCheck) { //付钱修理了
                MapIslandUtils_1.default.setBuildFixed(this._buildingId);
                ReportMgr_1.default.ins.reportDecorate(this._buildingId.toString());
                // EventMgr.ins.send(Event.Map.Upgrade, toState);
                if (_buildingConfig.choose == 0) { //无需二选一
                    M_1.default.tips.show(_buildingConfig.desc + " 修复成功了!");
                    this.curExchange.unLock();
                    this.hideTool();
                }
                else {
                    M_1.default.tips.show(_buildingConfig.desc + "解锁成功了!");
                    this.showExchenge(this.curExchange);
                }
            }
            else {
                UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.SelectShowTarget, { type: UIData_1.UIHudDef.SelectShowTarget, data: null });
            }
        }
    };
    BuildTool.prototype.fixBuilding = function () {
        this.curExchange.loadBuilding(1, true);
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], BuildTool.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], BuildTool.prototype, "item", void 0);
    __decorate([
        property(cc.Node)
    ], BuildTool.prototype, "arrow", void 0);
    __decorate([
        property(cc.Node)
    ], BuildTool.prototype, "exchange", void 0);
    __decorate([
        property(cc.Node)
    ], BuildTool.prototype, "exchangeBtn", void 0);
    __decorate([
        property(cc.Node)
    ], BuildTool.prototype, "unlock", void 0);
    __decorate([
        property(cc.Node)
    ], BuildTool.prototype, "fix", void 0);
    __decorate([
        property(cc.Node)
    ], BuildTool.prototype, "upgrade", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BuildTool.prototype, "iconBg", void 0);
    BuildTool = __decorate([
        ccclass
    ], BuildTool);
    return BuildTool;
}(cc.Component));
exports.default = BuildTool;

cc._RF.pop();