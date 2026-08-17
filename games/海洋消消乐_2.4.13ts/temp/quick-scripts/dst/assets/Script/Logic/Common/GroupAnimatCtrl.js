
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/GroupAnimatCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxHcm91cEFuaW1hdEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxzRUFBcUU7QUFFckUsdURBQWtFO0FBQ2xFLG1DQUE4QjtBQUM5Qix1REFBbUQ7QUFDbkQsMENBQXFDO0FBQ3JDLDZDQUE0QztBQUM1QyxtREFBK0Q7QUFDL0QsOENBQTZDO0FBQzdDLHlDQUFzQztBQUd0QztJQVNJO1FBTFEscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLG1CQUFjLEdBQTJDLElBQUksQ0FBQztRQUdsRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVNLHNDQUFZLEdBQW5CLFVBQW9CLFFBQXdCO1FBQ3hDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRTtZQUNoQixJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUNsQixRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLG9CQUFPLENBQUMsY0FBYyxFQUFFO29CQUM1RCxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLHNCQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1g7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5Q0FBZSxHQUF0QixVQUF1QixRQUF3QixFQUFFLFNBQWtCLEVBQUUsUUFBa0I7UUFBdkYsaUJBWUM7UUFYRyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzNCLElBQU0sSUFBSSxHQUFHLG9CQUFPLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFO1lBQ2hCLElBQUksRUFBRSxFQUFFO2dCQUNKLElBQU0sU0FBUyxHQUFHLGdCQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzlELFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEk7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSxzQ0FBWSxHQUFuQixVQUFvQixRQUF3QixFQUFFLFNBQWtCLEVBQUUsUUFBa0I7UUFBcEYsaUJBYUM7UUFaRyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFBQSxDQUFDO1FBRXhDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUU7WUFDaEIsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osSUFBTSxTQUFTLEdBQUcsZ0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDOUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEk7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSx3Q0FBYyxHQUFyQixVQUFzQixTQUFrQixFQUFFLFFBQXdCLEVBQUUsV0FBd0IsRUFBRSxRQUFrQjtRQUM1RyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN4QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFeEMsT0FBTztZQUNQLElBQU0sTUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFNLE9BQUssR0FBRyxFQUFFLENBQUM7WUFDakIsSUFBSSxRQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNqQixJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLFFBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7d0JBQUUsUUFBTSxHQUFHLEtBQUssQ0FBQTtvQkFDeEQsSUFBSSxRQUFNLEVBQUU7d0JBQ1IsTUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDbkI7eUJBQU07d0JBQ0gsT0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDcEI7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtZQUNGLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRztnQkFDNUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxvQkFBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLE1BQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RJO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsb0JBQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxPQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2STtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksd0NBQWMsR0FBckIsVUFBc0IsSUFBYyxFQUFFLEdBQVksRUFBRSxNQUFlLEVBQUUsSUFBa0IsRUFBRSxVQUEwQixFQUFFLE9BQXNCO1FBQXRFLHFCQUFBLEVBQUEsVUFBa0I7UUFBRSwyQkFBQSxFQUFBLGlCQUEwQjtRQUFFLHdCQUFBLEVBQUEsY0FBc0I7UUFDdkksSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQzFDLElBQU0sUUFBUSxHQUFHLG1CQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsR0FBRyxLQUFBLEVBQUUsVUFBVSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzNILGdIQUFnSDtZQUNoSCxRQUFRLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUM3Qiw4QkFBOEI7WUFDOUIsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFTSw0Q0FBa0IsR0FBekIsVUFBMEIsU0FBa0IsRUFBRSxNQUFjLEVBQUUsS0FBaUIsRUFBRSxTQUEwQjtRQUE3QyxzQkFBQSxFQUFBLFNBQWlCO1FBQUUsMEJBQUEsRUFBQSxpQkFBMEI7UUFDdkcsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxvQkFBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNoSDtJQUNMLENBQUM7SUFFTSw0Q0FBa0IsR0FBekIsVUFBMEIsS0FBYSxFQUFFLFFBQWE7UUFDbEQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHO1lBQ3RCLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7U0FDM0Q7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLCtDQUFxQixHQUE3QixVQUE4QixLQUFxQixFQUFFLFFBQWdCLEVBQUUsU0FBa0I7UUFDckYsUUFBUSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWU7WUFDMUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDekQ7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTyxnREFBc0IsR0FBOUIsVUFBK0IsRUFBYSxFQUFFLFFBQWtCLEVBQUUsSUFBaUI7UUFDL0UsSUFBSSxFQUFFLEVBQUU7WUFDSixFQUFFLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMvRDtJQUNMLENBQUM7SUFFTyxrREFBd0IsR0FBaEMsVUFBaUMsU0FBa0IsRUFBRSxTQUFrQixFQUFFLElBQVksRUFBRSxRQUFrQjtRQUF6RyxpQkFRQztRQVBHLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7WUFDdkQsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxLQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO2dCQUMvQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxvQkFBTyxDQUFDLHVCQUF1QixFQUFFLGNBQVEsUUFBUSxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNwRjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDRDQUFrQixHQUExQixVQUEyQixTQUFrQixFQUFFLFNBQWtCLEVBQUUsSUFBWSxFQUFFLEVBQWEsRUFBRSxRQUFrQjtRQUFsSCxpQkFlQztRQWRHLElBQU0sV0FBVyxHQUFHLENBQUMsbUJBQVEsQ0FBQyxLQUFLLEVBQUUsbUJBQVEsQ0FBQyxLQUFLLEVBQUUsbUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFVBQUMsQ0FBWTtZQUN4RSxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxtQkFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakUsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEtBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFFO2dCQUM3QixLQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsb0ZBQW9GO2FBQ3ZGO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sd0NBQWMsR0FBckI7UUFDSSxJQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVPLHFDQUFXLEdBQW5CLFVBQW9CLFFBQXdCO1FBQTVDLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM1QixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUU7Z0JBQ2pDLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0saUNBQU8sR0FBZDtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUEzTGEsbUJBQUcsR0FBb0IsbUNBQWdCLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBNEx2RixzQkFBQztDQTlMRCxBQThMQyxJQUFBO2tCQTlMb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgeyBTaW5nbGV0b25GYWN0b3J5IH0gZnJvbSBcIi4uLy4uL0Jhc2UvVXRpbHMvU2luZ2xldG9uRmFjdG9yeVwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4uL01hdGNoMy9Nb2RlbC9DZWxsTW9kZWxcIjtcbmltcG9ydCBHYW1lTW9kZWwsIHsgQ3JlYXRlVHlwZSB9IGZyb20gXCIuLi9NYXRjaDMvTW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuL0NvbW1vblwiO1xuaW1wb3J0IHsgR2FwVGltZSB9IGZyb20gXCIuLi9EYXRhL0NvbnN0L1RpbWVDb25maWdcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgQ2VsbFR5cGUsIEVsaW1hdGVUeXBlIH0gZnJvbSBcIi4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBBdWRpb0lEIH0gZnJvbSBcIi4vQXVkaW9DdHJsXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBBbmltYXRDdHJsIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5zOiBHcm91cEFuaW1hdEN0cmwgPSBTaW5nbGV0b25GYWN0b3J5LmdldEluc3RhbmNlKEdyb3VwQW5pbWF0Q3RybCk7XG5cbiAgICBwcml2YXRlIHJhaW5ib3dTdGFyQ291bnQgPSAwO1xuICAgIHByaXZhdGUgb3ZlclNob290Q291bnQgPSAwO1xuXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uUG9vbDogU2V0PHsgdHM6IG51bWJlciwgdjogZ3NhcC5BbmltYXRpb24gfT4gPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblBvb2wgPSBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlDcmFiQm9tYihjbG9zZUFyeTogU2V0PENlbGxNb2RlbD4pIHtcbiAgICAgICAgY29uc3QgdGltZWxpbmUgPSB0aGlzLmNyZWF0ZVRpbWVMaW5lKCk7XG5cbiAgICAgICAgY2xvc2VBcnkuZm9yRWFjaCgoY20pID0+IHtcbiAgICAgICAgICAgIGlmIChjbSAmJiBjbS5leHRDdHJsKSB7XG4gICAgICAgICAgICAgICAgdGltZWxpbmUuYWRkKGdzYXAuVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKEdhcFRpbWUuQ3JhYkVsaW1hdGVHYXAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY20uZXh0Q3RybC5lbGltYXRlKDAsIG51bGwsIEVsaW1hdGVUeXBlLkJvbWI2KTtcbiAgICAgICAgICAgICAgICB9LCBbXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheVJhaW5ib3dCb21iKGNsb3NlQXJ5OiBTZXQ8Q2VsbE1vZGVsPiwgY2VudGVyUG9zOiBjYy5WZWMyLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgdGltZWxpbmUgPSB0aGlzLmNyZWF0ZVRpbWVMaW5lKCk7XG5cbiAgICAgICAgdGhpcy5yYWluYm93U3RhckNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGNsb3NlQXJ5LnNpemU7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBHYXBUaW1lLlJhaW5ib3dTaG9vdFN0YXJDb3VudCAvIHNpemU7XG4gICAgICAgIGNsb3NlQXJ5LmZvckVhY2goKGNtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY20pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSBDb21tb24uY29udmVydEN1cldvcmxkUG9zKGNtLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgIHRpbWVsaW5lLmFkZChnc2FwLlR3ZWVuTGl0ZS5kZWxheWVkQ2FsbCh0aW1lLCB0aGlzLm9uRXhlY1NpbmdsZVJhaW5ib3dTaG9vdC5iaW5kKHRoaXMpLCBbdGFyZ2V0UG9zLCBjZW50ZXJQb3MsIHNpemUsIGNhbGxiYWNrXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBvdmVyU2hvb3RFZmYoY2xvc2VBcnk6IFNldDxDZWxsTW9kZWw+LCBjZW50ZXJQb3M6IGNjLlZlYzIsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBjb25zdCB0aW1lbGluZSA9IHRoaXMuY3JlYXRlVGltZUxpbmUoKTs7XG5cbiAgICAgICAgdGhpcy5vdmVyU2hvb3RDb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IHNpemUgPSBjbG9zZUFyeS5zaXplO1xuICAgICAgICBsZXQgdGltZSA9IDIgLyBzaXplO1xuICAgICAgICB0aW1lID0gdGltZSA+IDAuMTUgPyAwLjE1IDogdGltZTtcbiAgICAgICAgY2xvc2VBcnkuZm9yRWFjaCgoY20pID0+IHtcbiAgICAgICAgICAgIGlmIChjbSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFBvcyA9IENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3MoY20uZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICAgICAgdGltZWxpbmUuYWRkKGdzYXAuVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKHRpbWUsIHRoaXMub25FeGVjT3ZlclNob290RWZmLmJpbmQodGhpcyksIFt0YXJnZXRQb3MsIGNlbnRlclBvcywgc2l6ZSwgY20sIGNhbGxiYWNrXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Um93RWxpbWF0ZShjZW50ZXJQb3M6IGNjLlZlYzIsIGNsb3NlQXJ5OiBTZXQ8Q2VsbE1vZGVsPiwgZWxpbWF0ZVR5cGU6IEVsaW1hdGVUeXBlLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKGNsb3NlQXJ5LnNpemUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lbGluZTEgPSB0aGlzLmNyZWF0ZVRpbWVMaW5lKCk7XG4gICAgICAgICAgICBjb25zdCB0aW1lbGluZTIgPSB0aGlzLmNyZWF0ZVRpbWVMaW5lKCk7XG5cbiAgICAgICAgICAgIC8v5om+5Ye65bem5Y+zIVxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmlnaHQgPSBbXTtcbiAgICAgICAgICAgIGxldCBpc0xlZnQgPSB0cnVlO1xuICAgICAgICAgICAgY2xvc2VBcnkuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0ICYmIGNlbGwucG9zLmVxdWFscyhjZW50ZXJQb3MpKSBpc0xlZnQgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0LnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodC5wdXNoKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBsZWZ0Lmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgICAgIHRpbWVsaW5lMS5hZGQoZ3NhcC5Ud2VlbkxpdGUuZGVsYXllZENhbGwoR2FwVGltZS5Sb3dBbmRDb2xFbGltYXRlLCB0aGlzLm9uRXhlY1NpbmdsZUVsaW1hdGVFZmYsIFtsZWZ0W2ldLCBjYWxsYmFjaywgZWxpbWF0ZVR5cGVdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJpZ2h0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGltZWxpbmUyLmFkZChnc2FwLlR3ZWVuTGl0ZS5kZWxheWVkQ2FsbChHYXBUaW1lLlJvd0FuZENvbEVsaW1hdGUsIHRoaXMub25FeGVjU2luZ2xlRWxpbWF0ZUVmZiwgW3JpZ2h0W2ldLCBjYWxsYmFjaywgZWxpbWF0ZVR5cGVdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdHlwZSDliJvlu7rnmoTngrjlvLnnsbvlnotcbiAgICAgKiBAcGFyYW0gcG9zIOeCuOW8ueeUn+aIkOeahOS9jee9rlxuICAgICAqIEBwYXJhbSBpc0V4ZWMg5piv5ZCm56uL5Y2z5omn6KGM54iG54K4XG4gICAgICogQHBhcmFtIHRpbWUg5bu25pe25pe26Ze0XG4gICAgICogQHBhcmFtIGluc2VydEdyaWQg5piv5ZCm5Yqg5YWl5qOL55uY5o6n5Yi2XG4gICAgICogQHBhcmFtIGdyb3VwSWQg5ZCI5oiQ5YmN55qEZ3JvdXBcbiAgICAgKi9cbiAgICBwdWJsaWMgcGxheUNyZWF0ZUJvbWIodHlwZTogQ2VsbFR5cGUsIHBvczogY2MuVmVjMiwgaXNFeGVjOiBib29sZWFuLCB0aW1lOiBudW1iZXIgPSAwLjMsIGluc2VydEdyaWQ6IGJvb2xlYW4gPSB0cnVlLCBncm91cElkOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRpbWVsaW5lID0gdGhpcy5jcmVhdGVUaW1lTGluZSgpO1xuICAgICAgICB0aW1lbGluZS5hZGQoZ3NhcC5Ud2VlbkxpdGUuZGVsYXllZENhbGwodGltZSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYm9tYkNlbGwgPSBHYW1lTW9kZWwuaW5zLmNyZWF0ZUNlbGwoeyBjZmc6IHsgdHlwZSB9LCBwb3MsIGNyZWF0ZVR5cGU6IENyZWF0ZVR5cGUuTWlkd2F5LCBpc0luc2VydDJBcnk6IGluc2VydEdyaWQgfSk7XG4gICAgICAgICAgICAvLyBjb25zdCBib21iQ2VsbCA9IEdhbWVNb2RlbC5pbnMuY3JlYXRlTmV3Q2VsbE1vZGVsKHsgdHlwZSB9LCBwb3MsIENyZWF0ZVR5cGUuTWlkd2F5LCBudWxsLCBmYWxzZSwgaW5zZXJ0R3JpZCk7XG4gICAgICAgICAgICBib21iQ2VsbC5pc0JvbWJSZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gYm9tYkNlbGwuR3JvdXBJZCA9IGdyb3VwSWQ7XG4gICAgICAgICAgICBib21iQ2VsbC5pc0V4ZWNCb21iID0gaXNFeGVjO1xuICAgICAgICAgICAgaWYgKCFpc0V4ZWMpIHtcbiAgICAgICAgICAgICAgICBib21iQ2VsbC5jb250aW51ZTJGYWxsKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlDZWxsQm9tYlNob2NrcyhjZW50ZXJQb3M6IGNjLlZlYzIsIGJvbWJMdjogbnVtYmVyLCBkZXB0aDogbnVtYmVyID0gMiwgbGFzdFJvdW5kOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdGltZWxpbmUgPSB0aGlzLmNyZWF0ZVRpbWVMaW5lKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVwdGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYXJ5ID0gQ29tbW9uLmdldEFyb3VuZENpcmNsZUNlbGxzKGNlbnRlclBvcywgYm9tYkx2ICsgaSwgbGFzdFJvdW5kID8gZmFsc2UgOiBpID09IChkZXB0aCAtIDEpKTtcbiAgICAgICAgICAgIHRpbWVsaW5lLmFkZChnc2FwLlR3ZWVuTGl0ZS5kZWxheWVkQ2FsbChHYXBUaW1lLkJvbWJTaG9ja3MsIHRoaXMub25FeGVjQm9tYkFmdGVyc2hvY2tzLCBbYXJ5LCBpLCBjZW50ZXJQb3NdKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnYW1lT3ZlckNyZWF0ZUJvbWIoY291bnQ6IG51bWJlciwgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICBjb25zdCB0aW1lbGluZSA9IHRoaXMuY3JlYXRlVGltZUxpbmUoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGNvdW50OyBpLS07KSB7XG4gICAgICAgICAgICB0aW1lbGluZS5hZGQoZ3NhcC5Ud2VlbkxpdGUuZGVsYXllZENhbGwoMC4yMCwgY2FsbGJhY2spKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omn6KGM54us5ZyI5Yqo55S7XG4gICAgICogQHBhcmFtIGNlbGxzIOmcgOimgeaJp+ihjOWKqOeUu+eahOWFg+e0oFxuICAgICAqIEBwYXJhbSBkaXN0YW5jZSDlvZPliY3ot53nprvkuK3lv4PnmoTot53nprtcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uRXhlY0JvbWJBZnRlcnNob2NrcyhjZWxsczogU2V0PENlbGxNb2RlbD4sIGRpc3RhbmNlOiBudW1iZXIsIGNlbnRlclBvczogY2MuVmVjMikge1xuICAgICAgICBkaXN0YW5jZSA9IDUgLSBkaXN0YW5jZTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbDogQ2VsbE1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbCAmJiBjZWxsLmV4dEN0cmwpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmV4dEN0cmwuZXhlY0JvbWJBZnRlclNob2NrcyhkaXN0YW5jZSwgY2VudGVyUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXhlY1NpbmdsZUVsaW1hdGVFZmYoY206IENlbGxNb2RlbCwgY2FsbGJhY2s6IEZ1bmN0aW9uLCB0eXBlOiBFbGltYXRlVHlwZSkge1xuICAgICAgICBpZiAoY20pIHtcbiAgICAgICAgICAgIGNtLmV4dEN0cmwgJiYgY20uZXh0Q3RybC5lbGltYXRlKDAsIGNtLnBvcywgdHlwZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV4ZWNTaW5nbGVSYWluYm93U2hvb3QodGFyZ2V0UG9zOiBjYy5WZWMyLCBjZW50ZXJQb3M6IGNjLlZlYzIsIHNpemU6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5FZmZlY3QuU2hvb3RTdGFyLCBjZW50ZXJQb3MsIHRhcmdldFBvcywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yYWluYm93U3RhckNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5yYWluYm93U3RhckNvdW50ID49IHNpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhaW5ib3dTdGFyQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGdzYXAuVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKEdhcFRpbWUuUmFpbmJvd1Nob290T3ZlckVsaW1hdGUsICgpID0+IHsgY2FsbGJhY2soKSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXhlY092ZXJTaG9vdEVmZih0YXJnZXRQb3M6IGNjLlZlYzIsIGNlbnRlclBvczogY2MuVmVjMiwgc2l6ZTogbnVtYmVyLCBjbTogQ2VsbE1vZGVsLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYm9tYkNvbnRlbnQgPSBbQ2VsbFR5cGUuQm9tYjIsIENlbGxUeXBlLkJvbWIzLCBDZWxsVHlwZS5Cb21iMV07XG4gICAgICAgIEdhbWVNb2RlbC5pbnMuc3RlcExpbWl0LS07XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwpO1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuRWZmZWN0Lk92ZXJTaG9vdCwgY2VudGVyUG9zLCB0YXJnZXRQb3MsIGNtLCAoYzogQ2VsbE1vZGVsKSA9PiB7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuU291bmQuUGxheVNvdW5kRWZmLCBBdWRpb0lELnBhcnR5dGltZV9jaGFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5vdmVyU2hvb3RDb3VudCsrO1xuICAgICAgICAgICAgYy5jaGFuZ2UyQm9tYihib21iQ29udGVudFtVdGlsLlRvb2wucmFuZ2VJbnQoMCwgYm9tYkNvbnRlbnQubGVuZ3RoLCBmYWxzZSldKTtcbiAgICAgICAgICAgIGMuZXh0Q3RybCAmJiBjLmV4dEN0cmwucGxheUNyZWF0ZUJvbWJBbmkoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJTaG9vdENvdW50ID49IHNpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJTaG9vdENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIC8vIGdzYXAuVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKEdhcFRpbWUuUmFpbmJvd1Nob290T3ZlckVsaW1hdGUsICgpID0+IHsgY2FsbGJhY2soKSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVGltZUxpbmUoKTogZ3NhcC5UaW1lbGluZU1heCB7XG4gICAgICAgIGNvbnN0IHRpbWVsaW5lID0gbmV3IGdzYXAuVGltZWxpbmVNYXgoKTtcbiAgICAgICAgdGltZWxpbmUuYXV0b1JlbW92ZUNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5zZXJ0UG9vbCh0aW1lbGluZSk7XG4gICAgICAgIHJldHVybiB0aW1lbGluZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbnNlcnRQb29sKHRpbWVMaW5lOiBnc2FwLkFuaW1hdGlvbikge1xuICAgICAgICB0aGlzLl9hbmltYXRpb25Qb29sLmFkZCh7IHRzOiBEYXRlLm5vdygpLCB2OiB0aW1lTGluZSB9KTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uUG9vbC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSBpdGVtLnRzID4gMyAqIDEwMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb25Qb29sLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3RvcnkoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblBvb2wuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0udi5raWxsKCk7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25Qb29sLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59Il19