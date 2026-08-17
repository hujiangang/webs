
import PlatformMgr from "../Manager/PlatformMgr";
//import Common from "../../Logic/Common/Common";


export namespace Util {

    export class Enum {
        private static counter = 10000;

        public static next(): number {
            return this.counter++;
        }

        public static nextString(): string {
            return this.next().toString();
        }

        public static convert2EventEnum(e) {
            for (let key in e) {
                e[key] = this.next();
            }
        }
    }

    export class Tool {

        public static isNull(p: any): boolean {
            let result = true;
            if (p) {
                for (const key in p) {
                    result = false;
                    break;
                }
            }
            return result;
        }

        public static isIpx(): boolean {
            // const info = PlatformMgr.ins.getSystemInfoSync();
            // if (info && info.model && info.model.indexOf('iPhone X') != -1) {
            //     return true
            // }
            // return false;

            if (cc.winSize.height > 1500) {
                return true
            }
            return false
        }

        public static isNumber(value: any): boolean {
            return typeof (value) == 'number';
        }

        /**显示调试信息 */
        public static showDebugView(opt: boolean) {
           // cc.debug.setDisplayStats(opt);
        }

        /**当前是否是微信平台 */
        public static isWechatGame(): boolean {
            return cc.sys.browserType == "wechatgame";
        }

        /** 生成随机整数，随机整数范围包含min值和max值 */
        public static rangeInt(min: number, max: number, isHaveMax: boolean = true): number {
            let value: number = isHaveMax ? 1 : 0;
            return Math.floor(Math.random() * (max - min + value) + min);
        }

        /** 生成随机浮点数，随机数范围包含min值，但不包含max值 */
        public static range(min: number, max: number): number {
            return Math.random() * (max - min) + min;
        }

        public static compareV2(p1: cc.Vec2, p2: cc.Vec2): boolean {
            return p1.equals(p2);//(p1.x == p2.x && p1.y == p2.y)
        }

        /**
        * 先根遍历节点树, 查找特定子节点(第一个找到的)
        * @param {cc.Node} ele 根节点
        * @param {String} name 子节点名称
        * @returns {cc.Node | null} child
        */
        public static getChildByName(ele, name) {
            if (ele.name === name) {
                // 先访问根节点, 若找到则返回该节点
                return ele;
            }
            // 否则按从左到右的顺序遍历根节点的每一棵子树
            for (let i = 0; i < ele.children.length; i++) {
                if (this.getChildByName(ele.children[i], name)) {
                    // 若找到则返回该节点
                    return this.getChildByName(ele.children[i], name);
                };
            }
            // 找不到返回 null
            return null;
        }

        /**
         * 格式化字符串
         */
        public static stringFormat(str: string, ...args: any[]): string {
            //过滤掉所有
            str = str.replace(/%%/g, "%");
            return Tool.stringFormatArr(str, args);
        }

        public static stringFormatArr(str: string, args: Array<any>): string {
            var new_str = str;
            for (var i in args) {
                var arg = args[i];
                if (new RegExp("(%s|%d)").test(new_str)) {
                    new_str = new_str.replace(RegExp.$1, arg);
                }
            }
            return new_str;
        }

        /**
         * 拷贝一个字典 
         * @param isDeepCopy 是否深拷贝
         */
        public static copyDict(dict, isDeepCopy?) {
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
                } else {
                    newDict[i] = dict[i];
                }
            }
            return newDict;
        }


        //打开界面动画
        public static OpenUITween(node: cc.Node,callback: Function){
            cc.log("打开界面动画")

            let tween = new gsap.TimelineLite();
            tween.set(node, { scale: 0.5, opacity: 0 })
                .to(node, 0.5, {
                    scale: 1, opacity: 255, ease: gsap.Back.easeInOut, onComplete: () => {
                        // this.isOpening = false;
                        // ui.onShow(closeCallBack);
                    }
                })
        }


        //关闭界面动画
        public static CloseUITween(node: cc.Node,callback: Function){
            gsap.TweenLite.to(node, 0.3, {
                scale: 0.5, opacity: 0, ease: gsap.Expo.easeOut, onComplete: callback
            })
        }


        //飞到目标点动画
        public static moveTo(targetPos: cc.Vec2, node:cc.Node, callback?: Function) {
            // const pos = Common.getPos(targetPos.x, targetPos.y);
            // const a0 = cc.delayTime(0.2);
            // const a1 = cc.moveTo(0.2, pos);
            // const a2 = cc.callFunc(() => {
            //     callback && callback();
            // });
            // node.runAction(cc.sequence(a0, a1, a2));
        }
    }

    export class Timer {
        /**
         * 格式化时间显示
         * @param fmt  格式化后的格式 'yyyy:MM:dd hh:mm:ss'
         * @param date 需要格式化的时间对象
         */
        public static dateFtt(fmt: string, date: Date) {
            var o = {
                "M+": date.getMonth() + 1,                   //月份   
                "d+": date.getDate(),                        //日   
                "h+": date.getHours(),                       //小时   
                "m+": date.getMinutes(),                     //分   
                "s+": date.getSeconds(),                     //秒   
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
                "S": date.getMilliseconds()                  //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        /**
         * 将时间格式化成时分秒..没有时则不显示时.
         * @param times s
         * @param isDot default false 00:00:00 true  时分秒
         * @param fillZero {h,m,s}
         */
        public static conversionTime(times: number, isDot: boolean = false, fillZero: { h?, m?} = <any>{}): string {
            if (times < 0) return;
            let d: any = Math.floor(times / 60 / 60 / 24);
            let h: any = Math.floor(times % 86400 / 60 / 60);
            let m: any = Math.floor(times % 3600 / 60);
            let s: any = Math.floor(times % 60);
            h = h < 10 ? '0' + h : h; m = m < 10 ? '0' + m : m; s = s < 10 ? '0' + s : s;
            let resutle: string = '';
            let unit = isDot ? [':', ':', ':', ''] : ['天', '时', '分', '秒'];
            if (d > 0) {
                resutle = d + unit[0] + h + unit[1] + m + unit[2] + s + unit[3];
            } else if (h > 0 || fillZero['h']) {
                resutle = h + unit[1] + m + unit[2] + s + unit[3];
            } else if (m > 0 || fillZero['m']) {
                resutle = m + unit[2] + s + unit[3];
            } else {
                resutle = s + unit[3];
            }
            return resutle;
        }

        /** 获取当前时间 服务器安全时间 */
        public static getNowTime(): number {
            // serverTime + (Date.now() / 1000) - clientTime; ??? 
            return Date.now();
        }
    }

    /** 自定义加载 */
    export class Loader {
        //加载spriteFrame
        public static loadSpriteFrame(path: string, next) {
            cc.loader.loadRes(path, cc.SpriteFrame, (err, resource) => {
                if (err) {
                    console.warn("加载SpriteFrame出错", err);
                }
                next(err, resource);
            });
        }
    }
}
window["Util"] = Util;