"use strict";
cc._RF.push(module, '2df7fpPq8dFIZ0GFbnvFJGf', 'Util');
// Script/Base/Utils/Util.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
//import Common from "../../Logic/Common/Common";
var Util;
(function (Util) {
    var Enum = /** @class */ (function () {
        function Enum() {
        }
        Enum.next = function () {
            return this.counter++;
        };
        Enum.nextString = function () {
            return this.next().toString();
        };
        Enum.convert2EventEnum = function (e) {
            for (var key in e) {
                e[key] = this.next();
            }
        };
        Enum.counter = 10000;
        return Enum;
    }());
    Util.Enum = Enum;
    var Tool = /** @class */ (function () {
        function Tool() {
        }
        Tool.isNull = function (p) {
            var result = true;
            if (p) {
                for (var key in p) {
                    result = false;
                    break;
                }
            }
            return result;
        };
        Tool.isIpx = function () {
            // const info = PlatformMgr.ins.getSystemInfoSync();
            // if (info && info.model && info.model.indexOf('iPhone X') != -1) {
            //     return true
            // }
            // return false;
            if (cc.winSize.height > 1500) {
                return true;
            }
            return false;
        };
        Tool.isNumber = function (value) {
            return typeof (value) == 'number';
        };
        /**显示调试信息 */
        Tool.showDebugView = function (opt) {
            // cc.debug.setDisplayStats(opt);
        };
        /**当前是否是微信平台 */
        Tool.isWechatGame = function () {
            return cc.sys.browserType == "wechatgame";
        };
        /** 生成随机整数，随机整数范围包含min值和max值 */
        Tool.rangeInt = function (min, max, isHaveMax) {
            if (isHaveMax === void 0) { isHaveMax = true; }
            var value = isHaveMax ? 1 : 0;
            return Math.floor(Math.random() * (max - min + value) + min);
        };
        /** 生成随机浮点数，随机数范围包含min值，但不包含max值 */
        Tool.range = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        Tool.compareV2 = function (p1, p2) {
            return p1.equals(p2); //(p1.x == p2.x && p1.y == p2.y)
        };
        /**
        * 先根遍历节点树, 查找特定子节点(第一个找到的)
        * @param {cc.Node} ele 根节点
        * @param {String} name 子节点名称
        * @returns {cc.Node | null} child
        */
        Tool.getChildByName = function (ele, name) {
            if (ele.name === name) {
                // 先访问根节点, 若找到则返回该节点
                return ele;
            }
            // 否则按从左到右的顺序遍历根节点的每一棵子树
            for (var i = 0; i < ele.children.length; i++) {
                if (this.getChildByName(ele.children[i], name)) {
                    // 若找到则返回该节点
                    return this.getChildByName(ele.children[i], name);
                }
                ;
            }
            // 找不到返回 null
            return null;
        };
        /**
         * 格式化字符串
         */
        Tool.stringFormat = function (str) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            //过滤掉所有
            str = str.replace(/%%/g, "%");
            return Tool.stringFormatArr(str, args);
        };
        Tool.stringFormatArr = function (str, args) {
            var new_str = str;
            for (var i in args) {
                var arg = args[i];
                if (new RegExp("(%s|%d)").test(new_str)) {
                    new_str = new_str.replace(RegExp.$1, arg);
                }
            }
            return new_str;
        };
        /**
         * 拷贝一个字典
         * @param isDeepCopy 是否深拷贝
         */
        Tool.copyDict = function (dict, isDeepCopy) {
            if (!dict) {
                return dict;
            }
            var newDict = (dict instanceof Array) ? [] : {};
            for (var i in dict) {
                if (typeof dict[i] == "function") {
                    continue;
                }
                if (isDeepCopy && (typeof dict[i] == "object")) {
                    newDict[i] = Tool.copyDict(dict[i], isDeepCopy);
                }
                else {
                    newDict[i] = dict[i];
                }
            }
            return newDict;
        };
        //打开界面动画
        Tool.OpenUITween = function (node, callback) {
            cc.log("打开界面动画");
            var tween = new gsap.TimelineLite();
            tween.set(node, { scale: 0.5, opacity: 0 })
                .to(node, 0.5, {
                scale: 1, opacity: 255, ease: gsap.Back.easeInOut,
                onComplete: function () {
                    // this.isOpening = false;
                    // ui.onShow(closeCallBack);
                }
            });
        };
        //关闭界面动画
        Tool.CloseUITween = function (node, callback) {
            gsap.TweenLite.to(node, 0.3, {
                scale: 0.5, opacity: 0, ease: gsap.Expo.easeOut, onComplete: callback
            });
        };
        //飞到目标点动画
        Tool.moveTo = function (targetPos, node, callback) {
            // const pos = Common.getPos(targetPos.x, targetPos.y);
            // const a0 = cc.delayTime(0.2);
            // const a1 = cc.moveTo(0.2, pos);
            // const a2 = cc.callFunc(() => {
            //     callback && callback();
            // });
            // node.runAction(cc.sequence(a0, a1, a2));
        };
        return Tool;
    }());
    Util.Tool = Tool;
    var Timer = /** @class */ (function () {
        function Timer() {
        }
        /**
         * 格式化时间显示
         * @param fmt  格式化后的格式 'yyyy:MM:dd hh:mm:ss'
         * @param date 需要格式化的时间对象
         */
        Timer.dateFtt = function (fmt, date) {
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds() //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        /**
         * 将时间格式化成时分秒..没有时则不显示时.
         * @param times s
         * @param isDot default false 00:00:00 true  时分秒
         * @param fillZero {h,m,s}
         */
        Timer.conversionTime = function (times, isDot, fillZero) {
            if (isDot === void 0) { isDot = false; }
            if (fillZero === void 0) { fillZero = {}; }
            if (times < 0)
                return;
            var d = Math.floor(times / 60 / 60 / 24);
            var h = Math.floor(times % 86400 / 60 / 60);
            var m = Math.floor(times % 3600 / 60);
            var s = Math.floor(times % 60);
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            var resutle = '';
            var unit = isDot ? [':', ':', ':', ''] : ['天', '时', '分', '秒'];
            if (d > 0) {
                resutle = d + unit[0] + h + unit[1] + m + unit[2] + s + unit[3];
            }
            else if (h > 0 || fillZero['h']) {
                resutle = h + unit[1] + m + unit[2] + s + unit[3];
            }
            else if (m > 0 || fillZero['m']) {
                resutle = m + unit[2] + s + unit[3];
            }
            else {
                resutle = s + unit[3];
            }
            return resutle;
        };
        /** 获取当前时间 服务器安全时间 */
        Timer.getNowTime = function () {
            // serverTime + (Date.now() / 1000) - clientTime; ??? 
            return Date.now();
        };
        return Timer;
    }());
    Util.Timer = Timer;
    /** 自定义加载 */
    var Loader = /** @class */ (function () {
        function Loader() {
        }
        //加载spriteFrame
        Loader.loadSpriteFrame = function (path, next) {
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, resource) {
                if (err) {
                    console.warn("加载SpriteFrame出错", err);
                }
                next(err, resource);
            });
        };
        return Loader;
    }());
    Util.Loader = Loader;
})(Util = exports.Util || (exports.Util = {}));
window["Util"] = Util;

cc._RF.pop();