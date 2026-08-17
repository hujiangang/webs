"use strict";
cc._RF.push(module, 'a7981qmDfxIoY4pqq1yRDSj', 'GameFailEncouragePanel');
// Script/Logic/Common/UI/GameFailEncouragePanel.ts

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
var UIBase_1 = require("../../../Base/UI/UIBase");
var M_1 = require("../../../Base/Manager/M");
var UIData_1 = require("../../Data/Interface/UIData");
var BaseConst_1 = require("../../../Base/BaseConst");
var Event_1 = require("../../Data/Const/Event");
var GameModel_1 = require("../../Match3/Model/GameModel");
var StorageMgr_1 = require("../../../Base/Manager/StorageMgr");
var Constant_1 = require("../../Data/Const/Constant");
var Constant_2 = require("../../Data/Const/Constant");
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var Paths_1 = require("../../../Base/Utils/Paths");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameFailEncouragePanel = /** @class */ (function (_super) {
    __extends(GameFailEncouragePanel, _super);
    function GameFailEncouragePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failEncourageRoot = null; //失败鼓励界面
        _this.buyDiamondRoot = null; //购买钻石界面
        _this.diamond = null; //花费钻石数量
        _this.btnFriend = null; //好友助力按钮
        _this.btnAd = null; //免费看视频按钮
        // private _type: PropType = null;
        _this.isFirstFail = true; //关卡是否首次失败
        _this.buyNeedDiamond = null;
        _this._data = null; //失败界面数据
        _this.passedTime = 0;
        return _this;
    }
    GameFailEncouragePanel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        EventMgr_1.default.ins.register(Event_1.Event.GameCMD.GameGetStepContinue, this.gameGetStepContinue, this);
    };
    GameFailEncouragePanel.prototype.onInit = function (params) {
        if (params) {
            this._data = params.data;
            //上次分享成功的日期和 现在要分享的时间不是同一天且 上次已经分享成功，重置状态
            var levelFailShareTag = StorageMgr_1.StorageMgr.Storage.getInt(Constant_1.NativeKey.LevelFailShareTag, 0);
            var data2 = new Date();
            if (levelFailShareTag == 1 && StorageMgr_1.StorageMgr.Storage.getInt(Constant_1.NativeKey.LevelFailShareTimeTag, 0) != data2.getDate()) {
                StorageMgr_1.StorageMgr.Storage.setInt(Constant_1.NativeKey.LevelFailShareTag, 0);
            }
            if (levelFailShareTag == 0) {
                //获取本关卡失败次数
                var levelFailNum = StorageMgr_1.StorageMgr.Storage.getInt(Constant_1.NativeKey.LevelFailTag, 0);
                if (levelFailNum == 0) {
                    StorageMgr_1.StorageMgr.Storage.setInt(Constant_1.NativeKey.LevelFailTag, 1);
                    this.btnFriend.active = true;
                    this.btnAd.active = false;
                    this.buyNeedDiamond = 45;
                    this.diamond.string = this.buyNeedDiamond + "继续";
                    //cc.log("首次失败");
                }
                else {
                    this.btnFriend.active = false;
                    this.btnAd.active = true;
                    this.buyNeedDiamond = 90;
                    this.diamond.string = this.buyNeedDiamond + "继续";
                    // cc.log("再次失败");
                }
            }
            else {
                this.btnFriend.active = false;
                this.btnAd.active = true;
                //获取本关卡失败次数
                var levelFailNum = StorageMgr_1.StorageMgr.Storage.getInt(Constant_1.NativeKey.LevelFailTag, 0);
                if (levelFailNum == 0) {
                    StorageMgr_1.StorageMgr.Storage.setInt(Constant_1.NativeKey.LevelFailTag, 1);
                    this.buyNeedDiamond = 45;
                    this.diamond.string = this.buyNeedDiamond + "继续";
                    //cc.log("首次失败");
                }
                else {
                    this.buyNeedDiamond = 90;
                    this.diamond.string = this.buyNeedDiamond + "继续";
                    // cc.log("再次失败");
                }
            }
        }
    };
    GameFailEncouragePanel.prototype.onShow = function () {
        /*
         this.schedule(() => {
             //查询
             M.net.AskQueryWxFriendClickShare(M.runtime.UserId).then(result => {
                 if (result) {
                     cc.log("每秒查询好友点击 返回1");
                     this.gameGetStepContinue();
                 }else
                 {
                     //cc.log("每秒查询好友点击 返回0");
                 }
             });
         }, 1, cc.macro.REPEAT_FOREVER, 1);
         */
    };
    /*
    update(dt) {

        this.passedTime += dt;
        if (this.passedTime > 1) {
            this.passedTime=0;

            
        }
    }*/
    GameFailEncouragePanel.prototype.destory = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.GameCMD.GameGetStepContinue, this.gameGetStepContinue, this);
    };
    GameFailEncouragePanel.prototype.gameGetStepContinue = function () {
        //cc.log("好友点击了我的分享，我获得了步数继续游戏");
        //加5步
        GameModel_1.default.ins.stepLimit += 5;
        M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel);
        M_1.default.ui.hideUI(UIData_1.UIHudDef.UIGameFailEncourage);
        //todo: 继续游戏
        M_1.default.runtime.GameState = Constant_2.GameState.Normal;
    };
    //----------------------------------按钮绑定-------------------------------------------
    //关闭失败鼓励
    GameFailEncouragePanel.prototype.onBtnClickCloseFailEncourage = function () {
        //this.havaCoinLab.string = `当前金币:${M.runtime.getFormateCoin()}`;
        //cc.log("关闭失败鼓励界面1")
        this.onLevelBtnClick();
        /*
        M.ui.hideUI(UIHudDef.UIGameFailEncourage);

        //打开失败界面
        if (this._data) {
            UIMgr.ins.showUI(UIHudDef.GameOverFail, { type: UIHudDef.GameOverFail, data: this._data });
        }
        */
    };
    //弹出重新开始游戏界面
    GameFailEncouragePanel.prototype.onLevelBtnClick = function () {
        M_1.default.runtime.SelectLevel = M_1.default.runtime.CurLevel;
        M_1.default.ui.hideUI(UIData_1.UIHudDef.UIGameFailEncourage, function () {
            M_1.default.event.send(Event_1.Event.GameCMD.GameReset);
        });
    };
    //消耗钻石购买步数
    GameFailEncouragePanel.prototype.onBtnClickDiamond = function () {
        //cc.log("当前钻石数量:  "+ M.runtime.getCurrency(CurrencyId.Diamond));
        //this.buyNeedDiamond =1000001;
        if (this.buyNeedDiamond <= M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Diamond)) {
            M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Diamond, -this.buyNeedDiamond);
            //M.runtime.updatePropCount(this._type, this._buyCount);
            //M.tips.show(WaringTips.BuyOk);
            //this._updateView();
            //ReportMgr.ins.reportBuyProp(this._type, this._buyCount, M.runtime.getMatch3Level());
            //加5步
            GameModel_1.default.ins.stepLimit += 5;
            M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel);
            M_1.default.ui.hideUI(UIData_1.UIHudDef.UIGameFailEncourage);
            //todo: 继续游戏
            M_1.default.runtime.GameState = Constant_2.GameState.Normal;
            //cc.log("消耗钻石购买步数后，继续游戏");
        }
        else {
            //M.tips.show(`${Common.getCurrencyName(currency)}不够!`);
            //打开获取钻石界面
            this.SetRootIsState(false);
        }
    };
    //好友助力
    GameFailEncouragePanel.prototype.onBtnClickFriend = function () {
        //cc.log("好友助力分享");
        //ShareMgr.ins.LevelFailAddStepShare();
        var _this = this;
        M_1.default.platform.share("快来一起玩游戏", Paths_1.default.ShareImgPath + "level_share_45.png", 1).then(function (result) {
            if (result) {
                //cc.log("分享成功 返回");
                StorageMgr_1.StorageMgr.Storage.setInt(Constant_1.NativeKey.LevelFailShareTag, 1);
                var data2 = new Date();
                StorageMgr_1.StorageMgr.Storage.setInt(Constant_1.NativeKey.LevelFailShareTimeTag, data2.getDate());
                _this.gameGetStepContinue();
            }
            else {
            }
        });
    };
    //观看广告获得步数
    GameFailEncouragePanel.prototype.onBtnClickAdGetStep = function () {
        GameModel_1.default.ins.stepLimit += 1;
        M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel);
        M_1.default.ui.hideUI(UIData_1.UIHudDef.UIGameFailEncourage);
        //todo:继续游戏
        M_1.default.runtime.GameState = Constant_2.GameState.Normal;
        //cc.log("观看广告获得步数后，继续游戏");
    };
    //钻石获取界面关闭
    GameFailEncouragePanel.prototype.onBtnClickCloseGetDiamond = function () {
        //打开失败激励界面
        this.SetRootIsState(true);
    };
    //广告观看获得钻石
    GameFailEncouragePanel.prototype.onBtnClickLookAdGetDiamond = function () {
        //暂时没有看广告功能
        M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Diamond, 10);
        //todo: 刷新货币数量
    };
    //失败激励，购买钻石界面显示状态
    GameFailEncouragePanel.prototype.SetRootIsState = function (failEncouIsShow) {
        this.failEncourageRoot.active = failEncouIsShow;
        this.buyDiamondRoot.active = !failEncouIsShow;
    };
    __decorate([
        property(cc.Node)
    ], GameFailEncouragePanel.prototype, "failEncourageRoot", void 0);
    __decorate([
        property(cc.Node)
    ], GameFailEncouragePanel.prototype, "buyDiamondRoot", void 0);
    __decorate([
        property(cc.Label)
    ], GameFailEncouragePanel.prototype, "diamond", void 0);
    __decorate([
        property(cc.Node)
    ], GameFailEncouragePanel.prototype, "btnFriend", void 0);
    __decorate([
        property(cc.Node)
    ], GameFailEncouragePanel.prototype, "btnAd", void 0);
    GameFailEncouragePanel = __decorate([
        ccclass
    ], GameFailEncouragePanel);
    return GameFailEncouragePanel;
}(UIBase_1.default));
exports.default = GameFailEncouragePanel;

cc._RF.pop();