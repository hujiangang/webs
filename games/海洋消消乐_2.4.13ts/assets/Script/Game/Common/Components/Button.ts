import EventMgr from "../../../Framework/Events/EventMgr";
import { Event } from "../../Data/Const/Event";
import { AudioID } from "../AudioCtrl";

const { ccclass, property, inspector } = cc._decorator;

@ccclass
@inspector('packages://CustomComponent/button.js')
export default class Button extends cc.Button {

    @property({
        type: cc.Enum(AudioID),
        displayName: "选择触发音效"
    })
    soundName: number = 0;

    _onTouchEnded(event) {
        super['_onTouchEnded'](event);
        if (this.soundName) {
            EventMgr.ins.send(Event.Sound.PlaySoundEff, this.soundName);
        }
    }

}
