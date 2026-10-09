
import { BaseTable } from "./Loader/BaseTable";
import { SingletonFactory } from "../../Framework/Utils/SingletonFactory";
import Titles from "./Tables/Titles";
import ChapterStory from './Tables/ChapterStory';
import ChapterInfo from "./Tables/ChapterInfo";
import PropInfo from "./Tables/PropInfo";
import BoxRewardInfo from "./Tables/BoxRewardInfo";
import LevelUpReward from './Tables/LevelUpReward';
import ShareCfg from "./Tables/ShareCfg";
import ShopInfo from "./Tables/ShopInfo";
import DailyTaskInfo from "./Tables/DailyTaskInfo";

export class GameTableMgr {

    public static ins: GameTableMgr = SingletonFactory.getInstance(GameTableMgr);

    // public readonly PopCfg = new BaseTable<number, proto.aladinfun.mini.SuperPopCfgConfig>("Id", "SuperPopCfgConfigAry", null, afpb);

    /**展示目标时的信息*/
    public readonly Titles = new BaseTable<number, Titles>("lv", "titles", Titles, null);
    /**章节对话表 */
    public readonly ChapterStory = new BaseTable<number, ChapterStory>("trigger", "ChapterStory", ChapterStory, null);
    /**岛屿的章节信息 */
    public readonly ChapterInfo = new BaseTable<number, ChapterInfo>("id", "ChapterInfo", ChapterInfo, null);
    /**岛屿的章节信息 */
    public readonly PropInfo = new BaseTable<number, PropInfo>("id", "PropInfo", PropInfo, null);
    /**宝箱的掉落信息 */
    public readonly BoxRewardInfo = new BaseTable<number, BoxRewardInfo>("id", "BoxReward", BoxRewardInfo, null);
    /**关卡结算信息 */
    public readonly LevelUpReward = new BaseTable<number, LevelUpReward>("id", "LevelUpReward", LevelUpReward, null);
    /**商城配置信息 */
    public readonly ShopInfo = new BaseTable<number, ShopInfo>("id", "ShopTools", ShopInfo, null);

    public readonly ShareCfg = new BaseTable<number, ShareCfg>("id", "ShareCfg", ShareCfg, null);
    /**每日任务配置 */
    public DailyTaskInfo: BaseTable<number, DailyTaskInfo> = null;

    public isReady = false;

    private loading: Promise<boolean> = null;

    public execute(): Promise<boolean> {
        if (this.isReady) return Promise.resolve(true);
        if (this.loading) return this.loading;
        const tables: BaseTable<any, any>[] = Object.keys(this)
            .map(key => this[key]).filter(value => value instanceof BaseTable);
        this.loading = Promise.all(tables.map(table => table.load())).then(() => {
            this.isReady = true;
            this.loading = null;
            return true;
        }).catch(error => {
            this.loading = null;
            throw error;
        });
        return this.loading;
    }
}
