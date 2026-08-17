"use strict";
cc._RF.push(module, '46c3dFIOoROf5mZ5TnBtGv8', 'GroupAnimatCtrl');
// Script/Logic/Common/GroupAnimatCtrl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingletonFactory_1 = require("../../Base/Utils/SingletonFactory");
var GameModel_1 = require("../Match3/Model/GameModel");
var Common_1 = require("./Common");
var TimeConfig_1 = require("../Data/Const/TimeConfig");
var M_1 = require("../../Base/Manager/M");
var Event_1 = require("../Data/Const/Event");
var Constant_1 = require("../Data/Const/Constant");
var Util_1 = require("../../Base/Utils/Util");
var AudioCtrl_1 = require("./AudioCtrl");
var GroupAnimatCtrl = /** @class */ (function () {
    function GroupAnimatCtrl() {
        this.rainbowStarCount = 0;
        this.overShootCount = 0;
        this._animationPool = null;
        this._animationPool = new Set();
    }
    GroupAnimatCtrl.prototype.playCrabBomb = function (closeAry) {
        var timeline = this.createTimeLine();
        closeAry.forEach(function (cm) {
            if (cm && cm.extCtrl) {
                timeline.add(gsap.TweenLite.delayedCall(TimeConfig_1.GapTime.CrabElimateGap, function () {
                    cm.extCtrl.elimate(0, null, Constant_1.ElimateType.Bomb6);
                }, []));
            }
        });
    };
    GroupAnimatCtrl.prototype.playRainbowBomb = function (closeAry, centerPos, callback) {
        var _this = this;
        var timeline = this.createTimeLine();
        this.rainbowStarCount = 0;
        var size = closeAry.size;
        var time = TimeConfig_1.GapTime.RainbowShootStarCount / size;
        closeAry.forEach(function (cm) {
            if (cm) {
                var targetPos = Common_1.default.convertCurWorldPos(cm.getPosition());
                timeline.add(gsap.TweenLite.delayedCall(time, _this.onExecSingleRainbowShoot.bind(_this), [targetPos, centerPos, size, callback]));
            }
        });
    };
    GroupAnimatCtrl.prototype.overShootEff = function (closeAry, centerPos, callback) {
        var _this = this;
        var timeline = this.createTimeLine();
        ;
        this.overShootCount = 0;
        var size = closeAry.size;
        var time = 2 / size;
        time = time > 0.15 ? 0.15 : time;
        closeAry.forEach(function (cm) {
            if (cm) {
                var targetPos = Common_1.default.convertCurWorldPos(cm.getPosition());
                timeline.add(gsap.TweenLite.delayedCall(time, _this.onExecOverShootEff.bind(_this), [targetPos, centerPos, size, cm, callback]));
            }
        });
    };
    GroupAnimatCtrl.prototype.playRowElimate = function (centerPos, closeAry, elimateType, callback) {
        if (closeAry.size > 0) {
            var timeline1 = this.createTimeLine();
            var timeline2 = this.createTimeLine();
            //找出左右!
            var left_1 = [];
            var right_1 = [];
            var isLeft_1 = true;
            closeAry.forEach(function (cell) {
                if (cell) {
                    if (isLeft_1 && cell.pos.equals(centerPos))
                        isLeft_1 = false;
                    if (isLeft_1) {
                        left_1.push(cell);
                    }
                    else {
                        right_1.push(cell);
                    }
                }
            });
            for (var i = left_1.length; i--;) {
                timeline1.add(gsap.TweenLite.delayedCall(TimeConfig_1.GapTime.RowAndColElimate, this.onExecSingleElimateEff, [left_1[i], callback, elimateType]));
            }
            for (var i = 0; i < right_1.length; i++) {
                timeline2.add(gsap.TweenLite.delayedCall(TimeConfig_1.GapTime.RowAndColElimate, this.onExecSingleElimateEff, [right_1[i], callback, elimateType]));
            }
        }
    };
    /**
     *
     * @param type 创建的炸弹类型
     * @param pos 炸弹生成的位置
     * @param isExec 是否立即执行爆炸
     * @param time 延时时间
     * @param insertGrid 是否加入棋盘控制
     * @param groupId 合成前的group
     */
    GroupAnimatCtrl.prototype.playCreateBomb = function (type, pos, isExec, time, insertGrid, groupId) {
        if (time === void 0) { time = 0.3; }
        if (insertGrid === void 0) { insertGrid = true; }
        if (groupId === void 0) { groupId = null; }
        var timeline = this.createTimeLine();
        timeline.add(gsap.TweenLite.delayedCall(time, function () {
            var bombCell = GameModel_1.default.ins.createCell({ cfg: { type: type }, pos: pos, createType: GameModel_1.CreateType.Midway, isInsert2Ary: insertGrid });
            // const bombCell = GameModel.ins.createNewCellModel({ type }, pos, CreateType.Midway, null, false, insertGrid);
            bombCell.isBombReady = false;
            // bombCell.GroupId = groupId;
            bombCell.isExecBomb = isExec;
            if (!isExec) {
                bombCell.continue2Fall(true);
            }
        }));
    };
    GroupAnimatCtrl.prototype.playCellBombShocks = function (centerPos, bombLv, depth, lastRound) {
        if (depth === void 0) { depth = 2; }
        if (lastRound === void 0) { lastRound = false; }
        var timeline = this.createTimeLine();
        for (var i = 0; i < depth; i++) {
            var ary = Common_1.default.getAroundCircleCells(centerPos, bombLv + i, lastRound ? false : i == (depth - 1));
            timeline.add(gsap.TweenLite.delayedCall(TimeConfig_1.GapTime.BombShocks, this.onExecBombAftershocks, [ary, i, centerPos]));
        }
    };
    GroupAnimatCtrl.prototype.gameOverCreateBomb = function (count, callback) {
        var timeline = this.createTimeLine();
        for (var i = count; i--;) {
            timeline.add(gsap.TweenLite.delayedCall(0.20, callback));
        }
    };
    /**
     * 执行独圈动画
     * @param cells 需要执行动画的元素
     * @param distance 当前距离中心的距离
     */
    GroupAnimatCtrl.prototype.onExecBombAftershocks = function (cells, distance, centerPos) {
        distance = 5 - distance;
        cells.forEach(function (cell) {
            if (cell && cell.extCtrl) {
                cell.extCtrl.execBombAfterShocks(distance, centerPos);
            }
        });
    };
    GroupAnimatCtrl.prototype.onExecSingleElimateEff = function (cm, callback, type) {
        if (cm) {
            cm.extCtrl && cm.extCtrl.elimate(0, cm.pos, type, callback);
        }
    };
    GroupAnimatCtrl.prototype.onExecSingleRainbowShoot = function (targetPos, centerPos, size, callback) {
        var _this = this;
        M_1.default.event.send(Event_1.Event.Effect.ShootStar, centerPos, targetPos, function () {
            _this.rainbowStarCount++;
            if (_this.rainbowStarCount >= size) {
                _this.rainbowStarCount = 0;
                gsap.TweenLite.delayedCall(TimeConfig_1.GapTime.RainbowShootOverElimate, function () { callback(); });
            }
        });
    };
    GroupAnimatCtrl.prototype.onExecOverShootEff = function (targetPos, centerPos, size, cm, callback) {
        var _this = this;
        var bombContent = [Constant_1.CellType.Bomb2, Constant_1.CellType.Bomb3, Constant_1.CellType.Bomb1];
        GameModel_1.default.ins.stepLimit--;
        M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel);
        M_1.default.event.send(Event_1.Event.Effect.OverShoot, centerPos, targetPos, cm, function (c) {
            M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.partytime_change);
            _this.overShootCount++;
            c.change2Bomb(bombContent[Util_1.Util.Tool.rangeInt(0, bombContent.length, false)]);
            c.extCtrl && c.extCtrl.playCreateBombAni();
            if (_this.overShootCount >= size) {
                _this.overShootCount = 0;
                callback();
                // gsap.TweenLite.delayedCall(GapTime.RainbowShootOverElimate, () => { callback() })
            }
        });
    };
    GroupAnimatCtrl.prototype.createTimeLine = function () {
        var timeline = new gsap.TimelineMax();
        timeline.autoRemoveChildren = true;
        this._insertPool(timeline);
        return timeline;
    };
    GroupAnimatCtrl.prototype._insertPool = function (timeLine) {
        var _this = this;
        this._animationPool.add({ ts: Date.now(), v: timeLine });
        this._animationPool.forEach(function (item) {
            if (Date.now() - item.ts > 3 * 1000) {
                _this._animationPool.delete(item);
            }
        });
    };
    GroupAnimatCtrl.prototype.destory = function () {
        var _this = this;
        this._animationPool.forEach(function (item) {
            item.v.kill();
            _this._animationPool.delete(item);
        });
    };
    GroupAnimatCtrl.ins = SingletonFactory_1.SingletonFactory.getInstance(GroupAnimatCtrl);
    return GroupAnimatCtrl;
}());
exports.default = GroupAnimatCtrl;

cc._RF.pop();