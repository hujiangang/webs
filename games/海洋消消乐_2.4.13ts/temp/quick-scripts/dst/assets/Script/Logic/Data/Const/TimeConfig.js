
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Data/Const/TimeConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '46e7arqHZZE64UF7dBNOyXy', 'TimeConfig');
// Script/Logic/Data/Const/TimeConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GapTime = void 0;
var Util_1 = require("../../../Base/Utils/Util");
var Constant_1 = require("./Constant");
exports.GapTime = {
    /**全局消除后恢复暂停的间隔时间 */
    DoubleRainbowResume: 1.0,
    /**双彩虹全局消除波浪的间隔时间 */
    DoubleRainbowWaves: 0.15,
    /**三个章鱼创建的间隔时间 */
    ThreePlaneCreate: 0.2,
    /**创建章鱼后延迟多久射出去 */
    CreatePlaneDelayTime: 0.1,
    /**爆炸时,行与行波动的间隔时间 */
    BombShocks: 0.15,
    /**延迟销毁,横竖炸弹 */
    DelayDestoryColAndRow: 0.2,
    /**贝壳炸弹爆炸后销毁物的延时销毁时间 */
    NormalBombDelayElimate: 1.32,
    /**贝壳炸完,上面的元素置空时间*/
    DelayDestoryBomb: 0.5,
    /**延迟销毁,章鱼炸完,上面的元素置空时间*/
    DelayDestoryOctopus: 0.0,
    /**延迟销毁,鱼炸弹,上面的元素置空时间 */
    DelayDestoryFishBomb: 0.3,
    /**元素交换时的时间 */
    ExchangeTime: 0.15,
    /**消除匹配提示间隔时间 */
    PromptElimate: 4,
    /**掉落时的速度 */
    FallingSpeed: 18 / (Constant_1.RunTimeGate / 60) * Constant_1.RunTimeGate,
    /**结束时掉落的速度 */
    EndFallingSpeed: 2 / (Constant_1.RunTimeGate / 60) * Constant_1.RunTimeGate,
    /**横竖炸弹自己销毁的时间 */
    RowAndColSelfElimate: 0.5,
    /**横竖炸弹单个销毁间隔时间 */
    RowAndColElimate: 0.10,
    /**合成普通炸弹速度 */
    MergeBombSpeed: 0.2,
    /**章鱼炸弹爆炸后销毁物的延时销毁时间 */
    OctopusDelayElimate: 0.3,
    /**贝壳震荡前延时 */
    BombPreShocks: 1.85,
    /**爆炸鱼震荡前延时 */
    FishBombPreShocks: 0.58,
    /**炸弹鱼爆炸后销毁物的悬空时间 */
    FishBombDelayElimate: 0.8,
    /**彩虹中间销毁后上面元素下落的置空时间 */
    RainbowCenterDelayElimate: 1.6,
    /**彩虹喷星星的总时间 */
    RainbowShootStarCount: 1,
    /**彩虹喷完星星后延时销毁所有元素的时间 */
    RainbowShootOverElimate: 0.2,
    /**星星射速 */
    StarsShootSpeed: 0.2,
    /**星星射击目标后,延迟销毁时间 */
    StarsElimate: 0.5,
    /**普通收集物的移动速度 */
    CollectMoveSpeed: 1500,
    /**章鱼跳跃速度 */
    OctopusJumpSpeed: 0.7,
    /** 从激活贝壳到开始抖动的延时时间 */
    BeikeDelayShaking: 0.3,
    /** 从贝壳抖动到开始吸入的延时时间 */
    BeikeDelaySuction: 1,
    /** 贝壳吸入速度 */
    BeikeSuctionSpeed: function () { return Util_1.Util.Tool.rangeInt(400, 700); },
    /**贝壳吸入旋转方向 true 顺时针 false 逆时针 */
    IsCounterClockWise: true,
    /**炸弹与炸弹合成时元素交换时的销毁时间 */
    BombMergeBombChangeTime: 2.6,
    /**破碎物品替换下一状态延时时间 */
    DelayChangeBroken: 0.3,
    /**延时小光点时间 */
    DelayLightPoint: 0.3,
    /**乌龟游出位置的时间(上方元素开始掉落) */
    TurtlesOver: 3.6,
    /**螃蟹出手的时间 */
    CrabStartElimate: 3,
    /**螃蟹出手后,上方元素掉落的时间 */
    CrabStartedFallGap: 0.8,
    /**螃蟹出手的速度 */
    CrabElimateGap: 0.2,
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcQ29uc3RcXFRpbWVDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBQ2hELHVDQUF5QztBQUU1QixRQUFBLE9BQU8sR0FBRztJQUNuQixvQkFBb0I7SUFDcEIsbUJBQW1CLEVBQUUsR0FBRztJQUN4QixvQkFBb0I7SUFDcEIsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixpQkFBaUI7SUFDakIsZ0JBQWdCLEVBQUUsR0FBRztJQUNyQixrQkFBa0I7SUFDbEIsb0JBQW9CLEVBQUUsR0FBRztJQUN6QixvQkFBb0I7SUFDcEIsVUFBVSxFQUFFLElBQUk7SUFDaEIsZUFBZTtJQUNmLHFCQUFxQixFQUFFLEdBQUc7SUFDMUIsdUJBQXVCO0lBQ3ZCLHNCQUFzQixFQUFFLElBQUk7SUFDNUIsbUJBQW1CO0lBQ25CLGdCQUFnQixFQUFFLEdBQUc7SUFDckIsd0JBQXdCO0lBQ3hCLG1CQUFtQixFQUFFLEdBQUc7SUFDeEIsd0JBQXdCO0lBQ3hCLG9CQUFvQixFQUFFLEdBQUc7SUFDekIsY0FBYztJQUNkLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGdCQUFnQjtJQUNoQixhQUFhLEVBQUUsQ0FBQztJQUNoQixZQUFZO0lBQ1osWUFBWSxFQUFFLEVBQUUsR0FBRyxDQUFDLHNCQUFXLEdBQUcsRUFBRSxDQUFDLEdBQUcsc0JBQVc7SUFDbkQsY0FBYztJQUNkLGVBQWUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxzQkFBVyxHQUFHLEVBQUUsQ0FBQyxHQUFHLHNCQUFXO0lBQ3JELGlCQUFpQjtJQUNqQixvQkFBb0IsRUFBRSxHQUFHO0lBQ3pCLGtCQUFrQjtJQUNsQixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLGNBQWM7SUFDZCxjQUFjLEVBQUUsR0FBRztJQUNuQix1QkFBdUI7SUFDdkIsbUJBQW1CLEVBQUUsR0FBRztJQUN4QixhQUFhO0lBQ2IsYUFBYSxFQUFFLElBQUk7SUFDbkIsY0FBYztJQUNkLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsb0JBQW9CO0lBQ3BCLG9CQUFvQixFQUFFLEdBQUc7SUFDekIsd0JBQXdCO0lBQ3hCLHlCQUF5QixFQUFFLEdBQUc7SUFDOUIsZUFBZTtJQUNmLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsd0JBQXdCO0lBQ3hCLHVCQUF1QixFQUFFLEdBQUc7SUFDNUIsVUFBVTtJQUNWLGVBQWUsRUFBRSxHQUFHO0lBQ3BCLG9CQUFvQjtJQUNwQixZQUFZLEVBQUUsR0FBRztJQUNqQixnQkFBZ0I7SUFDaEIsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0QixZQUFZO0lBQ1osZ0JBQWdCLEVBQUUsR0FBRztJQUNyQixzQkFBc0I7SUFDdEIsaUJBQWlCLEVBQUUsR0FBRztJQUN0QixzQkFBc0I7SUFDdEIsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixhQUFhO0lBQ2IsaUJBQWlCLEVBQUUsY0FBUSxPQUFPLFdBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDaEUsaUNBQWlDO0lBQ2pDLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsd0JBQXdCO0lBQ3hCLHVCQUF1QixFQUFFLEdBQUc7SUFDNUIsb0JBQW9CO0lBQ3BCLGlCQUFpQixFQUFFLEdBQUc7SUFDdEIsYUFBYTtJQUNiLGVBQWUsRUFBRSxHQUFHO0lBQ3BCLHlCQUF5QjtJQUN6QixXQUFXLEVBQUUsR0FBRztJQUNoQixhQUFhO0lBQ2IsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQixxQkFBcUI7SUFDckIsa0JBQWtCLEVBQUUsR0FBRztJQUN2QixhQUFhO0lBQ2IsY0FBYyxFQUFFLEdBQUc7Q0FDdEIsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBSdW5UaW1lR2F0ZSB9IGZyb20gXCIuL0NvbnN0YW50XCI7XG5cbmV4cG9ydCBjb25zdCBHYXBUaW1lID0ge1xuICAgIC8qKuWFqOWxgOa2iOmZpOWQjuaBouWkjeaaguWBnOeahOmXtOmalOaXtumXtCAqL1xuICAgIERvdWJsZVJhaW5ib3dSZXN1bWU6IDEuMCxcbiAgICAvKirlj4zlvanombnlhajlsYDmtojpmaTms6LmtarnmoTpl7TpmpTml7bpl7QgKi9cbiAgICBEb3VibGVSYWluYm93V2F2ZXM6IDAuMTUsXG4gICAgLyoq5LiJ5Liq56ug6bG85Yib5bu655qE6Ze06ZqU5pe26Ze0ICovXG4gICAgVGhyZWVQbGFuZUNyZWF0ZTogMC4yLFxuICAgIC8qKuWIm+W7uueroOmxvOWQjuW7tui/n+WkmuS5heWwhOWHuuWOuyAqL1xuICAgIENyZWF0ZVBsYW5lRGVsYXlUaW1lOiAwLjEsXG4gICAgLyoq54iG54K45pe2LOihjOS4juihjOazouWKqOeahOmXtOmalOaXtumXtCAqL1xuICAgIEJvbWJTaG9ja3M6IDAuMTUsXG4gICAgLyoq5bu26L+f6ZSA5q+BLOaoquerlueCuOW8uSAqL1xuICAgIERlbGF5RGVzdG9yeUNvbEFuZFJvdzogMC4yLFxuICAgIC8qKui0neWjs+eCuOW8ueeIhueCuOWQjumUgOavgeeJqeeahOW7tuaXtumUgOavgeaXtumXtCAqL1xuICAgIE5vcm1hbEJvbWJEZWxheUVsaW1hdGU6IDEuMzIsXG4gICAgLyoq6LSd5aOz54K45a6MLOS4iumdoueahOWFg+e0oOe9ruepuuaXtumXtCovXG4gICAgRGVsYXlEZXN0b3J5Qm9tYjogMC41LFxuICAgIC8qKuW7tui/n+mUgOavgSznq6Dpsbzngrjlrows5LiK6Z2i55qE5YWD57Sg572u56m65pe26Ze0Ki9cbiAgICBEZWxheURlc3RvcnlPY3RvcHVzOiAwLjAsXG4gICAgLyoq5bu26L+f6ZSA5q+BLOmxvOeCuOW8uSzkuIrpnaLnmoTlhYPntKDnva7nqbrml7bpl7QgKi9cbiAgICBEZWxheURlc3RvcnlGaXNoQm9tYjogMC4zLFxuICAgIC8qKuWFg+e0oOS6pOaNouaXtueahOaXtumXtCAqL1xuICAgIEV4Y2hhbmdlVGltZTogMC4xNSxcbiAgICAvKirmtojpmaTljLnphY3mj5DnpLrpl7TpmpTml7bpl7QgKi9cbiAgICBQcm9tcHRFbGltYXRlOiA0LFxuICAgIC8qKuaOieiQveaXtueahOmAn+W6piAqL1xuICAgIEZhbGxpbmdTcGVlZDogMTggLyAoUnVuVGltZUdhdGUgLyA2MCkgKiBSdW5UaW1lR2F0ZSxcbiAgICAvKirnu5PmnZ/ml7bmjonokL3nmoTpgJ/luqYgKi9cbiAgICBFbmRGYWxsaW5nU3BlZWQ6IDIgLyAoUnVuVGltZUdhdGUgLyA2MCkgKiBSdW5UaW1lR2F0ZSxcbiAgICAvKirmqKrnq5bngrjlvLnoh6rlt7HplIDmr4HnmoTml7bpl7QgKi9cbiAgICBSb3dBbmRDb2xTZWxmRWxpbWF0ZTogMC41LFxuICAgIC8qKuaoquerlueCuOW8ueWNleS4qumUgOavgemXtOmalOaXtumXtCAqL1xuICAgIFJvd0FuZENvbEVsaW1hdGU6IDAuMTAsXG4gICAgLyoq5ZCI5oiQ5pmu6YCa54K45by56YCf5bqmICovXG4gICAgTWVyZ2VCb21iU3BlZWQ6IDAuMixcbiAgICAvKirnq6DpsbzngrjlvLnniIbngrjlkI7plIDmr4HniannmoTlu7bml7bplIDmr4Hml7bpl7QgKi9cbiAgICBPY3RvcHVzRGVsYXlFbGltYXRlOiAwLjMsXG4gICAgLyoq6LSd5aOz6ZyH6I2h5YmN5bu25pe2ICovXG4gICAgQm9tYlByZVNob2NrczogMS44NSxcbiAgICAvKirniIbngrjpsbzpnIfojaHliY3lu7bml7YgKi9cbiAgICBGaXNoQm9tYlByZVNob2NrczogMC41OCxcbiAgICAvKirngrjlvLnpsbzniIbngrjlkI7plIDmr4HniannmoTmgqznqbrml7bpl7QgKi9cbiAgICBGaXNoQm9tYkRlbGF5RWxpbWF0ZTogMC44LFxuICAgIC8qKuW9qeiZueS4remXtOmUgOavgeWQjuS4iumdouWFg+e0oOS4i+iQveeahOe9ruepuuaXtumXtCAqL1xuICAgIFJhaW5ib3dDZW50ZXJEZWxheUVsaW1hdGU6IDEuNixcbiAgICAvKirlvanombnllrfmmJ/mmJ/nmoTmgLvml7bpl7QgKi9cbiAgICBSYWluYm93U2hvb3RTdGFyQ291bnQ6IDEsXG4gICAgLyoq5b2p6Jm55Za35a6M5pif5pif5ZCO5bu25pe26ZSA5q+B5omA5pyJ5YWD57Sg55qE5pe26Ze0ICovXG4gICAgUmFpbmJvd1Nob290T3ZlckVsaW1hdGU6IDAuMixcbiAgICAvKirmmJ/mmJ/lsITpgJ8gKi9cbiAgICBTdGFyc1Nob290U3BlZWQ6IDAuMixcbiAgICAvKirmmJ/mmJ/lsITlh7vnm67moIflkI4s5bu26L+f6ZSA5q+B5pe26Ze0ICovXG4gICAgU3RhcnNFbGltYXRlOiAwLjUsXG4gICAgLyoq5pmu6YCa5pS26ZuG54mp55qE56e75Yqo6YCf5bqmICovXG4gICAgQ29sbGVjdE1vdmVTcGVlZDogMTUwMCxcbiAgICAvKirnq6Dpsbzot7Pot4PpgJ/luqYgKi9cbiAgICBPY3RvcHVzSnVtcFNwZWVkOiAwLjcsXG4gICAgLyoqIOS7jua/gOa0u+i0neWjs+WIsOW8gOWni+aKluWKqOeahOW7tuaXtuaXtumXtCAqL1xuICAgIEJlaWtlRGVsYXlTaGFraW5nOiAwLjMsXG4gICAgLyoqIOS7jui0neWjs+aKluWKqOWIsOW8gOWni+WQuOWFpeeahOW7tuaXtuaXtumXtCAqL1xuICAgIEJlaWtlRGVsYXlTdWN0aW9uOiAxLFxuICAgIC8qKiDotJ3lo7PlkLjlhaXpgJ/luqYgKi9cbiAgICBCZWlrZVN1Y3Rpb25TcGVlZDogKCkgPT4geyByZXR1cm4gVXRpbC5Ub29sLnJhbmdlSW50KDQwMCwgNzAwKSB9LFxuICAgIC8qKui0neWjs+WQuOWFpeaXi+i9rOaWueWQkSB0cnVlIOmhuuaXtumSiCBmYWxzZSDpgIbml7bpkoggKi9cbiAgICBJc0NvdW50ZXJDbG9ja1dpc2U6IHRydWUsXG4gICAgLyoq54K45by55LiO54K45by55ZCI5oiQ5pe25YWD57Sg5Lqk5o2i5pe255qE6ZSA5q+B5pe26Ze0ICovXG4gICAgQm9tYk1lcmdlQm9tYkNoYW5nZVRpbWU6IDIuNiwgLy8gMy4xXG4gICAgLyoq56C056KO54mp5ZOB5pu/5o2i5LiL5LiA54q25oCB5bu25pe25pe26Ze0ICovXG4gICAgRGVsYXlDaGFuZ2VCcm9rZW46IDAuMyxcbiAgICAvKirlu7bml7blsI/lhYnngrnml7bpl7QgKi9cbiAgICBEZWxheUxpZ2h0UG9pbnQ6IDAuMyxcbiAgICAvKirkuYzpvp/muLjlh7rkvY3nva7nmoTml7bpl7Qo5LiK5pa55YWD57Sg5byA5aeL5o6J6JC9KSAqL1xuICAgIFR1cnRsZXNPdmVyOiAzLjYsXG4gICAgLyoq6J6D6J+55Ye65omL55qE5pe26Ze0ICovXG4gICAgQ3JhYlN0YXJ0RWxpbWF0ZTogMyxcbiAgICAvKironoPon7nlh7rmiYvlkI4s5LiK5pa55YWD57Sg5o6J6JC955qE5pe26Ze0ICovXG4gICAgQ3JhYlN0YXJ0ZWRGYWxsR2FwOiAwLjgsXG4gICAgLyoq6J6D6J+55Ye65omL55qE6YCf5bqmICovXG4gICAgQ3JhYkVsaW1hdGVHYXA6IDAuMixcbn0gIl19