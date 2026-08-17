
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/CustomComponent/SlideButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb316Sfe3dKOYmAJ3fiEojP', 'SlideButton');
// Script/Base/CustomComponent/SlideButton.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SlideButton = /** @class */ (function (_super) {
    __extends(SlideButton, _super);
    function SlideButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openSprite = null;
        _this.closeSprite = null;
        _this.bar = null;
        _this.eventHandler = null;
        _this._isOpen = true;
        _this._isPlaying = false;
        return _this;
    }
    SlideButton.prototype.onLoad = function () {
        this._isOpen = true;
        this._isPlaying = false;
    };
    SlideButton.prototype._change = function (isNeedPlayAction) {
        if (isNeedPlayAction === void 0) { isNeedPlayAction = true; }
        if (this._isOpen) {
            this.openSprite.node.active = true;
            this.closeSprite.node.active = false;
        }
        else {
            this.openSprite.node.active = false;
            this.closeSprite.node.active = true;
        }
        if (isNeedPlayAction) {
            this._playMoveBarAction();
        }
        else {
            this.eventHandler.emit([this._isOpen]);
            if (!this._isOpen || (this._isOpen && this.bar.node['open'] == false)) {
                this._playMoveBarAction();
            }
        }
    };
    SlideButton.prototype._playMoveBarAction = function () {
        var _this = this;
        var distance = this.openSprite.node.width / 2;
        if (this.bar.node['open'] != this._isOpen) {
            if (!this._isOpen) {
                distance = -distance;
            }
            this._isPlaying = true;
            this.bar.node['open'] = this._isOpen;
            this.bar.node.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(distance, 0)), cc.callFunc(function () {
                _this._isPlaying = false;
                _this.eventHandler.emit([_this._isOpen]);
            }, this)));
        }
    };
    SlideButton.prototype.onChange = function (event, opt) {
        if (opt === void 0) { opt = null; }
        if (this._isPlaying)
            return;
        var isMove = true;
        if (opt != null) {
            this._isOpen = opt;
            isMove = false;
        }
        else {
            this._isOpen = !this._isOpen;
        }
        this._change(isMove);
    };
    __decorate([
        property(cc.Sprite)
    ], SlideButton.prototype, "openSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], SlideButton.prototype, "closeSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], SlideButton.prototype, "bar", void 0);
    __decorate([
        property(cc.Component.EventHandler)
    ], SlideButton.prototype, "eventHandler", void 0);
    SlideButton = __decorate([
        ccclass
    ], SlideButton);
    return SlideButton;
}(cc.Component));
exports.default = SlideButton;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxDdXN0b21Db21wb25lbnRcXFNsaWRlQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBeUIsRUFBRSxDQUFDLFVBQVUsRUFBcEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFtQixDQUFDO0FBRzdDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBb0VDO1FBakVHLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLFNBQUcsR0FBYyxJQUFJLENBQUM7UUFHdEIsa0JBQVksR0FBOEIsSUFBSSxDQUFDO1FBRXZDLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsZ0JBQVUsR0FBWSxLQUFLLENBQUM7O0lBcUR4QyxDQUFDO0lBbkRHLDRCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUU1QixDQUFDO0lBRU8sNkJBQU8sR0FBZixVQUFnQixnQkFBZ0M7UUFBaEMsaUNBQUEsRUFBQSx1QkFBZ0M7UUFDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdkM7UUFFRCxJQUFJLGdCQUFnQixFQUFFO1lBQ2xCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDbkUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7SUFFTyx3Q0FBa0IsR0FBMUI7UUFBQSxpQkFhQztRQVpHLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNmLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQzthQUN4QjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNoRixLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixLQUFLLEVBQUUsR0FBbUI7UUFBbkIsb0JBQUEsRUFBQSxVQUFtQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTztRQUM1QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDbkIsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNsQjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7U0FDL0I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFoRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNVO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQ0U7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7cURBQ1c7SUFaOUIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQW9FL0I7SUFBRCxrQkFBQztDQXBFRCxBQW9FQyxDQXBFd0MsRUFBRSxDQUFDLFNBQVMsR0FvRXBEO2tCQXBFb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZUJ1dHRvbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIG9wZW5TcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGNsb3NlU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBiYXI6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcilcbiAgICBldmVudEhhbmRsZXI6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwcml2YXRlIF9pc1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5faXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGFuZ2UoaXNOZWVkUGxheUFjdGlvbjogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vcGVuU3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlblNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jbG9zZVNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOZWVkUGxheUFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fcGxheU1vdmVCYXJBY3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLmVtaXQoW3RoaXMuX2lzT3Blbl0pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc09wZW4gfHwgKHRoaXMuX2lzT3BlbiAmJiB0aGlzLmJhci5ub2RlWydvcGVuJ10gPT0gZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheU1vdmVCYXJBY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3BsYXlNb3ZlQmFyQWN0aW9uKCkge1xuICAgICAgICBsZXQgZGlzdGFuY2U6IG51bWJlciA9IHRoaXMub3BlblNwcml0ZS5ub2RlLndpZHRoIC8gMjtcbiAgICAgICAgaWYgKHRoaXMuYmFyLm5vZGVbJ29wZW4nXSAhPSB0aGlzLl9pc09wZW4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSAtZGlzdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5iYXIubm9kZVsnb3BlbiddID0gdGhpcy5faXNPcGVuO1xuICAgICAgICAgICAgdGhpcy5iYXIubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMSwgY2MudjIoZGlzdGFuY2UsIDApKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLmVtaXQoW3RoaXMuX2lzT3Blbl0pO1xuICAgICAgICAgICAgfSwgdGhpcykpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNoYW5nZShldmVudCwgb3B0OiBib29sZWFuID0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faXNQbGF5aW5nKSByZXR1cm47XG4gICAgICAgIGxldCBpc01vdmUgPSB0cnVlO1xuICAgICAgICBpZiAob3B0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IG9wdDtcbiAgICAgICAgICAgIGlzTW92ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gIXRoaXMuX2lzT3BlblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZShpc01vdmUpO1xuICAgIH1cbn1cbiJdfQ==