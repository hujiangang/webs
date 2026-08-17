import { Log } from "../../../../Base/Utils/Log";
import UIBase from "../../../../Base/UI/UIBase";
import UIMgr from "../../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import JumpUtils from "../JumpUtils";

const { ccclass, property } = cc._decorator;

// const CHINESE_REG = /[\u4E00-\u9FFF\u3400-\u4DFF]/g;//中文
// const JAPANESE_REG = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;//日文
// const KOREAN_REG = /[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]/g;//韩文
// const ENGLISHWORD_REG = /[a-z]+[\-\']?[a-z]*/ig;//英文单词
// const SPACE_REG = /(^\s+)|(\s+$)|\s+/g;//空格
// const SYMBOL_REG = /[，；。？！!,.:;'}\]%\?>、‘“》？。，！]/g;//常用符号
// const EMOJI_REG = /[\uDF00-\uDFFF\uDC00-\uDE4F]/g;//emoji

const REG = /[\u4E00-\u9FFF\u3400-\u4DFF]|[a-z]+[\-\']?[a-z]*|(^\s+)|(\s+$)|\s+|[!,.:;'}\]%\?>、‘“》？。，！：；]|....../ig;

@ccclass
export class TalkPanel extends UIBase {

    @property(cc.RichText)
    text: cc.RichText = null;

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Sprite)
    role: cc.Sprite = null;

    @property(cc.Label)
    roleName: cc.Label = null;

    @property(cc.Sprite)
    other: cc.Sprite = null;

    @property(cc.Label)
    otherName: cc.Label = null;

    @property(cc.Node)
    talkFrame: cc.Node = null;

    @property(cc.Node)
    chatto: cc.Node = null;

    curStoryId: string = null;
    curIdx: number = 0;

    autoNext: boolean = true;

    configPath: string = 'config/story/';
    backgroundPath: string = 'texture/story/bg/'

    roleMap: Map<string, Role> = new Map<string, Role>();
    bgMap: Map<string, Background> = new Map<string, Background>();
    storyMap: Map<string, Story> = new Map<string, Story>();

    onUILoad() {

        cc.loader.loadRes(this.configPath + 'role', cc.JsonAsset, (err: Error, resource: cc.JsonAsset) => {
            if (err) {
                Log.error(this.configPath + 'role' + '加载不成功');
                return;
            }
            let roleData = resource.json;
            for (let rid in roleData) {
                this.roleMap.set(rid, roleData[rid]);
            }
            cc.loader.loadRes(this.configPath + 'background', cc.JsonAsset, (err: Error, resource: cc.JsonAsset) => {
                if (err) {
                    Log.error(this.configPath + 'background' + '加载不成功');
                    return;
                }
                let bgData = resource.json;
                for (let bgId in bgData) {
                    this.bgMap.set(bgId, bgData[bgId]);
                }
                cc.loader.loadRes(this.configPath + 'story', cc.JsonAsset, (err: Error, resource: cc.JsonAsset) => {
                    if (err) {
                        Log.error(this.configPath + 'story' + '加载不成功');
                        return;
                    }
                    let storyData = resource.json;
                    for (let id in storyData) {
                        this.storyMap.set(id, storyData[id]);
                    }
                    if (this.curStoryId != null) this.showNext();
                })
            })
        })
    }

    onInit(storyId) {
        this.curStoryId = storyId;
        this.curIdx = 0;
    }

    onShow() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.showNext, this);
        this.showNext();
    }

    private showNext() {
        let story = this.storyMap.get(this.curStoryId);
        if (!story) return;
        let content = story.content;
        if (!content || this.curIdx > content.length) {
            this.node.off(cc.Node.EventType.TOUCH_END, this.showNext, this);
            this.role.node.active = false;
            this.other.node.active = false;
            this.text.string = '';
            this.bg.spriteFrame = null;
            this.talkFrame.active = false;
            UIMgr.ins.hideUI(UIHudDef.TalkPanel, () => {
                if (story.jump.length == 1) {
                    JumpUtils.jump(story.jump[0]);
                }
            });
            return;
        }

        this.talkFrame.active = true;

        if (this.curIdx == content.length && story.jump.length > 1) {

        }

        if (this.curIdx != 0) {
            let words: string = content[this.curIdx - 1].words;
            this.text.string = words;
        }
        this.unscheduleAllCallbacks();

        this.scheduleOnce(this.setNext, 0.5)
    }

    private setNext() {
        let content = this.storyMap.get(this.curStoryId).content
        let nextData = content[this.curIdx];
        this.curIdx++;
        if (!nextData) {
            this.showNext();
            return;
        }

        let bgID = nextData.bgID;
        if (bgID != undefined) {
            this.bg.node.active = true;
            cc.loader.loadRes(this.backgroundPath + this.bgMap.get(bgID + '').url, cc.SpriteFrame, (err: Error, resource: cc.SpriteFrame) => {
                if (err) {
                    Log.error(this.backgroundPath + this.bgMap.get(bgID + '').url + '加载不成功');
                    return;
                }
                this.bg.spriteFrame = resource;
            })
        } else {
            this.bg.node.active = false;
        }

        let roleID = nextData.roleID;
        if (roleID) {
            if (roleID == 1) {
                this.role.node.active = true;
                this.other.node.active = false;
                this.chatto.x = 490;
                this.roleName.string = 'kkk';
            } else {
                this.role.node.active = false;
                this.other.node.active = true;
                this.chatto.x = -490;
                this.otherName.string = this.roleMap.get(roleID + '').name;
            }
        } else {
            this.role.node.active = false;
            this.other.node.active = false;
            this.chatto.x = 490;
        }

        let imgIdx = nextData.figureID;
        if (imgIdx != undefined) {

        }

        let words: string = nextData.words;
        this.showWords(words);
    }

    private showWords(text: string) {
        let textArr = text.match(REG);
        let index = 0;
        this.text.string = '';
        this.schedule(() => {
            this.text.string += textArr[index];
            index++;

            if (index >= textArr.length && this.autoNext) {
                this.scheduleOnce(this.showNext, 0.2);
            }
        }, 0.05, textArr.length - 1)
    }


}