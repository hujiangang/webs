
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/OverHightLightCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fce55gWXklC94HtJAPn/viu', 'OverHightLightCtrl');
// Script/Logic/Common/UI/OverHightLightCtrl.ts

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
var GameModel_1 = require("../../Match3/Model/GameModel");
var M_1 = require("../../../Base/Manager/M");
var Event_1 = require("../../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OverHightLightCtrl = /** @class */ (function (_super) {
    __extends(OverHightLightCtrl, _super);
    function OverHightLightCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.countDownNode = null;
        _this.stepNode = null;
        _this.stepLabel = null;
        _this.countDownLabel = null;
        _this._animation = null;
        return _this;
    }
    OverHightLightCtrl.prototype.onLoad = function () {
        this._animation = this.getComponent(cc.Animation);
    };
    OverHightLightCtrl.prototype.onDestroy = function () {
        this.unscheduleAllCallbacks();
    };
    OverHightLightCtrl.prototype.showStepNode = function () {
        this.stepNode.scale = 1;
        this.countDownNode.active = false;
    };
    OverHightLightCtrl.prototype.showCountDown = function () {
        var _this = this;
        //开始减少步数
        var currentCount = this.stepLabel.string;
        this.schedule(function () {
            _this.stepLabel.string = (Number(_this.stepLabel.string) - 1).toString();
            //减少到0,展示倒计时
            if (_this.stepLabel.string == '0') {
                _this.countDownNode.active = true;
                _this._animation.play('gameOverCountdown');
                _this._startCountDown();
            }
        }, 0.03, Number(currentCount));
    };
    OverHightLightCtrl.prototype._startCountDown = function () {
        var _this = this;
        var count = GameModel_1.default.ins.stepLimit + 5;
        this.countDownLabel.string = count.toString();
        M_1.default.event.send(Event_1.Event.GameCMD.GameOverFall);
        this.schedule(function () {
            _this.countDownLabel.string = (Number(_this.countDownLabel.string) - 1).toString();
            if (_this.countDownLabel.string == '0') {
                console.error('倒计时结束,进去结算界面!');
                M_1.default.event.send(Event_1.Event.GameCMD.ShowGameResult, true);
            }
        }, 1, count - 1);
    };
    __decorate([
        property(cc.Node)
    ], OverHightLightCtrl.prototype, "countDownNode", void 0);
    __decorate([
        property(cc.Node)
    ], OverHightLightCtrl.prototype, "stepNode", void 0);
    __decorate([
        property(cc.Label)
    ], OverHightLightCtrl.prototype, "stepLabel", void 0);
    __decorate([
        property(cc.Label)
    ], OverHightLightCtrl.prototype, "countDownLabel", void 0);
    OverHightLightCtrl = __decorate([
        ccclass
    ], OverHightLightCtrl);
    return OverHightLightCtrl;
}(cc.Component));
exports.default = OverHightLightCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcT3ZlckhpZ2h0TGlnaHRDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFxRDtBQUNyRCw2Q0FBd0M7QUFDeEMsZ0RBQStDO0FBRXpDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWdELHNDQUFZO0lBQTVEO1FBQUEscUVBMkRDO1FBeERHLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFpQixJQUFJLENBQUM7O0lBNEM1QyxDQUFDO0lBMUNHLG1DQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXRELENBQUM7SUFFRCxzQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLHlDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBRU0sMENBQWEsR0FBcEI7UUFBQSxpQkFZQztRQVhHLFFBQVE7UUFDUixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2RSxZQUFZO1lBQ1osSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7Z0JBQzlCLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQzFCO1FBQ0wsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU8sNENBQWUsR0FBdkI7UUFBQSxpQkFXQztRQVZHLElBQU0sS0FBSyxHQUFHLG1CQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlDLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakYsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQy9CLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3BEO1FBQ0wsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQXRERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhEQUNhO0lBWmYsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0EyRHRDO0lBQUQseUJBQUM7Q0EzREQsQUEyREMsQ0EzRCtDLEVBQUUsQ0FBQyxTQUFTLEdBMkQzRDtrQkEzRG9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4uLy4uL01hdGNoMy9Nb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3ZlckhpZ2h0TGlnaHRDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNvdW50RG93bk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3RlcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHN0ZXBMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvdW50RG93bkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIHByaXZhdGUgX2FuaW1hdGlvbjogY2MuQW5pbWF0aW9uID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuXG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd1N0ZXBOb2RlKCkge1xuICAgICAgICB0aGlzLnN0ZXBOb2RlLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5jb3VudERvd25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93Q291bnREb3duKCkge1xuICAgICAgICAvL+W8gOWni+WHj+WwkeatpeaVsFxuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSB0aGlzLnN0ZXBMYWJlbC5zdHJpbmc7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGVwTGFiZWwuc3RyaW5nID0gKE51bWJlcih0aGlzLnN0ZXBMYWJlbC5zdHJpbmcpIC0gMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIC8v5YeP5bCR5YiwMCzlsZXnpLrlgJLorqHml7ZcbiAgICAgICAgICAgIGlmICh0aGlzLnN0ZXBMYWJlbC5zdHJpbmcgPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudERvd25Ob2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoJ2dhbWVPdmVyQ291bnRkb3duJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRDb3VudERvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMC4wMywgTnVtYmVyKGN1cnJlbnRDb3VudCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N0YXJ0Q291bnREb3duKCkge1xuICAgICAgICBjb25zdCBjb3VudCA9IEdhbWVNb2RlbC5pbnMuc3RlcExpbWl0ICsgNTtcbiAgICAgICAgdGhpcy5jb3VudERvd25MYWJlbC5zdHJpbmcgPSBjb3VudC50b1N0cmluZygpO1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuR2FtZUNNRC5HYW1lT3ZlckZhbGwpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY291bnREb3duTGFiZWwuc3RyaW5nID0gKE51bWJlcih0aGlzLmNvdW50RG93bkxhYmVsLnN0cmluZykgLSAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY291bnREb3duTGFiZWwuc3RyaW5nID09ICcwJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+WAkuiuoeaXtue7k+adnyzov5vljrvnu5PnrpfnlYzpnaIhJyk7XG4gICAgICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkdhbWVDTUQuU2hvd0dhbWVSZXN1bHQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxLCBjb3VudCAtIDEpO1xuICAgIH1cblxufVxuIl19