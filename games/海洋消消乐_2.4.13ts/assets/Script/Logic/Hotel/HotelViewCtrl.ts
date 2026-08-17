import M from "../../Base/Manager/M";
import { UIHudDef } from "../Data/Interface/UIData";
import { ICloudData } from "../SimulationOperation/View/Map/CloudView";
import HotelUiCtrl from "./HotelUiCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HotelViewCtrl extends cc.Component {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    mainView: cc.Node = null;

    @property(cc.Node)
    topBox: cc.Node = null;

    private _isTouchTopBox: boolean = false;
    private _boxOrginPosY: number = null;

    onLoad() {
        this.topBox.on(cc.Node.EventType.TOUCH_START, this.onTopBoxClick, this);
        this.node.on('bounce-top', this._onBounceTop, this);

        this.scheduleOnce(() => {
            if (!this._boxOrginPosY) {
                this._boxOrginPosY = this.topBox.y;
            }
        }, 0.3);
    }

    public init() {
        if (this._boxOrginPosY) {
            this.topBox.y = this._boxOrginPosY;
        }
    }

    public onTopBoxClick() {
        this._isTouchTopBox = true;
    }

    private _cancelBoxClick() {
        this._isTouchTopBox = false;
        console.error('_cancelBoxClick');

    }

    /**顶部回弹 */
    private _onBounceTop() {
        if (this._isTouchTopBox) {
            const a0 = cc.moveTo(0.2, cc.v2(0, this.topBox.y - 50));
            const a1 = cc.moveTo(0.1, cc.v2(0, this.topBox.y + 100));
            const a2 = cc.callFunc(() => {
                M.ui.showUI(UIHudDef.CloudView, ICloudData.OpenHotel, () => {
                    //开
                    this.node.active = false;
                    this.mainView.active = true;
                    this.mainView.getComponent(HotelUiCtrl).initBottomBoxPosition();
                }, () => {
                    //关 
                });
            })
            this.topBox.runAction(cc.sequence(a0, a1, a2));
        }
        this._cancelBoxClick();
    }

}
