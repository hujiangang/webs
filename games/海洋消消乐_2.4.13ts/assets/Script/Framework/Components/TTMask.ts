
const { ccclass, inspector } = cc._decorator;

@ccclass
// @executeInEditMode
@inspector('packages://CustomComponent/mask.js')
export default class TTMask extends cc.Mask {


    private _curPoints: cc.Vec2[] = [];
    private _polygonCom: cc.PolygonCollider = null;


    private updateMask() {
        const graphics: cc.Graphics = this['_graphics'];
        graphics.clear(false);
        for (let i = 0; i < this._curPoints.length; ++i) {
            let point = this._curPoints[i];
            if (i === 0) {


                graphics.moveTo(point.x, point.y);
            } else {
                graphics.lineTo(point.x, point.y);
            }


        }
        graphics.close();
        graphics.fill();
    }

    private _compareArray(arr1: cc.Vec2[], arr2: cc.Vec2[]): boolean {
        let result = true;
        if (arr1 !== arr2 || arr1.length != arr2.length) {
            result = false;
        } else {
            for (let i = 0; i < arr1.length; i++) {
                const p1 = arr1[i];
                const p2 = arr2[i];
                if (p1.x !== p2.x || p1.y !== p2.y) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    }

    onEnable() {
        super.onEnable();
        this._polygonCom = this.node.getComponent(cc.PolygonCollider);
        this.scheduleOnce(() => {
            this.updateMask();
            // Editor.log("正在执行打包命令中，请稍候...");
        }, 0);
    }

    update() {
        if (this._polygonCom && !this._compareArray(this._polygonCom.points, this._curPoints)) {
            this._curPoints = this._polygonCom.points;
            this.updateMask();
        }
    }

}
