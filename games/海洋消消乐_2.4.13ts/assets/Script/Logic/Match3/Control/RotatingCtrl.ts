import { GapTime } from "../../Data/Const/TimeConfig";

const { ccclass, property } = cc._decorator;

export default class RotatingCtrl {

    private _arg: FlyPlaneArgs = null;
    private _target: cc.Node = null;
    private _targetPosition: cc.Vec2 = null;

    constructor(target: cc.Node, targetPosition: cc.Vec2) {
        this._target = target;
        this._targetPosition = targetPosition;
    }


    public start(delay: number = 0): Promise<any> {
        return new Promise((resolve) => {

            let arg = new FlyPlaneArgs();
            this._target.angle = 0;

            arg.node = this._target;
            let startPoint = this._target.position;
            let endPoint = this._targetPosition;
            const speed = GapTime.BeikeSuctionSpeed();

            arg.move_speed = GapTime.IsCounterClockWise ? - speed : speed;

            let centerPoint = cc.v2((startPoint.x + endPoint.x) * 0.5, (startPoint.y + endPoint.y) * 0.5);
            let r = Math.sqrt(Math.pow(startPoint.x - centerPoint.x, 2) + Math.pow(startPoint.y - centerPoint.y, 2));

            arg.r = r;

            arg.xc = centerPoint.x;
            arg.yc = centerPoint.y;

            arg.angle = this.getPlaneAngle(startPoint, cc.v2(centerPoint.x, centerPoint.y + r), r);

            arg.move_angle = 180;
            arg.delay = delay;

            arg.resolve = resolve;

            this._arg = arg;
        })
    }

    private getPlaneAngle(pa: cc.Vec2, pc: cc.Vec2, r: number) {
        let angle = 0;
        let x = 0;
        let y = 0;
        if (pa.x < pc.x) {
            x = pa.x - pc.x;
            y = pc.y - pa.y;
            angle = 360 - Math.asin(Math.sqrt(x * x + y * y) / r * 0.5) * 2 * 180 / Math.PI;
        } else {
            x = pc.x - pa.x;
            y = pc.y - pa.y;
            angle = Math.asin(Math.sqrt(x * x + y * y) / r * 0.5) * 2 * 180 / Math.PI;
        }
        return angle;
    }

    private updateFlyPlane(dt) {
        if (!this._arg) return;

        if (this._arg.delay > 0) {
            this._arg.delay -= dt;
        } else {
            if (this._arg.move_angle <= 0) {
                this._arg.node.scale = 0;
                this.planeArrive(this._arg);
            } else {
                let xc = this._arg.xc;
                let yc = this._arg.yc;
                let r = this._arg.r;

                let moveDis = dt * this._arg.move_speed;

                this._arg.angle += moveDis;
                this._arg.move_angle -= Math.abs(moveDis);
                const a = this._arg.angle / 180 * Math.PI;
                let curX = xc + r * Math.sin(a);
                let curY = yc + r * Math.cos(a);

                if (this._arg.node.active == false) {
                    this._arg.node.active = true;
                    this._arg.node.opacity = 255;
                }
                this._arg.node.scale -= 0.01;
                this._arg.node.position = cc.v3(curX, curY);
                this._arg.node.angle = - (this._arg.angle - (this._arg.move_speed > 0 ? 120 : -60));
            }
        }
    }

    private planeArrive(arg: FlyPlaneArgs) {
        console.log(`planeArrive!`);
        if (arg.resolve) {
            arg.resolve();
            arg.resolve = null;
        }
    }

    update(dt) {
        this.updateFlyPlane(dt);
    }

}

class FlyPlaneArgs {
    node: cc.Node = null;

    delay: number = 0;

    xc = 0;
    yc = 0;
    r = 0;

    angle = 0;

    move_speed = 0;
    move_angle = 0;

    resolve = null;
}
