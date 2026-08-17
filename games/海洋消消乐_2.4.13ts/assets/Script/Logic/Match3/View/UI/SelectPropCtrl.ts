import { PropType, WaringTips } from '../../../Data/Const/Constant';
import M from '../../../../Base/Manager/M';
import { UIHudDef } from '../../../Data/Interface/UIData';
import { Event } from '../../../Data/Const/Event';

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelectPropCtrl extends cc.Component {

    @property(cc.Sprite)
    prop1: cc.Sprite = null;

    @property(cc.Sprite)
    prop2: cc.Sprite = null;

    @property(cc.Sprite)
    prop3: cc.Sprite = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property(cc.Label)
    tipsContent: cc.Label = null;

    @property([cc.SpriteFrame])
    propFrames: cc.SpriteFrame[] = [];

    onLoad() {
        M.event.register(Event.UI.PropCount, this.onPropCountChanged, this);
    }

    onDestroy() {
        M.event.unRegister(Event.UI.PropCount, this.onPropCountChanged, this);
    }

    public init() {
        this._hideTips();
        this._initPropLockState();
        this._initSelect();
    }

    private _initPropLockState() {
        const types = [PropType.Add3Step, PropType.StartBomb, PropType.StartStar];
        types.forEach(type => {
            const index = type - PropType.Add3Step;

            


            if (M.runtime.isPropUnLocked(type)) {
                const sprite: cc.Sprite = this[`prop${index + 1}`]
                const node = sprite.node;
                //sprite.spriteFrame = this.propFrames[index];
                //node.y = 0;
                //node.scale = 0.6;
                // this._updateIconState(type, node);
                node.getChildByName('add').active = true;
                let lbNum =  node.getChildByName('titleNoOpen').getComponent(cc.Label);
                lbNum.string = "暂未开启";

            } else if (!this.tipsNode.active) {
                const sprite: cc.Sprite = this[`prop${index + 1}`];
                const node = sprite.node;
                this._showTips(sprite.node.position, type);

                node.getChildByName('add').active = false;

                let lbNum =  node.getChildByName('titleNoOpen').getComponent(cc.Label);
                lbNum.string = "暂未开启";
            }

            //显示加号
            const sprite: cc.Sprite = this[`prop${index + 1}`]
            const node = sprite.node;
            this._updateIconState(type, node);

            //暂未解锁提示是否显示
            //const sprite2: cc.Sprite = this[`prop${index + 1}`]
            //sprite2.node.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
        })
    }

    private _updateIconState(type, node: cc.Node) {
        const data: { count: number } = M.runtime.getPropData(type);
        if (!data || data.count <= 0) {
            //node.getChildByName('add').active = true;
            //node.getChildByName('titleNoOpen').active=true;

        } else {
            node.getChildByName('add').active = false;
           // node.getChildByName('titleNoOpen').active=true;
           let lbNum =  node.getChildByName('titleNoOpen').getComponent(cc.Label);
           lbNum.string = data.count.toString();
           cc.log("数量： "+data.count)
        }
        
        // node.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
    }

    private _hideTips() {
        this.tipsNode.active = false;
    }

    private _showTips(pos: cc.Vec2, type: PropType) {
        this.tipsNode.x = pos.x;
        this.tipsNode.active = true;
        const info = M.table.PropInfo.getByPrimaryKey(type);
        this.tipsContent.string = `${info.unlockLv}关开启!`
    }

    private _initSelect() {
        for (let i = 1; i <= 3; i++) {
            const node: cc.Node = this[`prop${i}`].node.getChildByName('selected');
            if (M.runtime.SelectProp && M.runtime.SelectProp == (PropType.Add3Step + (i - 1))) {
                node.active = true;
            } else {
                node.active = false;
            }
        }
    }

    private onPropCountChanged(type: PropType) {
        if (this.node.active && this.node.activeInHierarchy) {
            const index = type - PropType.Add3Step;
            const sprite: cc.Sprite = this[`prop${index + 1}`];
            this._updateIconState(type, sprite.node);
        }
    }

    public onClick(event, cv: string) {
        const type = Number(cv);
        const data: { count: number } = M.runtime.getPropData(type);
        if (M.runtime.isPropUnLocked(type)) {
            if (!data || data.count <= 0) {
                M.ui.showUI(UIHudDef.BuyProp, type);
                cc.log("选中: "+type)
            } else {
                this._updateSelectPropDisplay(type);
                M.runtime.SelectProp = type;
                cc.log("选中data.count: "+data.count)
            }
        }else{
           cc.log("选中 isPropUnLocked: false")
        }
    }

    private _updateSelectPropDisplay(type: PropType) {
        const index = type - PropType.Add3Step + 1;
        if (M.runtime.SelectProp == type) {
            const node: cc.Node = this[`prop${type - PropType.Add3Step + 1}`].node.getChildByName('selected');
            if(node.active==true){
                node.active = false
            }else{
                node.active = true
            }
            //node.active = !node.active;
            if (node.active==true) M.runtime.SelectProp = null;


            const node1: cc.Node = this[`prop${type - PropType.Add3Step + 1}`].node
            //node1.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
            
        } else {
            for (let i = 1; i <= 3; i++) {
                const node: cc.Node = this[`prop${i}`].node.getChildByName('selected');
                if (index == i) {
                    node.active = true;
                } else {
                    node.active = false;
                }
                
                const node1: cc.Node = this[`prop${i}`].node
                //node1.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
            }
        }
    }

}
