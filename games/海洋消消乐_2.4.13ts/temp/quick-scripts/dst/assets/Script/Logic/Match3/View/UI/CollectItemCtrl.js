
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/UI/CollectItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd795dPvQlNJD47uiGgPm8kD', 'CollectItemCtrl');
// Script/Logic/Match3/View/UI/CollectItemCtrl.ts

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
var ResCtrl_1 = require("../../ResCtrl");
var M_1 = require("../../../../Base/Manager/M");
var GameModel_1 = require("../../Model/GameModel");
var Event_1 = require("../../../Data/Const/Event");
var CollectModel_1 = require("../../Model/CollectModel");
var Constant_1 = require("../../../Data/Const/Constant");
var Common_1 = require("../../../Common/Common");
var RuntimeMgr_1 = require("../../../Data/RuntimeMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CollectItemCtrl = /** @class */ (function (_super) {
    __extends(CollectItemCtrl, _super);
    function CollectItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = null;
        _this.icon = null;
        /**炸弹的单张图 */
        _this.BombStaticFrame = [];
        /**普通元素的图 */
        _this.NormalCellFrame = [];
        /**森林地图的元素图 */
        _this.Map2NormalCellFrame = [];
        /**收集物目标icon */
        _this.CollectIcon = [];
        _this._type = null;
        return _this;
    }
    CollectItemCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateInfoPanel, this.onUpdateCollectCount, this);
    };
    CollectItemCtrl.prototype.init = function (type, count) {
        this._type = type;
        this.icon.spriteFrame = this.getIcon(type);
        var heithLimit = 60;
        if (this.node.name == 'showTargetPrefab') {
            heithLimit = 80;
        }
        this.icon.node.setScale(heithLimit / this.icon.node.height);
        this.count.string = "x" + count;
        M_1.default.event.register(Event_1.Event.UI.UpdateInfoPanel, this.onUpdateCollectCount, this);
    };
    CollectItemCtrl.prototype.changeLabelColor = function (color) {
        if (color === void 0) { color = null; }
        this.count.node.color = color || cc.color(255, 0, 0, 255);
    };
    CollectItemCtrl.prototype.onUpdateCollectCount = function (type) {
        if (type == this._type) {
            var c = GameModel_1.default.ins.getCollect();
            if (c) {
                this.count.string = "" + c.get(type + '');
            }
        }
    };
    CollectItemCtrl.prototype.getIcon = function (type) {
        var index = null;
        var result = null;
        switch (type) {
            case CollectModel_1.CollectType.box:
                index = 0;
                break;
            case CollectModel_1.CollectType.gnome:
                index = 1;
                break;
            case CollectModel_1.CollectType.turtles:
                index = 2;
                break;
            case CollectModel_1.CollectType.tree:
                index = 3;
                break;
            case CollectModel_1.CollectType.crab:
                index = 4;
                break;
            case CollectModel_1.CollectType.stone:
                index = 5;
                break;
            case CollectModel_1.CollectType.gem:
                index = 6;
                break;
            case CollectModel_1.CollectType.firefly:
                index = 7;
                break;
            case CollectModel_1.CollectType.colorbox:
                index = 8;
                break;
        }
        result = this._getRes(type, index);
        return result;
    };
    CollectItemCtrl.prototype._getRes = function (type, index) {
        var result = null;
        if (ResCtrl_1.default.ins) {
            if (index == null) {
                result = ResCtrl_1.default.ins.getCellFrame(type, type);
            }
            else {
                result = ResCtrl_1.default.ins.getCollectFrame(index);
            }
        }
        else {
            if (index == null) {
                result = this._getCellFrame(type, type);
            }
            else {
                result = this._getCollectFrame(index);
            }
        }
        return result;
    };
    CollectItemCtrl.prototype._getCellFrame = function (type, index) {
        var frames = this.NormalCellFrame;
        if (Common_1.default.isBombType(type)) {
            frames = this.BombStaticFrame;
        }
        var frame = frames[index];
        //应急
        if (type < Constant_1.CellType.Bomb1 && RuntimeMgr_1.default.ins.CurBgIndex == 2) {
            var bg2frame = this.Map2NormalCellFrame[index];
            if (bg2frame) {
                frame = bg2frame;
            }
        }
        return frame;
    };
    CollectItemCtrl.prototype._getCollectFrame = function (index) {
        return this.CollectIcon[index];
    };
    __decorate([
        property(cc.Label)
    ], CollectItemCtrl.prototype, "count", void 0);
    __decorate([
        property(cc.Sprite)
    ], CollectItemCtrl.prototype, "icon", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CollectItemCtrl.prototype, "BombStaticFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CollectItemCtrl.prototype, "NormalCellFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CollectItemCtrl.prototype, "Map2NormalCellFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CollectItemCtrl.prototype, "CollectIcon", void 0);
    CollectItemCtrl = __decorate([
        ccclass
    ], CollectItemCtrl);
    return CollectItemCtrl;
}(cc.Component));
exports.default = CollectItemCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVSVxcQ29sbGVjdEl0ZW1DdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyxnREFBMkM7QUFDM0MsbURBQThDO0FBQzlDLG1EQUFrRDtBQUNsRCx5REFBdUQ7QUFDdkQseURBQXdEO0FBQ3hELGlEQUE0QztBQUM1Qyx1REFBa0Q7QUFFNUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUFnSUM7UUE3SEcsV0FBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBRXZCLFlBQVk7UUFFWixxQkFBZSxHQUFxQixFQUFFLENBQUM7UUFDdkMsWUFBWTtRQUVaLHFCQUFlLEdBQXFCLEVBQUUsQ0FBQztRQUN2QyxjQUFjO1FBRWQseUJBQW1CLEdBQXFCLEVBQUUsQ0FBQztRQUMzQyxlQUFlO1FBRWYsaUJBQVcsR0FBcUIsRUFBRSxDQUFDO1FBRTNCLFdBQUssR0FBc0IsSUFBSSxDQUFDOztJQTJHNUMsQ0FBQztJQXpHRyxtQ0FBUyxHQUFUO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSw4QkFBSSxHQUFYLFVBQVksSUFBdUIsRUFBRSxLQUFhO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxVQUFVLEdBQUcsRUFBRSxD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O0lBSXZCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzREQUNZO0lBR3ZDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzREQUNZO0lBR3ZDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dFQUNnQjtJQUczQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3REFDUTtJQW5CbEIsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQWdJbkM7SUFBRCxzQkFBQztDQWhJRCxBQWdJQyxDQWhJNEMsRUFBRSxDQUFDLFNBQVMsR0FnSXhEO2tCQWhJb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNDdHJsIGZyb20gXCIuLi8uLi9SZXNDdHJsXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4uLy4uL01vZGVsL0dhbWVNb2RlbFwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgQ29sbGVjdFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9kZWwvQ29sbGVjdE1vZGVsXCI7XG5pbXBvcnQgeyBDZWxsVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi8uLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgUnVudGltZU1nciBmcm9tIFwiLi4vLi4vLi4vRGF0YS9SdW50aW1lTWdyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdEl0ZW1DdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjb3VudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgLyoq54K45by555qE5Y2V5byg5Zu+ICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgQm9tYlN0YXRpY0ZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgLyoq5pmu6YCa5YWD57Sg55qE5Zu+ICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgTm9ybWFsQ2VsbEZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgLyoq5qOu5p6X5Zyw5Zu+55qE5YWD57Sg5Zu+ICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgTWFwMk5vcm1hbENlbGxGcmFtZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIC8qKuaUtumbhueJqeebruagh2ljb24gKi9cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBDb2xsZWN0SWNvbjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nIHwgQ2VsbFR5cGUgPSBudWxsO1xuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCB0aGlzLm9uVXBkYXRlQ29sbGVjdENvdW50LCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCh0eXBlOiBzdHJpbmcgfCBDZWxsVHlwZSwgY291bnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gdGhpcy5nZXRJY29uKHR5cGUpO1xuICAgICAgICBsZXQgaGVpdGhMaW1pdCA9IDYwO1xuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUgPT0gJ3Nob3dUYXJnZXRQcmVmYWInKSB7XG4gICAgICAgICAgICBoZWl0aExpbWl0ID0gODBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmljb24ubm9kZS5zZXRTY2FsZShoZWl0aExpbWl0IC8gdGhpcy5pY29uLm5vZGUuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jb3VudC5zdHJpbmcgPSBgeCR7Y291bnR9YDtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwsIHRoaXMub25VcGRhdGVDb2xsZWN0Q291bnQsIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGFuZ2VMYWJlbENvbG9yKGNvbG9yOiBjYy5Db2xvciA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb3VudC5ub2RlLmNvbG9yID0gY29sb3IgfHwgY2MuY29sb3IoMjU1LCAwLCAwLCAyNTUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25VcGRhdGVDb2xsZWN0Q291bnQodHlwZTogc3RyaW5nIHwgQ2VsbFR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUgPT0gdGhpcy5fdHlwZSkge1xuICAgICAgICAgICAgY29uc3QgYyA9IEdhbWVNb2RlbC5pbnMuZ2V0Q29sbGVjdCgpO1xuICAgICAgICAgICAgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50LnN0cmluZyA9IGAke2MuZ2V0KHR5cGUgKyAnJyl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SWNvbih0eXBlKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBsZXQgaW5kZXggPSBudWxsO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENvbGxlY3RUeXBlLmJveDpcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbGxlY3RUeXBlLmdub21lOlxuICAgICAgICAgICAgICAgIGluZGV4ID0gMTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBDb2xsZWN0VHlwZS50dXJ0bGVzOlxuICAgICAgICAgICAgICAgIGluZGV4ID0gMjtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBDb2xsZWN0VHlwZS50cmVlOlxuICAgICAgICAgICAgICAgIGluZGV4ID0gMztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBDb2xsZWN0VHlwZS5jcmFiOlxuICAgICAgICAgICAgICAgIGluZGV4ID0gNDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBDb2xsZWN0VHlwZS5zdG9uZTpcbiAgICAgICAgICAgICAgICBpbmRleCA9IDU7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgQ29sbGVjdFR5cGUuZ2VtOlxuICAgICAgICAgICAgICAgIGluZGV4ID0gNjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ29sbGVjdFR5cGUuZmlyZWZseTpcbiAgICAgICAgICAgICAgICBpbmRleCA9IDc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbGxlY3RUeXBlLmNvbG9yYm94OlxuICAgICAgICAgICAgICAgIGluZGV4ID0gODtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSB0aGlzLl9nZXRSZXModHlwZSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFJlcyh0eXBlLCBpbmRleCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKFJlc0N0cmwuaW5zKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFJlc0N0cmwuaW5zLmdldENlbGxGcmFtZSh0eXBlLCB0eXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gUmVzQ3RybC5pbnMuZ2V0Q29sbGVjdEZyYW1lKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZ2V0Q2VsbEZyYW1lKHR5cGUsIHR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9nZXRDb2xsZWN0RnJhbWUoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9nZXRDZWxsRnJhbWUodHlwZTogQ2VsbFR5cGUsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGZyYW1lcyA9IHRoaXMuTm9ybWFsQ2VsbEZyYW1lO1xuICAgICAgICBpZiAoQ29tbW9uLmlzQm9tYlR5cGUodHlwZSkpIHtcbiAgICAgICAgICAgIGZyYW1lcyA9IHRoaXMuQm9tYlN0YXRpY0ZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmcmFtZSA9IGZyYW1lc1tpbmRleF07XG4gICAgICAgIC8v5bqU5oClXG4gICAgICAgIGlmICh0eXBlIDwgQ2VsbFR5cGUuQm9tYjEgJiYgUnVudGltZU1nci5pbnMuQ3VyQmdJbmRleCA9PSAyKSB7XG4gICAgICAgICAgICBjb25zdCBiZzJmcmFtZSA9IHRoaXMuTWFwMk5vcm1hbENlbGxGcmFtZVtpbmRleF07XG4gICAgICAgICAgICBpZiAoYmcyZnJhbWUpIHtcbiAgICAgICAgICAgICAgICBmcmFtZSA9IGJnMmZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX2dldENvbGxlY3RGcmFtZShpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5Db2xsZWN0SWNvbltpbmRleF07XG4gICAgfVxuXG59XG4iXX0=