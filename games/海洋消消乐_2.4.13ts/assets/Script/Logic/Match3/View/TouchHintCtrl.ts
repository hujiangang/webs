// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchHintCtrl extends cc.Component {

    @property(cc.Integer)
    interval:number = 2000;

    time:number = 0;

    start() {
        this.time = 0;
    }

    show() {
        this.time = 0;
        this.node.opacity = 50;
        this.node.active = true;
    }

    hide() {
        this.node.active = false;
    }

    update (dt) {
        this.time = this.time + 10;
        this.node.opacity = 50 + (this.time % this.interval) / this.interval * 255;
    }
}
