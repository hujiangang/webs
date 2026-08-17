import { CellModel } from "./CellModel";
import Common from '../../Common/Common';
import { MsgType } from "./CellBase";
import MultipleGridColModel from "./MultipleGridColModel";
import M from "../../../Base/Manager/M";
import { PropModel } from './PropModel';
import { GroundModel } from "./GroundModel";
import { Log } from "../../../Base/Utils/Log";
import { Event } from "../../Data/Const/Event";
import { Util } from "../../../Base/Utils/Util";
import { UpGroundModel } from "./UpGroundModel";
import GroundCellModel from "./GroundCellModel";
import UpGroundCellModel from "./UpGroundCellModel";
import EventMgr from "../../../Base/Manager/EventMgr";
import { ILevel, Grid, IMapData } from "../../Data/Interface/Level/ILevel";
import { CollectModel } from "./CollectModel";
import RuntimeMgr from "../../Data/RuntimeMgr";
import { GameState, CellType, ElimateType, WaringTips } from "../../Data/Const/Constant";
import { EnergyModel } from "./EnergyModel";
import { GapTime } from "../../Data/Const/TimeConfig";
import Sequence from "../../../Base/Network/Sequence";
import TaskCtrl from "../Control/TaskCtrl";
import LockCtrl from "../Control/LockCtrl";
import Girl from "./SpecialPlug/Girl";
import Conveyer from "./SpecialPlug/Conveyer";
import { DataPool } from "../../../Base/DataPool";

export interface IGridData {
    gm: GroundModel,
    ugm: UpGroundModel,
    mgModel: MultipleGridColModel,
    collect: { [key: string]: number },
    size: { W: number, H: number },
    cellList: Array<Array<CellModel>>,
    bornAry: Array<cc.Vec2>
}

export enum CreateType {
    Initial = 0,
    Bron,
    Midway,
    Nov
}

export default class GameModel {

    public static GridSize: { W: number, H: number } = null;

    private static _ins: GameModel = null;
    public static get ins(): GameModel {
        if (!this._ins) {
            Log.e('GameModel No Init ');
        }
        return this._ins;
    }
    /**关卡数据 */
    private lvData: ILevel = null;
    /**任务 */
    public task: TaskCtrl = null;
    /**锁 */
    private lock: LockCtrl = null;
    /**道具 */
    private propModel: PropModel = null;
    /**地固定面.... */
    private groundModel: GroundModel = null;
    /**上层特殊多功能层 */
    private upGroundModel: UpGroundModel = null;
    /**整块收集物,碎片化 */
    private mgModel: MultipleGridColModel = null;
    /**收集目标 */
    private collectModel: CollectModel = null;
    /**元素字典 */
    private cellDict: Set<CellModel> = null;
    /**下落的元素列表 */
    private fallDict: Set<CellModel> = null;
    /**链路追踪的容器 */
    private destoryMap: Map<number, { count: number, ary: Set<CellModel> }> = null;
    /**死亡的元素 */
    private deathDict: Set<CellModel> = null;
    /**正在传送中的元素 */
    private portalDict: Set<CellModel> = null;
    /**基础元素数据列表*/
    private cellList: Array<Array<CellModel>> = null;
    /**概率生成池*/
    private chipSetList: Array<CellType> = null;
    /**出生免疫池*/
    private initNoCreateList: Map<number, boolean> = null;
    /**最小消除数*/
    private minExecNum: number = 3;
    /**步数限制 */
    public stepCount: number = 0;
    public stepLimit: number = 0
    /**时间限制 */
    public timeLimit: number = 0;
    /**是否有可移动的地块 */
    public isHavaMoveGround: boolean = false;

    public isHaveGem: boolean = false;

    private isLongHeight: boolean = false;

    private timerTriggerCount = 0;

    /**是否正在提示中 */
    private prompting: boolean = false;
    /**全局检测开关 */
    private _isOpenAutoCheck: boolean = false;
    /**检测传输带开关! */
    private _isOpenConvyer: boolean = false;
    /**当前横地图数量 */
    private _mapCount = 0;
    /**当前正在展示中的地图 */
    private _mapIndex = 0;

    private bornAry: Array<cc.Vec2> = [];

    private mapDatas: { [key: number]: IGridData } = null;

    /**插件容器! */
    private _plugAry: Map<{ new(cfg) }, Object> = null;

    public CollectPos: cc.Vec2 = null;

    public isNovLv: boolean = false;

    public isFalling: boolean = false;

    public seq: Sequence = null;

    public IceCreamPool: Set<CellModel> = null;

    public CellTypeMap: Map<any, any> = null;

    public HaveFlowers: boolean = false;

    private _dataPool: DataPool<CellModel> = null;



    constructor(data: ILevel) {
        GameModel._ins = this;
        this.init(data);
    }

    public static destory() {
        this._ins.propModel.destory();
        // this._ins._dataPool.freeAll();
        // this._ins.destoryMap.clear();
        this._ins = null;
    }

    public init(data: ILevel = null) {

        data = this.lvData = data || this.lvData;
        this.seq = new Sequence();
        this.CellTypeMap = new Map();
        this.IceCreamPool = new Set();
        this.CollectPos = null;
        this.HaveFlowers = false;
        this.isNovLv = false;
        this.isFalling = false;
        this.isHaveGem = false;
        this.isHavaMoveGround = false;

        this.stepLimit = this.stepCount = data.levelInfo.movesLimit;
        this.timeLimit = data.levelInfo.timeLimit;
        this._mapCount = data.grid.length;

        this.lock = new LockCtrl();
        this.task = new TaskCtrl();

        this.cellDict = new Set();
        this.fallDict = new Set();
        this.destoryMap = new Map();
        this.deathDict = new Set();
        this.portalDict = new Set();
        this.propModel = new PropModel(this);
        this.collectModel = new CollectModel(data.collect);

        // this._dataPool = new DataPool(200, CellModel, true, false);

        //初始化收集目标
        this.initChipSet();
        //创建插件!
        this.createPlug();
        //初始化地图
        this.initMap();
        //初始化插件功能
        this.initPlug();
    }

    /**plug start  */
    private createPlug() {
        /**挂载小女孩 */
        if (this.lvData.girl) {
            this.mountPlug(Girl, this.lvData.girl);
        }
        /**挂载传送带 */
        if (this.lvData.conveyerList) {
            this.mountPlug(Conveyer, this.lvData);
        }
    }

    private initPlug() {
        if (this._plugAry) {
            this._plugAry.forEach((value: any, key) => {
                value.init();
            });
        }
    }

    public mountPlug<T>(e: { new(cfg: any): T }, cfg?: any): T {
        if (!this._plugAry) {
            this._plugAry = new Map();
        }
        const plug = new e(cfg);
        this._plugAry.set(e, plug);
        return plug;
    }

    public getPlug<T>(plug: { new(cfg: any): T }): T {
        let result = null;
        if (this._plugAry) {
            result = this._plugAry.get(plug);
        }
        return result
    }

    public notifyPlug(plug: { new(cfg: any) }) {
        const p = this.getPlug(plug);
        if (p) {
            p.onTrigger();
        }
    }
    /**plug end  */

    private initMap() {
        this.mapDatas = {};
        for (let i = 0; i < this._mapCount; i++) {
            const data = this.lvData.grid[i];
            this.initCell(data, i);
        }
        this.changeMap(0);
    }

    /**可能会有横向多屏,切换数据!! */
    public changeMap(index: number) {
        this._mapIndex = index;
        const data = this.mapDatas[index];
        this.bornAry = data.bornAry;
        this.cellList = data.cellList;
        this.mgModel = data.mgModel;
        this.groundModel = data.gm;
        this.upGroundModel = data.ugm;

        this.collectModel.updateCurSingleCollect(data.collect);
        GameModel.GridSize = data.size;
        // this.lastLineTodoSomething();
    }

    public notifyFallColumnOver(pos: cc.Vec2) {
        const dirs = [cc.v2(-1, 0), cc.v2(1, 0)];
        for (let i = dirs.length; i--;) {
            const dir = dirs[i];
            const cell = Common.safeGet2ArrayValue(this.cellList, pos.add(dir));
            if (cell) {
                cell.onMsg(MsgType.Fall);
            }
        }
    }

    public isCanMergeBomb(type: CellType, cell: CellModel): boolean {
        let result = true;
        if (this.lvData.mergeLimit) {
            result = this.lvData.mergeLimit[type + ''];
        }
        if (cell && this.isHavaSpe(cell.pos)) {
            result = false;
        }
        return result
    }

    private initCell(mapData: IMapData, index: number) {
        this.cellList = [];
        const map = mapData.map;
        const yLength = map.length;
        const xLength = map[0].length

        const gm = new GroundModel();
        const ugm = new UpGroundModel();
        const bornAry: Array<cc.Vec2> = [];
        const cellList: Array<Array<CellModel>> = [];
        const mgModel = new MultipleGridColModel(this.lvData, index);
        const size = { H: mapData.map.length, W: mapData.map[0].length };

        for (let y = 0; y < yLength; y++) {
            let xCells = [];
            for (let x = 0; x < xLength; x++) {
                const data = mapData.map[y][x];
                //初始化底部地图数据kkkk
                const gCell = gm.initGroupCell(data, x, y, index);
                //初始化上层特殊元素
                const ugCell = ugm.initUpGroupCell(data, x, y, index);
                //初始化元素cell
                if (data && gCell.isCanCreateCell) {
                    const cell = this.createCell({ cfg: data, pos: cc.v2(x, y), createType: CreateType.Initial, index, isInit: true });
                    cell && cell.initBindGround(gCell, ugCell);
                    xCells.push(cell);
                } else {
                    xCells.push(null);
                }
                if (gCell.isBorn) {
                    bornAry.push(gCell.pos);
                }
            }
            cellList.push(xCells);
        }
        this.mapDatas[index] = { gm, ugm, mgModel, bornAry, cellList, size, collect: mapData.collect }
        this.checkInitSameCell(index);
        mgModel.sync2View(gm.getGroupCellList());
    }

    private initChipSet() {
        this.chipSetList = [];
        this.initNoCreateList = new Map();
        let chips = this.lvData.chipset;
        if (!chips) {
            chips = [{ "type": 0, "percent": 75 }, { "type": 2, "percent": 100 }, { "type": 3, "percent": 75 }, { "type": 5, "percent": 100 }];
        }
        for (var i = 0; i < chips.length; i++) {
            const item = chips[i];
            const n = item.percent / 5;
            const type = item.type;
            if (item.isNoInitCreate) {
                this.initNoCreateList.set(type, true);
            }
            for (var j = 0; j < n; j++) {
                this.chipSetList.push(type);
            }
        }
    }

    /**
     * 
     * @param data 
     */
    public createCell(data: { cfg: Grid, pos: cc.Vec2, createType?: CreateType, index?: number, isInit?: boolean, isInsert2Ary?: boolean }) {
        // data: Grid, pos: cc.Vec2, createType: CreateType = CreateType.Initial, index: number = null, isInit: boolean = false, isInsert2Ary: boolean = null) {

        let isInsert2Ary: boolean = data.isInsert2Ary == undefined ? null : data.isInsert2Ary;
        let index = data.index || null;
        let createType = data.createType || CreateType.Initial;
        let isInit = data.isInit || false;
        let cfg = data.cfg || {};

        const cell = new CellModel(); //this._dataPool.getData();
        if (cell == Common.safeGet2ArrayValue(this.cellList, cell.pos)) {
            Common.safeSet2ArrayValue(this.cellList, cell.pos, null);
        }
        if (index == null) {
            index = this.mapIndex;
        }
        //插入管理队列! 
        this.cellDict.add(cell);
        if (isInsert2Ary == null) {
            isInsert2Ary = !!createType;
        }
        //初始化元素信息
        cell.init(cfg, index, data.pos, isInit, isInsert2Ary);
        if (this.isCollect(cell.getType())) cell.isCollect = true;
        if (createType) {
            cell.changeBindGround(cell.pos);
            this.task.pushAddNewTask(cell, createType);
        }
        return cell;
    }

    public freeCell(cell: CellModel) {
        // this._dataPool.freeData(cell);
        // Common.safeSet2ArrayValue(this.cellList, cell.pos, null); 
    }

    public addStep(count: number) {
        this.stepLimit += count;
    }

    /** 触发器-执行函数 */
    public timerTrigger() {
        this.timerTriggerCount++;
        this.isFalling = this.checkHaveFalling();

        this.lock && this.lock.update();

        if (!this.prompting && this.timerTriggerCount % GapTime.PromptElimate == 0) {
            this.prompting = true;
            this.checkSameCell();
        }

        if (!this.isFalling) {
            if (this.timerTriggerCount % 2 == 0) {
                if (this.destoryMap.size != 0) {
                    console.error(this.destoryMap);
                }
            }
            //检测是否有不匹配
            if (this._isOpenAutoCheck && this.timerTriggerCount % 3 == 0) {
                this.checkIsNeedResetGrid();
                this._isOpenAutoCheck = false;
            }
            //检测传送带
            if (this._isOpenConvyer && this.getPlug(Conveyer)) {
                this._isOpenConvyer = false;
                this.getPlug(Conveyer).onTrigger();
            }
            //检测数步用尽
            if (this.stepLimit <= 0 && RuntimeMgr.ins.GameState == GameState.Normal) {
                M.event.send(Event.GameCMD.GameOver, false);
            }
        }
    }

    /**
     * 执行消除~
     * @param centerModel 
     * @param closeAry 
     * @param eType 
     * @param extInfo 
     * @param keepTime 
     * @param groupId 
     */
    public execElimate(centerModel: CellModel, closeAry: Set<CellModel>, eType: ElimateType, extInfo: any, keepTime: number = null, groupId: number = null) {
        //停止提示功能!
        this.stopPrompt();
        //记录个数
        let size = 0;
        //纠正消除类型!
        eType = eType || ElimateType.Default;
        //剔除不能消除的元素(有障碍物或者其他不能消除的情况!)
        this.isFalling = true;
        groupId = groupId || this.seq.next();

        // if (!this.testmap.has(groupId)) {
        //     this.testmap.add(groupId);
        // }

        if (closeAry) {
            size = closeAry.size;
            closeAry.forEach((itemModel: CellModel) => {
                if (itemModel) {
                    if (!itemModel.isCanElimate()) {
                        //通知这个地方有消除操作,好执行木箱等障碍物的消除操作!!
                        // itemModel.onMsg(MsgType.Elimate, { id: groupId, targetModel: centerModel, size, type: eType });
                        //如果这个位置不是中心点 !!
                        // if (!itemModel.pos.equals(centerModel.pos)) {
                        //     closeAry.delete(itemModel);
                        // }
                    } else if (!itemModel.doTestDeath() || this._newCreatePool.has(itemModel)) {
                        //这里就已经把消除的元素death属性全部开启!
                        closeAry.delete(itemModel);
                    }
                }
            });

            //正式通知销毁的元素
            closeAry.forEach((itemModel) => {
                if (itemModel && itemModel.isDeath) {
                    this.deathDict.add(itemModel);
                    itemModel.onMsg(MsgType.Elimate, { id: groupId, targetModel: centerModel, size, type: eType });
                }
            });
        }
        centerModel.GroupId = groupId;
        //锁定合成炸弹的点,避免被上方落下元素占用!
        centerModel.lockCreateBombPos(size, eType);
        //飞机消除的特殊处理.(寻找飞机落脚点!)
        if (centerModel.getType() == CellType.Bomb4 || (size == 0 && centerModel.isRocket)) {
            extInfo = { pos: this.findPlaneEndPos(extInfo), type: extInfo };
        }
        this.task.pushElimateTask(centerModel, closeAry, size, eType, extInfo, keepTime);
        EnergyModel.ins.updataEnergy(eType, centerModel.getType());

        // if (M.runtime.GameState == GameState.End) {
        //     M.event.send(Event.GameCMD.MainCMD, taskPackage);
        // }
    }

    /**
     * 检测一个元素是否允许斜着掉落!
     * @param target    目的地的元素或者坐标
     * @param fallCell  需要下落的元素
     */
    public isCanDiagonallyFall(target: cc.Vec2 | CellModel, fallCell: CellModel): boolean {
        let result = true;
        let isHaveBorn = false;
        //上方是否有活动中的普通元素
        if (target instanceof CellModel) {
            target = target.pos;
        }
        /**检测下落位置是否有可用的传送阵 */
        const isport = this.isHavaPortalOut(target)
        /**检测下落位置是否被出生点占用 */
        const isCreateBron = this.lock.isBornPosLocked(target);
        //检测下落点是否有墙.
        const ud = GameModel.ins.checkHavaWall(target, target.add(cc.v2(0, -1)));
        //检测下方与下落点是否有左右格档
        const lr = GameModel.ins.checkHavaWall(fallCell.pos.add(cc.v2(0, 1)), target);
        //下方有左右格档墙
        if (lr || isport || isCreateBron) return false;

        // 这里有个疑问 ? 1 如果出生点在下落点下方. 0 斜落检测会把自己也计算上.导致检测到自己是普通元素而不进入下落
        for (let i = 1; i <= target.y; i++) {
            const tmpPos = target.add(cc.v2(0, -i));
            const gCell = Common.safeGet2ArrayValue(this.GroundList, tmpPos);
            if (this._isActive(tmpPos)) {  //|| this.isBorder(tmpPos)
                //找到正常的元素!
                result = false;
                break;
            }
            if (this._isBarrierCell(tmpPos)) {
                //找到障碍物 
                // result = false;
                break;
            }
            isHaveBorn = (gCell && gCell.isBorn);
        }
        //如果找到最顶端也没有障碍物阻挡.则不用斜移
        if (result && isHaveBorn) {
            result = false;
        }

        //如果上方是普通元素,并且有上挡墙
        if (!result) result = ud && !lr;

        return result;
    }

    /**
     * 判断一个元素是否是正常的,活动的! 上方没有任何附加道具!
     * @param pos
     */
    private _isActive(pos: cc.Vec2) {
        let result = true;
        const cell = Common.safeGet2ArrayValue(this.CellList, pos);
        if (!cell || (cell && (cell.isDeath || cell.isEmpty || cell.isDestoryed) || this._isBarrierCell(pos))) {
            result = false
        }
        return result;
    }

    /**
     * 判断一个位置是否是障碍(有水,木箱等不可移动物品!)
     * @param pos 
     */
    private _isBarrierCell(pos: cc.Vec2): boolean {
        let result = false;
        const upCell = Common.safeGet2ArrayValue(this.CellList, pos);
        const upGm = Common.safeGet2ArrayValue(this.GroundList, pos);
        const upUgm = Common.safeGet2ArrayValue(this.UpGroundList, pos);
        if ((upGm && upGm.isHold && !upGm.isPassable) || //有下层障碍物(水池...)
            (upUgm && upUgm.isObs) ||   //有上层障碍物(木箱...)
            (upCell && !upCell.isNotFixed())) { //有不可移动的元素(美人鱼,贝壳....)
            //有障碍!
            result = true;
        }
        return result;
    }

    /**
     * 检测是否可以下落,返回下落的方向!
     * @param checkCell 
     * @param curCell 
     * @param curPos 备用参数,当当前元素为空时,使用此变量做向量运算
     * @return down dir or null
     */
    private _testCanFall(checkCell: CellModel, curCell: CellModel, curPos: cc.Vec2): cc.Vec2 {
        //判断要检测的是否 阵亡,空,障碍物,是否是刚创建出来的炸弹!
        //判断自身是否是 空 死亡/下落 状态,下个点是否被锁定! , 上层是否有障碍物
        let result = null;
        if ((!checkCell.isEmpty && !checkCell.isDeath && checkCell.isNotFixed() && this.upCellIsCanMove(checkCell.pos) &&
            (!curCell || (curCell && (curCell.isDeath || curCell.isFall || curCell.isEmpty)) &&
                this.lock.isMyLocked(curPos, checkCell.pos)))) {
            //如果为斜着下落,检测是否可以斜着落! 
            if ((checkCell.isBomb && !checkCell.isBombReady) || (this.checkHavaWall(checkCell.pos, curPos))) {
                result = null;
            } else {
                const dir = curPos.sub(checkCell.pos);
                if (dir.x != 0 && dir.y != 0) {
                    if (this.isCanDiagonallyFall(curPos, checkCell)) {
                        result = dir;
                    }
                } else {
                    result = dir;
                }
            }
        }
        return result;
    }

    private _isHaveBron(pos: cc.Vec2, dir: cc.Vec2 = null): boolean {
        dir = dir || cc.v2(0, 0);
        const target = pos.add(dir);
        if (target.y < 0) {
            return false;
        } else {
            if (this._isBorn(target)) {
                return true;
            } else {
                return this._isHaveBron(target, cc.v2(0, -1));
            }
        }
    }


    public testFindCanFallCell(closeAry: Set<cc.Vec2> | cc.Vec2, group: number) {
        let nextDeps: Set<cc.Vec2> = new Set();
        if (closeAry instanceof cc.Vec2) {
            this._findFallCell(closeAry, nextDeps, group);
        } else {
            closeAry.forEach(itemCell => {
                this._findFallCell(itemCell, nextDeps, group);
            });
        }
        if (nextDeps.size > 0) {
            this.testFindCanFallCell(nextDeps, group);
        }
    }

    /**检测这个位置是否有传送阵出口,并且传送阵入口是正常随时可以传过来! */
    public isHavaPortalOut(pos: cc.Vec2) {
        const gm = Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
        let result = false;
        if (gm && gm.isPortalOut()) {
            const portalPos = GameModel.ins.getUpGroundModel().getPortalPos(gm.portalIdx);
            const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, portalPos.in);
            //检测入口是否是正常可传送的
            result = (cell && this.isCanFall(pos, cell.pos, false) && cell.isNotFixed());
        }
        return result;
    }

    private _findFallCell(basePos: cc.Vec2, nextDeps: Set<cc.Vec2> = null, grounpId: number) {
        const groundCell = Common.safeGet2ArrayValue(this.GroundList, basePos);
        //如果此时是边界..不延生检测
        if (basePos && (groundCell && !groundCell.isHold)) {
            let _threeDir = [cc.v2(0, -1), cc.v2(-1, -1), cc.v2(1, -1)];
            if (basePos.x > GameModel.GridSize.W / 2) {
                _threeDir = [cc.v2(0, -1), cc.v2(1, -1), cc.v2(-1, -1)];
            }
            for (let i = 0; i < _threeDir.length; i++) {
                const dir = _threeDir[i];
                const isUp = dir.equals(cc.v2(0, -1));
                const checkPos = basePos.add(dir);
                const baseItem = Common.safeGet2ArrayValue(this.cellList, basePos);
                const checkModel = Common.safeGet2ArrayValue(this.cellList, checkPos);
                // const checkGround = Common.safeGet2ArrayValue(this.GroundList, checkPos);
                //如果不是正常元素(刚生成没在进去网格的元素),不检测
                // if (checkGround && !checkGround.isHold) {
                //查询相对当前节点,上一个元素是否可以移动!!!!????
                if (checkModel) {
                    const downDir = this._testCanFall(checkModel, baseItem, basePos);
                    if (downDir) {
                        if (!this.fallDict.has(checkModel)) {
                            this.addFallCell(checkModel, downDir, grounpId);
                            nextDeps && nextDeps.add(checkModel.pos);
                        } else if (isUp) {
                            checkModel.resetFallDir();
                        }
                        break;
                    }
                } else if (isUp && !this.isBorder(checkPos)) {
                    //检测这个空位是否有斜落的
                    nextDeps && nextDeps.add(checkPos);
                }
            }
        }
    }

    /**
     * 新增一个需要掉落的元素
     * @param cell 掉落的元素
     * @param downDir 掉落的方向
     */
    public addFallCell(cell: CellModel, downDir: cc.Vec2, groupId: number) {

        if (!cell.isEmpty && !cell.isDeath) {
            if (!groupId) groupId = this.seq.next();
            this.fallDict.add(cell);
            this._insert2FallGroup(groupId, cell);
            cell.startFall(downDir);
            this.openAutoCheckOpt();
        }
    }


    public completFall(groupId: number, testCell: CellModel) {
        const groupData = this.destoryMap.get(groupId);
        if (!groupId) {
            console.error(testCell.pos.x, testCell.pos.y, groupId);
        }
        if (groupData) {
            // groupData.count--;
            // groupData.ary.delete(testCell);
            // if (groupData.count <= 0) {
            //     this.destoryMap.delete(groupId);
            // }
            groupData.count--;
            if (groupData.count <= 0) {
                //开始检测! 
                const elimateAry = [];
                groupData.ary.forEach(cell => {
                    if (cell && !cell.isEmpty && !cell.isDestoryed) {
                        const tmpAry = this.checkHavaElimate(cell.pos, false);
                        if (tmpAry) {
                            tmpAry['pos'] = cell.pos;
                            if (elimateAry.length <= 0 || this.hasSameCellInElimteAry(elimateAry, tmpAry)) {
                                elimateAry.push(tmpAry);
                            }
                        }
                    }
                });
                elimateAry.forEach((v) => {
                    this.execElimate(Common.safeGet2ArrayValue(this.cellList, v.pos), v.closeAry, null, v.bombType);
                })
                this.destoryMap.delete(groupId);
            }
        }
    }

    /**检测新 */
    private hasSameCellInElimteAry(elimateAry: Array<{ closeAry: Set<CellModel> }>, ary2: { closeAry: Set<CellModel> }): boolean {
        let result = true;
        if (elimateAry && ary2) {
            const arr = Array.from(ary2.closeAry);
            for (let o = elimateAry.length; o--;) {
                const inElimateCloseAry = elimateAry[o].closeAry;
                for (let i = arr.length; i--;) {
                    if (inElimateCloseAry.has(arr[i])) {
                        //这里是否包含此项消除! 
                        //判断当前个数与队列中的个数
                        if (inElimateCloseAry.size < ary2.closeAry.size) {
                            elimateAry[o] = ary2;
                        }
                        result = false
                        o = 0;
                        break;
                    }
                }
            }
        }
        return result;
    }

    private _deleteCellFromGroup(cell: CellModel) {
        if (cell && cell.GroupId) {
            const mapdata = this.destoryMap.get(cell.GroupId)
            if (mapdata && mapdata.ary.has(cell)) {
                mapdata.ary.delete(cell);
                this.completFall(cell.GroupId, cell);
            }
        }
    }

    private _insert2FallGroup(groupId: number, cell: CellModel) {
        //这里有可能 一个元素同时加入2个容器........要去重!
        if (groupId && cell && !cell.isDeath) {
            //感染下落目标
            cell.GroupId = groupId;
            const groupData = <any>this.destoryMap.get(groupId) || { count: 0, ary: new Set() };
            if (!groupData.ary.has(cell)) {
                groupData.count++;
                groupData.ary.add(cell);
                this.destoryMap.set(groupId, groupData);
            }
        }
    }

    /**打开一次自动检测开关 */
    public openAutoCheckOpt() {
        this._isOpenAutoCheck = true;
    }

    public removeFallDict(cell: CellModel) {
        this.fallDict.delete(cell);
    }

    public get PortalDict(): Set<CellModel> {
        return this.portalDict;
    }

    public removeDeathDict(cell: CellModel) {
        this._deleteCellFromGroup(cell);
        this.cellDict.delete(cell);
        this.deathDict.delete(cell);
    }

    public checkGameOver() {
        return new Promise((resolve) => {
            M.event.send(Event.Model.CheckGameOver, () => {
                resolve();
            });
        });
    }

    private _cellAllCount = 0;
    /**
     * 强制销毁一个格上所有东西!
     * @param pos 位置坐标
     * @param eType 被什么玩意销毁的
     * @param attackType 销毁者的类型
     */
    public execElimateOneAtAll(pos: cc.Vec2, eType: ElimateType, attackType?: CellType) {
        this._cellAllCount = 1;
        this.stopPrompt();
        const upcell = Common.safeGet2ArrayValue(this.UpGroundList, pos);
        if (upcell) {
            this._cellAllCount += upcell.execElimateAll();
        }
        const groundCell = Common.safeGet2ArrayValue(this.GroundList, pos);
        groundCell && groundCell.execElimateAll();
        const destoryId = this.seq.next();
        Common.execDelayTask(() => {
            this.testFindCanFallCell(pos, destoryId);
        }, 0.3);
        this.execElimateOne(pos, eType, false, destoryId);
        return this._cellAllCount;
    }

    public execElimateOne(pos: cc.Vec2, type: ElimateType = ElimateType.Default, isForced: boolean = false, destoryId: number = null) {
        const cell = Common.safeGet2ArrayValue(this.cellList, pos);
        if (cell && (cell.isEmpty || !cell.isDeath)) {
            if (cell.isCanElimate()) {
                cell.doTestDeath();
                destoryId = destoryId || this.seq.next();
                if (cell.isBomb && type != ElimateType.Girl) {
                    cell.onMsg(MsgType.Bomb);
                } else if (cell.isDeath || isForced) {
                    // this._isAutoChecked = false;
                    cell.onMsg(MsgType.Elimate, { id: destoryId, type, isForced });
                    this.task.pushElimateTask(cell, null, 0, type, null, null);
                }
            } else {
                cell.onMsg(MsgType.Elimate, { type, isForced });
            }
        }
    }

    /**更新收集物数量 */
    public updateCollectCount(type: CellType | string, index?: number | cc.Vec2, elimateType?: ElimateType, num: number = 1) {
        this.collectModel.updateCollectCount(type + '', num, index, elimateType);
        this.upGroundModel.updateCollectCount(type, <any>index);
    }

    public stopOverFall() {
        M.runtime.GameState = GameState.preReady;
    }

    public startOverFall() {
        this.stopPrompt();
        const id = this.seq.next();
        this.CellDict.forEach(cell => {
            this.addFallCell(cell, cc.v2(0, 1), id);
        })
    }

    // public onOverMove(pos: cc.Vec2) {
    // console.error(Common.convetPos(pos)); 
    // this.execElimateOne(Common.convetPos(pos));
    // }


    private _overFindFallCell(position: cc.Vec2): CellModel {
        let result = null;
        for (let i = this.cellList.length; i--;) {
            const row = this.cellList[i];
            for (let j = row.length; j--;) {
                const cell = row[j];
                if (cell && cell.extData) {
                    const box = cell.extData.getBoundingBoxToWorld()
                    if (box.contains(position)) {
                        result = cell;
                        i = 0;
                        break;
                    }
                }
            }
        }
        return result;
    }

    public onClick(position: cc.Vec2, isChuizi: boolean) {

        if (RuntimeMgr.ins.GameState == GameState.End) {
            //结束了....点消
            console.error('点消点击~');
            const touchCell = this._overFindFallCell(position);

            // const touchCell = Common.safeGet2ArrayValue(this.cellList, Common.convetPos(position));

            if (touchCell) {
                const result = this._endCheckPoint([touchCell]);
                console.error(result);
                if (result) {
                    const bombType = this.getClickPointBombType(result.length)
                    this.execElimate(touchCell, new Set(result), null, bombType);
                }
            }
        } else {
            this.propModel.execute(position, isChuizi);
        }

        // const pos = Common.convetPos(position);
        // const cell = Common.safeGet2ArrayValue(this.GroundList, pos);
        // if (cell.getType() == GroundType.Tuituji) {
        // GameModel.ins.CollectModel.updateCollectPowerCell(null, cell.tuitujiCfg.type);
        // }


        // const position = cc.v2(114.00216000000043, 54.00287999999928)
        // const pos1 = Common.convetPos(position);

        // console.error(pos1);
        // const groundcell = Common.safeGet2ArrayValue(this.GroundList, Common.convetPos(pos))
        // groundcell.extCtrl.complexViewNode.destroy();


        // this.getPlug(Conveyer).onTrigger();

        // this.execResetGridMove(Common.convetPos(pos), cc.v2(-1, 0));

        // this.resetGrid();

        //test!!! 
        // this.execElimateOne(Common.convetPos(pos));
        // this.execElimateOne(Common.convetPos(pos), ElimateType.Girl, true);

        // const upcm = Common.safeGet2ArrayValue(this.UpGroundList, Common.convetPos(pos));
        // if (upcm && upcm.isNov) {
        //     //提示.......... 
        //     M.tips.show(upcm.getNovWaringTitle(), 1);
        // }
    }

    public onDoubleClick(pos: cc.Vec2) {
        const cm = Common.safeGet2ArrayValue(this.cellList, pos);
        if (cm && cm.isBomb && cm.isBombReady && !cm.isFalling() && !this.isHavaSpe(pos)) {
            cm.onMsg(MsgType.Bomb);
            this.updateStepCount();
        }
    }

    private execResetGridMove(cpos: cc.Vec2, dir: cc.Vec2) {
        //先交换两个位置!
        const epos = cpos.add(dir);
        if (epos.x < 0 || epos.y < 0) {
            return
        }
        const cModel = Common.safeGet2ArrayValue(this.cellList, cpos);
        const eModel = Common.safeGet2ArrayValue(this.cellList, epos);

        if (cModel && eModel && !cModel.isEmpty && !eModel.isEmpty && !cModel.isGround && !eModel.isGround &&
            this.isCanExchange(cpos, epos) &&
            cModel.getType() != eModel.getType() &&
            !this.lock.isAutoExchangeLocked(epos) &&
            !this.lock.isAutoExchangeLocked(cpos)) {
            //检测交换数据后是否有可消除
            const result = [this.checkPoint(epos, cModel), this.checkPoint(cpos, eModel)]
            if (!result[0] && !result[1]) {
                //没有,则进行界面动画 
                eModel.pos = cpos;
                cModel.pos = epos;
                this.task.pushExchangeTask(eModel, cpos, cModel, epos);
                this.lock.addAutoExchange(epos);
                this.lock.addAutoExchange(cpos);
            }
        }
    }

    /**
     *  移动元素位置
     * @param pos 交换1位置
     * @param direction 方向!
     * @param isAutoCheck 是否是系统自动检测没有可移动元素时自动拉起更换元素!
     */
    public touchMove(pos: cc.Vec2, direction: cc.Vec2) {

        const epos = pos.add(direction);
        if (epos.x < 0 || epos.y < 0) {
            return;
        }
        const moveState = this.exchange(pos, epos);
        if (moveState == 0 || moveState == 3) return;

        /** 检测消除 */
        const result = [this.checkPoint(epos), this.checkPoint(pos)]
        const ps = [epos, pos];
        if (!result[0] && !result[1]) {
            //两边都是普通元素才换
            if (moveState == 1) {
                this.exchange(pos, epos);
            } else {
                ps.forEach((p) => {
                    Common.safeGet2ArrayValue(this.cellList, p).checkIsExit(p);
                });
                this.updateStepCount();
            }
        } else {
            result.forEach((r, index) => {
                let cm = Common.safeGet2ArrayValue(this.cellList, ps[index]);
                if (r) {
                    this.execElimate(cm, r.closeAry, null, r.bombType);
                } else {
                    cm.checkIsExit(cm.pos);
                }
            })
            this.updateStepCount();
        }
    }

    /**检测指定的一个位置是否有可以匹配消除的元素.并且执行消除操作! */
    public checkHavaElimate(pos: cc.Vec2, exec: boolean = true): { closeAry: Set<CellModel>, bombType: CellType } {
        if (M.runtime.GameState == GameState.Normal || M.runtime.GameState == GameState.Pause) {
            const ary = this.checkPoint(pos)
            if (ary && exec) {
                this.execElimate(Common.safeGet2ArrayValue(this.cellList, pos), ary.closeAry, null, ary.bombType);
            }
            return ary;
        }
        return null;
    }

    /**检测场面上的元素是否全部死亡 */
    public checkIsAllDeath(): boolean {
        let isAllDeath = true;
        for (let i = this.CellList.length; i--;) {
            for (let j = this.CellList[i].length; j--;) {
                const cell = this.CellList[i][j];
                if (cell && !cell.isDeath) {
                    i = 0;
                    isAllDeath = false;
                    break;
                }
            }
        }
        return isAllDeath;
    }

    public updateStepCount() {
        this.stepLimit--;
        this._isOpenConvyer = true;
        if (this.stepLimit <= 0) {
            this.stepLimit = 0;
        }
        M.event.send(Event.UI.UpdateInfoPanel);
        M.event.send(Event.UI.CloseTutorial);
    }

    private findPlaneEndPos(type: CellType = null): cc.Vec2 {
        //从收集的目标中优先找出当前屏幕的坐标!
        const targetPos = this.collectModel.findOneCollectPos(!!type);
        return targetPos;
    }

    /**没有可消除的元素时,重置棋盘 */
    public resetGrid(isForced: boolean = false) {
        this.stopPrompt();
        const ary: Set<CellModel> = new Set();
        let markExit: boolean = false;
        for (let i = this.CellList.length; i--;) {
            const row = this.CellList[i];
            for (let j = row.length; j--;) {
                const cell = row[j];
                if (cell && !cell.isDeath) {
                    if (!isForced && cell.isBomb && !this.isHavaSpe(cell.pos)) {
                        i = 0; j = 0;
                        markExit = true;
                        break;
                    }
                    if (!cell.isEmpty && cell.isNotFixed && !cell.isBomb && !this.isHavaObs(cell.pos) && !this.isHavaSpe(cell.pos)) {
                        ary.add(cell);
                    }
                }
            }
        }
        if (markExit) return;
        let dir = [cc.v2(-1, 0), cc.v2(0, 1)];
        console.error('没有可消除的! 重置!');
        //开始交换位置,并且不能有消除!!
        if (ary.size > 0) {
            M.tips.show(WaringTips.NoElimate);
            ary.forEach(cell => {
                this.execResetGridMove(cell.pos, dir[Util.Tool.rangeInt(0, dir.length, false)]);
            });
            this.lock.deleteAutoExchangeAll();
            Common.execDelayTask(() => { this._isOpenAutoCheck = true; }, 1);
        }
    }

    /**
     * 检测是否需要重置!
     */
    private checkIsNeedResetGrid(): boolean {
        // let result = true;
        // //不用考虑所有道具原因,开始查找是否有可以一起消除的!
        // if (this.checkSameCell()) {
        //     result = false;
        // } 
        const result = !this.checkSameCell(true);
        if (result) {

            this.resetGrid();
        }
        return
    }


    /**检测可消除片段 */
    private checkSameCell(isCheckNoting: boolean = false): boolean {
        let result = false;
        for (let y = this.cellList.length; y--;) {
            const xList = this.cellList[y];
            for (let x = xList.length; x--;) {
                const pos = cc.v2(x, y);
                const cellItem = xList[x];
                if (cellItem) {
                    if (this.isHavaObs(pos) || this.isHavaSpe(pos)) {
                        continue;
                    }
                    for (let k = Common.Dir4.length; k--;) {
                        let checkPos = cellItem.pos.add(Common.Dir4[k]);
                        if (this.checkHavaWall(cellItem.pos, checkPos) ||
                            this.isHavaObs(checkPos) || this.isHavaSpe(checkPos) ||
                            cellItem.isInvincible || cellItem.isGround) {
                            continue;
                        }
                        let res = this.checkPoint(checkPos, cellItem);
                        if (res && res.closeAry.size >= this.minExecNum) {
                            if (this.prompting && !isCheckNoting) {
                                this.promptCanElimate(cellItem, res.closeAry, checkPos);
                            }
                            result = true;
                            x = 0; y = 0;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    }

    private currentPromptTask = null;
    private stopPrompt() {
        this.timerTriggerCount = 0;
        if (this.prompting) {
            this.prompting = false;
            if (this.currentPromptTask) {
                EventMgr.ins.send(Event.GameCMD.StopPrompts, this.currentPromptTask);
                this.currentPromptTask = null;
            }
        }
    }

    private promptCanElimate(singleModel: CellModel, closeAry: Set<CellModel>, ckPos: cc.Vec2) {
        if (this.currentPromptTask) {
            EventMgr.ins.send(Event.GameCMD.StopPrompts, this.currentPromptTask);
            this.currentPromptTask = null;
        }
        closeAry.forEach((cm) => {
            if (Util.Tool.compareV2(cm.pos, ckPos)) {
                closeAry.delete(cm);
            }
        });
        this.currentPromptTask = this.task.pushTisTask(singleModel, closeAry, ckPos);
    }

    /**初始化检测相同元素 */
    private checkInitSameCell(mapIndex: number) {
        const list = this.mapDatas[mapIndex].cellList;
        for (let y = list.length; y--;) {
            const xList = list[y];
            for (let x = xList.length; x--;) {
                const cellItem = xList[x];
                if (cellItem && cellItem.isRandom && this.checkPoint(cellItem.pos, null, mapIndex)) {
                    cellItem.setRandomType(true, mapIndex);
                }
            }
        }
    }

    private isCollect(type: CellType): boolean {
        return this.getCollect().get(type + '') != undefined
    }

    private isCanExchange(pos1: cc.Vec2, pos2: cc.Vec2, isCheckWall: boolean = true): boolean {
        let result: boolean = true;
        const tmpAry = [pos1, pos2];
        for (let i = tmpAry.length; i--;) {
            const pos = tmpAry[i];
            if (this.isHavaSpe(pos) || this.isHavaObs(pos) || this.isHold(pos)) {
                result = false
                break;
            }
        }
        if (isCheckWall && result) {
            result = !this.checkHavaWall(pos1, pos2);
        }
        return result;
    }

    /**
     * 检测是否有墙.............
     * @param pos1 
     * @param pos2 
     */
    public checkHavaWall(pos1: cc.Vec2, pos2: cc.Vec2): boolean {
        let result = false;
        const g1 = Common.safeGet2ArrayValue(this.GroundList, pos1);
        const g2 = Common.safeGet2ArrayValue(this.GroundList, pos2);
        if (g1 && g2) {
            //在同一个列,检测上下
            if (pos1.x == pos2.x) {
                if (pos1.y > pos2.y) {
                    //检测1是否有上面的,检测2是否有下面的
                    result = (g1.checkWall('top') || g2.checkWall('bottom'));
                } else {
                    //检测1是否有下面的,检测2是否有上面的
                    result = (g1.checkWall('bottom') || g2.checkWall('top'));
                }
            } else if (pos1.y == pos2.y) {
                //在同一个行,检测左右
                if (pos1.x > pos2.x) {
                    //检测1是否有左边的,检测2是否有右边的
                    result = (g1.checkWall('left') || g2.checkWall('right'));
                } else {
                    //检测1是否有右边的,检测2是否有左边的
                    result = (g1.checkWall('right') || g2.checkWall('left'));
                }
            }
        }
        return result;
    }


    /**没有正在执行交换 */
    private isNoMoving(m1: CellModel, m2: CellModel): boolean {
        let result = false;
        if (m1 && m2) {
            if (m1.extCtrl && m2.extCtrl) {
                result = !m1.extCtrl.isRunMove && !m2.extCtrl.isRunMove;
            }
            if ((m1.isFall || m1.isDeath) || (m2.isFall || m2.isDeath)) {
                result = false;
            }
        }
        return result;
    }


    /**
     * 执行元素交换,并且返回交换状态
     * @param cpos 
     * @param epos
     * @returns 0为没有交换 1为已经交换 2为已经交换,并且有一者为炸弹 3为两者都是炸弹
     */
    private exchange(cpos: cc.Vec2, epos: cc.Vec2, justChangePosData: boolean = false): number {
        const cModel = Common.safeGet2ArrayValue(this.cellList, cpos);
        const eModel = Common.safeGet2ArrayValue(this.cellList, epos);

        let result = 1;
        //是否正在下落状态
        if (!cModel || !eModel || !cModel.isNotFixed() || !eModel.isNotFixed()) {
            return 0;
        }
        //其中一个为空/
        if (eModel.isEmpty || cModel.isEmpty || cModel.isGround || eModel.isGround) {
            return 0;
        }
        //是否是即将爆炸的炸弹
        if (cModel.isBomb && !cModel.isBombReady || eModel.isBomb && !eModel.isBombReady) {
            return 0;
        }

        if (eModel.isBomb && cModel.isBomb) {
            result = 3;
            this.task.pushExchangeTask(eModel, cpos, cModel, epos);
        } else {
            if (this.isNoMoving(cModel, eModel) && this.isCanExchange(cpos, epos)) {
                eModel.pos = cpos;
                cModel.pos = epos;
                //数据变换~
                this.task.pushExchangeTask(eModel, cpos, cModel, epos);
                if (eModel.isBomb || cModel.isBomb) {
                    result = 2;
                }
            } else {
                result = 0;
            }
        }
        return result;
    }

    private getUpGroundCell(pos: cc.Vec2, index: number = null): UpGroundCellModel {
        let list: UpGroundCellModel[][] = null
        if (index != null) {
            list = this.mapDatas[index].ugm.getUGroupCellList();
        } else {
            list = this.UpGroundList;
        }
        return Common.safeGet2ArrayValue(list, pos);
    }

    private getGroundCell(pos: cc.Vec2, index: number = null): GroundCellModel {
        let list: GroundCellModel[][] = null
        if (index != null) {
            list = this.mapDatas[index].gm.getGroupCellList();
        } else {
            list = this.GroundList;
        }
        return Common.safeGet2ArrayValue(list, pos);
    }

    /**
     * 随机拿一个元素!
     * @param isNotLimit 是否需要限制普通元素 
     */
    public getRandomCell(isNotLimit: boolean = false): CellModel {
        const y = Util.Tool.rangeInt(0, this.cellList.length, false);
        const x = Util.Tool.rangeInt(0, this.cellList[y].length, false);
        const cs = Common.safeGet2ArrayValue(this.cellList, cc.v2(x, y));
        if ((cs && !cs.isEmpty) && (isNotLimit || (!cs.isBomb && !this.isHavaObs(cs.pos)))) {
            return cs;
        } else {
            return this.getRandomCell(isNotLimit);
        }
    }

    public get CollectModel(): CollectModel {
        return this.collectModel
    }

    public getCollect(): Map<string, number> {
        return this.collectModel.mainCollect;
    }

    public checkIsNoInitCreate(type): boolean {
        return this.initNoCreateList.get(type);
    }

    public getRandomCellType(): CellType {
        let type: CellType = CellType.Empty;
        if (this.chipSetList) {
            type = this.chipSetList[Util.Tool.rangeInt(0, this.chipSetList.length - 1)];
        }
        return type;
    }

    public get GroundList(): Array<Array<GroundCellModel>> {
        return this.groundModel.getGroupCellList();
    }

    public get CellList(): Array<Array<CellModel>> {
        return this.cellList;
    }

    public get Lock(): LockCtrl {
        return this.lock;
    }

    public get UpGroundList(): Array<Array<UpGroundCellModel>> {
        return this.upGroundModel.getUGroupCellList();
    }

    public getUpGroundModel(): UpGroundModel {
        return this.upGroundModel;
    }

    public getTopPosition(mapIndex: number): cc.Vec2 {
        return Common.getPos(0, 0, mapIndex);
    }

    /**获取占用多个格子的收集物控制器 */
    public getMgModel(): MultipleGridColModel {
        return this.mgModel;
    }

    public getLvData(): ILevel {
        return this.lvData;
    }

    public getGridSize(): { W: number, H: number } {
        return GameModel.GridSize;
    }

    public getMaps() {
        return this.mapDatas;
    }

    public get mapIndex(): number {
        return this._mapIndex;
    }

    public get mapCount(): number {
        return this._mapCount;
    }

    public setLongHeight(opt: boolean) {
        this.isLongHeight = opt;
    }

    public isLongMode(): boolean {
        return this.isLongHeight;
    }

    /**检测当前是否有正在掉落中的物品,请搭配定时器使用 */
    private checkHaveFalling(): boolean {
        let result = false;
        if (this.fallDict.size > 0) {
            result = true;
        }
        if (!result) {
            this.CellDict.forEach(cell => {
                if (cell && !cell.isEmpty && (cell.isFall || cell.isDeath)) {
                    result = true;
                }
            });
        }
        return result;

        // this.deathDict.forEach(item => {
        //     if (item && (item.isEmpty || item.isDestoryed || item.isRemoved())) {
        //         this.deathDict.delete(item);
        //     }
        // });
        // return (this.fallDict.size > 0 || this.deathDict.size > 0) 
    }

    /**检测Y上方一个不是为null的元素 */
    private checkUpNotCellByPos(pos: cc.Vec2): CellModel {
        if (Util.Tool.isNull(pos)) {
            return null;
        }
        const upPos = pos.add(cc.v2(0, -1));
        const upItem = Common.safeGet2ArrayValue(this.cellList, upPos);
        let result = null;
        if (!upItem && upPos.y > 0) {
            return this.checkUpNotCellByPos(upPos);
        } else if (upItem /*&& !this.isHavaSpe(upItem.pos)*/) {
            result = upItem;
        }
        return result;
    }

    /**
       * 检测是否有匹配的消除规则 
       * @param pos 检测的点
       * @param ckModel 检测的类型(兼容手动指定类型)
       * @param mapIndex 检测的地图下标(兼容多地图模式)
       * @returns .....
       */
    public checkPoint(pos: cc.Vec2, ckModel: CellModel = null, mapIndex: number = null): { closeAry: Set<CellModel>, bombType: CellType } {

        let container: Set<CellModel> = null;
        let bombType: CellType = null;
        let isSquare: boolean = false;
        let list = this.cellList;

        if (mapIndex != null) {
            list = this.mapDatas[mapIndex].cellList
        }
        const curModel = Common.safeGet2ArrayValue(list, pos);
        if (curModel) {
            if (curModel.isInvincible || curModel.isEmpty || curModel.isGround) {
                return null;
            }

            if (!this.isHavaObs(pos, mapIndex) && !curModel.isBomb) {
                const row = new Set<CellModel>();
                const col = new Set<CellModel>();
                const type = ckModel ? ckModel.getType() : curModel.getType();

                this.checkWithDirection(pos, type, row, [cc.v2(1, 0), cc.v2(-1, 0)], ckModel, mapIndex);
                this.checkWithDirection(pos, type, col, [cc.v2(0, 1), cc.v2(0, -1)], ckModel, mapIndex);

                if (ckModel) {
                    if (row.size >= 2) {
                        row.add(curModel);
                    } else if (col.size >= 2) {
                        col.add(curModel);
                    }
                }

                if (row.size == 0 && col.size == 0) {
                    return null;
                }

                bombType = this.getBombType(row, col);
                //判断是否是四方:是个折角并且斜对角是相同  飞机
                if (col.size >= 2 && row.size >= 2 && !bombType) {
                    const squareCell = Common.getSquareSingleCell(col, row, type, curModel.pos, list);
                    if (squareCell) {
                        row.add(squareCell);
                        bombType = CellType.Bomb4
                        isSquare = true;
                    }
                }

                if (row.size >= this.minExecNum || isSquare) {
                    container = row;
                } else {
                    container = new Set<CellModel>();
                }

                if (col.size >= this.minExecNum || isSquare) {
                    col.forEach(model => container.add(model));
                }

                if (container.size < this.minExecNum) {
                    container.clear();
                    container = null;
                }
            }
        }

        return container ? { closeAry: container, bombType } : null;
    }

    private isTypeMatching(type: CellType, nextCell: CellModel): boolean {
        let result: boolean = false;
        if (!nextCell.isJustBombElimate && type == nextCell.getType()) {
            result = true;
        }
        return result;
    }

    /**根据方向递归寻找可消除元素 */
    private checkWithDirection(pos: cc.Vec2, type: CellType, container: Set<CellModel>, dir: cc.Vec2[], ckModel: CellModel = null, mapIndex: number = null) {
        let list = this.cellList;
        if (mapIndex != null) {
            list = this.mapDatas[mapIndex].cellList
        }
        for (let i = dir.length; i--;) {
            const nextPos = cc.v2(pos.add(dir[i]));
            const nextModel = Common.safeGet2ArrayValue(list, nextPos);
            if (dir[i].y != 0) {
                const upItem = this.checkUpNotCellByPos(pos);
                if (upItem && (upItem.isFalling() && upItem.getType() == type)) {
                    // container.clear(); 
                    break;
                }
            }
            if (!nextModel || (nextModel && nextModel.isEmpty) || this.isHavaObs(nextPos, mapIndex)) {
                continue;
            }
            if (ckModel && (this.isHavaObs(nextPos, mapIndex) || Util.Tool.compareV2(nextPos, ckModel.pos))) {
                continue;
            }
            if (!nextModel.isDeath && !nextModel.isFalling() && !nextModel.isPortaling && this.isTypeMatching(type, nextModel) && !container.has(nextModel)) {
                container.add(nextModel);
                this.checkWithDirection(nextModel.pos, type, container, dir, ckModel, mapIndex);
            }
        }
    }

    private _endCheckPoint(cellAry: Array<CellModel>): Array<CellModel> {
        let result = []
        for (let i = cellAry.length; i--;) {
            const cell = cellAry[i];
            if (cell) {
                Common.Dir4.forEach(dir => {
                    const nextPos = cell.pos.add(dir);
                    const nextCell = Common.safeGet2ArrayValue(this.cellList, nextPos);
                    //有可能会死循环~
                    if (nextCell && nextCell.getType() == cell.getType() && cellAry.indexOf(nextCell) == -1) {
                        result.push(nextCell);
                    }
                })
            }
        }
        return result.length > 0 ? this._endCheckPoint(cellAry.concat(result)) : cellAry;
    }

    // private _endCheckPoint(pos: cc.Vec2): Set<CellModel> {
    //     const cell = Common.safeGet2ArrayValue(this.cellList, pos);
    //     let result = new Set<CellModel>();


    //     if (cell) {
    //         Common.Dir4.forEach(dir => {
    //             const nextPos = pos.add(dir);
    //             const nextCell = Common.safeGet2ArrayValue(this.cellList, nextPos);
    //             if (nextCell && nextCell.getType() == cell.getType() && ) {
    //                 //匹配~
    //                 result.add(nextCell)
    //             }
    //         })
    //     }


    //     return;
    // }

    public get CellDict(): Set<CellModel> {
        return this.cellDict;
    }


    /*******************************************************************跟元素功能相关  待抽出*/

    /**是否有特殊遮挡物 */
    public isHavaSpe(pos: cc.Vec2, index: number = null) {
        const upCell = this.getUpGroundCell(pos, index);
        return upCell ? upCell.isHavaSpe : false;
    }

    /**上层障碍物是否可以移动  */
    public upCellIsCanMove(pos: cc.Vec2): boolean {
        const upCell = this.getUpGroundCell(pos);
        return (!upCell || upCell && upCell.isCanFall());
    }

    /**一块格是否有障碍物,  */
    public isHavaObs(pos: cc.Vec2, index: number = null): boolean {
        const upCell = this.getUpGroundCell(pos, index);
        return upCell ? upCell.isObs : false;
    }

    /**是否是地面障碍(水面什么的) */
    public isHold(pos: cc.Vec2, index: number = null): boolean {
        const groundCell = this.getGroundCell(pos, index);
        return groundCell ? groundCell.isHold : true;
    }

    /**检测这块地面是否是可穿透 */
    public getNotPassblePoss(nextPos: cc.Vec2): cc.Vec2 {
        const gc = Common.safeGet2ArrayValue(this.GroundList, nextPos);
        if (gc && gc.isPassable) {
            return this.getNotPassblePoss(nextPos.add(cc.v2(0, 1)));
        }
        return nextPos;
    }

    /**
     * 检测一个点是否是边界
     * @param pos 
     */
    public isBorder(pos: cc.Vec2) {

        let result = false;

        // if (M.runtime.GameState == GameState.End) {
        //     return result;
        // }

        const gcell = Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
        if (gcell) {
            //如果是个障碍物,并且不让通过
            if (gcell.isHold || gcell.getType() == null) {
                result = true;
            }
            //如果下面那个是可以通过的
            if (gcell.isPassable) {
                result = false;
            }
        } else {
            result = true;
        }
        return result;
    }

    /**
    * 下一个目标点是否可以掉落!?
    * @param nextPos 目标点坐标!
    * @param isFalling 是否带速度检测!
    * @returns 是否可以 ?
    */
    public isCanFall(nextPos: cc.Vec2, selfPos: cc.Vec2, isFalling: boolean = true, isCreateBomb: boolean = false): boolean {

        //是否已经上锁
        const isLocked = this.lock.isMyLocked(nextPos, selfPos);
        //是否可以直接通过,没有障碍物
        const isPassable = this.isPassable(nextPos, selfPos);
        //是否有效
        const isInvalid = this._isInvalidCell(nextPos, isFalling, isCreateBomb);

        return isLocked && isInvalid && isPassable;
    }

    /**
     * 指定位置元素是否已经无效
     * @param pos 
     * @param isFalling 
     */
    private _isInvalidCell(pos: cc.Vec2, isFalling: boolean, isCreateBomb: boolean) {
        let result = false;
        const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, pos);
        if (!cell) {
            result = true
        } else if (cell.isEmpty || cell.isRemoved() || (isFalling ? cell.isFalling() : cell.isFall) || (isCreateBomb && cell.isDeath)) {
            result = true
        }
        return result;
    }

    /**
     * 位置上是否可以通行!
     * @param pos 
     * @param selfpos 用于穿透降落时检测是否位置被上锁
     */
    public isPassable(nextPos: cc.Vec2, selfPos: cc.Vec2) {
        let result = true;
        // if (M.runtime.GameState == GameState.End) {
        //     return result;
        // }
        const gcell = Common.safeGet2ArrayValue(GameModel.ins.GroundList, nextPos);
        const ugcell = Common.safeGet2ArrayValue(GameModel.ins.UpGroundList, nextPos);
        //如果地面为空,则不能通行
        if (!gcell) {
            result = false;
        }
        //如果地面有障碍物,则不能通行
        if (gcell && selfPos) {
            if (gcell.isHold) {
                result = false;
            } else if (this.checkHavaWall(nextPos, selfPos)) {
                result = false;
            }
        }
        //如果有上层障碍物(木箱等),不能通行
        if (ugcell && ugcell.isObs) {
            result = false;
        }
        return result;
    }

    /**
     * 
     * @param row 横
     * @param col 竖
     */
    private getBombType(row: Set<CellModel>, col: Set<CellModel>): CellType {
        //彩虹
        if (row.size >= 5 || col.size >= 5) {
            return CellType.Bomb5;
        }
        //圆形
        if (row.size >= 3 && col.size >= 3) {
            return CellType.Bomb1;
        }
        //竖炸弹
        if (row.size >= 4) {
            return CellType.Bomb3;
        }
        //横炸弹
        if (col.size >= 4) {
            return CellType.Bomb2;
        }
        return null;
    }

    private getClickPointBombType(size: number) {
        let result = null;
        if (size >= 4 && size < 5) {
            result = CellType.Bomb2;
        } else if (size > 5 && size < 6) {
            result = CellType.Bomb1;
        } else if (size > 6) {
            result = CellType.Bomb5;
        }
        return result;
    }

    /*******************************************************************跟元素相关  待抽出*/

    /**检测是否有可以传送的玩意! */
    private checkPortal() {
        // const pMap = this.upGroundModel.getAllPortal();
        // pMap.forEach((value) => {
        //     const cell = Common.safeGet2ArrayValue(this.cellList, value.in);
        //     cell && cell.onMsg(MsgType.Portal);
        // })
    }

    /**是否可以创建出生点元素 */
    private isCanCreateBornCell(pos: cc.Vec2, model: CellModel): boolean {
        //是否有锁 
        if (this.lock.isBornPosLocked(pos) || this.lock.isFallLocked(pos)/*!this.lock.isMyLocked(pos, pos.add(cc.v2(0, -1))) */) {
            return false;
        }
        //是否有障碍物
        if ((this.isHavaSpe(pos) && !this.upCellIsCanMove(pos)) || this.isHold(pos)) {
            return false;
        }
        //是否清理干净
        if (model && !model.isEmpty && !model.isDeath && !model.isFalling()) {
            return false;
        }
        return true;
    }


    private _newCreatePool: Set<CellModel> = new Set();

    public removeNewCreateCell(cell: CellModel) {
        this._newCreatePool.delete(cell);
    }

    public checkNeedCreateNewCell(pos: cc.Vec2, groupId: number) {
        const bornModel = Common.safeGet2ArrayValue(this.cellList, pos);

        if (this.isCanCreateBornCell(pos, bornModel)) {
            this.lock.lockBornPos(pos);
            const cell = this.createCell({ cfg: null, pos: pos.add(cc.v2(0, -1)), createType: CreateType.Bron, isInsert2Ary: false });
            this.addFallCell(cell, cc.v2(0, 1), groupId);
            this._newCreatePool.add(cell);
        }
    }

    public _isBorn(pos: cc.Vec2) {
        const ground = Common.safeGet2ArrayValue(this.GroundList, pos);
        return ground && ground.isBorn;
    }

    private cellUpdate(dt) {
        if (this.fallDict && this.fallDict.size > 0) {
            for (let i = this.cellList.length; i--;) {
                const coll = this.cellList[i];
                for (let j = 0; j < coll.length; j++) {
                    const cell = coll[j];
                    if (cell && cell.isFall && !cell.isDestoryed) {
                        cell.updateFall(dt);
                        if (this._isBorn(cell.pos)) {
                            this.checkNeedCreateNewCell(cell.pos, cell.GroupId);
                        }
                    }
                }
            }
        }

        if (this._newCreatePool && this._newCreatePool.size > 0) {
            this._newCreatePool.forEach(cell => {
                if (cell && !cell.isDestoryed) {
                    cell.updateFall(dt);
                } else {
                    this._newCreatePool.delete(cell);
                }
            })
        }
    }

    public update(dt: number) {
        this.task.update(dt);
        if (RuntimeMgr.ins.GameState != GameState.Pause) {
            this.cellUpdate(dt);
        }
    }

}