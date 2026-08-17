
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/ResCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7437pZvS9EEJ35BYoXCOAy', 'ResCtrl');
// Script/Logic/Match3/ResCtrl.ts

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
var Constant_1 = require("../Data/Const/Constant");
var RuntimeMgr_1 = require("../Data/RuntimeMgr");
var Common_1 = require("../Common/Common");
var GameModel_1 = require("./Model/GameModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ResCtrl = /** @class */ (function (_super) {
    __extends(ResCtrl, _super);
    function ResCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**炸弹背后闪烁的背景方框 */
        _this.BombFlashingBg = [];
        /**炸弹的单张图 */
        _this.BombStaticFrame = [];
        /**普通元素的图 */
        _this.NormalCellFrame = [];
        /**珍珠的单图 */
        _this.pearlFrame = null;
        /**森林地图的元素图 */
        _this.Map2NormalCellFrame = [];
        /**特殊元素的动画文件 */
        _this.CellPrefab = [];
        /**锁链的图 */
        _this.lockFrames = [];
        /**木箱的图 */
        _this.boxFrames = [];
        /**冰块的图 */
        _this.iceFrames = [];
        /**石头的图 */
        _this.stoneFrames = [];
        /**草地的图 */
        _this.LeaveFrames = [];
        /**可移动土地的等级图 */
        _this.GroundFrames = [];
        /**宝石的图 */
        _this.GemFrames = [];
        /**花花的图 */
        _this.FlowerFrames = [];
        /**萤火虫的图,后期可能会改成动画 */
        _this.FireflyFrames = [];
        /**收集物目标icon */
        _this.CollectIcon = [];
        /**复杂地块(可移动土地的包边图) */
        _this.groundPrefabs = [];
        /**移动土地中间的地块! */
        _this.groundCenter = null;
        /**移动土地中间的地块! */
        _this.tuituji = null;
        /**小火箭的图 */
        _this.rocketPrefab = null;
        /**蘑菇 */
        _this.mushroomFrames = [];
        return _this;
    }
    ResCtrl_1 = ResCtrl;
    ResCtrl.prototype.onLoad = function () {
        ResCtrl_1.ins = this;
    };
    ResCtrl.prototype.onDestroy = function () {
        ResCtrl_1.ins = null;
    };
    ResCtrl.prototype.getCellPrefab = function (index) {
        return this.CellPrefab[index];
    };
    ResCtrl.prototype.getBombBg = function (index) {
        return this.BombFlashingBg[index];
    };
    ResCtrl.prototype.getCellFrame = function (type, index) {
        var frames = this.NormalCellFrame;
        if (Common_1.default.isBombType(type)) {
            frames = this.BombStaticFrame;
        }
        var frame = frames[index];
        if (type == Constant_1.CellType.Flower && GameModel_1.default.ins.HaveFlowers) {
            frame = this.pearlFrame;
        }
        //应急
        if (type < Constant_1.CellType.Bomb1 && RuntimeMgr_1.default.ins.CurBgIndex == 2) {
            var bg2frame = this.Map2NormalCellFrame[index];
            if (bg2frame) {
                frame = bg2frame;
            }
        }
        return frame;
    };
    ResCtrl.prototype.getLockFrame = function (index) {
        return this.lockFrames[index];
    };
    ResCtrl.prototype.getBoxFrame = function (index, type) {
        if (type === void 0) { type = null; }
        var area = 0;
        if (type != null) {
            area = (type + 1) * 3;
        }
        return this.boxFrames[area + index];
    };
    ResCtrl.prototype.getIceFrame = function (index) {
        return this.iceFrames[index];
    };
    ResCtrl.prototype.getStoneFrame = function (index) {
        return this.stoneFrames[index];
    };
    ResCtrl.prototype.getLeavesFrame = function (index) {
        return this.LeaveFrames[index];
    };
    ResCtrl.prototype.getGroundFrame = function (index) {
        return this.GroundFrames[index];
    };
    ResCtrl.prototype.getFlowerFrame = function (index) {
        return this.FlowerFrames[index];
    };
    ResCtrl.prototype.getFirefly = function (index) {
        return this.FireflyFrames[index];
    };
    ResCtrl.prototype.getGemFrame = function (index) {
        return this.GemFrames[index];
    };
    ResCtrl.prototype.getCollectFrame = function (index) {
        return this.CollectIcon[index];
    };
    ResCtrl.prototype.getGroundBorderPrefab = function (index) {
        return this.groundPrefabs[index];
    };
    ResCtrl.prototype.getRoketPrefab = function () {
        return this.rocketPrefab;
    };
    ResCtrl.prototype.getMushroomFrame = function (index) {
        return this.mushroomFrames[index];
    };
    var ResCtrl_1;
    ResCtrl.ins = null;
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "BombFlashingBg", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "BombStaticFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "NormalCellFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ResCtrl.prototype, "pearlFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "Map2NormalCellFrame", void 0);
    __decorate([
        property([cc.Prefab])
    ], ResCtrl.prototype, "CellPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "lockFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "boxFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "iceFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "stoneFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "LeaveFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "GroundFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "GemFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "FlowerFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "FireflyFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "CollectIcon", void 0);
    __decorate([
        property([cc.Prefab])
    ], ResCtrl.prototype, "groundPrefabs", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ResCtrl.prototype, "groundCenter", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ResCtrl.prototype, "tuituji", void 0);
    __decorate([
        property(cc.Prefab)
    ], ResCtrl.prototype, "rocketPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "mushroomFrames", void 0);
    ResCtrl = ResCtrl_1 = __decorate([
        ccclass
    ], ResCtrl);
    return ResCtrl;
}(cc.Component));
exports.default = ResCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxSZXNDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRDtBQUNsRCxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLCtDQUEwQztBQUVwQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQStKQztRQTdKRyxpQkFBaUI7UUFFakIsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBQ3RDLFlBQVk7UUFFWixxQkFBZSxHQUFxQixFQUFFLENBQUM7UUFDdkMsWUFBWTtRQUVaLHFCQUFlLEdBQXFCLEVBQUUsQ0FBQztRQUN2QyxXQUFXO1FBRVgsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBQ2xDLGNBQWM7UUFFZCx5QkFBbUIsR0FBcUIsRUFBRSxDQUFDO1FBQzNDLGVBQWU7UUFFZixnQkFBVSxHQUFnQixFQUFFLENBQUM7UUFDN0IsVUFBVTtRQUVWLGdCQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUNsQyxVQUFVO1FBRVYsZUFBUyxHQUFxQixFQUFFLENBQUM7UUFDakMsVUFBVTtRQUVWLGVBQVMsR0FBcUIsRUFBRSxDQUFDO1FBQ2pDLFVBQVU7UUFFVixpQkFBVyxHQUFxQixFQUFFLENBQUM7UUFDbkMsVUFBVTtRQUVWLGlCQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUNuQyxlQUFlO1FBRWYsa0JBQVksR0FBcUIsRUFBRSxDQUFDO1FBQ3BDLFVBQVU7UUFFVixlQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUNqQyxVQUFVO1FBRVYsa0JBQVksR0FBcUIsRUFBRSxDQUFDO1FBQ3BDLHFCQUFxQjtRQUVyQixtQkFBYSxHQUFxQixFQUFFLENBQUM7UUFDckMsZUFBZTtRQUVmLGlCQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUNu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SmhEO2tCQS9Kb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENlbGxUeXBlIH0gZnJvbSBcIi4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBSdW50aW1lTWdyIGZyb20gXCIuLi9EYXRhL1J1bnRpbWVNZ3JcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4vTW9kZWwvR2FtZU1vZGVsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8qKueCuOW8ueiDjOWQjumXqueDgeeahOiDjOaZr+aWueahhiAqL1xuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIEJvbWJGbGFzaGluZ0JnOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgLyoq54K45by555qE5Y2V5byg5Zu+ICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgQm9tYlN0YXRpY0ZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgLyoq5pmu6YCa5YWD57Sg55qE5Zu+ICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgTm9ybWFsQ2VsbEZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgLyoq54+N54+g55qE5Y2V5Zu+ICovXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHBlYXJsRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAvKirmo67mnpflnLDlm77nmoTlhYPntKDlm74gKi9cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBNYXAyTm9ybWFsQ2VsbEZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgLyoq54m55q6K5YWD57Sg55qE5Yqo55S75paH5Lu2ICovXG4gICAgQHByb3BlcnR5KFtjYy5QcmVmYWJdKVxuICAgIENlbGxQcmVmYWI6IGNjLlByZWZhYltdID0gW107XG4gICAgLyoq6ZSB6ZO+55qE5Zu+ICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgbG9ja0ZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIC8qKuacqOeuseeahOWbviAqL1xuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGJveEZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIC8qKuWGsOWdl+eahOWbviAqL1xuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGljZUZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIC8qKuefs+WktOeahOWbviAqL1xuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHN0b25lRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgLyoq6I2J5Zyw55qE5Zu+ICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgTGVhdmVGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICAvKirlj6/np7vliqjlnJ/lnLDnmoTnrYnnuqflm74gKi9cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBHcm91bmRGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICAvKirlrp3nn7PnmoTlm74gKi9cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBHZW1GcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICAvKiroirHoirHnmoTlm74gKi9cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBGbG93ZXJGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICAvKirokKTngavomavnmoTlm74s5ZCO5pyf5Y+v6IO95Lya5pS55oiQ5Yqo55S7ICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgRmlyZWZseUZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIC8qKuaUtumbhueJqeebruagh2ljb24gKi9cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBDb2xsZWN0SWNvbjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIC8qKuWkjeadguWcsOWdlyjlj6/np7vliqjlnJ/lnLDnmoTljIXovrnlm74pICovXG4gICAgQHByb3BlcnR5KFtjYy5QcmVmYWJdKVxuICAgIGdyb3VuZFByZWZhYnM6IGNjLlByZWZhYltdID0gW107XG4gICAgLyoq56e75Yqo5Zyf5Zyw5Lit6Ze055qE5Zyw5Z2XISAqL1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBncm91bmRDZW50ZXI6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAvKirnp7vliqjlnJ/lnLDkuK3pl7TnmoTlnLDlnZchICovXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHR1aXR1amk6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAvKirlsI/ngavnrq3nmoTlm74gKi9cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHJvY2tldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIC8qKuiYkeiPhyAqL1xuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIG11c2hyb29tRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwdWJsaWMgc3RhdGljIGluczogUmVzQ3RybCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIFJlc0N0cmwuaW5zID0gdGhpcztcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIFJlc0N0cmwuaW5zID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2VsbFByZWZhYihpbmRleDogbnVtYmVyKTogY2MuUHJlZmFiIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuQ2VsbFByZWZhYltpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEJvbWJCZyhpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5Cb21iRmxhc2hpbmdCZ1tpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldENlbGxGcmFtZSh0eXBlOiBDZWxsVHlwZSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBsZXQgZnJhbWVzID0gdGhpcy5Ob3JtYWxDZWxsRnJhbWU7XG4gICAgICAgIGlmIChDb21tb24uaXNCb21iVHlwZSh0eXBlKSkge1xuICAgICAgICAgICAgZnJhbWVzID0gdGhpcy5Cb21iU3RhdGljRnJhbWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZyYW1lID0gZnJhbWVzW2luZGV4XTtcbiAgICAgICAgaWYgKHR5cGUgPT0gQ2VsbFR5cGUuRmxvd2VyICYmIEdhbWVNb2RlbC5pbnMuSGF2ZUZsb3dlcnMpIHtcbiAgICAgICAgICAgIGZyYW1lID0gdGhpcy5wZWFybEZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIC8v5bqU5oClXG4gICAgICAgIGlmICh0eXBlIDwgQ2VsbFR5cGUuQm9tYjEgJiYgUnVudGltZU1nci5pbnMuQ3VyQmdJbmRleCA9PSAyKSB7XG4gICAgICAgICAgICBjb25zdCBiZzJmcmFtZSA9IHRoaXMuTWFwMk5vcm1hbENlbGxGcmFtZVtpbmRleF07XG4gICAgICAgICAgICBpZiAoYmcyZnJhbWUpIHtcbiAgICAgICAgICAgICAgICBmcmFtZSA9IGJnMmZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TG9ja0ZyYW1lKGluZGV4OiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2tGcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCb3hGcmFtZShpbmRleDogbnVtYmVyLCB0eXBlOiBudW1iZXIgPSBudWxsKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBsZXQgYXJlYSA9IDA7XG4gICAgICAgIGlmICh0eXBlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFyZWEgPSAodHlwZSArIDEpICogM1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJveEZyYW1lc1thcmVhICsgaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJY2VGcmFtZShpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5pY2VGcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTdG9uZUZyYW1lKGluZGV4OiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b25lRnJhbWVzW2luZGV4XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGVhdmVzRnJhbWUoaW5kZXg6IG51bWJlcik6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuTGVhdmVGcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRHcm91bmRGcmFtZShpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5Hcm91bmRGcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGbG93ZXJGcmFtZShpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5GbG93ZXJGcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGaXJlZmx5KGluZGV4OiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIHJldHVybiB0aGlzLkZpcmVmbHlGcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRHZW1GcmFtZShpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gdGhpcy5HZW1GcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb2xsZWN0RnJhbWUoaW5kZXg6IG51bWJlcik6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuQ29sbGVjdEljb25baW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRHcm91bmRCb3JkZXJQcmVmYWIoaW5kZXg6IG51bWJlcik6IGNjLlByZWZhYiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VuZFByZWZhYnNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSb2tldFByZWZhYigpOiBjYy5QcmVmYWIge1xuICAgICAgICByZXR1cm4gdGhpcy5yb2NrZXRQcmVmYWJcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TXVzaHJvb21GcmFtZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11c2hyb29tRnJhbWVzW2luZGV4XTtcbiAgICB9XG59XG4iXX0=