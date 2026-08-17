
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/GodGuide.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXEdvZEd1aWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsMkNBQTBDO0FBQzFDLHFDQUFvQztBQUNwQyxtREFBa0Q7QUFDbEQsMkNBQXVEO0FBSXZELDhGQUF5RjtBQUN6Rix5Q0FBb0M7QUFDcEMseUNBQXdDO0FBRXhDLElBQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUVqQyxJQUFZLFdBRVg7QUFGRCxXQUFZLFdBQVc7SUFDbkIseUNBQTBCLENBQUE7QUFDOUIsQ0FBQyxFQUZXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBRXRCO0FBRUQsU0FBUyxjQUFjLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNO0lBQ3BDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNsQixJQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDN0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0YsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFH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SSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxpQ0FBYyxHQUFyQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsZ0JBQWdCO0lBQ1QsNkJBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDL0MsMEJBQTBCO1FBQzFCLHlEQUF5RDtRQUN6RCxJQUFJO0lBQ1IsQ0FBQztJQXRpQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDWTtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNVO0lBdkJiLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0EyakI1QjtJQUFELGVBQUM7Q0EzakJELEFBMmpCQyxDQTNqQnFDLEVBQUUsQ0FBQyxTQUFTLEdBMmpCakQ7a0JBM2pCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG5pbXBvcnQgeyBHb2RDb21tYW5kIH0gZnJvbSBcIi4vR29kQ29tbWFuZFwiO1xuaW1wb3J0IHsgTG9jYXRvciB9IGZyb20gXCIuL0xvY2F0b3JcIjtcbmltcG9ydCB7IEd1aWRlQ29uZGl0aW9uIH0gZnJvbSBcIi4vR3VpZGVDb25kaXRpb25cIjtcbmltcG9ydCB7IEd1aWRlVXRpbHMsIEVHdWlkZVN0YXJ0IH0gZnJvbSBcIi4vR3VpZGVVdGlsc1wiO1xuaW1wb3J0IEdvZFRleHQgZnJvbSBcIi4vR29kVGV4dFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi9TY3JpcHQvQmFzZS9NYW5hZ2VyL0V2ZW50TWdyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi9TY3JpcHQvTG9naWMvRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IE1hcElzbGFuZFV0aWxzIGZyb20gXCIuLi9TY3JpcHQvTG9naWMvU2ltdWxhdGlvbk9wZXJhdGlvbi9WaWV3L01hcC9NYXBJc2xhbmRVdGlsc1wiO1xuaW1wb3J0IEdvZEZpbmdlciBmcm9tIFwiLi9Hb2RGaW5nZXJcIjtcbmltcG9ydCB7IEd1aWRlRGF0YSB9IGZyb20gXCIuL0d1aWRlRGF0YVwiO1xuXG5jb25zdCBSQURJQU4gPSAyICogTWF0aC5QSSAvIDM2MDtcblxuZXhwb3J0IGVudW0gRUd1aWRlRXZlbnQge1xuICAgIFN0b3AgPSBcIl9HdWlkZVN0b3BIYW5sZGVyXCIsXG59XG5cbmZ1bmN0aW9uIGdldFJvdGF0ZVBvaW50KHAsIGFuZ2xlLCBjZW50ZXIpIHtcbiAgICBsZXQgb3V0ID0gY2MudjIoKTtcbiAgICBsZXQgcmFkaWFuID0gLWFuZ2xlICogUkFESUFOO1xuICAgIG91dC54ID0gKHAueCAtIGNlbnRlci54KSAqIE1hdGguY29zKHJhZGlhbikgLSAocC55IC0gY2VudGVyLnkpICogTWF0aC5zaW4ocmFkaWFuKSArIGNlbnRlci54O1xuICAgIG91dC55ID0gKHAueCAtIGNlbnRlci54KSAqIE1hdGguc2luKHJhZGlhbikgKyAocC55IC0gY2VudGVyLnkpICogTWF0aC5jb3MocmFkaWFuKSArIGNlbnRlci55O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGdldFJlY3RSb3RhdGVQb2ludHMocmVjdCwgYW5nbGUsIHB0KSB7XG4gICAgbGV0IGFycmF5ID0gW1xuICAgICAgICBjYy52MihyZWN0LngsIHJlY3QueSksXG4gICAgICAgIGNjLnYyKHJlY3QueCArIHJlY3Qud2lkdGgsIHJlY3QueSksXG4gICAgICAgIGNjLnYyKHJlY3QueCArIHJlY3Qud2lkdGgsIHJlY3QueSArIHJlY3QuaGVpZ2h0KSxcbiAgICAgICAgY2MudjIocmVjdC54LCByZWN0LnkgKyByZWN0LmhlaWdodCksXG4gICAgXTtcbiAgICByZXR1cm4gYXJyYXkubWFwKHAgPT4gZ2V0Um90YXRlUG9pbnQocCwgYW5nbGUsIHB0KSk7XG59XG5cblxuZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRQb3NpdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdmFyIGxlZnRPZmZzZXQgPSB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnQ7XG4gICAgdmFyIHRvcE9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiBib3gubGVmdCArIGxlZnRPZmZzZXQsXG4gICAgICAgICAgICB0b3A6IGJveC50b3AgKyB0b3BPZmZzZXQsXG4gICAgICAgICAgICB3aWR0aDogYm94LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBib3guaGVpZ2h0XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnRPZmZzZXQsXG4gICAgICAgICAgICAgICAgdG9wOiB0b3BPZmZzZXQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGVsZW1lbnQud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBlbGVtZW50LmhlaWdodFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdE9mZnNldCxcbiAgICAgICAgICAgICAgICB0b3A6IHRvcE9mZnNldCxcbiAgICAgICAgICAgICAgICB3aWR0aDogcGFyc2VJbnQoZWxlbWVudC5zdHlsZS53aWR0aCksXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBwYXJzZUludChlbGVtZW50LnN0eWxlLmhlaWdodClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvdWNoU2ltdWxhdGlvbih4LCB5KSB7XG5cbiAgICBsZXQgcmVjdDtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBsZXQgaW5wdXRNYW5hZ2VyID0gd2luZG93Ll9jYyA/IHdpbmRvdy5fY2MuaW5wdXRNYW5hZ2VyIDogY2MuaW50ZXJuYWwuaW5wdXRNYW5hZ2VyXG4gICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiR2FtZUNhbnZhc1wiKTtcbiAgICAgICAgcmVjdCA9IGdldEhUTUxFbGVtZW50UG9zaXRpb24oY2FudmFzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZWN0ID0gY2Mudmlldy5nZXRGcmFtZVNpemUoKTtcbiAgICAgICAgcmVjdC5sZWZ0ID0gMDtcbiAgICAgICAgcmVjdC50b3AgPSAwO1xuICAgIH1cblxuICAgIGxldCB2cCA9IGNjLnZpZXcuZ2V0Vmlld3BvcnRSZWN0KCk7XG4gICAgbGV0IHN4ID0gY2Mudmlldy5nZXRTY2FsZVgoKTtcbiAgICBsZXQgc3kgPSBjYy52aWV3LmdldFNjYWxlWSgpO1xuICAgIGxldCByYXRpbyA9IGNjLnZpZXcuZ2V0RGV2aWNlUGl4ZWxSYXRpbygpO1xuICAgIGxldCBodG1seCA9ICh4ICogc3ggKyB2cC54KSAvIHJhdGlvICsgcmVjdC5sZWZ0O1xuICAgIGxldCBodG1seSA9IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgLSAoeSAqIHN5ICsgdnAueSkgLyByYXRpbztcbiAgICBsZXQgcHQgPSBjYy52MihodG1seCwgaHRtbHkpO1xuXG4gICAgY2MubG9nKGDmqKHmi5/ngrnlh7vlnZDmoIfvvJoke3B0Lnh9LCAke3B0Lnl9YCk7XG4gICAgbGV0IHRvdWNoID0gaW5wdXRNYW5hZ2VyLmdldFRvdWNoQnlYWShwdC54LCBwdC55LCByZWN0KTtcbiAgICBpbnB1dE1hbmFnZXIuaGFuZGxlVG91Y2hlc0JlZ2luKFt0b3VjaF0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpbnB1dE1hbmFnZXIuaGFuZGxlVG91Y2hlc0VuZChbdG91Y2hdKTtcbiAgICB9LCAyMDApO1xuXG4gICAgLy8gbGV0IGNsaWNrID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtcbiAgICAvLyBjbGljay5pbml0TW91c2VFdmVudChcIm1vdXNlZG93blwiLCB0cnVlLCB0cnVlLCB3aW5kb3csIDAsIDAsIDAsIHB0LngsIHB0LnksIHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgIC8vIGNhbnZhcy5kaXNwYXRjaEV2ZW50KGNsaWNrKTtcbiAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgbGV0IG1vdXNldXAgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG4gICAgLy8gICAgIG1vdXNldXAuaW5pdE1vdXNlRXZlbnQoXCJtb3VzZXVwXCIsIHRydWUsIHRydWUsIHdpbmRvdywgMCwgMCwgMCwgcHQueCwgcHQueSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG4gICAgLy8gICAgIGNhbnZhcy5kaXNwYXRjaEV2ZW50KG1vdXNldXApO1xuICAgIC8vIH0sIDUwMCk7XG59XG5leHBvcnQgaW50ZXJmYWNlIElUYXNrRGF0YSB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGRlYnVnOiBib29sZWFuLFxuICAgIGF1dG9ydW46IGJvb2xlYW4sXG4gICAgc3RlcHM6IElHdWlkZUNvbmZpZ1tdLFxuICAgIGZpbGVuYW1lOiBzdHJpbmcsXG59XG5leHBvcnQgaW50ZXJmYWNlIElHdWlkZUNvbW1hbmQge1xuICAgIGNtZDogc3RyaW5nLFxuICAgIGFyZ3M6IHN0cmluZyxcbiAgICByb2xlOiBudW1iZXIsXG4gICAgcG9zaXRpb25ZOiBudW1iZXIsXG4gICAgdHlwZTogc3RyaW5nLCAvL01hcEl0ZW0o5rW35bKb5Zyw5Zu+IOmcgOimgee8qeaUvikgTWFwVUko5rW35bKb5Zyw5Zu+VUkg5LiN6ZyA6KaB57yp5pS+KSBVSSjmma7pgJpVSSDml6DpnIDnibnmrorlpITnkIYpXG4gICAgaGlkZUZpbmdlcjogYm9vbGVhbiwgLy/mmK/lkKbmmL7npLpmaW5nZXJcbiAgICBtYXNrVHlwZTogbnVtYmVyLCAvLzE95L2/55SocmVjdFxufVxuZXhwb3J0IGludGVyZmFjZSBJR3VpZGVDb25maWcge1xuICAgIGd1aWRlSWQ6IG51bWJlcixcbiAgICBkZXNjOiBzdHJpbmcsXG4gICAgY29tbWFuZDogSUd1aWRlQ29tbWFuZCxcbiAgICBkZWxheVRpbWU6IG51bWJlcixcbiAgICBpZjogc3RyaW5nLFxuICAgIHBhcmFtOiBudW1iZXIsXG4gICAgb25TdGFydCxcbiAgICBvbkVuZCxcbiAgICBtYXNrOiBib29sZWFuLFxuICAgIG5vQ2hlY2tEb25lOiBib29sZWFuLCAgLy/kuI3mo4Dmn6XmmK/lkKbmraTmjIflvJXkuYvliY3op6blj5Eg5Y+q55yL5p2h5Lu25piv5ZCm5ruh6LazXG59XG5cbmNvbnN0IFRBRyA9IFwiR3VpZGVcIjtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29kR3VpZGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIC8vIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBfc2VsZWN0b3I6IHN0cmluZyA9ICcnO1xuICAgIGdldCBzZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0b3I7XG4gICAgfVxuICAgIHNldCBzZWxlY3Rvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdG9yID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZmluZCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgdHlwZToge1xuICAgICAgICBkZWZhdWx0OiBjYy5NYXNrLlR5cGUuUkVDVDtcbiAgICAgICAgdHlwZTogY2MuTWFzay5UeXBlO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgRklOR0VSX1BSRUZBQjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgVEVYVF9QUkVGQUI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBHb2RHdWlkZTogYW55O1xuICAgIF90YXJnZXROb2RlOiBjYy5Ob2RlO1xuICAgIF9maW5nZXI6IEdvZEZpbmdlcjtcbiAgICBfdGV4dDogY2MuTm9kZTtcbiAgICBfZGlhbG9ndWU6IGNjLk5vZGU7XG4gICAgX2RlYnVnTm9kZTogY2MuTm9kZTtcbiAgICBfYXV0b3J1bjogY2MuTGFiZWw7XG4gICAgX21hc2s6IGNjLk1hc2s7XG4gICAgX2Rpc3BhdGNoRXZlbnQ6IGFueTtcbiAgICBfdGFzazogSVRhc2tEYXRhO1xuICAgIF9yZWNvcmRTdGVwczogYW55W107XG4gICAgX2N1clN0ZXBDb25maWc6IElHdWlkZUNvbmZpZztcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuR29kR3VpZGUgPSB0aGlzO1xuICAgICAgICAvLyBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuTWFwLkd1aWRlTWFzaywgdGhpcy5vbkd1aWRlTWFzaywgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMub25HdWlkZU1hc2soZmFsc2UpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuTWFwLkd1aWRlTWFzaywgdGhpcy5vbkd1aWRlTWFzaywgdGhpcyk7XG4gICAgfVxuXG4gICAgdG91Y2hTaW11bGF0aW9uKG5vZGUpIHtcbiAgICAgICAgdGhpcy5sb2coJ+iHquWKqOaJp+ihjO+8jOaooeaLn+inpuaRuCcpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBjYy5sb2coJ+iHquWKqOiKgueCuSA6JywgSlNPTi5zdHJpbmdpZnkobm9kZS5wb3NpdGlvbikpO1xuICAgICAgICAgICAgbGV0IHAgPSBub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobm9kZS5wb3NpdGlvbik7XG4gICAgICAgICAgICBjYy5sb2coJ+S4lueVjOiKgueCuSA6JywgSlNPTi5zdHJpbmdpZnkocCkpO1xuICAgICAgICAgICAgdG91Y2hTaW11bGF0aW9uKHAueCwgcC55KTtcbiAgICAgICAgfSwgMSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGNjLndpblNpemUpO1xuICAgICAgICAvL+WIm+W7uuaJi+aMh+aPkOekulxuICAgICAgICB0aGlzLl90YXJnZXROb2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuRklOR0VSX1BSRUZBQikge1xuICAgICAgICAgICAgbGV0IG5vZGVGaW5nZXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkZJTkdFUl9QUkVGQUIpO1xuICAgICAgICAgICAgbm9kZUZpbmdlci5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlRmluZ2VyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZmluZ2VyID0gbm9kZUZpbmdlci5nZXRDb21wb25lbnQoR29kRmluZ2VyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Yib5bu65paH5pys5o+Q56S6XG4gICAgICAgIGlmICh0aGlzLlRFWFRfUFJFRkFCKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5URVhUX1BSRUZBQik7XG4gICAgICAgICAgICB0aGlzLl90ZXh0LnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL+iwg+ivleW3peWFt+eVjOmdolxuICAgICAgICB0aGlzLl9kZWJ1Z05vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2RlYnVnJyk7XG5cbiAgICAgICAgLy/oh6rliqjlvJXlr7zliIfmjaJcbiAgICAgICAgdGhpcy5fYXV0b3J1biA9IGNjLmZpbmQoJ2F1dG9ydW4vQmFja2dyb3VuZC9MYWJlbCcsIHRoaXMuX2RlYnVnTm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgdGhpcy5fYXV0b3J1bi5zdHJpbmcgPSBg6Ieq5Yqo5omn6KGM77yI5YWz77yJYDtcblxuXG4gICAgICAgIC8v6I635Y+W6YGu572p57uE5Lu2IFxuICAgICAgICB0aGlzLl9tYXNrID0gdGhpcy5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTWFzayk7XG4gICAgICAgIHRoaXMuX21hc2suaW52ZXJ0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tYXNrLm5vZGUuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy/nm5HlkKzkuovku7ZcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgLy/lvZXliLbkuK3vvIzmlL7ooYxcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXNwYXRjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlW1wiX3RvdWNoTGlzdGVuZXJcIl0uc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/mlL7ooYxcbiAgICAgICAgICAgIGlmICghdGhpcy5fbWFzay5ub2RlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZVtcIl90b3VjaExpc3RlbmVyXCJdLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v55uu5qCH6IqC54K55LiN5a2Y5Zyo77yM5oum5oiqXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3RhcmdldE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVbXCJfdG91Y2hMaXN0ZW5lclwiXS5zZXRTd2FsbG93VG91Y2hlcyh0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v55uu5qCH5Yy65Z+f5a2Y5Zyo77yM5Ye75Lit5pS+6KGMXG4gICAgICAgICAgICBsZXQgcmVjdFBvcyA9IE1hcElzbGFuZFV0aWxzLmNvbnZlcnRNYXBJdGVtUG9zaXRpb24odGhpcy5fdGFyZ2V0Tm9kZSwgdGhpcy5fY3VyU3RlcENvbmZpZyk7XG4gICAgICAgICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IHRoaXMuX3RhcmdldE5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7O1xuICAgICAgICAgICAgaWYgKHJlY3RQb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCBjb21tYW5kID0gdGhpcy5fY3VyU3RlcENvbmZpZy5jb21tYW5kO1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kICYmIGNvbW1hbmQudHlwZSAmJiBjb21tYW5kLnR5cGUgPT0gXCJNYXBVSVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY3RQb3MgPSByZWN0Lm9yaWdpbi5zdWIoTWFwSXNsYW5kVXRpbHMubWFwQ2FtZXJhLm5vZGUucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2FtZXJhUG9zID0gTWFwSXNsYW5kVXRpbHMubWFwQ2FtZXJhLm5vZGUucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdSZWN0ID0gY2MucmVjdChyZWN0LnggLSBjYW1lcmFQb3MueCwgcmVjdC55IC0gY2FtZXJhUG9zLnksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIHJlY3QgPSBuZXdSZWN0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhdmFucyA9IGNjLmZpbmQoXCJDYW52YXNcIik7XG4gICAgICAgICAgICAgICAgcmVjdFBvcyA9IGNhdmFucy5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocmVjdFBvcyk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1JlY3QgPSBjYy5yZWN0KHJlY3RQb3MueCAtIHJlY3Qud2lkdGggLyAyLCByZWN0UG9zLnkgLSByZWN0LmhlaWdodCAvIDIsIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICByZWN0ID0gbmV3UmVjdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlY3QuY29udGFpbnMoZXZlbnQuZ2V0TG9jYXRpb24oKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVbXCJfdG91Y2hMaXN0ZW5lclwiXS5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2MubG9nKCflkb3kuK3nm67moIfoioLngrnvvIzmlL7ooYwnKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl90YXJnZXROb2RlLmVtaXQoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZVtcIl90b3VjaExpc3RlbmVyXCJdLnNldFN3YWxsb3dUb3VjaGVzKHRydWUpO1xuICAgICAgICAgICAgICAgIGNjLmxvZygn5pyq5ZG95Lit55uu5qCH6IqC54K577yM5oum5oiqJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIGNjLmRlYnVnLnNldERpc3BsYXlTdGF0cyhmYWxzZSk7XG4gICAgfVxuXG4gICAgc2V0VGFzayh0YXNrKSB7XG4gICAgICAgIGlmICh0aGlzLl90YXNrKSB7XG4gICAgICAgICAgICBjYy53YXJuKCflvZPliY3ku7vliqHov5jmnKrlpITnkIblrozmr5XvvIEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RlYnVnTm9kZS5hY3RpdmUgPSAhIXRhc2suZGVidWc7XG4gICAgICAgIHRoaXMuX2F1dG9ydW4uc3RyaW5nID0gYOiHquWKqOaJp+ihjCgke3Rhc2suYXV0b3J1biA/ICflvIAnIDogJ+WFsyd9KWA7XG4gICAgICAgIHRoaXMuX3Rhc2sgPSB0YXNrO1xuICAgIH1cblxuICAgIGdldFRhc2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YXNrO1xuICAgIH1cblxuICAgIHJ1bihjYWxsYmFjaz8pIHtcbiAgICAgICAgaWYgKCF0aGlzLl90YXNrKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS53YXJuKFRBRywgJ3RoaXMuX3Rhc2suc3RlcHMtLS0tLS0tLS0tPicsIHRoaXMuX3Rhc2suc3RlcHMpO1xuICAgICAgICBhc3luYy5lYWNoU2VyaWVzKHRoaXMuX3Rhc2suc3RlcHMsIChzdGVwLCBjYikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY3VyU3RlcENvbmZpZyA9IHN0ZXA7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzU3RlcChzdGVwLCBjYik7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgR3VpZGVVdGlscy5sb2dFcnJvcihUQUcsIHRoaXMuX2N1clN0ZXBDb25maWcuZ3VpZGVJZCwgXCJydW4gZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBHdWlkZVV0aWxzLmxvZ0Vycm9yKFwi5byV5a+86aG65Yip5a6M5oiQXCIsIHRoaXMuX3Rhc2suZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Rhc2sgJiYgR3VpZGVEYXRhLnB1c2hGaW5pc2hlZFRhc2sodGhpcy5fdGFzay5maWxlbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90YXNrID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2N1clN0ZXBDb25maWcgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbWFzay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Zpbmdlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zpbmdlci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9wcm9jZXNzU3RlcChzdGVwOiBJR3VpZGVDb25maWcsIGNhbGxiYWNrKSB7XG4gICAgICAgIEd1aWRlVXRpbHMubG9nRXJyb3IoVEFHLCBcIiDlvIDlp4vmiafooYwgXCIsIHN0ZXAuZ3VpZGVJZCk7XG4gICAgICAgIGFzeW5jLnNlcmllcyh7XG4gICAgICAgICAgICAvL+S7u+WKoeW8gOWni1xuICAgICAgICAgICAgc3RlcFN0YXJ0KGNiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAub25TdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKCFHdWlkZVV0aWxzLmNoZWNrR3VpZGVEb25lKHN0ZXAuZ3VpZGVJZCkgfHwgISFzdGVwLm5vQ2hlY2tEb25lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgR3VpZGVVdGlscy5sb2dFcnJvcihUQUcsIFwiIG9uU3RhcnQgXCIsIHN0ZXAuZ3VpZGVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwLm9uU3RhcnQoKGVycikgPT4geyBjYihlcnIsIG51bGwpIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy/ku7vliqHmjIfku6RcbiAgICAgICAgICAgIHN0ZXBDb21tYW5kOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyU3RvcChjYik7XG4gICAgICAgICAgICAgICAgR3VpZGVVdGlscy5sb2dFcnJvcihUQUcsIFwiIHN0ZXBDb21tYW5kIFwiLCBzdGVwLmd1aWRlSWQpO1xuICAgICAgICAgICAgICAgIGxldCBjbWQgPSBHb2RDb21tYW5kW3N0ZXAuY29tbWFuZC5jbWRdO1xuICAgICAgICAgICAgICAgIGxldCBndWlkZUlkID0gR3VpZGVVdGlscy5jdXJHdWlkZUlkID0gc3RlcC5ndWlkZUlkO1xuICAgICAgICAgICAgICAgIGlmIChjbWQgJiYgKCFHdWlkZVV0aWxzLmNoZWNrR3VpZGVEb25lKGd1aWRlSWQpIHx8ICEhc3RlcC5ub0NoZWNrRG9uZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEd1aWRlQ29uZGl0aW9uLmNoZWNrQ29uZGl0aW9uKHN0ZXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc1N0ZXBDb21tYW5kKHN0ZXAsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihlcnJvciwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBzdGVwLmRlbGF5VGltZSB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKEVHdWlkZVN0YXJ0LkNvbmRpdGlvbk5vdFJlYWNoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKGDmiafooYzmraXpqqTjgJAke2d1aWRlSWR944CR5oyH5LukIOi3s+i/h++8gWAsIHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL+S7u+WKoee7k+adn1xuICAgICAgICAgICAgdGFza0VuZDogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgR3VpZGVVdGlscy5sb2dFcnJvcihUQUcsIFwiIHRhc2tFbmQgXCIsIHN0ZXAuZ3VpZGVJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFza1snX2dyYXBoaWNzJ10gJiYgdGhpcy5fbWFza1snX2dyYXBoaWNzJ10uY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLm5vZGUuc2V0Q29udGVudFNpemUoMCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluZ2VyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zpbmdlci5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5vbkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKCFHdWlkZVV0aWxzLmNoZWNrR3VpZGVEb25lKHN0ZXAuZ3VpZGVJZCkgfHwgISFzdGVwLm5vQ2hlY2tEb25lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcC5vbkVuZCgoZXJyKSA9PiB7IGNiKGVyciwgbnVsbCkgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBHdWlkZVV0aWxzLmN1ckd1aWRlSWQgPSAtMTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy51bnJlZ2lzdGVyU3RvcCgpO1xuXG4gICAgICAgICAgICBHdWlkZVV0aWxzLmxvZ0Vycm9yKFRBRywgYOatpemqpOOAkCR7c3RlcC5ndWlkZUlkfeOAkee7k+adn++8gSBlcnJvcjpgICsgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKEd1aWRlVXRpbHMuc3RvcEd1aWRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckd1aWRlKCk7XG4gICAgICAgICAgICAgICAgR3VpZGVVdGlscy5sb2dFcnJvcihcIuaJi+WKqOWBnOatouW8leWvvFwiKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IgIT0gRUd1aWRlU3RhcnQuTm9uZSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciA9PSBFR3VpZGVTdGFydC5Db25kaXRpb25Ob3RSZWFjaCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXNrICYmIEd1aWRlRGF0YS5wdXNoTm9Db25kaXRpb25UYXNrKHRoaXMuX3Rhc2suZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IgPT0gRUd1aWRlU3RhcnQuU3RvcCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBHdWlkZVV0aWxzLmRvbmVHdWlkZUlkID0gc3RlcC5ndWlkZUlkO1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiYvmjIfliqjnlLtcbiAgICAgKi9cbiAgICBmaW5nZXJUb05vZGUobm9kZSwgY2IpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9maW5nZXIpIHtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1clN0ZXBDb25maWcgPSB0aGlzLl9jdXJTdGVwQ29uZmlnO1xuICAgICAgICBpZiAoY3VyU3RlcENvbmZpZyAmJiBjdXJTdGVwQ29uZmlnLmNvbW1hbmQgJiYgY3VyU3RlcENvbmZpZy5jb21tYW5kLmhpZGVGaW5nZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zpbmdlci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmluZ2VyLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgbGV0IHJlY3RQb3MgPSBNYXBJc2xhbmRVdGlscy5jb252ZXJ0TWFwSXRlbVBvc2l0aW9uKG5vZGUsIGN1clN0ZXBDb25maWcpO1xuICAgICAgICBpZiAocmVjdFBvcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgY29tbWFuZCA9IGN1clN0ZXBDb25maWcuY29tbWFuZDtcbiAgICAgICAgICAgIHJlY3RQb3MgPSBub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobm9kZS5wb3NpdGlvbikgLy9yZWN0Lm9yaWdpbjtcblxuICAgICAgICAgICAgaWYgKGNvbW1hbmQgJiYgY29tbWFuZC50eXBlICYmIGNvbW1hbmQudHlwZSA9PSBcIk1hcFVJXCIpIHtcbiAgICAgICAgICAgICAgICByZWN0UG9zID0gcmVjdFBvcy5zdWIoTWFwSXNsYW5kVXRpbHMubWFwQ2FtZXJhLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY2F2YW5zID0gY2MuZmluZChcIkNhbnZhc1wiKTtcbiAgICAgICAgICAgIHJlY3RQb3MgPSBjYXZhbnMuY29udmVydFRvV29ybGRTcGFjZUFSKHJlY3RQb3MpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHJlY3RQb3MpO1xuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IDAuNiAqIHAuc3ViKHRoaXMuX2Zpbmdlci5ub2RlLmdldFBvc2l0aW9uKCkpLm1hZygpIC8gY2Mud2luU2l6ZS5oZWlnaHQ7XG4gICAgICAgIGxldCBtb3ZlVG8gPSBjYy5tb3ZlVG8oZHVyYXRpb24sIHApO1xuICAgICAgICBsZXQgY2FsbEZ1bmMgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgdGhpcy5fZmluZ2VyLmRvRmluZ2VyKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGxldCBzZXF1bmNlID0gY2Muc2VxdWVuY2UobW92ZVRvLCBjYWxsRnVuYyk7XG4gICAgICAgIHRoaXMuX2Zpbmdlci5ub2RlLnJ1bkFjdGlvbihzZXF1bmNlKTtcbiAgICB9XG5cbiAgICBsb2coLi4udGV4dCkge1xuICAgICAgICBpZiAodGhpcy5fdGFzayAmJiB0aGlzLl90YXNrLmRlYnVnKSB7XG4gICAgICAgICAgICBHdWlkZVV0aWxzLmxvZ0Vycm9yKHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSE55CG5q2l6aqk5oyH5LukXG4gICAgICogQHBhcmFtIHsqfSBzdGVwIFxuICAgICAqIEBwYXJhbSB7Kn0gY2IgXG4gICAgICovXG4gICAgX3Byb2Nlc3NTdGVwQ29tbWFuZChzdGVwOiBJR3VpZGVDb25maWcsIGNiKSB7XG4gICAgICAgIGxldCBjbWQgPSBHb2RDb21tYW5kW3N0ZXAuY29tbWFuZC5jbWRdO1xuICAgICAgICBsZXQgZ3VpZGVJZCA9IHN0ZXAuZ3VpZGVJZDtcbiAgICAgICAgLy8gaWYgKGNtZCAmJiAoIUd1aWRlVXRpbHMuY2hlY2tHdWlkZURvbmUoZ3VpZGVJZCkgfHwgISFzdGVwLm5vQ2hlY2tEb25lKSkge1xuICAgICAgICAvLyAgICAgaWYgKEd1aWRlQ29uZGl0aW9uLmNoZWNrQ29uZGl0aW9uKHN0ZXApKSB7XG4gICAgICAgIHRoaXMubG9nKGDmiafooYzmraXpqqTjgJAke2d1aWRlSWR944CR5oyH5LukYCk7XG4gICAgICAgIHRoaXMuX21hc2subm9kZS5hY3RpdmUgPSBzdGVwLm1hc2sgIT0gdW5kZWZpbmVkID8gc3RlcC5tYXNrIDogdHJ1ZTtcbiAgICAgICAgY21kKHRoaXMsIHN0ZXAsICgpID0+IHtcbiAgICAgICAgICAgIC8vIEd1aWRlVXRpbHMuZG9uZUd1aWRlSWQgPSBzdGVwLmd1aWRlSWQ7XG4gICAgICAgICAgICB0aGlzLmxvZyhg5q2l6aqk44CQJHtndWlkZUlkfeOAkeaMh+S7pCDmiafooYzlrozmr5VgKTtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmxvZyhg5omn6KGM5q2l6aqk44CQJHtndWlkZUlkfeOAkeaMh+S7pCDkuI3mu6HotrPmnaHku7ZgLCBzdGVwKTtcbiAgICAgICAgLy8gICAgICAgICBjYihFR3VpZGVTdGFydC5Db25kaXRpb25Ob3RSZWFjaCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhg5omn6KGM5q2l6aqk44CQJHtndWlkZUlkfeOAkeaMh+S7pCDot7Pov4fvvIFgLCBzdGVwKTtcbiAgICAgICAgLy8gICAgIGNiKCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBmaW5kKHZhbHVlLCBjYj8pIHtcbiAgICAgICAgLy8gbGV0IHJvb3QgPSBjYy5maW5kKCdDYW52YXMnKTtcbiAgICAgICAgbGV0IFtyb290LCB2YWx1ZTFdID0gdGhpcy5maW5kUm9vdCh2YWx1ZSk7XG4gICAgICAgIExvY2F0b3IubG9jYXRlTm9kZShyb290LCB2YWx1ZTEsIChlcnJvciwgbm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmxvZygn5a6a5L2N6IqC54K55oiQ5YqfJyk7XG4gICAgICAgICAgICBsZXQgcmVjdCA9IHRoaXMuX2ZvY3VzVG9Ob2RlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGNiICYmIHJlY3QpIHtcbiAgICAgICAgICAgICAgICBjYihub2RlLCByZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/lnKhzY2VuZeeahOS4iuWxguiKgueCueWOu+Wvu+aJvlxuICAgIGZpbmRSb290KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoXCI6XCIpICE9IC0xKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gdmFsdWUuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgcmV0dXJuIFtjYy5maW5kKGFyclswXSksIGFyclsxXV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtjYy5maW5kKFwiQ2FudmFzXCIpLCB2YWx1ZV07XG4gICAgfVxuXG4gICAgbG9jYXRlTm9kZUJ5RXZlbnQoc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdG9yID0gc2VuZGVyLnN0cmluZztcbiAgICB9XG5cbiAgICBnZXROb2RlUG9pbnRzKHJlY3QsIGFuZ2xlLCBwdCkge1xuICAgICAgICByZXR1cm4gZ2V0UmVjdFJvdGF0ZVBvaW50cyhyZWN0LCBhbmdsZSwgcHQpLm1hcChwID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZm9jdXNUb05vZGUobm9kZTogY2MuTm9kZSk6IGNjLlJlY3Qge1xuICAgICAgICAvLyB0aGlzLl9tYXNrWydfZ3JhcGhpY3MnXS5jbGVhcigpO1xuICAgICAgICBpZiAoIXRoaXMuX2N1clN0ZXBDb25maWcpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgcmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7XG4gICAgICAgIGxldCByZWN0UG9zID0gTWFwSXNsYW5kVXRpbHMuY29udmVydE1hcEl0ZW1Qb3NpdGlvbihub2RlLCB0aGlzLl9jdXJTdGVwQ29uZmlnKTtcbiAgICAgICAgaWYgKHJlY3RQb3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IGNvbW1hbmQgPSB0aGlzLl9jdXJTdGVwQ29uZmlnLmNvbW1hbmQ7XG4gICAgICAgICAgICBpZiAoY29tbWFuZCAmJiBjb21tYW5kLnR5cGUgJiYgY29tbWFuZC50eXBlID09IFwiTWFwVUlcIikge1xuICAgICAgICAgICAgICAgIHJlY3RQb3MgPSByZWN0Lm9yaWdpbi5zdWIoTWFwSXNsYW5kVXRpbHMubWFwQ2FtZXJhLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY3RQb3MgPSByZWN0Lm9yaWdpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBjYy5maW5kKFwiQ2FudmFzXCIpO1xuICAgICAgICAgICAgcmVjdFBvcyA9IGNhbnZhcy5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocmVjdFBvcyk7XG4gICAgICAgICAgICByZWN0UG9zLnggLT0gcmVjdC53aWR0aCAvIDI7XG4gICAgICAgICAgICByZWN0UG9zLnkgLT0gcmVjdC5oZWlnaHQgLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHAgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocmVjdFBvcyk7XG4gICAgICAgIHJlY3QueCA9IHAueDtcbiAgICAgICAgcmVjdC55ID0gcC55O1xuXG4gICAgICAgIGlmICh0aGlzLl9jdXJTdGVwQ29uZmlnLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuX21hc2suc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbWFza1snX2dyYXBoaWNzJ10gJiYgdGhpcy5fbWFza1snX2dyYXBoaWNzJ10uY2xlYXIodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl9tYXNrLm5vZGUuc2V0Q29udGVudFNpemUoMCwgMCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJTdGVwQ29uZmlnLmNvbW1hbmQubWFza1R5cGUgJiYgdGhpcy5fY3VyU3RlcENvbmZpZy5jb21tYW5kLm1hc2tUeXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9tYXNrWydfZ3JhcGhpY3MnXS5jbGVhcih0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLnR5cGUgPSBjYy5NYXNrLlR5cGUuUkVDVDtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLm5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgMCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hc2tbJ19ncmFwaGljcyddLmZpbGxSZWN0KHJlY3QueCwgcmVjdC55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBtYXNrU3AgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpIHx8IG5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgIGlmIChtYXNrU3ApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fbWFza1snX2dyYXBoaWNzJ10uY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGVTY2FsZSA9IDE7Ly9tYXNrU3Aubm9kZS5zY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFzay50eXBlID0gY2MuTWFzay5UeXBlLklNQUdFX1NURU5DSUw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hc2suc3ByaXRlRnJhbWUgPSBtYXNrU3Auc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hc2suYWxwaGFUaHJlc2hvbGQgPSAwLjc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hc2subm9kZS5zZXRDb250ZW50U2l6ZShub2RlLndpZHRoICogbm9kZVNjYWxlLCBub2RlLmhlaWdodCAqIG5vZGVTY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIHAueCArPSByZWN0LndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgcC55ICs9IHJlY3QuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFzay5ub2RlLnNldFBvc2l0aW9uKHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluiKgueCueWFqOi3r+W+hFxuICAgICAqIEBwYXJhbSB7Kn0gbm9kZSBcbiAgICAgKi9cbiAgICBnZXROb2RlRnVsbFBhdGgobm9kZSkge1xuICAgICAgICBsZXQgYXJyYXkgPSBbXTtcbiAgICAgICAgbGV0IHRlbXAgPSBub2RlO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBhcnJheS51bnNoaWZ0KHRlbXAubmFtZSk7XG4gICAgICAgICAgICB0ZW1wID0gdGVtcC5wYXJlbnQ7XG4gICAgICAgIH0gd2hpbGUgKHRlbXAgJiYgdGVtcC5uYW1lICE9PSAnQ2FudmFzJylcbiAgICAgICAgcmV0dXJuIGFycmF5LmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbkuLrlvJXlr7zlsYLoioLngrlcbiAgICAgKiBAcGFyYW0geyp9IG5vZGUgXG4gICAgICovXG4gICAgaXNHdWlkZU5vZGUobm9kZSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGxldCB0ZW1wID0gbm9kZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHRlbXAgPT09IHRoaXMubm9kZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRlbXAgPSB0ZW1wLnBhcmVudClcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW9leWItuiKgueCueinpuaRuFxuICAgICAqL1xuICAgIHN0YXJ0UmVjb3JkTm9kZVRvdWNoKCkge1xuICAgICAgICBpZiAodGhpcy5fdGFzaykge1xuICAgICAgICAgICAgY2Mud2Fybihg5Lu75Yqh5byV5a+85Lit77yM5LiN6IO95b2V5Yi2YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGlzcGF0Y2hFdmVudCkge1xuICAgICAgICAgICAgY2Mud2Fybign5bey57uP6L+b5YWl5b2V5Yi25qih5byPJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL+e8k+WtmOW8leaTjuWOn+eUn+inpuaRuOa0vuWPkeWHveaVsFxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50ID0gY2MuTm9kZS5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudDtcbiAgICAgICAgdGhpcy5fcmVjb3JkU3RlcHMgPSBbXTtcblxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgLy9Ib29r6IqC54K55LqL5Lu25rS+5Y+R5Ye95pWwXG4gICAgICAgIGNjLk5vZGUucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8v5omn6KGM5byV5pOO5Y6f55Sf6Kem5pG45rS+5Y+R5Ye95pWwXG4gICAgICAgICAgICBzZWxmLl9kaXNwYXRjaEV2ZW50LmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICAgICAgLy/ov4fmu6TmjonlvJXlr7zoioLngrnkuIrnmoTkuovku7bvvIxcbiAgICAgICAgICAgIGlmIChzZWxmLmlzR3VpZGVOb2RlKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/ku4XnvJPlrZjlr7noioLngrnnmoRUb3VjaEVuZOaTjeS9nFxuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCkge1xuICAgICAgICAgICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9IChub3cgLSB0aW1lKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgdGltZSA9IG5vdztcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IHNlbGYuZ2V0Tm9kZUZ1bGxQYXRoKHRoaXMpO1xuICAgICAgICAgICAgICAgIHNlbGYuX3JlY29yZFN0ZXBzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBkZXNjOiBg54K55Ye7JHthcmdzfWAsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiAnZmluZ2VyJywgYXJncyB9LFxuICAgICAgICAgICAgICAgICAgICBkZWxheSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWBnOatouiKgueCueinpuaRuOW9leWItlxuICAgICAqL1xuICAgIHN0b3BSZWNvcmROb2RlVG91Y2goKSB7XG4gICAgICAgIGlmICh0aGlzLl9kaXNwYXRjaEV2ZW50KSB7XG4gICAgICAgICAgICBjYy5Ob2RlLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gdGhpcy5fZGlzcGF0Y2hFdmVudDtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQgPSBudWxsO1xuICAgICAgICAgICAgY2Mud2Fybign6YCA5Ye65b2V5Yi254q25oCBJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy53YXJuKCfmnKrov5vlhaXlvZXliLbnirbmgIEnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWbnuaUvuW9leWItlxuICAgICAqL1xuICAgIHBsYXlSZWNvcmROb2RlVG91Y2goc2VuZGVyLCBhdXRvcnVuKSB7XG4gICAgICAgIHRoaXMuc3RvcFJlY29yZE5vZGVUb3VjaCgpO1xuICAgICAgICBpZiAodGhpcy5fcmVjb3JkU3RlcHMgJiYgdGhpcy5fcmVjb3JkU3RlcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYy5sb2coJ+eUn+aIkOS7u+WKoe+8micsIEpTT04uc3RyaW5naWZ5KHRoaXMuX3JlY29yZFN0ZXBzKSk7XG4gICAgICAgICAgICBsZXQgdGFzayA9IHtcbiAgICAgICAgICAgICAgICBhdXRvcnVuOiAhIWF1dG9ydW4sXG4gICAgICAgICAgICAgICAgZGVidWc6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RlcHM6IHRoaXMuX3JlY29yZFN0ZXBzLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVjb3JkU3RlcHMgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zZXRUYXNrKHRhc2spO1xuICAgICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5pi+56S65paH5pysXG4gICAgc2hvd1RleHQodGV4dCwgcm9sZSwgcG9zaXRpb25ZLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl90ZXh0Lm9uY2UoJ2NsaWNrJywgY2FsbGJhY2spO1xuICAgICAgICBsZXQgZ29kVGV4dCA9IHRoaXMuX3RleHQuZ2V0Q29tcG9uZW50KHRoaXMuVEVYVF9QUkVGQUIubmFtZSkgYXMgR29kVGV4dDtcbiAgICAgICAgZ29kVGV4dC5zZXRUZXh0KHRleHQsIHJvbGUsIHBvc2l0aW9uWSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHNldEF1dG9ydW4oKSB7XG4gICAgICAgIGlmICh0aGlzLl90YXNrKSB7XG4gICAgICAgICAgICB0aGlzLl90YXNrLmF1dG9ydW4gPSAhdGhpcy5fdGFzay5hdXRvcnVuO1xuICAgICAgICAgICAgdGhpcy5fYXV0b3J1bi5zdHJpbmcgPSBg6Ieq5Yqo5omn6KGMKCR7dGhpcy5fdGFzay5hdXRvcnVuID8gJ+W8gCcgOiAn5YWzJ30pYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy/ms6jlhozlj6/og73miYvliqjmmoLlgZzlvJXlr7znmoTkuovku7ZcbiAgICBwdWJsaWMgcmVnaXN0ZXJTdG9wKG5leHQpIHtcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyU3RvcCgpO1xuICAgICAgICB0aGlzLm5vZGUub25jZShFR3VpZGVFdmVudC5TdG9wLCAoKSA9PiB7XG4gICAgICAgICAgICBuZXh0ICYmIG5leHQoXCLlvLrliLblgZzmraLkuoZcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1bnJlZ2lzdGVyU3RvcCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihFR3VpZGVFdmVudC5TdG9wKTtcbiAgICB9XG5cbiAgICAvL+a4heeQhuW8leWvvOS4iueahOaWh+Wtl+OAgemBrue9qeOAgeaJi+aMh1xuICAgIHB1YmxpYyBjbGVhckd1aWRlKCkge1xuICAgICAgICB0aGlzLl90ZXh0ICYmICh0aGlzLl90ZXh0LmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgdGhpcy5fZmluZ2VyICYmICh0aGlzLl9maW5nZXIuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICB0aGlzLl9tYXNrICYmICh0aGlzLl9tYXNrLm5vZGUuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICAvLyBpZiAodGhpcy5fdGFyZ2V0Tm9kZSkge1xuICAgICAgICAvLyAgICAgdGhpcy5fdGFyZ2V0Tm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbn1cbiJdfQ==