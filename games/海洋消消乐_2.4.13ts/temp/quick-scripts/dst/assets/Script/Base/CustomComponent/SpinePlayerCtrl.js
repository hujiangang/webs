
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/CustomComponent/SpinePlayerCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a7017uvUJEoKGgXET9l4Ei', 'SpinePlayerCtrl');
// Script/Base/CustomComponent/SpinePlayerCtrl.ts

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
/**
 * spine动画控制器
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpinePlayerCtrl = /** @class */ (function (_super) {
    __extends(SpinePlayerCtrl, _super);
    function SpinePlayerCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.callback = null;
        _this.frameCallback = null;
        _this._curPlayName = null;
        _this._timeout = null;
        return _this;
    }
    SpinePlayerCtrl.prototype.onLoad = function () {
        this.setCompleteListener(this._handleAniCompleteEvent.bind(this));
        this.setEventListener(this._handleFrameEvent.bind(this));
    };
    /**
     * 播放动画
     * @param name 动画名字
     * @param trackIndex ..搞不清这是个什么玩意
     * @param isloop 是否循环
     * @param callback 动画播放完成回调
     * @param frameEventCallback 动画自定义事件回调
     * @param nextData 如果需要播放下一个动画的数据
     */
    SpinePlayerCtrl.prototype.play = function (name, trackIndex, isloop, callback, frameEventCallback, nextData) {
        if (isloop === void 0) { isloop = false; }
        this.callback = callback;
        this.frameCallback = frameEventCallback;
        this.node.active = true;
        this._curPlayName = name;
        // if (this.callback) {
        //     this._timeout = setTimeout(() => {
        //         this.callback && this.callback();
        //         this.callback = null;
        //         this._curPlayName = null;
        //     }, 5 * 1000);
        // }
        this.setAnimation(trackIndex, name, isloop);
        if (nextData) {
            this.addAnimation(0, nextData.name, nextData.loop, 0);
        }
    };
    SpinePlayerCtrl.prototype.isStopSpine = function (isPaused) {
        this.paused = isPaused;
    };
    /**
     * 动画播放完成处理
     */
    SpinePlayerCtrl.prototype._handleAniCompleteEvent = function (trackEntry, loopCount) {
        // console.error("播放完毕");
        clearTimeout(this._timeout);
        this._curPlayName = null;
        if (this.callback) {
            this.callback();
            // this.callback = null;
        }
    };
    /**动画帧监听 */
    SpinePlayerCtrl.prototype._handleFrameEvent = function (event) {
        if (this.frameCallback) {
            this.frameCallback(event);
        }
    };
    SpinePlayerCtrl.prototype.onDestroy = function () {
        this.callback = null;
        this.frameCallback = null;
    };
    SpinePlayerCtrl.prototype._setMix = function (anim1, anim2) {
        this.setMix(anim1, anim2, 0.5);
        this.setMix(anim2, anim1, 0.5);
    };
    Object.defineProperty(SpinePlayerCtrl.prototype, "curPlay", {
        /**
         * 获得当前节点
         */
        get: function () {
            return this._curPlayName;
        },
        enumerable: false,
        configurable: true
    });
    SpinePlayerCtrl = __decorate([
        ccclass
    ], SpinePlayerCtrl);
    return SpinePlayerCtrl;
}(sp.Skeleton));
exports.default = SpinePlayerCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxDdXN0b21Db21wb25lbnRcXFNwaW5lUGxheWVyQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNHLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZDLG1DQUFXO0lBQXhEO1FBQUEscUVBZ0ZDO1FBL0VXLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDMUIsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFDL0Isa0JBQVksR0FBVyxJQUFJLENBQUM7UUFDNUIsY0FBUSxHQUFHLElBQUksQ0FBQzs7SUE0RTVCLENBQUM7SUExRUcsZ0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSSw4QkFBSSxHQUFYLFVBQVksSUFBWSxFQUFFLFVBQWtCLEVBQUUsTUFBdUIsRUFBRSxRQUFtQixFQUFFLGtCQUE2QixFQUFFLFFBQTBDO1FBQXZILHVCQUFBLEVBQUEsY0FBdUI7UUFDakUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsdUJBQXVCO1FBQ3ZCLHlDQUF5QztRQUN6Qyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBQ2hDLG9DQUFvQztRQUNwQyxvQkFBb0I7UUFDcEIsSUFBSTtRQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUM7SUFFTSxxQ0FBVyxHQUFsQixVQUFtQixRQUFpQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxpREFBdUIsR0FBL0IsVUFBZ0MsVUFBVSxFQUFFLFNBQVM7UUFDakQseUJBQXlCO1FBQ3pCLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLHdCQUF3QjtTQUMzQjtJQUNMLENBQUM7SUFFRCxXQUFXO0lBQ0gsMkNBQWlCLEdBQXpCLFVBQTBCLEtBQUs7UUFDM0IsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBR0QsbUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLEtBQUs7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBS0Qsc0JBQVcsb0NBQU87UUFIbEI7O1dBRUc7YUFDSDtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQTlFZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQWdGbkM7SUFBRCxzQkFBQztDQWhGRCxBQWdGQyxDQWhGNEMsRUFBRSxDQUFDLFFBQVEsR0FnRnZEO2tCQWhGb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogc3BpbmXliqjnlLvmjqfliLblmahcbiAqL1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaW5lUGxheWVyQ3RybCBleHRlbmRzIHNwLlNrZWxldG9uIHtcbiAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBmcmFtZUNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfY3VyUGxheU5hbWU6IHN0cmluZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdGltZW91dCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2V0Q29tcGxldGVMaXN0ZW5lcih0aGlzLl9oYW5kbGVBbmlDb21wbGV0ZUV2ZW50LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXIodGhpcy5faGFuZGxlRnJhbWVFdmVudC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKiogXG4gICAgICog5pKt5pS+5Yqo55S7XG4gICAgICogQHBhcmFtIG5hbWUg5Yqo55S75ZCN5a2XXG4gICAgICogQHBhcmFtIHRyYWNrSW5kZXggLi7mkJ7kuI3muIXov5nmmK/kuKrku4DkuYjnjqnmhI9cbiAgICAgKiBAcGFyYW0gaXNsb29wIOaYr+WQpuW+queOr1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayDliqjnlLvmkq3mlL7lrozmiJDlm57osINcbiAgICAgKiBAcGFyYW0gZnJhbWVFdmVudENhbGxiYWNrIOWKqOeUu+iHquWumuS5ieS6i+S7tuWbnuiwg1xuICAgICAqIEBwYXJhbSBuZXh0RGF0YSDlpoLmnpzpnIDopoHmkq3mlL7kuIvkuIDkuKrliqjnlLvnmoTmlbDmja5cbiAgICAgKi9cbiAgICBwdWJsaWMgcGxheShuYW1lOiBzdHJpbmcsIHRyYWNrSW5kZXg6IG51bWJlciwgaXNsb29wOiBib29sZWFuID0gZmFsc2UsIGNhbGxiYWNrPzogRnVuY3Rpb24sIGZyYW1lRXZlbnRDYWxsYmFjaz86IEZ1bmN0aW9uLCBuZXh0RGF0YT86IHsgbmFtZTogc3RyaW5nLCBsb29wOiBib29sZWFuIH0pIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLmZyYW1lQ2FsbGJhY2sgPSBmcmFtZUV2ZW50Q2FsbGJhY2s7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jdXJQbGF5TmFtZSA9IG5hbWU7XG4gICAgICAgIC8vIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICAgIC8vICAgICB0aGlzLl90aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jYWxsYmFjayAmJiB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fY3VyUGxheU5hbWUgPSBudWxsO1xuICAgICAgICAvLyAgICAgfSwgNSAqIDEwMDApO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKHRyYWNrSW5kZXgsIG5hbWUsIGlzbG9vcCk7XG4gICAgICAgIGlmIChuZXh0RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5hZGRBbmltYXRpb24oMCwgbmV4dERhdGEubmFtZSwgbmV4dERhdGEubG9vcCwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNTdG9wU3BpbmUoaXNQYXVzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBpc1BhdXNlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqjnlLvmkq3mlL7lrozmiJDlpITnkIZcbiAgICAgKi9cbiAgICBwcml2YXRlIF9oYW5kbGVBbmlDb21wbGV0ZUV2ZW50KHRyYWNrRW50cnksIGxvb3BDb3VudCkge1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwi5pKt5pS+5a6M5q+VXCIpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgICAgIHRoaXMuX2N1clBsYXlOYW1lID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5Yqo55S75bin55uR5ZCsICovXG4gICAgcHJpdmF0ZSBfaGFuZGxlRnJhbWVFdmVudChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5mcmFtZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQ2FsbGJhY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLmZyYW1lQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIF9zZXRNaXgoYW5pbTEsIGFuaW0yKSB7XG4gICAgICAgIHRoaXMuc2V0TWl4KGFuaW0xLCBhbmltMiwgMC41KTtcbiAgICAgICAgdGhpcy5zZXRNaXgoYW5pbTIsIGFuaW0xLCAwLjUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+W+l+W9k+WJjeiKgueCuVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgY3VyUGxheSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VyUGxheU5hbWU7XG4gICAgfVxuXG59XG5cbiJdfQ==