import { Event } from "../../../../Data/Const/Event";
import EventMgr from "../../../../../Base/Manager/EventMgr";
import { Util } from "../../../../../Base/Utils/Util";


export interface Road {
    start: string;
    end: string;
    path: cc.Vec2[];
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class Walk extends cc.Component {
    public road: Road;
    private speed: number = 20;

    private isWalking: boolean = false;
    private passedTime: number = 0;
    private nextStep: number = 0;
    private walkTime: number;

    private vx: number;
    private vy: number;

    private slope: number;

    public startWalk(road: Road, isNext: boolean = false) {
        this.isWalking = false;
        this.passedTime = 0;
        this.road = road;
        this.nextStep = isNext ? 1 : Util.Tool.rangeInt(1, road.path.length, false);
        this.walkOnRoad(isNext);
    }

    private walkOnRoad(isNext: boolean) {
        if (this.road.path.length < 2) {
            return;
        }
        this.node.setPosition(this.road.path[this.nextStep - 1]);

        if (isNext) {
            this.node.runAction(cc.sequence(cc.fadeIn(0.5),
                cc.callFunc(() => {
                    this.walkToNext();
                }, this)))
        } else {
            this.walkToNext();
        }
    }

    private walkToNext() {
        if (this.nextStep >= this.road.path.length) {
            this.isWalking = false;
            this.walkEnd();
            return;
        }

        var src = this.node.getPosition();
        var dst = this.road.path[this.nextStep];
        var dir = dst.sub(src);
        var len = dir.mag();

        this.slope = dir.x / dir.y;
        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
        this.walkTime = len / this.speed;
        this.passedTime = 0;

        this.isWalking = true;
    }

    private walkEnd() {
        if (this.road.end == '0' || this.road.end == '1') {
            this.node.runAction(cc.sequence(cc.fadeTo(0.5, 0.001),
                cc.delayTime(Util.Tool.range(2, 5)), cc.callFunc(() => {
                    EventMgr.ins.send(Event.Map.WalkEnd, this);
                }, this)))
        } else {
            this.node.runAction(cc.sequence(
                cc.delayTime(1), cc.callFunc(() => {
                    EventMgr.ins.send(Event.Map.WalkEnd, this);
                }, this)))
        }
    }

    update(dt) {
        if (this.isWalking === false) {
            return;
        }

        this.passedTime += dt;
        if (this.passedTime > this.walkTime) {
            dt -= (this.passedTime - this.walkTime);
        }

        this.node.x += (this.vx * dt);
        this.node.y += (this.vy * dt);
        this.updateZIndex();
        if (this.passedTime >= this.walkTime) {
            this.nextStep++;
            this.walkToNext();
        }
    }

    updateZIndex() {
        let parent = this.node.parent;
        for (let child of parent.children) {
            let box1 = child.getBoundingBox();
            let box2 = this.node.getBoundingBox();
            if (this.slope > 0) {
                if (box1.center.y > box2.center.y) this.node.zIndex = child.zIndex - 1;
            } else {
                if (box1.center.x > box2.center.x) this.node.zIndex = child.zIndex + 1;
            }
        }

    }

}