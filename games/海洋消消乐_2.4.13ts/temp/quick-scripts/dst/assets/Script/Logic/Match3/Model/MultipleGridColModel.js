
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/MultipleGridColModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd2d4GYSOZAwrVh6W+0qnCV', 'MultipleGridColModel');
// Script/Logic/Match3/Model/MultipleGridColModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GnomeModel_1 = require("./multipleGridCol/GnomeModel");
var TurtlesModel_1 = require("./multipleGridCol/TurtlesModel");
var CrabModel_1 = require("./multipleGridCol/CrabModel");
var MultipleGridColModel = /** @class */ (function () {
    function MultipleGridColModel(data, index) {
        this._gnome = null;
        this._turtles = null;
        this._crab = null;
        if (data.gnome) {
            this._gnome = new GnomeModel_1.default(data.gnome, index);
        }
        if (data.turtles) {
            this._turtles = new TurtlesModel_1.default(data.turtles, index);
        }
        if (data.crab) {
            this._crab = new CrabModel_1.default(data.crab, index);
        }
    }
    MultipleGridColModel.prototype.sync2View = function (list) {
        this._crab && this._crab.sync2View(list);
        this._gnome && this._gnome.sync2View(list);
        this._turtles && this._turtles.sync2View(list);
    };
    MultipleGridColModel.prototype.getConfig = function (type) {
        var result = null;
        var m = this.getModel(type);
        if (m) {
            result = m.config;
        }
        return result;
    };
    MultipleGridColModel.prototype.getData = function (type) {
        var result = null;
        var m = this.getModel(type);
        if (m) {
            result = m.getData();
        }
        return result;
    };
    MultipleGridColModel.prototype.checkItemOver = function (type, idx) {
        var result = null;
        var m = this.getModel(type);
        if (m) {
            result = m.checkItemCompletByIndex(idx);
        }
        return result;
    };
    MultipleGridColModel.prototype.updateItemCountByPos = function (type, pos) {
        var result = null;
        var m = this.getModel(type);
        if (m) {
            result = m.updateItemCountByPos(pos);
        }
        return result;
    };
    MultipleGridColModel.prototype.onComplet = function (type, index, topPoint) {
        var m = this.getModel(type);
        if (m) {
            m.onComplet(index, topPoint);
        }
    };
    MultipleGridColModel.prototype.getModel = function (type) {
        return { gnome: this._gnome, turtles: this._turtles, crab: this._crab }[type];
    };
    return MultipleGridColModel;
}());
exports.default = MultipleGridColModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcTXVsdGlwbGVHcmlkQ29sTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0Q7QUFDdEQsK0RBQTBEO0FBQzFELHlEQUFvRDtBQUtwRDtJQU1JLDhCQUFZLElBQVksRUFBRSxLQUFLO1FBSnZCLFdBQU0sR0FBZSxJQUFJLENBQUM7UUFDMUIsYUFBUSxHQUFpQixJQUFJLENBQUM7UUFDOUIsVUFBSyxHQUFjLElBQUksQ0FBQztRQUc1QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHNCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxtQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0lBRU0sd0NBQVMsR0FBaEIsVUFBaUIsSUFBeUI7UUFDdEMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLHdDQUFTLEdBQWhCLFVBQWlCLElBQVk7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUU7WUFDSCxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNyQjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxzQ0FBTyxHQUFkLFVBQWUsSUFBWTtRQUN2QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsRUFBRTtZQUNILE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU0sNENBQWEsR0FBcEIsVUFBcUIsSUFBWSxFQUFFLEdBQW9CO1FBQ25ELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxFQUFFO1lBQ0gsTUFBTSxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxtREFBb0IsR0FBM0IsVUFBNEIsSUFBWSxFQUFFLEdBQVk7UUFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUU7WUFDSCxNQUFNLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLHdDQUFTLEdBQWhCLFVBQWlCLElBQVksRUFBRSxLQUFhLEVBQUUsUUFBaUI7UUFDM0QsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsRUFBRTtZQUNILENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVNLHVDQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUN4QixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQXRFQSxBQXNFQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdub21lTW9kZWwgZnJvbSBcIi4vbXVsdGlwbGVHcmlkQ29sL0dub21lTW9kZWxcIjtcbmltcG9ydCBUdXJ0bGVzTW9kZWwgZnJvbSBcIi4vbXVsdGlwbGVHcmlkQ29sL1R1cnRsZXNNb2RlbFwiO1xuaW1wb3J0IENyYWJNb2RlbCBmcm9tIFwiLi9tdWx0aXBsZUdyaWRDb2wvQ3JhYk1vZGVsXCI7XG5pbXBvcnQgeyBJTGV2ZWwsIEdub21lIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lMZXZlbFwiO1xuaW1wb3J0IEdyb3VuZENlbGxNb2RlbCBmcm9tIFwiLi9Hcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCBNdWx0aXBsZUdyaWRDb2xCYXNlIGZyb20gXCIuL211bHRpcGxlR3JpZENvbC9NdWx0aXBsZUdyaWRDb2xCYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpcGxlR3JpZENvbE1vZGVsIHtcblxuICAgIHByaXZhdGUgX2dub21lOiBHbm9tZU1vZGVsID0gbnVsbDtcbiAgICBwcml2YXRlIF90dXJ0bGVzOiBUdXJ0bGVzTW9kZWwgPSBudWxsO1xuICAgIHByaXZhdGUgX2NyYWI6IENyYWJNb2RlbCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBJTGV2ZWwsIGluZGV4KSB7XG4gICAgICAgIGlmIChkYXRhLmdub21lKSB7XG4gICAgICAgICAgICB0aGlzLl9nbm9tZSA9IG5ldyBHbm9tZU1vZGVsKGRhdGEuZ25vbWUsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS50dXJ0bGVzKSB7XG4gICAgICAgICAgICB0aGlzLl90dXJ0bGVzID0gbmV3IFR1cnRsZXNNb2RlbChkYXRhLnR1cnRsZXMsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5jcmFiKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmFiID0gbmV3IENyYWJNb2RlbChkYXRhLmNyYWIsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzeW5jMlZpZXcobGlzdDogR3JvdW5kQ2VsbE1vZGVsW11bXSkge1xuICAgICAgICB0aGlzLl9jcmFiICYmIHRoaXMuX2NyYWIuc3luYzJWaWV3KGxpc3QpO1xuICAgICAgICB0aGlzLl9nbm9tZSAmJiB0aGlzLl9nbm9tZS5zeW5jMlZpZXcobGlzdCk7XG4gICAgICAgIHRoaXMuX3R1cnRsZXMgJiYgdGhpcy5fdHVydGxlcy5zeW5jMlZpZXcobGlzdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbmZpZyh0eXBlOiBzdHJpbmcpOiBHbm9tZVtdIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbS5jb25maWc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0YSh0eXBlOiBzdHJpbmcpOiB7IFtpbng6IG51bWJlcl06IGNjLlZlYzJbXSB9IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbS5nZXREYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tJdGVtT3Zlcih0eXBlOiBzdHJpbmcsIGlkeDogbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBjb25zdCBtID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG0uY2hlY2tJdGVtQ29tcGxldEJ5SW5kZXgoaWR4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVJdGVtQ291bnRCeVBvcyh0eXBlOiBzdHJpbmcsIHBvczogY2MuVmVjMik6IG51bWJlciB8IHN0cmluZyB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBjb25zdCBtID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG0udXBkYXRlSXRlbUNvdW50QnlQb3MocG9zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNvbXBsZXQodHlwZTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCB0b3BQb2ludDogY2MuVmVjMikge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgIG0ub25Db21wbGV0KGluZGV4LCB0b3BQb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9kZWwodHlwZTogc3RyaW5nKTogTXVsdGlwbGVHcmlkQ29sQmFzZSB7XG4gICAgICAgIHJldHVybiB7IGdub21lOiB0aGlzLl9nbm9tZSwgdHVydGxlczogdGhpcy5fdHVydGxlcywgY3JhYjogdGhpcy5fY3JhYiB9W3R5cGVdO1xuICAgIH1cbn0iXX0=