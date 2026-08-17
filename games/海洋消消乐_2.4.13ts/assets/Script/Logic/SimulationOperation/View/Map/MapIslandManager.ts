import M from "../../../../Base/Manager/M";
import { IIslandUnlockCfg } from "../../../../Base/Tabls/IslandUnlockCfg";

export class MapIslandManager {

    /**获取建筑的配置 */
    public static getBuildConfigById(id: number): IIslandUnlockCfg {
        var config = M.table.IslandUnlockCfg.getData();
        for (var i = 0; i < config.length; ++i) {
            if (config[i].buildId == id) {
                return config[i];
            }
        }
        console.error(`获取不到建筑id=${id}的配置`);
        return null;
    }
}