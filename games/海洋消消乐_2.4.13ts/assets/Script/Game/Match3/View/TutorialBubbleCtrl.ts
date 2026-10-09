import { IBubble } from '../../Data/Interface/Level/ITutorial';

const { ccclass, property } = cc._decorator;

@ccclass
export default class TutroialBubbleCtrl extends cc.Component {

    @property(cc.RichText)
    content: cc.RichText = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    touchHint: cc.Node = null;

    @property(cc.Node)
    role: cc.Node = null;

    // onLoad () {}

    setData(bubble: IBubble) {

        if (bubble) {
            this.node.active = true;

            this.content.string = bubble.text["zh"];
            this.bg.height = this.content.node.height + 60;


            this.node.x = bubble.x;
            this.node.y = bubble.y;

        } else {
            this.node.active = false;
        }
    }


    update(dt) {

    }
}
