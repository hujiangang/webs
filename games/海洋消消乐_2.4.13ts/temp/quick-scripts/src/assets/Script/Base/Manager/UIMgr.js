"use strict";
cc._RF.push(module, 'dda066VFIdLt518AC6oE6rq', 'UIMgr');
// Script/Base/Manager/UIMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIBase_1 = require("../UI/UIBase");
var UIData_1 = require("../../Logic/Data/Interface/UIData");
var Log_1 = require("../Utils/Log");
var LRUCache_1 = require("../Utils/LRUCache");
var EventMgr_1 = require("./EventMgr");
var BaseConst_1 = require("../BaseConst");
var Event_1 = require("../../Logic/Data/Const/Event");
var UIMgr = /** @class */ (function () {
    function UIMgr() {
        var _this = this;
        this.uiMap = new Map();
        this.uiData = UIData_1.default;
        this.prefabRoot = 'prefab/ui/';
        this.isOpening = false;
        this.lru = new LRUCache_1.LRUCache(5); //内存中存在的UI面板数的警告值
        this.uiRoot = new cc.Node('UIRoot');
        this.uiRoot.x = cc.winSize.width / 2;
        this.uiRoot.y = cc.winSize.height / 2;
        this.uiRoot.width = cc.winSize.width;
        this.uiRoot.height = cc.winSize.height;
        cc.game.addPersistRootNode(this.uiRoot);
        var widget = this.uiRoot.addComponent(cc.Widget);
        widget.alignMode = cc.Widget.AlignMode.ALWAYS;
        widget.bottom = widget.top = widget.left = widget.right = 0;
        this.blackBg = new cc.Node('BlackBg');
        this.blackBg.active = false;
        this.blackBg.setContentSize(cc.winSize);
        var graphics = this.blackBg.addComponent(cc.Graphics);
        graphics.rect(-cc.winSize.width / 2, -cc.winSize.height / 2, 2 * cc.winSize.width, 2 * cc.winSize.height);
        graphics.fillColor = cc.color(0, 0, 0, 180);
        graphics.fill();
        this.uiRoot.addChild(this.blackBg);
        this.blackBg.addComponent(cc.BlockInputEvents);
        this.blackBg.on(cc.Node.EventType.TOUCH_END, function (event) {
            _this.uiMap.forEach(function (ui, uiHudDef) {
                if (_this.isShowing(uiHudDef)) {
                    if (!_this.isOpening && !ui.node.getBoundingBoxToWorld().contains(event.getLocationInView())) {
                        _this.blackBgOnClick(uiHudDef);
                    }
                }
            });
        });
        EventMgr_1.default.ins.register(Event_1.Event.System.CacheWarning, this.closeOld, this);
        EventMgr_1.default.ins.register(BaseConst_1.PlatformEvenType.OnMemoryWarning, this.closeOld, this);
    }
    Object.defineProperty(UIMgr, "ins", {
        get: function () {
            if (this.instance == null) {
                this.instance = new UIMgr();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    // 内存使用过多时关掉部分界面
    UIMgr.prototype.closeOld = function () {
        if (this.lru.oldNode && !this.isShowing(this.lru.oldNode.key)) {
            var uiData = this.uiData.get(this.lru.oldNode.key);
            if (uiData && !uiData.hold) {
                // console.warn('Waring.. 收到内存警告!!!!! 但是我把他关了!');
                // this.closeUI(this.lru.oldNode.key, true);
            }
        }
    };
    UIMgr.prototype.blackBgOnClick = function (type) {
        var def = this.uiData.get(type);
        if (def && def.autoClose) {
            this.hideUI(type);
        }
    };
    UIMgr.prototype.openUI = function (uiHudDef, args, callback, closeCallback) {
        var _this = this;
        this.isOpening = true;
        var uiData = this.uiData.get(uiHudDef);
        // console.error("openUI", uiHudDef);
        if (this.hasUI(uiHudDef)) {
            Log_1.Log.error("OpenUI 1: ui " + UIData_1.UIHudDef[uiHudDef] + " is already exist, please check");
            this.isOpening = false;
            return;
        }
        var path = this.prefabRoot + uiData.prefabPath;
        cc.loader.loadRes(path, function (error, prefab) {
            if (error) {
                Log_1.Log.error("OpenUI: load ui error: " + error);
                _this.isOpening = false;
                return;
            }
            if (_this.hasUI(uiHudDef)) {
                Log_1.Log.error("OpenUI 2: ui " + UIData_1.UIHudDef[uiHudDef] + " is already exist, please check");
                _this.isOpening = false;
                return;
            }
            var uiNode = cc.instantiate(prefab);
            var ui = uiNode.getComponent(UIBase_1.default);
            if (!ui) {
                Log_1.Log.error(path + "\u6CA1\u6709\u7ED1\u5B9AUI\u811A\u672C!!!");
                _this.isOpening = false;
                return;
            }
            ui.init(args);
            ui.uiHudDef = uiHudDef;
            uiNode.opacity = 0;
            uiNode.parent = _this.uiRoot;
            uiNode.zIndex = uiData.viewZOrder;
            uiNode.active = true;
            _this.show(ui, uiHudDef, closeCallback);
            _this.uiMap.set(uiHudDef, ui);
            callback && callback(ui);
            var remove = _this.lru.pack(uiHudDef, ui);
            if (remove && !_this.isShowing(remove.key)) {
                _this.closeUI(remove.key, true);
            }
        });
    };
    /**
     * 这里是个巨坑!  by tt .....  后期看需要怎么优化吧!
     * 清除依赖资源
     * @param prefabUrl
     */
    UIMgr.prototype.clearDependsRes = function (prefabUrl) {
        var deps = cc.loader.getDependsRecursively(prefabUrl);
        // Log.log(`UIMng clearDependsRes: release ${prefabUrl} depends resources `, deps);
        deps.forEach(function (item) {
            // todo：排除公共资源，然后清理
            // if (item.indexOf('common') === -1) {
            /**
             * 可能会出现资源遗失问题
            cc.loader.release(item);
             */
            // }
        });
    };
    UIMgr.prototype.closeUI = function (uiHudDef, release, callback) {
        var _this = this;
        if (release === void 0) { release = false; }
        if (callback === void 0) { callback = null; }
        if (this.hasUI(uiHudDef)) {
            var ui_1 = this.uiMap.get(uiHudDef);
            if (cc.isValid(ui_1.node)) {
                this.uiMap.delete(uiHudDef);
                this.lru.remove(uiHudDef);
                this.hide(ui_1, uiHudDef, function () {
                    ui_1.node.destroy();
                    if (release) {
                        var uiData = _this.uiData.get(uiHudDef);
                        _this.clearDependsRes(_this.prefabRoot + uiData.prefabPath);
                    }
                    callback && callback();
                });
            }
            return;
        }
    };
    UIMgr.prototype.closeAllUI = function () {
        var _this = this;
        this.uiMap.forEach(function (ui, uiHudDef) {
            _this.closeUI(uiHudDef);
        });
    };
    UIMgr.prototype.showUI = function (uiHudDef, args, callback, closeCB) {
        var ui = this.getUI(uiHudDef);
        if (!ui) {
            Log_1.Log.warn("showUI: ui " + UIData_1.UIHudDef[uiHudDef] + " not exist");
            this.openUI(uiHudDef, args, callback, closeCB);
            return;
        }
        ui.init(args);
        ui.isShow = true;
        ui.node.active = true;
        this.isOpening = true;
        this.show(ui, uiHudDef, closeCB);
        this.lru.get(uiHudDef);
        callback && callback(ui);
    };
    UIMgr.prototype.hideUI = function (uiHudDef, callback) {
        var ui = this.getUI(uiHudDef);
        if (ui) {
            ui.isShow = false;
            this.hide(ui, uiHudDef, function () {
                //条件控制,防止hide后立即调用显示回调隐藏弹框的BUG
                if (!ui.isShow) {
                    ui.node.active = false;
                    callback && callback();
                }
            });
        }
    };
    UIMgr.prototype.getUI = function (uiHudDef) {
        if (this.hasUI(uiHudDef)) {
            return this.uiMap.get(uiHudDef);
        }
        return null;
    };
    UIMgr.prototype.hasUI = function (uiHudDef) {
        return this.uiMap.has(uiHudDef);
    };
    UIMgr.prototype.isShowing = function (uiHudDef) {
        var ui = this.getUI(uiHudDef);
        if (!ui) {
            return false;
        }
        return ui.node.active;
    };
    UIMgr.prototype.show = function (ui, uiHudDef, closeCallBack) {
        var _this = this;
        var uiData = this.uiData.get(uiHudDef);
        if ((uiData.blackBg == undefined || uiData.blackBg == true) /* && !this.blackBg.active*/) {
            // console.error("black show");
            this.blackBg.stopAllActions();
            this.blackBg.active = true;
            this.blackBg.opacity = 0;
            this.blackBg.zIndex = uiData.viewZOrder - 1;
            this.blackBg.runAction(cc.fadeIn(0.3));
        }
        if (uiData.tween == undefined || uiData.tween == true) {
            var tween = new gsap.TimelineLite();
            tween.set(ui.node, { scale: 0.5, opacity: 0 })
                .to(ui.node, 0.5, {
                scale: 1, opacity: 255, ease: gsap.Back.easeInOut,
                onComplete: function () {
                    _this.isOpening = false;
                    ui.onShow(closeCallBack);
                }
            });
        }
        else {
            ui.node.opacity = 255;
            this.isOpening = false;
            ui.onShow(closeCallBack);
        }
    };
    UIMgr.prototype.hide = function (ui, uiHudDef, callback) {
        var _this = this;
        var uiData = this.uiData.get(uiHudDef);
        if (uiData.blackBg == undefined || uiData.blackBg == true) {
            var a0 = cc.fadeOut(0.1);
            var a1 = cc.callFunc(function () {
                _this.blackBg.active = false;
            }, this);
            this.blackBg.runAction(cc.sequence(a0, a1));
        }
        else {
            this.blackBg.active = false;
        }
        if (uiData.tween == undefined || uiData.tween == true) {
            gsap.TweenLite.to(ui.node, 0.3, {
                scale: 0.5, opacity: 0, ease: gsap.Expo.easeOut, onComplete: callback
            });
        }
        else {
            ui.node.active = false;
            callback();
        }
    };
    return UIMgr;
}());
exports.default = UIMgr;

cc._RF.pop();