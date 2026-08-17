
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/SpecialPlug/Mushroom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df4e8RXKo1CiKDiEYuvX6MZ', 'Mushroom');
// Script/Logic/Match3/Model/SpecialPlug/Mushroom.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel_1 = require("../GameModel");
var Mushroom = /** @class */ (function () {
    function Mushroom() {
        this._content = null;
        this._map = null;
        this._content = new Set();
        this._map = new Map();
    }
    Mushroom.prototype.init = function () {
    };
    Mushroom.prototype.add = function (pos, model) {
        this._content.add(model);
        this._map.set(pos, model);
    };
    Mushroom.prototype.del = function (pos) {
        this._map.delete(pos);
        if (this._map.size <= 0) {
            requestAnimationFrame(this._destory.bind(this));
        }
    };
    Mushroom.prototype._destory = function () {
        this._content.forEach(function (cell) {
            cell.freeThisPos();
            GameModel_1.default.ins.testFindCanFallCell(cell.pos, GameModel_1.default.ins.seq.next());
            cell.extCtrl && cell.extCtrl.hideMushroom();
            cell.extCtrl && cell.extCtrl.PlayShanhuAnim();
        });
        this._content.clear();
    };
    return Mushroom;
}());
exports.default = Mushroom;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcU3BlY2lhbFBsdWdcXE11c2hyb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMENBQXFDO0FBRXJDO0lBS0k7UUFIUSxhQUFRLEdBQXlCLElBQUksQ0FBQztRQUN0QyxTQUFJLEdBQWtDLElBQUksQ0FBQztRQUcvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSx1QkFBSSxHQUFYO0lBRUEsQ0FBQztJQUVNLHNCQUFHLEdBQVYsVUFBVyxHQUFZLEVBQUUsS0FBc0I7UUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxzQkFBRyxHQUFWLFVBQVcsR0FBWTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNyQixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUVPLDJCQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixtQkFBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLG1CQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTCxlQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHcm91bmRDZWxsTW9kZWwgZnJvbSBcIi4uL0dyb3VuZENlbGxNb2RlbFwiO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi4vR2FtZU1vZGVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11c2hyb29tIHtcblxuICAgIHByaXZhdGUgX2NvbnRlbnQ6IFNldDxHcm91bmRDZWxsTW9kZWw+ID0gbnVsbDtcbiAgICBwcml2YXRlIF9tYXA6IE1hcDxjYy5WZWMyLCBHcm91bmRDZWxsTW9kZWw+ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jb250ZW50ID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkKHBvczogY2MuVmVjMiwgbW9kZWw6IEdyb3VuZENlbGxNb2RlbCkge1xuICAgICAgICB0aGlzLl9jb250ZW50LmFkZChtb2RlbCk7XG4gICAgICAgIHRoaXMuX21hcC5zZXQocG9zLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbChwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5fbWFwLmRlbGV0ZShwb3MpO1xuICAgICAgICBpZiAodGhpcy5fbWFwLnNpemUgPD0gMCkge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2Rlc3RvcnkuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZXN0b3J5KCkge1xuICAgICAgICB0aGlzLl9jb250ZW50LmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICBjZWxsLmZyZWVUaGlzUG9zKCk7XG4gICAgICAgICAgICBHYW1lTW9kZWwuaW5zLnRlc3RGaW5kQ2FuRmFsbENlbGwoY2VsbC5wb3MsIEdhbWVNb2RlbC5pbnMuc2VxLm5leHQoKSk7XG4gICAgICAgICAgICBjZWxsLmV4dEN0cmwgJiYgY2VsbC5leHRDdHJsLmhpZGVNdXNocm9vbSgpO1xuICAgICAgICAgICAgY2VsbC5leHRDdHJsICYmIGNlbGwuZXh0Q3RybC5QbGF5U2hhbmh1QW5pbSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY29udGVudC5jbGVhcigpO1xuICAgIH1cblxufSJdfQ==