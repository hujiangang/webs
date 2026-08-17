let async = require('async');
import { GodCommand } from "./GodCommand";
import { Locator } from "./Locator";
import { GuideCondition } from "./GuideCondition";
import { GuideUtils, EGuideStart } from "./GuideUtils";
import GodText from "./GodText";
import EventMgr from "../Script/Base/Manager/EventMgr";
import { Event } from "../Script/Logic/Data/Const/Event";
import MapIslandUtils from "../Script/Logic/SimulationOperation/View/Map/MapIslandUtils";
import GodFinger from "./GodFinger";
import { GuideData } from "./GuideData";

const RADIAN = 2 * Math.PI / 360;

export enum EGuideEvent {
    Stop = "_GuideStopHanlder",
}

function getRotatePoint(p, angle, center) {
    let out = cc.v2();
    let radian = -angle * RADIAN;
    out.x = (p.x - center.x) * Math.cos(radian) - (p.y - center.y) * Math.sin(radian) + center.x;
    out.y = (p.x - center.x) * Math.sin(radian) + (p.y - center.y) * Math.cos(radian) + center.y;
    return out;
}

function getRectRotatePoints(rect, angle, pt) {
    let array = [
        cc.v2(rect.x, rect.y),
        cc.v2(rect.x + rect.width, rect.y),
        cc.v2(rect.x + rect.width, rect.y + rect.height),
        cc.v2(rect.x, rect.y + rect.height),
    ];
    return array.map(p => getRotatePoint(p, angle, pt));
}


function getHTMLElementPosition(element) {
    var docElem = document.documentElement;
    var leftOffset = window.pageXOffset - docElem.clientLeft;
    var topOffset = window.pageYOffset - docElem.clientTop;
    if (typeof element.getBoundingClientRect === 'function') {
        var box = element.getBoundingClientRect();
        return {
            left: box.left + leftOffset,
            top: box.top + topOffset,
            width: box.width,
            height: box.height
        };
    }
    else {
        if (element instanceof HTMLCanvasElement) {
            return {
                left: leftOffset,
                top: topOffset,
                width: element.width,
                height: element.height
            };
        }
        else {
            return {
                left: leftOffset,
                top: topOffset,
                width: parseInt(element.style.width),
                height: parseInt(element.style.height)
            };
        }
    }
}

function touchSimulation(x, y) {

    let rect;
    //@ts-ignore
    let inputManager = window._cc ? window._cc.inputManager : cc.internal.inputManager
    if (cc.sys.isBrowser) {
        let canvas = document.getElementById("GameCanvas");
        rect = getHTMLElementPosition(canvas);
    } else {
        rect = cc.view.getFrameSize();
        rect.left = 0;
        rect.top = 0;
    }

    let vp = cc.view.getViewportRect();
    let sx = cc.view.getScaleX();
    let sy = cc.view.getScaleY();
    let ratio = cc.view.getDevicePixelRatio();
    let htmlx = (x * sx + vp.x) / ratio + rect.left;
    let htmly = rect.top + rect.height - (y * sy + vp.y) / ratio;
    let pt = cc.v2(htmlx, htmly);

    cc.log(`模拟点击坐标：${pt.x}, ${pt.y}`);
    let touch = inputManager.getTouchByXY(pt.x, pt.y, rect);
    inputManager.handleTouchesBegin([touch]);
    setTimeout(() => {
        inputManager.handleTouchesEnd([touch]);
    }, 200);

    // let click = document.createEvent("MouseEvents");
    // click.initMouseEvent("mousedown", true, true, window, 0, 0, 0, pt.x, pt.y, true, false, false, false, 0, null);
    // canvas.dispatchEvent(click);
    // setTimeout(function () {
    //     let mouseup = document.createEvent("MouseEvent");
    //     mouseup.initMouseEvent("mouseup", true, true, window, 0, 0, 0, pt.x, pt.y, true, false, false, false, 0, null);
    //     canvas.dispatchEvent(mouseup);
    // }, 500);
}
export interface ITaskData {
    name: string,
    debug: boolean,
    autorun: boolean,
    steps: IGuideConfig[],
    filename: string,
}
export interface IGuideCommand {
    cmd: string,
    args: string,
    role: number,
    positionY: number,
    type: string, //MapItem(海岛地图 需要缩放) MapUI(海岛地图UI 不需要缩放) UI(普通UI 无需特殊处理)
    hideFinger: boolean, //是否显示finger
    maskType: number, //1=使用rect
}
export interface IGuideConfig {
    guideId: number,
    desc: string,
    command: IGuideCommand,
    delayTime: number,
    if: string,
    param: number,
    onStart,
    onEnd,
    mask: boolean,
    noCheckDone: boolean,  //不检查是否此指引之前触发 只看条件是否满足
}

const TAG = "Guide";
const { ccclass, property } = cc._decorator;
@ccclass
export default class GodGuide extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    _selector: string = '';
    get selector(): string {
        return this._selector;
    }
    set selector(value: string) {
        this._selector = value;
        this.find(value);
    }

    type: {
        default: cc.Mask.Type.RECT;
        type: cc.Mask.Type;
    }

    @property(cc.Prefab)
    FINGER_PREFAB: cc.Prefab = null;

    @property(cc.Prefab)
    TEXT_PREFAB: cc.Prefab = null;

    GodGuide: any;
    _targetNode: cc.Node;
    _finger: GodFinger;
    _text: cc.Node;
    _dialogue: cc.Node;
    _debugNode: cc.Node;
    _autorun: cc.Label;
    _mask: cc.Mask;
    _dispatchEvent: any;
    _task: ITaskData;
    _recordSteps: any[];
    _curStepConfig: IGuideConfig;

    onLoad() {
        this.init();
        this.GodGuide = this;
        // EventMgr.ins.register(Event.Map.GuideMask, this.onGuideMask, this);
        // this.onGuideMask(false);
    }

    onDestroy() {
        // EventMgr.ins.unRegister(Event.Map.GuideMask, this.onGuideMask, this);
    }

    touchSimulation(node) {
        this.log('自动执行，模拟触摸');
        this.scheduleOnce(() => {
            cc.log('自动节点 :', JSON.stringify(node.position));
            let p = node.parent.convertToWorldSpaceAR(node.position);
            cc.log('世界节点 :', JSON.stringify(p));
            touchSimulation(p.x, p.y);
        }, 1);
    }

    init() {
        this.node.setContentSize(cc.winSize);
        //创建手指提示
        this._targetNode = null;
        if (this.FINGER_PREFAB) {
            let nodeFinger = cc.instantiate(this.FINGER_PREFAB);
            nodeFinger.parent = this.node;
            nodeFinger.active = false;
            this._finger = nodeFinger.getComponent(GodFinger);
        }

        //创建文本提示
        if (this.TEXT_PREFAB) {
            this._text = cc.instantiate(this.TEXT_PREFAB);
            this._text.parent = this.node;
            this._text.active = false;
        }

        //调试工具界面
        this._debugNode = this.node.getChildByName('debug');

        //自动引导切换
        this._autorun = cc.find('autorun/Background/Label', this._debugNode).getComponent(cc.Label);
        this._autorun.string = `自动执行（关）`;


        //获取遮罩组件 
        this._mask = this.node.getComponentInChildren(cc.Mask);
        this._mask.inverted = true;
        this._mask.node.active = false;

        //监听事件
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {

            //录制中，放行
            if (this._dispatchEvent) {
                this.node["_touchListener"].setSwallowTouches(false);
                return;
            }

            //放行
            if (!this._mask.node.active) {
                this.node["_touchListener"].setSwallowTouches(false);
                return;
            }

            //目标节点不存在，拦截
            if (!this._targetNode) {
                this.node["_touchListener"].setSwallowTouches(true);
                return;
            }

            //目标区域存在，击中放行
            let rectPos = MapIslandUtils.convertMapItemPosition(this._targetNode, this._curStepConfig);
            let rect: cc.Rect = this._targetNode.getBoundingBoxToWorld();;
            if (rectPos == null) {
                let command = this._curStepConfig.command;
                if (command && command.type && command.type == "MapUI") {
                    // rectPos = rect.origin.sub(MapIslandUtils.mapCamera.node.position);
                    let cameraPos = MapIslandUtils.mapCamera.node.position;
                    let newRect = cc.rect(rect.x - cameraPos.x, rect.y - cameraPos.y,
                        rect.width, rect.height);
                    rect = newRect;
                }
            } else {
                let cavans = cc.find("Canvas");
                rectPos = cavans.convertToWorldSpaceAR(rectPos);
                let newRect = cc.rect(rectPos.x - rect.width / 2, rectPos.y - rect.height / 2, rect.width, rect.height);
                rect = newRect;
            }

            if (rect.contains(event.getLocation())) {
                this.node["_touchListener"].setSwallowTouches(false);
                cc.log('命中目标节点，放行');
                // this._targetNode.emit(cc.Node.EventType.TOUCH_END, event);
            } else {
                this.node["_touchListener"].setSwallowTouches(true);
                cc.log('未命中目标节点，拦截');
            }
        }, this);
    }


    start() {
        // cc.debug.setDisplayStats(false);
    }

    setTask(task) {
        if (this._task) {
            cc.warn('当前任务还未处理完毕！');
            return;
        }

        this._debugNode.active = !!task.debug;
        this._autorun.string = `自动执行(${task.autorun ? '开' : '关'})`;
        this._task = task;
    }

    getTask() {
        return this._task;
    }

    run(callback?) {
        if (!this._task) {
            return;
        }
        // console.warn(TAG, 'this._task.steps---------->', this._task.steps);
        async.eachSeries(this._task.steps, (step, cb) => {
            this._curStepConfig = step;
            this._processStep(step, cb);
        }, (error) => {
            if (error) {
                GuideUtils.logError(TAG, this._curStepConfig.guideId, "run error", error);
            } else {
                GuideUtils.logError("引导顺利完成", this._task.filename);
                this._task && GuideData.pushFinishedTask(this._task.filename);
            }
            this._task = null;
            this._curStepConfig = null;
            this._mask.node.active = false;
            if (this._finger) {
                this._finger.active = false;
            }
            callback && callback();
        });
    }

    _processStep(step: IGuideConfig, callback) {
        GuideUtils.logError(TAG, " 开始执行 ", step.guideId);
        async.series({
            //任务开始
            stepStart(cb) {
                if (step.onStart) {
                    if ((!GuideUtils.checkGuideDone(step.guideId) || !!step.noCheckDone)) {
                        GuideUtils.logError(TAG, " onStart ", step.guideId);
                        step.onStart((err) => { cb(err, null) });
                    } else {
                        cb(null, null);
                    }
                } else {
                    cb(null, null);
                }
            },
            //任务指令
            stepCommand: (cb) => {
                this.registerStop(cb);
                GuideUtils.logError(TAG, " stepCommand ", step.guideId);
                let cmd = GodCommand[step.command.cmd];
                let guideId = GuideUtils.curGuideId = step.guideId;
                if (cmd && (!GuideUtils.checkGuideDone(guideId) || !!step.noCheckDone)) {
                    if (GuideCondition.checkCondition(step)) {
                        this.scheduleOnce(() => {
                            this._processStepCommand(step, (error) => {
                                cb(error, null);
                            });
                        }, step.delayTime || 0);
                    } else {
                        cb(EGuideStart.ConditionNotReach);
                    }
                } else {
                    this.log(`执行步骤【${guideId}】指令 跳过！`, step);
                    cb();
                }
            },
            //任务结束
            taskEnd: (cb) => {
                GuideUtils.logError(TAG, " taskEnd ", step.guideId);
                this._mask['_graphics'] && this._mask['_graphics'].clear();
                this._mask.node.setContentSize(0, 0);
                this._finger.active = false;
                this._finger.node.setPosition(cc.v2(0, 0));
                if (step.onEnd) {
                    if ((!GuideUtils.checkGuideDone(step.guideId) || !!step.noCheckDone)) {
                        step.onEnd((err) => { cb(err, null) });
                    } else {
                        cb(null, null);
                    }
                } else {
                    cb(null, null);
                }
            },
        }, (error, result) => {
            GuideUtils.curGuideId = -1;
            this._targetNode = null;
            this.unregisterStop();

            GuideUtils.logError(TAG, `步骤【${step.guideId}】结束！ error:` + error);
            if (GuideUtils.stopGuide) {
                this.clearGuide();
                GuideUtils.logError("手动停止引导");
                callback(true);
                return;
            }
            if (error && error != EGuideStart.None) {
                if (error == EGuideStart.ConditionNotReach) {
                    this._task && GuideData.pushNoConditionTask(this._task.filename);
                    callback(null, null);
                    return;
                } else if (error == EGuideStart.Stop) {
                    callback(error, null);
                    return;
                }
            }
            GuideUtils.doneGuideId = step.guideId;
            callback(error);
        });
    }

    /**
     * 手指动画
     */
    fingerToNode(node, cb) {
        if (!this._finger) {
            cb();
        }
        let curStepConfig = this._curStepConfig;
        if (curStepConfig && curStepConfig.command && curStepConfig.command.hideFinger) {
            this._finger.active = false;
            cb();
            return;
        }
        this._finger.active = true;

        let rectPos = MapIslandUtils.convertMapItemPosition(node, curStepConfig);
        if (rectPos == null) {
            let command = curStepConfig.command;
            rectPos = node.parent.convertToWorldSpaceAR(node.position) //rect.origin;

            if (command && command.type && command.type == "MapUI") {
                rectPos = rectPos.sub(MapIslandUtils.mapCamera.node.getPosition());
            }
        } else {
            var cavans = cc.find("Canvas");
            rectPos = cavans.convertToWorldSpaceAR(rectPos);
        }
        let p = this.node.convertToNodeSpaceAR(rectPos);

        let duration = 0.6 * p.sub(this._finger.node.getPosition()).mag() / cc.winSize.height;
        let moveTo = cc.moveTo(duration, p);
        let callFunc = cc.callFunc(() => {
            cb();
            this._finger.doFinger();
        }, this);

        let sequnce = cc.sequence(moveTo, callFunc);
        this._finger.node.runAction(sequnce);
    }

    log(...text) {
        if (this._task && this._task.debug) {
            GuideUtils.logError(text);
        }
    }

    /**
     * 处理步骤指令
     * @param {*} step 
     * @param {*} cb 
     */
    _processStepCommand(step: IGuideConfig, cb) {
        let cmd = GodCommand[step.command.cmd];
        let guideId = step.guideId;
        // if (cmd && (!GuideUtils.checkGuideDone(guideId) || !!step.noCheckDone)) {
        //     if (GuideCondition.checkCondition(step)) {
        this.log(`执行步骤【${guideId}】指令`);
        this._mask.node.active = step.mask != undefined ? step.mask : true;
        cmd(this, step, () => {
            // GuideUtils.doneGuideId = step.guideId;
            this.log(`步骤【${guideId}】指令 执行完毕`);
            cb();
        });
        //     } else {
        //         this.log(`执行步骤【${guideId}】指令 不满足条件`, step);
        //         cb(EGuideStart.ConditionNotReach);
        //     }
        // } else {
        //     this.log(`执行步骤【${guideId}】指令 跳过！`, step);
        //     cb();
        // }
    }

    find(value, cb?) {
        // let root = cc.find('Canvas');
        let [root, value1] = this.findRoot(value);
        Locator.locateNode(root, value1, (error, node) => {
            if (error) {
                cc.error(error);
                return;
            }
            cc.log('定位节点成功');
            let rect = this._focusToNode(node);
            if (cb && rect) {
                cb(node, rect);
            }
        });
    }

    //在scene的上层节点去寻找
    findRoot(value: string) {
        if (value.indexOf(":") != -1) {
            var arr = value.split(":");
            return [cc.find(arr[0]), arr[1]];
        }
        return [cc.find("Canvas"), value];
    }

    locateNodeByEvent(sender) {
        this._selector = sender.string;
    }

    getNodePoints(rect, angle, pt) {
        return getRectRotatePoints(rect, angle, pt).map(p => {
            return p;
        });
    }

    _focusToNode(node: cc.Node): cc.Rect {
        // this._mask['_graphics'].clear();
        if (!this._curStepConfig) return null;
        let rect = node.getBoundingBoxToWorld();
        let rectPos = MapIslandUtils.convertMapItemPosition(node, this._curStepConfig);
        if (rectPos == null) {
            let command = this._curStepConfig.command;
            if (command && command.type && command.type == "MapUI") {
                rectPos = rect.origin.sub(MapIslandUtils.mapCamera.node.getPosition());
            } else {
                rectPos = rect.origin;
            }
        } else {
            var canvas = cc.find("Canvas");
            rectPos = canvas.convertToWorldSpaceAR(rectPos);
            rectPos.x -= rect.width / 2;
            rectPos.y -= rect.height / 2;
        }

        let p = this.node.convertToNodeSpaceAR(rectPos);
        rect.x = p.x;
        rect.y = p.y;

        if (this._curStepConfig.command) {
            // this._mask.spriteFrame = null;
            this._mask['_graphics'] && this._mask['_graphics'].clear(true);
            this._mask.node.setContentSize(0, 0);

            if (this._curStepConfig.command.maskType && this._curStepConfig.command.maskType == 1) {
                // this._mask['_graphics'].clear(true);
                this._mask.type = cc.Mask.Type.RECT;
                this._mask.node.setPosition(cc.v2(0, 0));
                this._mask['_graphics'].fillRect(rect.x, rect.y, rect.width, rect.height);
            } else {
                let maskSp = node.getComponent(cc.Sprite) || node.getComponentInChildren(cc.Sprite);
                if (maskSp) {
                    // this._mask['_graphics'].clear();
                    let nodeScale = 1;//maskSp.node.scale;
                    this._mask.type = cc.Mask.Type.IMAGE_STENCIL;
                    this._mask.spriteFrame = maskSp.spriteFrame;
                    this._mask.alphaThreshold = 0.7;
                    this._mask.node.setContentSize(node.width * nodeScale, node.height * nodeScale);
                    p.x += rect.width / 2;
                    p.y += rect.height / 2;
                    this._mask.node.setPosition(p);
                }
            }
        }

        return rect;
    }

    /**
     * 获取节点全路径
     * @param {*} node 
     */
    getNodeFullPath(node) {
        let array = [];
        let temp = node;
        do {
            array.unshift(temp.name);
            temp = temp.parent;
        } while (temp && temp.name !== 'Canvas')
        return array.join('/');
    }

    /**
     * 是否为引导层节点
     * @param {*} node 
     */
    isGuideNode(node) {
        let result = false;
        let temp = node;
        do {
            if (temp === this.node) {
                result = true;
                break;
            }
        } while (temp = temp.parent)

        return result;
    }

    /**
     * 录制节点触摸
     */
    startRecordNodeTouch() {
        if (this._task) {
            cc.warn(`任务引导中，不能录制`);
            return;
        }

        if (this._dispatchEvent) {
            cc.warn('已经进入录制模式');
            return;
        }

        //缓存引擎原生触摸派发函数
        this._dispatchEvent = cc.Node.prototype.dispatchEvent;
        this._recordSteps = [];

        let self = this;
        let time = Date.now();
        //Hook节点事件派发函数
        cc.Node.prototype.dispatchEvent = function (event) {
            //执行引擎原生触摸派发函数
            self._dispatchEvent.call(this, event);
            //过滤掉引导节点上的事件，
            if (self.isGuideNode(this)) {
                return;
            }
            //仅缓存对节点的TouchEnd操作
            if (event.type === cc.Node.EventType.TOUCH_END) {
                let now = Date.now();
                let delay = (now - time) / 1000;
                time = now;
                let args = self.getNodeFullPath(this);
                self._recordSteps.push({
                    desc: `点击${args}`,
                    command: { cmd: 'finger', args },
                    delay,
                });
            }
        }
    }

    /**
     * 停止节点触摸录制
     */
    stopRecordNodeTouch() {
        if (this._dispatchEvent) {
            cc.Node.prototype.dispatchEvent = this._dispatchEvent;
            this._dispatchEvent = null;
            cc.warn('退出录制状态');
        } else {
            cc.warn('未进入录制状态');
        }
    }

    /**
     * 回放录制
     */
    playRecordNodeTouch(sender, autorun) {
        this.stopRecordNodeTouch();
        if (this._recordSteps && this._recordSteps.length) {
            cc.log('生成任务：', JSON.stringify(this._recordSteps));
            let task = {
                autorun: !!autorun,
                debug: true,
                steps: this._recordSteps,
            }
            this._recordSteps = null;
            this.setTask(task);
            this.run();
        }
    }

    //显示文本
    showText(text, role, positionY, callback) {
        this._text.once('click', callback);
        let godText = this._text.getComponent(this.TEXT_PREFAB.name) as GodText;
        godText.setText(text, role, positionY, callback);
    }

    setAutorun() {
        if (this._task) {
            this._task.autorun = !this._task.autorun;
            this._autorun.string = `自动执行(${this._task.autorun ? '开' : '关'})`;
        }
    }

    close() {
        this.node.active = false;
    }

    //注册可能手动暂停引导的事件
    public registerStop(next) {
        this.unregisterStop();
        this.node.once(EGuideEvent.Stop, () => {
            next && next("强制停止了");
        });
    }

    public unregisterStop() {
        this.node.off(EGuideEvent.Stop);
    }

    //清理引导上的文字、遮罩、手指
    public clearGuide() {
        this._text && (this._text.active = false);
        this._finger && (this._finger.active = false);
        this._mask && (this._mask.node.active = false);
        // if (this._targetNode) {
        //     this._targetNode.off(cc.Node.EventType.TOUCH_END);
        // }
    }
}
