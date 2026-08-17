import { Util } from "../../../Base/Utils/Util";

//https://mini-game-angzhou.myqcloud.com/soe/wechat
//http://192.168.56.47/wechat/soe

export const APPID = 'wxf56baeaa289ce6cd';
/**最大体力值 */
export const NewbieOpt: boolean = false;
export const MaxPowerCount: number = 30;
export const RunTimeGate = 60;
export const MinOfflineTime = 3;
export const BrokenConchHp: number = 1;

export const ROOM_DETAIL_SCALE = 1.5;

export const FallMaxGateLimit = 1 / 30;

export const PowerConfig = {
    /**加一次的间隔时间 */
    NormalTime: 8 * 60,
    /**正常时间段增加量 */
    NormalCount: 1,
    /**新通关奖励 */
    NewLvCount: 5,
    /**每关的消耗 */
    LvConsumption: 5
}

export const TempLoadingTip = {
    1: "合成八爪鱼",
    2: "八爪鱼爆炸时相邻的元素也会被消除哦"
}

export const WaringTips = {
    PowerNotEnough: '能量不够了呢!',
    PropNotEnough: '道具数量不够了呢!',
    CantUseForThat: '不能在当前位置使用!',
    NoElimate: '没有消除的元素啦,帮您重置!',
    PropAdd3StepTips: '给您加上了3步呢!',
    PropResetGrid: '给您重新搞了一下呢!',
    PowerMax: '体力已满',
    OfflineReward: '离线期间给你加了',
    NoMoreCoin: '金币不足',
    NoMoreDiamond: '钻石不足',
    BuyOk: '购买成功',
    UnlockProp: '解锁了新道具!',
    CannotOpenIsland: '达到%s颗星开启海岛',
    ShareTip: `成功分享即可获得"<color=#FE980A>金币 x%s</c>"~`
}

/**每日任务的完成类型 */
export const ConditionType = {
    /**挂时间任务 */
    time: 'time',
    /**合成任务 */
    merge: 'merge',
    /**使用道具 */
    doprop: 'doporp',
    /**游戏次数 */
    gameCount: 'game',
    /**累计收集任务 CellType */
    collect: 'collect'
}


export const Scene = {
    Loading: 'LoadingScene',
    Map: 'MapScene',
    Match: 'Match3',
    Level: 'LevelScene',
    Hotel: 'HotelScene'
}

export enum SceneTaskKey {
    ShowTargetDlg
}

export enum NodePoolKey {
    GroundCell = 10,
    GroundMulti,
    Cell,
    UpGroundCell,
    BombEff,
    FishBombEff,
    RowColEff,
    LittleBomb,
    RainbowBomb,
    ShootStar,
    OverShoot,
    MergeBomb,
    BombAndBomb,
    BombAndFish,
    HaimaAndHetun,
    /** 海马+海马 */HaimaAndHaima,
    ZhangyuAndJianyu,
    hetuanAndJianyu,
    HaimaAndZhangyu,
    Plane,
    ComboEff,
    ZyJump,
    ZyJumpOver,
    ZyJumpElimate,
    ShuiCao,
    Dot,
    TeshuLight,
    LeafBroken,
    BoxBroken,
    Broken,
    ComplexGround,
    GemNode,
    Firefly,
    AddScoreEff,
    HaiMaOver,
    AddScoreOverEff,
    RankItem,
    Chuizi,
    ShanhuAnim,
    Roket
}
Util.Enum.convert2EventEnum(NodePoolKey);




/**本地存储键值 */
export enum NativeKey {
    LvDataKey = 10000,
    BoxGifts,
    PlayerInfo,
    Sound,
    LastTime,
    DailyTime,
    DailyCollect,
    MonthCollect,
    Collect,
    DailyMerge,
    MonthMerge,
    Merge,
    DailyGameCount,
    MonthGameCount,
    GameCount,
    DailyUsePropCount,
    MonthUsePropCount,
    UsePropCount,
    CurrencyTaskKey,
    HotelSlotData,
    ZanList,
    LevelFailTag,//关卡失败次数标志
    LevelFailShareTag,//关卡失败分享一天只能一次
    LevelFailShareTimeTag,//关卡失败分享一天只能一次Time
}

export enum GroundType {
    None = 20000,
    Water,
    MoneyTree,
    Crab,
    Tuituji,
    Leaves, //分界线.下面是有lv的
    Flower,
    /**萤火虫 */
    Firefly,
    Ivy,
    Mushroom
}

export enum UpGroundType {
    None = 10000,
    Box,
    Lock,
    Ice,
    Portal,
    Stone,
    Nov_grass = 11000,       //引导,困住章鱼的草
    Nov_conch
}

/**道具类型 */
export enum PropType {
    /**贝壳炸弹 */
    BeikeBomb = 100,
    /**单个锤子 */
    Hammer,
    /**重置棋盘 */
    ResetGrid,
    /**冲浪板 */
    Board,
    /**加三步 */
    Add3Step,
    /**开始随机炸弹 */
    StartBomb,
    /**开始随机星星 */
    StartStar,
    /**精力瓶(小) */
    PowerBottle1,
    /**精力瓶(大) */
    PowerBottle2,

    /**体力单价,暂时放这..到时候抽出 */
    PowerUnitPrice = 200
}

/**元素类型 */
export enum CellType {
    Back = -2,
    Empty = -1,

    Apple = 0,
    Leaf,
    Grape,
    Pear,
    Water,
    /**会长的花儿 */
    Flower,
    /**香蕉,只能消除旁边的进行消除 */
    Banana,
    /**冰淇淋,只能通过固定出口消除! */
    IceCream,
    /**椰子,猴子摇出来的玩意,普通元素 */
    Coconut,
    /**破碎的贝壳,只能通过消除旁边的消除 */
    BrokenConch,
    /**爆炸鱼 */
    Fish,
    /**完整的贝壳,只能被小女孩儿踩消除 */
    Conch,
    /**水杯,只能通过旁边的消除,会得到指定的步数! */
    BottleCaps,
    /***土地,只能消除旁边的进行消除 */
    Ground,
    /**圆形炸弹 气泡鱼*/
    Bomb1 = 100,
    /**横向炸弹 剑鱼 */
    Bomb2,
    /**竖向炸弹 */
    Bomb3,
    /**章鱼 */
    Bomb4,
    /**彩虹炸弹 海马*/
    Bomb5,
    /**螃蟹  */
    Bomb6,
    /**十字蛋  */
    Bomb7,
    Bomb100 = 199,

    Girl,
    Lighting,

    Temp = 200,
}

/**销毁的标记类型 */
export enum ElimateType {
    Default,
    Beside,
    Girl,
    /**圆形炸弹 */
    Bomb1 = 100,
    /**横向炸弹 */
    Bomb2,
    /**竖向炸弹 */
    Bomb3,
    /**章鱼 */
    Bomb4,
    /**彩虹炸弹 */
    Bomb5,
    /**螃蟹炸弹 */
    Bomb6,
    ThreeOctopus,
    ThreeRowAndCol,
    RowAndCol,
    DoubleBomb,
    Tuituji,
    Rocket,
    All,
    Prop = 200,
    Hammer
}

export const ScoreConfig = {
    Merge: 100,
    Normal: { 3: 60, 4: 80, 5: 100 },
    BombElimate: {
        [CellType.Bomb1]: 500,
        [CellType.Bomb2]: 300,
        [CellType.Bomb3]: 300,
        [CellType.Bomb4]: 300,
        [CellType.Bomb5]: 500
    },
    SingleElimate: {
        [CellType.Bomb1]: 40,
        [CellType.Bomb2]: 40,
        [CellType.Bomb3]: 40,
        [CellType.Bomb4]: 40,
        [CellType.Bomb5]: 40
    },
    Combo: {
        0: 600, 1: 800, 2: 1000
    },
    Special: {
        [UpGroundType.Box]: 500,
        [GroundType.Leaves]: 500,
        [UpGroundType.Lock]: 500,
        [UpGroundType.Ice]: 500,
        [CellType.Banana]: 500,
        [CellType.IceCream]: 500,
        gnome: 5000
    },
    OverStep: {
        1: 5000, 2: 6000, 3: 7000, 4: 8000, 5: 8000, 6: 9000, 7: 10000
    }
}

export enum ComboLevel {
    great = 3,
    awesome = 6,
    fantastic = 9,
    blossom = 12
}

export enum comboRatio {
    great = 0,
    awesome,
    fantastic,
    blossom
}

export enum GameState {
    preReady,
    Normal,
    Pause,
    Win,
    Fail,
    ChangeBomb,
    End
}

export const WX_OPENDATA_KEY = {
    SCORE: "SCORE"
}

export const WX_OPENDATA_COMMAND_KEY = {
    SHOW_RANK: "SHOW_RANK",      // 显示排行榜
    HIDE_RANK: "HIDE_RANK",      // 隐藏排行榜
    NEXT_PAGE: "NEXT_PAGE",      // 下一页
    PREV_PAGE: "PREV_PAGE",      // 上一页
    SWITCH_TAB: "SWITCH_TAB",    // 切换标签，好友排行榜和世界排行榜
    SHOW_FRIEND_COMP: "SHOW_FRIEND_COMP",  // 显示好友对比，用于结算页面时显示的用户当前排名的附近3个用户数据
    SHOW_BEYOND_FRIEND: "SHOW_BEYOND_FRIEND", // 显示超越好友
    UPDATE_BEYOND_FRIEND: "UPDATE_BEYOND_FRIEND", // 刷新超越好友
}