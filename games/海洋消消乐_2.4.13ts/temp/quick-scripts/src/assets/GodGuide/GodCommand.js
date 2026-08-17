"use strict";
cc._RF.push(module, 'c83afiAlmFJErvPKSGx5Ilq', 'GodCommand');
// GodGuide/GodCommand.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GodCommand = void 0;
/**
 * zxh
 */
var async = require('async');
//根据命令
var GodCommand = /** @class */ (function () {
    function GodCommand() {
    }
    //定位节点
    GodCommand.locator = function (godGuide, step, callback) {
        var args = step.command.args;
        godGuide.find(args, function (node) {
            godGuide._targetNode = node;
            //点击确认
            node.once(cc.Node.EventType.TOUCH_END, function () {
                console.warn('节点被点击');
                //任务完成
                callback();
            });
            //触摸模拟
            var autorun = godGuide.getTask().autorun;
            if (autorun) {
                godGuide.touchSimulation(node);
            }
        });
    };
    //定位节点，显示一个手指动画
    GodCommand.finger = function (godGuide, step, callback) {
        var args = step.command.args;
        godGuide._targetNode = null;
        //定位节点
        godGuide.find(args, function (node) {
            //手指动画
            godGuide.fingerToNode(node, function () {
                if (!node || node.name.length == 0) {
                    callback();
                    return;
                }
                godGuide._targetNode = node;
                //点击确认
                node.once(cc.Node.EventType.TOUCH_END, function () {
                    console.warn('节点被点击');
                    //任务完成
                    godGuide._targetNode && callback();
                });
            });
            //触摸模拟
            // let autorun = godGuide.getTask().autorun;
            // if (autorun) {
            //     godGuide.touchSimulation(node);
            // }
        });
    };
    //文本指令
    GodCommand.text = function (godGuide, step, callback) {
        var _a = step.command, role = _a.role, args = _a.args, positionY = _a.positionY;
        if (args && (typeof args === 'string' || typeof args === 'number')) {
            args = [args];
        }
        //触摸模拟
        // let autorun = godGuide.getTask().autorun;
        var index = 0;
        //顺序显示文本
        async.eachSeries(args, function (str, cb) {
            var flag = false;
            godGuide.showText(str, role, positionY || 0, function () {
                if (flag) {
                    return;
                }
                flag = true;
                cb();
            });
            // if (index++ >= args.length - 1) {
            //     flag = true;
            //     cb();
            //     return;
            // }
            //自动引导
            // if (autorun) {
            //     setTimeout(() => {
            //         if (flag) {
            //             return;
            //         }
            //         flag = true;
            //         cb();
            //     }, 1000);
            // }
        }, callback);
    };
    // //文本指令
    // static text(godGuide: GodGuide, step, callback) {
    //     let { args } = step.command;
    //     if (args && (typeof args === 'string' || typeof args === 'number')) {
    //         args = [args];
    //     }
    //     //触摸模拟
    //     let autorun = godGuide.getTask().autorun;
    //     let index = 0;
    //     //顺序显示文本
    //     async.eachSeries(args, (str, cb) => {
    //         let flag = false;
    //         let next = () => {
    //             if (++index >= args.length - 1) {
    //                 flag = true;
    //                 console.log('step------------->',step)
    //                 cb();
    //                 return;
    //             } else {
    //                 if (flag) {
    //                     return;
    //                 }
    //                 flag = true;
    //                 cb();
    //             }
    //         }
    //         godGuide.showText(str, () => {//点击回调
    //             next();
    //         });
    //         //自动引导
    //         if (autorun) {
    //             setTimeout(() => {
    //                 next();
    //             }, 1000);
    //         }
    //     }, callback);
    // }
    //对话框
    GodCommand.dialogue = function (godGuide, step, callback) {
        var args = step.command.args;
        if (args && (typeof args === 'string' || typeof args === 'number')) {
            args = [args];
        }
        //触摸模拟
        var autorun = godGuide.getTask().autorun;
        var index = 0;
        //顺序显示文本
        async.eachSeries(args, function (str, cb) {
            var flag = false;
            var next = function () {
                if (++index >= args.length - 1) {
                    godGuide._dialogue.active = false;
                    flag = true;
                    cb();
                    return;
                }
                else {
                    if (flag) {
                        return;
                    }
                    flag = true;
                    godGuide._dialogue.active = false;
                    cb();
                }
            };
            godGuide.showDialogue(str, function () {
                next();
            });
            //自动引导
            if (autorun) {
                setTimeout(function () {
                    if (flag) {
                        return;
                    }
                    flag = true;
                    cb();
                }, 10000);
            }
        }, callback);
    };
    GodCommand.condition = function () {
    };
    GodCommand.DIALOGUE = 'dialogue'; //对话框
    GodCommand.FINGER = 'finger'; //节点定位加手指指引
    GodCommand.TEXT = 'text'; //文本显示
    GodCommand.LOCATOR = 'locator'; //节点定位
    GodCommand.SAVE = 'save'; //保存进度
    GodCommand.typeList = [GodCommand.DIALOGUE, GodCommand.FINGER, GodCommand.TEXT, GodCommand.LOCATOR, GodCommand.SAVE];
    return GodCommand;
}());
exports.GodCommand = GodCommand;
;

cc._RF.pop();