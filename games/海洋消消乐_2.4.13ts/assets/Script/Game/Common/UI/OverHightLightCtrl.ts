import GameModel from "../../Match3/Model/GameModel";
import M from "../../../Application/M";
import { Event } from "../../Data/Const/Event";

const { ccclass } = cc._decorator;

@ccclass
export default class OverHightLightCtrl extends cc.Component {

    countDownNode: cc.Node = null;

    stepNode: cc.Node = null;

    stepLabel: cc.Label = null;

    countDownLabel: cc.Label = null;

    public bindView(view: {
        stepNode: cc.Node;
        stepLabel: cc.Label;
        countDownNode: cc.Node;
        countDownLabel: cc.Label;
    }) {
        this.unscheduleAllCallbacks();
        this.stepNode = view.stepNode;
        this.stepLabel = view.stepLabel;
        this.countDownNode = view.countDownNode;
        this.countDownLabel = view.countDownLabel;
        this.showStepNode();
    }

    onDestroy() {
        this.unscheduleAllCallbacks();
    }

    public cancelCountDown() {
        this.unscheduleAllCallbacks();
    }

    public showStepNode() {
        this.unscheduleAllCallbacks();
        if (this.stepNode) {
            this.stepNode.active = true;
            this.stepNode.scale = 1;
        }
        if (this.countDownNode) this.countDownNode.active = false;
    }

    public showCountDown() {
        this.unscheduleAllCallbacks();
        if (!this.stepLabel || !this.countDownNode || !this.countDownLabel) return;
        const currentCount = Math.max(0, Number(this.stepLabel.string) || 0);
        const begin=()=>{this.countDownNode.active=true;this._startCountDown();};
        if(currentCount===0){begin();return;}
        const reduce=()=>{
            const remaining=Math.max(0,Number(this.stepLabel.string)-1);
            this.stepLabel.string=String(remaining);
            if(remaining===0){this.unschedule(reduce);begin();}
        };
        this.schedule(reduce,0.03);
    }

    private _startCountDown() {
        const count = GameModel.ins.stepLimit + 5;
        this.countDownLabel.string = count.toString();
        M.event.send(Event.GameCMD.GameOverFall);
        this.schedule(() => {
            this.countDownLabel.string = (Number(this.countDownLabel.string) - 1).toString();
            if (this.countDownLabel.string == '0') {
                M.event.send(Event.GameCMD.ShowGameResult, true);
            }
        }, 1, count - 1);
    }

}
