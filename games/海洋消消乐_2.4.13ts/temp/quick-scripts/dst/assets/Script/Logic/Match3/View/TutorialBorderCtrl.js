
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/TutorialBorderCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd28ecZG6OBHAJC5J6xJKXz6', 'TutorialBorderCtrl');
// Script/Logic/Match3/View/TutorialBorderCtrl.ts

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
var Common_1 = require("../../Common/Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TutorialBorderCtrl = /** @class */ (function (_super) {
    __extends(TutorialBorderCtrl, _super);
    function TutorialBorderCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.borderFrames = [];
        _this.stage = null;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    TutorialBorderCtrl.prototype.setData = function (stage) {
        this.stage = stage;
        if (this.stage && this.stage.cells) {
            var xMin_1 = Number.MAX_VALUE, xMax_1 = 0, yMin_1 = Number.MAX_VALUE, yMax_1 = 0;
            this.stage.cells.forEach(function (element) {
                xMin_1 = xMin_1 < element.x ? xMin_1 : element.x;
                xMax_1 = xMax_1 > element.x ? xMax_1 : element.x;
                yMin_1 = yMin_1 < element.y ? yMin_1 : element.y;
                yMax_1 = yMax_1 > element.y ? yMax_1 : element.y;
            });
            for (var y = yMin_1 - 1; y <= yMax_1 + 1; y++) {
                for (var x = xMin_1 - 1; x <= xMax_1 + 1; x++) {
                    var borderName = this.getBorderSpriteName(x, y);
                    if (Common_1.default.getGroundBorderInfo(borderName)) {
                        this.initBorderView(borderName, x, y);
                    }
                }
            }
        }
    };
    TutorialBorderCtrl.prototype.initBorderView = function (name, x, y) {
        var cfg = Common_1.default.getGroundBorderInfo(name);
        var pos = Common_1.default.getPos(x, y);
        pos.x -= Common_1.default.GRID_W / 2;
        pos.y += Common_1.default.GRID_H / 2;
        this.createBorder(pos, cfg, name);
    };
    TutorialBorderCtrl.prototype.createBorder = function (pos, cfg, name) {
        var borderNode = new cc.Node();
        var sprite = borderNode.addComponent(cc.Sprite);
        borderNode.parent = this.node;
        borderNode.zIndex = 2;
        sprite.trim = false;
        sprite.spriteFrame = this.getBorderFrame(cfg[0]);
        borderNode.setPosition(pos);
        borderNode.setScale(cfg[1]);
        borderNode.setContentSize(cc.size(Common_1.default.GRID_W, Common_1.default.GRID_H));
    };
    TutorialBorderCtrl.prototype.getBorderFrame = function (name) {
        var result = null;
        for (var i = this.borderFrames.length; i--;) {
            var frame = this.borderFrames[i];
            if (frame.name.includes(name)) {
                result = frame;
            }
        }
        if (!result) {
            console.error('没找到资源:----->', name);
        }
        return result;
    };
    TutorialBorderCtrl.prototype.getBorderSpriteName = function (x, y) {
        var name = "";
        name += this.getCellEmptyStatus(x - 1, y - 1);
        name += this.getCellEmptyStatus(x, y - 1);
        name += this.getCellEmptyStatus(x - 1, y);
        name += this.getCellEmptyStatus(x, y);
        return name;
    };
    TutorialBorderCtrl.prototype.getCellEmptyStatus = function (x, y) {
        var result = 0;
        this.stage.cells.forEach(function (element) {
            if (element.x == x && element.y == y) {
                result = 1;
            }
        });
        return result;
    };
    __decorate([
        property([cc.SpriteFrame])
    ], TutorialBorderCtrl.prototype, "borderFrames", void 0);
    TutorialBorderCtrl = __decorate([
        ccclass
    ], TutorialBorderCtrl);
    return TutorialBorderCtrl;
}(cc.Component));
exports.default = TutorialBorderCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxUdXRvcmlhbEJvcmRlckN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQXlDO0FBRW5DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWdELHNDQUFZO0lBQTVEO1FBQUEscUVBMkZDO1FBeEZHLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUU1QixXQUFLLEdBQVcsSUFBSSxDQUFDOztRQXFGN0IsaUJBQWlCO0lBQ3JCLENBQUM7SUFwRkcsZUFBZTtJQUVmLG9DQUFPLEdBQVAsVUFBUSxLQUFhO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQyxJQUFJLE1BQUksR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQUksR0FBRyxDQUFDLEVBQUUsTUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBSSxHQUFHLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dCQUM1QixNQUFJLEdBQUcsTUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBSSxHQUFHLE1BQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRTNDLE1BQUksR0FBRyxNQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBSSxD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QUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElTdGFnZSB9IGZyb20gJy4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lUdXRvcmlhbCc7XG5pbXBvcnQgQ29tbW9uIGZyb20gJy4uLy4uL0NvbW1vbi9Db21tb24nO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHV0b3JpYWxCb3JkZXJDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGJvcmRlckZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBzdGFnZTogSVN0YWdlID0gbnVsbDtcblxuICAgIC8vIG9uTG9hZCAoKSB7fVxuXG4gICAgc2V0RGF0YShzdGFnZTogSVN0YWdlKSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhZ2UgJiYgdGhpcy5zdGFnZS5jZWxscykge1xuICAgICAgICAgICAgbGV0IHhNaW4gPSBOdW1iZXIuTUFYX1ZBTFVFLCB4TWF4ID0gMCwgeU1pbiA9IE51bWJlci5NQVhfVkFMVUUsIHlNYXggPSAwO1xuICAgICAgICAgICAgdGhpcy5zdGFnZS5jZWxscy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHhNaW4gPSB4TWluIDwgZWxlbWVudC54ID8geE1pbiA6IGVsZW1lbnQueDtcbiAgICAgICAgICAgICAgICB4TWF4ID0geE1heCA+IGVsZW1lbnQueCA/IHhNYXggOiBlbGVtZW50Lng7XG5cbiAgICAgICAgICAgICAgICB5TWluID0geU1pbiA8IGVsZW1lbnQueSA/IHlNaW4gOiBlbGVtZW50Lnk7XG4gICAgICAgICAgICAgICAgeU1heCA9IHlNYXggPiBlbGVtZW50LnkgPyB5TWF4IDogZWxlbWVudC55O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB5TWluIC0gMTsgeSA8PSB5TWF4ICsgMTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHhNaW4gLSAxOyB4IDw9IHhNYXggKyAxOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9yZGVyTmFtZSA9IHRoaXMuZ2V0Qm9yZGVyU3ByaXRlTmFtZSh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENvbW1vbi5nZXRHcm91bmRCb3JkZXJJbmZvKGJvcmRlck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRCb3JkZXJWaWV3KGJvcmRlck5hbWUsIHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEJvcmRlclZpZXcobmFtZTogc3RyaW5nLCB4LCB5KSB7XG4gICAgICAgIGNvbnN0IGNmZyA9IENvbW1vbi5nZXRHcm91bmRCb3JkZXJJbmZvKG5hbWUpO1xuICAgICAgICBjb25zdCBwb3MgPSBDb21tb24uZ2V0UG9zKHgsIHkpO1xuXG4gICAgICAgIHBvcy54IC09IENvbW1vbi5HUklEX1cgLyAyO1xuICAgICAgICBwb3MueSArPSBDb21tb24uR1JJRF9IIC8gMjtcblxuICAgICAgICB0aGlzLmNyZWF0ZUJvcmRlcihwb3MsIGNmZywgbmFtZSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUJvcmRlcihwb3M6IGNjLlZlYzIsIGNmZzogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYm9yZGVyTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgIGNvbnN0IHNwcml0ZSA9IGJvcmRlck5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG5cbiAgICAgICAgYm9yZGVyTm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGJvcmRlck5vZGUuekluZGV4ID0gMjtcbiAgICAgICAgc3ByaXRlLnRyaW0gPSBmYWxzZTtcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5nZXRCb3JkZXJGcmFtZShjZmdbMF0pO1xuICAgICAgICBib3JkZXJOb2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIGJvcmRlck5vZGUuc2V0U2NhbGUoY2ZnWzFdKTtcbiAgICAgICAgYm9yZGVyTm9kZS5zZXRDb250ZW50U2l6ZShjYy5zaXplKENvbW1vbi5HUklEX1csIENvbW1vbi5HUklEX0gpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEJvcmRlckZyYW1lKG5hbWU6IHN0cmluZyk6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgbGV0IHJlc3VsdDogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5ib3JkZXJGcmFtZXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLmJvcmRlckZyYW1lc1tpXTtcbiAgICAgICAgICAgIGlmIChmcmFtZS5uYW1lLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnJhbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+ayoeaJvuWIsOi1hOa6kDotLS0tLT4nLCBuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Qm9yZGVyU3ByaXRlTmFtZSh4LCB5KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xuICAgICAgICBuYW1lICs9IHRoaXMuZ2V0Q2VsbEVtcHR5U3RhdHVzKHggLSAxLCB5IC0gMSk7XG4gICAgICAgIG5hbWUgKz0gdGhpcy5nZXRDZWxsRW1wdHlTdGF0dXMoeCwgeSAtIDEpO1xuICAgICAgICBuYW1lICs9IHRoaXMuZ2V0Q2VsbEVtcHR5U3RhdHVzKHggLSAxLCB5KTtcbiAgICAgICAgbmFtZSArPSB0aGlzLmdldENlbGxFbXB0eVN0YXR1cyh4LCB5KTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDZWxsRW1wdHlTdGF0dXMoeCwgeSk6IG51bWJlciB7XG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICB0aGlzLnN0YWdlLmNlbGxzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC54ID09IHggJiYgZWxlbWVudC55ID09IHkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19