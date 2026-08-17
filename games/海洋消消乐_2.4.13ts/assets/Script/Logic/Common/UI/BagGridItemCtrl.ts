import { PropType } from "../../Data/Const/Constant";
import PropInfo from "../../../Base/Tabls/PropInfo";
import M from "../../../Base/Manager/M";
import { Event } from "../../Data/Const/Event";
import Common from "../Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BagGridItemCtrl extends cc.Component {

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    count: cc.Label = null;

    // private _propInfo: PropInfo = null
    private _type: PropType = null;
    private _data = null;


    onLoad() {
        M.event.register(Event.UI.PropCount, this.updatePorpCount, this);
    }

    onDestroy() {
        M.event.unRegister(Event.UI.PropCount, this.updatePorpCount, this);
    }

    public init(type: PropType, data: { count: number }, frame: cc.SpriteFrame) {
        this.icon.spriteFrame = frame;
        this._type = type;
        this._data = data;
        this.count.string = data.count.toString();
        // this._propInfo = M.table.PropInfo.getByPrimaryKey(type);
        this.icon.enabled =  data.count > 0;
    }

    public onClick() {
        M.event.send(Event.UI.ShowBagTips, this._type, Common.getWorldPos(this.node), this._data.count);
    }

    public updatePorpCount(type: PropType) {
        if (type === this._type) {
            this.count.string = M.runtime.getPropData(type).count;
            this.icon.enabled = M.runtime.getPropData(type).count > 0;
        }
    }
}
