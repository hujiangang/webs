
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
        this.stepLable.string = "" + GameModel_1.default.ins.stepLimit;
        if (Number(this.scoreLable.string) != RuntimeMgr_1.default.ins.currentScore) {
            this.scoreLable.string = "" + RuntimeMgr_1.default.ins.currentScore;
            this.scoreLable.getComponent(cc.Animation).play('scoreJump');
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
        var pos = Common_1.default.getWorldPos(this.currentLvLable.node);
        return pos;
    };
    //获得步数坐标
    InfoPanelCtrl.prototype.getStepPos = function () {
        return Common_1.default.getWorldPos(this.stepLable.node);
    };
    //获取收集物的UI坐标
    InfoPanelCtrl.prototype.getCollectPos = function (type) {
        var pos = cc.v2(0, 0);
        var cNode = this.colletctPool.get(type + '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVSVxcSW5mb1BhbmVsQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsbURBQThDO0FBQzlDLG1EQUFrRDtBQUNsRCxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBQ2xELHVEQUFzRDtBQUN0RCxpREFBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFtSEM7UUFoSEcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUcvQix1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBRTlCLGtCQUFZLEdBQXlCLElBQUksQ0FBQztRQXlFMUMsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixTQUFHLEdBQVcsQ0FBQyxDQUFDOztJQXFCNUIsQ0FBQztJQTdGRyw4QkFBTSxHQUFOO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTNFLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxlQUFl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QUFFLENBQUMsS0FBSyxDQUFDO29EQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNhO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NERBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7eURBQ2E7SUFsQnJCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FtSGpDO0lBQUQsb0JBQUM7Q0FuSEQsQUFtSEMsQ0FuSDBDLEVBQUUsQ0FBQyxTQUFTLEdBbUh0RDtrQkFuSG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4uLy4uL01vZGVsL0dhbWVNb2RlbFwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IENvbGxlY3RJdGVtQ3RybCBmcm9tIFwiLi9Db2xsZWN0SXRlbUN0cmxcIjtcbmltcG9ydCBSdW50aW1lTWdyIGZyb20gXCIuLi8uLi8uLi9EYXRhL1J1bnRpbWVNZ3JcIjtcbmltcG9ydCB7IEVuZXJneU1vZGVsIH0gZnJvbSBcIi4uLy4uL01vZGVsL0VuZXJneU1vZGVsXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi8uLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgeyBDZWxsVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZvUGFuZWxDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzdGVwTGFibGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjdXJyZW50THZMYWJsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNjb3JlTGFibGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNvbGxlY3RDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgY29sbGVjdEl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgZW5lcmd5UHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29sbGV0Y3RQb29sOiBNYXA8c3RyaW5nLCBjYy5Ob2RlPiA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCB0aGlzLm9uVXBkYXRlSW5mbywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5FbmVyZ3lTdG9yYWdlLCB0aGlzLnVwZGF0YUVuZXJneSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwsIHRoaXMub25VcGRhdGVJbmZvLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuRW5lcmd5U3RvcmFnZSwgdGhpcy51cGRhdGFFbmVyZ3ksIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRMdkxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMdkxhYmxlLnN0cmluZyA9IGDlhbPljaEgOiAke1J1bnRpbWVNZ3IuaW5zLkN1ckxldmVsfWA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblVwZGF0ZUluZm8oKTtcbiAgICAgICAgdGhpcy5pbml0Q29sbGVjdFRhcmdldCgpO1xuICAgICAgICBFbmVyZ3lNb2RlbC5pbnMuc2V0Q3VyTGV2ZWwoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25VcGRhdGVJbmZvKCkge1xuICAgICAgICB0aGlzLnN0ZXBMYWJsZS5zdHJpbmcgPSBgJHtHYW1lTW9kZWwuaW5zLnN0ZXBMaW1pdH1gO1xuICAgICAgICBpZiAoTnVtYmVyKHRoaXMuc2NvcmVMYWJsZS5zdHJpbmcpICE9IFJ1bnRpbWVNZ3IuaW5zLmN1cnJlbnRTY29yZSkge1xuICAgICAgICAgICAgdGhpcy5zY29yZUxhYmxlLnN0cmluZyA9IGAke1J1bnRpbWVNZ3IuaW5zLmN1cnJlbnRTY29yZX1gO1xuICAgICAgICAgICAgdGhpcy5zY29yZUxhYmxlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ3Njb3JlSnVtcCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Q29sbGVjdFRhcmdldCgpIHtcbiAgICAgICAgY29uc3QgY3MgPSBHYW1lTW9kZWwuaW5zLmdldENvbGxlY3QoKTtcbiAgICAgICAgdGhpcy5jb2xsZXRjdFBvb2wgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmIChjcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q29udGVudC53aWR0aCA9IFsxNTgsIDIwOCwgMjU4XVtjcy5zaXplIC0gMV07XG4gICAgICAgICAgICBpZiAoY3Muc2l6ZSA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmNvbGxlY3RDb250ZW50LnggKz0gMjUgKiAoY3Muc2l6ZSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGNzLmZvckVhY2goKGNvbGxlY3QsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5jb2xsZWN0SXRlbVByZWZhYik7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUN0cmwgPSBpdGVtLmdldENvbXBvbmVudChDb2xsZWN0SXRlbUN0cmwpO1xuICAgICAgICAgICAgICAgIGl0ZW1DdHJsLmluaXQoa2V5LCBjb2xsZWN0KTtcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMuY29sbGVjdENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZXRjdFBvb2wuc2V0KGtleSwgaXRlbSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/ojrflj5blhbPljaHmloflrZfnmoTkuJbnlYzlnZDmoIdcbiAgICBwdWJsaWMgZ2V0TGV2ZWxMYWJQb3MoKSB7XG4gICAgICAgIGxldCBwb3MgPSBDb21tb24uZ2V0V29ybGRQb3ModGhpcy5jdXJyZW50THZMYWJsZS5ub2RlKTtcbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICAvL+iOt+W+l+atpeaVsOWdkOagh1xuICAgIHB1YmxpYyBnZXRTdGVwUG9zKCkge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmdldFdvcmxkUG9zKHRoaXMuc3RlcExhYmxlLm5vZGUpXG4gICAgfVxuXG4gICAgLy/ojrflj5bmlLbpm4bniannmoRVSeWdkOagh1xuICAgIHB1YmxpYyBnZXRDb2xsZWN0UG9zKHR5cGU6IENlbGxUeXBlIHwgc3RyaW5nKSB7XG4gICAgICAgIGxldCBwb3MgPSBjYy52MigwLCAwKTtcbiAgICAgICAgY29uc3QgY05vZGUgPSB0aGlzLmNvbGxldGN0UG9vbC5nZXQodHlwZSArICcnKVxuICAgICAgICBpZiAoY05vZGUpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHJlY3QgPSBjTm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKVxuICAgICAgICAgICAgLy8gcG9zID0gY2MudjIocmVjdC54LCByZWN0LnkpO1xuICAgICAgICAgICAgcG9zID0gQ29tbW9uLmdldFdvcmxkUG9zKGNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBtYXg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSB1cGRhdGFFbmVyZ3kocHJvZ3Jlc3M6IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgICAgICB0aGlzLm1heCA9IG1heDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5tYXgpIHtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IE1hdGguZmxvb3IodGhpcy5lbmVyZ3lQcm9ncmVzcy5wcm9ncmVzcyAqIHRoaXMubWF4KTtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8IHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcysrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcyA9PSB0aGlzLnByb2dyZXNzICYmIHByb2dyZXNzID09IHRoaXMubWF4KSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcyA+PSB0aGlzLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbmVyZ3lQcm9ncmVzcy5wcm9ncmVzcyA9IHByb2dyZXNzIC8gdGhpcy5tYXg7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiJdfQ==