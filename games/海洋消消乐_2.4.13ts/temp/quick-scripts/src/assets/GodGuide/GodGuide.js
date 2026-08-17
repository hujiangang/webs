"use strict";
cc._RF.push(module, 'fc7d0qwogREsqMsfej7uXfW', 'GodGuide');
// GodGuide/GodGuide.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EGuideEvent = void 0;
var async = require('async');
var GodCommand_1 = require("./GodCommand");
var Locator_1 = require("./Locator");
var GuideCondition_1 = require("./GuideCondition");
var GuideUtils_1 = require("./GuideUtils");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var GodFinger_1 = require("./GodFinger");
var GuideData_1 = require("./GuideData");
var RADIAN = 2 * Math.PI / 360;
var EGuideEvent;
(function (EGuideEvent) {
    EGuideEvent["Stop"] = "_GuideStopHanlder";
})(EGuideEvent = exports.EGuideEvent || (exports.EGuideEvent = {}));
function getRotatePoint(p, angle, center) {
    var out = cc.v2();
    var radian = -angle * RADIAN;
    out.x = (p.x - center.x) * Math.cos(radian) - (p.y - center.y) * Math.sin(radian) + center.x;
    out.y = (p.x - center.x) * Math.sin(radian) + (p.y - center.y) * Math.cos(radian) + center.y;
    return out;
}
function getRectRotatePoints(rect, angle, pt) {
    var array = [
        cc.v2(rect.x, rect.y),
        cc.v2(rect.x + rect.width, rect.y),
        cc.v2(rect.x + rect.width, rect.y + rect.height),
        cc.v2(rect.x, rect.y + rect.height),
    ];
    return array.map(function (p) { return getRotatePoint(p, angle, pt); });
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
    var rect;
    //@ts-ignore
    var inputManager = window._cc ? window._cc.inputManager : cc.internal.inputManager;
    if (cc.sys.isBrowser) {
        var canvas = document.getElementById("GameCanvas");
        rect = getHTMLElementPosition(canvas);
    }
    else {
        rect = cc.view.getFrameSize();
        rect.left = 0;
        rect.top = 0;
    }
    var vp = cc.view.getViewportRect();
    var sx = cc.view.getScaleX();
    var sy = cc.view.getScaleY();
    var ratio = cc.view.getDevicePixelRatio();
    var htmlx = (x * sx + vp.x) / ratio + rect.left;
    var htmly = rect.top + rect.height - (y * sy + vp.y) / ratio;
    var pt = cc.v2(htmlx, htmly);
    cc.log("\u6A21\u62DF\u70B9\u51FB\u5750\u6807\uFF1A" + pt.x + ", " + pt.y);
    var touch = inputManager.getTouchByXY(pt.x, pt.y, rect);
    inputManager.handleTouchesBegin([touch]);
    setTimeout(function () {
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
var TAG = "Guide";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GodGuide = /** @class */ (function (_super) {
    __extends(GodGuide, _super);
    function GodGuide() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._selector = '';
        _this.FINGER_PREFAB = null;
        _this.TEXT_PREFAB = null;
        return _this;
    }
    Object.defineProperty(GodGuide.prototype, "selector", {
        get: function () {
            return this._selector;
        },
        set: function (value) {
            this._selector = value;
            this.find(value);
        },
        enumerable: false,
        configurable: true
    });
    GodGuide.prototype.onLoad = function () {
        this.init();
        this.GodGuide = this;
        // EventMgr.ins.register(Event.Map.GuideMask, this.onGuideMask, this);
        // this.onGuideMask(false);
    };
    GodGuide.prototype.onDestroy = function () {
        // EventMgr.ins.unRegister(Event.Map.GuideMask, this.onGuideMask, this);
    };
    GodGuide.prototype.touchSimulation = function (node) {
        this.log('自动执行，模拟触摸');
        this.scheduleOnce(function () {
            cc.log('自动节点 :', JSON.stringify(node.position));
            var p = node.parent.convertToWorldSpaceAR(node.position);
            cc.log('世界节点 :', JSON.stringify(p));
            touchSimulation(p.x, p.y);
        }, 1);
    };
    GodGuide.prototype.init = function () {
        var _this = this;
        this.node.setContentSize(cc.winSize);
        //创建手指提示
        this._targetNode = null;
        if (this.FINGER_PREFAB) {
            var nodeFinger = cc.instantiate(this.FINGER_PREFAB);
            nodeFinger.parent = this.node;
            nodeFinger.active = false;
            this._finger = nodeFinger.getComponent(GodFinger_1.default);
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
        this._autorun.string = "\u81EA\u52A8\u6267\u884C\uFF08\u5173\uFF09";
        //获取遮罩组件 
        this._mask = this.node.getComponentInChildren(cc.Mask);
        this._mask.inverted = true;
        this._mask.node.active = false;
        //监听事件
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //录制中，放行
            if (_this._dispatchEvent) {
                _this.node["_touchListener"].setSwallowTouches(false);
                return;
            }
            //放行
            if (!_this._mask.node.active) {
                _this.node["_touchListener"].setSwallowTouches(false);
                return;
            }
            //目标节点不存在，拦截
            if (!_this._targetNode) {
                _this.node["_touchListener"].setSwallowTouches(true);
                return;
            }
            //目标区域存在，击中放行
            var rectPos = MapIslandUtils_1.default.convertMapItemPosition(_this._targetNode, _this._curStepConfig);
            var rect = _this._targetNode.getBoundingBoxToWorld();
            ;
            if (rectPos == null) {
                var command = _this._curStepConfig.command;
                if (command && command.type && command.type == "MapUI") {
                    // rectPos = rect.origin.sub(MapIslandUtils.mapCamera.node.position);
                    var cameraPos = MapIslandUtils_1.default.mapCamera.node.position;
                    var newRect = cc.rect(rect.x - cameraPos.x, rect.y - cameraPos.y, rect.width, rect.height);
                    rect = newRect;
                }
            }
            else {
                var cavans = cc.find("Canvas");
                rectPos = cavans.convertToWorldSpaceAR(rectPos);
                var newRect = cc.rect(rectPos.x - rect.width / 2, rectPos.y - rect.height / 2, rect.width, rect.height);
                rect = newRect;
            }
            if (rect.contains(event.getLocation())) {
                _this.node["_touchListener"].setSwallowTouches(false);
                cc.log('命中目标节点，放行');
                // this._targetNode.emit(cc.Node.EventType.TOUCH_END, event);
            }
            else {
                _this.node["_touchListener"].setSwallowTouches(true);
                cc.log('未命中目标节点，拦截');
            }
        }, this);
    };
    GodGuide.prototype.start = function () {
        // cc.debug.setDisplayStats(false);
    };
    GodGuide.prototype.setTask = function (task) {
        if (this._task) {
            cc.warn('当前任务还未处理完毕！');
            return;
        }
        this._debugNode.active = !!task.debug;
        this._autorun.string = "\u81EA\u52A8\u6267\u884C(" + (task.autorun ? '开' : '关') + ")";
        this._task = task;
    };
    GodGuide.prototype.getTask = function () {
        return this._task;
    };
    GodGuide.prototype.run = function (callback) {
        var _this = this;
        if (!this._task) {
            return;
        }
        // console.warn(TAG, 'this._task.steps---------->', this._task.steps);
        async.eachSeries(this._task.steps, function (step, cb) {
            _this._curStepConfig = step;
            _this._processStep(step, cb);
        }, function (error) {
            if (error) {
                GuideUtils_1.GuideUtils.logError(TAG, _this._curStepConfig.guideId, "run error", error);
            }
            else {
                GuideUtils_1.GuideUtils.logError("引导顺利完成", _this._task.filename);
                _this._task && GuideData_1.GuideData.pushFinishedTask(_this._task.filename);
            }
            _this._task = null;
            _this._curStepConfig = null;
            _this._mask.node.active = false;
            if (_this._finger) {
                _this._finger.active = false;
            }
            callback && callback();
        });
    };
    GodGuide.prototype._processStep = function (step, callback) {
        var _this = this;
        GuideUtils_1.GuideUtils.logError(TAG, " 开始执行 ", step.guideId);
        async.series({
            //任务开始
            stepStart: function (cb) {
                if (step.onStart) {
                    if ((!GuideUtils_1.GuideUtils.checkGuideDone(step.guideId) || !!step.noCheckDone)) {
                        GuideUtils_1.GuideUtils.logError(TAG, " onStart ", step.guideId);
                        step.onStart(function (err) { cb(err, null); });
                    }
                    else {
                        cb(null, null);
                    }
                }
                else {
                    cb(null, null);
                }
            },
            //任务指令
            stepCommand: function (cb) {
                _this.registerStop(cb);
                GuideUtils_1.GuideUtils.logError(TAG, " stepCommand ", step.guideId);
                var cmd = GodCommand_1.GodCommand[step.command.cmd];
                var guideId = GuideUtils_1.GuideUtils.curGuideId = step.guideId;
                if (cmd && (!GuideUtils_1.GuideUtils.checkGuideDone(guideId) || !!step.noCheckDone)) {
                    if (GuideCondition_1.GuideCondition.checkCondition(step)) {
                        _this.scheduleOnce(function () {
                            _this._processStepCommand(step, function (error) {
                                cb(error, null);
                            });
                        }, step.delayTime || 0);
                    }
                    else {
                        cb(GuideUtils_1.EGuideStart.ConditionNotReach);
                    }
                }
                else {
                    _this.log("\u6267\u884C\u6B65\u9AA4\u3010" + guideId + "\u3011\u6307\u4EE4 \u8DF3\u8FC7\uFF01", step);
                    cb();
                }
            },
            //任务结束
            taskEnd: function (cb) {
                GuideUtils_1.GuideUtils.logError(TAG, " taskEnd ", step.guideId);
                _this._mask['_graphics'] && _this._mask['_graphics'].clear();
                _this._mask.node.setContentSize(0, 0);
                _this._finger.active = false;
                _this._finger.node.setPosition(cc.v2(0, 0));
                if (step.onEnd) {
                    if ((!GuideUtils_1.GuideUtils.checkGuideDone(step.guideId) || !!step.noCheckDone)) {
                        step.onEnd(function (err) { cb(err, null); });
                    }
                    else {
                        cb(null, null);
                    }
                }
                else {
                    cb(null, null);
                }
            },
        }, function (error, result) {
            GuideUtils_1.GuideUtils.curGuideId = -1;
            _this._targetNode = null;
            _this.unregisterStop();
            GuideUtils_1.GuideUtils.logError(TAG, "\u6B65\u9AA4\u3010" + step.guideId + "\u3011\u7ED3\u675F\uFF01 error:" + error);
            if (GuideUtils_1.GuideUtils.stopGuide) {
                _this.clearGuide();
                GuideUtils_1.GuideUtils.logError("手动停止引导");
                callback(true);
                return;
            }
            if (error && error != GuideUtils_1.EGuideStart.None) {
                if (error == GuideUtils_1.EGuideStart.ConditionNotReach) {
                    _this._task && GuideData_1.GuideData.pushNoConditionTask(_this._task.filename);
                    callback(null, null);
                    return;
                }
                else if (error == GuideUtils_1.EGuideStart.Stop) {
                    callback(error, null);
                    return;
                }
            }
            GuideUtils_1.GuideUtils.doneGuideId = step.guideId;
            callback(error);
        });
    };
    /**
     * 手指动画
     */
    GodGuide.prototype.fingerToNode = function (node, cb) {
        var _this = this;
        if (!this._finger) {
            cb();
        }
        var curStepConfig = this._curStepConfig;
        if (curStepConfig && curStepConfig.command && curStepConfig.command.hideFinger) {
            this._finger.active = false;
            cb();
            return;
        }
        this._finger.active = true;
        var rectPos = MapIslandUtils_1.default.convertMapItemPosition(node, curStepConfig);
        if (rectPos == null) {
            var command = curStepConfig.command;
            rectPos = node.parent.convertToWorldSpaceAR(node.position); //rect.origin;
            if (command && command.type && command.type == "MapUI") {
                rectPos = rectPos.sub(MapIslandUtils_1.default.mapCamera.node.getPosition());
            }
        }
        else {
            var cavans = cc.find("Canvas");
            rectPos = cavans.convertToWorldSpaceAR(rectPos);
        }
        var p = this.node.convertToNodeSpaceAR(rectPos);
        var duration = 0.6 * p.sub(this._finger.node.getPosition()).mag() / cc.winSize.height;
        var moveTo = cc.moveTo(duration, p);
        var callFunc = cc.callFunc(function () {
            cb();
            _this._finger.doFinger();
        }, this);
        var sequnce = cc.sequence(moveTo, callFunc);
        this._finger.node.runAction(sequnce);
    };
    GodGuide.prototype.log = function () {
        var text = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            text[_i] = arguments[_i];
        }
        if (this._task && this._task.debug) {
            GuideUtils_1.GuideUtils.logError(text);
        }
    };
    /**
     * 处理步骤指令
     * @param {*} step
     * @param {*} cb
     */
    GodGuide.prototype._processStepCommand = function (step, cb) {
        var _this = this;
        var cmd = GodCommand_1.GodCommand[step.command.cmd];
        var guideId = step.guideId;
        // if (cmd && (!GuideUtils.checkGuideDone(guideId) || !!step.noCheckDone)) {
        //     if (GuideCondition.checkCondition(step)) {
        this.log("\u6267\u884C\u6B65\u9AA4\u3010" + guideId + "\u3011\u6307\u4EE4");
        this._mask.node.active = step.mask != undefined ? step.mask : true;
        cmd(this, step, function () {
            // GuideUtils.doneGuideId = step.guideId;
            _this.log("\u6B65\u9AA4\u3010" + guideId + "\u3011\u6307\u4EE4 \u6267\u884C\u5B8C\u6BD5");
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
    };
    GodGuide.prototype.find = function (value, cb) {
        var _this = this;
        // let root = cc.find('Canvas');
        var _a = this.findRoot(value), root = _a[0], value1 = _a[1];
        Locator_1.Locator.locateNode(root, value1, function (error, node) {
            if (error) {
                cc.error(error);
                return;
            }
            cc.log('定位节点成功');
            var rect = _this._focusToNode(node);
            if (cb && rect) {
                cb(node, rect);
            }
        });
    };
    //在scene的上层节点去寻找
    GodGuide.prototype.findRoot = function (value) {
        if (value.indexOf(":") != -1) {
            var arr = value.split(":");
            return [cc.find(arr[0]), arr[1]];
        }
        return [cc.find("Canvas"), value];
    };
    GodGuide.prototype.locateNodeByEvent = function (sender) {
        this._selector = sender.string;
    };
    GodGuide.prototype.getNodePoints = function (rect, angle, pt) {
        return getRectRotatePoints(rect, angle, pt).map(function (p) {
            return p;
        });
    };
    GodGuide.prototype._focusToNode = function (node) {
        // this._mask['_graphics'].clear();
        if (!this._curStepConfig)
            return null;
        var rect = node.getBoundingBoxToWorld();
        var rectPos = MapIslandUtils_1.default.convertMapItemPosition(node, this._curStepConfig);
        if (rectPos == null) {
            var command = this._curStepConfig.command;
            if (command && command.type && command.type == "MapUI") {
                rectPos = rect.origin.sub(MapIslandUtils_1.default.mapCamera.node.getPosition());
            }
            else {
                rectPos = rect.origin;
            }
        }
        else {
            var canvas = cc.find("Canvas");
            rectPos = canvas.convertToWorldSpaceAR(rectPos);
            rectPos.x -= rect.width / 2;
            rectPos.y -= rect.height / 2;
        }
        var p = this.node.convertToNodeSpaceAR(rectPos);
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
            }
            else {
                var maskSp = node.getComponent(cc.Sprite) || node.getComponentInChildren(cc.Sprite);
                if (maskSp) {
                    // this._mask['_graphics'].clear();
                    var nodeScale = 1; //maskSp.node.scale;
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
    };
    /**
     * 获取节点全路径
     * @param {*} node
     */
    GodGuide.prototype.getNodeFullPath = function (node) {
        var array = [];
        var temp = node;
        do {
            array.unshift(temp.name);
            temp = temp.parent;
        } while (temp && temp.name !== 'Canvas');
        return array.join('/');
    };
    /**
     * 是否为引导层节点
     * @param {*} node
     */
    GodGuide.prototype.isGuideNode = function (node) {
        var result = false;
        var temp = node;
        do {
            if (temp === this.node) {
                result = true;
                break;
            }
        } while (temp = temp.parent);
        return result;
    };
    /**
     * 录制节点触摸
     */
    GodGuide.prototype.startRecordNodeTouch = function () {
        if (this._task) {
            cc.warn("\u4EFB\u52A1\u5F15\u5BFC\u4E2D\uFF0C\u4E0D\u80FD\u5F55\u5236");
            return;
        }
        if (this._dispatchEvent) {
            cc.warn('已经进入录制模式');
            return;
        }
        //缓存引擎原生触摸派发函数
        this._dispatchEvent = cc.Node.prototype.dispatchEvent;
        this._recordSteps = [];
        var self = this;
        var time = Date.now();
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
                var now = Date.now();
                var delay = (now - time) / 1000;
                time = now;
                var args = self.getNodeFullPath(this);
                self._recordSteps.push({
                    desc: "\u70B9\u51FB" + args,
                    command: { cmd: 'finger', args: args },
                    delay: delay,
                });
            }
        };
    };
    /**
     * 停止节点触摸录制
     */
    GodGuide.prototype.stopRecordNodeTouch = function () {
        if (this._dispatchEvent) {
            cc.Node.prototype.dispatchEvent = this._dispatchEvent;
            this._dispatchEvent = null;
            cc.warn('退出录制状态');
        }
        else {
            cc.warn('未进入录制状态');
        }
    };
    /**
     * 回放录制
     */
    GodGuide.prototype.playRecordNodeTouch = function (sender, autorun) {
        this.stopRecordNodeTouch();
        if (this._recordSteps && this._recordSteps.length) {
            cc.log('生成任务：', JSON.stringify(this._recordSteps));
            var task = {
                autorun: !!autorun,
                debug: true,
                steps: this._recordSteps,
            };
            this._recordSteps = null;
            this.setTask(task);
            this.run();
        }
    };
    //显示文本
    GodGuide.prototype.showText = function (text, role, positionY, callback) {
        this._text.once('click', callback);
        var godText = this._text.getComponent(this.TEXT_PREFAB.name);
        godText.setText(text, role, positionY, callback);
    };
    GodGuide.prototype.setAutorun = function () {
        if (this._task) {
            this._task.autorun = !this._task.autorun;
            this._autorun.string = "\u81EA\u52A8\u6267\u884C(" + (this._task.autorun ? '开' : '关') + ")";
        }
    };
    GodGuide.prototype.close = function () {
        this.node.active = false;
    };
    //注册可能手动暂停引导的事件
    GodGuide.prototype.registerStop = function (next) {
        this.unregisterStop();
        this.node.once(EGuideEvent.Stop, function () {
            next && next("强制停止了");
        });
    };
    GodGuide.prototype.unregisterStop = function () {
        this.node.off(EGuideEvent.Stop);
    };
    //清理引导上的文字、遮罩、手指
    GodGuide.prototype.clearGuide = function () {
        this._text && (this._text.active = false);
        this._finger && (this._finger.active = false);
        this._mask && (this._mask.node.active = false);
        // if (this._targetNode) {
        //     this._targetNode.off(cc.Node.EventType.TOUCH_END);
        // }
    };
    __decorate([
        property(cc.Prefab)
    ], GodGuide.prototype, "FINGER_PREFAB", void 0);
    __decorate([
        property(cc.Prefab)
    ], GodGuide.prototype, "TEXT_PREFAB", void 0);
    GodGuide = __decorate([
        ccclass
    ], GodGuide);
    return GodGuide;
}(cc.Component));
exports.default = GodGuide;

cc._RF.pop();