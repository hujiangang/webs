"use strict";
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