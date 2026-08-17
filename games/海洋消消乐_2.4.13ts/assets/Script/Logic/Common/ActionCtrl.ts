import { SingletonFactory } from "../../Base/Utils/SingletonFactory";
import GameModel from "../Match3/Model/GameModel";
import Common from "./Common";
import { Util } from "../../Base/Utils/Util";
import { GapTime } from "../Data/Const/TimeConfig";
import { CellType, ElimateType } from "../Data/Const/Constant";


export default class ActionCtrl {

    public static ins: ActionCtrl = SingletonFactory.getInstance(ActionCtrl);

    public runShowCross(target: cc.Node, gridViewPool: Map<number, cc.Node>): Promise<any> {
        return new Promise((resolve) => {
            const fristViewNode = gridViewPool.get(0);
            const maxGridViewNode = gridViewPool.get(GameModel.ins.mapCount - 1);
            const a0 = cc.delayTime(0.3);
            const a1 = cc.scaleTo(0.5, 0.85);
            const a2 = cc.delayTime(0.2);
            const a3 = cc.moveTo(1, cc.v2(-maxGridViewNode.x * 0.85, 0));
            const a5 = cc.delayTime(1);
            const a6 = cc.moveTo(GameModel.ins.mapCount * 1, fristViewNode.position);
            const a4 = cc.scaleTo(0.5, 1);
            target.runAction(cc.sequence(a0, a1, a2, a3, a5, a6, a4, cc.callFunc(resolve)));
        });
    }

    public runShowRow(target: cc.Node, maskHeight): Promise<any> {
        return new Promise((resolve) => {
            const gapDistance = (target.height - maskHeight + Common.GRID_H) / 2;
            target.y = gapDistance;
            const a0 = cc.delayTime(0.5);
            const a1 = cc.moveTo(1.5, cc.v2(0, -gapDistance));
            const a2 = cc.callFunc(resolve);
            target.runAction(cc.sequence(a0, a1, a2));
        })
    }

    public runMoveRow(target: cc.Node, distance: number): Promise<any> {
        return new Promise((resolve) => {
            const a0 = cc.delayTime(0.3);
            const a1 = cc.moveBy(1, cc.v2(0, distance));
            const a2 = cc.callFunc(resolve);
            target.runAction(cc.sequence(a0, a1, a2))
        })
    }

    public runMoveCross(target: cc.Node): Promise<any> {
        return new Promise((resolve) => {
            const a2 = cc.callFunc(resolve);
            const a1 = cc.moveBy(1, cc.v2(-cc.winSize.width, 0));
            target.runAction(cc.sequence(a1, a2));
        })
    }

    public runCollectNormalCell(target: cc.Node, targetPos: cc.Vec2, elimateType: ElimateType = ElimateType.Default): Promise<any> {
        return new Promise((resolve) => {
            target.scale = 1;

            let moveTime = target.position.sub(targetPos).mag() * (1.8 / GapTime.CollectMoveSpeed);

            moveTime = moveTime < 0.5 ? moveTime * 2 : moveTime;

            // console.error(moveTime);

            const radians: number = Math.atan2((target.x - targetPos.x), (target.y - targetPos.y));
            const degrees: number = radians * -180 / Math.PI;
            const bezierMY = 100 + Util.Tool.rangeInt(0, 150);

            const a2 = cc.rotateTo(moveTime, degrees);
            const a3 = cc.callFunc(resolve);

            let finalAction = null;

            // if (elimateType == <any>CellType.Bomb1) {
            //     const tmpGap = 250
            //     const a0 = cc.moveBy(0.25, cc.v2(target.position.add(cc.v2(Util.Tool.rangeInt(-tmpGap, tmpGap), Util.Tool.rangeInt(-tmpGap, tmpGap)))));
            //     const a1 = cc.moveTo(moveTime, targetPos);
            //     finalAction = cc.sequence(a0.easing(cc.easeOut(1)), cc.spawn(a1, a2), a3)
            // } else {

            const a1 = cc.bezierTo(moveTime, [target.getPosition(), cc.v2(0, Util.Tool.rangeInt(0, 10) < 5 ? bezierMY : -bezierMY), targetPos]);
            finalAction = cc.sequence(cc.spawn(a1, a2), a3)

            // }
            target.runAction(finalAction);
        });
    }

    public runCollectGem(node: cc.Node, targetPos: cc.Vec2, newParent: cc.Node): Promise<any> {
        return new Promise((resolve) => {
            const newPosition = node.parent.convertToWorldSpaceAR(node.position);
            const moveTime = newPosition.sub(<any>targetPos).mag() * 0.001;
            node.setScale(1);
            const a1 = cc.scaleTo(0.4, node.scale + 0.2)
            const a2 = cc.spawn(cc.moveTo(moveTime, newParent.convertToNodeSpaceAR(targetPos) as cc.Vec2), cc.scaleTo(moveTime, 0.1));
            const a3 = cc.callFunc(resolve);
            node.runAction(cc.sequence(a1, a2, a3));
        })
    }

    public runCollectGnome(target: cc.Node, targetPos: cc.Vec2, newParent: cc.Node): Promise<any> {
        return new Promise((resolve) => {
            const newPosition = target.parent.convertToWorldSpaceAR(target.position);
            const moveTime = newPosition.sub(<any>targetPos).mag() * 0.001;
            const a0 = cc.delayTime(0.5);
            const a1 = cc.spawn(cc.callFunc(() => {
                target.parent = newParent;
                target.setPosition(newParent.convertToNodeSpaceAR(newPosition));
                this.convetGnomeAnchorPos(target);
            }), cc.scaleTo(0.4, target.scale + 0.2), cc.rotateTo(0.3, 0));
            const a2 = cc.rotateTo(0.2, 15);
            const a3 = cc.rotateTo(0.2, -15);
            const a4 = cc.rotateTo(0.2, 0); // -90
            const a5 = cc.spawn(cc.moveTo(moveTime, newParent.convertToNodeSpaceAR(targetPos) as cc.Vec2), cc.scaleTo(moveTime, 0.1));
            const a6 = cc.callFunc(resolve);
            target.runAction(cc.sequence(a0, a1, a2, a3, a4, a5, a6));
        })
    }

    private convetGnomeAnchorPos(gn: cc.Node) {
        let x, y;
        if (gn.angle != 0) {
            x = gn.x + (0.5 - gn.anchorX) * gn.height * gn.scaleX;
            y = gn.y - (0.5 - gn.anchorY) * (gn.width + 20) * gn.scaleY;
        } else {
            x = gn.x + (0.5 - gn.anchorX) * gn.width * gn.scaleX;
            y = gn.y + (0.5 - gn.anchorY) * (gn.height + 20) * gn.scaleY;
        }
        gn.setPosition(cc.v2(x, y));
        gn.setAnchorPoint(cc.v2(0.5, 0.5));
        gn.getChildByName('Sprite').setAnchorPoint(cc.v2(0.5, 0.5));
    }
}  
