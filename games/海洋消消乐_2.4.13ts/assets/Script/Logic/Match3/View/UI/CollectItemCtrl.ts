import ResCtrl from "../../ResCtrl";
import M from "../../../../Base/Manager/M";
import GameModel from "../../Model/GameModel";
import { Event } from "../../../Data/Const/Event";
import { CollectType } from "../../Model/CollectModel";
import { CellType } from "../../../Data/Const/Constant";
import Common from "../../../Common/Common";
import RuntimeMgr from "../../../Data/RuntimeMgr";

const { ccclass, property } = cc._decorator;
@ccclass
export default class CollectItemCtrl extends cc.Component {

    @property(cc.Label)
    count: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    /**炸弹的单张图 */
    @property([cc.SpriteFrame])
    BombStaticFrame: cc.SpriteFrame[] = [];
    /**普通元素的图 */
    @property([cc.SpriteFrame])
    NormalCellFrame: cc.SpriteFrame[] = [];
    /**森林地图的元素图 */
    @property([cc.SpriteFrame])
    Map2NormalCellFrame: cc.SpriteFrame[] = [];
    /**收集物目标icon */
    @property([cc.SpriteFrame])
    CollectIcon: cc.SpriteFrame[] = [];

    private _type: string | CellType = null;

    onDestroy() {
        M.event.unRegister(Event.UI.UpdateInfoPanel, this.onUpdateCollectCount, this);
    }

    public init(type: string | CellType, count: number) {
        this._type = type;
        this.icon.spriteFrame = this.getIcon(type);
        let heithLimit = 60;
        if (this.node.name == 'showTargetPrefab') {
            heithLimit = 80
        }
        this.icon.node.setScale(heithLimit / this.icon.node.height);
        this.count.string = `x${count}`;
        M.event.register(Event.UI.UpdateInfoPanel, this.onUpdateCollectCount, this);
    }

    public changeLabelColor(color: cc.Color = null) {
        this.count.node.color = color || cc.color(255, 0, 0, 255);
    }

    private onUpdateCollectCount(type: string | CellType) {
        if (type == this._type) {
            const c = GameModel.ins.getCollect();
            if (c) {
                this.count.string = `${c.get(type + '')}`;
            }
        }
    }

    private getIcon(type): cc.SpriteFrame {
        let index = null;
        let result = null;
        switch (type) {
            case CollectType.box:
                index = 0;
                break;
            case CollectType.gnome:
                index = 1;
                break
            case CollectType.turtles:
                index = 2;
                break
            case CollectType.tree:
                index = 3;
                break
            case CollectType.crab:
                index = 4;
                break
            case CollectType.stone:
                index = 5;
                break
            case CollectType.gem:
                index = 6;
                break;
            case CollectType.firefly:
                index = 7;
                break;
            case CollectType.colorbox:
                index = 8;
                break;
        }
        result = this._getRes(type, index);
        return result;
    }

    private _getRes(type, index) {
        let result = null;
        if (ResCtrl.ins) {
            if (index == null) {
                result = ResCtrl.ins.getCellFrame(type, type);
            } else {
                result = ResCtrl.ins.getCollectFrame(index);
            }
        } else {
            if (index == null) {
                result = this._getCellFrame(type, type);
            } else {
                result = this._getCollectFrame(index);
            }
        }
        return result;
    }


    private _getCellFrame(type: CellType, index: number) {
        let frames = this.NormalCellFrame;
        if (Common.isBombType(type)) {
            frames = this.BombStaticFrame;
        }
        let frame = frames[index];
        //应急
        if (type < CellType.Bomb1 && RuntimeMgr.ins.CurBgIndex == 2) {
            const bg2frame = this.Map2NormalCellFrame[index];
            if (bg2frame) {
                frame = bg2frame;
            }
        }
        return frame;
    }


    private _getCollectFrame(index: number): cc.SpriteFrame {
        return this.CollectIcon[index];
    }

}
