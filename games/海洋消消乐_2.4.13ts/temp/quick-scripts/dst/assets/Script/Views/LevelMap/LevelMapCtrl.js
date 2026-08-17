
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/LevelMap/LevelMapCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6b61cG3Z/BDX5skXT+Nsw2Z', 'LevelMapCtrl');
// Script/Views/LevelMap/LevelMapCtrl.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var UIMgr_1 = require("../../Base/Manager/UIMgr");
var UIData_1 = require("../../Logic/Data/Interface/UIData");
var Common_1 = require("../../Logic/Common/Common");
var Constant_1 = require("../../Logic/Data/Const/Constant");
var M_1 = require("../../Base/Manager/M");
var Util_1 = require("../../Base/Utils/Util");
var BaseConst_1 = require("../../Base/BaseConst");
var Event_1 = require("../../Logic/Data/Const/Event");
var SelectChapterCtrl_1 = require("./SelectChapterCtrl");
var SelectLevelCtrl_1 = require("../../Logic/Common/UI/SelectLevelCtrl");
var ChapterItemCtrl_1 = require("./ChapterItemCtrl");
var BoxGiftCtrl_1 = require("../../Logic/Common/UI/BoxGiftCtrl");
var RankPanelCtrl_1 = require("./RankPanelCtrl");
var GuideUtils_1 = require("../../../GodGuide/GuideUtils");
var MapIslandUtils_1 = require("../../Logic/SimulationOperation/View/Map/MapIslandUtils");
var Apps_1 = require("../../Base/Apps");
var BuyPowerCtrl_1 = require("../../Logic/Common/UI/BuyPowerCtrl");
var AudioCtrl_1 = require("../../Logic/Common/AudioCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelMapCtrl = /** @class */ (function (_super) {
    __extends(LevelMapCtrl, _super);
    function LevelMapCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curLvLab = null;
        _this.powerLab = null;
        _this.coinLab = null;
        _this.diamondLab = null;
        _this.starLab = null;
        _this.remainTimeLab = null;
        _this.avatarSprite = null;
        _this.islandParent = null;
        _this.chapterNode = null;
        _this.boxGiftNode = null;
        _this.uiNode = null;
        _this.rankPanel = null;
        _this.buyPowerPanel = null;
        _this.selectLvNode = null;
        _this.chapterItemPrefab = null;
        _this.goMapBtn = null;
        _this.buyPowerBtn = null;
        _this.guidePrefab = null;
        _this.btnGoMatchBtn = null;
        _this.tili = null;
        _this._selectChapterCtrl = null;
        _this._selectLevelCtrl = null;
        _this._mainPageView = null;
        _this._boxGiftCtrl = null;
        return _this;
    }
    LevelMapCtrl.prototype.onLoad = function () {
        // M.init();
        // GameTableMgr.ins.execute().then(() => {
        this._initView();
        this._initEvent();
        this._checkOfflineReward();
        this._checkJumpSceneTask();
        this._checkHavaReward();
        this._onUpdateReminTime();
        // GuideUtils.initGuide(this.guidePrefab);
        // });
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        // this.node.pauseSystemEvents(true);
        M_1.default.event.send(Event_1.Event.Sound.PlayBGM, AudioCtrl_1.AudioID.BGM1);
    };
    LevelMapCtrl.prototype.start = function () {
        // MapIslandUtils.preloadMapBg();
    };
    // onTouchBegin(event) {
    // }
    LevelMapCtrl.prototype.onDestroy = function () {
        this._destoryEvent();
    };
    LevelMapCtrl.prototype._initView = function () {
        this._initChapter();
        this._initLevelDisplay();
        this._initIslandDisplay();
        this._initCrrencyDisplay();
        this._checkAuth();
        if (Util_1.Util.Tool.isIpx()) {
            var widget = this.uiNode.getChildByName('Top').getComponent(cc.Widget);
            widget.top = 70;
            widget.updateAlignment();
            // this.coinLab.node.parent.setPosition(-24, -12);
        }
    };
    /**
     * 检查是否拿到了用户的授权.
     */
    LevelMapCtrl.prototype._checkAuth = function () {
        var _this = this;
        M_1.default.platform.getUserInfo().then(function (info) {
            var result = null;
            if (!info) {
                result = M_1.default.platform.createAuthButton({ x: 0, y: 0, w: cc.winSize.width, h: cc.winSize.height });
            }
            else {
                result = new Promise(function (resolve) { return resolve(info); });
            }
            return result;
        }).then(function (userinfo) {
            if (userinfo) {
                M_1.default.net.login(true);
                _this._updateAvatar(userinfo);
            }
        });
    };
    LevelMapCtrl.prototype._initEvent = function () {
        M_1.default.event.register(Event_1.Event.UI.UpdateCurrency, this._onUpdateCrrencyView, this);
        M_1.default.event.register(Event_1.Event.UI.HideSelectLevelView, this.onHideSelectLevelView, this);
        M_1.default.event.register(Event_1.Event.UI.UpdateRemainAddPowerTime, this._onUpdateReminTime, this);
        M_1.default.event.register(Event_1.Event.UI.LevelSceneTouched, this.onTouchLayerEnable, this);
        M_1.default.event.register(Event_1.Event.UI.ChapterUnlock, this.doChapterUnlock, this);
    };
    LevelMapCtrl.prototype._destoryEvent = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateCurrency, this._onUpdateCrrencyView, this);
        M_1.default.event.unRegister(Event_1.Event.UI.HideSelectLevelView, this.onHideSelectLevelView, this);
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateRemainAddPowerTime, this._onUpdateReminTime, this);
        M_1.default.event.unRegister(Event_1.Event.UI.ChapterUnlock, this.doChapterUnlock, this);
    };
    LevelMapCtrl.prototype._showSelectDlg = function () {
        var next = GuideUtils_1.GuideUtils.checkMatchNext();
        next && UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.SelectShowTarget, { type: UIData_1.UIHudDef.SelectShowTarget, data: M_1.default.runtime.SelectLevel || null });
    };
    /** 绑定关卡按钮 */
    LevelMapCtrl.prototype.onLevelBtnClick = function () {
        M_1.default.runtime.SelectLevel = 0;
        this._showSelectDlg();
        // Util.Tool.moveTo(cc.v2(this.btnGoMatchBtn.position.x,this.btnGoMatchBtn.position.y),this.tili,()=>{
        // })
    };
    LevelMapCtrl.prototype.onGoMapSceneBtnClick = function () {
        MapIslandUtils_1.default.openMapIsland();
    };
    LevelMapCtrl.prototype.onShareBtnClick = function () {
        M_1.default.platform.share('分享测试.....', 'https://mini-ga0.cos.ap-guangzhou.myloud.com/soe/Share/testshare.png');
    };
    LevelMapCtrl.prototype.onShowDailyTaskBtnClick = function () {
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.DailyTaskPanel);
    };
    //离线奖励!
    LevelMapCtrl.prototype._checkOfflineReward = function () {
        var _this = this;
        M_1.default.runtime.getServerConfig().then(function (config) {
            config && _this._showOfflineRewar(config.time);
        });
    };
    LevelMapCtrl.prototype._checkHavaReward = function () {
        if (M_1.default.runtime.RewardTask && M_1.default.runtime.RewardTask.reward) {
            var rewards = Common_1.default.getRewardArray(M_1.default.runtime.RewardTask.reward);
            M_1.default.ui.showUI(UIData_1.UIHudDef.OpenBox, { config: { rewards: rewards, text: M_1.default.runtime.RewardTask.text } });
            M_1.default.runtime.RewardTask = null;
            GuideUtils_1.GuideUtils.stopGuide = true;
        }
        //for test
        // if (M.runtime.CurLevel > 3) {
        //     M.runtime.setBoxGiftData(10, false);
        //     const boxConfig = M.table.BoxRewardInfo.getByPrimaryKey(10);
        //     if (boxConfig) {
        //         //展示奖励ui . 发放奖励
        //         M.ui.showUI(UIHudDef.OpenBox, { config: boxConfig });
        //     }
        //     GuideUtils.stopGuide = true;
        // }
    };
    LevelMapCtrl.prototype.onAddBtnClick = function (event, customValue) {
        var type = BaseConst_1.CurrencyId.Diamond;
        switch (customValue) {
            case 'coin':
                type = BaseConst_1.CurrencyId.Coin;
                this._addCrrencyClick(type);
                break;
            case 'power':
                type = BaseConst_1.CurrencyId.Power;
                this.buyPowerPanel.getComponent(BuyPowerCtrl_1.default).show();
                break;
            case 'diamond':
                type = BaseConst_1.CurrencyId.Diamond;
                this._addCrrencyClick(type);
                break;
        }
    };
    /**检测是否有界面跳转任务 */
    LevelMapCtrl.prototype._checkJumpSceneTask = function () {
        if (M_1.default.runtime.SceneTask && M_1.default.runtime.SceneTask.length > 0) {
            var task = M_1.default.runtime.SceneTask.shift();
            switch (task) {
                case Constant_1.SceneTaskKey.ShowTargetDlg:
                    M_1.default.ui.closeAllUI();
                    this._showSelectDlg();
                    break;
            }
            this._checkJumpSceneTask();
        }
    };
    LevelMapCtrl.prototype._initLevelDisplay = function () {
        this.curLvLab.string = "\u7B2C" + M_1.default.runtime.getMatch3Level() + "\u5173";
    };
    LevelMapCtrl.prototype._initChapter = function () {
        this._boxGiftCtrl = this.boxGiftNode.getComponent(BoxGiftCtrl_1.default);
        this._mainPageView = this.islandParent.parent.getComponent(cc.PageView);
        this._selectChapterCtrl = this.chapterNode.getComponent(SelectChapterCtrl_1.default);
        this._selectLevelCtrl = this.selectLvNode.getComponent(SelectLevelCtrl_1.default);
        if (this._selectChapterCtrl) {
            this._selectChapterCtrl.init(this._onShowSelectLevelView.bind(this));
        }
    };
    LevelMapCtrl.prototype._initIslandDisplay = function () {
        var _this = this;
        var datas = M_1.default.table.ChapterInfo.getData();
        // let [count, index] = [0, 0];
        var curIndex = 0;
        datas.forEach(function (info, i) {
            var kk = M_1.default.nodePool.createItem(null);
            kk.setContentSize(cc.winSize.width, 0);
            _this._mainPageView.addPage(kk);
            var item = M_1.default.nodePool.createItem(_this.chapterItemPrefab);
            item.parent = kk;
            item.getComponent(ChapterItemCtrl_1.default).init(info, 1, _this._onIslandClick.bind(_this));
            var curLv = M_1.default.runtime.getMatch3Level();
            if (curLv > info.minLv && curLv < info.maxLv) {
                curIndex = i;
            }
        });
        if (GuideUtils_1.GuideUtils.curGuideId == 3001) { //引导解锁章节
            this.onTouchLayerEnable(false);
            curIndex = 0;
        }
        this.scheduleOnce(function () {
            _this._mainPageView.scrollToPage(curIndex, 0.04);
            _this.onPageViewChanged();
        }, 0.1);
    };
    LevelMapCtrl.prototype._updateAvatar = function (userinfo) {
        var _this = this;
        if (userinfo.avatarUrl) {
            Common_1.default.getRemotPic(userinfo.avatarUrl).then(function (frame) {
                if (frame) {
                    _this.avatarSprite.spriteFrame = frame;
                }
            });
        }
    };
    LevelMapCtrl.prototype._initCrrencyDisplay = function () {
        this.coinLab.string = M_1.default.runtime.getFormateCoin();
        this.diamondLab.string = M_1.default.runtime.getCurrencyStr(BaseConst_1.CurrencyId.Diamond);
        this.starLab.string = M_1.default.runtime.getStarCount().toString();
        var curPower = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power);
        this.powerLab.string = curPower + "/" + Constant_1.MaxPowerCount;
        this.buyPowerBtn.active = !(curPower > Constant_1.MaxPowerCount);
    };
    /**执行添加货币操作! */
    LevelMapCtrl.prototype._addCrrencyClick = function (type) {
        if (Apps_1.default.isDebug) {
            M_1.default.runtime.addCurrency(type, 10000000);
        }
    };
    LevelMapCtrl.prototype._onIslandClick = function () {
        // console.error('岛屿被点击!');
        this._showSelectChapterView();
    };
    LevelMapCtrl.prototype._onUpdateCrrencyView = function (type, count) {
        if (count === void 0) { count = 0; }
        var label = this[M_1.default.runtime.getCurrencyKey(type) + "Lab"];
        if (label) {
            if (type == BaseConst_1.CurrencyId.Power) {
                var curPower = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power);
                label.string = curPower + "/" + Constant_1.MaxPowerCount;
                this.buyPowerBtn.active = !(curPower >= Constant_1.MaxPowerCount);
            }
            else if (type == BaseConst_1.CurrencyId.Coin) {
                var v = count.toString();
                if (type == BaseConst_1.CurrencyId.Coin) {
                    v = Common_1.default.bytesToSize(count);
                }
                label.string = v;
            }
            else if (type == BaseConst_1.CurrencyId.Diamond) {
                label.string = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Diamond);
            }
        }
    };
    LevelMapCtrl.prototype._onShowSelectLevelView = function (data) {
        this.selectLvNode.active = true;
        this._selectLevelCtrl.init(data);
        var animation = this.selectLvNode.getComponent(cc.Animation);
        animation.play('ShowSelectLevel');
    };
    LevelMapCtrl.prototype._showOfflineRewar = function (currentSerTime) {
        var lastTime = M_1.default.runtime.getLastTime();
        var gapTime = currentSerTime - lastTime;
        if (lastTime > 1000000 && gapTime > Constant_1.PowerConfig.NormalTime) {
            var offlinePower = (gapTime / Constant_1.PowerConfig.NormalTime) >> 0;
            var cpower = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power);
            if (cpower < Constant_1.MaxPowerCount) {
                var power = (cpower + offlinePower) > Constant_1.MaxPowerCount ? Constant_1.MaxPowerCount - cpower : offlinePower;
                if (power > 0) {
                    M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Power, power);
                    M_1.default.tips.show("" + Constant_1.WaringTips.OfflineReward + power + "\u80FD\u91CF");
                }
            }
        }
        M_1.default.runtime.setServerTime(currentSerTime);
        this._onUpdateReminTime();
    };
    LevelMapCtrl.prototype._showSelectChapterView = function () {
        this.chapterNode.active = true;
        this._boxGiftCtrl.onOtherClick();
    };
    LevelMapCtrl.prototype._onUpdateReminTime = function (curTimeCount) {
        if (curTimeCount === void 0) { curTimeCount = 0; }
        if (M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power) >= Constant_1.MaxPowerCount) {
            this.remainTimeLab.string = '满了!';
        }
        else if (curTimeCount) {
            var time = Constant_1.PowerConfig.NormalTime - (curTimeCount % Constant_1.PowerConfig.NormalTime);
            this.remainTimeLab.string = Util_1.Util.Timer.conversionTime(time, true, { m: true }) + " \u540E +" + Constant_1.PowerConfig.NormalCount;
        }
    };
    LevelMapCtrl.prototype.onHideSelectChapterView = function () {
        this.chapterNode.active = false;
    };
    LevelMapCtrl.prototype.onPageViewChanged = function () {
        var data = M_1.default.table.ChapterInfo.getByPrimaryKey(this._mainPageView.getCurrentPageIndex() + 1);
        this._boxGiftCtrl.updatePage(data.minLv, data.maxLv);
    };
    LevelMapCtrl.prototype.onRankBtnClick = function () {
        this.rankPanel.getComponent(RankPanelCtrl_1.default).onInit();
    };
    LevelMapCtrl.prototype.onHideSelectLevelView = function () {
        var _this = this;
        var animation = this.selectLvNode.getComponent(cc.Animation);
        animation.play('HideSelectLevel');
        this.scheduleOnce(function () {
            _this.selectLvNode.active = false;
        }, 0.5);
    };
    //作用： 屏蔽LevelScene是否可以被点击
    LevelMapCtrl.prototype.onTouchLayerEnable = function (data) {
        var touchLayer = cc.find("TouchLayer");
        if (touchLayer) {
            var blockInputEvents = touchLayer.getComponent(cc.BlockInputEvents);
            blockInputEvents && (blockInputEvents.enabled = !data);
        }
    };
    LevelMapCtrl.prototype.onShopBtnClick = function () {
        M_1.default.ui.showUI(UIData_1.UIHudDef.ShopPanel);
    };
    LevelMapCtrl.prototype.onClickHead = function () {
        if (Apps_1.default.isOpenGM) {
            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GMView);
        }
    };
    //作用：用于第一章节解锁动画
    LevelMapCtrl.prototype.doChapterUnlock = function (data) {
        this._mainPageView.scrollToPage(data.index, 1);
        if (data.play) {
            var node = this._mainPageView.getPages()[data.index];
            if (node) {
                var itemCtrl = node.getComponentInChildren(ChapterItemCtrl_1.default);
                if (itemCtrl) {
                    itemCtrl.doCloudUnlock();
                }
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], LevelMapCtrl.prototype, "curLvLab", void 0);
    __decorate([
        property(cc.Label)
    ], LevelMapCtrl.prototype, "powerLab", void 0);
    __decorate([
        property(cc.Label)
    ], LevelMapCtrl.prototype, "coinLab", void 0);
    __decorate([
        property(cc.Label)
    ], LevelMapCtrl.prototype, "diamondLab", void 0);
    __decorate([
        property(cc.Label)
    ], LevelMapCtrl.prototype, "starLab", void 0);
    __decorate([
        property(cc.Label)
    ], LevelMapCtrl.prototype, "remainTimeLab", void 0);
    __decorate([
        property(cc.Sprite)
    ], LevelMapCtrl.prototype, "avatarSprite", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "islandParent", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "chapterNode", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "boxGiftNode", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "uiNode", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "rankPanel", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "buyPowerPanel", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "selectLvNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], LevelMapCtrl.prototype, "chapterItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "goMapBtn", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "buyPowerBtn", void 0);
    __decorate([
        property(cc.Prefab)
    ], LevelMapCtrl.prototype, "guidePrefab", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "btnGoMatchBtn", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMapCtrl.prototype, "tili", void 0);
    LevelMapCtrl = __decorate([
        ccclass
    ], LevelMapCtrl);
    return LevelMapCtrl;
}(cc.Component));
exports.default = LevelMapCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcTGV2ZWxNYXBcXExldmVsTWFwQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFDN0MsNERBQTZEO0FBQzdELG9EQUErQztBQUMvQyw0REFBdUc7QUFDdkcsMENBQXFDO0FBQ3JDLDhDQUE2QztBQUM3QyxrREFBNkQ7QUFDN0Qsc0RBQXFEO0FBQ3JELHlEQUFvRDtBQUVwRCx5RUFBb0U7QUFDcEUscURBQWdEO0FBQ2hELGlFQUE0RDtBQUM1RCxpREFBNEM7QUFDNUMsMkRBQTBEO0FBQzFELDBGQUFxRjtBQUNyRix3Q0FBbUM7QUFDbkMsbUVBQThEO0FBQzlELDBEQUF1RDtBQUVqRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQTBhQztRQXZhRyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsYUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3Qix1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMsY0FBUSxHQUFZLElBQUksQ0FBQztR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OiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJTWdyIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvVUlNZ3JcIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uL0xvZ2ljL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vTG9naWMvQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IHsgTWF4UG93ZXJDb3VudCwgUG93ZXJDb25maWcsIFdhcmluZ1RpcHMsIFNjZW5lVGFza0tleSB9IGZyb20gXCIuLi8uLi9Mb2dpYy9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBDdXJyZW5jeUlkLCBJVXNlckluZm8gfSBmcm9tIFwiLi4vLi4vQmFzZS9CYXNlQ29uc3RcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0xvZ2ljL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBTZWxlY3RDaGFwdGVyQ3RybCBmcm9tIFwiLi9TZWxlY3RDaGFwdGVyQ3RybFwiO1xuaW1wb3J0IENoYXB0ZXJJbmZvIGZyb20gXCIuLi8uLi9CYXNlL1RhYmxzL0NoYXB0ZXJJbmZvXCI7XG5pbXBvcnQgU2VsZWN0TGV2ZWxDdHJsIGZyb20gXCIuLi8uLi9Mb2dpYy9Db21tb24vVUkvU2VsZWN0TGV2ZWxDdHJsXCI7XG5pbXBvcnQgQ2hhcHRlckl0ZW1DdHJsIGZyb20gXCIuL0NoYXB0ZXJJdGVtQ3RybFwiO1xuaW1wb3J0IEJveEdpZnRDdHJsIGZyb20gXCIuLi8uLi9Mb2dpYy9Db21tb24vVUkvQm94R2lmdEN0cmxcIjtcbmltcG9ydCBSYW5rUGFuZWxDdHJsIGZyb20gXCIuL1JhbmtQYW5lbEN0cmxcIjtcbmltcG9ydCB7IEd1aWRlVXRpbHMgfSBmcm9tIFwiLi4vLi4vLi4vR29kR3VpZGUvR3VpZGVVdGlsc1wiO1xuaW1wb3J0IE1hcElzbGFuZFV0aWxzIGZyb20gXCIuLi8uLi9Mb2dpYy9TaW11bGF0aW9uT3BlcmF0aW9uL1ZpZXcvTWFwL01hcElzbGFuZFV0aWxzXCI7XG5pbXBvcnQgQXBwcyBmcm9tIFwiLi4vLi4vQmFzZS9BcHBzXCI7XG5pbXBvcnQgQnV5UG93ZXJDdHJsIGZyb20gXCIuLi8uLi9Mb2dpYy9Db21tb24vVUkvQnV5UG93ZXJDdHJsXCI7XG5pbXBvcnQgeyBBdWRpb0lEIH0gZnJvbSBcIi4uLy4uL0xvZ2ljL0NvbW1vbi9BdWRpb0N0cmxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZXZlbE1hcEN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGN1ckx2TGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcG93ZXJMYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjb2luTGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZGlhbW9uZExhYjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHN0YXJMYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByZW1haW5UaW1lTGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGF2YXRhclNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGlzbGFuZFBhcmVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjaGFwdGVyTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBib3hHaWZ0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB1aU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcmFua1BhbmVsOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ1eVBvd2VyUGFuZWw6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2VsZWN0THZOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgY2hhcHRlckl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBnb01hcEJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidXlQb3dlckJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGd1aWRlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuR29NYXRjaEJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0aWxpOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgX3NlbGVjdENoYXB0ZXJDdHJsOiBTZWxlY3RDaGFwdGVyQ3RybCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc2VsZWN0TGV2ZWxDdHJsOiBTZWxlY3RMZXZlbEN0cmwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfbWFpblBhZ2VWaWV3OiBjYy5QYWdlVmlldyA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9ib3hHaWZ0Q3RybDogQm94R2lmdEN0cmwgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyBNLmluaXQoKTtcbiAgICAgICAgLy8gR2FtZVRhYmxlTWdyLmlucy5leGVjdXRlKCkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgdGhpcy5faW5pdFZpZXcoKTtcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XG4gICAgICAgIHRoaXMuX2NoZWNrT2ZmbGluZVJld2FyZCgpO1xuICAgICAgICB0aGlzLl9jaGVja0p1bXBTY2VuZVRhc2soKTtcbiAgICAgICAgdGhpcy5fY2hlY2tIYXZhUmV3YXJkKCk7XG4gICAgICAgIHRoaXMuX29uVXBkYXRlUmVtaW5UaW1lKCk7XG5cbiAgICAgICAgLy8gR3VpZGVVdGlscy5pbml0R3VpZGUodGhpcy5ndWlkZVByZWZhYik7XG5cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoQmVnaW4sIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUucGF1c2VTeXN0ZW1FdmVudHModHJ1ZSk7XG5cbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlNvdW5kLlBsYXlCR00sIEF1ZGlvSUQuQkdNMSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIE1hcElzbGFuZFV0aWxzLnByZWxvYWRNYXBCZygpO1xuICAgIH1cblxuICAgIC8vIG9uVG91Y2hCZWdpbihldmVudCkge1xuXG4gICAgLy8gfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9kZXN0b3J5RXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0VmlldygpIHtcbiAgICAgICAgdGhpcy5faW5pdENoYXB0ZXIoKTtcbiAgICAgICAgdGhpcy5faW5pdExldmVsRGlzcGxheSgpO1xuICAgICAgICB0aGlzLl9pbml0SXNsYW5kRGlzcGxheSgpO1xuICAgICAgICB0aGlzLl9pbml0Q3JyZW5jeURpc3BsYXkoKTtcbiAgICAgICAgdGhpcy5fY2hlY2tBdXRoKCk7XG4gICAgICAgIGlmIChVdGlsLlRvb2wuaXNJcHgoKSkge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy51aU5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ1RvcCcpLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xuICAgICAgICAgICAgd2lkZ2V0LnRvcCA9IDcwO1xuICAgICAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xuICAgICAgICAgICAgLy8gdGhpcy5jb2luTGFiLm5vZGUucGFyZW50LnNldFBvc2l0aW9uKC0yNCwgLTEyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOafpeaYr+WQpuaLv+WIsOS6hueUqOaIt+eahOaOiOadgy5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9jaGVja0F1dGgoKSB7XG4gICAgICAgIE0ucGxhdGZvcm0uZ2V0VXNlckluZm8oKS50aGVuKChpbmZvKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghaW5mbykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE0ucGxhdGZvcm0uY3JlYXRlQXV0aEJ1dHRvbih7IHg6IDAsIHk6IDAsIHc6IGNjLndpblNpemUud2lkdGgsIGg6IGNjLndpblNpemUuaGVpZ2h0IH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gcmVzb2x2ZShpbmZvKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KS50aGVuKCh1c2VyaW5mbykgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXJpbmZvKSB7XG4gICAgICAgICAgICAgICAgTS5uZXQubG9naW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQXZhdGFyKHVzZXJpbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEV2ZW50KCkge1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LlVJLlVwZGF0ZUN1cnJlbmN5LCB0aGlzLl9vblVwZGF0ZUNycmVuY3lWaWV3LCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5VSS5IaWRlU2VsZWN0TGV2ZWxWaWV3LCB0aGlzLm9uSGlkZVNlbGVjdExldmVsVmlldywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlUmVtYWluQWRkUG93ZXJUaW1lLCB0aGlzLl9vblVwZGF0ZVJlbWluVGltZSwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuTGV2ZWxTY2VuZVRvdWNoZWQsIHRoaXMub25Ub3VjaExheWVyRW5hYmxlLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5VSS5DaGFwdGVyVW5sb2NrLCB0aGlzLmRvQ2hhcHRlclVubG9jaywgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVzdG9yeUV2ZW50KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlQ3VycmVuY3ksIHRoaXMuX29uVXBkYXRlQ3JyZW5jeVZpZXcsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuSGlkZVNlbGVjdExldmVsVmlldywgdGhpcy5vbkhpZGVTZWxlY3RMZXZlbFZpZXcsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlUmVtYWluQWRkUG93ZXJUaW1lLCB0aGlzLl9vblVwZGF0ZVJlbWluVGltZSwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5VSS5DaGFwdGVyVW5sb2NrLCB0aGlzLmRvQ2hhcHRlclVubG9jaywgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd1NlbGVjdERsZygpIHtcbiAgICAgICAgbGV0IG5leHQgPSBHdWlkZVV0aWxzLmNoZWNrTWF0Y2hOZXh0KCk7XG4gICAgICAgIG5leHQgJiYgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5TZWxlY3RTaG93VGFyZ2V0LCB7IHR5cGU6IFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQsIGRhdGE6IE0ucnVudGltZS5TZWxlY3RMZXZlbCB8fCBudWxsIH0pO1xuICAgIH1cblxuICAgIC8qKiDnu5HlrprlhbPljaHmjInpkq4gKi9cbiAgICBwdWJsaWMgb25MZXZlbEJ0bkNsaWNrKCkge1xuXG4gICAgICAgIE0ucnVudGltZS5TZWxlY3RMZXZlbCA9IDA7XG4gICAgICAgIHRoaXMuX3Nob3dTZWxlY3REbGcoKTtcblxuXG4gICAgICAgIC8vIFV0aWwuVG9vbC5tb3ZlVG8oY2MudjIodGhpcy5idG5Hb01hdGNoQnRuLnBvc2l0aW9uLngsdGhpcy5idG5Hb01hdGNoQnRuLnBvc2l0aW9uLnkpLHRoaXMudGlsaSwoKT0+e1xuXG5cbiAgICAgICAgLy8gfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Hb01hcFNjZW5lQnRuQ2xpY2soKSB7XG4gICAgICAgIE1hcElzbGFuZFV0aWxzLm9wZW5NYXBJc2xhbmQoKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBvblNoYXJlQnRuQ2xpY2soKSB7XG4gICAgICAgIE0ucGxhdGZvcm0uc2hhcmUoJ+WIhuS6q+a1i+ivlS4uLi4uJywgJ2h0dHBzOi8vbWluaS1nYTAuY29zLmFwLWd1YW5nemhvdS5teWxvdWQuY29tL3NvZS9TaGFyZS90ZXN0c2hhcmUucG5nJylcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93RGFpbHlUYXNrQnRuQ2xpY2soKSB7XG4gICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuRGFpbHlUYXNrUGFuZWwpO1xuICAgIH1cblxuXG4gICAgLy/nprvnur/lpZblirEhXG4gICAgcHJpdmF0ZSBfY2hlY2tPZmZsaW5lUmV3YXJkKCkge1xuICAgICAgICBNLnJ1bnRpbWUuZ2V0U2VydmVyQ29uZmlnKCkudGhlbihjb25maWcgPT4ge1xuICAgICAgICAgICAgY29uZmlnICYmIHRoaXMuX3Nob3dPZmZsaW5lUmV3YXIoY29uZmlnLnRpbWUpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrSGF2YVJld2FyZCgpIHtcbiAgICAgICAgaWYgKE0ucnVudGltZS5SZXdhcmRUYXNrICYmIE0ucnVudGltZS5SZXdhcmRUYXNrLnJld2FyZCkge1xuICAgICAgICAgICAgY29uc3QgcmV3YXJkcyA9IENvbW1vbi5nZXRSZXdhcmRBcnJheShNLnJ1bnRpbWUuUmV3YXJkVGFzay5yZXdhcmQpO1xuICAgICAgICAgICAgTS51aS5zaG93VUkoVUlIdWREZWYuT3BlbkJveCwgeyBjb25maWc6IHsgcmV3YXJkcywgdGV4dDogTS5ydW50aW1lLlJld2FyZFRhc2sudGV4dCB9IH0pO1xuICAgICAgICAgICAgTS5ydW50aW1lLlJld2FyZFRhc2sgPSBudWxsO1xuICAgICAgICAgICAgR3VpZGVVdGlscy5zdG9wR3VpZGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vZm9yIHRlc3RcbiAgICAgICAgLy8gaWYgKE0ucnVudGltZS5DdXJMZXZlbCA+IDMpIHtcbiAgICAgICAgLy8gICAgIE0ucnVudGltZS5zZXRCb3hHaWZ0RGF0YSgxMCwgZmFsc2UpO1xuICAgICAgICAvLyAgICAgY29uc3QgYm94Q29uZmlnID0gTS50YWJsZS5Cb3hSZXdhcmRJbmZvLmdldEJ5UHJpbWFyeUtleSgxMCk7XG4gICAgICAgIC8vICAgICBpZiAoYm94Q29uZmlnKSB7XG4gICAgICAgIC8vICAgICAgICAgLy/lsZXnpLrlpZblirF1aSAuIOWPkeaUvuWlluWKsVxuICAgICAgICAvLyAgICAgICAgIE0udWkuc2hvd1VJKFVJSHVkRGVmLk9wZW5Cb3gsIHsgY29uZmlnOiBib3hDb25maWcgfSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICBHdWlkZVV0aWxzLnN0b3BHdWlkZSA9IHRydWU7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25BZGRCdG5DbGljayhldmVudCwgY3VzdG9tVmFsdWU6IHN0cmluZykge1xuICAgICAgICBsZXQgdHlwZTogQ3VycmVuY3lJZCA9IEN1cnJlbmN5SWQuRGlhbW9uZDtcbiAgICAgICAgc3dpdGNoIChjdXN0b21WYWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAnY29pbic6XG4gICAgICAgICAgICAgICAgdHlwZSA9IEN1cnJlbmN5SWQuQ29pbjtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRDcnJlbmN5Q2xpY2sodHlwZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwb3dlcic6XG4gICAgICAgICAgICAgICAgdHlwZSA9IEN1cnJlbmN5SWQuUG93ZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5idXlQb3dlclBhbmVsLmdldENvbXBvbmVudChCdXlQb3dlckN0cmwpLnNob3coKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RpYW1vbmQnOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBDdXJyZW5jeUlkLkRpYW1vbmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQ3JyZW5jeUNsaWNrKHR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5qOA5rWL5piv5ZCm5pyJ55WM6Z2i6Lez6L2s5Lu75YqhICovXG4gICAgcHJpdmF0ZSBfY2hlY2tKdW1wU2NlbmVUYXNrKCkge1xuICAgICAgICBpZiAoTS5ydW50aW1lLlNjZW5lVGFzayAmJiBNLnJ1bnRpbWUuU2NlbmVUYXNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBNLnJ1bnRpbWUuU2NlbmVUYXNrLnNoaWZ0KCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNjZW5lVGFza0tleS5TaG93VGFyZ2V0RGxnOlxuICAgICAgICAgICAgICAgICAgICBNLnVpLmNsb3NlQWxsVUkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd1NlbGVjdERsZygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NoZWNrSnVtcFNjZW5lVGFzaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdExldmVsRGlzcGxheSgpIHtcbiAgICAgICAgdGhpcy5jdXJMdkxhYi5zdHJpbmcgPSBg56ysJHtNLnJ1bnRpbWUuZ2V0TWF0Y2gzTGV2ZWwoKX3lhbNgO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRDaGFwdGVyKCkge1xuICAgICAgICB0aGlzLl9ib3hHaWZ0Q3RybCA9IHRoaXMuYm94R2lmdE5vZGUuZ2V0Q29tcG9uZW50KEJveEdpZnRDdHJsKTtcbiAgICAgICAgdGhpcy5fbWFpblBhZ2VWaWV3ID0gdGhpcy5pc2xhbmRQYXJlbnQucGFyZW50LmdldENvbXBvbmVudChjYy5QYWdlVmlldyk7XG4gICAgICAgIHRoaXMuX3NlbGVjdENoYXB0ZXJDdHJsID0gdGhpcy5jaGFwdGVyTm9kZS5nZXRDb21wb25lbnQoU2VsZWN0Q2hhcHRlckN0cmwpO1xuICAgICAgICB0aGlzLl9zZWxlY3RMZXZlbEN0cmwgPSB0aGlzLnNlbGVjdEx2Tm9kZS5nZXRDb21wb25lbnQoU2VsZWN0TGV2ZWxDdHJsKTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdENoYXB0ZXJDdHJsKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RDaGFwdGVyQ3RybC5pbml0KHRoaXMuX29uU2hvd1NlbGVjdExldmVsVmlldy5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRJc2xhbmREaXNwbGF5KCkge1xuICAgICAgICBjb25zdCBkYXRhcyA9IE0udGFibGUuQ2hhcHRlckluZm8uZ2V0RGF0YSgpO1xuICAgICAgICAvLyBsZXQgW2NvdW50LCBpbmRleF0gPSBbMCwgMF07XG4gICAgICAgIGxldCBjdXJJbmRleCA9IDA7XG4gICAgICAgIGRhdGFzLmZvckVhY2goKGluZm8sIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtrID0gTS5ub2RlUG9vbC5jcmVhdGVJdGVtKG51bGwpO1xuICAgICAgICAgICAga2suc2V0Q29udGVudFNpemUoY2Mud2luU2l6ZS53aWR0aCwgMClcbiAgICAgICAgICAgIHRoaXMuX21haW5QYWdlVmlldy5hZGRQYWdlKGtrKTtcblxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLmNoYXB0ZXJJdGVtUHJlZmFiKTtcbiAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0ga2s7XG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChDaGFwdGVySXRlbUN0cmwpLmluaXQoaW5mbywgMSwgdGhpcy5fb25Jc2xhbmRDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1ckx2ID0gTS5ydW50aW1lLmdldE1hdGNoM0xldmVsKCk7XG4gICAgICAgICAgICBpZiAoY3VyTHYgPiBpbmZvLm1pbkx2ICYmIGN1ckx2IDwgaW5mby5tYXhMdikge1xuICAgICAgICAgICAgICAgIGN1ckluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChHdWlkZVV0aWxzLmN1ckd1aWRlSWQgPT0gMzAwMSkgeyAgLy/lvJXlr7zop6PplIHnq6DoioJcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaExheWVyRW5hYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIGN1ckluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tYWluUGFnZVZpZXcuc2Nyb2xsVG9QYWdlKGN1ckluZGV4LCAwLjA0KTtcbiAgICAgICAgICAgIHRoaXMub25QYWdlVmlld0NoYW5nZWQoKTtcbiAgICAgICAgfSwgMC4xKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVBdmF0YXIodXNlcmluZm86IElVc2VySW5mbykge1xuICAgICAgICBpZiAodXNlcmluZm8uYXZhdGFyVXJsKSB7XG4gICAgICAgICAgICBDb21tb24uZ2V0UmVtb3RQaWModXNlcmluZm8uYXZhdGFyVXJsKS50aGVuKGZyYW1lID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJTcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0Q3JyZW5jeURpc3BsYXkoKSB7XG4gICAgICAgIHRoaXMuY29pbkxhYi5zdHJpbmcgPSBNLnJ1bnRpbWUuZ2V0Rm9ybWF0ZUNvaW4oKTtcbiAgICAgICAgdGhpcy5kaWFtb25kTGFiLnN0cmluZyA9IE0ucnVudGltZS5nZXRDdXJyZW5jeVN0cihDdXJyZW5jeUlkLkRpYW1vbmQpO1xuICAgICAgICB0aGlzLnN0YXJMYWIuc3RyaW5nID0gTS5ydW50aW1lLmdldFN0YXJDb3VudCgpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGN1clBvd2VyID0gTS5ydW50aW1lLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIpO1xuICAgICAgICB0aGlzLnBvd2VyTGFiLnN0cmluZyA9IGAke2N1clBvd2VyfS8ke01heFBvd2VyQ291bnR9YDtcbiAgICAgICAgdGhpcy5idXlQb3dlckJ0bi5hY3RpdmUgPSAhKGN1clBvd2VyID4gTWF4UG93ZXJDb3VudClcbiAgICB9XG5cbiAgICAvKirmiafooYzmt7vliqDotKfluIHmk43kvZwhICovXG4gICAgcHJpdmF0ZSBfYWRkQ3JyZW5jeUNsaWNrKHR5cGU6IEN1cnJlbmN5SWQpIHtcbiAgICAgICAgaWYgKEFwcHMuaXNEZWJ1Zykge1xuICAgICAgICAgICAgTS5ydW50aW1lLmFkZEN1cnJlbmN5KHR5cGUsIDEwMDAwMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX29uSXNsYW5kQ2xpY2soKSB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ+Wym+Wxv+iiq+eCueWHuyEnKTtcbiAgICAgICAgdGhpcy5fc2hvd1NlbGVjdENoYXB0ZXJWaWV3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25VcGRhdGVDcnJlbmN5Vmlldyh0eXBlOiBDdXJyZW5jeUlkLCBjb3VudDogbnVtYmVyID0gMCkge1xuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXNbYCR7TS5ydW50aW1lLmdldEN1cnJlbmN5S2V5KHR5cGUpfUxhYmBdO1xuICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09IEN1cnJlbmN5SWQuUG93ZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJQb3dlciA9IE0ucnVudGltZS5nZXRDdXJyZW5jeShDdXJyZW5jeUlkLlBvd2VyKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBgJHtjdXJQb3dlcn0vJHtNYXhQb3dlckNvdW50fWA7XG4gICAgICAgICAgICAgICAgdGhpcy5idXlQb3dlckJ0bi5hY3RpdmUgPSAhKGN1clBvd2VyID49IE1heFBvd2VyQ291bnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IEN1cnJlbmN5SWQuQ29pbikge1xuICAgICAgICAgICAgICAgIGxldCB2ID0gY291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBDdXJyZW5jeUlkLkNvaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IENvbW1vbi5ieXRlc1RvU2l6ZShjb3VudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IHY7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gQ3VycmVuY3lJZC5EaWFtb25kKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gTS5ydW50aW1lLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuRGlhbW9uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblNob3dTZWxlY3RMZXZlbFZpZXcoZGF0YTogQ2hhcHRlckluZm8pIHtcbiAgICAgICAgdGhpcy5zZWxlY3RMdk5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2VsZWN0TGV2ZWxDdHJsLmluaXQoZGF0YSk7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuc2VsZWN0THZOb2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICBhbmltYXRpb24ucGxheSgnU2hvd1NlbGVjdExldmVsJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd09mZmxpbmVSZXdhcihjdXJyZW50U2VyVGltZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGxhc3RUaW1lID0gTS5ydW50aW1lLmdldExhc3RUaW1lKCk7XG4gICAgICAgIGNvbnN0IGdhcFRpbWUgPSBjdXJyZW50U2VyVGltZSAtIGxhc3RUaW1lO1xuICAgICAgICBpZiAobGFzdFRpbWUgPiAxMDAwMDAwICYmIGdhcFRpbWUgPiBQb3dlckNvbmZpZy5Ob3JtYWxUaW1lKSB7XG4gICAgICAgICAgICBsZXQgb2ZmbGluZVBvd2VyID0gKGdhcFRpbWUgLyBQb3dlckNvbmZpZy5Ob3JtYWxUaW1lKSA+PiAwO1xuICAgICAgICAgICAgY29uc3QgY3Bvd2VyID0gTS5ydW50aW1lLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIpO1xuICAgICAgICAgICAgaWYgKGNwb3dlciA8IE1heFBvd2VyQ291bnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3dlciA9IChjcG93ZXIgKyBvZmZsaW5lUG93ZXIpID4gTWF4UG93ZXJDb3VudCA/IE1heFBvd2VyQ291bnQgLSBjcG93ZXIgOiBvZmZsaW5lUG93ZXI7XG4gICAgICAgICAgICAgICAgaWYgKHBvd2VyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuYWRkQ3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlciwgcG93ZXIpO1xuICAgICAgICAgICAgICAgICAgICBNLnRpcHMuc2hvdyhgJHtXYXJpbmdUaXBzLk9mZmxpbmVSZXdhcmR9JHtwb3dlcn3og73ph49gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgTS5ydW50aW1lLnNldFNlcnZlclRpbWUoY3VycmVudFNlclRpbWUpO1xuICAgICAgICB0aGlzLl9vblVwZGF0ZVJlbWluVGltZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dTZWxlY3RDaGFwdGVyVmlldygpIHtcbiAgICAgICAgdGhpcy5jaGFwdGVyTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9ib3hHaWZ0Q3RybC5vbk90aGVyQ2xpY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblVwZGF0ZVJlbWluVGltZShjdXJUaW1lQ291bnQ6IG51bWJlciA9IDApIHtcbiAgICAgICAgaWYgKE0ucnVudGltZS5nZXRDdXJyZW5jeShDdXJyZW5jeUlkLlBvd2VyKSA+PSBNYXhQb3dlckNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlbWFpblRpbWVMYWIuc3RyaW5nID0gJ+a7oeS6hiEnXG4gICAgICAgIH0gZWxzZSBpZiAoY3VyVGltZUNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gUG93ZXJDb25maWcuTm9ybWFsVGltZSAtIChjdXJUaW1lQ291bnQgJSBQb3dlckNvbmZpZy5Ob3JtYWxUaW1lKTtcbiAgICAgICAgICAgIHRoaXMucmVtYWluVGltZUxhYi5zdHJpbmcgPSBgJHtVdGlsLlRpbWVyLmNvbnZlcnNpb25UaW1lKHRpbWUsIHRydWUsIHsgbTogdHJ1ZSB9KX0g5ZCOICske1Bvd2VyQ29uZmlnLk5vcm1hbENvdW50fWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25IaWRlU2VsZWN0Q2hhcHRlclZpZXcoKSB7XG4gICAgICAgIHRoaXMuY2hhcHRlck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIG9uUGFnZVZpZXdDaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gTS50YWJsZS5DaGFwdGVySW5mby5nZXRCeVByaW1hcnlLZXkodGhpcy5fbWFpblBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKSArIDEpO1xuICAgICAgICB0aGlzLl9ib3hHaWZ0Q3RybC51cGRhdGVQYWdlKGRhdGEubWluTHYsIGRhdGEubWF4THYpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblJhbmtCdG5DbGljaygpIHtcbiAgICAgICAgdGhpcy5yYW5rUGFuZWwuZ2V0Q29tcG9uZW50KFJhbmtQYW5lbEN0cmwpLm9uSW5pdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkhpZGVTZWxlY3RMZXZlbFZpZXcoKSB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuc2VsZWN0THZOb2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICBhbmltYXRpb24ucGxheSgnSGlkZVNlbGVjdExldmVsJyk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0THZOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LCAwLjUpO1xuICAgIH1cblxuICAgIC8v5L2c55So77yaIOWxj+iUvUxldmVsU2NlbmXmmK/lkKblj6/ku6Xooqvngrnlh7tcbiAgICBwdWJsaWMgb25Ub3VjaExheWVyRW5hYmxlKGRhdGEpIHtcbiAgICAgICAgbGV0IHRvdWNoTGF5ZXIgPSBjYy5maW5kKFwiVG91Y2hMYXllclwiKTtcbiAgICAgICAgaWYgKHRvdWNoTGF5ZXIpIHtcbiAgICAgICAgICAgIGxldCBibG9ja0lucHV0RXZlbnRzID0gdG91Y2hMYXllci5nZXRDb21wb25lbnQoY2MuQmxvY2tJbnB1dEV2ZW50cyk7XG4gICAgICAgICAgICBibG9ja0lucHV0RXZlbnRzICYmIChibG9ja0lucHV0RXZlbnRzLmVuYWJsZWQgPSAhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyBvblNob3BCdG5DbGljaygpIHtcblxuICAgICAgICBNLnVpLnNob3dVSShVSUh1ZERlZi5TaG9wUGFuZWwpO1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2tIZWFkKCkge1xuICAgICAgICBpZiAoQXBwcy5pc09wZW5HTSkge1xuICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5HTVZpZXcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/kvZznlKjvvJrnlKjkuo7nrKzkuIDnq6DoioLop6PplIHliqjnlLtcbiAgICBwdWJsaWMgZG9DaGFwdGVyVW5sb2NrKGRhdGE6IHsgaW5kZXg6IG51bWJlciwgcGxheTogYm9vbGVhbiB9KSB7XG4gICAgICAgIHRoaXMuX21haW5QYWdlVmlldy5zY3JvbGxUb1BhZ2UoZGF0YS5pbmRleCwgMSk7XG4gICAgICAgIGlmIChkYXRhLnBsYXkpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5fbWFpblBhZ2VWaWV3LmdldFBhZ2VzKClbZGF0YS5pbmRleF07XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtQ3RybCA9IG5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihDaGFwdGVySXRlbUN0cmwpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtQ3RybCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ3RybC5kb0Nsb3VkVW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19