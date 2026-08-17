import UIBase from '../../../Base/UI/UIBase';
import ChapterStory from '../../../Base/Tabls/ChapterStory';
import UIMgr from '../../../Base/Manager/UIMgr';
import { UIHudDef } from '../../Data/Interface/UIData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoryTalkPanel extends UIBase {

    @property(cc.Node)
    panel: cc.Node = null;

    @property(cc.Label)
    leftName: cc.Label = null;

    @property(cc.Label)
    rightName: cc.Label = null;

    @property(cc.Label)
    contentLab: cc.Label = null;

    @property(cc.Sprite)
    leftIcon: cc.Sprite = null;

    @property(cc.Sprite)
    rightIcon: cc.Sprite = null;

    @property([cc.SpriteFrame])
    roleIcons: cc.SpriteFrame[] = [];

    private _currentIndex: number = 0;
    private _storyData: ChapterStory = null; //Array<{ rid: number, name: string, content: string }>

    onLoad() {
        super.onLoad();
    }

    start() {
    }

    public onShow(closeCallBack?: Function) {
        super.onShow(closeCallBack);
    }

    public onInit(storyData: ChapterStory) {
        this._currentIndex = 0;
        this._storyData = storyData;
        this.showNext();
    }

    private showNext() {
        if (this._storyData) {
            const sd = this._storyData.storys[this._currentIndex];
            if (sd) {
                this.contentLab.string = sd.content;
                if (sd.isLeft) {
                    this.showLeft(sd.rid, sd.name);
                } else {
                    this.showRight(sd.rid, sd.name);
                }
                this._currentIndex++;
            } else {
                UIMgr.ins.hideUI(UIHudDef.StoryTalkPanel);
            }
        }
    }

    private showLeft(roleId: number, name: string) {
        this.leftIcon.node.active = true;
        this.leftName.node.parent.active = true;
        this.rightIcon.node.active = false;
        this.rightName.node.parent.active = false;

        this.leftName.string = name;
        this.leftIcon.spriteFrame = this.roleIcons[roleId];
    }

    private showRight(roleId: number, name: string) {
        this.leftIcon.node.active = false;
        this.leftName.node.parent.active = false;
        this.rightIcon.node.active = true;
        this.rightName.node.parent.active = true;

        this.rightName.string = name;
        this.rightIcon.spriteFrame = this.roleIcons[roleId];
    }

    public onContinueClick() {
        this.showNext();
    }
}
