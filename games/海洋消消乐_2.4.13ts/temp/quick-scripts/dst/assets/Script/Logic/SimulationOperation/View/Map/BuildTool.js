
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/BuildTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxCdWlsZFRvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOERBQXlEO0FBQ3pELG1EQUFrRDtBQUNsRCx1REFBc0Q7QUFDdEQsbURBQThDO0FBQzlDLDJEQUEwRDtBQUMxRCxnREFBMkM7QUFDM0Msd0RBQW1EO0FBQ25ELHlEQUEwRDtBQUMxRCxnRUFBMkQ7QUFDM0QsaURBQTRDO0FBRXRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBc1JDO1FBblJHLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixXQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUd2QixTQUFHLEdBQVksSUFBSSxDQUFDO1FBR3BCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFFdEIsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFFN0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUVqQyxXQUFXO1FBQ0gsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDbkMsYUFBYTtRQUNMLHNCQUFnQixHQUFZLElBQUksQ0FBQzs7SUFrUDdDLENBQUM7SUFoUEcsMEJBQU0sR0FBTjtRQUNJLGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9ELGtCQUFRLENBQUMs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QXNSbEQ7a0JBdFJvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4Y2hhbmdlIGZyb20gXCIuL0V4Y2hhbmdlXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgTWFwSXNsYW5kTWFuYWdlciB9IGZyb20gXCIuL01hcElzbGFuZE1hbmFnZXJcIjtcbmltcG9ydCBNYXBJc2xhbmRVdGlscyBmcm9tIFwiLi9NYXBJc2xhbmRVdGlsc1wiO1xuaW1wb3J0IHsgTW9uZXlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvTW9uZXlNYW5hZ2VyXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBSZXBvcnRNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9SZXBvcnRNZ3JcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Db21tb25cIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1aWxkVG9vbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGl0ZW06IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYXJyb3c6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZXhjaGFuZ2U6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZXhjaGFuZ2VCdG46IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdW5sb2NrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGZpeDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB1cGdyYWRlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGljb25CZzogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBjdXJFeGNoYW5nZTogRXhjaGFuZ2UgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBsYXN0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvL+W9k+WJjemAieWumueahOW7uuetkWlkXG4gICAgcHJpdmF0ZSBfYnVpbGRpbmdJZDogbnVtYmVyID0gbnVsbDtcbiAgICAvL+W7uuetkeino+mUgeaMiemSrueahOS9jee9ruWdkOagh1xuICAgIHByaXZhdGUgX2J1aWxkaW5nTG9ja1BvczogY2MuVmVjMiA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcihFdmVudC5NYXAuU2hvd1Rvb2wsIHRoaXMuc2hvd1Rvb2wsIHRoaXMpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuTWFwLkhpZGVUb29sLCB0aGlzLmhpZGVUb29sLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuTWFwLlNob3dUb29sLCB0aGlzLnNob3dUb29sLCB0aGlzKTtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuTWFwLkhpZGVUb29sLCB0aGlzLmhpZGVUb29sLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmN1ckV4Y2hhbmdlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIHNob3dUb29sKHBvc2l0aW9uPzogY2MuVmVjMiwgbm9kZT86IGNjLk5vZGUpIHtcbiAgICAvLyAgICAgbGV0IHNpemUgPSBjYy53aW5TaXplO1xuICAgIC8vICAgICBwb3NpdGlvbiAmJiAodGhpcy5ub2RlLnBvc2l0aW9uID0gcG9zaXRpb24uc3ViKGNjLnYyKHNpemUud2lkdGggLyAyICsgdGhpcy5hcnJvdy54LCBzaXplLmhlaWdodCAvIDIgKyB0aGlzLmFycm93LnkgLSB0aGlzLmFycm93LmhlaWdodCAvIDIpKSk7XG5cbiAgICAvLyAgICAgbGV0IGN1ckV4Y2hhbmdlID0gdGhpcy5jdXJFeGNoYW5nZSA9IG5vZGUgPyBub2RlLnBhcmVudC5nZXRDb21wb25lbnQoRXhjaGFuZ2UpIDogdGhpcy5jdXJFeGNoYW5nZTtcbiAgICAvLyAgICAgaWYgKGN1ckV4Y2hhbmdlLmluQW5pbSkge1xuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKGN1ckV4Y2hhbmdlLnVubG9ja1N0YXRlICYmIGN1ckV4Y2hhbmdlLnN0YXRlID09IDApIHtcbiAgICAvLyAgICAgICAgIGlmIChjdXJFeGNoYW5nZS5pY29ucy5sZW5ndGgpIHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dVbmxvY2soY3VyRXhjaGFuZ2UpO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dGaXgoY3VyRXhjaGFuZ2UpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9IGVsc2UgaWYgKGN1ckV4Y2hhbmdlLnVubG9ja1N0YXRlKSB7XG4gICAgLy8gICAgICAgICBpZiAodGhpcy5sYXN0Tm9kZSAhPT0gbm9kZSkge1xuICAgIC8vICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBub2RlO1xuICAgIC8vICAgICAgICAgICAgIC8vIGlmIChjdXJFeGNoYW5nZS5wYXRoID09ICdjYW50aW5nL2NhbnRpbmcnKSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gICAgIGN1ckV4Y2hhbmdlLnN0YXRlIDwgMiAmJiB0aGlzLnNob3dVcGdyYWRlKGN1ckV4Y2hhbmdlKTtcbiAgICAvLyAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd0V4Y2hlbmdlKGN1ckV4Y2hhbmdlKTtcbiAgICAvLyAgICAgICAgICAgICAvLyB9XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIHNob3dUb29sKGJ1aWxkaW5nSWQ6IG51bWJlciwgcG9zaXRpb246IGNjLlZlYzIsIGV4Y2hhbmdlOiBFeGNoYW5nZSkge1xuICAgICAgICB0aGlzLl9idWlsZGluZ0lkID0gYnVpbGRpbmdJZDtcbiAgICAgICAgdGhpcy5jdXJFeGNoYW5nZSA9IGV4Y2hhbmdlO1xuICAgICAgICB0aGlzLl9idWlsZGluZ0xvY2tQb3MgPSBwb3NpdGlvbjtcblxuICAgICAgICBsZXQgYnVpbGRGaXhlZCA9IE1hcElzbGFuZFV0aWxzLmdldEJ1aWxkRml4ZWQoYnVpbGRpbmdJZCk7XG4gICAgICAgIGlmICghYnVpbGRGaXhlZCkge1xuICAgICAgICAgICAgLy/mmL7npLrop6PplIHpnaLmnb9cbiAgICAgICAgICAgIHRoaXMuc2hvd1VubG9jayhidWlsZGluZ0lkLCBwb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+aYvuekuuS6jOmAieS4gOeVjOmdolxuICAgICAgICAgICAgdGhpcy5zaG93RXhjaGVuZ2UoZXhjaGFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBzaG93VXBncmFkZShjdXJFeGNoYW5nZTogRXhjaGFuZ2UpIHtcbiAgICAvLyAgICAgdGhpcy5leGNoYW5nZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAvLyAgICAgdGhpcy51bmxvY2suYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuZml4LmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vICAgICB0aGlzLnVwZ3JhZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAvLyAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyAgICAgdGhpcy51cGdyYWRlLmdldENoaWxkQnlOYW1lKCduYW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjdXJFeGNoYW5nZS5idWlsZGluZ05hbWU7XG4gICAgLy8gICAgIHRoaXMudXBncmFkZS5nZXRDaGlsZEJ5TmFtZSgncHJpY2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcxJztcbiAgICAvLyB9XG5cbiAgICAvL+mHkeW4geino+mUgeeVjOmdolxuICAgIHByaXZhdGUgc2hvd1VubG9jayhidWlsZGluZ0lkOiBudW1iZXIsIHBvc2l0aW9uOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMuZXhjaGFuZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudW5sb2NrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZml4LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZ3JhZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHZhciBidWlsZGluZ0NvbmZpZyA9IE1hcElzbGFuZE1hbmFnZXIuZ2V0QnVpbGRDb25maWdCeUlkKGJ1aWxkaW5nSWQpO1xuICAgICAgICBpZiAoYnVpbGRpbmdDb25maWcpIHtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIHZhciBtYXBTY2FsZSA9IE1hcElzbGFuZFV0aWxzLk1hcFNjYWxlO1xuICAgICAgICAgICAgICAgIC8vIGxldCBsb2NrUG9zaXRpb24gPSBjYy52MigpO1xuICAgICAgICAgICAgICAgIC8vIHBvc2l0aW9uLnNjYWxlKG5ldyBjYy5WZWMyKG1hcFNjYWxlLCBtYXBTY2FsZSksIGxvY2tQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihidWlsZGluZ0lkLCBwb3NpdGlvbiwgbG9ja1Bvc2l0aW9uLCBtYXBTY2FsZSk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy50ZXN0UG9pbnQobG9ja1Bvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnVubG9jay5wb3NpdGlvbiA9IGxvY2tQb3NpdGlvbi5zdWIoY2MudjIoMCwgLTE3MCkpOy8vLXRoaXMudW5sb2NrLmhlaWdodCAvIDIgKyAyMCkpOy8vIHBvc2l0aW9uLnN1YihjYy52MihzaXplLndpZHRoIC8gMiArIHRoaXMuYXJyb3cueCwgc2l6ZS5oZWlnaHQgLyAyICsgdGhpcy5hcnJvdy55IC0gdGhpcy5hcnJvdy5oZWlnaHQgLyAyKSk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmxvY2sucG9zaXRpb24gPSB0aGlzLmdldFRvb2xQb3MocG9zaXRpb24pLnN1YihjYy52MigwLCAtMTcwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVubG9jay5nZXRDaGlsZEJ5TmFtZSgnbmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYnVpbGRpbmdDb25maWcuZGVzYztcbiAgICAgICAgICAgIHRoaXMudW5sb2NrLmdldENoaWxkQnlOYW1lKCdwcmljZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBDb21tb24uYnl0ZXNUb1NpemUoYnVpbGRpbmdDb25maWcucHJpY2VbMF0ubnVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiDlsIblu7rnrZHnmoTlnZDmoIfovazmjaLmiJDmmL7npLrlsI/lvLnnqpfnmoTlnZDmoIcgKi9cbiAgICBwdWJsaWMgZ2V0VG9vbFBvcyhidWlsZFBvczogY2MuVmVjMik6IGNjLlZlYzIge1xuICAgICAgICBsZXQgb3V0ID0gY2MudjIoKTtcbiAgICAgICAgdmFyIG1hcFNjYWxlID0gTWFwSXNsYW5kVXRpbHMuTWFwU2NhbGU7XG4gICAgICAgIGxldCBsb2NrUG9zaXRpb24gPSBjYy52MigpO1xuICAgICAgICBidWlsZFBvcy5zY2FsZShuZXcgY2MuVmVjMihtYXBTY2FsZSwgbWFwU2NhbGUpLCBsb2NrUG9zaXRpb24pO1xuICAgICAgICBNYXBJc2xhbmRVdGlscy5jYW1lcmFHZXRXb3JsZFRvU2NyZWVuUG9pbnQobG9ja1Bvc2l0aW9uLCBvdXQpO1xuICAgICAgICAvLyBvdXQueCArPSBNYXBJc2xhbmRVdGlscy5tYXBDYW1lcmEubm9kZS54O1xuICAgICAgICAvLyBvdXQueSArPSBNYXBJc2xhbmRVdGlscy5tYXBDYW1lcmEubm9kZS55O1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oTWFwSXNsYW5kVXRpbHMubWFwQ2FtZXJhLm5vZGUucG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgdGVzdFBvaW50KHBvc2l0aW9uOiBjYy5WZWMyKSB7XG4gICAgLy8gICAgIHZhciBnID0gdGhpcy5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgIC8vICAgICBnLmZpbGxSZWN0KHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIDEwLCAxMCk7XG4gICAgLy8gICAgIGcuc3Ryb2tlKCk7XG4gICAgLy8gICAgIGcuZmlsbCgpO1xuICAgIC8vICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQoZyk7XG4gICAgLy8gfVxuXG4gICAgLy/lu7rnrZHkuozpgInkuIDnlYzpnaJcbiAgICBwcml2YXRlIHNob3dFeGNoZW5nZShjdXJFeGNoYW5nZTogRXhjaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5maXguYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudW5sb2NrLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4Y2hhbmdlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMudXBncmFkZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuLmZvckVhY2goKG5vZGU6IGNjLk5vZGUpID0+IHtcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLl9idWlsZGluZ0xvY2tQb3MpIHtcbiAgICAgICAgICAgIC8vIHZhciBtYXBTY2FsZSA9IE1hcElzbGFuZFV0aWxzLk1hcFNjYWxlO1xuICAgICAgICAgICAgLy8gbGV0IGxvY2tQb3NpdGlvbiA9IGNjLnYyKCk7XG4gICAgICAgICAgICAvLyB0aGlzLl9idWlsZGluZ0xvY2tQb3Muc2NhbGUobmV3IGNjLlZlYzIobWFwU2NhbGUsIG1hcFNjYWxlKSwgbG9ja1Bvc2l0aW9uKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZXhjaGFuZ2UucG9zaXRpb24gPSBsb2NrUG9zaXRpb24uc3ViKGNjLnYyKDAsIC0xOTApKTsvLyAtdGhpcy5leGNoYW5nZS5oZWlnaHQgLyAyICsgMjApKTsvLyBwb3NpdGlvbi5zdWIoY2MudjIoc2l6ZS53aWR0aCAvIDIgKyB0aGlzLmFycm93LngsIHNpemUuaGVpZ2h0IC8gMiArIHRoaXMuYXJyb3cueSAtIHRoaXMuYXJyb3cuaGVpZ2h0IC8gMikpO1xuICAgICAgICAgICAgdGhpcy5leGNoYW5nZS5wb3NpdGlvbiA9IHRoaXMuZ2V0VG9vbFBvcyh0aGlzLl9idWlsZGluZ0xvY2tQb3MpLnN1YihjYy52MigwLCAtMTkwKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZUNvbnRhaW5lcikuYWxsb3dTd2l0Y2hPZmYgPSAhY3VyRXhjaGFuZ2Uuc3RhdGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoaSA8PSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baSAtIDFdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmNoZWNrRXZlbnRzWzBdLmN1c3RvbUV2ZW50RGF0YSA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25CZ1tpIC0gMV07XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhNYXBJc2xhbmRVdGlscy5nZXRCdWlsZEljb24odGhpcy5fYnVpbGRpbmdJZCwgaSksIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGV4dHVyZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pc0NoZWNrZWQgPSBmYWxzZTsvL2N1ckV4Y2hhbmdlLnN0YXRlID09IGkgLSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXhjaGFuZ2VCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIGxldCBpY29ucyA9IGN1ckV4Y2hhbmdlLmljb25zO1xuICAgICAgICAvLyBsZXQgbGVuID0gaWNvbnMubGVuZ3RoO1xuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vICAgICBsZXQgaXRlbTogY2MuTm9kZTtcbiAgICAgICAgLy8gICAgIGlmIChpIDwgdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQpIHtcbiAgICAgICAgLy8gICAgICAgICBpdGVtID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcbiAgICAgICAgLy8gICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmNoZWNrRXZlbnRzWzBdLmN1c3RvbUV2ZW50RGF0YSA9IChpICsgMSkgKyAnJztcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdiZycpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uQmdbaSAlIDJdO1xuICAgICAgICAvLyAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gaWNvbnNbaV07XG4gICAgICAgIC8vICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vICAgICBpdGVtLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA9IGN1ckV4Y2hhbmdlLnN0YXRlID09IGkgKyAxO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBzaG93Rml4KGN1ckV4Y2hhbmdlOiBFeGNoYW5nZSkge1xuICAgIC8vICAgICB0aGlzLmV4Y2hhbmdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vICAgICB0aGlzLnVubG9jay5hY3RpdmUgPSBmYWxzZTtcbiAgICAvLyAgICAgdGhpcy5maXguYWN0aXZlID0gdHJ1ZTtcbiAgICAvLyAgICAgdGhpcy51cGdyYWRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgIC8vICAgICB0aGlzLmZpeC5nZXRDaGlsZEJ5TmFtZSgnbmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY3VyRXhjaGFuZ2UuYnVpbGRpbmdOYW1lO1xuICAgIC8vICAgICB0aGlzLmZpeC5nZXRDaGlsZEJ5TmFtZSgncHJpY2UnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcxJztcbiAgICAvLyB9XG5cblxuICAgIHByaXZhdGUgaGlkZVRvb2woKSB7XG4gICAgICAgIHRoaXMuY3VyRXhjaGFuZ2UgJiYgdGhpcy5jdXJFeGNoYW5nZS5zZXRTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdEl0ZW0odG9nZ2xlOiBjYy5Ub2dnbGUsIGN1c3RvbUV2ZW50RGF0YSkge1xuICAgICAgICBpZiAodG9nZ2xlLmlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5Ub2dnbGVDb250YWluZXIpLmFsbG93U3dpdGNoT2ZmID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmN1ckV4Y2hhbmdlLmxvYWRCdWlsZGluZyhOdW1iZXIoY3VzdG9tRXZlbnREYXRhKSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5leGNoYW5nZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGVudC5lbWl0KGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zZVRvb2woKSB7XG4gICAgICAgIGlmICh0aGlzLmN1ckV4Y2hhbmdlKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmN1ckV4Y2hhbmdlLmxvYWRCdWlsZGluZygwKVxuICAgICAgICAgICAgdGhpcy5jdXJFeGNoYW5nZS5zZXRTdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGdyYWRlQnVpbGRpbmcoKSB7XG4gICAgICAgIHRoaXMuY3VyRXhjaGFuZ2UubG9hZEJ1aWxkaW5nKHRoaXMuY3VyRXhjaGFuZ2Uuc3RhdGUgKyAxLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8v54K55Ye76Kej6ZSB5bu6562RXG4gICAgcHJpdmF0ZSBvbkNsaWNrVW5sb2NrKCkge1xuICAgICAgICAvLyB0aGlzLmN1ckV4Y2hhbmdlLnVuTG9jaygpO1xuICAgICAgICAvLyB0aGlzLnNob3dUb29sKCk7XG4gICAgICAgIHZhciBfYnVpbGRpbmdDb25maWcgPSBNYXBJc2xhbmRNYW5hZ2VyLmdldEJ1aWxkQ29uZmlnQnlJZCh0aGlzLl9idWlsZGluZ0lkKTtcbiAgICAgICAgaWYgKF9idWlsZGluZ0NvbmZpZykge1xuICAgICAgICAgICAgbGV0IG1vbmV5Q2hlY2sgPSBNb25leU1hbmFnZXIuQ2hlY2tNb25leUpzb24oX2J1aWxkaW5nQ29uZmlnLnByaWNlWzBdLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChtb25leUNoZWNrKSB7IC8v5LuY6ZKx5L+u55CG5LqGXG4gICAgICAgICAgICAgICAgTWFwSXNsYW5kVXRpbHMuc2V0QnVpbGRGaXhlZCh0aGlzLl9idWlsZGluZ0lkKTtcbiAgICAgICAgICAgICAgICBSZXBvcnRNZ3IuaW5zLnJlcG9ydERlY29yYXRlKHRoaXMuX2J1aWxkaW5nSWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgLy8gRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuTWFwLlVwZ3JhZGUsIHRvU3RhdGUpO1xuICAgICAgICAgICAgICAgIGlmIChfYnVpbGRpbmdDb25maWcuY2hvb3NlID09IDApIHsgIC8v5peg6ZyA5LqM6YCJ5LiAXG4gICAgICAgICAgICAgICAgICAgIE0udGlwcy5zaG93KF9idWlsZGluZ0NvbmZpZy5kZXNjICsgXCIg5L+u5aSN5oiQ5Yqf5LqGIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJFeGNoYW5nZS51bkxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlVG9vbCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE0udGlwcy5zaG93KF9idWlsZGluZ0NvbmZpZy5kZXNjICsgXCLop6PplIHmiJDlip/kuoYhXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFeGNoZW5nZSh0aGlzLmN1ckV4Y2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuU2VsZWN0U2hvd1RhcmdldCwgeyB0eXBlOiBVSUh1ZERlZi5TZWxlY3RTaG93VGFyZ2V0LCBkYXRhOiBudWxsIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXhCdWlsZGluZygpIHtcbiAgICAgICAgdGhpcy5jdXJFeGNoYW5nZS5sb2FkQnVpbGRpbmcoMSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=