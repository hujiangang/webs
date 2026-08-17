export enum ViewZorder {
    Scene = 20,     //场景层 
    MenuPanel = 80, //顶部和底部菜单栏层级 
    UI = 100,       //UI层 
    Dialog = 200,   //对话框层 
    Tips = 300,     //提示层 
    Guide = 400,    //引导层 
    Notice = 500,   //通知层 
    Loading = 600   //loading层 
}

export enum UIHudDef {
    MenuPanel,
    GuideLayer,
    TalkPanel,
    GameOverFail,
    GameOverWin,
    GameShowTarget,
    StoryTalkPanel,
    GameLoading,
    SelectShowTarget,
    OverShow,
    GamePause,
    BuildSuccess,
    Bag,
    OpenBox,
    ShopPanel,
    BuyProp,
    CloudView,      //过度云层
    NoticePanel,
    GMView,         //GM面板
    PropDropView,   //道具飘落界面动画
    RoomFinishView, //海岛房间完成页面
    CommonReward,   //通用获取奖励界面
    DailyTaskPanel,
    FriendRank,
    UIGameFailEncourage,//关卡失败购买步数
    MoreCoin,



}
/**
 * @param hold 常驻内存，不会自动释放
 */

export default new Map<UIHudDef, { prefabPath: string, viewZOrder: ViewZorder, hold?: boolean, tween?: boolean, blackBg?: boolean }>([
    [UIHudDef.MenuPanel, { prefabPath: "MenuPanel", viewZOrder: ViewZorder.MenuPanel, hold: true, tween: false, blackBg: false }],
    [UIHudDef.TalkPanel, { prefabPath: "TalkPanel", viewZOrder: ViewZorder.Dialog, hold: true, tween: false, blackBg: false }],
    [UIHudDef.GuideLayer, { prefabPath: "GuideLayer", viewZOrder: ViewZorder.Guide, tween: false, blackBg: false }],
    [UIHudDef.GameOverFail, { prefabPath: "GameFail", viewZOrder: ViewZorder.UI, tween: false }],
    [UIHudDef.GameOverWin, { prefabPath: "GameWin", viewZOrder: ViewZorder.UI, tween: false }],
    [UIHudDef.GameShowTarget, { prefabPath: "GameShowTarget", tween: false, viewZOrder: ViewZorder.UI, blackBg: false }],
    [UIHudDef.SelectShowTarget, { prefabPath: "SelectShowTarget", viewZOrder: ViewZorder.UI, tween: false }],

    [UIHudDef.OverShow, { prefabPath: "OverShow", viewZOrder: ViewZorder.UI, blackBg: false }],
    [UIHudDef.GamePause, { prefabPath: "GamePause", viewZOrder: ViewZorder.UI, tween: false }],
    [UIHudDef.BuildSuccess, { prefabPath: "BuildSuccess", viewZOrder: ViewZorder.UI }],
    [UIHudDef.StoryTalkPanel, { prefabPath: "StoryTalkPanel", viewZOrder: ViewZorder.UI }],
    [UIHudDef.GameLoading, { prefabPath: "GameLoading", viewZOrder: ViewZorder.UI, tween: false }],
    [UIHudDef.Bag, { prefabPath: "Bag", viewZOrder: ViewZorder.UI }],
    [UIHudDef.OpenBox, { prefabPath: "OpenBox", viewZOrder: ViewZorder.UI, blackBg: false }],
    [UIHudDef.BuyProp, { prefabPath: "BuyPropPanel", viewZOrder: ViewZorder.UI, tween: false, blackBg: false }],
    [UIHudDef.CloudView, { prefabPath: "CloudView", viewZOrder: ViewZorder.UI, tween: false, blackBg: false }],
    [UIHudDef.NoticePanel, { prefabPath: "NoticePanel", viewZOrder: ViewZorder.UI }],
    [UIHudDef.GMView, { prefabPath: "GMView", viewZOrder: ViewZorder.UI }],
    [UIHudDef.PropDropView, { prefabPath: "PropDropView", viewZOrder: ViewZorder.UI, tween: false, blackBg: false }],
    [UIHudDef.RoomFinishView, { prefabPath: "RoomFinishView", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.CommonReward, { prefabPath: "CommonReward", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.ShopPanel, { prefabPath: "ShopPanel", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.DailyTaskPanel, { prefabPath: "DailyTaskPanel", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.FriendRank, { prefabPath: "FriendRank", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.UIGameFailEncourage, { prefabPath: "GameFailEncourage", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.MoreCoin, { prefabPath: "MoreCoin", viewZOrder: ViewZorder.UI, tween: false, blackBg: true }],

]);