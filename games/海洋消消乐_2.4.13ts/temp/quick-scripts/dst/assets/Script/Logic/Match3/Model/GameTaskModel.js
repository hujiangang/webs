
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/GameTaskModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '33e53A8Jo5EH6QH0Y1KoCBY', 'GameTaskModel');
// Script/Logic/Match3/Model/GameTaskModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameTaskModel = void 0;
var GameTaskModel = /** @class */ (function () {
    function GameTaskModel() {
        this.type = 0;
        this.action = null;
        this.model1 = null;
        this.model2 = null;
        this.size = 0;
        /**额外附加的数据 */
        this.extData = 0;
        /**待销毁的集合 */
        this.closeAry = null;
        this.cp1 = null;
        this.cp2 = null;
        this.keepTime = 0;
        this.isNeedShowEff = true;
        this.init();
    }
    GameTaskModel.prototype.destory = function () {
        this.init();
    };
    GameTaskModel.prototype.init = function () {
        this.type = 0;
        this.action = null;
        this.model1 = null;
        this.model2 = null;
        this.size = 0;
        this.extData = 0;
        this.closeAry = null;
        this.cp1 = null;
        this.cp2 = null;
        this.keepTime = 0;
    };
    return GameTaskModel;
}());
exports.GameTaskModel = GameTaskModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcR2FtZVRhc2tNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTtJQXNCSTtRQXBCTyxTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBRzdCLFdBQU0sR0FBYyxJQUFJLENBQUM7UUFDekIsV0FBTSxHQUFRLElBQUksQ0FBQztRQUVuQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGFBQWE7UUFDTixZQUFPLEdBQVEsQ0FBQyxDQUFDO1FBQ3hCLFlBQVk7UUFDTCxhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRTFCLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDcEIsUUFBRyxHQUFZLElBQUksQ0FBQztRQUVwQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBR2pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRU0sNEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQTtRQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQS9DQSxBQStDQyxJQUFBO0FBL0NZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4vQ2VsbE1vZGVsXCI7XG5pbXBvcnQgeyBJUG9vbERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9EYXRhUG9vbFwiO1xuXG5leHBvcnQgY2xhc3MgR2FtZVRhc2tNb2RlbCBpbXBsZW1lbnRzIElQb29sRGF0YSB7XG5cbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgYWN0aW9uOiBFdmVudC5HYW1lQ01EID0gbnVsbDtcblxuXG4gICAgcHVibGljIG1vZGVsMTogQ2VsbE1vZGVsID0gbnVsbDtcbiAgICBwdWJsaWMgbW9kZWwyOiBhbnkgPSBudWxsO1xuXG4gICAgcHVibGljIHNpemU6IG51bWJlciA9IDA7XG4gICAgLyoq6aKd5aSW6ZmE5Yqg55qE5pWw5o2uICovXG4gICAgcHVibGljIGV4dERhdGE6IGFueSA9IDA7XG4gICAgLyoq5b6F6ZSA5q+B55qE6ZuG5ZCIICovXG4gICAgcHVibGljIGNsb3NlQXJ5OiBTZXQ8YW55PiA9IG51bGw7XG5cbiAgICBwdWJsaWMgY3AxOiBjYy5WZWMyID0gbnVsbDtcbiAgICBwdWJsaWMgY3AyOiBjYy5WZWMyID0gbnVsbDtcblxuICAgIHB1YmxpYyBrZWVwVGltZTogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBpc05lZWRTaG93RWZmOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBkZXN0b3J5KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50eXBlID0gMDtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHRoaXMubW9kZWwxID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2RlbDIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuZXh0RGF0YSA9IDBcbiAgICAgICAgdGhpcy5jbG9zZUFyeSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5jcDEgPSBudWxsO1xuICAgICAgICB0aGlzLmNwMiA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5rZWVwVGltZSA9IDA7XG4gICAgfVxuXG59Il19