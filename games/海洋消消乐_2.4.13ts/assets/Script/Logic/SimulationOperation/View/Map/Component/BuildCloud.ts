import M from "../../../../../Base/Manager/M";
import MapIslandUtils from "../MapIslandUtils";
import { Util } from "../../../../../Base/Utils/Util";

const { ccclass, property } = cc._decorator;

/**
 * 海岛装扮云的遮挡层
 */
@ccclass
export default class BuildCloud extends cc.Component {

    // @property(cc.Integer)
    // beginId: number = -1;  //遮挡起始建筑id

    @property(cc.Integer)
    cloudId: number = -1;    //遮挡结束建筑id

    @property([cc.Integer])
    buildingIds: number[] = [];

    public onLoad() {
        if (this.buildingIds.length <= 0) return;

        // // var beginConfig = MapIslandUtils.getBuildConfigById(this.beginId);
        // // if (beginConfig) {
        // //     if (star >= beginConfig.starlv) {
        // //         console.error("隐藏");
        // //         this.node.active = false;
        // //     } else {
        // //         this.node.active = true;
        // //     }
        // // }

        let show = true;
        var star = M.runtime.getStarCount();
        for (var i = 0; i < this.buildingIds.length; ++i) {
            let iconfig = MapIslandUtils.getBuildConfigById(this.buildingIds[i]);
            if (iconfig && star >= iconfig.starlv) {
                show = false;
                break;
            }
        }
        this.node.active = show;

        if (show) {
            Util.Loader.loadSpriteFrame("texture/map/cloud/map_cloud_" + this.cloudId, (err, texture) => {
                let Sprite = this.node.getComponent(cc.Sprite);
                Sprite && (Sprite.spriteFrame = texture);
            });
        }
    }

    // onDestroy() {
        // cc.loader.releaseRes("texture/map/cloud/map_cloud_" + this.cloudId);
    // }
}