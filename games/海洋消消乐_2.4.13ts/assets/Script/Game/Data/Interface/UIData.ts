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
    GameOverFail = 3,
    GameOverWin = 4,
    GameShowTarget = 5,
    StoryTalkPanel = 6,
    GameLoading = 7,
    SelectShowTarget = 8,
    OverShow = 9,
    GamePause = 10,
    Bag = 12,
    OpenBox = 13,
    ShopPanel = 14,
    BuyProp = 15,
    NoticePanel = 17,
    GMView = 18,
    PropDropView = 19,
    CommonReward = 21,
    DailyTaskPanel = 22,
    UIGameFailEncourage = 24,
    MoreCoin = 25,
}
/**
 * @param hold 常驻内存，不会自动释放
 */

export default new Map<UIHudDef, { prefabPath: string, viewZOrder: ViewZorder, hold?: boolean, tween?: boolean, blackBg?: boolean }>([
    [UIHudDef.GameOverFail, { prefabPath: "GameFail", viewZOrder: ViewZorder.UI, tween: false }],
    [UIHudDef.GameOverWin, { prefabPath: "GameWin", viewZOrder: ViewZorder.UI, tween: false }],
    [UIHudDef.GameShowTarget, { prefabPath: "GameShowTarget", tween: false, viewZOrder: ViewZorder.UI, blackBg: false }],
    [UIHudDef.SelectShowTarget, { prefabPath: "SelectShowTarget", viewZOrder: ViewZorder.UI, tween: false }],

    [UIHudDef.OverShow, { prefabPath: "OverShow", viewZOrder: ViewZorder.UI, blackBg: false }],
    [UIHudDef.GamePause, { prefabPath: "GamePause", viewZOrder: ViewZorder.UI, tween: false }],
    [UIHudDef.StoryTalkPanel, { prefabPath: "StoryTalkPanel", viewZOrder: ViewZorder.UI }],
    [UIHudDef.GameLoading, { prefabPath: "GameLoading", viewZOrder: ViewZorder.UI, tween: false }],
    [UIHudDef.Bag, { prefabPath: "Bag", viewZOrder: ViewZorder.UI }],
    [UIHudDef.OpenBox, { prefabPath: "OpenBox", viewZOrder: ViewZorder.UI, blackBg: false }],
    [UIHudDef.BuyProp, { prefabPath: "BuyPropPanel", viewZOrder: ViewZorder.UI, tween: false, blackBg: false }],
    [UIHudDef.NoticePanel, { prefabPath: "NoticePanel", viewZOrder: ViewZorder.UI }],
    [UIHudDef.GMView, { prefabPath: "GMView", viewZOrder: ViewZorder.UI }],
    [UIHudDef.PropDropView, { prefabPath: "PropDropView", viewZOrder: ViewZorder.UI, tween: false, blackBg: false }],
    [UIHudDef.CommonReward, { prefabPath: "CommonReward", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.ShopPanel, { prefabPath: "ShopPanel", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.DailyTaskPanel, { prefabPath: "DailyTaskPanel", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.UIGameFailEncourage, { prefabPath: "GameFailEncourage", viewZOrder: ViewZorder.UI, tween: true, blackBg: true }],
    [UIHudDef.MoreCoin, { prefabPath: "MoreCoin", viewZOrder: ViewZorder.UI, tween: false, blackBg: true }],

]);