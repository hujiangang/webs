
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/LevelMap/ChapterItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e5d46FzdJpKuoZJKYplD7QH', 'ChapterItemCtrl');
// Script/Views/LevelMap/ChapterItemCtrl.ts

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
var Common_1 = require("../../Logic/Common/Common");
var Paths_1 = require("../../Base/Utils/Paths");
var M_1 = require("../../Base/Manager/M");
var EventMgr_1 = require("../../Base/Manager/EventMgr");
var Event_1 = require("../../Logic/Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ContentOffsetX = 120;
var ChapterItemCtrl = /** @class */ (function (_super) {
    __extends(ChapterItemCtrl, _super);
    function ChapterItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.islandParent = null;
        _this.content = null;
        _this.lvScope = null;
        _this.chapterName = null;
        _this.detailLab = null;
        _this.lockNode = null;
        _this.infoNode = null;
        _this._data = null;
        _this._isLocked = false;
        _this._clickCallBack = null;
        return _this;
    }
    ChapterItemCtrl.prototype.init = function (data, isLandScale, clickCallback) {
        if (isLandScale === void 0) { isLandScale = 1; }
        this.lockNode.active = false;
        if (data) {
            this._data = data;
            this.chapterName.string = data.name;
            this.detailLab.string = data.detail;
            this.islandParent.scale = isLandScale;
            this._clickCallBack = clickCallback;
            this.lockNode.scale = isLandScale;
            this.lvScope.string = data.minLv + "-" + data.maxLv + "\u5173";
            this.lockNode.active = this._isLocked = (M_1.default.runtime.getMatch3Level() < data.minLv);
            this._initIsland(data.resId);
        }
    };
    ChapterItemCtrl.prototype._onClick = function () {
        if (this._data && !this._isLocked) {
            this._clickCallBack && this._clickCallBack(this._data);
            // M.event.send(Event.UI.ShowSelectLevelView, this._data);
        }
    };
    ChapterItemCtrl.prototype._initIsland = function (resId) {
        var _this = this;
        Common_1.default.getRes(Paths_1.default.LevelMapPath + "island_" + resId, cc.Prefab).then(function (eff) {
            if (eff) {
                var island = M_1.default.nodePool.createItem(eff);
                island.parent = _this.islandParent;
                island.on(cc.Node.EventType.TOUCH_END, _this._onClick, _this);
                _this.infoNode.active = false;
                if (_this.islandParent.scale != 1) {
                    _this._setIslandOffset(Number(resId));
                }
                _this._showLock(island);
            }
            else {
                console.error('章节岛屿加载失败!');
            }
        });
    };
    ChapterItemCtrl.prototype._showLock = function (islandNode) {
        if (this._isLocked) {
            islandNode.getComponent(cc.Button).interactable = false;
            this.chapterName.getComponent(cc.LabelOutline).enabled = true;
        }
        else {
            islandNode.getComponent(cc.Button).interactable = true;
            this.chapterName.getComponent(cc.LabelOutline).enabled = false;
        }
    };
    ChapterItemCtrl.prototype._setIslandOffset = function (resId) {
        this.infoNode.active = true;
        if (resId % 2 == 0) {
            this.node.x += ContentOffsetX;
        }
        else {
            this.node.x += -ContentOffsetX;
        }
    };
    ChapterItemCtrl.prototype.doCloudUnlock = function () {
        var _this = this;
        this.lockNode.active = true;
        this.scheduleOnce(function () {
            var animation = _this.lockNode.getComponent(cc.Animation);
            animation.play();
            EventMgr_1.default.ins.send(Event_1.Event.UI.LevelSceneTouched, true);
        }, 1.5);
    };
    ChapterItemCtrl.prototype.onFinished = function () {
        console.error("播放解锁动画完毕");
        this.lockNode.active = false;
    };
    __decorate([
        property(cc.Sprite)
    ], ChapterItemCtrl.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItemCtrl.prototype, "islandParent", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItemCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Label)
    ], ChapterItemCtrl.prototype, "lvScope", void 0);
    __decorate([
        property(cc.Label)
    ], ChapterItemCtrl.prototype, "chapterName", void 0);
    __decorate([
        property(cc.Label)
    ], ChapterItemCtrl.prototype, "detailLab", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItemCtrl.prototype, "lockNode", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItemCtrl.prototype, "infoNode", void 0);
    ChapterItemCtrl = __decorate([
        ccclass
    ], ChapterItemCtrl);
    return ChapterItemCtrl;
}(cc.Component));
exports.default = ChapterItemCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcTGV2ZWxNYXBcXENoYXB0ZXJJdGVtQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvREFBK0M7QUFDL0MsZ0RBQTJDO0FBQzNDLDBDQUFxQztBQUNyQyx3REFBbUQ7QUFDbkQsc0RBQXFEO0FBRS9DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLElBQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUczQjtJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXVHQztRQXBHRyxRQUFFLEdBQWMsSUFBSSxDQUFDO1FBR3JCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsYUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUVqQixXQUFLLEdBQWdCLElBQUksQ0FBQztRQUMxQixlQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLG9CQUFjLEdBQWEsSUFBSSxDQUFDOztJQTJFNUMsQ0FBQztJQXpFVSw4QkFBSSxHQUFYLFVBQVksSUFBaUIsRUFBRSxXQUF1QixFQUFFLGFBQXdCO1FBQWpELDRCQUFBLEVBQUEsZUFBdUI7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztZQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQU0sSUFBSSxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsS0FBSyxXQUFHLENBQUM7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLFdBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVPLGtDQUFRLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMvQixJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXZELDBEQUEwRDtTQUM3RDtJQUNMLENBQUM7SUFFTyxxQ0FBVyxHQUFuQixVQUFvQixLQUFhO1FBQWpDLGlCQWdCQztRQWZHLGdCQUFNLENBQUMsTUFBTSxDQUFJLGVBQUssQ0FBQyxZQUFZLGVBQVUsS0FBTyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ3JFLElBQUksR0FBRyxFQUFFO2dCQUNMLElBQU0sTUFBTSxHQUFHLFdBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLENBQUM7Z0JBQzVELEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFFN0IsSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7b0JBQzlCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sbUNBQVMsR0FBakIsVUFBa0IsVUFBbUI7UUFDakMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDakU7YUFBTTtZQUNILFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRU8sMENBQWdCLEdBQXhCLFVBQXlCLEtBQWE7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFTSx1Q0FBYSxHQUFwQjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLGtCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTSxvQ0FBVSxHQUFqQjtRQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFuR0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDQztJQUdyQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDTTtJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNVO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNPO0lBeEJSLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0F1R25DO0lBQUQsc0JBQUM7Q0F2R0QsQUF1R0MsQ0F2RzRDLEVBQUUsQ0FBQyxTQUFTLEdBdUd4RDtrQkF2R29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2hhcHRlckluZm8gZnJvbSBcIi4uLy4uL0Jhc2UvVGFibHMvQ2hhcHRlckluZm9cIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0xvZ2ljL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBQYXRocyBmcm9tIFwiLi4vLi4vQmFzZS9VdGlscy9QYXRoc1wiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vTG9naWMvRGF0YS9Db25zdC9FdmVudFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuY29uc3QgQ29udGVudE9mZnNldFggPSAxMjA7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFwdGVySXRlbUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBiZzogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGlzbGFuZFBhcmVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsdlNjb3BlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY2hhcHRlck5hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkZXRhaWxMYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvY2tOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGluZm9Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2RhdGE6IENoYXB0ZXJJbmZvID0gbnVsbDtcbiAgICBwcml2YXRlIF9pc0xvY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2NsaWNrQ2FsbEJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcblxuICAgIHB1YmxpYyBpbml0KGRhdGE6IENoYXB0ZXJJbmZvLCBpc0xhbmRTY2FsZTogbnVtYmVyID0gMSwgY2xpY2tDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubG9ja05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMuY2hhcHRlck5hbWUuc3RyaW5nID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgdGhpcy5kZXRhaWxMYWIuc3RyaW5nID0gZGF0YS5kZXRhaWw7XG4gICAgICAgICAgICB0aGlzLmlzbGFuZFBhcmVudC5zY2FsZSA9IGlzTGFuZFNjYWxlO1xuICAgICAgICAgICAgdGhpcy5fY2xpY2tDYWxsQmFjayA9IGNsaWNrQ2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLmxvY2tOb2RlLnNjYWxlID0gaXNMYW5kU2NhbGU7XG4gICAgICAgICAgICB0aGlzLmx2U2NvcGUuc3RyaW5nID0gYCR7ZGF0YS5taW5Mdn0tJHtkYXRhLm1heEx2feWFs2A7XG4gICAgICAgICAgICB0aGlzLmxvY2tOb2RlLmFjdGl2ZSA9IHRoaXMuX2lzTG9ja2VkID0gKE0ucnVudGltZS5nZXRNYXRjaDNMZXZlbCgpIDwgZGF0YS5taW5Mdik7XG4gICAgICAgICAgICB0aGlzLl9pbml0SXNsYW5kKGRhdGEucmVzSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25DbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgJiYgIXRoaXMuX2lzTG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGlja0NhbGxCYWNrICYmIHRoaXMuX2NsaWNrQ2FsbEJhY2sodGhpcy5fZGF0YSk7XG5cbiAgICAgICAgICAgIC8vIE0uZXZlbnQuc2VuZChFdmVudC5VSS5TaG93U2VsZWN0TGV2ZWxWaWV3LCB0aGlzLl9kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRJc2xhbmQocmVzSWQ6IHN0cmluZykge1xuICAgICAgICBDb21tb24uZ2V0UmVzKGAke1BhdGhzLkxldmVsTWFwUGF0aH1pc2xhbmRfJHtyZXNJZH1gLCBjYy5QcmVmYWIpLnRoZW4oZWZmID0+IHtcbiAgICAgICAgICAgIGlmIChlZmYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc2xhbmQgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0oZWZmKTtcbiAgICAgICAgICAgICAgICBpc2xhbmQucGFyZW50ID0gdGhpcy5pc2xhbmRQYXJlbnQ7XG4gICAgICAgICAgICAgICAgaXNsYW5kLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25DbGljaywgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvTm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzbGFuZFBhcmVudC5zY2FsZSAhPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldElzbGFuZE9mZnNldChOdW1iZXIocmVzSWQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd0xvY2soaXNsYW5kKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign56ug6IqC5bKb5bG/5Yqg6L295aSx6LSlIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93TG9jayhpc2xhbmROb2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xvY2tlZCkge1xuICAgICAgICAgICAgaXNsYW5kTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hhcHRlck5hbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpc2xhbmROb2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNoYXB0ZXJOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NldElzbGFuZE9mZnNldChyZXNJZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaW5mb05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHJlc0lkICUgMiA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCArPSBDb250ZW50T2Zmc2V0WDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IC1Db250ZW50T2Zmc2V0WDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkb0Nsb3VkVW5sb2NrKCkge1xuICAgICAgICB0aGlzLmxvY2tOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSB0aGlzLmxvY2tOb2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICAgICAgYW5pbWF0aW9uLnBsYXkoKTtcbiAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LlVJLkxldmVsU2NlbmVUb3VjaGVkLCB0cnVlKTtcbiAgICAgICAgfSwgMS41KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25GaW5pc2hlZCgpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuaSreaUvuino+mUgeWKqOeUu+WujOavlVwiKTtcbiAgICAgICAgdGhpcy5sb2NrTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=