import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";
import MapIslandUtils from "./MapIslandUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapCamera extends cc.Component {

    @property(cc.Camera)
    camera: cc.Camera = null;

    @property(cc.Node)
    mapBg: cc.Node = null;

    @property(cc.Node)
    wall: cc.Node = null;

    oldDistance: number = null;
    backgroundRect: cc.Rect = null;
    backgroundPoint: cc.Vec2 = cc.Vec2.ZERO;

    moveSpeed: number = 800 * 2;
    zoomRatioMax: number = 1.8;
    zoomRatioMin: number = 0.35;
    cameraRect: cc.Rect = null;

    isTouchMoving: boolean = false;
    canTouchMove: boolean = false;

    lastPos: cc.Vec2 = null;
    lastTime: number = 0;
    dtime: number = 0;

    lastCameraPos: cc.Vec2 = null;

    _canMoveY: boolean = false;  //是否可以移动Y轴

    onLoad() {
        this.cameraRect = cc.rect(0, 0, cc.winSize.width, cc.winSize.height);

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchControlCamera, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.camera.node.on(cc.Node.EventType.POSITION_CHANGED, this.updateMapVisible, this);
        // this.node.on(cc.Node.EventType.MOUSE_WHEEL, (event) => {
        //     this.cameraZoom(event._scrollY);
        // });
        this.initEvent();
        this.mapBg.children.forEach((node: cc.Node) => {
            this.loadMapBg(1, node);
        }, this);
        MapIslandUtils.mapCamera = this.camera;
    }

    start() {
        var mapRect = this.mapBg.getBoundingBoxToWorld();
        var scale = MapIslandUtils.MapScale;
        let rect = this.backgroundRect = new cc.Rect(mapRect.x, mapRect.y, mapRect.width * scale, mapRect.height * scale);// this.mapBg.getBoundingBoxToWorld();
        this.backgroundPoint = cc.v2(rect.x, rect.y);
    }

    onEnable() {
        // if(CC_EDITOR){
        // this.mapBg.children.forEach((node: cc.Node) => {
        //     this.loadMapBg(1, node);
        // }, this);

        // }
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchControlCamera, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.removeEvent();
        this.camera.node && this.camera.node.off(cc.Node.EventType.POSITION_CHANGED, this.updateMapVisible, this)
    }

    private initEvent() {
        EventMgr.ins.register(Event.Map.CameraMoveTo, this.moveCameraTo, this);
        EventMgr.ins.register(Event.Map.MapTouchMoveEnable, this.setTouchEnable, this);
    }

    private removeEvent() {
        EventMgr.ins.unRegister(Event.Map.CameraMoveTo, this.moveCameraTo, this);
        EventMgr.ins.unRegister(Event.Map.MapTouchMoveEnable, this.setTouchEnable, this);
    }

    setTouchEnable(enable: boolean) {
        this.canTouchMove = enable;
    }

    moveCameraTo(event: any, movedNext) {//cc.Event.EventCustom) {
        this.canTouchMove = false;
        this.isTouchMoving = false;
        this.camera.node.stopAllActions();

        let position: cc.Vec2 = cc.v2();
        if (event instanceof cc.Vec2) {
            var mapScale = MapIslandUtils.MapScale;
            event.scale(cc.v2(mapScale, mapScale), position);
            if (!this._canMoveY) position.y = 0;
        } else if (event instanceof cc.Node) {
            position = event.convertToWorldSpaceAR(cc.Vec2.ZERO) as cc.Vec2;
        }

        let delta = this.camera.node.position.sub(position);
        let endPosition = cc.v2();
        if (this.checkCameraCanMove(delta)) {
            endPosition = position.clone();
        } else {
            // let detal1 = this.camera.node.position.sub(delta);
            // cc.warn("摄像机不能移出地图", delta, detal1);
            endPosition = delta.clone();
        }
        // console.error("Moveto ", endPosition);
        let move = cc.moveTo(endPosition.mag() / this.moveSpeed, endPosition);
        let moveEndNext = cc.callFunc(() => {
            this.canTouchMove = true;
            // console.error("camera move end", this.camera.node.position);
            movedNext && movedNext();
        }, this);
        let seq1 = cc.sequence([move, moveEndNext]);
        this.camera.node.runAction(seq1);
    }

    onTouchBegin(event: cc.Event.EventTouch) {
        if (!this.canTouchMove) {
            event.stopPropagationImmediate();
            return;
        }
        this.camera.node.stopAllActions();
    }

    onTouchEnd(event: cc.Event.EventTouch) {
        if (!this.canTouchMove) {
            return;
        }
        var touches = event.getTouches();
        if (this.isTouchMoving && touches.length == 1) {
            let curZoomRatio = this.camera.zoomRatio;
            let distance = event.getStartLocation().sub(event.getPreviousLocation());
            let delta = distance.mul(0.3).mul(1 / curZoomRatio);
            if (!this._canMoveY) delta.y = 0;
            let speed = this.lastPos.sub(this.camera.node.position).mag() / this.dtime;
            if (speed > 2 && delta.mag() > 100 && this.checkCameraCanMove(delta.mul(-1))) {
                this.camera.node.runAction(
                    cc.sequence(
                        cc.moveBy(delta.mag() / (speed * 100), delta).easing(cc.easeQuadraticActionOut()),
                        cc.callFunc(() => {
                            this.isTouchMoving = false;
                        }, this)
                    )
                )
            } else {
                this.isTouchMoving = false;
            }
        }
    }

    touchControlCamera(event: cc.Event.EventTouch) {

        if (!this.canTouchMove) return;
        let curZoomRatio = 1//MapIslandUtils.MapScale;//this.camera.zoomRatio;

        var touches = event.getTouches();
        if (touches.length == 1) {
            let delta = event.getDelta().mul(1 / curZoomRatio);
            if (this.checkCameraCanMove(delta, true)) {
                if (!this._canMoveY) delta.y = 0;
                this.isTouchMoving = true;
                this.lastPos = this.camera.node.position;
                let now = cc.sys.now();
                this.dtime = now - this.lastTime;
                this.lastTime = now;
                this.camera.node.position = this.camera.node.position.subSelf(delta);
            }
        } else if (touches.length == 2) {  //禁止可以缩放
            return;
            // cc.log('sfdgg------', touches)
            var touchPoint1 = touches[0].getLocation();
            var touchPoint2 = touches[1].getLocation();
            var distance = Math.sqrt(Math.pow(touchPoint1.x - touchPoint2.x, 2) + Math.pow(touchPoint1.y - touchPoint2.y, 2));
            let dis = distance - this.oldDistance;
            dis != 0 && this.cameraZoom(dis);

            this.oldDistance = distance;
        }
    }

    checkCameraCanMove(delta: cc.Vec2, touch: boolean = false) {
        var cameraPosition = this.camera.node.position;
        var mapScale = MapIslandUtils.MapScale;
        // console.error(cameraPosition.x - this.camera.node.width / 2 - delta.x);
        if (cameraPosition.x - this.camera.node.width / 2 - delta.x <= - this.mapBg.width * mapScale / 2) {
            delta.x = - this.mapBg.width * mapScale / 2 + this.camera.node.width / 2;
            return false;
        }
        // console.error(cameraPosition.x + this.camera.node.width / 2 - delta.x);
        if (cameraPosition.x + this.camera.node.width / 2 - delta.x >= this.mapBg.width * mapScale / 2) {
            delta.x = this.mapBg.width * mapScale / 2 - this.camera.node.width / 2;
            return false;
        }
        // console.error(cameraPosition, this.mapBg.width * mapScale);

        return true;

        let [left, right, bottom, top] = this.getBoundaryDistance();

        let xCanMove = true;
        let yCanMove = this._canMoveY;

        if (left <= 0 && delta.x < 0 || right <= 0 && delta.x > 0) xCanMove = false;
        if (bottom <= 0 && delta.y < 0 || top <= 0 && delta.y > 0) yCanMove = false;

        if (xCanMove) {
            let moveX = Math.abs(delta.x);
            if (delta.x > 0) {
                if (left < moveX) {
                    if (touch) {
                        delta.x = left;
                    } else {
                        return false;
                    }
                }
            } else if (delta.x < 0) {
                if (right < moveX) {
                    if (touch) {
                        delta.x = -right;
                    } else {
                        return false;
                    }
                }
            }
        }

        if (yCanMove) {
            let moveY = Math.abs(delta.y);
            if (delta.y > 0) {
                if (bottom < moveY) {
                    if (touch) {
                        delta.y = bottom;
                    } else {
                        return false;
                    }
                }
            } else if (delta.y < 0) {
                if (top < moveY) {
                    if (touch) {
                        delta.y = -top;
                    } else {
                        return false;
                    }
                }
            }
        }
        return xCanMove || yCanMove;
    }

    getBoundaryDistance() {
        let curZoomRatio = MapIslandUtils.MapScale;
        let width = this.backgroundRect.width * curZoomRatio;
        let height = this.backgroundRect.height * curZoomRatio;
        let point = this.camera.getWorldToScreenPoint(this.backgroundPoint, cc.Vec2.ZERO);
        return [- point.x, point.x + width - cc.winSize.width, - point.y, point.y + height - cc.winSize.height];
    }

    cameraZoom(orientation) {
        let step = orientation > 0 ? 0.04 : -0.04;
        let curZoomRatio = this.camera.zoomRatio;
        curZoomRatio += step;
        if (curZoomRatio < this.zoomRatioMin || curZoomRatio > this.zoomRatioMax) return;

        this.camera.zoomRatio = curZoomRatio;

        let [left, right, bottom, top] = this.getBoundaryDistance();
        if (left < 0 || right < 0 || bottom < 0 || top < 0) {
            this.camera.zoomRatio = (curZoomRatio -= step);
        } else {
            this.updateMapVisible(true);
        }
    }

    updateMapVisible(force: boolean = false) {
        if (force || !this.lastCameraPos || (this.lastCameraPos && this.camera.node.position.sub(this.lastCameraPos).mag() > 1)) {
            this.updateNodeInCamera(this.mapBg, 0.35, this.loadMapBg, this);
            if (this.canTouchMove) {
                this.updateNodeInCamera(this.mapBg, this.camera.zoomRatio, this.reduceDrawCall, this);
                this.updateNodeInCamera(this.wall, this.camera.zoomRatio, this.reduceDrawCall, this);
            }
            this.lastCameraPos = this.camera.node.position;
            // EventMgr.ins.send(Event.Map.HideTool);
        }

    }

    updateNodeInCamera(parent: cc.Node, zoomRatio: number, callFunc: Function, target: any) {
        let children = parent.children;
        for (var idx = 0; idx < children.length; idx++) {
            let node = children[idx];
            let result = this.checkNodeInCamera(node, zoomRatio);
            callFunc.call(target, result, node);
        }
    }

    checkNodeInCamera(node: cc.Node, zoomRatio: number) {
        let curZoomRatio = zoomRatio || this.camera.zoomRatio;
        let nodeRect = node.getBoundingBoxToWorld();

        let nodeInCameraPos = this.camera.getWorldToScreenPoint(cc.v2(nodeRect.x, nodeRect.y), cc.Vec2.ZERO);
        let nodeInCameraRect = cc.rect(nodeInCameraPos.x, nodeInCameraPos.y, nodeRect.width * curZoomRatio, nodeRect.height * curZoomRatio);

        if (this.cameraRect.intersects(nodeInCameraRect)) {
            if (this.cameraRect.containsRect(nodeInCameraRect)) return 1; //包含
            return 0;   //相交
        }
        return -1;  //相离
    }

    reduceDrawCall(result: number, node: cc.Node) {
        if (result == 1) {
            node.opacity = node.opacity || 255;
        } else if (result == 0) {
            node.opacity = node.opacity || 255;
            this.updateNodeInCamera(node, this.camera.zoomRatio, this.reduceDrawCall, this);
        } else {
            node.opacity = 0;
        }
    }

    loadMapBg(result: number, node: cc.Node) {
        this.loadSpriteFrame(result, node, 'texture/map/bg/');
    }

    loadWall(result: number, node: cc.Node) {
        this.loadSpriteFrame(result, node, 'texture/map/wall/');
    }

    loadSpriteFrame(result: number, node: cc.Node, path: string) {
        let sprite = node.getComponent(cc.Sprite);
        if ((result == 1 || result == 0) && !sprite.spriteFrame) {
            cc.loader.loadRes(path + node.name, cc.SpriteFrame, (error, spriteFrame) => {
                if (!error) sprite.spriteFrame = spriteFrame;
            });
        }
    }

    onDisable() {
        this.camera.node.cleanup();
        // this.node.getWorldMatrix
    }

}
