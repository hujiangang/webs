
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/MenuPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcTWVudVBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFDN0MsZ0RBQStDO0FBQy9DLHFEQUFnRDtBQUNoRCxzREFBdUQ7QUFFdkQsNkNBQXdDO0FBSXhDLG9DQUErQjtBQUcvQixvRkFBK0U7QUFDL0UsMkRBQXNEO0FBRWhELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUNoQixxQ0FBRyxDQUFBO0lBQ0gsMkNBQU0sQ0FBQTtJQUNOLHVDQUFJLENBQUE7SUFDSix5Q0FBSyxDQUFBO0FBQ1QsQ0FBQyxFQUxXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBS25CO0FBRVksUUFBQSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFdEYsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBR3pCO0lBQXVDLDZCQUFNO0lBQTdDO1FBQUEscUVBK0lDO1FBNUlHLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0Isa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRTNCLGVBQVMsR0FBYSxJQUFJLENBQUM7O0lBNkcvQixDQUFDO0lBM0dHLDBCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCx5QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBRXJDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLFdBQUMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxXQUFDLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFPLENBQUMsQ0FBQztRQUV2Qix3REFBd0Q7UUFDeEQsdUNBQXVDO1FBQ3ZDLEtBQUs7UUFFTCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELCtDQUErQztJQUMvQyxzRkFBc0Y7SUFDdEYsSUFBSTtJQUVKLDRCQUFRLEdBQVIsVUFBUyxLQUFpQjtRQUExQixpQkFrQkM7UUFqQkcsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWM7WUFDekIsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDM0Q7aUJBQU0sSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1RDtpQkFBTSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUMvQixJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM3RDtpQkFBTSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzlEO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsNEJBQVEsR0FBUixVQUFTLEtBQWlCO1FBQTFCLGlCQWtCQztRQWpCRyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM3QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMvQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBYztZQUN6QixJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUN0QixJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMzRDtpQkFBTSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO2lCQUFNLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzdEO2lCQUFNLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDOUQ7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTyxtQ0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFdBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUQsSUFBSSxjQUFjLEdBQUcsd0JBQWMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzlELElBQUksY0FBYyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNoQzthQUFNO1lBQ0gsSUFBSSxXQUFXLEdBQUcsd0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxpQkFBSyxXQUFXLENBQUMsTUFBUSxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxXQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTyxpQ0FBYSxHQUFyQjtRQUFBLGlCQVFDO1FBUEcsV0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1lBQ25DLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hDLGdCQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLO29CQUM5QyxLQUFLLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDLENBQUE7YUFDTDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdNLG1DQUFlLEdBQXRCO1FBQ0ksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxpQ0FBaUM7UUFDakMsd0JBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsNkJBQVMsR0FBVDtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLHdDQUF3QztJQUM1QyxDQUFDO0lBQ00sNkJBQVMsR0FBaEI7UUFDSSxpQkFBTSxTQUFTLFdBQUUsQ0FBQztRQUNsQix3Q0FBd0M7UUFDeEMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQTNJRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNPO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1E7SUFFM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDUTtJQWxDVixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBK0k3QjtJQUFELGdCQUFDO0NBL0lELEFBK0lDLENBL0lzQyxnQkFBTSxHQStJNUM7a0JBL0lvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBSdW50aW1lTWdyIGZyb20gXCIuLi8uLi9EYXRhL1J1bnRpbWVNZ3JcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCBMZXZlbCBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWxcIjtcbmltcG9ydCB7IElMZXZlbCB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JTGV2ZWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tICcuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50JztcbmltcG9ydCB7IEN1cnJlbmN5SWQsIElVc2VySW5mbyB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL0Jhc2VDb25zdFwiO1xuaW1wb3J0IE1hcElzbGFuZFV0aWxzIGZyb20gXCIuLi8uLi9TaW11bGF0aW9uT3BlcmF0aW9uL1ZpZXcvTWFwL01hcElzbGFuZFV0aWxzXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBEb2NrTWVudSB7XG4gICAgVG9wLFxuICAgIEJvdHRvbSxcbiAgICBMZWZ0LFxuICAgIFJpZ2h0XG59XG5cbmV4cG9ydCBjb25zdCBhbGxNZW51ID0gW0RvY2tNZW51LlRvcCwgRG9ja01lbnUuTGVmdCwgRG9ja01lbnUuUmlnaHQsIERvY2tNZW51LkJvdHRvbV07XG5cbmNvbnN0IGRvY2tNb3ZlVGltZSA9IDAuNTtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnVQYW5lbCBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0b3BEb2NrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJvdHRvbURvY2s6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGVmdERvY2s6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcmlnaHREb2NrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHN0YXJEb2NrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNvaW5Eb2NrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbENvaW46IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbFN0YXI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgYXZhdGFyU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdGlwc05vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbFRpcDE6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiZWxUaXAyOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlQ3VycmVuY3ksIHRoaXMudXBkYXRlSW5mbywgdGhpcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubGFiZWxUaXAyLnN0cmluZyA9IFwi5Y+v6amx5pWj5LiL5LiA54mH5a+G5LqRISFcIjtcblxuICAgICAgICB0aGlzLnN0YXJEb2NrLnkgLT0gTS5wbGF0Zm9ybS5nZXRUb3BCYW5nUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5jb2luRG9jay55IC09IE0ucGxhdGZvcm0uZ2V0VG9wQmFuZ1Bvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5zaG93RG9jayhhbGxNZW51KTtcblxuICAgICAgICAvLyB0aGlzLnN0YXJEb2NrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAvLyBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLlRhbGtQYW5lbClcbiAgICAgICAgLy8gfSlcblxuICAgICAgICB0aGlzLmluaXRQYW5lbFVJSW5mbygpO1xuICAgIH1cblxuICAgIC8vIGluaXRVSUV2ZW50KCk6IEFycmF5PFtFdmVudC5VSSwgRnVuY3Rpb25dPiB7XG4gICAgLy8gICAgIHJldHVybiBbW0V2ZW50LlVJLlNob3dEb2NrLCB0aGlzLnNob3dEb2NrXSwgW0V2ZW50LlVJLkhpZGVEb2NrLCB0aGlzLmhpZGVEb2NrXV1cbiAgICAvLyB9XG5cbiAgICBzaG93RG9jayhkb2NrczogRG9ja01lbnVbXSkge1xuICAgICAgICBsZXQgd2lkdGggPSBjYy53aW5TaXplLndpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XG4gICAgICAgIGRvY2tzLmZvckVhY2goKGRvY2s6IERvY2tNZW51KSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jayA9PSBEb2NrTWVudS5Ub3ApIHtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IGhlaWdodCAvIDIgLSB0aGlzLnRvcERvY2suaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICBnc2FwLlR3ZWVuTGl0ZS50byh0aGlzLnRvcERvY2ssIGRvY2tNb3ZlVGltZSwgeyB5OiB5IH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2NrID09IERvY2tNZW51LkxlZnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IC13aWR0aCAvIDIgKyB0aGlzLmxlZnREb2NrLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICBnc2FwLlR3ZWVuTGl0ZS50byh0aGlzLmxlZnREb2NrLCBkb2NrTW92ZVRpbWUsIHsgeDogeCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jayA9PSBEb2NrTWVudS5SaWdodCkge1xuICAgICAgICAgICAgICAgIGxldCB4ID0gd2lkdGggLyAyIC0gdGhpcy5yaWdodERvY2sud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIGdzYXAuVHdlZW5MaXRlLnRvKHRoaXMucmlnaHREb2NrLCBkb2NrTW92ZVRpbWUsIHsgeDogeCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jayA9PSBEb2NrTWVudS5Cb3R0b20pIHtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IC1oZWlnaHQgLyAyICsgdGhpcy5ib3R0b21Eb2NrLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgZ3NhcC5Ud2VlbkxpdGUudG8odGhpcy5ib3R0b21Eb2NrLCBkb2NrTW92ZVRpbWUsIHsgeTogeSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoaWRlRG9jayhkb2NrczogRG9ja01lbnVbXSkge1xuICAgICAgICBsZXQgd2lkdGggPSBjYy53aW5TaXplLndpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XG4gICAgICAgIGRvY2tzLmZvckVhY2goKGRvY2s6IERvY2tNZW51KSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jayA9PSBEb2NrTWVudS5Ub3ApIHtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IGhlaWdodCAvIDIgKyB0aGlzLnRvcERvY2suaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICBnc2FwLlR3ZWVuTGl0ZS50byh0aGlzLnRvcERvY2ssIGRvY2tNb3ZlVGltZSwgeyB5OiB5IH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2NrID09IERvY2tNZW51LkxlZnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IC13aWR0aCAvIDIgLSB0aGlzLmxlZnREb2NrLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICBnc2FwLlR3ZWVuTGl0ZS50byh0aGlzLmxlZnREb2NrLCBkb2NrTW92ZVRpbWUsIHsgeDogeCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jayA9PSBEb2NrTWVudS5SaWdodCkge1xuICAgICAgICAgICAgICAgIGxldCB4ID0gd2lkdGggLyAyICsgdGhpcy5yaWdodERvY2sud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIGdzYXAuVHdlZW5MaXRlLnRvKHRoaXMucmlnaHREb2NrLCBkb2NrTW92ZVRpbWUsIHsgeDogeCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jayA9PSBEb2NrTWVudS5Cb3R0b20pIHtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IC1oZWlnaHQgLyAyIC0gdGhpcy5ib3R0b21Eb2NrLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgZ3NhcC5Ud2VlbkxpdGUudG8odGhpcy5ib3R0b21Eb2NrLCBkb2NrTW92ZVRpbWUsIHsgeTogeSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRQYW5lbFVJSW5mbygpIHtcbiAgICAgICAgdGhpcy5sYWJlbFN0YXIuc3RyaW5nID0gTS5ydW50aW1lLmdldFN0YXJDb3VudCgpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBuZXh0QnVpbGRpbmdJZCA9IE1hcElzbGFuZFV0aWxzLmdldE5leHRVbmxvY2tCdWlsZGluZ0lkKCk7XG4gICAgICAgIGlmIChuZXh0QnVpbGRpbmdJZCA9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy50aXBzTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBidWlsZENvbmZpZyA9IE1hcElzbGFuZFV0aWxzLmdldEJ1aWxkQ29uZmlnQnlJZChuZXh0QnVpbGRpbmdJZCk7XG4gICAgICAgICAgICB0aGlzLmxhYmVsVGlwMS5zdHJpbmcgPSBg5bKb5Li7JHtidWlsZENvbmZpZy5zdGFybHZ9YDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUluZm8oKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQXZhdGFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUluZm8oKSB7XG4gICAgICAgIHRoaXMubGFiZWxDb2luLnN0cmluZyA9IE0ucnVudGltZS5nZXRGb3JtYXRlQ29pbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZUF2YXRhcigpIHtcbiAgICAgICAgTS5wbGF0Zm9ybS5nZXRVc2VySW5mbygpLnRoZW4oKHVzZXJkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcmRhdGEgJiYgdXNlcmRhdGEuYXZhdGFyVXJsKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLmdldFJlbW90UGljKHVzZXJkYXRhLmF2YXRhclVybCkudGhlbigoZnJhbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUgJiYgKHRoaXMuYXZhdGFyU3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHVibGljIG9uU2VsZWN0THZDbGljaygpIHtcbiAgICAgICAgVUlNZ3IuaW5zLmhpZGVVSShVSUh1ZERlZi5NZW51UGFuZWwpO1xuICAgICAgICAvLyBDb21tb24uanVtcFNjZW5lKFNjZW5lLkxldmVsKTtcbiAgICAgICAgTWFwSXNsYW5kVXRpbHMubGVhdmVNYXBJc2xhbmQoKTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIHN1cGVyLm9uRGlzYWJsZSgpO1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiTWVudVBhbmVsIG9uRGlzYWJsZVwiKTtcbiAgICB9XG4gICAgcHVibGljIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJNZW51UGFuZWwgb25EZXN0cm95XCIpO1xuICAgICAgICBFdmVudE1nci5pbnMudW5SZWdpc3RlcihFdmVudC5VSS5VcGRhdGVDdXJyZW5jeSwgdGhpcy51cGRhdGVJbmZvLCB0aGlzKTtcbiAgICB9XG59XG4iXX0=