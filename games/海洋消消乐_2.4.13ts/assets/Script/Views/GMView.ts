import UIBase from "../Base/UI/UIBase";
import M from "../Base/Manager/M";
import { CurrencyId } from "../Base/BaseConst";
import UIMgr from "../Base/Manager/UIMgr";
import { UIHudDef } from "../Logic/Data/Interface/UIData";
import Common from "../Logic/Common/Common";
import { Scene } from "../Logic/Data/Const/Constant";
import { StorageMgr } from "../Base/Manager/StorageMgr";
import NetMgr from "../Base/Manager/NetMgr";
import { Event } from "../Logic/Data/Const/Event";

const { ccclass, property } = cc._decorator;


@ccclass
export class GMView extends UIBase {

    @property(cc.EditBox)
    editCoin: cc.EditBox = null;

    @property(cc.EditBox)
    editDiamond: cc.EditBox = null;

    @property(cc.EditBox)
    editLevel: cc.EditBox = null;

    @property(cc.EditBox)
    editUserId: cc.EditBox = null;

    onLoad() {
        super.onLoad();
    }

    start() {
        this.editLevel.string = M.runtime.CurLevel.toString();
        this.editUserId.string = StorageMgr.Storage.getString("__userId");
    }

    //增加金币
    public onAddCoin() {
        let num = Number(this.editCoin.string) || 1000;
        M.runtime.addCurrency(CurrencyId.Coin, num);
        UIMgr.ins.closeUI(UIHudDef.GMView);
    }

    //增加钻石
    public onAddDiamond() {
        let num = Number(this.editDiamond.string) || 100;
        M.runtime.addCurrency(CurrencyId.Diamond, num);
        UIMgr.ins.closeUI(UIHudDef.GMView);
    }

    public onJumpLevel() {
        M.runtime.SelectLevel = 0;
        const nextLv = Number(this.editLevel.string) || 1;
        M.runtime.setMatch3Level(nextLv, true);
        Common.jumpScene(Scene.Match);
        UIMgr.ins.closeUI(UIHudDef.GMView);
    }

    //切换账号
    public onChangePlayer() {
        let userId = this.RemoveChinese(this.editUserId.string) || Date.now().toString();
        StorageMgr.Storage.setString("__userId", userId, true);

        window.location.reload();
    }

    public async onCleanPlayer() {
        let ss = await NetMgr.ins.cleanPlayer();
        if (ss) {
            window.location.reload();
        }
    }

    public onGameOver() {
        M.event.send(Event.GameCMD.GameOver, true);
        this.onClickClose();
    }

    public onClickClose() {
        UIMgr.ins.closeUI(UIHudDef.GMView);
    }

    public RemoveChinese(strValue) {
        if (strValue != null && strValue != "") {
            var reg = /[\u4e00-\u9fa5]/g;
            return strValue.replace(reg, "");
        }
        else
            return "";
    }

    public onWin() {
        M.runtime.SelectLevel = 0;
        const isNew = M.runtime.savaLvData(3);
        if (isNew) {
            //奖励!
            const info = M.table.LevelUpReward.getByPrimaryKey(M.runtime.CurLevel);
            if (info && info.rewards) {
                info.rewards.forEach(item => {
                    M.runtime.addCurrency(item.type, item.count);
                })
            }
        }
        UIMgr.ins.showUI(UIHudDef.GameOverWin, { type: UIHudDef.GameOverWin, data: 3 });
        M.runtime.setMatch3Level(M.runtime.CurLevel + 1);
        UIMgr.ins.closeUI(UIHudDef.GMView);
    }
}   