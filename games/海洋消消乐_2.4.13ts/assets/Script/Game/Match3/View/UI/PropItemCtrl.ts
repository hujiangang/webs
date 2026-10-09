import UI, {Palette} from '../../../Common/UI/ForestUI';
import PlayerPanels from '../../../Common/UI/PlayerPanels';
import {PropPresentation} from '../../../Home/LobbyCatalog';
import SpecialPieceArt from "../SpecialPieceArt";
import { PropType, WaringTips } from '../../../Data/Const/Constant';
import M from "../../../../Application/M";
import { Event } from "../../../Data/Const/Event";
import { UIHudDef } from '../../../Data/Interface/UIData';
import { Util } from '../../../../Framework/Utils/Util';
import Paths from '../../../Config/Paths';

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
        this._type=type;
        this.node.children.forEach(child=>child.active=false);
        const oldButton=this.node.getComponent(cc.Button);if(oldButton)oldButton.enabled=false;
        const old=this.node.getChildByName('ModernProp');if(old){old.removeFromParent();old.destroy();}
        const root=UI.node(this.node,'ModernProp');root.setContentSize(112,128);
        const badge=UI.propIcon(root,type,96);badge.y=12;
        UI.text(root,PropPresentation[type].name,20,0,-49,'#FFFFFF',120,34);
        this.addBtn=UI.box(root,'Add',33,33,38,-19,Palette.green,12);UI.text(this.addBtn,'+',28,0,0,'#FFFFFF',30,30);
        const counter=UI.box(root,'Count',40,33,38,-19,Palette.blue,12);this.countLab=UI.text(counter,String(count),21,0,0,'#FFFFFF',36,30);
        UI.tap(root,()=>this.onClick());
        this.node.setContentSize(112,128);this._showCount(count);
        M.event.register(Event.UI.PropCount,this.onPropCountChanged,this);
    }
    public initOnlyType(type: PropType,count:number){this.init(type,null,count);}

    public onClick() {
        const propInfo = M.runtime.getPropData(this._type);
        if (propInfo && propInfo.count > 0) {
            M.event.send(Event.GameCMD.PropClick, this._type);
        } else {
            // M.tips.show(WaringTips.PropNotEnough);
            //弹框购买!
            PlayerPanels.buyProp(cc.find('Canvas'),this._type);
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
