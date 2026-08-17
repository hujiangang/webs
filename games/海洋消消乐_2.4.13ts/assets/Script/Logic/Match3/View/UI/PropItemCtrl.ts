import { PropType, WaringTips } from '../../../Data/Const/Constant';
import M from "../../../../Base/Manager/M";
import { Event } from "../../../Data/Const/Event";
import { UIHudDef } from '../../../Data/Interface/UIData';
import { Util } from '../../../../Base/Utils/Util';
import Paths from '../../../../Base/Utils/Paths';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PropItemCtrl extends cc.Component {

    @property(cc.Label)
    countLab: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Node)
    addBtn: cc.Node = null;

    private _type: PropType = null;

    onDestroy() {
        M.event.unRegister(Event.UI.PropCount, this.onPropCountChanged, this)
    }

    public init(type: PropType, icon: cc.SpriteFrame, count: number) {
        this._type = type;
        this.icon.spriteFrame = icon;
        this._showCount(count);
        M.event.register(Event.UI.PropCount, this.onPropCountChanged, this);
    }

    //初始化 没有带道具icon
    public initOnlyType(type: PropType, count: number) {
        this._type = type;
        this._showCount(count);
        M.event.register(Event.UI.PropCount, this.onPropCountChanged, this);
        Util.Loader.loadSpriteFrame(Paths.getItemPath(type), (err, texture) => {
            if (texture && this.icon) this.icon.spriteFrame = texture;
        });
    }

    public onClick() {
        const propInfo = M.runtime.getPropData(this._type);
        if (propInfo && propInfo.count > 0) {
            M.event.send(Event.GameCMD.PropClick, this._type);
        } else {
            // M.tips.show(WaringTips.PropNotEnough);
            //弹框购买!
            M.ui.showUI(UIHudDef.BuyProp, this._type);
        }
    }

    private _showCount(count: number) {
        if (count <= 0) {
            this.addBtn.active = true;
            this.countLab.node.parent.active = false;
        } else {
            this.addBtn.active = false;
            this.countLab.string = count.toString();
            this.countLab.node.parent.active = true;
        }
    }

    private onPropCountChanged(type: PropType) {
        if (this._type == type) {
            const cd = M.runtime.getPropData(type);
            if (cd) {
                this.countLab.string = cd.count;
                this._showCount(cd.count);
            }
        }
    }

}
