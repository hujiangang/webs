"use strict";
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