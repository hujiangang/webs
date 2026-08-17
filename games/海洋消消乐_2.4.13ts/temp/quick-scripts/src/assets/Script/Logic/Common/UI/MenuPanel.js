"use strict";
cc._RF.push(module, '9b5ddsY55pERJTwqfZX67HN', 'MenuPanel');
// Script/Logic/Common/UI/MenuPanel.ts

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
exports.allMenu = exports.DockMenu = void 0;
var UIBase_1 = require("../../../Base/UI/UIBase");
var Event_1 = require("../../Data/Const/Event");
var UIMgr_1 = require("../../../Base/Manager/UIMgr");
var UIData_1 = require("../../Data/Interface/UIData");
var M_1 = require("../../../Base/Manager/M");
var Common_1 = require("../Common");
var MapIslandUtils_1 = require("../../SimulationOperation/View/Map/MapIslandUtils");
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DockMenu;
(function (DockMenu) {
    DockMenu[DockMenu["Top"] = 0] = "Top";
    DockMenu[DockMenu["Bottom"] = 1] = "Bottom";
    DockMenu[DockMenu["Left"] = 2] = "Left";
    DockMenu[DockMenu["Right"] = 3] = "Right";
})(DockMenu = exports.DockMenu || (exports.DockMenu = {}));
exports.allMenu = [DockMenu.Top, DockMenu.Left, DockMenu.Right, DockMenu.Bottom];
var dockMoveTime = 0.5;
var MenuPanel = /** @class */ (function (_super) {
    __extends(MenuPanel, _super);
    function MenuPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.topDock = null;
        _this.bottomDock = null;
        _this.leftDock = null;
        _this.rightDock = null;
        _this.starDock = null;
        _this.coinDock = null;
        _this.labelCoin = null;
        _this.labelStar = null;
        _this.avatarSprite = null;
        _this.tipsNode = null;
        _this.labelTip1 = null;
        _this.labelTip2 = null;
        return _this;
    }
    MenuPanel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        EventMgr_1.default.ins.register(Event_1.Event.UI.UpdateCurrency, this.updateInfo, this);
    };
    MenuPanel.prototype.start = function () {
        this.labelTip2.string = "可驱散下一片密云!!";
        this.starDock.y -= M_1.default.platform.getTopBangPosition();
        this.coinDock.y -= M_1.default.platform.getTopBangPosition();
        this.showDock(exports.allMenu);
        // this.starDock.on(cc.Node.EventType.TOUCH_END, () => {
        // UIMgr.ins.showUI(UIHudDef.TalkPanel)
        // })
        this.initPanelUIInfo();
    };
    // initUIEvent(): Array<[Event.UI, Function]> {
    //     return [[Event.UI.ShowDock, this.showDock], [Event.UI.HideDock, this.hideDock]]
    // }
    MenuPanel.prototype.showDock = function (docks) {
        var _this = this;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        docks.forEach(function (dock) {
            if (dock == DockMenu.Top) {
                var y = height / 2 - _this.topDock.height / 2;
                gsap.TweenLite.to(_this.topDock, dockMoveTime, { y: y });
            }
            else if (dock == DockMenu.Left) {
                var x = -width / 2 + _this.leftDock.width / 2;
                gsap.TweenLite.to(_this.leftDock, dockMoveTime, { x: x });
            }
            else if (dock == DockMenu.Right) {
                var x = width / 2 - _this.rightDock.width / 2;
                gsap.TweenLite.to(_this.rightDock, dockMoveTime, { x: x });
            }
            else if (dock == DockMenu.Bottom) {
                var y = -height / 2 + _this.bottomDock.height / 2;
                gsap.TweenLite.to(_this.bottomDock, dockMoveTime, { y: y });
            }
        });
    };
    MenuPanel.prototype.hideDock = function (docks) {
        var _this = this;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        docks.forEach(function (dock) {
            if (dock == DockMenu.Top) {
                var y = height / 2 + _this.topDock.height / 2;
                gsap.TweenLite.to(_this.topDock, dockMoveTime, { y: y });
            }
            else if (dock == DockMenu.Left) {
                var x = -width / 2 - _this.leftDock.width / 2;
                gsap.TweenLite.to(_this.leftDock, dockMoveTime, { x: x });
            }
            else if (dock == DockMenu.Right) {
                var x = width / 2 + _this.rightDock.width / 2;
                gsap.TweenLite.to(_this.rightDock, dockMoveTime, { x: x });
            }
            else if (dock == DockMenu.Bottom) {
                var y = -height / 2 - _this.bottomDock.height / 2;
                gsap.TweenLite.to(_this.bottomDock, dockMoveTime, { y: y });
            }
        });
    };
    MenuPanel.prototype.initPanelUIInfo = function () {
        this.labelStar.string = M_1.default.runtime.getStarCount().toString();
        var nextBuildingId = MapIslandUtils_1.default.getNextUnlockBuildingId();
        if (nextBuildingId == -1) {
            this.tipsNode.active = false;
        }
        else {
            var buildConfig = MapIslandUtils_1.default.getBuildConfigById(nextBuildingId);
            this.labelTip1.string = "\u5C9B\u4E3B" + buildConfig.starlv;
        }
        this.updateInfo();
        this._updateAvatar();
    };
    MenuPanel.prototype.updateInfo = function () {
        this.labelCoin.string = M_1.default.runtime.getFormateCoin();
    };
    MenuPanel.prototype._updateAvatar = function () {
        var _this = this;
        M_1.default.platform.getUserInfo().then(function (userdata) {
            if (userdata && userdata.avatarUrl) {
                Common_1.default.getRemotPic(userdata.avatarUrl).then(function (frame) {
                    frame && (_this.avatarSprite.spriteFrame = frame);
                });
            }
        });
    };
    MenuPanel.prototype.onSelectLvClick = function () {
        UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.MenuPanel);
        // Common.jumpScene(Scene.Level);
        MapIslandUtils_1.default.leaveMapIsland();
    };
    MenuPanel.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        // console.error("MenuPanel onDisable");
    };
    MenuPanel.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        // console.error("MenuPanel onDestroy");
        EventMgr_1.default.ins.unRegister(Event_1.Event.UI.UpdateCurrency, this.updateInfo, this);
    };
    __decorate([
        property(cc.Node)
    ], MenuPanel.prototype, "topDock", void 0);
    __decorate([
        property(cc.Node)
    ], MenuPanel.prototype, "bottomDock", void 0);
    __decorate([
        property(cc.Node)
    ], MenuPanel.prototype, "leftDock", void 0);
    __decorate([
        property(cc.Node)
    ], MenuPanel.prototype, "rightDock", void 0);
    __decorate([
        property(cc.Node)
    ], MenuPanel.prototype, "starDock", void 0);
    __decorate([
        property(cc.Node)
    ], MenuPanel.prototype, "coinDock", void 0);
    __decorate([
        property(cc.Label)
    ], MenuPanel.prototype, "labelCoin", void 0);
    __decorate([
        property(cc.Label)
    ], MenuPanel.prototype, "labelStar", void 0);
    __decorate([
        property(cc.Sprite)
    ], MenuPanel.prototype, "avatarSprite", void 0);
    __decorate([
        property(cc.Node)
    ], MenuPanel.prototype, "tipsNode", void 0);
    __decorate([
        property(cc.Label)
    ], MenuPanel.prototype, "labelTip1", void 0);
    __decorate([
        property(cc.Label)
    ], MenuPanel.prototype, "labelTip2", void 0);
    MenuPanel = __decorate([
        ccclass
    ], MenuPanel);
    return MenuPanel;
}(UIBase_1.default));
exports.default = MenuPanel;

cc._RF.pop();