"use strict";
cc._RF.push(module, 'd6ec32L2A1A2LNRw7y+WORn', 'Match3TutorialCtrl');
// Script/Logic/Match3/View/Match3TutorialCtrl.ts

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
var TutorialBubbleCtrl_1 = require("./TutorialBubbleCtrl");
var TutorialBorderCtrl_1 = require("./TutorialBorderCtrl");
var TouchHintCtrl_1 = require("./TouchHintCtrl");
var M_1 = require("../../../Base/Manager/M");
var Event_1 = require("../../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Match3TutorialCtrl = /** @class */ (function (_super) {
    __extends(Match3TutorialCtrl, _super);
    function Match3TutorialCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bubble = null;
        _this.touchHint = null;
        _this.maskNode = null;
        _this.borderNode = null;
        _this.handNode = null;
        _this.goal = null;
        _this.maskIdxPos = [];
        _this.cells = [];
        _this.mainData = null;
        _this.controller = null;
        _this.isReady = false;
        _this.isShowGoal = false;
        _this.goalClone = null;
        return _this;
    }
    Match3TutorialCtrl.prototype.start = function () {
    };
    Match3TutorialCtrl.prototype.initView = function (data, controller) {
        var _this = this;
        this.stepIdx = 0;
        this.maskIdxPos = [];
        this.mainData = data;
        this.controller = controller;
        this.isReady = false;
        this.node.zIndex = 101;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var stepData = _this.mainData.stages[_this.stepIdx - 1];
            if (stepData && stepData.closeByTouch) {
                _this.closeTutorial();
                return;
            }
            var status = _this.checkPoint(event.touch.getLocation());
            if (status && _this.isReady) {
                _this.controller.node.emit(cc.Node.EventType.TOUCH_START, event);
            }
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            event.istutorial = true;
            _this.controller.node.emit(cc.Node.EventType.TOUCH_END, event);
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var status1 = _this.checkPoint(event.touch.getStartLocation());
            var status2 = _this.checkPoint(event.touch.getLocation());
            if (status1 && status2 && _this.isReady) {
                _this.controller.node.emit(cc.Node.EventType.TOUCH_MOVE, event);
            }
        });
    };
    Match3TutorialCtrl.prototype.buildStage = function () {
        if (!this.mainData) {
            return false;
        }
        var stage = this.mainData.stages[this.stepIdx];
        this.cells = [];
        if (stage) {
            if (stage.cells) {
                for (var cell in stage.cells) {
                    if (stage.cells[cell].removable)
                        this.cells.push(stage.cells[cell]);
                    else
                        continue;
                }
            }
        }
        if (!stage) {
            return false;
        }
        this.node.active = true;
        var graphics = this.maskNode.getComponent(cc.Mask)["_graphics"];
        graphics.clear(false);
        this.drawMask(graphics, stage);
        graphics.fill();
        this.borderNode.getComponent(TutorialBorderCtrl_1.default).setData(stage);
        this.bubble.getComponent(TutorialBubbleCtrl_1.default).setData(stage.bubble);
        this.stepIdx++;
        return true;
    };
    Match3TutorialCtrl.prototype.startTutorial = function () {
        this.isReady = false;
        this.touchHint.active = false;
        var status = this.buildStage();
        if (status) {
            this.showNode();
        }
    };
    Match3TutorialCtrl.prototype.closeTutorial = function () {
        if (this.node && this.node.active && this.isReady) {
            this.isReady = false;
            this.hidenNode();
        }
    };
    Match3TutorialCtrl.prototype.checkPoint = function (pos) {
        var idxPos = this.convertTouchPosToCell(pos);
        if (idxPos == null) {
            return false;
        }
        var status = false;
        var flag = false;
        for (var i = 0; i < this.cells.length; i++) {
            if (idxPos.x == this.cells[i].x && idxPos.y == this.cells[i].y) {
                flag = true;
                break;
            }
        }
        this.maskIdxPos.forEach(function (p) {
            if (idxPos && p.x == idxPos.x && p.y == idxPos.y && flag) {
                status = true;
            }
        }, this);
        return status;
    };
    Match3TutorialCtrl.prototype.convertTouchPosToCell = function (pos) {
        this.node.convertToNodeSpaceAR(pos, pos);
        // console.log(pos);
        var idxPos = Common_1.default.convetPos(pos);
        // console.log(idxPos)
        if (idxPos.x < 0 || idxPos.x > Common_1.default.GRID_W - 0 || idxPos.y < 0 || idxPos.y > Common_1.default.GRID_H - 0) {
            return null;
        }
        return idxPos;
    };
    Match3TutorialCtrl.prototype.drawHand = function (data) {
        if (!data) {
            this.handNode.active = false;
            return;
        }
        this.handNode.active = true;
        this.handNode.stopAllActions();
        var pos = Common_1.default.getPos(data.x, data.y);
        this.handNode.setPosition(pos);
        if (data.type == "click") {
            this.handNode.runAction(cc.sequence(cc.moveTo(0.4, pos.x, pos.y + 10), cc.moveTo(0.1, pos.x, pos.y), cc.moveTo(0.4, pos.x, pos.y + 10), cc.moveTo(0.1, pos.x, pos.y), cc.moveTo(0.3, pos.x, pos.y)).repeatForever());
        }
        else {
            var dx = 0, dy = 0, step = Common_1.default.GRID_W;
            if (data.type == "left") {
                dx = -1;
            }
            else if (data.type == "right") {
                dx = 1;
            }
            else if (data.type == "up") {
                dy = 1;
            }
            else if (data.type == "down") {
                dy = -1;
            }
            this.handNode.runAction(cc.sequence(cc.moveTo(1, pos.x + dx * step, pos.y + dy * step), cc.moveTo(0.2, pos.x, pos.y)).repeatForever());
        }
    };
    Match3TutorialCtrl.prototype.drawMask = function (graphics, data) {
        this.maskIdxPos = [];
        if (data.cells) {
            data.cells.forEach(function (cell) {
                var pos = Common_1.default.getPos(cell.x, cell.y);
                // console.log(cell.x,cell.y,pos)
                var dd = Common_1.default.GRID_H / 2;
                this.maskIdxPos.push(cc.v2(cell.x, cell.y));
                graphics.fillRect(pos.x - dd - 1, pos.y - dd - 2, Common_1.default.GRID_H + 2, Common_1.default.GRID_W + 4);
            }, this);
        }
    };
    Match3TutorialCtrl.prototype.showGoal = function () {
        this.goalClone = cc.instantiate(this.goal);
        this.node.addChild(this.goalClone);
        this.goalClone.setPosition(this.node.convertToNodeSpaceAR(this.goal.parent.convertToWorldSpaceAR(this.goal.position)));
        this.goalClone.setScale(10 / 9);
        this.isShowGoal = true;
        this.scheduleOnce(function () {
            this.hideGoal();
            this.showGoal();
        }, 1.0);
    };
    Match3TutorialCtrl.prototype.hideGoal = function () {
        if (this.isShowGoal) {
            this.node.removeChild(this.goalClone);
            this.goalClone.destroy();
            this.isShowGoal = false;
        }
    };
    Match3TutorialCtrl.prototype.hidenNode = function () {
        this.handNode.active = false;
        this.bubble.runAction(cc.fadeOut(0.7));
        this.borderNode.runAction(cc.fadeOut(0.7));
        this.scheduleOnce(function () {
            this.borderNode.destroyAllChildren();
            this.hideGoal();
            this.node.active = false;
            this.nextStage();
        }, 0.6);
    };
    Match3TutorialCtrl.prototype.nextStage = function () {
        if (!this.mainData) {
            return false;
        }
        var stages = this.mainData.stages[this.stepIdx];
        if (!stages) {
            return false;
        }
        if (stages) {
            this.startTutorial();
        }
    };
    Match3TutorialCtrl.prototype._showBorderNode = function (callback) {
        this.scheduleOnce(function () {
            this.bubble.runAction(cc.fadeIn(0.3));
            this.borderNode.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(callback)));
        }, 0.2);
    };
    Match3TutorialCtrl.prototype.showNode = function () {
        var _this = this;
        this.node.active = true;
        this.bubble.active = true;
        this.bubble.opacity = 0;
        this._showBorderNode(function () {
            _this.isReady = true;
            M_1.default.event.once(Event_1.Event.UI.CloseTutorial, _this.closeTutorial, _this);
        });
        this.scheduleOnce(function () {
            var stepData = _this.mainData.stages[_this.stepIdx - 1];
            _this.drawHand(stepData.hand);
            if (stepData && stepData.closeByTouch) {
                _this.touchHint.getComponent(TouchHintCtrl_1.default).show();
            }
            else {
                _this.touchHint.getComponent(TouchHintCtrl_1.default).hide();
            }
            if (stepData.highLightGoal) {
                _this.showGoal();
            }
        }, 0.6);
    };
    __decorate([
        property(cc.Node)
    ], Match3TutorialCtrl.prototype, "bubble", void 0);
    __decorate([
        property(cc.Node)
    ], Match3TutorialCtrl.prototype, "touchHint", void 0);
    __decorate([
        property(cc.Node)
    ], Match3TutorialCtrl.prototype, "maskNode", void 0);
    __decorate([
        property(cc.Node)
    ], Match3TutorialCtrl.prototype, "borderNode", void 0);
    __decorate([
        property(cc.Node)
    ], Match3TutorialCtrl.prototype, "handNode", void 0);
    __decorate([
        property(cc.Node)
    ], Match3TutorialCtrl.prototype, "goal", void 0);
    Match3TutorialCtrl = __decorate([
        ccclass
    ], Match3TutorialCtrl);
    return Match3TutorialCtrl;
}(cc.Component));
exports.default = Match3TutorialCtrl;

cc._RF.pop();