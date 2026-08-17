import M from "../../../Base/Manager/M";
import Common from "../Common";
import { Util } from "../../../Base/Utils/Util";
import { UIHudDef } from "../../Data/Interface/UIData";
import { Event } from "../../Data/Const/Event";
import BoxTipsCtrl from "./BoxTipsCtrl";

const { ccclass, property } = cc._decorator;

const GapLv = 30;
@ccclass
export default class BoxGiftCtrl extends cc.Component {

    @property(cc.Node)
    pointPath: cc.Node = null;

    @property(cc.Prefab)
    tipsPrefab: cc.Prefab = null;

    @property(cc.Node)
    dog: cc.Node = null;

    @property([cc.RichText])
    lvLabels: cc.RichText[] = [];

    @property([cc.Sprite])
    boxSprites: cc.Sprite[] = [];

    @property([cc.SpriteFrame])
    boxFrame: cc.SpriteFrame[] = [];

    /**浮标....0为已经走过的. 1为没走过的 */
    @property([cc.SpriteFrame])
    buoyFrame: cc.SpriteFrame[] = [];

    private _tips: BoxTipsCtrl = null;

    private _curShowLevel: Array<number> = null;
    private _minLv: number = 0;
    private _maxLv: number = 0;

    onLoad() {
        M.event.register(Event.UI.updateBoxState, this._updateBoxState, this);
    }

    onDestroy() {
        this._tips = null;
        M.event.unRegister(Event.UI.updateBoxState, this._updateBoxState, this);
    }


    private _initTips() {
        if (!this._tips) {
            const node = M.nodePool.createItem(this.tipsPrefab);
            node.parent = this.node;
            node.setPosition(0, 100);
            this._tips = node.getComponent(BoxTipsCtrl);
            this._tips.hide();
        }
    }

    public init(min: number = null, max: number = null) {
        min = min || 1;
        max = max || Math.floor(M.runtime.getMatch3Level() / 10);
        this._initTips();
        let fristBox = 0;
        for (let i = min; i <= max; i++) {
            //定位第一个未领取的箱子等级!
            const data = M.runtime.getBoxGiftDataByLv(i * 10);
            if (!data || (data && !data.received)) {
                //开始走3个!
                fristBox = (i - 1);
                break;
            }
        }
        //确认显示区间!
        this._curShowLevel = [];
        for (let i = 1; i <= 3; i++) {
            const base = ((fristBox / 3 + 1) >> 0) - 1;
            this._curShowLevel.push(((base * 3) + i) * 10);
        }
        this._showView(this._curShowLevel)
    }

    public onBoxClick(event, index) {
        index = Number(index);
        const key = this._curShowLevel[index];
        const boxData = M.runtime.getBoxGiftDataByLv(key);
        if (boxData && !boxData.received) {
            const boxConfig = M.table.BoxRewardInfo.getByPrimaryKey(key);
            if (boxConfig) {
                //展示奖励ui . 发放奖励
                M.ui.showUI(UIHudDef.OpenBox, { config: boxConfig });
            }
        } else if (!boxData) {
            this._showTips(index, key);
        }
    }

    public updatePage(min: number, max: number) {
        this._minLv = min; this._maxLv = max;
        this.init(Math.floor(min / 10) + 1, Math.floor(max / 10));
    }

    public onOtherClick() {
        this._tips && this._tips.hide();
    }

    private _updateBoxState(lv: number) {
        if (this._curShowLevel) {
            const index = this._curShowLevel.indexOf(lv);
            this._showBox(index, lv);
        }
    }

    private _showView(fillData: Array<number>) {
        for (let i = 0; i < fillData.length; i++) {
            const lv = fillData[i];
            this._showLvLabel(i, lv);
            this._showBox(i, lv);
        }
        this._showDog();
    }

    private _showLvLabel(index: number, level: number) {
        this.lvLabels[index].string = `第 <color=#fff841>${level}</color> 关`;
    }

    private _showBox(index: number, lv: number) {
        const box = this.boxSprites[index];
        const data = M.runtime.getBoxGiftDataByLv(lv);
        if (!box) return;
        box.node.stopAllActions();
        if (data && data.received) {
            box.spriteFrame = this.boxFrame[1];
        } else {
            box.spriteFrame = this.boxFrame[0];
            if (data && !data.received) {
                //抖动
                this._shakingBox(box.node);
            }
        }
    }

    private _showTips(index: number, lv: number) {
        if (this._tips) {
            const config = M.table.BoxRewardInfo.getByPrimaryKey(lv);
            this._tips.show(config.rewards, cc.v2(this.boxSprites[index].node.x, this._tips.node.y));
        }
    }

    private _shakingBox(node: cc.Node) {
        const a0 = cc.moveBy(0.05, cc.v2(Util.Tool.rangeInt(2, 5), Util.Tool.rangeInt(2, 5)))
        const a1 = <any>a0.reverse();
        node.runAction(cc.repeatForever(cc.sequence(a0, a1)));
    }

    private _showDog() {
        const maxLength = this.pointPath.children.length;
        //当前关卡
        const curLv = M.runtime.getMatch3Level();
        let pointIndex = (curLv % GapLv) * (maxLength / GapLv) - 1;
        let dogPoint = null;
        if (curLv >= this._maxLv) {
            pointIndex = maxLength;
        }
        if (curLv <= this._minLv) {
            pointIndex = 0;
        }
        for (let i = 0; i < maxLength; i++) {
            const node = this.pointPath.children[i];
            if (i <= pointIndex) {
                if (node.name == 'point') {
                    node.getChildByName('y').active = true;
                } else {
                    node.getComponent(cc.Sprite).spriteFrame = this.buoyFrame[0];
                }
                dogPoint = node;
            } else {
                if (node.name == 'point') {
                    node.getChildByName('y').active = false;
                } else {
                    node.getComponent(cc.Sprite).spriteFrame = this.buoyFrame[1];
                }
            }
        }
        if (dogPoint) {
            this.dog.x = this.dog.parent.convertToNodeSpaceAR(Common.getWorldPos(dogPoint)).x;
        }
    }

}