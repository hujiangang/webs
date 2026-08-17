
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/GameFailEncouragePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcR2FtZUZhaWxFbmNvdXJhZ2VQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFFN0MsNkNBQXdDO0FBR3hDLHNEQUF1RDtBQUN2RCxxREFBcUQ7QUFFckQsZ0RBQStDO0FBQy9DLDBEQUFxRDtBQUNyRCwrREFBOEQ7QUFDOUQsc0RBQW9FO0FBSXBFLHNEQUltQztBQUNuQywyREFBc0Q7QUFDdEQsbURBQThDO0FBT3hDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW9ELDBDQUFNO0lBQTFEO1FBQUEscUVBbVBDO1FBaFBHLHVCQUFpQixHQUFZLElBQUksQ0FBQyxDQUFBLFFBQVE7UUFHMUMsb0JBQWMsR0FBWSxJQUFJLENBQUMsQ0FBQSxRQUFRO1FBSXZDLGFBQU8sR0FBYSxJQUFJLENBQUMsQ0FBQSxRQUFRO1FBSWpDLGVBQVMsR0FBWSxJQUFJLENBQUMsQ0FBQSxRQUFRO1FBR2xDLFdBQUssR0FBWSxJQUFJLENBQUMsQ0FBQSxTQUFTO1FBRy9CLGtDQUFrQztRQUMxQixpQkFBVyxHQUFZLElBQUksQ0FBQyxDQUFBLFVBQVU7UUFDdEMsb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFDOUIsV0FBSyxHQUFRLElBQUksQ0FBQyxDQUFBLFFBQVE7UUFDMUIsZ0JBQVUsR0FBVyxDQUFDLENBQUM7O0lBMk5uQyxDQUFDO0lBeE5HLHVDQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBR00sdUNBQU0s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QVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJEQUNNO0lBSXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkRBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDSTtJQWpCTCxzQkFBc0I7UUFEMUMsT0FBTztPQUNhLHNCQUFzQixDQW1QMUM7SUFBRCw2QkFBQztDQW5QRCxBQW1QQyxDQW5QbUQsZ0JBQU0sR0FtUHpEO2tCQW5Qb0Isc0JBQXNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCB7IFByb3BUeXBlLCBXYXJpbmdUaXBzIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IFByb3BJbmZvIGZyb20gXCIuLi8uLi8uLi9CYXNlL1RhYmxzL1Byb3BJbmZvXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IHsgQ3VycmVuY3lJZCB9IGZyb20gJy4uLy4uLy4uL0Jhc2UvQmFzZUNvbnN0JztcbmltcG9ydCBSZXBvcnRNZ3IgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9SZXBvcnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4uLy4uL01hdGNoMy9Nb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcbmltcG9ydCB7IE5hdGl2ZUtleSwgU2NlbmVUYXNrS2V5IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBJTGV2ZWwgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgU2hhcmVNZ3IgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9TaGFyZU1nclwiO1xuaW1wb3J0IHtcbiAgICBHYW1lU3RhdGUsIFNjb3JlQ29uZmlnLCBDZWxsVHlwZSxcbiAgICBFbGltYXRlVHlwZSwgUnVuVGltZUdhdGUsIE5ld2JpZU9wdCwgU2NlbmUsXG4gICAgQ29tYm9MZXZlbCwgY29tYm9SYXRpb1xufSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCBQYXRocyBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9QYXRoc1wiO1xuaW1wb3J0IHsgdGltZSB9IGZyb20gXCJjb25zb2xlXCI7XG5pbXBvcnQgeyBHdWlkZVV0aWxzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0dvZEd1aWRlL0d1aWRlVXRpbHNcIjtcblxuXG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVGYWlsRW5jb3VyYWdlUGFuZWwgZXh0ZW5kcyBVSUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZmFpbEVuY291cmFnZVJvb3Q6IGNjLk5vZGUgPSBudWxsOy8v5aSx6LSl6byT5Yqx55WM6Z2iXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidXlEaWFtb25kUm9vdDogY2MuTm9kZSA9IG51bGw7Ly/otK3kubDpkrvnn7PnlYzpnaJcblxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGRpYW1vbmQ6IGNjLkxhYmVsID0gbnVsbDsvL+iKsei0uemSu+efs+aVsOmHj1xuXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5GcmllbmQ6IGNjLk5vZGUgPSBudWxsOy8v5aW95Y+L5Yqp5Yqb5oyJ6ZKuXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5BZDogY2MuTm9kZSA9IG51bGw7Ly/lhY3otLnnnIvop4bpopHmjInpkq5cblxuXG4gICAgLy8gcHJpdmF0ZSBfdHlwZTogUHJvcFR5cGUgPSBudWxsO1xuICAgIHByaXZhdGUgaXNGaXJzdEZhaWw6IGJvb2xlYW4gPSB0cnVlOy8v5YWz5Y2h5piv5ZCm6aaW5qyh5aSx6LSlXG4gICAgcHJpdmF0ZSBidXlOZWVkRGlhbW9uZDogbnVtYmVyID0gbnVsbDtcbiAgICBwcml2YXRlIF9kYXRhOiBhbnkgPSBudWxsOy8v5aSx6LSl55WM6Z2i5pWw5o2uXG4gICAgcHJpdmF0ZSBwYXNzZWRUaW1lOiBudW1iZXIgPSAwO1xuXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5HYW1lR2V0U3RlcENvbnRpbnVlLCB0aGlzLmdhbWVHZXRTdGVwQ29udGludWUsIHRoaXMpO1xuICAgIH1cblxuXG4gICAgcHVibGljIG9uSW5pdChwYXJhbXM6IHsgZGF0YTogYW55IH0pIHtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHBhcmFtcy5kYXRhO1xuXG4gICAgICAgICAgICAvL+S4iuasoeWIhuS6q+aIkOWKn+eahOaXpeacn+WSjCDnjrDlnKjopoHliIbkuqvnmoTml7bpl7TkuI3mmK/lkIzkuIDlpKnkuJQg5LiK5qyh5bey57uP5YiG5Lqr5oiQ5Yqf77yM6YeN572u54q25oCBXG4gICAgICAgICAgICBsZXQgbGV2ZWxGYWlsU2hhcmVUYWcgPSBTdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0SW50KE5hdGl2ZUtleS5MZXZlbEZhaWxTaGFyZVRhZywgMCk7XG4gICAgICAgICAgICB2YXIgZGF0YTIgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgaWYgKGxldmVsRmFpbFNoYXJlVGFnID09IDEgJiYgU3RvcmFnZU1nci5TdG9yYWdlLmdldEludChOYXRpdmVLZXkuTGV2ZWxGYWlsU2hhcmVUaW1lVGFnLCAwKSAhPSBkYXRhMi5nZXREYXRlKCkpIHtcbiAgICAgICAgICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0SW50KE5hdGl2ZUtleS5MZXZlbEZhaWxTaGFyZVRhZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsZXZlbEZhaWxTaGFyZVRhZyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy/ojrflj5bmnKzlhbPljaHlpLHotKXmrKHmlbBcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWxGYWlsTnVtID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldEludChOYXRpdmVLZXkuTGV2ZWxGYWlsVGFnLCAwKTtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWxGYWlsTnVtID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldEludChOYXRpdmVLZXkuTGV2ZWxGYWlsVGFnLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5GcmllbmQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5BZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlOZWVkRGlhbW9uZCA9IDQ1O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYW1vbmQuc3RyaW5nID0gdGhpcy5idXlOZWVkRGlhbW9uZCArIFwi57un57utXCI7XG4gICAgICAgICAgICAgICAgICAgIC8vY2MubG9nKFwi6aaW5qyh5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuRnJpZW5kLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bkFkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5TmVlZERpYW1vbmQgPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFtb25kLnN0cmluZyA9IHRoaXMuYnV5TmVlZERpYW1vbmQgKyBcIue7p+e7rVwiO1xuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCLlho3mrKHlpLHotKVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYnRuRnJpZW5kLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYnRuQWQuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8v6I635Y+W5pys5YWz5Y2h5aSx6LSl5qyh5pWwXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsRmFpbE51bSA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRJbnQoTmF0aXZlS2V5LkxldmVsRmFpbFRhZywgMCk7XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsRmFpbE51bSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFN0b3JhZ2VNZ3IuU3RvcmFnZS5zZXRJbnQoTmF0aXZlS2V5LkxldmVsRmFpbFRhZywgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5TmVlZERpYW1vbmQgPSA0NTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFtb25kLnN0cmluZyA9IHRoaXMuYnV5TmVlZERpYW1vbmQgKyBcIue7p+e7rVwiO1xuICAgICAgICAgICAgICAgICAgICAvL2NjLmxvZyhcIummluasoeWksei0pVwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eU5lZWREaWFtb25kID0gOTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbW9uZC5zdHJpbmcgPSB0aGlzLmJ1eU5lZWREaWFtb25kICsgXCLnu6fnu61cIjtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwi5YaN5qyh5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHVibGljIG9uU2hvdygpIHtcbiAgICAgICAgLypcbiAgICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICAgICAgIC8v5p+l6K+iXG4gICAgICAgICAgICAgTS5uZXQuQXNrUXVlcnlXeEZyaWVuZENsaWNrU2hhcmUoTS5ydW50aW1lLlVzZXJJZCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCLmr4/np5Lmn6Xor6Llpb3lj4vngrnlh7sg6L+U5ZueMVwiKTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUdldFN0ZXBDb250aW51ZSgpO1xuICAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAvL2NjLmxvZyhcIuavj+enkuafpeivouWlveWPi+eCueWHuyDov5Tlm54wXCIpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgICB9LCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiwgMSk7XG4gICAgICAgICAqL1xuICAgIH1cblxuXG4gICAgLypcbiAgICB1cGRhdGUoZHQpIHtcblxuICAgICAgICB0aGlzLnBhc3NlZFRpbWUgKz0gZHQ7XG4gICAgICAgIGlmICh0aGlzLnBhc3NlZFRpbWUgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZFRpbWU9MDtcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9Ki9cblxuXG4gICAgcHVibGljIGRlc3RvcnkoKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuR2FtZUdldFN0ZXBDb250aW51ZSwgdGhpcy5nYW1lR2V0U3RlcENvbnRpbnVlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2FtZUdldFN0ZXBDb250aW51ZSgpIHtcbiAgICAgICAgLy9jYy5sb2coXCLlpb3lj4vngrnlh7vkuobmiJHnmoTliIbkuqvvvIzmiJHojrflvpfkuobmraXmlbDnu6fnu63muLjmiI9cIik7XG5cbiAgICAgICAgLy/liqA15q2lXG4gICAgICAgIEdhbWVNb2RlbC5pbnMuc3RlcExpbWl0ICs9IDU7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwpO1xuICAgICAgICBNLnVpLmhpZGVVSShVSUh1ZERlZi5VSUdhbWVGYWlsRW5jb3VyYWdlKTtcblxuICAgICAgICAvL3RvZG86IOe7p+e7rea4uOaIj1xuICAgICAgICBNLnJ1bnRpbWUuR2FtZVN0YXRlID0gR2FtZVN0YXRlLk5vcm1hbDtcbiAgICB9XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaMiemSrue7keWumi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8v5YWz6Zet5aSx6LSl6byT5YqxXG4gICAgcHVibGljIG9uQnRuQ2xpY2tDbG9zZUZhaWxFbmNvdXJhZ2UoKSB7XG4gICAgICAgIC8vdGhpcy5oYXZhQ29pbkxhYi5zdHJpbmcgPSBg5b2T5YmN6YeR5biBOiR7TS5ydW50aW1lLmdldEZvcm1hdGVDb2luKCl9YDtcblxuICAgICAgICAvL2NjLmxvZyhcIuWFs+mXreWksei0pem8k+WKseeVjOmdojFcIilcbiAgICAgICAgdGhpcy5vbkxldmVsQnRuQ2xpY2soKTtcblxuXG5cbiAgICAgICAgLypcbiAgICAgICAgTS51aS5oaWRlVUkoVUlIdWREZWYuVUlHYW1lRmFpbEVuY291cmFnZSk7XG5cbiAgICAgICAgLy/miZPlvIDlpLHotKXnlYzpnaJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR2FtZU92ZXJGYWlsLCB7IHR5cGU6IFVJSHVkRGVmLkdhbWVPdmVyRmFpbCwgZGF0YTogdGhpcy5fZGF0YSB9KTtcbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgIH1cblxuXG4gICAgLy/lvLnlh7rph43mlrDlvIDlp4vmuLjmiI/nlYzpnaJcbiAgICBwdWJsaWMgb25MZXZlbEJ0bkNsaWNrKCkge1xuICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSBNLnJ1bnRpbWUuQ3VyTGV2ZWw7XG4gICAgICAgIE0udWkuaGlkZVVJKFVJSHVkRGVmLlVJR2FtZUZhaWxFbmNvdXJhZ2UsICgpID0+IHtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELkdhbWVSZXNldCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy/mtojogJfpkrvnn7PotK3kubDmraXmlbBcbiAgICBwdWJsaWMgb25CdG5DbGlja0RpYW1vbmQoKSB7XG4gICAgICAgIC8vY2MubG9nKFwi5b2T5YmN6ZK755+z5pWw6YePOiAgXCIrIE0ucnVudGltZS5nZXRDdXJyZW5jeShDdXJyZW5jeUlkLkRpYW1vbmQpKTtcblxuICAgICAgICAvL3RoaXMuYnV5TmVlZERpYW1vbmQgPTEwMDAwMDE7XG4gICAgICAgIGlmICh0aGlzLmJ1eU5lZWREaWFtb25kIDw9IE0ucnVudGltZS5nZXRDdXJyZW5jeShDdXJyZW5jeUlkLkRpYW1vbmQpKSB7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuYWRkQ3VycmVuY3koQ3VycmVuY3lJZC5EaWFtb25kLCAtdGhpcy5idXlOZWVkRGlhbW9uZCk7XG4gICAgICAgICAgICAvL00ucnVudGltZS51cGRhdGVQcm9wQ291bnQodGhpcy5fdHlwZSwgdGhpcy5fYnV5Q291bnQpO1xuICAgICAgICAgICAgLy9NLnRpcHMuc2hvdyhXYXJpbmdUaXBzLkJ1eU9rKTtcbiAgICAgICAgICAgIC8vdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgICAgICAgLy9SZXBvcnRNZ3IuaW5zLnJlcG9ydEJ1eVByb3AodGhpcy5fdHlwZSwgdGhpcy5fYnV5Q291bnQsIE0ucnVudGltZS5nZXRNYXRjaDNMZXZlbCgpKTtcblxuICAgICAgICAgICAgLy/liqA15q2lXG4gICAgICAgICAgICBHYW1lTW9kZWwuaW5zLnN0ZXBMaW1pdCArPSA1O1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLlVwZGF0ZUluZm9QYW5lbCk7XG4gICAgICAgICAgICBNLnVpLmhpZGVVSShVSUh1ZERlZi5VSUdhbWVGYWlsRW5jb3VyYWdlKTtcblxuICAgICAgICAgICAgLy90b2RvOiDnu6fnu63muLjmiI9cbiAgICAgICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgPSBHYW1lU3RhdGUuTm9ybWFsO1xuICAgICAgICAgICAgLy9jYy5sb2coXCLmtojogJfpkrvnn7PotK3kubDmraXmlbDlkI7vvIznu6fnu63muLjmiI9cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL00udGlwcy5zaG93KGAke0NvbW1vbi5nZXRDdXJyZW5jeU5hbWUoY3VycmVuY3kpfeS4jeWknyFgKTtcbiAgICAgICAgICAgIC8v5omT5byA6I635Y+W6ZK755+z55WM6Z2iXG4gICAgICAgICAgICB0aGlzLlNldFJvb3RJc1N0YXRlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy/lpb3lj4vliqnliptcbiAgICBwdWJsaWMgb25CdG5DbGlja0ZyaWVuZCgpIHtcbiAgICAgICAgLy9jYy5sb2coXCLlpb3lj4vliqnlipvliIbkuqtcIik7XG4gICAgICAgIC8vU2hhcmVNZ3IuaW5zLkxldmVsRmFpbEFkZFN0ZXBTaGFyZSgpO1xuXG4gICAgICAgIE0ucGxhdGZvcm0uc2hhcmUoXCLlv6vmnaXkuIDotbfnjqnmuLjmiI9cIiwgUGF0aHMuU2hhcmVJbWdQYXRoICsgXCJsZXZlbF9zaGFyZV80NS5wbmdcIiwgMSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIC8vY2MubG9nKFwi5YiG5Lqr5oiQ5YqfIOi/lOWbnlwiKTtcbiAgICAgICAgICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0SW50KE5hdGl2ZUtleS5MZXZlbEZhaWxTaGFyZVRhZywgMSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF0YTIgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIFN0b3JhZ2VNZ3IuU3RvcmFnZS5zZXRJbnQoTmF0aXZlS2V5LkxldmVsRmFpbFNoYXJlVGltZVRhZywgZGF0YTIuZ2V0RGF0ZSgpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUdldFN0ZXBDb250aW51ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8v6KeC55yL5bm/5ZGK6I635b6X5q2l5pWwXG4gICAgcHVibGljIG9uQnRuQ2xpY2tBZEdldFN0ZXAoKSB7XG4gICAgICAgIEdhbWVNb2RlbC5pbnMuc3RlcExpbWl0ICs9IDE7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwpO1xuICAgICAgICBNLnVpLmhpZGVVSShVSUh1ZERlZi5VSUdhbWVGYWlsRW5jb3VyYWdlKTtcbiAgICAgICAgLy90b2RvOue7p+e7rea4uOaIj1xuICAgICAgICBNLnJ1bnRpbWUuR2FtZVN0YXRlID0gR2FtZVN0YXRlLk5vcm1hbDtcbiAgICAgICAgLy9jYy5sb2coXCLop4LnnIvlub/lkYrojrflvpfmraXmlbDlkI7vvIznu6fnu63muLjmiI9cIik7XG4gICAgfVxuXG5cbiAgICAvL+mSu+efs+iOt+WPlueVjOmdouWFs+mXrVxuICAgIHB1YmxpYyBvbkJ0bkNsaWNrQ2xvc2VHZXREaWFtb25kKCkge1xuICAgICAgICAvL+aJk+W8gOWksei0pea/gOWKseeVjOmdolxuICAgICAgICB0aGlzLlNldFJvb3RJc1N0YXRlKHRydWUpO1xuICAgIH1cblxuXG4gICAgLy/lub/lkYrop4LnnIvojrflvpfpkrvnn7NcbiAgICBwdWJsaWMgb25CdG5DbGlja0xvb2tBZEdldERpYW1vbmQoKSB7XG4gICAgICAgIC8v5pqC5pe25rKh5pyJ55yL5bm/5ZGK5Yqf6IO9XG4gICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeShDdXJyZW5jeUlkLkRpYW1vbmQsIDEwKTtcbiAgICAgICAgLy90b2RvOiDliLfmlrDotKfluIHmlbDph49cblxuICAgIH1cblxuXG4gICAgLy/lpLHotKXmv4DlirHvvIzotK3kubDpkrvnn7PnlYzpnaLmmL7npLrnirbmgIFcbiAgICBwcml2YXRlIFNldFJvb3RJc1N0YXRlKGZhaWxFbmNvdUlzU2hvdzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmZhaWxFbmNvdXJhZ2VSb290LmFjdGl2ZSA9IGZhaWxFbmNvdUlzU2hvdztcbiAgICAgICAgdGhpcy5idXlEaWFtb25kUm9vdC5hY3RpdmUgPSAhZmFpbEVuY291SXNTaG93O1xuICAgIH1cbn1cbiJdfQ==