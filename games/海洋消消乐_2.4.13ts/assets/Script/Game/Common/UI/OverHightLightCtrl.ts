import GameModel from "../../Match3/Model/GameModel";
import M from "../../../Application/M";
import { Event } from "../../Data/Const/Event";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OverHightLightCtrl extends cc.Component {

    @property(cc.Node)
    countDownNode: cc.Node = null;

    @property(cc.Node)
    stepNode: cc.Node = null;

    @property(cc.Label)
    stepLabel: cc.Label = null;

    @property(cc.Label)
    countDownLabel: cc.Label = null;


    onDestroy() {
        this.unscheduleAllCallbacks();
    }

    public showStepNode() {
        this.unscheduleAllCallbacks();
        this.stepNode.scale = 1;
        this.countDownNode.active = false;
    }

    public showCountDown() {
        this.unscheduleAllCallbacks();
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
