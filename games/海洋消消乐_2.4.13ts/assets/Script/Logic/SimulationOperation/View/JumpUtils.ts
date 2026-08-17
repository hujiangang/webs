import UIMgr from "../../../Base/Manager/UIMgr";
import GuideLayer from "./Guide/GuideLayer";
import { UIHudDef } from "../../Data/Interface/UIData";
import { TalkPanel } from "./Talk/TalkPanel";
import Common from "../../Common/Common";

export default class JumpUtils {
    static jump(content: string) {
        if (!content) return;

        let [cmd, parameter] = content.split('#');
        let [delay, param] = parameter.split('*');
        if (delay && param != undefined) {
            setTimeout(() => {
                this.doAction(cmd, param);
            }, 1000 * Number(delay))
        } else {
            this.doAction(cmd, parameter);
        }

    }

    private static doAction(cmd: string, param: string) {
        switch (cmd) {
            case 'scene':
                Common.jumpScene(param);
                break;
            case 'talk':
                UIMgr.ins.showUI(UIHudDef.TalkPanel, param);
                break;
            case 'guide':
                UIMgr.ins.showUI(UIHudDef.GuideLayer, null, (guideLayer: GuideLayer) => {
                    cc.loader.loadRes('config/guide/guide_' + param, cc.JsonAsset, (err: Error, resource: cc.JsonAsset) => {
                        if (err) {
                            return;
                        }
                        let task = resource.json;
                        guideLayer.setTask(task);
                        guideLayer.run();
                    })
                })
                break;
            case 'ui':

        }
    }
}