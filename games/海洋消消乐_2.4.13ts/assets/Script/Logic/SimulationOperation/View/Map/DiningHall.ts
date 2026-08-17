import Exchange from "./Exchange";
import SpinePlayerCtrl from "../../../../Base/CustomComponent/SpinePlayerCtrl";
import EventMgr from "../../../../Base/Manager/EventMgr";
import { Event } from "../../../Data/Const/Event";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DiningHall extends cc.Component {

    private sp: SpinePlayerCtrl;
    onLoad() {
        let exchange = this.node.getComponent(Exchange);
        cc.loader.loadRes('prefab/map/canting/canting', cc.Prefab, (err, prefab: cc.Prefab) => {
            if (!err) {
                let node = cc.instantiate(prefab);
                this.node.addChild(node);

                let sp = this.sp = node.getComponentInChildren(SpinePlayerCtrl);
                sp.play(`dianmian_jinzhi${exchange.state + 1}`, 0);
                EventMgr.ins.register(Event.Map.Upgrade, this.exchangeState, this);
            }
        })
    }

    onDestroy() {
        EventMgr.ins.unRegister(Event.Map.Upgrade, this.exchangeState, this);
    }

    private exchangeState(state: number) {
        let exchange = this.node.getComponent(Exchange);
        this.sp.play(state == 1 ? 'dianmian' : 'dianmian2', 0, false, () => {
            exchange.inAnim = false;
        });
    }

    private showState(state: number) {
        this.sp.play(`dianmian_jinzhi${state + 1}`, 0);
    }

    start() {

    }

    // update (dt) {}
}
