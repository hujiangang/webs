"use strict";
cc._RF.push(module, '1d2128QD3VMf5xFmwhX3Gze', 'UIData');
// Script/Logic/Data/Interface/UIData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIHudDef = exports.ViewZorder = void 0;
var ViewZorder;
(function (ViewZorder) {
    ViewZorder[ViewZorder["Scene"] = 20] = "Scene";
    ViewZorder[ViewZorder["MenuPanel"] = 80] = "MenuPanel";
    ViewZorder[ViewZorder["UI"] = 100] = "UI";
    ViewZorder[ViewZorder["Dialog"] = 200] = "Dialog";
    ViewZorder[ViewZorder["Tips"] = 300] = "Tips";
    ViewZorder[ViewZorder["Guide"] = 400] = "Guide";
    ViewZorder[ViewZorder["Notice"] = 500] = "Notice";
    ViewZorder[ViewZorder["Loading"] = 600] = "Loading"; //loading层 
})(ViewZorder = exports.ViewZorder || (exports.ViewZorder = {}));
var UIHudDef;
(function (UIHudDef) {
    UIHudDef[UIHudDef["MenuPanel"] = 0] = "MenuPanel";
    UIHudDef[UIHudDef["GuideLayer"] = 1] = "GuideLayer";
    UIHudDef[UIHudDef["TalkPanel"] = 2] = "TalkPanel";
    UIHudDef[UIHudDef["GameOverFail"] = 3] = "GameOverFail";
    UIHudDef[UIHudDef["GameOverWin"] = 4] = "GameOverWin";
    UIHudDef[UIHudDef["GameShowTarget"] = 5] = "GameShowTarget";
    UIHudDef[UIHudDef["StoryTalkPanel"] = 6] = "StoryTalkPanel";
    UIHudDef[UIHudDef["GameLoading"] = 7] = "GameLoading";
    UIHudDef[UIHudDef["SelectShowTarget"] = 8] = "SelectShowTarget";
    UIHudDef[UIHudDef["OverShow"] = 9] = "OverShow";
    UIHudDef[UIHudDef["GamePause"] = 10] = "GamePause";
    UIHudDef[UIHudDef["BuildSuccess"] = 11] = "BuildSuccess";
    UIHudDef[UIHudDef["Bag"] = 12] = "Bag";
    UIHudDef[UIHudDef["OpenBox"] = 13] = "OpenBox";
    UIHudDef[UIHudDef["ShopPanel"] = 14] = "ShopPanel";
    UIHudDef[UIHudDef["BuyProp"] = 15] = "BuyProp";
    UIHudDef[UIHudDef["CloudView"] = 16] = "CloudView";
    UIHudDef[UIHudDef["NoticePanel"] = 17] = "NoticePanel";
    UIHudDef[UIHudDef["GMView"] = 18] = "GMView";
    UIHudDef[UIHudDef["PropDropView"] = 19] = "PropDropView";
    UIHudDef[UIHudDef["RoomFinishView"] = 20] = "RoomFinishView";
    UIHudDef[UIHudDef["CommonReward"] = 21] = "CommonReward";
    UIHudDef[UIHudDef["DailyTaskPanel"] = 22] = "DailyTaskPanel";
    UIHudDef[UIHudDef["FriendRank"] = 23] = "FriendRank";
    UIHudDef[UIHudDef["UIGameFailEncourage"] = 24] = "UIGameFailEncourage";
    UIHudDef[UIHudDef["MoreCoin"] = 25] = "MoreCoin";
})(UIHudDef = exports.UIHudDef || (exports.UIHudDef = {}));
/**
 * @param hold 常驻内存，不会自动释放
 */
exports.default = new Map([
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

cc._RF.pop();