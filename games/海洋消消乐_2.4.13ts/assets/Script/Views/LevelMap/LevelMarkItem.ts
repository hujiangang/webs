import UIMgr from "../../Base/Manager/UIMgr";
import { UIHudDef } from "../../Logic/Data/Interface/UIData";
import RuntimeMgr from "../../Logic/Data/RuntimeMgr";
import M from "../../Base/Manager/M";
import { Event } from "../../Logic/Data/Const/Event";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelMarkItem extends cc.Component {

    @property(cc.Label)
    LabelLevel: cc.Label = null;
    @property(cc.Sprite)
    SpBg: cc.Sprite = null;
    @property(cc.Node)
    StarNode: cc.Node = null;

    @property([cc.Node])
    stars: cc.Node[] = [];

    @property(cc.SpriteFrame)
    SpState_complete: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    SpState_disable: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    SpState_open: cc.SpriteFrame = null;

    private curLevelNum: number;

    public updateData(levelNum: number) {
        this.curLevelNum = levelNum;
        this.LabelLevel.string = levelNum.toString();

        var curLevel = RuntimeMgr.ins.getMatch3Level();
        if (levelNum > curLevel) {          //未解锁
            this.SpBg.spriteFrame = this.SpState_disable;
        } else if (levelNum == curLevel) {  //正在当前关卡
            this.SpBg.spriteFrame = this.SpState_open;
            this.setStar(0);
        } else {                            //已通关
            this.SpBg.spriteFrame = this.SpState_complete;
            this.StarNode.active = true;
            const lvData = RuntimeMgr.ins.getNativeLvData(levelNum);
            this.setStar(lvData.score);
        }
    }

    public setStar(star: number) {
        for (var i = 1; i <= 3; ++i) {
            this.stars[i - 1].active = star >= i;
        }
    }

    public onClickLevel() {
        if (this.curLevelNum > RuntimeMgr.ins.getMatch3Level()) {
            return;
        }
        M.event.send(Event.UI.HideSelectLevelView);
        UIMgr.ins.showUI(UIHudDef.SelectShowTarget, { type: UIHudDef.SelectShowTarget, data: this.curLevelNum });
    }

}