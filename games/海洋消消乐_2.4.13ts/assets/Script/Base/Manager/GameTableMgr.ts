
import { BaseTable } from "./Table/BaseTable";
import { SingletonFactory } from "../Utils/SingletonFactory";
import Titles from "../Tabls/Titles";
import ChapterStory from '../Tabls/ChapterStory';
import ChapterInfo from "../Tabls/ChapterInfo";
import PropInfo from "../Tabls/PropInfo";
import BoxRewardInfo from "../Tabls/BoxRewardInfo";
import IslandUnlockCfg from "../Tabls/IslandUnlockCfg";
import SlotBonusCfg from "../Tabls/SlotBonusCfg";
import LevelUpReward from '../Tabls/LevelUpReward';
import ShareCfg from "../Tabls/ShareCfg";
import HotelCfg from "../Tabls/HotelCfg";
import HotelRoomCfg from "../Tabls/HotelRoomCfg";
import ShopInfo from "../Tabls/ShopInfo";
import DailyTaskInfo from "../Tabls/DailyTaskInfo";

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

    public readonly IslandUnlockCfg = new BaseTable<number, IslandUnlockCfg>("id", "IslandUnlockCfg", IslandUnlockCfg, null);

    public readonly ShareCfg = new BaseTable<number, ShareCfg>("id", "ShareCfg", ShareCfg, null);
    /**酒店的配置 */
    public readonly HotelCfg = new BaseTable<number, HotelCfg>("id", "HotelCfg", HotelCfg, null);
    /**酒店的房间配置 */
    public readonly HotelRoomCfg = new BaseTable<number, HotelRoomCfg>(["roomId", "slotId"], "HotelRoomCfg", HotelRoomCfg, null);
    /**酒店房间部位的积分信息配置 */
    public readonly SlotBonusCfg = new BaseTable<number, SlotBonusCfg>(["roomId", "count"], 'SlotBonus', SlotBonusCfg, null);
    /**每日任务配置 */
    public DailyTaskInfo: BaseTable<number, DailyTaskInfo> = null;

    public isReady = false;

    public execute(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.checkAllReady() || this.isReady) {
                return resolve(true);
            }
            let timer = setInterval(() => {
                if (this.checkAllReady()) {
                    clearInterval(timer)
                    resolve(true);
                    this.isReady = true;
                }
            }, 10)
        });
    }

    // 检查所有的表是否都加载完成了
    private checkAllReady(): boolean {
        let c;
        let isReady = true
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            c = this[keys[i]];
            if (c && c instanceof BaseTable && !c.isReady) {
                isReady = false;
                // break;
            }
        }
        return isReady
    }

}

