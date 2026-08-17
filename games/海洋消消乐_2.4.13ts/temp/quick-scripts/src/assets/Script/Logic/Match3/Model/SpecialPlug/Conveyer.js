"use strict";
cc._RF.push(module, '51044aYfvdP4bsXrTJrLdMP', 'Conveyer');
// Script/Logic/Match3/Model/SpecialPlug/Conveyer.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel_1 = require("../GameModel");
var Common_1 = require("../../../Common/Common");
var MainCtrl_1 = require("../../MainCtrl");
var Conveyer = /** @class */ (function () {
    function Conveyer(data) {
        this._cfg = null;
        this._triggerCount = 0;
        this._nodeHandler = null;
        this._cfgData = null;
        if (data && data.conveyerList) {
            this._cfgData = data.conveyerList;
            this._nodeHandler = cc.find('Canvas/main').getComponent(MainCtrl_1.default);
        }
    }
    Conveyer.prototype.moveTo = function () {
        var _this = this;
        this._cfg.forEach(function (valuse, index) {
            for (var i = 0; i < valuse.length; i++) {
                var item = valuse[i];
                var nextItem = valuse[i + 1] || valuse[0];
                //判断下一个元素是否是相邻的..否则就渐影
                //每个元素往下一个点移动 
                var cell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, item.pos);
                if (cell) {
                    cell.conveyerMoveTo(nextItem.pos, null);
                }
            }
            _this.moveOver(index);
        });
    };
    Conveyer.prototype.moveOver = function (index) {
        var _this = this;
        if (this._nodeHandler) {
            this._nodeHandler.scheduleOnce(function () {
                var values = _this._cfg.get(index);
                //全部移动完毕!做操作! 
                //检测是否有落下的  
                for (var i = values.length; i--;) {
                    var pos = values[i].pos;
                    var cell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, pos);
                    if (cell) {
                        if (!cell.isFall) {
                            cell.continue2Fall();
                            cell.notifyRoundFall();
                            //检测是否有需要消除 
                            GameModel_1.default.ins.checkHavaElimate(cell.pos);
                        }
                    }
                    else {
                        GameModel_1.default.ins.testFindCanFallCell(pos, null);
                    }
                }
            }, 0.5);
        }
    };
    /**
     * 检测这个坐标是否是传输带中的一个
     * @param pos
     */
    Conveyer.prototype.checkIsConveyerItemForPos = function (pos) {
        var result = false;
        for (var i = this._cfgData.length; i--;) {
            var list = this._cfgData[i];
            for (var index = list.length; index--;) {
                var item = list[index];
                if (pos.x == item.x && pos.y == item.y) {
                    i = 0;
                    result = true;
                    break;
                }
            }
        }
        return result;
    };
    Conveyer.prototype.init = function () {
        if (this._cfgData) {
            this._cfg = new Map();
            var _loop_1 = function (i) {
                var p = [];
                var m = this_1._cfgData[i];
                m.forEach(function (item) {
                    var c = { pos: cc.v2(item.x, item.y), exist: item.exist };
                    p.push(c);
                });
                this_1._cfg.set(i, p);
            };
            var this_1 = this;
            for (var i = 0; i < this._cfgData.length; i++) {
                _loop_1(i);
            }
        }
    };
    /**被触发 */
    Conveyer.prototype.onTrigger = function () {
        this._triggerCount++;
        this.moveTo();
    };
    return Conveyer;
}());
exports.default = Conveyer;

cc._RF.pop();