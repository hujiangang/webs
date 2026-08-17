
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/Comp/Tuituji.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe2d6aFTExKyKsPIJkJvLWp', 'Tuituji');
// Script/Logic/Match3/View/Comp/Tuituji.ts

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
var GameModel_1 = require("../../Model/GameModel");
var GroupAnimatCtrl_1 = require("../../../Common/GroupAnimatCtrl");
var Constant_1 = require("../../../Data/Const/Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Dirs = { 0: cc.v2(1, 0), 90: cc.v2(0, 1), 180: cc.v2(-1, 0), 270: cc.v2(0, -1) };
var Speed = 2.5;
var Tuituji = /** @class */ (function (_super) {
    __extends(Tuituji, _super);
    function Tuituji() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prog = null;
        _this.body = null;
        _this.bodyFrames = [];
        _this._cfg = null;
        _this._dir = null;
        _this._count = 0;
        _this._uiNode = null;
        return _this;
    }
    Tuituji.prototype.onLoad = function () {
    };
    Tuituji.prototype.init = function (cfg) {
        this._cfg = cfg;
        this._count = 0;
        this._dir = Dirs[this._cfg.degree];
        this.node.angle = (cfg.degree - 90);
        this.prog.node.angle = -this.node.angle;
        this.body.spriteFrame = this.bodyFrames[this._cfg.type];
        this._updateProgress();
    };
    Tuituji.prototype._updateProgress = function () {
        this.prog.progress = this._count / this._cfg.count;
        if (this._count >= this._cfg.count) {
            this._exec();
        }
    };
    Tuituji.prototype._exec = function () {
        console.error('收集完成,开始执行->');
        // this.prog.node.active = false;
        var groundCell = GameModel_1.default.ins.CollectModel.collectPowerCells["" + this._cfg.type];
        groundCell.freeThisPos();
        //改变元素的层级!
        delete GameModel_1.default.ins.CollectModel.collectPowerCells["" + this._cfg.type];
        //往一个方向一直跑!
        this._runMove();
    };
    Tuituji.prototype._runMove = function () {
        var _this = this;
        //确定方向! 
        if (this._dir) {
            var a0 = cc.delayTime(0.3);
            var a1 = cc.callFunc(function () {
                _this._elimate();
            });
            var a2 = cc.moveTo(Speed, cc.v2(this._dir.x * 2000, this._dir.y * 2000));
            var a3 = cc.callFunc(function () {
                _this.node.destroy();
            });
            this.node.runAction(cc.sequence(a0, a1, a2, a3));
        }
    };
    Tuituji.prototype._elimate = function () {
        var _this = this;
        var pos = cc.v2(this._cfg.x, this._cfg.y);
        var timeLine = GroupAnimatCtrl_1.default.ins.createTimeLine();
        if (this._dir.x != 0) {
            //拿横的
            for (var i = 0; i < GameModel_1.default.GridSize.W; i++) {
                timeLine.add(gsap.TweenLite.delayedCall(0.1, function (p) {
                    GameModel_1.default.ins.execElimateOneAtAll(p, Constant_1.ElimateType.Tuituji, _this._cfg.type);
                }, [pos.add(this._dir.scale(cc.v2(i, 0)))]));
            }
        }
        else if (this._dir.y != 0) {
            //拿竖的
            for (var i = 0; i < GameModel_1.default.GridSize.H; i++) {
                timeLine.add(gsap.TweenLite.delayedCall(0.1, function (p) {
                    GameModel_1.default.ins.execElimateOneAtAll(p, Constant_1.ElimateType.Tuituji, _this._cfg.type);
                }, [pos.add(this._dir.scale(cc.v2(0, -i)))]));
            }
        }
    };
    Tuituji.prototype.collectItem = function () {
        this._count++;
        this._updateProgress();
    };
    __decorate([
        property(cc.ProgressBar)
    ], Tuituji.prototype, "prog", void 0);
    __decorate([
        property(cc.Sprite)
    ], Tuituji.prototype, "body", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Tuituji.prototype, "bodyFrames", void 0);
    Tuituji = __decorate([
        ccclass
    ], Tuituji);
    return Tuituji;
}(cc.Component));
exports.default = Tuituji;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxDb21wXFxUdWl0dWppLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUE4QztBQUU5QyxtRUFBOEQ7QUFDOUQseURBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZGLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUdsQjtJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQXlGQztRQXRGRyxVQUFJLEdBQW1CLElBQUksQ0FBQztRQUc1QixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLGdCQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUUxQixVQUFJLEdBQWUsSUFBSSxDQUFDO1FBQ3hCLFVBQUksR0FBWSxJQUFJLENBQUM7UUFDckIsWUFBTSxHQUFHLENBQUMsQ0FBQztRQUVYLGFBQU8sR0FBWSxJQUFJLENBQUM7O0lBMEVwQyxDQUFDO0lBeEVHLHdCQUFNLEdBQU47SUFFQSxDQUFDO0lBRU0sc0JBQUksR0FBWCxVQUFZLEdBQWU7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFD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QUNKO0lBQ0wsQ0FBQztJQUVNLDZCQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFyRkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt5Q0FDRztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3lDQUNHO0lBR3ZCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOytDQUNPO0lBVGpCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0F5RjNCO0lBQUQsY0FBQztDQXpGRCxBQXlGQyxDQXpGb0MsRUFBRSxDQUFDLFNBQVMsR0F5RmhEO2tCQXpGb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXdubW93ZXIgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgR2FtZU1vZGVsIGZyb20gXCIuLi8uLi9Nb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCB7IENlbGxNb2RlbCB9IGZyb20gXCIuLi8uLi9Nb2RlbC9DZWxsTW9kZWxcIjtcbmltcG9ydCBHcm91cEFuaW1hdEN0cmwgZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Hcm91cEFuaW1hdEN0cmxcIjtcbmltcG9ydCB7IEVsaW1hdGVUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuY29uc3QgRGlycyA9IHsgMDogY2MudjIoMSwgMCksIDkwOiBjYy52MigwLCAxKSwgMTgwOiBjYy52MigtMSwgMCksIDI3MDogY2MudjIoMCwgLTEpIH07XG5jb25zdCBTcGVlZCA9IDIuNTtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1aXR1amkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxuICAgIHByb2c6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgYm9keTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGJvZHlGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIHByaXZhdGUgX2NmZzogSUxhd25tb3dlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZGlyOiBjYy5WZWMyID0gbnVsbDtcbiAgICBwcml2YXRlIF9jb3VudCA9IDA7XG5cbiAgICBwcml2YXRlIF91aU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoY2ZnOiBJTGF3bm1vd2VyKSB7XG4gICAgICAgIHRoaXMuX2NmZyA9IGNmZztcbiAgICAgICAgdGhpcy5fY291bnQgPSAwO1xuICAgICAgICB0aGlzLl9kaXIgPSBEaXJzW3RoaXMuX2NmZy5kZWdyZWVdO1xuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAoY2ZnLmRlZ3JlZSAtIDkwKTtcbiAgICAgICAgdGhpcy5wcm9nLm5vZGUuYW5nbGUgPSAtdGhpcy5ub2RlLmFuZ2xlO1xuICAgICAgICB0aGlzLmJvZHkuc3ByaXRlRnJhbWUgPSB0aGlzLmJvZHlGcmFtZXNbdGhpcy5fY2ZnLnR5cGVdO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVByb2dyZXNzKCkge1xuICAgICAgICB0aGlzLnByb2cucHJvZ3Jlc3MgPSB0aGlzLl9jb3VudCAvIHRoaXMuX2NmZy5jb3VudDtcbiAgICAgICAgaWYgKHRoaXMuX2NvdW50ID49IHRoaXMuX2NmZy5jb3VudCkge1xuICAgICAgICAgICAgdGhpcy5fZXhlYygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZXhlYygpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcign5pS26ZuG5a6M5oiQLOW8gOWni+aJp+ihjC0+Jyk7XG4gICAgICAgIC8vIHRoaXMucHJvZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBncm91bmRDZWxsID0gR2FtZU1vZGVsLmlucy5Db2xsZWN0TW9kZWwuY29sbGVjdFBvd2VyQ2VsbHNbYCR7dGhpcy5fY2ZnLnR5cGV9YF07XG4gICAgICAgIGdyb3VuZENlbGwuZnJlZVRoaXNQb3MoKTtcbiAgICAgICAgLy/mlLnlj5jlhYPntKDnmoTlsYLnuqchXG5cbiAgICAgICAgZGVsZXRlIEdhbWVNb2RlbC5pbnMuQ29sbGVjdE1vZGVsLmNvbGxlY3RQb3dlckNlbGxzW2Ake3RoaXMuX2NmZy50eXBlfWBdO1xuICAgICAgICAvL+W+gOS4gOS4quaWueWQkeS4gOebtOi3kSFcbiAgICAgICAgdGhpcy5fcnVuTW92ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3J1bk1vdmUoKSB7XG4gICAgICAgIC8v56Gu5a6a5pa55ZCRISBcbiAgICAgICAgaWYgKHRoaXMuX2Rpcikge1xuICAgICAgICAgICAgY29uc3QgYTAgPSBjYy5kZWxheVRpbWUoMC4zKTtcbiAgICAgICAgICAgIGNvbnN0IGExID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsaW1hdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgYTIgPSBjYy5tb3ZlVG8oU3BlZWQsIGNjLnYyKHRoaXMuX2Rpci54ICogMjAwMCwgdGhpcy5fZGlyLnkgKiAyMDAwKSk7XG4gICAgICAgICAgICBjb25zdCBhMyA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExLCBhMiwgYTMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2VsaW1hdGUoKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNjLnYyKHRoaXMuX2NmZy54LCB0aGlzLl9jZmcueSlcbiAgICAgICAgY29uc3QgdGltZUxpbmUgPSBHcm91cEFuaW1hdEN0cmwuaW5zLmNyZWF0ZVRpbWVMaW5lKCk7XG4gICAgICAgIGlmICh0aGlzLl9kaXIueCAhPSAwKSB7XG4gICAgICAgICAgICAvL+aLv+aoqueahFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lTW9kZWwuR3JpZFNpemUuVzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGltZUxpbmUuYWRkKGdzYXAuVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKDAuMSwgKHApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5leGVjRWxpbWF0ZU9uZUF0QWxsKHAsIEVsaW1hdGVUeXBlLlR1aXR1amksIHRoaXMuX2NmZy50eXBlKTtcbiAgICAgICAgICAgICAgICB9LCBbcG9zLmFkZCh0aGlzLl9kaXIuc2NhbGUoY2MudjIoaSwgMCkpKV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kaXIueSAhPSAwKSB7XG4gICAgICAgICAgICAvL+aLv+erlueahFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lTW9kZWwuR3JpZFNpemUuSDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGltZUxpbmUuYWRkKGdzYXAuVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKDAuMSwgKHApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5leGVjRWxpbWF0ZU9uZUF0QWxsKHAsIEVsaW1hdGVUeXBlLlR1aXR1amksIHRoaXMuX2NmZy50eXBlKTtcbiAgICAgICAgICAgICAgICB9LCBbcG9zLmFkZCh0aGlzLl9kaXIuc2NhbGUoY2MudjIoMCwgLWkpKSldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY29sbGVjdEl0ZW0oKSB7XG4gICAgICAgIHRoaXMuX2NvdW50Kys7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKCk7XG4gICAgfVxufVxuIl19