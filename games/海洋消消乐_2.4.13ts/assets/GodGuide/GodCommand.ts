import GodGuide from "./GodGuide";

/**
 * zxh
 */
let async = require('async');
//根据命令
export class GodCommand {

    static readonly DIALOGUE: string = 'dialogue';//对话框
    static readonly FINGER: string = 'finger';//节点定位加手指指引
    static readonly TEXT: string = 'text';//文本显示
    static readonly LOCATOR: string = 'locator';//节点定位
    static readonly SAVE: string = 'save';//保存进度

    static readonly typeList = [GodCommand.DIALOGUE, GodCommand.FINGER, GodCommand.TEXT, GodCommand.LOCATOR, GodCommand.SAVE];


    //定位节点
    static locator(godGuide: GodGuide, step, callback) {
        let { args } = step.command;
        godGuide.find(args, (node) => {
            godGuide._targetNode = node;

            //点击确认
            node.once(cc.Node.EventType.TOUCH_END, () => {
                console.warn('节点被点击');
                //任务完成
                callback();
            });
            //触摸模拟
            let autorun = godGuide.getTask().autorun;
            if (autorun) {
                godGuide.touchSimulation(node);
            }
        });
    }

    //定位节点，显示一个手指动画
    static finger(godGuide: GodGuide, step, callback) {
        let { args } = step.command;
        godGuide._targetNode = null;
        //定位节点
        godGuide.find(args, (node: cc.Node) => {
            //手指动画
            godGuide.fingerToNode(node, () => {
                if (!node || node.name.length == 0) {
                    callback();
                    return;
                }
                godGuide._targetNode = node;
                //点击确认
                node.once(cc.Node.EventType.TOUCH_END, () => {
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
    }

    //文本指令
    static text(godGuide: GodGuide, step, callback) {
        let { role, args, positionY } = step.command;
        if (args && (typeof args === 'string' || typeof args === 'number')) {
            args = [args];
        }

        //触摸模拟
        // let autorun = godGuide.getTask().autorun;

        let index = 0;
        //顺序显示文本
        async.eachSeries(args, (str, cb) => {
            let flag = false;

            godGuide.showText(str, role, positionY || 0, () => {
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
    }

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
    static dialogue(godGuide, step, callback) {
        let { args } = step.command;
        if (args && (typeof args === 'string' || typeof args === 'number')) {
            args = [args];
        }

        //触摸模拟
        let autorun = godGuide.getTask().autorun;

        let index = 0;
        //顺序显示文本
        async.eachSeries(args, (str, cb) => {
            let flag = false;
            let next = () => {
                if (++index >= args.length - 1) {
                    godGuide._dialogue.active = false;
                    flag = true;
                    cb();
                    return;
                } else {
                    if (flag) {
                        return;
                    }
                    flag = true;
                    godGuide._dialogue.active = false;
                    cb();
                }
            }

            godGuide.showDialogue(str, () => {//点击回调
                next();
            });

            //自动引导
            if (autorun) {
                setTimeout(() => {
                    if (flag) {
                        return;
                    }
                    flag = true;
                    cb();
                }, 10000);
            }
        }, callback);
    }

    public static condition() {

    }
};