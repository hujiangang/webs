import GameModel from "../../Match3/Model/GameModel";
import M from "../../../Base/Manager/M";
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


    private _animation: cc.Animation = null;

    onLoad() {

        this._animation = this.getComponent(cc.Animation);

    }

    onDestroy() {
        this.unscheduleAllCallbacks();
    }

    public showStepNode() {
        this.stepNode.scale = 1;
        this.countDownNode.active = false;
    }

    public showCountDown() {
        //开始减少步数
        const currentCount = this.stepLabel.string;
        this.schedule(() => {
            this.stepLabel.string = (Number(this.stepLabel.string) - 1).toString();
            //减少到0,展示倒计时
            if (this.stepLabel.string == '0') {
                this.countDownNode.active = true;
                this._animation.play('gameOverCountdown');
                this._startCountDown();
            }
        }, 0.03, Number(currentCount));
    }

    private _startCountDown() {
        const count = GameModel.ins.stepLimit + 5;
        this.countDownLabel.string = count.toString();
        M.event.send(Event.GameCMD.GameOverFall);
        this.schedule(() => {
            this.countDownLabel.string = (Number(this.countDownLabel.string) - 1).toString();
            if (this.countDownLabel.string == '0') {
                console.error('倒计时结束,进去结算界面!');
                M.event.send(Event.GameCMD.ShowGameResult, true);
            }
        }, 1, count - 1);
    }

}
