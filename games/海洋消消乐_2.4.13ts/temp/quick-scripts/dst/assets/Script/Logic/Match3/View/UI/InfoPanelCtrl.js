
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/UI/InfoPanelCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '66365FI5kZETLe/pwz9l3ID', 'InfoPanelCtrl');
// Script/Logic/Match3/View/UI/InfoPanelCtrl.ts

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
var M_1 = require("../../../../Base/Manager/M");
var GameModel_1 = require("../../Model/GameModel");
var Event_1 = require("../../../Data/Const/Event");
var CollectItemCtrl_1 = require("./CollectItemCtrl");
var RuntimeMgr_1 = require("../../../Data/RuntimeMgr");
var EnergyModel_1 = require("../../Model/EnergyModel");
var Common_1 = require("../../../Common/Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InfoPanelCtrl = /** @class */ (function (_super) {
    __extends(InfoPanelCtrl, _super);
    function InfoPanelCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stepLable = null;
        _this.currentLvLable = null;
        _this.scoreLable = null;
        _this.collectContent = null;
        _this.collectItemPrefab = null;
        _this.energyProgress = null;
        _this.colletctPool = null;
        _this.progress = 0;
        _this.max = 0;
        return _this;
    }
    InfoPanelCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.UI.UpdateInfoPanel, this.onUpdateInfo, this);
        M_1.default.event.register(Event_1.Event.GameCMD.EnergyStorage, this.updataEnergy, this);
    };
    InfoPanelCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateInfoPanel, this.onUpdateInfo, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.EnergyStorage, this.updataEnergy, this);
    };
    InfoPanelCtrl.prototype.init = function () {
        if (this.currentLvLable) {
            this.currentLvLable.string = "\u5173\u5361 : " + RuntimeMgr_1.default.ins.CurLevel;
        }
        this.onUpdateInfo();
        this.initCollectTarget();
        EnergyModel_1.EnergyModel.ins.setCurLevel();
    };
    InfoPanelCtrl.prototype.onUpdateInfo = function () {
        if (this.stepLable && GameModel_1.default.ins) {
            this.stepLable.string = "" + GameModel_1.default.ins.stepLimit;
        }
        if (this.scoreLable && Number(this.scoreLable.string) != RuntimeMgr_1.default.ins.currentScore) {
            this.scoreLable.string = "" + RuntimeMgr_1.default.ins.currentScore;
            var animation = this.scoreLable.getComponent(cc.Animation);
            animation && animation.play('scoreJump');
        }
    };
    InfoPanelCtrl.prototype.initCollectTarget = function () {
        var _this = this;
        var cs = GameModel_1.default.ins.getCollect();
        this.colletctPool = new Map();
        if (cs) {
            this.collectContent.width = [158, 208, 258][cs.size - 1];
            if (cs.size > 1) {
                // this.collectContent.x += 25 * (cs.size - 1);
            }
            this.collectContent.destroyAllChildren();
            cs.forEach(function (collect, key) {
                var item = M_1.default.nodePool.createItem(_this.collectItemPrefab);
                var itemCtrl = item.getComponent(CollectItemCtrl_1.default);
                itemCtrl.init(key, collect);
                item.parent = _this.collectContent;
                _this.colletctPool.set(key, item);
            });
        }
    };
    //获取关卡文字的世界坐标
    InfoPanelCtrl.prototype.getLevelLabPos = function () {
        return this.currentLvLable ? Common_1.default.getWorldPos(this.currentLvLable.node) : null;
    };
    //获得步数坐标
    InfoPanelCtrl.prototype.getStepPos = function () {
        return this.stepLable ? Common_1.default.getWorldPos(this.stepLable.node) : null;
    };
    //获取收集物的UI坐标
    InfoPanelCtrl.prototype.getCollectPos = function (type) {
        var pos = cc.v2(0, 0);
        var cNode = this.colletctPool ? this.colletctPool.get(type + '') : null;
        if (cNode) {
            // const rect = cNode.getBoundingBoxToWorld()
            // pos = cc.v2(rect.x, rect.y);
            pos = Common_1.default.getWorldPos(cNode);
        }
        return pos;
    };
    InfoPanelCtrl.prototype.updataEnergy = function (progress, max) {
        this.progress = progress;
        this.max = max;
    };
    InfoPanelCtrl.prototype.update = function () {
        if (this.max) {
            var progress = Math.floor(this.energyProgress.progress * this.max);
            if (progress < this.progress) {
                progress++;
            }
            else if (progress == this.progress && progress == this.max) {
                progress = 0;
                this.progress = 0;
            }
            else if (progress >= this.progress) {
                progress = this.progress;
            }
            this.energyProgress.progress = progress / this.max;
        }
    };
    __decorate([
        property(cc.Label)
    ], InfoPanelCtrl.prototype, "stepLable", void 0);
    __decorate([
        property(cc.Label)
    ], InfoPanelCtrl.prototype, "currentLvLable", void 0);
    __decorate([
        property(cc.Label)
    ], InfoPanelCtrl.prototype, "scoreLable", void 0);
    __decorate([
        property(cc.Node)
    ], InfoPanelCtrl.prototype, "collectContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], InfoPanelCtrl.prototype, "collectItemPrefab", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], InfoPanelCtrl.prototype, "energyProgress", void 0);
    InfoPanelCtrl = __decorate([
        ccclass
    ], InfoPanelCtrl);
    return InfoPanelCtrl;
}(cc.Component));
exports.default = InfoPanelCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVSVxcSW5mb1BhbmVsQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsbURBQThDO0FBQzlDLG1EQUFrRDtBQUNsRCxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBQ2xELHVEQUFzRDtBQUN0RCxpREFBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFxSEM7UUFsSEcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUcvQix1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBRTlCLGtCQUFZLEdBQXlCLElBQUksQ0FBQztRQTJFMUMsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixTQUFHLEdBQVcsQ0FBQyxDQUFDOztJQXFCNUIsQ0FBQztJQS9GRyw4QkFBTSxHQUFOO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTNFLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxlQUFl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QUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDckI7aUJBQU0sSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDNUI7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUN0RDtJQUVMLENBQUM7SUFqSEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNhO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDYTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzREQUNnQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3lEQUNhO0lBbEJyQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBcUhqQztJQUFELG9CQUFDO0NBckhELEFBcUhDLENBckgwQyxFQUFFLENBQUMsU0FBUyxHQXFIdEQ7a0JBckhvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgR2FtZU1vZGVsIGZyb20gXCIuLi8uLi9Nb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBDb2xsZWN0SXRlbUN0cmwgZnJvbSBcIi4vQ29sbGVjdEl0ZW1DdHJsXCI7XG5pbXBvcnQgUnVudGltZU1nciBmcm9tIFwiLi4vLi4vLi4vRGF0YS9SdW50aW1lTWdyXCI7XG5pbXBvcnQgeyBFbmVyZ3lNb2RlbCB9IGZyb20gXCIuLi8uLi9Nb2RlbC9FbmVyZ3lNb2RlbFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IHsgQ2VsbFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mb1BhbmVsQ3RybCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3RlcExhYmxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY3VycmVudEx2TGFibGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzY29yZUxhYmxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb2xsZWN0Q29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGNvbGxlY3RJdGVtUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxuICAgIGVuZXJneVByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG5cbiAgICBwcml2YXRlIGNvbGxldGN0UG9vbDogTWFwPHN0cmluZywgY2MuTm9kZT4gPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LlVJLlVwZGF0ZUluZm9QYW5lbCwgdGhpcy5vblVwZGF0ZUluZm8sIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuRW5lcmd5U3RvcmFnZSwgdGhpcy51cGRhdGFFbmVyZ3ksIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCB0aGlzLm9uVXBkYXRlSW5mbywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5HYW1lQ01ELkVuZXJneVN0b3JhZ2UsIHRoaXMudXBkYXRhRW5lcmd5LCB0aGlzKTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50THZMYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50THZMYWJsZS5zdHJpbmcgPSBg5YWz5Y2hIDogJHtSdW50aW1lTWdyLmlucy5DdXJMZXZlbH1gO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25VcGRhdGVJbmZvKCk7XG4gICAgICAgIHRoaXMuaW5pdENvbGxlY3RUYXJnZXQoKTtcbiAgICAgICAgRW5lcmd5TW9kZWwuaW5zLnNldEN1ckxldmVsKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVXBkYXRlSW5mbygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RlcExhYmxlICYmIEdhbWVNb2RlbC5pbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcExhYmxlLnN0cmluZyA9IGAke0dhbWVNb2RlbC5pbnMuc3RlcExpbWl0fWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2NvcmVMYWJsZSAmJiBOdW1iZXIodGhpcy5zY29yZUxhYmxlLnN0cmluZykgIT0gUnVudGltZU1nci5pbnMuY3VycmVudFNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGFibGUuc3RyaW5nID0gYCR7UnVudGltZU1nci5pbnMuY3VycmVudFNjb3JlfWA7XG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLnNjb3JlTGFibGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgICAgICBhbmltYXRpb24gJiYgYW5pbWF0aW9uLnBsYXkoJ3Njb3JlSnVtcCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Q29sbGVjdFRhcmdldCgpIHtcbiAgICAgICAgY29uc3QgY3MgPSBHYW1lTW9kZWwuaW5zLmdldENvbGxlY3QoKTtcbiAgICAgICAgdGhpcy5jb2xsZXRjdFBvb2wgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChjcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q29udGVudC53aWR0aCA9IFsxNTgsIDIwOCwgMjU4XVtjcy5zaXplIC0gMV07XG4gICAgICAgICAgICBpZiAoY3Muc2l6ZSA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmNvbGxlY3RDb250ZW50LnggKz0gMjUgKiAoY3Muc2l6ZSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGNzLmZvckVhY2goKGNvbGxlY3QsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5jb2xsZWN0SXRlbVByZWZhYik7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUN0cmwgPSBpdGVtLmdldENvbXBvbmVudChDb2xsZWN0SXRlbUN0cmwpO1xuICAgICAgICAgICAgICAgIGl0ZW1DdHJsLmluaXQoa2V5LCBjb2xsZWN0KTtcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMuY29sbGVjdENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZXRjdFBvb2wuc2V0KGtleSwgaXRlbSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/ojrflj5blhbPljaHmloflrZfnmoTkuJbnlYzlnZDmoIdcbiAgICBwdWJsaWMgZ2V0TGV2ZWxMYWJQb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRMdkxhYmxlID8gQ29tbW9uLmdldFdvcmxkUG9zKHRoaXMuY3VycmVudEx2TGFibGUubm9kZSkgOiBudWxsO1xuICAgIH1cblxuICAgIC8v6I635b6X5q2l5pWw5Z2Q5qCHXG4gICAgcHVibGljIGdldFN0ZXBQb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBMYWJsZSA/IENvbW1vbi5nZXRXb3JsZFBvcyh0aGlzLnN0ZXBMYWJsZS5ub2RlKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLy/ojrflj5bmlLbpm4bniannmoRVSeWdkOagh1xuICAgIHB1YmxpYyBnZXRDb2xsZWN0UG9zKHR5cGU6IENlbGxUeXBlIHwgc3RyaW5nKSB7XG4gICAgICAgIGxldCBwb3MgPSBjYy52MigwLCAwKTtcbiAgICAgICAgY29uc3QgY05vZGUgPSB0aGlzLmNvbGxldGN0UG9vbCA/IHRoaXMuY29sbGV0Y3RQb29sLmdldCh0eXBlICsgJycpIDogbnVsbDtcbiAgICAgICAgaWYgKGNOb2RlKSB7XG4gICAgICAgICAgICAvLyBjb25zdCByZWN0ID0gY05vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKClcbiAgICAgICAgICAgIC8vIHBvcyA9IGNjLnYyKHJlY3QueCwgcmVjdC55KTtcbiAgICAgICAgICAgIHBvcyA9IENvbW1vbi5nZXRXb3JsZFBvcyhjTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2dyZXNzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbWF4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgdXBkYXRhRW5lcmd5KHByb2dyZXNzOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWF4KSB7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHRoaXMuZW5lcmd5UHJvZ3Jlc3MucHJvZ3Jlc3MgKiB0aGlzLm1heCk7XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPCB0aGlzLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MrKztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MgPT0gdGhpcy5wcm9ncmVzcyAmJiBwcm9ncmVzcyA9PSB0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MgPj0gdGhpcy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gdGhpcy5wcm9ncmVzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW5lcmd5UHJvZ3Jlc3MucHJvZ3Jlc3MgPSBwcm9ncmVzcyAvIHRoaXMubWF4O1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=