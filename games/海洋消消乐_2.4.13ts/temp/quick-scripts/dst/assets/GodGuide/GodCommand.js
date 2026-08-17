
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/GodCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXEdvZENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0dBRUc7QUFDSCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsTUFBTTtBQUNOO0lBQUE7SUFrTUEsQ0FBQztJQXZMRyxNQUFNO0lBQ0Msa0JBQU8sR0FBZCxVQUFlLFFBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVE7UUFDdkMsSUFBQSxJQUFJLEdBQUssSUFBSSxDQUFDLE9BQU8sS0FBakIsQ0FBa0I7UUFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQyxJQUFJO1lBQ3JCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBRTVCLE1BQU07WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEIsTUFBTTtnQkFDTixRQUFRLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtZQUNOLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDekMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGVBQWU7SUFDUixpQkFBTSxHQUFiLFVBQWMsUUFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUTtRQUN0QyxJQUFBLElBQUksR0FBSyxJQUFJLENBQUMsT0FBTyxLQUFqQixDQUFrQjtRQUM1QixRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM1QixNQUFNO1FBQ04sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFB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QUcsSUFBSSxDQUFDO29CQUNaLEVBQUUsRUFBRSxDQUFDO2dCQUNULENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNiO1FBQ0wsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFYSxvQkFBUyxHQUF2QjtJQUVBLENBQUM7SUEvTGUsbUJBQVEsR0FBVyxVQUFVLENBQUMsQ0FBQSxLQUFLO0lBQ25DLGlCQUFNLEdBQVcsUUFBUSxDQUFDLENBQUEsV0FBVztJQUNyQyxlQUFJLEdBQVcsTUFBTSxDQUFDLENBQUEsTUFBTTtJQUM1QixrQkFBTyxHQUFXLFNBQVMsQ0FBQyxDQUFBLE1BQU07SUFDbEMsZUFBSSxHQUFXLE1BQU0sQ0FBQyxDQUFBLE1BQU07SUFFNUIsbUJBQVEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBMEw5SCxpQkFBQztDQWxNRCxBQWtNQyxJQUFBO0FBbE1ZLGdDQUFVO0FBa010QixDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdvZEd1aWRlIGZyb20gXCIuL0dvZEd1aWRlXCI7XG5cbi8qKlxuICogenhoXG4gKi9cbmxldCBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jJyk7XG4vL+agueaNruWRveS7pFxuZXhwb3J0IGNsYXNzIEdvZENvbW1hbmQge1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IERJQUxPR1VFOiBzdHJpbmcgPSAnZGlhbG9ndWUnOy8v5a+56K+d5qGGXG4gICAgc3RhdGljIHJlYWRvbmx5IEZJTkdFUjogc3RyaW5nID0gJ2Zpbmdlcic7Ly/oioLngrnlrprkvY3liqDmiYvmjIfmjIflvJVcbiAgICBzdGF0aWMgcmVhZG9ubHkgVEVYVDogc3RyaW5nID0gJ3RleHQnOy8v5paH5pys5pi+56S6XG4gICAgc3RhdGljIHJlYWRvbmx5IExPQ0FUT1I6IHN0cmluZyA9ICdsb2NhdG9yJzsvL+iKgueCueWumuS9jVxuICAgIHN0YXRpYyByZWFkb25seSBTQVZFOiBzdHJpbmcgPSAnc2F2ZSc7Ly/kv53lrZjov5vluqZcblxuICAgIHN0YXRpYyByZWFkb25seSB0eXBlTGlzdCA9IFtHb2RDb21tYW5kLkRJQUxPR1VFLCBHb2RDb21tYW5kLkZJTkdFUiwgR29kQ29tbWFuZC5URVhULCBHb2RDb21tYW5kLkxPQ0FUT1IsIEdvZENvbW1hbmQuU0FWRV07XG5cblxuICAgIC8v5a6a5L2N6IqC54K5XG4gICAgc3RhdGljIGxvY2F0b3IoZ29kR3VpZGU6IEdvZEd1aWRlLCBzdGVwLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQgeyBhcmdzIH0gPSBzdGVwLmNvbW1hbmQ7XG4gICAgICAgIGdvZEd1aWRlLmZpbmQoYXJncywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGdvZEd1aWRlLl90YXJnZXROb2RlID0gbm9kZTtcblxuICAgICAgICAgICAgLy/ngrnlh7vnoa7orqRcbiAgICAgICAgICAgIG5vZGUub25jZShjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ+iKgueCueiiq+eCueWHuycpO1xuICAgICAgICAgICAgICAgIC8v5Lu75Yqh5a6M5oiQXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy/op6bmkbjmqKHmi59cbiAgICAgICAgICAgIGxldCBhdXRvcnVuID0gZ29kR3VpZGUuZ2V0VGFzaygpLmF1dG9ydW47XG4gICAgICAgICAgICBpZiAoYXV0b3J1bikge1xuICAgICAgICAgICAgICAgIGdvZEd1aWRlLnRvdWNoU2ltdWxhdGlvbihub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/lrprkvY3oioLngrnvvIzmmL7npLrkuIDkuKrmiYvmjIfliqjnlLtcbiAgICBzdGF0aWMgZmluZ2VyKGdvZEd1aWRlOiBHb2RHdWlkZSwgc3RlcCwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHsgYXJncyB9ID0gc3RlcC5jb21tYW5kO1xuICAgICAgICBnb2RHdWlkZS5fdGFyZ2V0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8v5a6a5L2N6IqC54K5XG4gICAgICAgIGdvZEd1aWRlLmZpbmQoYXJncywgKG5vZGU6IGNjLk5vZGUpID0+IHtcbiAgICAgICAgICAgIC8v5omL5oyH5Yqo55S7XG4gICAgICAgICAgICBnb2RHdWlkZS5maW5nZXJUb05vZGUobm9kZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbm9kZSB8fCBub2RlLm5hbWUubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnb2RHdWlkZS5fdGFyZ2V0Tm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgLy/ngrnlh7vnoa7orqRcbiAgICAgICAgICAgICAgICBub2RlLm9uY2UoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybign6IqC54K56KKr54K55Ye7Jyk7XG4gICAgICAgICAgICAgICAgICAgIC8v5Lu75Yqh5a6M5oiQXG4gICAgICAgICAgICAgICAgICAgIGdvZEd1aWRlLl90YXJnZXROb2RlICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy/op6bmkbjmqKHmi59cbiAgICAgICAgICAgIC8vIGxldCBhdXRvcnVuID0gZ29kR3VpZGUuZ2V0VGFzaygpLmF1dG9ydW47XG4gICAgICAgICAgICAvLyBpZiAoYXV0b3J1bikge1xuICAgICAgICAgICAgLy8gICAgIGdvZEd1aWRlLnRvdWNoU2ltdWxhdGlvbihub2RlKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/mlofmnKzmjIfku6RcbiAgICBzdGF0aWMgdGV4dChnb2RHdWlkZTogR29kR3VpZGUsIHN0ZXAsIGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB7IHJvbGUsIGFyZ3MsIHBvc2l0aW9uWSB9ID0gc3RlcC5jb21tYW5kO1xuICAgICAgICBpZiAoYXJncyAmJiAodHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmdzID09PSAnbnVtYmVyJykpIHtcbiAgICAgICAgICAgIGFyZ3MgPSBbYXJnc107XG4gICAgICAgIH1cblxuICAgICAgICAvL+inpuaRuOaooeaLn1xuICAgICAgICAvLyBsZXQgYXV0b3J1biA9IGdvZEd1aWRlLmdldFRhc2soKS5hdXRvcnVuO1xuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIC8v6aG65bqP5pi+56S65paH5pysXG4gICAgICAgIGFzeW5jLmVhY2hTZXJpZXMoYXJncywgKHN0ciwgY2IpID0+IHtcbiAgICAgICAgICAgIGxldCBmbGFnID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGdvZEd1aWRlLnNob3dUZXh0KHN0ciwgcm9sZSwgcG9zaXRpb25ZIHx8IDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmxhZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gaWYgKGluZGV4KysgPj0gYXJncy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAvLyAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICAvLyAgICAgY2IoKTtcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIC8v6Ieq5Yqo5byV5a+8XG4gICAgICAgICAgICAvLyBpZiAoYXV0b3J1bikge1xuICAgICAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICBpZiAoZmxhZykge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgLy8gICAgICAgICBjYigpO1xuICAgICAgICAgICAgLy8gICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLy8gLy/mlofmnKzmjIfku6RcbiAgICAvLyBzdGF0aWMgdGV4dChnb2RHdWlkZTogR29kR3VpZGUsIHN0ZXAsIGNhbGxiYWNrKSB7XG4gICAgLy8gICAgIGxldCB7IGFyZ3MgfSA9IHN0ZXAuY29tbWFuZDtcbiAgICAvLyAgICAgaWYgKGFyZ3MgJiYgKHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJncyA9PT0gJ251bWJlcicpKSB7XG4gICAgLy8gICAgICAgICBhcmdzID0gW2FyZ3NdO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgLy/op6bmkbjmqKHmi59cbiAgICAvLyAgICAgbGV0IGF1dG9ydW4gPSBnb2RHdWlkZS5nZXRUYXNrKCkuYXV0b3J1bjtcblxuICAgIC8vICAgICBsZXQgaW5kZXggPSAwO1xuICAgIC8vICAgICAvL+mhuuW6j+aYvuekuuaWh+acrFxuICAgIC8vICAgICBhc3luYy5lYWNoU2VyaWVzKGFyZ3MsIChzdHIsIGNiKSA9PiB7XG4gICAgLy8gICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgbGV0IG5leHQgPSAoKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgaWYgKCsraW5kZXggPj0gYXJncy5sZW5ndGggLSAxKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3RlcC0tLS0tLS0tLS0tLS0+JyxzdGVwKVxuICAgIC8vICAgICAgICAgICAgICAgICBjYigpO1xuICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKGZsYWcpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9XG5cbiAgICAvLyAgICAgICAgIGdvZEd1aWRlLnNob3dUZXh0KHN0ciwgKCkgPT4gey8v54K55Ye75Zue6LCDXG4gICAgLy8gICAgICAgICAgICAgbmV4dCgpO1xuICAgIC8vICAgICAgICAgfSk7XG5cbiAgICAvLyAgICAgICAgIC8v6Ieq5Yqo5byV5a+8XG4gICAgLy8gICAgICAgICBpZiAoYXV0b3J1bikge1xuICAgIC8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgLy8gICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0sIGNhbGxiYWNrKTtcbiAgICAvLyB9XG5cbiAgICAvL+WvueivneahhlxuICAgIHN0YXRpYyBkaWFsb2d1ZShnb2RHdWlkZSwgc3RlcCwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHsgYXJncyB9ID0gc3RlcC5jb21tYW5kO1xuICAgICAgICBpZiAoYXJncyAmJiAodHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmdzID09PSAnbnVtYmVyJykpIHtcbiAgICAgICAgICAgIGFyZ3MgPSBbYXJnc107XG4gICAgICAgIH1cblxuICAgICAgICAvL+inpuaRuOaooeaLn1xuICAgICAgICBsZXQgYXV0b3J1biA9IGdvZEd1aWRlLmdldFRhc2soKS5hdXRvcnVuO1xuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIC8v6aG65bqP5pi+56S65paH5pysXG4gICAgICAgIGFzeW5jLmVhY2hTZXJpZXMoYXJncywgKHN0ciwgY2IpID0+IHtcbiAgICAgICAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoKytpbmRleCA+PSBhcmdzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZ29kR3VpZGUuX2RpYWxvZ3VlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGdvZEd1aWRlLl9kaWFsb2d1ZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdvZEd1aWRlLnNob3dEaWFsb2d1ZShzdHIsICgpID0+IHsvL+eCueWHu+Wbnuiwg1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL+iHquWKqOW8leWvvFxuICAgICAgICAgICAgaWYgKGF1dG9ydW4pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZsYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbmRpdGlvbigpIHtcblxuICAgIH1cbn07Il19