import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";
import Exchange from "./Exchange";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShowBuildTool extends cc.Component {
    @property(cc.Node)
    lockNode: cc.Node = null;

    private mapCamera: cc.Camera;

    public points: cc.Vec2[];

    private rect: cc.Rect;

    private lockPos: cc.Vec2;

    private exchange: Exchange;

    onLoad() {
        this.mapCamera = cc.Camera.findCamera(this.node);

        let collider = this.node.getComponent(cc.PolygonCollider);
        if (collider) this.points = collider.points;

        this.rect = this.node.getBoundingBoxToWorld();

        this.node.on(cc.Node.EventType.TOUCH_END, this.checkClick, this);


        EventMgr.ins.register(Event.Map.UnLock, this.hideLock, this);
        EventMgr.ins.register(Event.Map.ShowLock, this.showLock, this);

    }

    start() {
        this.exchange = this.node.parent.parent.getComponent(Exchange);
        this.showLock();
    }

    onDestroy() {
        EventMgr.ins.unRegister(Event.Map.UnLock, this.hideLock, this);
        EventMgr.ins.unRegister(Event.Map.ShowLock, this.showLock, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.checkClick, this);
    }

    private showLock() {
        if (this.exchange.lockState == 0 && this.lockNode) {
            this.lockNode.active = true;
            this.lockNode.on(cc.Node.EventType.TOUCH_END, this.unlockClick, this);
            this.lockPos = this.lockNode.convertToWorldSpaceAR(cc.v2(0, 60)) as cc.Vec2;

            EventMgr.ins.unRegister(Event.Map.ShowLock, this.showLock, this);
        }
    }

    private hideLock() {
        if (this.exchange.lockState == 1 && this.lockNode) {
            this.lockNode.off(cc.Node.EventType.TOUCH_END, this.unlockClick, this);
            this.lockNode.removeFromParent();
            this.lockNode.destroy();
        }
    }

    private getRectInMapCamera() {
        let rect = this.rect;
        let mapCamera = this.mapCamera;
        let curZoomRatio = mapCamera.zoomRatio;
        let nodeInCameraPos = mapCamera.getWorldToScreenPoint(rect.origin, cc.Vec2.ZERO);
        return cc.rect(nodeInCameraPos.x, nodeInCameraPos.y, rect.width * curZoomRatio, rect.height * curZoomRatio);
    }

    private checkClick(event: cc.Event.EventTouch) {
        let rect = this.getRectInMapCamera();
        let location = event.getLocation();
        if (event.getStartLocation().sub(location).mag() < 1 && rect.contains(location)) {
            let touchPointInNode = location.sub(rect.center).mul(1 / this.mapCamera.zoomRatio);
            if (cc.Intersection.pointInPolygon(touchPointInNode, this.points)) {
                this.node._touchListener.setSwallowTouches(true);
                EventMgr.ins.send(Event.Map.ShowTool, location, this.node.parent);
            } else {
                this.node._touchListener.setSwallowTouches(false);
            }
        }
    }

    private unlockClick(event: cc.Event.EventTouch) {
        if (event.getStartLocation().sub(event.getLocation()).mag() < 1) {
            let position = this.mapCamera.getWorldToScreenPoint(this.lockPos);
            EventMgr.ins.send(Event.Map.ShowTool, position, this.node.parent);
        }
    }
}
