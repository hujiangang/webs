import { Util } from "../../../Base/Utils/Util";
import { RunTimeGate } from "./Constant";

export const GapTime = {
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
    FallingSpeed: 18 / (RunTimeGate / 60) * RunTimeGate,
    /**结束时掉落的速度 */
    EndFallingSpeed: 2 / (RunTimeGate / 60) * RunTimeGate,
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
    BeikeSuctionSpeed: () => { return Util.Tool.rangeInt(400, 700) },
    /**贝壳吸入旋转方向 true 顺时针 false 逆时针 */
    IsCounterClockWise: true,
    /**炸弹与炸弹合成时元素交换时的销毁时间 */
    BombMergeBombChangeTime: 2.6, // 3.1
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
} 