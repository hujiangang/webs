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
        const root=UI.node(this.node,'ModernProp');root.setContentSize(156,178);
        this.surface(root,'Socket',140,124,0,18,'#F0E7D1',21);
        const badge=UI.propIcon(root,type,112);badge.y=15;
        UI.text(root,PropPresentation[type].name,27,-23,-64,'#FFF3D7',110,40);
        // Keep stock and purchase indicators below the artwork instead of covering it.
        this.addBtn=this.surface(root,'Add',42,40,56,-63,'#E5BA57',11);UI.text(this.addBtn,'+',32,0,1,'#31412C',38,38);
        const counter=this.surface(root,'Count',42,40,56,-63,'#E5BA57',11);this.countLab=UI.text(counter,String(count),25,0,1,'#31412C',38,38);
        UI.tap(root,()=>this.onClick());
        this.node.setContentSize(156,178);this._showCount(count);
        M.event.register(Event.UI.PropCount,this.onPropCountChanged,this);
    }
    public initOnlyType(type: PropType,count:number){this.init(type,null,count);}

    private surface(parent:cc.Node,name:string,width:number,height:number,x:number,y:number,color:string,radius:number):cc.Node {
        const node=UI.node(parent,name,x,y);node.setContentSize(width,height);
        const g=node.addComponent(cc.Graphics),face=cc.color().fromHEX(color);
        g.fillColor=cc.color(face.r*.59,face.g*.59,face.b*.56);g.roundRect(-width/2,-height/2-4,width,height,radius);g.fill();
        g.fillColor=face;g.roundRect(-width/2,-height/2,width,height,radius);g.fill();
        g.lineWidth=2;g.strokeColor=cc.color().fromHEX('#FFF9E6');g.roundRect(-width/2+1,-height/2+1,width-2,height-2,radius-1);g.stroke();
        return node;
    }

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
