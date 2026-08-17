"use strict";
cc._RF.push(module, 'ee0ab3T6xFByK1GH1Bjwqs2', 'ActionCtrl');
// Script/Logic/Common/ActionCtrl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingletonFactory_1 = require("../../Base/Utils/SingletonFactory");
var GameModel_1 = require("../Match3/Model/GameModel");
var Common_1 = require("./Common");
var Util_1 = require("../../Base/Utils/Util");
var TimeConfig_1 = require("../Data/Const/TimeConfig");
var Constant_1 = require("../Data/Const/Constant");
var ActionCtrl = /** @class */ (function () {
    function ActionCtrl() {
    }
    ActionCtrl.prototype.runShowCross = function (target, gridViewPool) {
        return new Promise(function (resolve) {
            var fristViewNode = gridViewPool.get(0);
            var maxGridViewNode = gridViewPool.get(GameModel_1.default.ins.mapCount - 1);
            var a0 = cc.delayTime(0.3);
            var a1 = cc.scaleTo(0.5, 0.85);
            var a2 = cc.delayTime(0.2);
            var a3 = cc.moveTo(1, cc.v2(-maxGridViewNode.x * 0.85, 0));
            var a5 = cc.delayTime(1);
            var a6 = cc.moveTo(GameModel_1.default.ins.mapCount * 1, fristViewNode.position);
            var a4 = cc.scaleTo(0.5, 1);
            target.runAction(cc.sequence(a0, a1, a2, a3, a5, a6, a4, cc.callFunc(resolve)));
        });
    };
    ActionCtrl.prototype.runShowRow = function (target, maskHeight) {
        return new Promise(function (resolve) {
            var gapDistance = (target.height - maskHeight + Common_1.default.GRID_H) / 2;
            target.y = gapDistance;
            var a0 = cc.delayTime(0.5);
            var a1 = cc.moveTo(1.5, cc.v2(0, -gapDistance));
            var a2 = cc.callFunc(resolve);
            target.runAction(cc.sequence(a0, a1, a2));
        });
    };
    ActionCtrl.prototype.runMoveRow = function (target, distance) {
        return new Promise(function (resolve) {
            var a0 = cc.delayTime(0.3);
            var a1 = cc.moveBy(1, cc.v2(0, distance));
            var a2 = cc.callFunc(resolve);
            target.runAction(cc.sequence(a0, a1, a2));
        });
    };
    ActionCtrl.prototype.runMoveCross = function (target) {
        return new Promise(function (resolve) {
            var a2 = cc.callFunc(resolve);
            var a1 = cc.moveBy(1, cc.v2(-cc.winSize.width, 0));
            target.runAction(cc.sequence(a1, a2));
        });
    };
    ActionCtrl.prototype.runCollectNormalCell = function (target, targetPos, elimateType) {
        if (elimateType === void 0) { elimateType = Constant_1.ElimateType.Default; }
        return new Promise(function (resolve) {
            target.scale = 1;
            var moveTime = target.position.sub(targetPos).mag() * (1.8 / TimeConfig_1.GapTime.CollectMoveSpeed);
            moveTime = moveTime < 0.5 ? moveTime * 2 : moveTime;
            // console.error(moveTime);
            var radians = Math.atan2((target.x - targetPos.x), (target.y - targetPos.y));
            var degrees = radians * -180 / Math.PI;
            var bezierMY = 100 + Util_1.Util.Tool.rangeInt(0, 150);
            var a2 = cc.rotateTo(moveTime, degrees);
            var a3 = cc.callFunc(resolve);
            var finalAction = null;
            // if (elimateType == <any>CellType.Bomb1) {
            //     const tmpGap = 250
            //     const a0 = cc.moveBy(0.25, cc.v2(target.position.add(cc.v2(Util.Tool.rangeInt(-tmpGap, tmpGap), Util.Tool.rangeInt(-tmpGap, tmpGap)))));
            //     const a1 = cc.moveTo(moveTime, targetPos);
            //     finalAction = cc.sequence(a0.easing(cc.easeOut(1)), cc.spawn(a1, a2), a3)
            // } else {
            var a1 = cc.bezierTo(moveTime, [target.getPosition(), cc.v2(0, Util_1.Util.Tool.rangeInt(0, 10) < 5 ? bezierMY : -bezierMY), targetPos]);
            finalAction = cc.sequence(cc.spawn(a1, a2), a3);
            // }
            target.runAction(finalAction);
        });
    };
    ActionCtrl.prototype.runCollectGem = function (node, targetPos, newParent) {
        return new Promise(function (resolve) {
            var newPosition = node.parent.convertToWorldSpaceAR(node.position);
            var moveTime = newPosition.sub(targetPos).mag() * 0.001;
            node.setScale(1);
            var a1 = cc.scaleTo(0.4, node.scale + 0.2);
            var a2 = cc.spawn(cc.moveTo(moveTime, newParent.convertToNodeSpaceAR(targetPos)), cc.scaleTo(moveTime, 0.1));
            var a3 = cc.callFunc(resolve);
            node.runAction(cc.sequence(a1, a2, a3));
        });
    };
    ActionCtrl.prototype.runCollectGnome = function (target, targetPos, newParent) {
        var _this = this;
        return new Promise(function (resolve) {
            var newPosition = target.parent.convertToWorldSpaceAR(target.position);
            var moveTime = newPosition.sub(targetPos).mag() * 0.001;
            var a0 = cc.delayTime(0.5);
            var a1 = cc.spawn(cc.callFunc(function () {
                target.parent = newParent;
                target.setPosition(newParent.convertToNodeSpaceAR(newPosition));
                _this.convetGnomeAnchorPos(target);
            }), cc.scaleTo(0.4, target.scale + 0.2), cc.rotateTo(0.3, 0));
            var a2 = cc.rotateTo(0.2, 15);
            var a3 = cc.rotateTo(0.2, -15);
            var a4 = cc.rotateTo(0.2, 0); // -90
            var a5 = cc.spawn(cc.moveTo(moveTime, newParent.convertToNodeSpaceAR(targetPos)), cc.scaleTo(moveTime, 0.1));
            var a6 = cc.callFunc(resolve);
            target.runAction(cc.sequence(a0, a1, a2, a3, a4, a5, a6));
        });
    };
    ActionCtrl.prototype.convetGnomeAnchorPos = function (gn) {
        var x, y;
        if (gn.angle != 0) {
            x = gn.x + (0.5 - gn.anchorX) * gn.height * gn.scaleX;
            y = gn.y - (0.5 - gn.anchorY) * (gn.width + 20) * gn.scaleY;
        }
        else {
            x = gn.x + (0.5 - gn.anchorX) * gn.width * gn.scaleX;
            y = gn.y + (0.5 - gn.anchorY) * (gn.height + 20) * gn.scaleY;
        }
        gn.setPosition(cc.v2(x, y));
        gn.setAnchorPoint(cc.v2(0.5, 0.5));
        gn.getChildByName('Sprite').setAnchorPoint(cc.v2(0.5, 0.5));
    };
    ActionCtrl.ins = SingletonFactory_1.SingletonFactory.getInstance(ActionCtrl);
    return ActionCtrl;
}());
exports.default = ActionCtrl;

cc._RF.pop();