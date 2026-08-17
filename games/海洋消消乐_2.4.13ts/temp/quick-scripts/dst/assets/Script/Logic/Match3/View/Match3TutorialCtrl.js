
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/Match3TutorialCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxNYXRjaDNUdXRvcmlhbEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsOENBQXlDO0FBSXpDLDJEQUFzRDtBQUN0RCwyREFBc0Q7QUFDdEQsaURBQTRDO0FBQzVDLDZDQUF3QztBQUN4QyxnREFBK0M7QUFFekMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUE2UkM7UUExUkcsWUFBTSxHQUFZLElBQUksQ0FBQztRQUd2QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixVQUFJLEdBQVksSUFBSSxDQUFDO1FBR2IsZ0JBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsV0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUNWLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFDM0IsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFDNUIsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixlQUFTLEdBQVksSUFBSSxDQUFDOztJQWtRdEMsQ0FBQztJQWhRRyxrQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBUyxJQUFJLEVBQUUsVUFBVTtRQUF6QixpQkFnQ0M7UUEvQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7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QUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFlBQVksRUFBRTtnQkFDbkMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3JEO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNyRDtZQUNELElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQXpSRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDRztJQWxCSixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQTZSdEM7SUFBRCx5QkFBQztDQTdSRCxBQTZSQyxDQTdSK0MsRUFBRSxDQUFDLFNBQVMsR0E2UjNEO2tCQTdSb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi4vLi4vTWF0Y2gzL01vZGVsL0dhbWVNb2RlbFwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4uLy4uL01hdGNoMy9Nb2RlbC9DZWxsTW9kZWxcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBDZWxsVHlwZSwgTm9kZVBvb2xLZXkgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tICcuLi8uLi9Db21tb24vQ29tbW9uJztcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvVHV0b3JpYWxcIjtcbmltcG9ydCB7IElUdXRvcmlhbCwgSUhhbmQsIElTdGFnZSB9IGZyb20gJy4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lUdXRvcmlhbCc7XG5pbXBvcnQgTWFpbkN0cmwgZnJvbSBcIi4uL01haW5DdHJsXCI7XG5pbXBvcnQgVHV0b3JpYWxCdWJibGVDdHJsIGZyb20gXCIuL1R1dG9yaWFsQnViYmxlQ3RybFwiO1xuaW1wb3J0IFR1dG9yaWFsQm9yZGVyQ3RybCBmcm9tIFwiLi9UdXRvcmlhbEJvcmRlckN0cmxcIjtcbmltcG9ydCBUb3VjaEhpbnRDdHJsIGZyb20gXCIuL1RvdWNoSGludEN0cmxcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0Y2gzVHV0b3JpYWxDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ1YmJsZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0b3VjaEhpbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbWFza05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYm9yZGVyTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBoYW5kTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBnb2FsOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgc3RlcElkeDogbnVtYmVyO1xuICAgIHByaXZhdGUgbWFza0lkeFBvcyA9IFtdO1xuICAgIHByaXZhdGUgY2VsbHMgPSBbXVxuICAgIHByaXZhdGUgbWFpbkRhdGE6IElUdXRvcmlhbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb250cm9sbGVyOiBNYWluQ3RybCA9IG51bGw7XG4gICAgcHJpdmF0ZSBpc1JlYWR5ID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc1Nob3dHb2FsID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBnb2FsQ2xvbmU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBpbml0VmlldyhkYXRhLCBjb250cm9sbGVyKSB7XG4gICAgICAgIHRoaXMuc3RlcElkeCA9IDA7XG4gICAgICAgIHRoaXMubWFza0lkeFBvcyA9IFtdO1xuICAgICAgICB0aGlzLm1haW5EYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDE7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RlcERhdGEgPSB0aGlzLm1haW5EYXRhLnN0YWdlc1t0aGlzLnN0ZXBJZHggLSAxXTtcbiAgICAgICAgICAgIGlmIChzdGVwRGF0YSAmJiBzdGVwRGF0YS5jbG9zZUJ5VG91Y2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVHV0b3JpYWwoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSB0aGlzLmNoZWNrUG9pbnQoZXZlbnQudG91Y2guZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzICYmIHRoaXMuaXNSZWFkeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5ub2RlLmVtaXQoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5pc3R1dG9yaWFsID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5ub2RlLmVtaXQoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpID0+IHtcbiAgICAgICAgICAgIHZhciBzdGF0dXMxID0gdGhpcy5jaGVja1BvaW50KGV2ZW50LnRvdWNoLmdldFN0YXJ0TG9jYXRpb24oKSk7XG4gICAgICAgICAgICB2YXIgc3RhdHVzMiA9IHRoaXMuY2hlY2tQb2ludChldmVudC50b3VjaC5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMxICYmIHN0YXR1czIgJiYgdGhpcy5pc1JlYWR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLm5vZGUuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgYnVpbGRTdGFnZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1haW5EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5tYWluRGF0YS5zdGFnZXNbdGhpcy5zdGVwSWR4XTtcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xuICAgICAgICBpZiAoc3RhZ2UpIHtcbiAgICAgICAgICAgIGlmIChzdGFnZS5jZWxscykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGNlbGwgaW4gc3RhZ2UuY2VsbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWdlLmNlbGxzW2NlbGxdLnJlbW92YWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChzdGFnZS5jZWxsc1tjZWxsXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHZhciBncmFwaGljcyA9IHRoaXMubWFza05vZGUuZ2V0Q29tcG9uZW50KGNjLk1hc2spW1wiX2dyYXBoaWNzXCJdO1xuICAgICAgICBncmFwaGljcy5jbGVhcihmYWxzZSk7XG4gICAgICAgIHRoaXMuZHJhd01hc2soZ3JhcGhpY3MsIHN0YWdlKTtcbiAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xuXG4gICAgICAgIHRoaXMuYm9yZGVyTm9kZS5nZXRDb21wb25lbnQoVHV0b3JpYWxCb3JkZXJDdHJsKS5zZXREYXRhKHN0YWdlKTtcblxuICAgICAgICB0aGlzLmJ1YmJsZS5nZXRDb21wb25lbnQoVHV0b3JpYWxCdWJibGVDdHJsKS5zZXREYXRhKHN0YWdlLmJ1YmJsZSk7XG5cblxuICAgICAgICB0aGlzLnN0ZXBJZHgrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc3RhcnRUdXRvcmlhbCgpIHtcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG91Y2hIaW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgc3RhdHVzID0gdGhpcy5idWlsZFN0YWdlKCk7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd05vZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlVHV0b3JpYWwoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmFjdGl2ZSAmJiB0aGlzLmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oaWRlbk5vZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrUG9pbnQocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHZhciBpZHhQb3MgPSB0aGlzLmNvbnZlcnRUb3VjaFBvc1RvQ2VsbChwb3MpO1xuICAgICAgICBpZiAoaWR4UG9zID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdmFyIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaWR4UG9zLnggPT0gdGhpcy5jZWxsc1tpXS54ICYmIGlkeFBvcy55ID09IHRoaXMuY2VsbHNbaV0ueSkge1xuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFza0lkeFBvcy5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKGlkeFBvcyAmJiBwLnggPT0gaWR4UG9zLnggJiYgcC55ID09IGlkeFBvcy55ICYmIGZsYWcpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG5cbiAgICBjb252ZXJ0VG91Y2hQb3NUb0NlbGwocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MsIHBvcyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcyk7XG4gICAgICAgIHZhciBpZHhQb3MgPSBDb21tb24uY29udmV0UG9zKHBvcyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlkeFBvcylcbiAgICAgICAgaWYgKGlkeFBvcy54IDwgMCB8fCBpZHhQb3MueCA+IENvbW1vbi5HUklEX1cgLSAwIHx8IGlkeFBvcy55IDwgMCB8fCBpZHhQb3MueSA+IENvbW1vbi5HUklEX0ggLSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4UG9zO1xuICAgIH1cblxuICAgIGRyYXdIYW5kKGRhdGE6IElIYW5kKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaGFuZE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcblxuICAgICAgICB2YXIgcG9zID0gQ29tbW9uLmdldFBvcyhkYXRhLngsIGRhdGEueSk7XG4gICAgICAgIHRoaXMuaGFuZE5vZGUuc2V0UG9zaXRpb24ocG9zKTtcblxuICAgICAgICBpZiAoZGF0YS50eXBlID09IFwiY2xpY2tcIikge1xuICAgICAgICAgICAgdGhpcy5oYW5kTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNCwgcG9zLngsIHBvcy55ICsgMTApLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjEsIHBvcy54LCBwb3MueSksXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNCwgcG9zLngsIHBvcy55ICsgMTApLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjEsIHBvcy54LCBwb3MueSksXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMywgcG9zLngsIHBvcy55KSxcbiAgICAgICAgICAgICkucmVwZWF0Rm9yZXZlcigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkeCA9IDAsIGR5ID0gMCwgc3RlcCA9IENvbW1vbi5HUklEX1c7XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgICAgZHggPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgICAgIGR4ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09IFwidXBcIikge1xuICAgICAgICAgICAgICAgIGR5ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09IFwiZG93blwiKSB7XG4gICAgICAgICAgICAgICAgZHkgPSAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5oYW5kTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDEsIHBvcy54ICsgZHggKiBzdGVwLCBwb3MueSArIGR5ICogc3RlcCksXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMiwgcG9zLngsIHBvcy55KSxcbiAgICAgICAgICAgICkucmVwZWF0Rm9yZXZlcigpKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBkcmF3TWFzayhncmFwaGljczogY2MuR3JhcGhpY3MsIGRhdGE6IElTdGFnZSkge1xuICAgICAgICB0aGlzLm1hc2tJZHhQb3MgPSBbXTtcbiAgICAgICAgaWYgKGRhdGEuY2VsbHMpIHtcbiAgICAgICAgICAgIGRhdGEuY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBDb21tb24uZ2V0UG9zKGNlbGwueCwgY2VsbC55KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjZWxsLngsY2VsbC55LHBvcylcbiAgICAgICAgICAgICAgICB2YXIgZGQgPSBDb21tb24uR1JJRF9IIC8gMjtcbiAgICAgICAgICAgICAgICB0aGlzLm1hc2tJZHhQb3MucHVzaChjYy52MihjZWxsLngsIGNlbGwueSkpO1xuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxSZWN0KHBvcy54IC0gZGQgLSAxLCBwb3MueSAtIGRkIC0gMiwgQ29tbW9uLkdSSURfSCArIDIsIENvbW1vbi5HUklEX1cgKyA0KTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0dvYWwoKSB7XG4gICAgICAgIHRoaXMuZ29hbENsb25lID0gY2MuaW5zdGFudGlhdGUodGhpcy5nb2FsKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuZ29hbENsb25lKTtcbiAgICAgICAgdGhpcy5nb2FsQ2xvbmUuc2V0UG9zaXRpb24odGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuZ29hbC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuZ29hbC5wb3NpdGlvbikpKTtcbiAgICAgICAgdGhpcy5nb2FsQ2xvbmUuc2V0U2NhbGUoMTAgLyA5KTtcbiAgICAgICAgdGhpcy5pc1Nob3dHb2FsID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVHb2FsKCk7XG4gICAgICAgICAgICB0aGlzLnNob3dHb2FsKCk7XG4gICAgICAgIH0sIDEuMCk7XG4gICAgfVxuXG4gICAgaGlkZUdvYWwoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2hvd0dvYWwpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLmdvYWxDbG9uZSk7XG4gICAgICAgICAgICB0aGlzLmdvYWxDbG9uZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmlzU2hvd0dvYWwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVuTm9kZSgpIHtcbiAgICAgICAgdGhpcy5oYW5kTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idWJibGUucnVuQWN0aW9uKGNjLmZhZGVPdXQoMC43KSk7XG4gICAgICAgIHRoaXMuYm9yZGVyTm9kZS5ydW5BY3Rpb24oY2MuZmFkZU91dCgwLjcpKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ib3JkZXJOb2RlLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5oaWRlR29hbCgpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5uZXh0U3RhZ2UoKTtcbiAgICAgICAgfSwgMC42KTtcbiAgICB9XG5cbiAgICBuZXh0U3RhZ2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5tYWluRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFnZXMgPSB0aGlzLm1haW5EYXRhLnN0YWdlc1t0aGlzLnN0ZXBJZHhdXG5cbiAgICAgICAgaWYgKCFzdGFnZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFnZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUdXRvcmlhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd0JvcmRlck5vZGUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5idWJibGUucnVuQWN0aW9uKGNjLmZhZGVJbigwLjMpKTtcbiAgICAgICAgICAgIHRoaXMuYm9yZGVyTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZUluKDAuMyksIGNjLmNhbGxGdW5jKGNhbGxiYWNrKSkpO1xuICAgICAgICB9LCAwLjIpO1xuICAgIH1cblxuICAgIHNob3dOb2RlKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idWJibGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idWJibGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgdGhpcy5fc2hvd0JvcmRlck5vZGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIE0uZXZlbnQub25jZShFdmVudC5VSS5DbG9zZVR1dG9yaWFsLCB0aGlzLmNsb3NlVHV0b3JpYWwsIHRoaXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RlcERhdGEgPSB0aGlzLm1haW5EYXRhLnN0YWdlc1t0aGlzLnN0ZXBJZHggLSAxXTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0hhbmQoc3RlcERhdGEuaGFuZCk7XG4gICAgICAgICAgICBpZiAoc3RlcERhdGEgJiYgc3RlcERhdGEuY2xvc2VCeVRvdWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEhpbnQuZ2V0Q29tcG9uZW50KFRvdWNoSGludEN0cmwpLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEhpbnQuZ2V0Q29tcG9uZW50KFRvdWNoSGludEN0cmwpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGVwRGF0YS5oaWdoTGlnaHRHb2FsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93R29hbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwLjYpO1xuICAgIH1cbn0iXX0=