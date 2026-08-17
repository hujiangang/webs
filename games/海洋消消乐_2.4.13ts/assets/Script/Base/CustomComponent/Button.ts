import EventMgr from "../Manager/EventMgr";
import { Event } from "../../Logic/Data/Const/Event";
import { AudioID } from "../../Logic/Common/AudioCtrl";

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
