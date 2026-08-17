
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Utils/Util.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVdGlsc1xcVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpREFBaUQ7QUFHakQsSUFBaUIsSUFBSSxDQXFQcEI7QUFyUEQsV0FBaUIsSUFBSTtJQUVqQjtRQUFBO1FBZ0JBLENBQUM7UUFiaUIsU0FBSSxHQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFYSxlQUFVLEdBQXhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVhLHNCQUFpQixHQUEvQixVQUFnQyxDQUFDO1lBQzdCLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO2dCQUNmLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBZGMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQWVuQyxXQUFDO0tBaEJELEFBZ0JDLElBQUE7SUFoQlksU0FBSSxPQWdCaEIsQ0FBQTtJQUVEO1FBQUE7UUF5SkEsQ0FBQztRQXZKaUIsV0FBTSxHQUFwQixVQUFxQixDQUFNO1lBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsRUFBRTtnQkFDSCxLQUFLLElBQU0sR0FBRyxJQUFJLENBQUMsRUFBRTtvQkFDakIsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDZixNQUFNO2lCQUNUO2FBQ0o7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRWEsVUFBSyxHQUFuQjtZQUNJLG9EQUFvRDtZQUNwRCxvRUFBb0U7WUFDcEUsa0JBQWtCO1lBQ2xCLElBQUk7WUFDSixnQkFBZ0I7WUFFaEIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFB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QyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLFdBQU0sU0FVbEIsQ0FBQTtBQUNMLENBQUMsRUFyUGdCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQXFQcEI7QUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUGxhdGZvcm1NZ3IgZnJvbSBcIi4uL01hbmFnZXIvUGxhdGZvcm1NZ3JcIjtcbi8vaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vTG9naWMvQ29tbW9uL0NvbW1vblwiO1xuXG5cbmV4cG9ydCBuYW1lc3BhY2UgVXRpbCB7XG5cbiAgICBleHBvcnQgY2xhc3MgRW51bSB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNvdW50ZXIgPSAxMDAwMDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIG5leHQoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdW50ZXIrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbmV4dFN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dCgpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnQyRXZlbnRFbnVtKGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBlKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gdGhpcy5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVG9vbCB7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBpc051bGwocDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaXNJcHgoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAvLyBjb25zdCBpbmZvID0gUGxhdGZvcm1NZ3IuaW5zLmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgICAgICAvLyBpZiAoaW5mbyAmJiBpbmZvLm1vZGVsICYmIGluZm8ubW9kZWwuaW5kZXhPZignaVBob25lIFgnKSAhPSAtMSkge1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChjYy53aW5TaXplLmhlaWdodCA+IDE1MDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgKHZhbHVlKSA9PSAnbnVtYmVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKuaYvuekuuiwg+ivleS/oeaBryAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIHNob3dEZWJ1Z1ZpZXcob3B0OiBib29sZWFuKSB7XG4gICAgICAgICAgIC8vIGNjLmRlYnVnLnNldERpc3BsYXlTdGF0cyhvcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoq5b2T5YmN5piv5ZCm5piv5b6u5L+h5bmz5Y+wICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaXNXZWNoYXRHYW1lKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIGNjLnN5cy5icm93c2VyVHlwZSA9PSBcIndlY2hhdGdhbWVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiDnlJ/miJDpmo/mnLrmlbTmlbDvvIzpmo/mnLrmlbTmlbDojIPlm7TljIXlkKttaW7lgLzlkoxtYXjlgLwgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyByYW5nZUludChtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIGlzSGF2ZU1heDogYm9vbGVhbiA9IHRydWUpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSBpc0hhdmVNYXggPyAxIDogMDtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgdmFsdWUpICsgbWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiDnlJ/miJDpmo/mnLrmta7ngrnmlbDvvIzpmo/mnLrmlbDojIPlm7TljIXlkKttaW7lgLzvvIzkvYbkuI3ljIXlkKttYXjlgLwgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyByYW5nZShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY29tcGFyZVYyKHAxOiBjYy5WZWMyLCBwMjogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHAxLmVxdWFscyhwMik7Ly8ocDEueCA9PSBwMi54ICYmIHAxLnkgPT0gcDIueSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIOWFiOaguemBjeWOhuiKgueCueagkSwg5p+l5om+54m55a6a5a2Q6IqC54K5KOesrOS4gOS4quaJvuWIsOeahClcbiAgICAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IGVsZSDmoLnoioLngrlcbiAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSDlrZDoioLngrnlkI3np7BcbiAgICAgICAgKiBAcmV0dXJucyB7Y2MuTm9kZSB8IG51bGx9IGNoaWxkXG4gICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hpbGRCeU5hbWUoZWxlLCBuYW1lKSB7XG4gICAgICAgICAgICBpZiAoZWxlLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyDlhYjorr/pl67moLnoioLngrksIOiLpeaJvuWIsOWImei/lOWbnuivpeiKgueCuVxuICAgICAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlkKbliJnmjInku47lt6bliLDlj7PnmoTpobrluo/pgY3ljobmoLnoioLngrnnmoTmr4/kuIDmo7XlrZDmoJFcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q2hpbGRCeU5hbWUoZWxlLmNoaWxkcmVuW2ldLCBuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDoi6Xmib7liLDliJnov5Tlm57or6XoioLngrlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRCeU5hbWUoZWxlLmNoaWxkcmVuW2ldLCBuYW1lKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5om+5LiN5Yiw6L+U5ZueIG51bGxcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOagvOW8j+WMluWtl+espuS4slxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmdGb3JtYXQoc3RyOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgICAgICAgICAgIC8v6L+H5ruk5o6J5omA5pyJXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvJSUvZywgXCIlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFRvb2wuc3RyaW5nRm9ybWF0QXJyKHN0ciwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZ0Zvcm1hdEFycihzdHI6IHN0cmluZywgYXJnczogQXJyYXk8YW55Pik6IHN0cmluZyB7XG4gICAgICAgICAgICB2YXIgbmV3X3N0ciA9IHN0cjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYXJncykge1xuICAgICAgICAgICAgICAgIHZhciBhcmcgPSBhcmdzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKFwiKCVzfCVkKVwiKS50ZXN0KG5ld19zdHIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld19zdHIgPSBuZXdfc3RyLnJlcGxhY2UoUmVnRXhwLiQxLCBhcmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdfc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaLt+i0neS4gOS4quWtl+WFuCBcbiAgICAgICAgICogQHBhcmFtIGlzRGVlcENvcHkg5piv5ZCm5rex5ou36LSdXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNvcHlEaWN0KGRpY3QsIGlzRGVlcENvcHk/KSB7XG4gICAgICAgICAgICBpZiAoIWRpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGljdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdEaWN0ID0gKGRpY3QgaW5zdGFuY2VvZiBBcnJheSkgPyBbXSA6IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkaWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkaWN0W2ldID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzRGVlcENvcHkgJiYgKHR5cGVvZiBkaWN0W2ldID09IFwib2JqZWN0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RpY3RbaV0gPSBUb29sLmNvcHlEaWN0KGRpY3RbaV0sIGlzRGVlcENvcHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RpY3RbaV0gPSBkaWN0W2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdEaWN0O1xuICAgICAgICB9XG5cblxuICAgICAgICAvL+aJk+W8gOeVjOmdouWKqOeUu1xuICAgICAgICBwdWJsaWMgc3RhdGljIE9wZW5VSVR3ZWVuKG5vZGU6IGNjLk5vZGUsY2FsbGJhY2s6IEZ1bmN0aW9uKXtcbiAgICAgICAgICAgIGNjLmxvZyhcIuaJk+W8gOeVjOmdouWKqOeUu1wiKVxuXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgZ3NhcC5UaW1lbGluZUxpdGUoKTtcbiAgICAgICAgICAgIHR3ZWVuLnNldChub2RlLCB7IHNjYWxlOiAwLjUsIG9wYWNpdHk6IDAgfSlcbiAgICAgICAgICAgICAgICAudG8obm9kZSwgMC41LCB7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxLCBvcGFjaXR5OiAyNTUsIGVhc2U6IGdzYXAuQmFjay5lYXNlSW5PdXQsIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNPcGVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1aS5vblNob3coY2xvc2VDYWxsQmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICAvL+WFs+mXreeVjOmdouWKqOeUu1xuICAgICAgICBwdWJsaWMgc3RhdGljIENsb3NlVUlUd2Vlbihub2RlOiBjYy5Ob2RlLGNhbGxiYWNrOiBGdW5jdGlvbil7XG4gICAgICAgICAgICBnc2FwLlR3ZWVuTGl0ZS50byhub2RlLCAwLjMsIHtcbiAgICAgICAgICAgICAgICBzY2FsZTogMC41LCBvcGFjaXR5OiAwLCBlYXNlOiBnc2FwLkV4cG8uZWFzZU91dCwgb25Db21wbGV0ZTogY2FsbGJhY2tcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8v6aOe5Yiw55uu5qCH54K55Yqo55S7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbW92ZVRvKHRhcmdldFBvczogY2MuVmVjMiwgbm9kZTpjYy5Ob2RlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAvLyBjb25zdCBwb3MgPSBDb21tb24uZ2V0UG9zKHRhcmdldFBvcy54LCB0YXJnZXRQb3MueSk7XG4gICAgICAgICAgICAvLyBjb25zdCBhMCA9IGNjLmRlbGF5VGltZSgwLjIpO1xuICAgICAgICAgICAgLy8gY29uc3QgYTEgPSBjYy5tb3ZlVG8oMC4yLCBwb3MpO1xuICAgICAgICAgICAgLy8gY29uc3QgYTIgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgLy8gbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExLCBhMikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVyIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOagvOW8j+WMluaXtumXtOaYvuekulxuICAgICAgICAgKiBAcGFyYW0gZm10ICDmoLzlvI/ljJblkI7nmoTmoLzlvI8gJ3l5eXk6TU06ZGQgaGg6bW06c3MnXG4gICAgICAgICAqIEBwYXJhbSBkYXRlIOmcgOimgeagvOW8j+WMlueahOaXtumXtOWvueixoVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBkYXRlRnR0KGZtdDogc3RyaW5nLCBkYXRlOiBEYXRlKSB7XG4gICAgICAgICAgICB2YXIgbyA9IHtcbiAgICAgICAgICAgICAgICBcIk0rXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsICAgICAgICAgICAgICAgICAgIC8v5pyI5Lu9ICAgXG4gICAgICAgICAgICAgICAgXCJkK1wiOiBkYXRlLmdldERhdGUoKSwgICAgICAgICAgICAgICAgICAgICAgICAvL+aXpSAgIFxuICAgICAgICAgICAgICAgIFwiaCtcIjogZGF0ZS5nZXRIb3VycygpLCAgICAgICAgICAgICAgICAgICAgICAgLy/lsI/ml7YgICBcbiAgICAgICAgICAgICAgICBcIm0rXCI6IGRhdGUuZ2V0TWludXRlcygpLCAgICAgICAgICAgICAgICAgICAgIC8v5YiGICAgXG4gICAgICAgICAgICAgICAgXCJzK1wiOiBkYXRlLmdldFNlY29uZHMoKSwgICAgICAgICAgICAgICAgICAgICAvL+enkiAgIFxuICAgICAgICAgICAgICAgIFwicStcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqYgICBcbiAgICAgICAgICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAgICAgICAgICAgICAgICAgIC8v5q+r56eSICAgXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKC8oeSspLy50ZXN0KGZtdCkpXG4gICAgICAgICAgICAgICAgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoZGF0ZS5nZXRGdWxsWWVhcigpICsgXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIG8pXG4gICAgICAgICAgICAgICAgaWYgKG5ldyBSZWdFeHAoXCIoXCIgKyBrICsgXCIpXCIpLnRlc3QoZm10KSlcbiAgICAgICAgICAgICAgICAgICAgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aCA9PSAxKSA/IChvW2tdKSA6ICgoXCIwMFwiICsgb1trXSkuc3Vic3RyKChcIlwiICsgb1trXSkubGVuZ3RoKSkpO1xuICAgICAgICAgICAgcmV0dXJuIGZtdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlsIbml7bpl7TmoLzlvI/ljJbmiJDml7bliIbnp5IuLuayoeacieaXtuWImeS4jeaYvuekuuaXti5cbiAgICAgICAgICogQHBhcmFtIHRpbWVzIHNcbiAgICAgICAgICogQHBhcmFtIGlzRG90IGRlZmF1bHQgZmFsc2UgMDA6MDA6MDAgdHJ1ZSAg5pe25YiG56eSXG4gICAgICAgICAqIEBwYXJhbSBmaWxsWmVybyB7aCxtLHN9XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnNpb25UaW1lKHRpbWVzOiBudW1iZXIsIGlzRG90OiBib29sZWFuID0gZmFsc2UsIGZpbGxaZXJvOiB7IGg/LCBtP30gPSA8YW55Pnt9KTogc3RyaW5nIHtcbiAgICAgICAgICAgIGlmICh0aW1lcyA8IDApIHJldHVybjtcbiAgICAgICAgICAgIGxldCBkOiBhbnkgPSBNYXRoLmZsb29yKHRpbWVzIC8gNjAgLyA2MCAvIDI0KTtcbiAgICAgICAgICAgIGxldCBoOiBhbnkgPSBNYXRoLmZsb29yKHRpbWVzICUgODY0MDAgLyA2MCAvIDYwKTtcbiAgICAgICAgICAgIGxldCBtOiBhbnkgPSBNYXRoLmZsb29yKHRpbWVzICUgMzYwMCAvIDYwKTtcbiAgICAgICAgICAgIGxldCBzOiBhbnkgPSBNYXRoLmZsb29yKHRpbWVzICUgNjApO1xuICAgICAgICAgICAgaCA9IGggPCAxMCA/ICcwJyArIGggOiBoOyBtID0gbSA8IDEwID8gJzAnICsgbSA6IG07IHMgPSBzIDwgMTAgPyAnMCcgKyBzIDogcztcbiAgICAgICAgICAgIGxldCByZXN1dGxlOiBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgIGxldCB1bml0ID0gaXNEb3QgPyBbJzonLCAnOicsICc6JywgJyddIDogWyflpKknLCAn5pe2JywgJ+WIhicsICfnp5InXTtcbiAgICAgICAgICAgIGlmIChkID4gMCkge1xuICAgICAgICAgICAgICAgIHJlc3V0bGUgPSBkICsgdW5pdFswXSArIGggKyB1bml0WzFdICsgbSArIHVuaXRbMl0gKyBzICsgdW5pdFszXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaCA+IDAgfHwgZmlsbFplcm9bJ2gnXSkge1xuICAgICAgICAgICAgICAgIHJlc3V0bGUgPSBoICsgdW5pdFsxXSArIG0gKyB1bml0WzJdICsgcyArIHVuaXRbM107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG0gPiAwIHx8IGZpbGxaZXJvWydtJ10pIHtcbiAgICAgICAgICAgICAgICByZXN1dGxlID0gbSArIHVuaXRbMl0gKyBzICsgdW5pdFszXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdXRsZSA9IHMgKyB1bml0WzNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3V0bGU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiog6I635Y+W5b2T5YmN5pe26Ze0IOacjeWKoeWZqOWuieWFqOaXtumXtCAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGdldE5vd1RpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIC8vIHNlcnZlclRpbWUgKyAoRGF0ZS5ub3coKSAvIDEwMDApIC0gY2xpZW50VGltZTsgPz8/IFxuICAgICAgICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiog6Ieq5a6a5LmJ5Yqg6L29ICovXG4gICAgZXhwb3J0IGNsYXNzIExvYWRlciB7XG4gICAgICAgIC8v5Yqg6L29c3ByaXRlRnJhbWVcbiAgICAgICAgcHVibGljIHN0YXRpYyBsb2FkU3ByaXRlRnJhbWUocGF0aDogc3RyaW5nLCBuZXh0KSB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuWKoOi9vVNwcml0ZUZyYW1l5Ye66ZSZXCIsIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQoZXJyLCByZXNvdXJjZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbndpbmRvd1tcIlV0aWxcIl0gPSBVdGlsOyJdfQ==