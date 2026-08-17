
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/View/Tips.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '38444alxRVB0YEnkfY8rebN', 'Tips');
// Script/Base/Manager/View/Tips.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("./View");
var Tips = /** @class */ (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        var _this = _super.call(this, 'Tips') || this;
        /**排队展示未实现..... */
        _this.mTipsPool = [];
        _this.mPlayState = 0;
        _this.mTimer = null;
        return _this;
    }
    Object.defineProperty(Tips, "ins", {
        get: function () {
            if (this.instance == null) {
                this.instance = new Tips();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param content
     * @param type 0是普通提示 1是图片提示
     * @param time
     */
    Tips.prototype.show = function (content, type, time) {
        if (type === void 0) { type = 0; }
        if (time === void 0) { time = 2; }
        //.......按照顺序显示tips 暂未实现.
        this.init();
        this.mTimer = time;
        if (this.mPlayState != 1 || this.isInvalidNode) {
            if (this.isInvalidNode)
                this.mNode = null;
            this.mPlayState = 1;
            if (!this.mNode) {
                this._initTipsView(content, type);
            }
            else {
                this._setContent(content, type);
                this.onShow();
            }
        }
    };
    Object.defineProperty(Tips.prototype, "isInvalidNode", {
        get: function () {
            return this.mNode && !this.mNode.parent;
        },
        enumerable: false,
        configurable: true
    });
    Tips.prototype._initTipsView = function (content, type) {
        var _this = this;
        if (content === void 0) { content = ''; }
        if (!this.mRootNode) {
            return;
        }
        cc.loader.loadRes('prefab/ui/tips', cc.Prefab, function (err, prefab) {
            if (err) {
                return console.error(err, prefab);
            }
            _this.mNode = cc.instantiate(prefab);
            _this.mRootNode.addChild(_this.mNode);
            _this._setContent(content, type);
            _this.onShow();
        });
    };
    Tips.prototype._setContent = function (content, type) {
        if (!this.mNode) {
            return console.error('Error: tips is not init ! ');
        }
        if (type == 0) {
            this.mNode.getChildByName('normal').active = true;
            this.mNode.getChildByName('gril').active = false;
            if (typeof content == 'string') {
                cc.find('normal/picContent', this.mNode).active = false;
                var c = cc.find('normal/content', this.mNode);
                c.active = true;
                c.getComponent(cc.Label).string = content;
            }
            else {
                cc.find('normal/content', this.mNode).active = false;
                var pic = cc.find('normal/picContent', this.mNode);
                pic.getComponent(cc.Sprite).spriteFrame = content;
            }
        }
        else {
            this.mNode.getChildByName('normal').active = false;
            this.mNode.getChildByName('gril').active = true;
            var c = cc.find('gril/content', this.mNode);
            c.getComponent(cc.Label).string = content;
        }
    };
    Tips.prototype.playHideAnimate = function () {
        this.mNode.opacity = 255;
        this.mNode.setPosition(0, 0);
        this.mNode.active = false;
        this.mPlayState = 0;
    };
    Tips.prototype.playShowAnimate = function () {
        var _this = this;
        this.mNode.active = true;
        var a1 = cc.moveBy(0.1, cc.v2(0, 40));
        var a2 = cc.moveBy(0.1, cc.v2(0, -20));
        var a3 = cc.delayTime(this.mTimer);
        var a4 = cc.callFunc(function () {
            _this.mNode.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () { return _this.onHide(); }, _this)));
        });
        this.mNode.runAction(cc.sequence(a1, a2, a3, a4));
    };
    // public static ins: Tips = SingletonFactory.getInstance(Tips);
    Tips.instance = null;
    return Tips;
}(View_1.default));
exports.default = Tips;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxWaWV3XFxUaXBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtCQUEwQjtBQUcxQjtJQUFrQyx3QkFBSTtJQW9CbEM7UUFBQSxZQUNJLGtCQUFNLE1BQU0sQ0FBQyxTQUNoQjtRQXBCRCxrQkFBa0I7UUFDVixlQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWYsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFNLEdBQUcsSUFBSSxDQUFDOztJQWdCdEIsQ0FBQztJQVZELHNCQUFrQixXQUFHO2FBQXJCO1lBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2FBQzlCO1lBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBT0Q7Ozs7O09BS0c7SUFDSSxtQkFBSSxHQUFYLFVBQVksT0FBZ0MsRUFBRSxJQUFnQixFQUFFLElBQWdCO1FBQWxDLHFCQUFBLEVBQUEsUUFBZ0I7UUFBRSxxQkFBQSxFQUFBLFFBQWdCO1FBQzVFLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsYUFBYTtnQkFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDYixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsc0JBQVksK0JBQWE7YUFBekI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtRQUMzQyxDQUFDOzs7T0FBQTtJQUVPLDRCQUFhLEdBQXJCLFVBQXNCLE9BQXFDLEVBQUUsSUFBWTtRQUF6RSxpQkFhQztRQWJxQix3QkFBQSxFQUFBLFlBQXFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLE9BQU07U0FDVDtRQUNELEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtZQUN2RCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQyxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sMEJBQVcsR0FBbkIsVUFBb0IsT0FBZ0MsRUFBRSxJQUFZO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2IsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakQsSUFBSSxPQUFPLE9BQU8sSUFBSSxRQUFRLEVBQUU7Z0JBQzVCLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3hELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQzthQUM3QztpQkFBTTtnQkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNyRCxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDcEQsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQzthQUNyRDtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDaEQsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxPQUFpQixDQUFDO1NBQ3ZEO0lBQ0wsQ0FBQztJQUVTLDhCQUFlLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVTLDhCQUFlLEdBQXpCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsRUFBRSxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQWxHRCxnRUFBZ0U7SUFFbEQsYUFBUSxHQUFTLElBQUksQ0FBQztJQWlHeEMsV0FBQztDQTNHRCxBQTJHQyxDQTNHaUMsY0FBSSxHQTJHckM7a0JBM0dvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgVmlldyBmcm9tIFwiLi9WaWV3XCI7XG5pbXBvcnQgeyBTaW5nbGV0b25GYWN0b3J5IH0gZnJvbSBcIi4uLy4uL1V0aWxzL1NpbmdsZXRvbkZhY3RvcnlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlwcyBleHRlbmRzIFZpZXcge1xuXG4gICAgLyoq5o6S6Zif5bGV56S65pyq5a6e546wLi4uLi4gKi9cbiAgICBwcml2YXRlIG1UaXBzUG9vbCA9IFtdO1xuXG4gICAgcHJpdmF0ZSBtUGxheVN0YXRlID0gMDtcbiAgICBwcml2YXRlIG1UaW1lciA9IG51bGw7XG5cbiAgICAvLyBwdWJsaWMgc3RhdGljIGluczogVGlwcyA9IFNpbmdsZXRvbkZhY3RvcnkuZ2V0SW5zdGFuY2UoVGlwcyk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOiBUaXBzID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGlucygpOiBUaXBzIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBUaXBzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1RpcHMnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY29udGVudCBcbiAgICAgKiBAcGFyYW0gdHlwZSAw5piv5pmu6YCa5o+Q56S6IDHmmK/lm77niYfmj5DnpLpcbiAgICAgKiBAcGFyYW0gdGltZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdyhjb250ZW50OiBzdHJpbmcgfCBjYy5TcHJpdGVGcmFtZSwgdHlwZTogbnVtYmVyID0gMCwgdGltZTogbnVtYmVyID0gMikge1xuICAgICAgICAvLy4uLi4uLi7mjInnhafpobrluo/mmL7npLp0aXBzIOaaguacquWunueOsC5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMubVRpbWVyID0gdGltZTtcbiAgICAgICAgaWYgKHRoaXMubVBsYXlTdGF0ZSAhPSAxIHx8IHRoaXMuaXNJbnZhbGlkTm9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnZhbGlkTm9kZSkgdGhpcy5tTm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm1QbGF5U3RhdGUgPSAxO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm1Ob2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFRpcHNWaWV3KGNvbnRlbnQsIHR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRDb250ZW50KGNvbnRlbnQsIHR5cGUpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBpc0ludmFsaWROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tTm9kZSAmJiAhdGhpcy5tTm9kZS5wYXJlbnRcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0VGlwc1ZpZXcoY29udGVudDogc3RyaW5nIHwgY2MuU3ByaXRlRnJhbWUgPSAnJywgdHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5tUm9vdE5vZGUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdwcmVmYWIvdWkvdGlwcycsIGNjLlByZWZhYiwgKGVyciwgcHJlZmFiKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyLCBwcmVmYWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm1Sb290Tm9kZS5hZGRDaGlsZCh0aGlzLm1Ob2RlKTtcbiAgICAgICAgICAgIHRoaXMuX3NldENvbnRlbnQoY29udGVudCwgdHlwZSk7XG4gICAgICAgICAgICB0aGlzLm9uU2hvdygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyB8IGNjLlNwcml0ZUZyYW1lLCB0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1Ob2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcignRXJyb3I6IHRpcHMgaXMgbm90IGluaXQgISAnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1Ob2RlLmdldENoaWxkQnlOYW1lKCdub3JtYWwnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tTm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ3JpbCcpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgY2MuZmluZCgnbm9ybWFsL3BpY0NvbnRlbnQnLCB0aGlzLm1Ob2RlKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gY2MuZmluZCgnbm9ybWFsL2NvbnRlbnQnLCB0aGlzLm1Ob2RlKTtcbiAgICAgICAgICAgICAgICBjLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbnRlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ25vcm1hbC9jb250ZW50JywgdGhpcy5tTm9kZSkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgcGljID0gY2MuZmluZCgnbm9ybWFsL3BpY0NvbnRlbnQnLCB0aGlzLm1Ob2RlKVxuICAgICAgICAgICAgICAgIHBpYy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1Ob2RlLmdldENoaWxkQnlOYW1lKCdub3JtYWwnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubU5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2dyaWwnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgYyA9IGNjLmZpbmQoJ2dyaWwvY29udGVudCcsIHRoaXMubU5vZGUpO1xuICAgICAgICAgICAgYy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbnRlbnQgYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBsYXlIaWRlQW5pbWF0ZSgpIHtcbiAgICAgICAgdGhpcy5tTm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB0aGlzLm1Ob2RlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICB0aGlzLm1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1QbGF5U3RhdGUgPSAwO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwbGF5U2hvd0FuaW1hdGUoKSB7XG4gICAgICAgIHRoaXMubU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgYTEgPSBjYy5tb3ZlQnkoMC4xLCBjYy52MigwLCA0MCkpO1xuICAgICAgICBjb25zdCBhMiA9IGNjLm1vdmVCeSgwLjEsIGNjLnYyKDAsIC0yMCkpO1xuICAgICAgICBjb25zdCBhMyA9IGNjLmRlbGF5VGltZSh0aGlzLm1UaW1lcik7XG4gICAgICAgIGNvbnN0IGE0ID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZU91dCgwLjIpLCBjYy5jYWxsRnVuYygoKSA9PiB0aGlzLm9uSGlkZSgpLCB0aGlzKSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTEsIGEyLCBhMywgYTQpKTtcbiAgICB9XG59Il19