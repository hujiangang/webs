import M from "./M";
import { APPID } from "../Game/Data/Const/Constant";
import { GameTableMgr } from "../Game/Config/GameTableMgr";
import Paths from "../Game/Config/Paths";
import DailyTaskInfo from "../Game/Config/Tables/DailyTaskInfo";
import { BaseTable } from "../Game/Config/Loader/BaseTable";
import { withTimeout } from "../Framework/Async/withTimeout";

/** Application startup: platform, player data and game tables; no scene UI. */
export default class GameBootstrap {
    private static startup: Promise<void> = null;

    public static run(): Promise<void> {
        if (!this.startup) {
            this.startup = this.initialize().catch(error => {
                this.startup = null;
                throw error;
            });
        }
        return this.startup;
    }

    private static async initialize(): Promise<void> {
        M.init();
        M.platform.init({ appId: APPID });
        const data = await withTimeout(M.net.login(), 3000, null, "登录");
        M.runtime.initRemotData(data);
        await withTimeout(GameTableMgr.ins.execute(), 5000, false, "配置表加载");
    }

    /** Optional daily tasks stay independent from the match scene transition. */
    public static initializeDailyTasks(): void {
        cc.loader.load(Paths.DailyTaskConfig, async (err, data) => {
            if (err || !data) {
                console.warn("获取任务配置出错，稍后可重试", err);
                return;
            }
            try {
                const table = new BaseTable<number, DailyTaskInfo>("id", "DailyTaskInfo", DailyTaskInfo, null);
                table.setData(data);
                M.table.DailyTaskInfo = table;
                M.runtime.DailyTaskProgress = await withTimeout(M.net.getDailyTask(), 3000, null, "每日任务数据");
                M.runtime.initTaskNativeData();
            } catch (error) {
                console.warn("每日任务初始化失败，不影响主玩法进入:", error);
            }
        });
    }
}
