import GameModel from "../../Match3/Model/GameModel";
import { CellModel } from "../../Match3/Model/CellModel";
import { Util } from "../../../Base/Utils/Util";
import { CellType, NodePoolKey } from "../../Data/Const/Constant";
import Common from '../../Common/Common';
import Tutorial from "../../Data/Interface/Tutorial";
import { ITutorial, IHand, IStage } from '../../Data/Interface/Level/ITutorial';
import MainCtrl from "../MainCtrl";
import TutorialBubbleCtrl from "./TutorialBubbleCtrl";
import TutorialBorderCtrl from "./TutorialBorderCtrl";
import TouchHintCtrl from "./TouchHintCtrl";
import M from "../../../Base/Manager/M";
import { Event } from "../../Data/Const/Event";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Match3TutorialCtrl extends cc.Component {

    @property(cc.Node)
    bubble: cc.Node = null;

    @property(cc.Node)
    touchHint: cc.Node = null;

    @property(cc.Node)
    maskNode: cc.Node = null;

    @property(cc.Node)
    borderNode: cc.Node = null;

    @property(cc.Node)
    handNode: cc.Node = null;

    @property(cc.Node)
    goal: cc.Node = null;

    private stepIdx: number;
    private maskIdxPos = [];
    private cells = []
    private mainData: ITutorial = null;
    private controller: MainCtrl = null;
    private isReady = false;
    private isShowGoal = false;
    private goalClone: cc.Node = null;

    start() {

    }

    initView(data, controller) {
        this.stepIdx = 0;
        this.maskIdxPos = [];
        this.mainData = data;
        this.controller = controller;
        this.isReady = false;
        this.node.zIndex = 101;
        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            var stepData = this.mainData.stages[this.stepIdx - 1];
            if (stepData && stepData.closeByTouch) {
                this.closeTutorial();
                return;
            }

            var status = this.checkPoint(event.touch.getLocation());
            if (status && this.isReady) {
                this.controller.node.emit(cc.Node.EventType.TOUCH_START, event);
            }
        });

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.istutorial = true;
            this.controller.node.emit(cc.Node.EventType.TOUCH_END, event);
        });

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            var status1 = this.checkPoint(event.touch.getStartLocation());
            var status2 = this.checkPoint(event.touch.getLocation());
            if (status1 && status2 && this.isReady) {
                this.controller.node.emit(cc.Node.EventType.TOUCH_MOVE, event);
            }
        });
    }


    buildStage() {
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

        this.borderNode.getComponent(TutorialBorderCtrl).setData(stage);

        this.bubble.getComponent(TutorialBubbleCtrl).setData(stage.bubble);


        this.stepIdx++;
        return true;
    }

    startTutorial() {
        this.isReady = false;
        this.touchHint.active = false;
        var status = this.buildStage();
        if (status) {
            this.showNode();
        }
    }

    closeTutorial() {
        if (this.node && this.node.active && this.isReady) {
            this.isReady = false;
            this.hidenNode();
        }
    }

    checkPoint(pos: cc.Vec2) {
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
        this.maskIdxPos.forEach(p => {
            if (idxPos && p.x == idxPos.x && p.y == idxPos.y && flag) {
                status = true;
            }
        }, this);
        return status;
    }

    convertTouchPosToCell(pos: cc.Vec2) {
        this.node.convertToNodeSpaceAR(pos, pos);
        // console.log(pos);
        var idxPos = Common.convetPos(pos);
        // console.log(idxPos)
        if (idxPos.x < 0 || idxPos.x > Common.GRID_W - 0 || idxPos.y < 0 || idxPos.y > Common.GRID_H - 0) {
            return null;
        }
        return idxPos;
    }

    drawHand(data: IHand) {
        if (!data) {
            this.handNode.active = false;
            return;
        }
        this.handNode.active = true;
        this.handNode.stopAllActions();

        var pos = Common.getPos(data.x, data.y);
        this.handNode.setPosition(pos);

        if (data.type == "click") {
            this.handNode.runAction(cc.sequence(
                cc.moveTo(0.4, pos.x, pos.y + 10),
                cc.moveTo(0.1, pos.x, pos.y),
                cc.moveTo(0.4, pos.x, pos.y + 10),
                cc.moveTo(0.1, pos.x, pos.y),
                cc.moveTo(0.3, pos.x, pos.y),
            ).repeatForever());
        } else {
            var dx = 0, dy = 0, step = Common.GRID_W;
            if (data.type == "left") {
                dx = -1;
            } else if (data.type == "right") {
                dx = 1;
            } else if (data.type == "up") {
                dy = 1;
            } else if (data.type == "down") {
                dy = -1;
            }

            this.handNode.runAction(cc.sequence(
                cc.moveTo(1, pos.x + dx * step, pos.y + dy * step),
                cc.moveTo(0.2, pos.x, pos.y),
            ).repeatForever());
        }


    }

    drawMask(graphics: cc.Graphics, data: IStage) {
        this.maskIdxPos = [];
        if (data.cells) {
            data.cells.forEach(function (cell) {
                var pos = Common.getPos(cell.x, cell.y);
                // console.log(cell.x,cell.y,pos)
                var dd = Common.GRID_H / 2;
                this.maskIdxPos.push(cc.v2(cell.x, cell.y));
                graphics.fillRect(pos.x - dd - 1, pos.y - dd - 2, Common.GRID_H + 2, Common.GRID_W + 4);
            }, this);
        }
    }

    showGoal() {
        this.goalClone = cc.instantiate(this.goal);
        this.node.addChild(this.goalClone);
        this.goalClone.setPosition(this.node.convertToNodeSpaceAR(this.goal.parent.convertToWorldSpaceAR(this.goal.position)));
        this.goalClone.setScale(10 / 9);
        this.isShowGoal = true;

        this.scheduleOnce(function () {
            this.hideGoal();
            this.showGoal();
        }, 1.0);
    }

    hideGoal() {
        if (this.isShowGoal) {
            this.node.removeChild(this.goalClone);
            this.goalClone.destroy();
            this.isShowGoal = false;
        }
    }

    hidenNode() {
        this.handNode.active = false;
        this.bubble.runAction(cc.fadeOut(0.7));
        this.borderNode.runAction(cc.fadeOut(0.7));
        this.scheduleOnce(function () {
            this.borderNode.destroyAllChildren();
            this.hideGoal();
            this.node.active = false;
            this.nextStage();
        }, 0.6);
    }

    nextStage() {
        if (!this.mainData) {
            return false;
        }
        var stages = this.mainData.stages[this.stepIdx]

        if (!stages) {
            return false;
        }

        if (stages) {
            this.startTutorial();
        }
    }

    private _showBorderNode(callback) {
        this.scheduleOnce(function () {
            this.bubble.runAction(cc.fadeIn(0.3));
            this.borderNode.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(callback)));
        }, 0.2);
    }

    showNode() {
        this.node.active = true;
        this.bubble.active = true;
        this.bubble.opacity = 0;

        this._showBorderNode(() => {
            this.isReady = true;
            M.event.once(Event.UI.CloseTutorial, this.closeTutorial, this);
        });

        this.scheduleOnce(() => {
            var stepData = this.mainData.stages[this.stepIdx - 1];
            this.drawHand(stepData.hand);
            if (stepData && stepData.closeByTouch) {
                this.touchHint.getComponent(TouchHintCtrl).show();
            } else {
                this.touchHint.getComponent(TouchHintCtrl).hide();
            }
            if (stepData.highLightGoal) {
                this.showGoal();
            }
        }, 0.6);
    }
}