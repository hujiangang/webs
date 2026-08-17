"use strict";
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