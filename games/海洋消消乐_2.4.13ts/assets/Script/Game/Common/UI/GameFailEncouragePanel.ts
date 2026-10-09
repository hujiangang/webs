import ForestUI, {Palette} from './ForestUI';
import UIBase from "./UIBase";
import { PropType, WaringTips } from "../../Data/Const/Constant";
import M from "../../../Application/M";
import PropInfo from "../../Config/Tables/PropInfo";
import Common from "../Common";
import { UIHudDef } from "../../Data/Interface/UIData";
import { CurrencyId } from '../../Data/Const/BaseConst';
import ReportMgr from "../../Services/ReportMgr";
import { Event } from "../../Data/Const/Event";
import GameModel from "../../Match3/Model/GameModel";
import { StorageMgr } from "../../Data/StorageMgr";
import { NativeKey, SceneTaskKey } from "../../Data/Const/Constant";
import UIMgr from "./UIMgr";
import { ILevel } from "../../Data/Interface/Level/ILevel";
import ShareMgr from "../../Services/ShareMgr";
import {
    GameState, ScoreConfig, CellType,
    ElimateType, RunTimeGate, NewbieOpt, Scene,
    ComboLevel, comboRatio
} from "../../Data/Const/Constant";
import EventMgr from "../../../Framework/Events/EventMgr";
import Paths from "../../Config/Paths";
import ResCtrl from '../../Match3/ResCtrl';




const { ccclass, property } = cc._decorator;

@ccclass
export default class GameFailEncouragePanel extends UIBase {

    @property(cc.Node)
    failEncourageRoot: cc.Node = null;//失败鼓励界面

    @property(cc.Node)
    buyDiamondRoot: cc.Node = null;//购买钻石界面


    @property(cc.Label)
    diamond: cc.Label = null;//花费钻石数量


    @property(cc.Node)
    btnFriend: cc.Node = null;//好友助力按钮

    @property(cc.Node)
    btnAd: cc.Node = null;//免费看视频按钮


    // private _type: PropType = null;
    private isFirstFail: boolean = true;//关卡是否首次失败
    private buyNeedDiamond: number = null;
    private _data: any = null;//失败界面数据
    private passedTime: number = 0;


    onLoad() {
        super.onLoad();
        EventMgr.ins.register(Event.GameCMD.GameGetStepContinue, this.gameGetStepContinue, this);
    }


    public onInit(params: { data: any }) {
        if (params) {
            this._data = params.data;

            //上次分享成功的日期和 现在要分享的时间不是同一天且 上次已经分享成功，重置状态
            let levelFailShareTag = StorageMgr.Storage.getInt(NativeKey.LevelFailShareTag, 0);
            var data2 = new Date();
            if (levelFailShareTag == 1 && StorageMgr.Storage.getInt(NativeKey.LevelFailShareTimeTag, 0) != data2.getDate()) {
                StorageMgr.Storage.setInt(NativeKey.LevelFailShareTag, 0);
            }

            if (levelFailShareTag == 0) {
                //获取本关卡失败次数
                let levelFailNum = StorageMgr.Storage.getInt(NativeKey.LevelFailTag, 0);
                if (levelFailNum == 0) {
                    StorageMgr.Storage.setInt(NativeKey.LevelFailTag, 1);
                    this.btnFriend.active = true;
                    this.btnAd.active = false;
                    this.buyNeedDiamond = 45;
                    this.diamond.string = this.buyNeedDiamond + "继续";
                    //cc.log("首次失败");
                } else {
                    this.btnFriend.active = false;
                    this.btnAd.active = true;
                    this.buyNeedDiamond = 90;
                    this.diamond.string = this.buyNeedDiamond + "继续";
                    // cc.log("再次失败");
                }
            } else {

                this.btnFriend.active = false;
                this.btnAd.active = true;

                //获取本关卡失败次数
                let levelFailNum = StorageMgr.Storage.getInt(NativeKey.LevelFailTag, 0);
                if (levelFailNum == 0) {
                    StorageMgr.Storage.setInt(NativeKey.LevelFailTag, 1);
                    this.buyNeedDiamond = 45;
                    this.diamond.string = this.buyNeedDiamond + "继续";
                    //cc.log("首次失败");
                } else {
                    this.buyNeedDiamond = 90;
                    this.diamond.string = this.buyNeedDiamond + "继续";
                    // cc.log("再次失败");
                }
            }
        }
        this.drawForestFailure();
    }


    private drawForestFailure() {
        this.node.children.forEach(n=>n.active=false);
        const old=this.node.getChildByName('ForestFailure');if(old){old.removeFromParent();old.destroy();}
        const m=ForestUI.modal(this.node,'挑战未完成',740);m.root.name='ForestFailure';const p=m.panel;
        ForestUI.text(p,'第 '+M.runtime.CurLevel+' 关',32,0,235);
        ForestUI.text(p,'剩余目标',25,0,181,Palette.muted);
        const remaining=Array.from(GameModel.ins.getCollect()).filter(entry=>entry[1]>0).slice(0,4);
        const collectIcons={box:0,gnome:1,turtles:2,tree:3,crab:4,stone:5,gem:6,firefly:7,colorbox:8};
        remaining.forEach(([type,count],i)=>{
            const x=(i-(remaining.length-1)/2)*115;
            const icon=ForestUI.node(p,'RemainingTarget',x,111);
            const sprite=icon.addComponent(cc.Sprite);sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame=collectIcons[type]!==undefined?ResCtrl.ins.getCollectFrame(collectIcons[type]):ResCtrl.ins.getCellFrame(Number(type),Number(type));
            icon.setContentSize(78,78);ForestUI.text(p,String(count),27,x,53,Palette.ink,100);
        });
        const msg=ForestUI.text(p,'继续游戏或重新挑战',24,0,7,Palette.ink,510);
        ForestUI.button(p,'重新挑战',440,80,0,-83,()=>this.onLevelBtnClick(),Palette.green);
        ForestUI.button(p,'继续 +5 步 · '+this.buyNeedDiamond+' 钻石',440,72,0,-179,()=>{
            if(M.runtime.getCurrency(CurrencyId.Diamond)<this.buyNeedDiamond){msg.string='钻石不足，可以重新挑战';return;}
            this.onBtnClickDiamond();
        },Palette.blue);
        const home=()=>{M.ui.closeAllUI();M.runtime.SelectLevel=0;Common.jumpScene(Scene.Home);};
        ForestUI.button(p,'返回关卡',440,72,0,-275,home,Palette.purple);
        const close=p.getChildByName('Button-');close.off(cc.Node.EventType.TOUCH_END);ForestUI.tap(close,home);
    }

    public onShow() {
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
    }


    /*
    update(dt) {

        this.passedTime += dt;
        if (this.passedTime > 1) {
            this.passedTime=0;

            
        }
    }*/


    public onUIDestroy() {
        EventMgr.ins.unRegister(Event.GameCMD.GameGetStepContinue, this.gameGetStepContinue, this);
    }

    public gameGetStepContinue() {
        //cc.log("好友点击了我的分享，我获得了步数继续游戏");

        //加5步
        GameModel.ins.stepLimit += 5;
        M.event.send(Event.UI.UpdateInfoPanel);
        M.ui.hideUI(UIHudDef.UIGameFailEncourage);

        //todo: 继续游戏
        M.runtime.GameState = GameState.Normal;
    }


    //----------------------------------按钮绑定-------------------------------------------

    //关闭失败鼓励
    public onBtnClickCloseFailEncourage() {
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
    }


    //弹出重新开始游戏界面
    public onLevelBtnClick() {
        M.runtime.SelectLevel = M.runtime.CurLevel;
        M.ui.hideUI(UIHudDef.UIGameFailEncourage, () => {
            M.event.send(Event.GameCMD.GameReset);
        });
    }


    //消耗钻石购买步数
    public onBtnClickDiamond() {
        //cc.log("当前钻石数量:  "+ M.runtime.getCurrency(CurrencyId.Diamond));

        //this.buyNeedDiamond =1000001;
        if (this.buyNeedDiamond <= M.runtime.getCurrency(CurrencyId.Diamond)) {
            M.runtime.addCurrency(CurrencyId.Diamond, -this.buyNeedDiamond);
            //M.runtime.updatePropCount(this._type, this._buyCount);
            //M.tips.show(WaringTips.BuyOk);
            //this._updateView();
            //ReportMgr.ins.reportBuyProp(this._type, this._buyCount, M.runtime.getMatch3Level());

            //加5步
            GameModel.ins.stepLimit += 5;
            M.event.send(Event.UI.UpdateInfoPanel);
            M.ui.hideUI(UIHudDef.UIGameFailEncourage);

            //todo: 继续游戏
            M.runtime.GameState = GameState.Normal;
            //cc.log("消耗钻石购买步数后，继续游戏");
        }
        else {
            //M.tips.show(`${Common.getCurrencyName(currency)}不够!`);
            //打开获取钻石界面
            this.SetRootIsState(false);
        }
    }


    //好友助力
    public onBtnClickFriend() {
        //cc.log("好友助力分享");
        //ShareMgr.ins.LevelFailAddStepShare();

        M.platform.share("快来一起玩游戏", Paths.ShareImgPath + "level_share_45.png", 1).then(result => {
            if (result) {
                //cc.log("分享成功 返回");
                StorageMgr.Storage.setInt(NativeKey.LevelFailShareTag, 1);

                var data2 = new Date();
                StorageMgr.Storage.setInt(NativeKey.LevelFailShareTimeTag, data2.getDate());

                this.gameGetStepContinue();
            } else {

            }
        });
    }


    //观看广告获得步数
    public onBtnClickAdGetStep() {
        GameModel.ins.stepLimit += 1;
        M.event.send(Event.UI.UpdateInfoPanel);
        M.ui.hideUI(UIHudDef.UIGameFailEncourage);
        //todo:继续游戏
        M.runtime.GameState = GameState.Normal;
        //cc.log("观看广告获得步数后，继续游戏");
    }


    //钻石获取界面关闭
    public onBtnClickCloseGetDiamond() {
        //打开失败激励界面
        this.SetRootIsState(true);
    }


    //广告观看获得钻石
    public onBtnClickLookAdGetDiamond() {
        //暂时没有看广告功能
        M.runtime.addCurrency(CurrencyId.Diamond, 10);
        //todo: 刷新货币数量

    }


    //失败激励，购买钻石界面显示状态
    private SetRootIsState(failEncouIsShow: boolean) {
        this.failEncourageRoot.active = failEncouIsShow;
        this.buyDiamondRoot.active = !failEncouIsShow;
    }
}
