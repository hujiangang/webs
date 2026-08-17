import PlayerInfo from "./Player/PlayerInfo";
import { SingletonFactory } from "../../Base/Utils/SingletonFactory";
import { CurrencyId } from "../../Base/BaseConst";
import EventMgr from "../../Base/Manager/EventMgr";
import { Event } from "./Const/Event";
import { PropType, GameState, NativeKey, PowerConfig, MaxPowerCount, WaringTips, ConditionType } from "./Const/Constant";
import M from "../../Base/Manager/M";
import { StorageMgr } from "../../Base/Manager/StorageMgr";
import { IServerConfig } from "../../Base/Manager/NetMgr";
import ReportMgr from "../../Base/Manager/ReportMgr";
import Common from "../Common/Common";
import DailyTaskMgr from "../../Base/Manager/DailyTaskMgr";
import { IConfigItem } from "../Common/CommonInterfaces";

export default class RuntimeMgr {

    public static ins: RuntimeMgr = SingletonFactory.getInstance(RuntimeMgr);

    /**体量不大,应该一个info就能搞定,不需要背包体系 */
    private info: PlayerInfo = null;

    /**数据存储队列 */
    private _dataSaveTaskPool: Array<string> = [];
    private _execSaveTasking: boolean = false;

    /**是否已经登录 */
    public IsLogin: boolean = false;
    /**累计爆炸次数 */
    public BombCount: number = 0;
    /**结束后步数转换炸弹的统计 */
    public OverStepCount: number = 0;
    /**用户当前选择的关卡 */
    public SelectLevel: number = 0;
    /**当前加载的关卡 */
    public CurLevel: number = 0;
    /**跳场景任务! */
    public SceneTask: Array<number> = null;
    /**当前选择的使用道具 */
    public SelectProp: PropType = null;
    /**三消当前背景ID */
    public CurBgIndex: number = 0;
    /**当前combo数 */
    public CurCombo: number = 0;
    /**一关使用的时间 */
    public MatchGameTime: number = 0;
    /** */
    public RewardTask: { text: string, reward: Array<{ [id: number]: number }> } = <any>{};
    // public UsePorpRecord: Array<{ [type: number]: number }> = null;

    /**每日任务进度 -1为已经领取 */
    public DailyTaskProgress: { progress: { [key: number]: number }, expires: { daily: number, monthly: number, custom: number } } = null;

    public RoomCurrentSelectSubSlotCfg: IConfigItem = null;
    /**挂机时间进度 */
    private _dailyTime: number = 0;

    private _serverConfig: IServerConfig = null;

    private _score: number = 0;

    private _timeHandle: any = null;

    private _gameStata: GameState = GameState.preReady;

    private _onShowTask: any = null;

    public CurrentGuestUserid: number = null;

    constructor() {
        this.SceneTask = [];
        this.info = new PlayerInfo();
        this._onShowTask = [];
        this._openTimer();
    }

    public initRemotData(data: { uid: any, userdata: any, awards: any }) {
        const userdata = data ? data.userdata : null;
        this.RewardTask = data ? data.awards : null;
        this.info.initRemotData(userdata);

        if (data) {
            this.info.userId = data.uid
            this.IsLogin = true;
            this._checkOnShowTask();
        }
        console.error('当前用户ID:', this.info.userId);
        StorageMgr.Storage.init(userdata);
        this.setDailyTime(StorageMgr.RingStorage.day().getValue(NativeKey.DailyTime, 0));
        this.getServerConfig();
        ReportMgr.ins.login();
    }

    public get UserId() {
        return this.info.userId;
    }

    public initTaskNativeData() {
        if (this.DailyTaskProgress) {
            DailyTaskMgr.ins.syncPro2Native(this.DailyTaskProgress.progress);
        }
    }

    /**
     * 获取当前的游戏道具数据
     * @param type 
     * @returns { count: number } | Array<{ count: number }>
     */
    public getPropData(type: PropType = null) {
		
			var ddd = JSON.parse(cc.sys.localStorage.getItem("daoju"));
		
		
		if( ddd== null )
		{
			ddd = {}
			cc.sys.localStorage.setItem("daoju",JSON.stringify(ddd))
			
		}
		this.info.propData = ddd;
		
        let rst = null
        if (type == null) {
            rst = this.info.propData;
        } else {
            rst = this.info.propData[type];
        }
        return rst;
    }

    public getUserId() {
        return this.info.userId;
    }

    public isPropUnLocked(type: PropType) {
        const info = M.table.PropInfo.getByPrimaryKey(type);
        let result = false;
        if (info && (this.getMatch3Level() >= info.unlockLv)) {
            result = true;
        }
        return result;
    }

    public getCurrency(type: CurrencyId): number {
        return this.info[this.getCurrencyKey(type)];
    }

    public getCurrencyStr(type: CurrencyId): string {
        return this.getCurrency(type).toString();
    }

    public getFormateCoin(): string {
        return Common.bytesToSize(this.getCurrency(CurrencyId.Coin));
    }

    public getCurChapter(): number {
        return this.info.chapter;
    }

    public getServerTime(): number {
        return this.info.serverTime;
    }

    public getLastTime(): number {
        return this.info.getLastTime();
    }

    /**三消游戏的状态机 */
    public set GameState(state: GameState) {
        this._gameStata = state;
    }

    public get GameState(): GameState {
        return this._gameStata
    }

    /**三消等级(当前最大的) */
    public getMatch3Level(): number {
			this.info.mathc3Level = Number(cc.sys.localStorage.getItem("gamelevel"))
        return this.info.mathc3Level || 1;
    }

    public get maxMatch3Level(): number {
        return 500;
    }

    public get currentScore(): number {
        return this._score || 0;
    }

    /**所有的星星数 */
    public getStarCount() {
        let count = 0;
        this.info.lvMap.forEach((value, key) => {
            count += value.star;
        });
        return count;
    }

    public gameStar() {
        this._preGameState = null;
        this._score = 0;
    }

    private setScore(score) {
        this._score = score;
    }

    public setServerTime(time: number) {
        this.info.serverTime = time;
    }

    public addScore(score: number): number {
        this.setScore(this.currentScore + (score || 0));
        return this.currentScore;
    }

    private _addCountByType(key, type, count = 1) {
        const dd = StorageMgr.RingStorage.day().getValue(key, {});
        dd[type] = dd[type] ? (dd[type] + count) : count;
        StorageMgr.RingStorage.day().setValue(key, dd);
        const md = StorageMgr.RingStorage.month().getValue(key + 1, {});
        md[type] = md[type] ? (md[type] + count) : count;
        StorageMgr.RingStorage.month().setValue(key + 1, md);
        const ad = StorageMgr.Storage.getObject(key + 2, {});
        ad[type] = ad[type] ? (ad[type] + count) : count;
        StorageMgr.Storage.setObject(key + 2, ad);
        DailyTaskMgr.ins.syncPro2Ser(key, type, dd[type], md[type]);
    }

    private _addCount(key) {
        const dc = StorageMgr.RingStorage.day().getValue(key, 0);
        StorageMgr.RingStorage.day().setValue(key, dc + 1);
        const mc = StorageMgr.RingStorage.month().getValue(key + 1, 0);
        StorageMgr.RingStorage.month().setValue(key + 1, mc + 1);
        const ac = StorageMgr.Storage.getInt(key + 2, 0);
        StorageMgr.Storage.setInt(key + 2, ac + 1);
        DailyTaskMgr.ins.syncPro2Ser(key, null, dc + 1, mc + 1);
    }


    public addCollectCount(type, count = 1) {
        this._addCountByType(NativeKey.DailyCollect, type, count);
    }

    public addMergeCount(type) {
        this._addCountByType(NativeKey.DailyMerge, type);
    }

    public addGameCount() {
        this._addCount(NativeKey.DailyGameCount);
    }

    public addUsePropCount(type) {
        this._addCount(NativeKey.DailyUsePropCount);
    }

    /**
     * 增量更新一个道具的数量
     * @param type 
     * @param num 
     */
    public updatePropCount(type: PropType, num: number) {
        const p = this.info.propData[type] || { count: 0 };
        p.count += num;
        p.count = p.count < 0 ? 0 : p.count
        this.info.propData[type] = p;
		cc.sys.localStorage.setItem("daoju",JSON.stringify(this.info.propData))
        EventMgr.ins.send(Event.UI.PropCount, type);
        this._pushSaveTask('propData');
    }

    public setMatch3Level(lv: number, qj: boolean = false) {
        if (lv > this.info.mathc3Level || qj) {
            //上报排行信息
            const lvData = this.getNativeLvData(this.info.mathc3Level);
            M.net.putRankData({ name: 'BarrierRank', value: Common.stringifyRankData(this.info.mathc3Level, lvData.score) });
            this.info.mathc3Level = lv;
			cc.sys.localStorage.setItem("gamelevel",lv)
            M.event.send(Event.UI.UpdateLv, lv);
            this._pushSaveTask('mathc3Level');
        } else {
            this.SelectLevel = lv;
        }
    }

    /**
    * 增量设置一个货币的数量
    * @param type 
    * @param num 
    */
    public addCurrency(type: CurrencyId, num: number) {
        if (type == CurrencyId.TaskKey) {
            DailyTaskMgr.ins.addDailyTaskKey(num);
        } else {
            const key = this.getCurrencyKey(type);
            const currentValue = this.info[key];
            if (type == CurrencyId.Power && num > 0 && currentValue >= MaxPowerCount) {
                return;
            }
            this.info[key] += num;
            if (this.info[key] < 0) {
                this.info[key] = 0;
            }
            EventMgr.ins.send(Event.UI.UpdateCurrency, type, this.getCurrency(type));
            this._pushSaveTask(key);
        }
    }

    public isPowerEnough(): boolean {
        return this.info.power >= PowerConfig.LvConsumption;
    }

    /**获取指定关卡的通关数据 */
    public getNativeLvData(lv: number = null): { score: number, star: number } {
        lv = lv || this.CurLevel;
        const key = `${NativeKey.LvDataKey}_${lv}`;
        let result = this.info.lvMap.get(key);
        if (!result) {
            result = <any>StorageMgr.Storage.getObject(key, { score: 0, star: 0 });
            if (result && result.score != 0 && result.star != 0) {
                this.info.lvMap.set(key, result);
            }
        }
        return result;
    }

    public getBoxGiftDataByLv(lv: number): { received: boolean } {
        const data = StorageMgr.Storage.getObject(NativeKey.BoxGifts, {});
        return data[lv];
    }

    public setBoxGiftData(lv: number, received: boolean) {
        const data = StorageMgr.Storage.getObject(NativeKey.BoxGifts, {});
        if (data[lv] && data[lv]['received']) return;
        data[lv] = { received };
        StorageMgr.Storage.setObject(NativeKey.BoxGifts, data, true);
    }

    /**
     * 保存关卡数据
     * @param star 星星数
     * @return Boolean 是否是新通关
     */
    public savaLvData(star: number, score?: number): boolean {
        const lvData = this.getNativeLvData(this.CurLevel);
        let isNew = false;
        if (lvData.score == 0 && lvData.star == 0) {
            isNew = true;
            M.runtime.addCollectCount('star', star);
        } else if (star - lvData.star > 0) {
            M.runtime.addCollectCount('star', star - lvData.star);
        }

        score = score || this._score;
        if (score > lvData.score) {
            lvData.score = score;
        }
        if (star > lvData.star) {
            lvData.star = star;
        }
        const key = `${NativeKey.LvDataKey}_${this.CurLevel}`;
        this.info.lvMap.set(key, lvData);
        StorageMgr.Storage.setObject(key, lvData, true);
        if (/*isNew && */this.CurLevel % 10 == 0) {
            const info = M.table.BoxRewardInfo.getByPrimaryKey(this.CurLevel);
            if (info) {
                //判断有奖励...插入待领取
                this.setBoxGiftData(this.CurLevel, false);
            }
        }
        return isNew;
    }


    private _preGameState = null;
    private _zyTimeTaskPool = 0;

    public pushZhangyuTimePause() {
        this._zyTimeTaskPool++;
        this.pauseGame();
    }

    public deleteZhangyuTime() {
        this._zyTimeTaskPool--;
        if (this._zyTimeTaskPool <= 0) {
            this.resumeGame();
        }
    }

    public pauseGame() {
        if (this._gameStata >= GameState.Win) {
            this._preGameState = this._gameStata;
        }
        this._gameStata = GameState.Pause;
    }

    public resumeGame() {
        if (this._gameStata == GameState.Pause) {
            this._gameStata = this._preGameState == null ? GameState.Normal : this._preGameState;
            EventMgr.ins.send(Event.GameCMD.GameResume);
        }
    }

    public getCurrencyKey(id: CurrencyId): string {
        return ['coin', 'diamond', 'power'][id];
    }

    /**开启定时器 */
    private _openTimer() {
        //这里在后台也是会运行的...特别注意!
        if (!CC_EDITOR) {
            this._timeHandle = setInterval(this.update.bind(this), 1000);
        }
    }

    /**插入背包数据 */
    private _pushSaveTask(key) {
        this._dataSaveTaskPool.push(key);
    }

    /**获取当前服务器配置 */
    public async getServerConfig(): Promise<IServerConfig> {
        return new Promise((resolve) => {
            if (!this._serverConfig) {
                M.net.getServerData().then(serverConfig => {
                    this._serverConfig = serverConfig;
                    resolve(serverConfig);
                });
            } else {
                resolve(this._serverConfig);
            }
        })
    }

    /**执行保存数据任务! */
    private async _execSaveTask() {
        if (!this._execSaveTasking) {
            this._execSaveTasking = true;
            const task = this._dataSaveTaskPool.shift();
            if (task) {
                await this.info.saveData(task);
                this._execSaveTasking = false;
                this._execSaveTask();
            } else {
                this._execSaveTasking = false;
            }
        }
    }

    private _updatePowerTime() {
        if (this.getCurrency(CurrencyId.Power) < MaxPowerCount) {
            this.info.timeCounter++
            if (this.info.timeCounter >= Number.MAX_SAFE_INTEGER) {
                this.info.timeCounter = 0
            }
            if (this.info.timeCounter % 30 == 0) {
                this._pushSaveTask('timeCounter');
            }
            if (this.info.timeCounter % PowerConfig.NormalTime == 0) {
                this.addCurrency(CurrencyId.Power, PowerConfig.NormalCount);
            }
            EventMgr.ins.send(Event.UI.UpdateRemainAddPowerTime, this.info.timeCounter);
        }
    }

    private _updateDailyTime() {
        this.setDailyTime(this._dailyTime + 1);
       // M.event.send(Event.DailyTask.UpdateProgress, ConditionType.time);
    }

    public get DailyTime() {
        return this._dailyTime;
    }

    public setDailyTime(value: number) {
        this._dailyTime = value;
        StorageMgr.RingStorage.day().setValue(NativeKey.DailyTime, this._dailyTime);
    }

    public update() {
        if (this._dataSaveTaskPool.length > 0) {
            this._execSaveTask();
        }

        if (this.info.serverTime != 0) {
            this.info.serverTime++;
            if (this.info.serverTime % 30 == 0) {
                this.info.saveLastTime();
            }
        }


        this._updatePowerTime();
        this._updateDailyTime();
    }

    public pushOnShowTask(task) {
        if (!this._onShowTask) {
            this._onShowTask = [];
        }
        this._onShowTask.push(task);
    }

    private _checkOnShowTask() {
        if (this._onShowTask && this._onShowTask.length > 0) {
            const userid = this._onShowTask.shift();
            M.net.addFriend(userid);
        }
    }

}