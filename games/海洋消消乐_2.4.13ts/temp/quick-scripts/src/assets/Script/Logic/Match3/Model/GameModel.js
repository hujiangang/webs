"use strict";
cc._RF.push(module, '7f6782dIJpIr4dMjn3r8QIA', 'GameModel');
// Script/Logic/Match3/Model/GameModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateType = void 0;
var CellModel_1 = require("./CellModel");
var Common_1 = require("../../Common/Common");
var CellBase_1 = require("./CellBase");
var MultipleGridColModel_1 = require("./MultipleGridColModel");
var M_1 = require("../../../Base/Manager/M");
var PropModel_1 = require("./PropModel");
var GroundModel_1 = require("./GroundModel");
var Log_1 = require("../../../Base/Utils/Log");
var Event_1 = require("../../Data/Const/Event");
var Util_1 = require("../../../Base/Utils/Util");
var UpGroundModel_1 = require("./UpGroundModel");
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var CollectModel_1 = require("./CollectModel");
var RuntimeMgr_1 = require("../../Data/RuntimeMgr");
var Constant_1 = require("../../Data/Const/Constant");
var EnergyModel_1 = require("./EnergyModel");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var Sequence_1 = require("../../../Base/Network/Sequence");
var TaskCtrl_1 = require("../Control/TaskCtrl");
var LockCtrl_1 = require("../Control/LockCtrl");
var Girl_1 = require("./SpecialPlug/Girl");
var Conveyer_1 = require("./SpecialPlug/Conveyer");
var CreateType;
(function (CreateType) {
    CreateType[CreateType["Initial"] = 0] = "Initial";
    CreateType[CreateType["Bron"] = 1] = "Bron";
    CreateType[CreateType["Midway"] = 2] = "Midway";
    CreateType[CreateType["Nov"] = 3] = "Nov";
})(CreateType = exports.CreateType || (exports.CreateType = {}));
var GameModel = /** @class */ (function () {
    function GameModel(data) {
        /**关卡数据 */
        this.lvData = null;
        /**任务 */
        this.task = null;
        /**锁 */
        this.lock = null;
        /**道具 */
        this.propModel = null;
        /**地固定面.... */
        this.groundModel = null;
        /**上层特殊多功能层 */
        this.upGroundModel = null;
        /**整块收集物,碎片化 */
        this.mgModel = null;
        /**收集目标 */
        this.collectModel = null;
        /**元素字典 */
        this.cellDict = null;
        /**下落的元素列表 */
        this.fallDict = null;
        /**链路追踪的容器 */
        this.destoryMap = null;
        /**死亡的元素 */
        this.deathDict = null;
        /**正在传送中的元素 */
        this.portalDict = null;
        /**基础元素数据列表*/
        this.cellList = null;
        /**概率生成池*/
        this.chipSetList = null;
        /**出生免疫池*/
        this.initNoCreateList = null;
        /**最小消除数*/
        this.minExecNum = 3;
        /**步数限制 */
        this.stepCount = 0;
        this.stepLimit = 0;
        /**时间限制 */
        this.timeLimit = 0;
        /**是否有可移动的地块 */
        this.isHavaMoveGround = false;
        this.isHaveGem = false;
        this.isLongHeight = false;
        this.timerTriggerCount = 0;
        /**是否正在提示中 */
        this.prompting = false;
        /**全局检测开关 */
        this._isOpenAutoCheck = false;
        /**检测传输带开关! */
        this._isOpenConvyer = false;
        /**当前横地图数量 */
        this._mapCount = 0;
        /**当前正在展示中的地图 */
        this._mapIndex = 0;
        this.bornAry = [];
        this.mapDatas = null;
        /**插件容器! */
        this._plugAry = null;
        this.CollectPos = null;
        this.isNovLv = false;
        this.isFalling = false;
        this.seq = null;
        this.IceCreamPool = null;
        this.CellTypeMap = null;
        this.HaveFlowers = false;
        this._dataPool = null;
        this._cellAllCount = 0;
        this.currentPromptTask = null;
        this._newCreatePool = new Set();
        GameModel._ins = this;
        this.init(data);
    }
    Object.defineProperty(GameModel, "ins", {
        get: function () {
            if (!this._ins) {
                Log_1.Log.e('GameModel No Init ');
            }
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    GameModel.destory = function () {
        this._ins.propModel.destory();
        // this._ins._dataPool.freeAll();
        // this._ins.destoryMap.clear();
        this._ins = null;
    };
    GameModel.prototype.init = function (data) {
        if (data === void 0) { data = null; }
        data = this.lvData = data || this.lvData;
        this.seq = new Sequence_1.default();
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
        this.lock = new LockCtrl_1.default();
        this.task = new TaskCtrl_1.default();
        this.cellDict = new Set();
        this.fallDict = new Set();
        this.destoryMap = new Map();
        this.deathDict = new Set();
        this.portalDict = new Set();
        this.propModel = new PropModel_1.PropModel(this);
        this.collectModel = new CollectModel_1.CollectModel(data.collect);
        // this._dataPool = new DataPool(200, CellModel, true, false);
        //初始化收集目标
        this.initChipSet();
        //创建插件!
        this.createPlug();
        //初始化地图
        this.initMap();
        //初始化插件功能
        this.initPlug();
    };
    /**plug start  */
    GameModel.prototype.createPlug = function () {
        /**挂载小女孩 */
        if (this.lvData.girl) {
            this.mountPlug(Girl_1.default, this.lvData.girl);
        }
        /**挂载传送带 */
        if (this.lvData.conveyerList) {
            this.mountPlug(Conveyer_1.default, this.lvData);
        }
    };
    GameModel.prototype.initPlug = function () {
        if (this._plugAry) {
            this._plugAry.forEach(function (value, key) {
                value.init();
            });
        }
    };
    GameModel.prototype.mountPlug = function (e, cfg) {
        if (!this._plugAry) {
            this._plugAry = new Map();
        }
        var plug = new e(cfg);
        this._plugAry.set(e, plug);
        return plug;
    };
    GameModel.prototype.getPlug = function (plug) {
        var result = null;
        if (this._plugAry) {
            result = this._plugAry.get(plug);
        }
        return result;
    };
    GameModel.prototype.notifyPlug = function (plug) {
        var p = this.getPlug(plug);
        if (p) {
            p.onTrigger();
        }
    };
    /**plug end  */
    GameModel.prototype.initMap = function () {
        this.mapDatas = {};
        for (var i = 0; i < this._mapCount; i++) {
            var data = this.lvData.grid[i];
            this.initCell(data, i);
        }
        this.changeMap(0);
    };
    /**可能会有横向多屏,切换数据!! */
    GameModel.prototype.changeMap = function (index) {
        this._mapIndex = index;
        var data = this.mapDatas[index];
        this.bornAry = data.bornAry;
        this.cellList = data.cellList;
        this.mgModel = data.mgModel;
        this.groundModel = data.gm;
        this.upGroundModel = data.ugm;
        this.collectModel.updateCurSingleCollect(data.collect);
        GameModel.GridSize = data.size;
        // this.lastLineTodoSomething();
    };
    GameModel.prototype.notifyFallColumnOver = function (pos) {
        var dirs = [cc.v2(-1, 0), cc.v2(1, 0)];
        for (var i = dirs.length; i--;) {
            var dir = dirs[i];
            var cell = Common_1.default.safeGet2ArrayValue(this.cellList, pos.add(dir));
            if (cell) {
                cell.onMsg(CellBase_1.MsgType.Fall);
            }
        }
    };
    GameModel.prototype.isCanMergeBomb = function (type, cell) {
        var result = true;
        if (this.lvData.mergeLimit) {
            result = this.lvData.mergeLimit[type + ''];
        }
        if (cell && this.isHavaSpe(cell.pos)) {
            result = false;
        }
        return result;
    };
    GameModel.prototype.initCell = function (mapData, index) {
        this.cellList = [];
        var map = mapData.map;
        var yLength = map.length;
        var xLength = map[0].length;
        var gm = new GroundModel_1.GroundModel();
        var ugm = new UpGroundModel_1.UpGroundModel();
        var bornAry = [];
        var cellList = [];
        var mgModel = new MultipleGridColModel_1.default(this.lvData, index);
        var size = { H: mapData.map.length, W: mapData.map[0].length };
        for (var y = 0; y < yLength; y++) {
            var xCells = [];
            for (var x = 0; x < xLength; x++) {
                var data = mapData.map[y][x];
                //初始化底部地图数据kkkk
                var gCell = gm.initGroupCell(data, x, y, index);
                //初始化上层特殊元素
                var ugCell = ugm.initUpGroupCell(data, x, y, index);
                //初始化元素cell
                if (data && gCell.isCanCreateCell) {
                    var cell = this.createCell({ cfg: data, pos: cc.v2(x, y), createType: CreateType.Initial, index: index, isInit: true });
                    cell && cell.initBindGround(gCell, ugCell);
                    xCells.push(cell);
                }
                else {
                    xCells.push(null);
                }
                if (gCell.isBorn) {
                    bornAry.push(gCell.pos);
                }
            }
            cellList.push(xCells);
        }
        this.mapDatas[index] = { gm: gm, ugm: ugm, mgModel: mgModel, bornAry: bornAry, cellList: cellList, size: size, collect: mapData.collect };
        this.checkInitSameCell(index);
        mgModel.sync2View(gm.getGroupCellList());
    };
    GameModel.prototype.initChipSet = function () {
        this.chipSetList = [];
        this.initNoCreateList = new Map();
        var chips = this.lvData.chipset;
        if (!chips) {
            chips = [{ "type": 0, "percent": 75 }, { "type": 2, "percent": 100 }, { "type": 3, "percent": 75 }, { "type": 5, "percent": 100 }];
        }
        for (var i = 0; i < chips.length; i++) {
            var item = chips[i];
            var n = item.percent / 5;
            var type = item.type;
            if (item.isNoInitCreate) {
                this.initNoCreateList.set(type, true);
            }
            for (var j = 0; j < n; j++) {
                this.chipSetList.push(type);
            }
        }
    };
    /**
     *
     * @param data
     */
    GameModel.prototype.createCell = function (data) {
        // data: Grid, pos: cc.Vec2, createType: CreateType = CreateType.Initial, index: number = null, isInit: boolean = false, isInsert2Ary: boolean = null) {
        var isInsert2Ary = data.isInsert2Ary == undefined ? null : data.isInsert2Ary;
        var index = data.index || null;
        var createType = data.createType || CreateType.Initial;
        var isInit = data.isInit || false;
        var cfg = data.cfg || {};
        var cell = new CellModel_1.CellModel(); //this._dataPool.getData();
        if (cell == Common_1.default.safeGet2ArrayValue(this.cellList, cell.pos)) {
            Common_1.default.safeSet2ArrayValue(this.cellList, cell.pos, null);
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
        if (this.isCollect(cell.getType()))
            cell.isCollect = true;
        if (createType) {
            cell.changeBindGround(cell.pos);
            this.task.pushAddNewTask(cell, createType);
        }
        return cell;
    };
    GameModel.prototype.freeCell = function (cell) {
        // this._dataPool.freeData(cell);
        // Common.safeSet2ArrayValue(this.cellList, cell.pos, null); 
    };
    GameModel.prototype.addStep = function (count) {
        this.stepLimit += count;
    };
    /** 触发器-执行函数 */
    GameModel.prototype.timerTrigger = function () {
        this.timerTriggerCount++;
        this.isFalling = this.checkHaveFalling();
        this.lock && this.lock.update();
        if (!this.prompting && this.timerTriggerCount % TimeConfig_1.GapTime.PromptElimate == 0) {
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
            if (this._isOpenConvyer && this.getPlug(Conveyer_1.default)) {
                this._isOpenConvyer = false;
                this.getPlug(Conveyer_1.default).onTrigger();
            }
            //检测数步用尽
            if (this.stepLimit <= 0 && RuntimeMgr_1.default.ins.GameState == Constant_1.GameState.Normal) {
                M_1.default.event.send(Event_1.Event.GameCMD.GameOver, false);
            }
        }
    };
    /**
     * 执行消除~
     * @param centerModel
     * @param closeAry
     * @param eType
     * @param extInfo
     * @param keepTime
     * @param groupId
     */
    GameModel.prototype.execElimate = function (centerModel, closeAry, eType, extInfo, keepTime, groupId) {
        var _this = this;
        if (keepTime === void 0) { keepTime = null; }
        if (groupId === void 0) { groupId = null; }
        //停止提示功能!
        this.stopPrompt();
        //记录个数
        var size = 0;
        //纠正消除类型!
        eType = eType || Constant_1.ElimateType.Default;
        //剔除不能消除的元素(有障碍物或者其他不能消除的情况!)
        this.isFalling = true;
        groupId = groupId || this.seq.next();
        // if (!this.testmap.has(groupId)) {
        //     this.testmap.add(groupId);
        // }
        if (closeAry) {
            size = closeAry.size;
            closeAry.forEach(function (itemModel) {
                if (itemModel) {
                    if (!itemModel.isCanElimate()) {
                        //通知这个地方有消除操作,好执行木箱等障碍物的消除操作!!
                        // itemModel.onMsg(MsgType.Elimate, { id: groupId, targetModel: centerModel, size, type: eType });
                        //如果这个位置不是中心点 !!
                        // if (!itemModel.pos.equals(centerModel.pos)) {
                        //     closeAry.delete(itemModel);
                        // }
                    }
                    else if (!itemModel.doTestDeath() || _this._newCreatePool.has(itemModel)) {
                        //这里就已经把消除的元素death属性全部开启!
                        closeAry.delete(itemModel);
                    }
                }
            });
            //正式通知销毁的元素
            closeAry.forEach(function (itemModel) {
                if (itemModel && itemModel.isDeath) {
                    _this.deathDict.add(itemModel);
                    itemModel.onMsg(CellBase_1.MsgType.Elimate, { id: groupId, targetModel: centerModel, size: size, type: eType });
                }
            });
        }
        centerModel.GroupId = groupId;
        //锁定合成炸弹的点,避免被上方落下元素占用!
        centerModel.lockCreateBombPos(size, eType);
        //飞机消除的特殊处理.(寻找飞机落脚点!)
        if (centerModel.getType() == Constant_1.CellType.Bomb4 || (size == 0 && centerModel.isRocket)) {
            extInfo = { pos: this.findPlaneEndPos(extInfo), type: extInfo };
        }
        this.task.pushElimateTask(centerModel, closeAry, size, eType, extInfo, keepTime);
        EnergyModel_1.EnergyModel.ins.updataEnergy(eType, centerModel.getType());
        // if (M.runtime.GameState == GameState.End) {
        //     M.event.send(Event.GameCMD.MainCMD, taskPackage);
        // }
    };
    /**
     * 检测一个元素是否允许斜着掉落!
     * @param target    目的地的元素或者坐标
     * @param fallCell  需要下落的元素
     */
    GameModel.prototype.isCanDiagonallyFall = function (target, fallCell) {
        var result = true;
        var isHaveBorn = false;
        //上方是否有活动中的普通元素
        if (target instanceof CellModel_1.CellModel) {
            target = target.pos;
        }
        /**检测下落位置是否有可用的传送阵 */
        var isport = this.isHavaPortalOut(target);
        /**检测下落位置是否被出生点占用 */
        var isCreateBron = this.lock.isBornPosLocked(target);
        //检测下落点是否有墙.
        var ud = GameModel.ins.checkHavaWall(target, target.add(cc.v2(0, -1)));
        //检测下方与下落点是否有左右格档
        var lr = GameModel.ins.checkHavaWall(fallCell.pos.add(cc.v2(0, 1)), target);
        //下方有左右格档墙
        if (lr || isport || isCreateBron)
            return false;
        // 这里有个疑问 ? 1 如果出生点在下落点下方. 0 斜落检测会把自己也计算上.导致检测到自己是普通元素而不进入下落
        for (var i = 1; i <= target.y; i++) {
            var tmpPos = target.add(cc.v2(0, -i));
            var gCell = Common_1.default.safeGet2ArrayValue(this.GroundList, tmpPos);
            if (this._isActive(tmpPos)) { //|| this.isBorder(tmpPos)
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
        if (!result)
            result = ud && !lr;
        return result;
    };
    /**
     * 判断一个元素是否是正常的,活动的! 上方没有任何附加道具!
     * @param pos
     */
    GameModel.prototype._isActive = function (pos) {
        var result = true;
        var cell = Common_1.default.safeGet2ArrayValue(this.CellList, pos);
        if (!cell || (cell && (cell.isDeath || cell.isEmpty || cell.isDestoryed) || this._isBarrierCell(pos))) {
            result = false;
        }
        return result;
    };
    /**
     * 判断一个位置是否是障碍(有水,木箱等不可移动物品!)
     * @param pos
     */
    GameModel.prototype._isBarrierCell = function (pos) {
        var result = false;
        var upCell = Common_1.default.safeGet2ArrayValue(this.CellList, pos);
        var upGm = Common_1.default.safeGet2ArrayValue(this.GroundList, pos);
        var upUgm = Common_1.default.safeGet2ArrayValue(this.UpGroundList, pos);
        if ((upGm && upGm.isHold && !upGm.isPassable) || //有下层障碍物(水池...)
            (upUgm && upUgm.isObs) || //有上层障碍物(木箱...)
            (upCell && !upCell.isNotFixed())) { //有不可移动的元素(美人鱼,贝壳....)
            //有障碍!
            result = true;
        }
        return result;
    };
    /**
     * 检测是否可以下落,返回下落的方向!
     * @param checkCell
     * @param curCell
     * @param curPos 备用参数,当当前元素为空时,使用此变量做向量运算
     * @return down dir or null
     */
    GameModel.prototype._testCanFall = function (checkCell, curCell, curPos) {
        //判断要检测的是否 阵亡,空,障碍物,是否是刚创建出来的炸弹!
        //判断自身是否是 空 死亡/下落 状态,下个点是否被锁定! , 上层是否有障碍物
        var result = null;
        if ((!checkCell.isEmpty && !checkCell.isDeath && checkCell.isNotFixed() && this.upCellIsCanMove(checkCell.pos) &&
            (!curCell || (curCell && (curCell.isDeath || curCell.isFall || curCell.isEmpty)) &&
                this.lock.isMyLocked(curPos, checkCell.pos)))) {
            //如果为斜着下落,检测是否可以斜着落! 
            if ((checkCell.isBomb && !checkCell.isBombReady) || (this.checkHavaWall(checkCell.pos, curPos))) {
                result = null;
            }
            else {
                var dir = curPos.sub(checkCell.pos);
                if (dir.x != 0 && dir.y != 0) {
                    if (this.isCanDiagonallyFall(curPos, checkCell)) {
                        result = dir;
                    }
                }
                else {
                    result = dir;
                }
            }
        }
        return result;
    };
    GameModel.prototype._isHaveBron = function (pos, dir) {
        if (dir === void 0) { dir = null; }
        dir = dir || cc.v2(0, 0);
        var target = pos.add(dir);
        if (target.y < 0) {
            return false;
        }
        else {
            if (this._isBorn(target)) {
                return true;
            }
            else {
                return this._isHaveBron(target, cc.v2(0, -1));
            }
        }
    };
    GameModel.prototype.testFindCanFallCell = function (closeAry, group) {
        var _this = this;
        var nextDeps = new Set();
        if (closeAry instanceof cc.Vec2) {
            this._findFallCell(closeAry, nextDeps, group);
        }
        else {
            closeAry.forEach(function (itemCell) {
                _this._findFallCell(itemCell, nextDeps, group);
            });
        }
        if (nextDeps.size > 0) {
            this.testFindCanFallCell(nextDeps, group);
        }
    };
    /**检测这个位置是否有传送阵出口,并且传送阵入口是正常随时可以传过来! */
    GameModel.prototype.isHavaPortalOut = function (pos) {
        var gm = Common_1.default.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
        var result = false;
        if (gm && gm.isPortalOut()) {
            var portalPos = GameModel.ins.getUpGroundModel().getPortalPos(gm.portalIdx);
            var cell = Common_1.default.safeGet2ArrayValue(GameModel.ins.CellList, portalPos.in);
            //检测入口是否是正常可传送的
            result = (cell && this.isCanFall(pos, cell.pos, false) && cell.isNotFixed());
        }
        return result;
    };
    GameModel.prototype._findFallCell = function (basePos, nextDeps, grounpId) {
        if (nextDeps === void 0) { nextDeps = null; }
        var groundCell = Common_1.default.safeGet2ArrayValue(this.GroundList, basePos);
        //如果此时是边界..不延生检测
        if (basePos && (groundCell && !groundCell.isHold)) {
            var _threeDir = [cc.v2(0, -1), cc.v2(-1, -1), cc.v2(1, -1)];
            if (basePos.x > GameModel.GridSize.W / 2) {
                _threeDir = [cc.v2(0, -1), cc.v2(1, -1), cc.v2(-1, -1)];
            }
            for (var i = 0; i < _threeDir.length; i++) {
                var dir = _threeDir[i];
                var isUp = dir.equals(cc.v2(0, -1));
                var checkPos = basePos.add(dir);
                var baseItem = Common_1.default.safeGet2ArrayValue(this.cellList, basePos);
                var checkModel = Common_1.default.safeGet2ArrayValue(this.cellList, checkPos);
                // const checkGround = Common.safeGet2ArrayValue(this.GroundList, checkPos);
                //如果不是正常元素(刚生成没在进去网格的元素),不检测
                // if (checkGround && !checkGround.isHold) {
                //查询相对当前节点,上一个元素是否可以移动!!!!????
                if (checkModel) {
                    var downDir = this._testCanFall(checkModel, baseItem, basePos);
                    if (downDir) {
                        if (!this.fallDict.has(checkModel)) {
                            this.addFallCell(checkModel, downDir, grounpId);
                            nextDeps && nextDeps.add(checkModel.pos);
                        }
                        else if (isUp) {
                            checkModel.resetFallDir();
                        }
                        break;
                    }
                }
                else if (isUp && !this.isBorder(checkPos)) {
                    //检测这个空位是否有斜落的
                    nextDeps && nextDeps.add(checkPos);
                }
            }
        }
    };
    /**
     * 新增一个需要掉落的元素
     * @param cell 掉落的元素
     * @param downDir 掉落的方向
     */
    GameModel.prototype.addFallCell = function (cell, downDir, groupId) {
        if (!cell.isEmpty && !cell.isDeath) {
            if (!groupId)
                groupId = this.seq.next();
            this.fallDict.add(cell);
            this._insert2FallGroup(groupId, cell);
            cell.startFall(downDir);
            this.openAutoCheckOpt();
        }
    };
    GameModel.prototype.completFall = function (groupId, testCell) {
        var _this = this;
        var groupData = this.destoryMap.get(groupId);
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
                var elimateAry_1 = [];
                groupData.ary.forEach(function (cell) {
                    if (cell && !cell.isEmpty && !cell.isDestoryed) {
                        var tmpAry = _this.checkHavaElimate(cell.pos, false);
                        if (tmpAry) {
                            tmpAry['pos'] = cell.pos;
                            if (elimateAry_1.length <= 0 || _this.hasSameCellInElimteAry(elimateAry_1, tmpAry)) {
                                elimateAry_1.push(tmpAry);
                            }
                        }
                    }
                });
                elimateAry_1.forEach(function (v) {
                    _this.execElimate(Common_1.default.safeGet2ArrayValue(_this.cellList, v.pos), v.closeAry, null, v.bombType);
                });
                this.destoryMap.delete(groupId);
            }
        }
    };
    /**检测新 */
    GameModel.prototype.hasSameCellInElimteAry = function (elimateAry, ary2) {
        var result = true;
        if (elimateAry && ary2) {
            var arr = Array.from(ary2.closeAry);
            for (var o = elimateAry.length; o--;) {
                var inElimateCloseAry = elimateAry[o].closeAry;
                for (var i = arr.length; i--;) {
                    if (inElimateCloseAry.has(arr[i])) {
                        //这里是否包含此项消除! 
                        //判断当前个数与队列中的个数
                        if (inElimateCloseAry.size < ary2.closeAry.size) {
                            elimateAry[o] = ary2;
                        }
                        result = false;
                        o = 0;
                        break;
                    }
                }
            }
        }
        return result;
    };
    GameModel.prototype._deleteCellFromGroup = function (cell) {
        if (cell && cell.GroupId) {
            var mapdata = this.destoryMap.get(cell.GroupId);
            if (mapdata && mapdata.ary.has(cell)) {
                mapdata.ary.delete(cell);
                this.completFall(cell.GroupId, cell);
            }
        }
    };
    GameModel.prototype._insert2FallGroup = function (groupId, cell) {
        //这里有可能 一个元素同时加入2个容器........要去重!
        if (groupId && cell && !cell.isDeath) {
            //感染下落目标
            cell.GroupId = groupId;
            var groupData = this.destoryMap.get(groupId) || { count: 0, ary: new Set() };
            if (!groupData.ary.has(cell)) {
                groupData.count++;
                groupData.ary.add(cell);
                this.destoryMap.set(groupId, groupData);
            }
        }
    };
    /**打开一次自动检测开关 */
    GameModel.prototype.openAutoCheckOpt = function () {
        this._isOpenAutoCheck = true;
    };
    GameModel.prototype.removeFallDict = function (cell) {
        this.fallDict.delete(cell);
    };
    Object.defineProperty(GameModel.prototype, "PortalDict", {
        get: function () {
            return this.portalDict;
        },
        enumerable: false,
        configurable: true
    });
    GameModel.prototype.removeDeathDict = function (cell) {
        this._deleteCellFromGroup(cell);
        this.cellDict.delete(cell);
        this.deathDict.delete(cell);
    };
    GameModel.prototype.checkGameOver = function () {
        return new Promise(function (resolve) {
            M_1.default.event.send(Event_1.Event.Model.CheckGameOver, function () {
                resolve();
            });
        });
    };
    /**
     * 强制销毁一个格上所有东西!
     * @param pos 位置坐标
     * @param eType 被什么玩意销毁的
     * @param attackType 销毁者的类型
     */
    GameModel.prototype.execElimateOneAtAll = function (pos, eType, attackType) {
        var _this = this;
        this._cellAllCount = 1;
        this.stopPrompt();
        var upcell = Common_1.default.safeGet2ArrayValue(this.UpGroundList, pos);
        if (upcell) {
            this._cellAllCount += upcell.execElimateAll();
        }
        var groundCell = Common_1.default.safeGet2ArrayValue(this.GroundList, pos);
        groundCell && groundCell.execElimateAll();
        var destoryId = this.seq.next();
        Common_1.default.execDelayTask(function () {
            _this.testFindCanFallCell(pos, destoryId);
        }, 0.3);
        this.execElimateOne(pos, eType, false, destoryId);
        return this._cellAllCount;
    };
    GameModel.prototype.execElimateOne = function (pos, type, isForced, destoryId) {
        if (type === void 0) { type = Constant_1.ElimateType.Default; }
        if (isForced === void 0) { isForced = false; }
        if (destoryId === void 0) { destoryId = null; }
        var cell = Common_1.default.safeGet2ArrayValue(this.cellList, pos);
        if (cell && (cell.isEmpty || !cell.isDeath)) {
            if (cell.isCanElimate()) {
                cell.doTestDeath();
                destoryId = destoryId || this.seq.next();
                if (cell.isBomb && type != Constant_1.ElimateType.Girl) {
                    cell.onMsg(CellBase_1.MsgType.Bomb);
                }
                else if (cell.isDeath || isForced) {
                    // this._isAutoChecked = false;
                    cell.onMsg(CellBase_1.MsgType.Elimate, { id: destoryId, type: type, isForced: isForced });
                    this.task.pushElimateTask(cell, null, 0, type, null, null);
                }
            }
            else {
                cell.onMsg(CellBase_1.MsgType.Elimate, { type: type, isForced: isForced });
            }
        }
    };
    /**更新收集物数量 */
    GameModel.prototype.updateCollectCount = function (type, index, elimateType, num) {
        if (num === void 0) { num = 1; }
        this.collectModel.updateCollectCount(type + '', num, index, elimateType);
        this.upGroundModel.updateCollectCount(type, index);
    };
    GameModel.prototype.stopOverFall = function () {
        M_1.default.runtime.GameState = Constant_1.GameState.preReady;
    };
    GameModel.prototype.startOverFall = function () {
        var _this = this;
        this.stopPrompt();
        var id = this.seq.next();
        this.CellDict.forEach(function (cell) {
            _this.addFallCell(cell, cc.v2(0, 1), id);
        });
    };
    // public onOverMove(pos: cc.Vec2) {
    // console.error(Common.convetPos(pos)); 
    // this.execElimateOne(Common.convetPos(pos));
    // }
    GameModel.prototype._overFindFallCell = function (position) {
        var result = null;
        for (var i = this.cellList.length; i--;) {
            var row = this.cellList[i];
            for (var j = row.length; j--;) {
                var cell = row[j];
                if (cell && cell.extData) {
                    var box = cell.extData.getBoundingBoxToWorld();
                    if (box.contains(position)) {
                        result = cell;
                        i = 0;
                        break;
                    }
                }
            }
        }
        return result;
    };
    GameModel.prototype.onClick = function (position, isChuizi) {
        if (RuntimeMgr_1.default.ins.GameState == Constant_1.GameState.End) {
            //结束了....点消
            console.error('点消点击~');
            var touchCell = this._overFindFallCell(position);
            // const touchCell = Common.safeGet2ArrayValue(this.cellList, Common.convetPos(position));
            if (touchCell) {
                var result = this._endCheckPoint([touchCell]);
                console.error(result);
                if (result) {
                    var bombType = this.getClickPointBombType(result.length);
                    this.execElimate(touchCell, new Set(result), null, bombType);
                }
            }
        }
        else {
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
    };
    GameModel.prototype.onDoubleClick = function (pos) {
        var cm = Common_1.default.safeGet2ArrayValue(this.cellList, pos);
        if (cm && cm.isBomb && cm.isBombReady && !cm.isFalling() && !this.isHavaSpe(pos)) {
            cm.onMsg(CellBase_1.MsgType.Bomb);
            this.updateStepCount();
        }
    };
    GameModel.prototype.execResetGridMove = function (cpos, dir) {
        //先交换两个位置!
        var epos = cpos.add(dir);
        if (epos.x < 0 || epos.y < 0) {
            return;
        }
        var cModel = Common_1.default.safeGet2ArrayValue(this.cellList, cpos);
        var eModel = Common_1.default.safeGet2ArrayValue(this.cellList, epos);
        if (cModel && eModel && !cModel.isEmpty && !eModel.isEmpty && !cModel.isGround && !eModel.isGround &&
            this.isCanExchange(cpos, epos) &&
            cModel.getType() != eModel.getType() &&
            !this.lock.isAutoExchangeLocked(epos) &&
            !this.lock.isAutoExchangeLocked(cpos)) {
            //检测交换数据后是否有可消除
            var result = [this.checkPoint(epos, cModel), this.checkPoint(cpos, eModel)];
            if (!result[0] && !result[1]) {
                //没有,则进行界面动画 
                eModel.pos = cpos;
                cModel.pos = epos;
                this.task.pushExchangeTask(eModel, cpos, cModel, epos);
                this.lock.addAutoExchange(epos);
                this.lock.addAutoExchange(cpos);
            }
        }
    };
    /**
     *  移动元素位置
     * @param pos 交换1位置
     * @param direction 方向!
     * @param isAutoCheck 是否是系统自动检测没有可移动元素时自动拉起更换元素!
     */
    GameModel.prototype.touchMove = function (pos, direction) {
        var _this = this;
        var epos = pos.add(direction);
        if (epos.x < 0 || epos.y < 0) {
            return;
        }
        var moveState = this.exchange(pos, epos);
        if (moveState == 0 || moveState == 3)
            return;
        /** 检测消除 */
        var result = [this.checkPoint(epos), this.checkPoint(pos)];
        var ps = [epos, pos];
        if (!result[0] && !result[1]) {
            //两边都是普通元素才换
            if (moveState == 1) {
                this.exchange(pos, epos);
            }
            else {
                ps.forEach(function (p) {
                    Common_1.default.safeGet2ArrayValue(_this.cellList, p).checkIsExit(p);
                });
                this.updateStepCount();
            }
        }
        else {
            result.forEach(function (r, index) {
                var cm = Common_1.default.safeGet2ArrayValue(_this.cellList, ps[index]);
                if (r) {
                    _this.execElimate(cm, r.closeAry, null, r.bombType);
                }
                else {
                    cm.checkIsExit(cm.pos);
                }
            });
            this.updateStepCount();
        }
    };
    /**检测指定的一个位置是否有可以匹配消除的元素.并且执行消除操作! */
    GameModel.prototype.checkHavaElimate = function (pos, exec) {
        if (exec === void 0) { exec = true; }
        if (M_1.default.runtime.GameState == Constant_1.GameState.Normal || M_1.default.runtime.GameState == Constant_1.GameState.Pause) {
            var ary = this.checkPoint(pos);
            if (ary && exec) {
                this.execElimate(Common_1.default.safeGet2ArrayValue(this.cellList, pos), ary.closeAry, null, ary.bombType);
            }
            return ary;
        }
        return null;
    };
    /**检测场面上的元素是否全部死亡 */
    GameModel.prototype.checkIsAllDeath = function () {
        var isAllDeath = true;
        for (var i = this.CellList.length; i--;) {
            for (var j = this.CellList[i].length; j--;) {
                var cell = this.CellList[i][j];
                if (cell && !cell.isDeath) {
                    i = 0;
                    isAllDeath = false;
                    break;
                }
            }
        }
        return isAllDeath;
    };
    GameModel.prototype.updateStepCount = function () {
        this.stepLimit--;
        this._isOpenConvyer = true;
        if (this.stepLimit <= 0) {
            this.stepLimit = 0;
        }
        M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel);
        M_1.default.event.send(Event_1.Event.UI.CloseTutorial);
    };
    GameModel.prototype.findPlaneEndPos = function (type) {
        if (type === void 0) { type = null; }
        //从收集的目标中优先找出当前屏幕的坐标!
        var targetPos = this.collectModel.findOneCollectPos(!!type);
        return targetPos;
    };
    /**没有可消除的元素时,重置棋盘 */
    GameModel.prototype.resetGrid = function (isForced) {
        var _this = this;
        if (isForced === void 0) { isForced = false; }
        this.stopPrompt();
        var ary = new Set();
        var markExit = false;
        for (var i = this.CellList.length; i--;) {
            var row = this.CellList[i];
            for (var j = row.length; j--;) {
                var cell = row[j];
                if (cell && !cell.isDeath) {
                    if (!isForced && cell.isBomb && !this.isHavaSpe(cell.pos)) {
                        i = 0;
                        j = 0;
                        markExit = true;
                        break;
                    }
                    if (!cell.isEmpty && cell.isNotFixed && !cell.isBomb && !this.isHavaObs(cell.pos) && !this.isHavaSpe(cell.pos)) {
                        ary.add(cell);
                    }
                }
            }
        }
        if (markExit)
            return;
        var dir = [cc.v2(-1, 0), cc.v2(0, 1)];
        console.error('没有可消除的! 重置!');
        //开始交换位置,并且不能有消除!!
        if (ary.size > 0) {
            M_1.default.tips.show(Constant_1.WaringTips.NoElimate);
            ary.forEach(function (cell) {
                _this.execResetGridMove(cell.pos, dir[Util_1.Util.Tool.rangeInt(0, dir.length, false)]);
            });
            this.lock.deleteAutoExchangeAll();
            Common_1.default.execDelayTask(function () { _this._isOpenAutoCheck = true; }, 1);
        }
    };
    /**
     * 检测是否需要重置!
     */
    GameModel.prototype.checkIsNeedResetGrid = function () {
        // let result = true;
        // //不用考虑所有道具原因,开始查找是否有可以一起消除的!
        // if (this.checkSameCell()) {
        //     result = false;
        // } 
        var result = !this.checkSameCell(true);
        if (result) {
            this.resetGrid();
        }
        return;
    };
    /**检测可消除片段 */
    GameModel.prototype.checkSameCell = function (isCheckNoting) {
        if (isCheckNoting === void 0) { isCheckNoting = false; }
        var result = false;
        for (var y = this.cellList.length; y--;) {
            var xList = this.cellList[y];
            for (var x = xList.length; x--;) {
                var pos = cc.v2(x, y);
                var cellItem = xList[x];
                if (cellItem) {
                    if (this.isHavaObs(pos) || this.isHavaSpe(pos)) {
                        continue;
                    }
                    for (var k = Common_1.default.Dir4.length; k--;) {
                        var checkPos = cellItem.pos.add(Common_1.default.Dir4[k]);
                        if (this.checkHavaWall(cellItem.pos, checkPos) ||
                            this.isHavaObs(checkPos) || this.isHavaSpe(checkPos) ||
                            cellItem.isInvincible || cellItem.isGround) {
                            continue;
                        }
                        var res = this.checkPoint(checkPos, cellItem);
                        if (res && res.closeAry.size >= this.minExecNum) {
                            if (this.prompting && !isCheckNoting) {
                                this.promptCanElimate(cellItem, res.closeAry, checkPos);
                            }
                            result = true;
                            x = 0;
                            y = 0;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    };
    GameModel.prototype.stopPrompt = function () {
        this.timerTriggerCount = 0;
        if (this.prompting) {
            this.prompting = false;
            if (this.currentPromptTask) {
                EventMgr_1.default.ins.send(Event_1.Event.GameCMD.StopPrompts, this.currentPromptTask);
                this.currentPromptTask = null;
            }
        }
    };
    GameModel.prototype.promptCanElimate = function (singleModel, closeAry, ckPos) {
        if (this.currentPromptTask) {
            EventMgr_1.default.ins.send(Event_1.Event.GameCMD.StopPrompts, this.currentPromptTask);
            this.currentPromptTask = null;
        }
        closeAry.forEach(function (cm) {
            if (Util_1.Util.Tool.compareV2(cm.pos, ckPos)) {
                closeAry.delete(cm);
            }
        });
        this.currentPromptTask = this.task.pushTisTask(singleModel, closeAry, ckPos);
    };
    /**初始化检测相同元素 */
    GameModel.prototype.checkInitSameCell = function (mapIndex) {
        var list = this.mapDatas[mapIndex].cellList;
        for (var y = list.length; y--;) {
            var xList = list[y];
            for (var x = xList.length; x--;) {
                var cellItem = xList[x];
                if (cellItem && cellItem.isRandom && this.checkPoint(cellItem.pos, null, mapIndex)) {
                    cellItem.setRandomType(true, mapIndex);
                }
            }
        }
    };
    GameModel.prototype.isCollect = function (type) {
        return this.getCollect().get(type + '') != undefined;
    };
    GameModel.prototype.isCanExchange = function (pos1, pos2, isCheckWall) {
        if (isCheckWall === void 0) { isCheckWall = true; }
        var result = true;
        var tmpAry = [pos1, pos2];
        for (var i = tmpAry.length; i--;) {
            var pos = tmpAry[i];
            if (this.isHavaSpe(pos) || this.isHavaObs(pos) || this.isHold(pos)) {
                result = false;
                break;
            }
        }
        if (isCheckWall && result) {
            result = !this.checkHavaWall(pos1, pos2);
        }
        return result;
    };
    /**
     * 检测是否有墙.............
     * @param pos1
     * @param pos2
     */
    GameModel.prototype.checkHavaWall = function (pos1, pos2) {
        var result = false;
        var g1 = Common_1.default.safeGet2ArrayValue(this.GroundList, pos1);
        var g2 = Common_1.default.safeGet2ArrayValue(this.GroundList, pos2);
        if (g1 && g2) {
            //在同一个列,检测上下
            if (pos1.x == pos2.x) {
                if (pos1.y > pos2.y) {
                    //检测1是否有上面的,检测2是否有下面的
                    result = (g1.checkWall('top') || g2.checkWall('bottom'));
                }
                else {
                    //检测1是否有下面的,检测2是否有上面的
                    result = (g1.checkWall('bottom') || g2.checkWall('top'));
                }
            }
            else if (pos1.y == pos2.y) {
                //在同一个行,检测左右
                if (pos1.x > pos2.x) {
                    //检测1是否有左边的,检测2是否有右边的
                    result = (g1.checkWall('left') || g2.checkWall('right'));
                }
                else {
                    //检测1是否有右边的,检测2是否有左边的
                    result = (g1.checkWall('right') || g2.checkWall('left'));
                }
            }
        }
        return result;
    };
    /**没有正在执行交换 */
    GameModel.prototype.isNoMoving = function (m1, m2) {
        var result = false;
        if (m1 && m2) {
            if (m1.extCtrl && m2.extCtrl) {
                result = !m1.extCtrl.isRunMove && !m2.extCtrl.isRunMove;
            }
            if ((m1.isFall || m1.isDeath) || (m2.isFall || m2.isDeath)) {
                result = false;
            }
        }
        return result;
    };
    /**
     * 执行元素交换,并且返回交换状态
     * @param cpos
     * @param epos
     * @returns 0为没有交换 1为已经交换 2为已经交换,并且有一者为炸弹 3为两者都是炸弹
     */
    GameModel.prototype.exchange = function (cpos, epos, justChangePosData) {
        if (justChangePosData === void 0) { justChangePosData = false; }
        var cModel = Common_1.default.safeGet2ArrayValue(this.cellList, cpos);
        var eModel = Common_1.default.safeGet2ArrayValue(this.cellList, epos);
        var result = 1;
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
        }
        else {
            if (this.isNoMoving(cModel, eModel) && this.isCanExchange(cpos, epos)) {
                eModel.pos = cpos;
                cModel.pos = epos;
                //数据变换~
                this.task.pushExchangeTask(eModel, cpos, cModel, epos);
                if (eModel.isBomb || cModel.isBomb) {
                    result = 2;
                }
            }
            else {
                result = 0;
            }
        }
        return result;
    };
    GameModel.prototype.getUpGroundCell = function (pos, index) {
        if (index === void 0) { index = null; }
        var list = null;
        if (index != null) {
            list = this.mapDatas[index].ugm.getUGroupCellList();
        }
        else {
            list = this.UpGroundList;
        }
        return Common_1.default.safeGet2ArrayValue(list, pos);
    };
    GameModel.prototype.getGroundCell = function (pos, index) {
        if (index === void 0) { index = null; }
        var list = null;
        if (index != null) {
            list = this.mapDatas[index].gm.getGroupCellList();
        }
        else {
            list = this.GroundList;
        }
        return Common_1.default.safeGet2ArrayValue(list, pos);
    };
    /**
     * 随机拿一个元素!
     * @param isNotLimit 是否需要限制普通元素
     */
    GameModel.prototype.getRandomCell = function (isNotLimit) {
        if (isNotLimit === void 0) { isNotLimit = false; }
        var y = Util_1.Util.Tool.rangeInt(0, this.cellList.length, false);
        var x = Util_1.Util.Tool.rangeInt(0, this.cellList[y].length, false);
        var cs = Common_1.default.safeGet2ArrayValue(this.cellList, cc.v2(x, y));
        if ((cs && !cs.isEmpty) && (isNotLimit || (!cs.isBomb && !this.isHavaObs(cs.pos)))) {
            return cs;
        }
        else {
            return this.getRandomCell(isNotLimit);
        }
    };
    Object.defineProperty(GameModel.prototype, "CollectModel", {
        get: function () {
            return this.collectModel;
        },
        enumerable: false,
        configurable: true
    });
    GameModel.prototype.getCollect = function () {
        return this.collectModel.mainCollect;
    };
    GameModel.prototype.checkIsNoInitCreate = function (type) {
        return this.initNoCreateList.get(type);
    };
    GameModel.prototype.getRandomCellType = function () {
        var type = Constant_1.CellType.Empty;
        if (this.chipSetList) {
            type = this.chipSetList[Util_1.Util.Tool.rangeInt(0, this.chipSetList.length - 1)];
        }
        return type;
    };
    Object.defineProperty(GameModel.prototype, "GroundList", {
        get: function () {
            return this.groundModel.getGroupCellList();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameModel.prototype, "CellList", {
        get: function () {
            return this.cellList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameModel.prototype, "Lock", {
        get: function () {
            return this.lock;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameModel.prototype, "UpGroundList", {
        get: function () {
            return this.upGroundModel.getUGroupCellList();
        },
        enumerable: false,
        configurable: true
    });
    GameModel.prototype.getUpGroundModel = function () {
        return this.upGroundModel;
    };
    GameModel.prototype.getTopPosition = function (mapIndex) {
        return Common_1.default.getPos(0, 0, mapIndex);
    };
    /**获取占用多个格子的收集物控制器 */
    GameModel.prototype.getMgModel = function () {
        return this.mgModel;
    };
    GameModel.prototype.getLvData = function () {
        return this.lvData;
    };
    GameModel.prototype.getGridSize = function () {
        return GameModel.GridSize;
    };
    GameModel.prototype.getMaps = function () {
        return this.mapDatas;
    };
    Object.defineProperty(GameModel.prototype, "mapIndex", {
        get: function () {
            return this._mapIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameModel.prototype, "mapCount", {
        get: function () {
            return this._mapCount;
        },
        enumerable: false,
        configurable: true
    });
    GameModel.prototype.setLongHeight = function (opt) {
        this.isLongHeight = opt;
    };
    GameModel.prototype.isLongMode = function () {
        return this.isLongHeight;
    };
    /**检测当前是否有正在掉落中的物品,请搭配定时器使用 */
    GameModel.prototype.checkHaveFalling = function () {
        var result = false;
        if (this.fallDict.size > 0) {
            result = true;
        }
        if (!result) {
            this.CellDict.forEach(function (cell) {
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
    };
    /**检测Y上方一个不是为null的元素 */
    GameModel.prototype.checkUpNotCellByPos = function (pos) {
        if (Util_1.Util.Tool.isNull(pos)) {
            return null;
        }
        var upPos = pos.add(cc.v2(0, -1));
        var upItem = Common_1.default.safeGet2ArrayValue(this.cellList, upPos);
        var result = null;
        if (!upItem && upPos.y > 0) {
            return this.checkUpNotCellByPos(upPos);
        }
        else if (upItem /*&& !this.isHavaSpe(upItem.pos)*/) {
            result = upItem;
        }
        return result;
    };
    /**
       * 检测是否有匹配的消除规则
       * @param pos 检测的点
       * @param ckModel 检测的类型(兼容手动指定类型)
       * @param mapIndex 检测的地图下标(兼容多地图模式)
       * @returns .....
       */
    GameModel.prototype.checkPoint = function (pos, ckModel, mapIndex) {
        if (ckModel === void 0) { ckModel = null; }
        if (mapIndex === void 0) { mapIndex = null; }
        var container = null;
        var bombType = null;
        var isSquare = false;
        var list = this.cellList;
        if (mapIndex != null) {
            list = this.mapDatas[mapIndex].cellList;
        }
        var curModel = Common_1.default.safeGet2ArrayValue(list, pos);
        if (curModel) {
            if (curModel.isInvincible || curModel.isEmpty || curModel.isGround) {
                return null;
            }
            if (!this.isHavaObs(pos, mapIndex) && !curModel.isBomb) {
                var row = new Set();
                var col = new Set();
                var type = ckModel ? ckModel.getType() : curModel.getType();
                this.checkWithDirection(pos, type, row, [cc.v2(1, 0), cc.v2(-1, 0)], ckModel, mapIndex);
                this.checkWithDirection(pos, type, col, [cc.v2(0, 1), cc.v2(0, -1)], ckModel, mapIndex);
                if (ckModel) {
                    if (row.size >= 2) {
                        row.add(curModel);
                    }
                    else if (col.size >= 2) {
                        col.add(curModel);
                    }
                }
                if (row.size == 0 && col.size == 0) {
                    return null;
                }
                bombType = this.getBombType(row, col);
                //判断是否是四方:是个折角并且斜对角是相同  飞机
                if (col.size >= 2 && row.size >= 2 && !bombType) {
                    var squareCell = Common_1.default.getSquareSingleCell(col, row, type, curModel.pos, list);
                    if (squareCell) {
                        row.add(squareCell);
                        bombType = Constant_1.CellType.Bomb4;
                        isSquare = true;
                    }
                }
                if (row.size >= this.minExecNum || isSquare) {
                    container = row;
                }
                else {
                    container = new Set();
                }
                if (col.size >= this.minExecNum || isSquare) {
                    col.forEach(function (model) { return container.add(model); });
                }
                if (container.size < this.minExecNum) {
                    container.clear();
                    container = null;
                }
            }
        }
        return container ? { closeAry: container, bombType: bombType } : null;
    };
    GameModel.prototype.isTypeMatching = function (type, nextCell) {
        var result = false;
        if (!nextCell.isJustBombElimate && type == nextCell.getType()) {
            result = true;
        }
        return result;
    };
    /**根据方向递归寻找可消除元素 */
    GameModel.prototype.checkWithDirection = function (pos, type, container, dir, ckModel, mapIndex) {
        if (ckModel === void 0) { ckModel = null; }
        if (mapIndex === void 0) { mapIndex = null; }
        var list = this.cellList;
        if (mapIndex != null) {
            list = this.mapDatas[mapIndex].cellList;
        }
        for (var i = dir.length; i--;) {
            var nextPos = cc.v2(pos.add(dir[i]));
            var nextModel = Common_1.default.safeGet2ArrayValue(list, nextPos);
            if (dir[i].y != 0) {
                var upItem = this.checkUpNotCellByPos(pos);
                if (upItem && (upItem.isFalling() && upItem.getType() == type)) {
                    // container.clear(); 
                    break;
                }
            }
            if (!nextModel || (nextModel && nextModel.isEmpty) || this.isHavaObs(nextPos, mapIndex)) {
                continue;
            }
            if (ckModel && (this.isHavaObs(nextPos, mapIndex) || Util_1.Util.Tool.compareV2(nextPos, ckModel.pos))) {
                continue;
            }
            if (!nextModel.isDeath && !nextModel.isFalling() && !nextModel.isPortaling && this.isTypeMatching(type, nextModel) && !container.has(nextModel)) {
                container.add(nextModel);
                this.checkWithDirection(nextModel.pos, type, container, dir, ckModel, mapIndex);
            }
        }
    };
    GameModel.prototype._endCheckPoint = function (cellAry) {
        var _this = this;
        var result = [];
        var _loop_1 = function (i) {
            var cell = cellAry[i];
            if (cell) {
                Common_1.default.Dir4.forEach(function (dir) {
                    var nextPos = cell.pos.add(dir);
                    var nextCell = Common_1.default.safeGet2ArrayValue(_this.cellList, nextPos);
                    //有可能会死循环~
                    if (nextCell && nextCell.getType() == cell.getType() && cellAry.indexOf(nextCell) == -1) {
                        result.push(nextCell);
                    }
                });
            }
        };
        for (var i = cellAry.length; i--;) {
            _loop_1(i);
        }
        return result.length > 0 ? this._endCheckPoint(cellAry.concat(result)) : cellAry;
    };
    Object.defineProperty(GameModel.prototype, "CellDict", {
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
        get: function () {
            return this.cellDict;
        },
        enumerable: false,
        configurable: true
    });
    /*******************************************************************跟元素功能相关  待抽出*/
    /**是否有特殊遮挡物 */
    GameModel.prototype.isHavaSpe = function (pos, index) {
        if (index === void 0) { index = null; }
        var upCell = this.getUpGroundCell(pos, index);
        return upCell ? upCell.isHavaSpe : false;
    };
    /**上层障碍物是否可以移动  */
    GameModel.prototype.upCellIsCanMove = function (pos) {
        var upCell = this.getUpGroundCell(pos);
        return (!upCell || upCell && upCell.isCanFall());
    };
    /**一块格是否有障碍物,  */
    GameModel.prototype.isHavaObs = function (pos, index) {
        if (index === void 0) { index = null; }
        var upCell = this.getUpGroundCell(pos, index);
        return upCell ? upCell.isObs : false;
    };
    /**是否是地面障碍(水面什么的) */
    GameModel.prototype.isHold = function (pos, index) {
        if (index === void 0) { index = null; }
        var groundCell = this.getGroundCell(pos, index);
        return groundCell ? groundCell.isHold : true;
    };
    /**检测这块地面是否是可穿透 */
    GameModel.prototype.getNotPassblePoss = function (nextPos) {
        var gc = Common_1.default.safeGet2ArrayValue(this.GroundList, nextPos);
        if (gc && gc.isPassable) {
            return this.getNotPassblePoss(nextPos.add(cc.v2(0, 1)));
        }
        return nextPos;
    };
    /**
     * 检测一个点是否是边界
     * @param pos
     */
    GameModel.prototype.isBorder = function (pos) {
        var result = false;
        // if (M.runtime.GameState == GameState.End) {
        //     return result;
        // }
        var gcell = Common_1.default.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
        if (gcell) {
            //如果是个障碍物,并且不让通过
            if (gcell.isHold || gcell.getType() == null) {
                result = true;
            }
            //如果下面那个是可以通过的
            if (gcell.isPassable) {
                result = false;
            }
        }
        else {
            result = true;
        }
        return result;
    };
    /**
    * 下一个目标点是否可以掉落!?
    * @param nextPos 目标点坐标!
    * @param isFalling 是否带速度检测!
    * @returns 是否可以 ?
    */
    GameModel.prototype.isCanFall = function (nextPos, selfPos, isFalling, isCreateBomb) {
        if (isFalling === void 0) { isFalling = true; }
        if (isCreateBomb === void 0) { isCreateBomb = false; }
        //是否已经上锁
        var isLocked = this.lock.isMyLocked(nextPos, selfPos);
        //是否可以直接通过,没有障碍物
        var isPassable = this.isPassable(nextPos, selfPos);
        //是否有效
        var isInvalid = this._isInvalidCell(nextPos, isFalling, isCreateBomb);
        return isLocked && isInvalid && isPassable;
    };
    /**
     * 指定位置元素是否已经无效
     * @param pos
     * @param isFalling
     */
    GameModel.prototype._isInvalidCell = function (pos, isFalling, isCreateBomb) {
        var result = false;
        var cell = Common_1.default.safeGet2ArrayValue(GameModel.ins.CellList, pos);
        if (!cell) {
            result = true;
        }
        else if (cell.isEmpty || cell.isRemoved() || (isFalling ? cell.isFalling() : cell.isFall) || (isCreateBomb && cell.isDeath)) {
            result = true;
        }
        return result;
    };
    /**
     * 位置上是否可以通行!
     * @param pos
     * @param selfpos 用于穿透降落时检测是否位置被上锁
     */
    GameModel.prototype.isPassable = function (nextPos, selfPos) {
        var result = true;
        // if (M.runtime.GameState == GameState.End) {
        //     return result;
        // }
        var gcell = Common_1.default.safeGet2ArrayValue(GameModel.ins.GroundList, nextPos);
        var ugcell = Common_1.default.safeGet2ArrayValue(GameModel.ins.UpGroundList, nextPos);
        //如果地面为空,则不能通行
        if (!gcell) {
            result = false;
        }
        //如果地面有障碍物,则不能通行
        if (gcell && selfPos) {
            if (gcell.isHold) {
                result = false;
            }
            else if (this.checkHavaWall(nextPos, selfPos)) {
                result = false;
            }
        }
        //如果有上层障碍物(木箱等),不能通行
        if (ugcell && ugcell.isObs) {
            result = false;
        }
        return result;
    };
    /**
     *
     * @param row 横
     * @param col 竖
     */
    GameModel.prototype.getBombType = function (row, col) {
        //彩虹
        if (row.size >= 5 || col.size >= 5) {
            return Constant_1.CellType.Bomb5;
        }
        //圆形
        if (row.size >= 3 && col.size >= 3) {
            return Constant_1.CellType.Bomb1;
        }
        //竖炸弹
        if (row.size >= 4) {
            return Constant_1.CellType.Bomb3;
        }
        //横炸弹
        if (col.size >= 4) {
            return Constant_1.CellType.Bomb2;
        }
        return null;
    };
    GameModel.prototype.getClickPointBombType = function (size) {
        var result = null;
        if (size >= 4 && size < 5) {
            result = Constant_1.CellType.Bomb2;
        }
        else if (size > 5 && size < 6) {
            result = Constant_1.CellType.Bomb1;
        }
        else if (size > 6) {
            result = Constant_1.CellType.Bomb5;
        }
        return result;
    };
    /*******************************************************************跟元素相关  待抽出*/
    /**检测是否有可以传送的玩意! */
    GameModel.prototype.checkPortal = function () {
        // const pMap = this.upGroundModel.getAllPortal();
        // pMap.forEach((value) => {
        //     const cell = Common.safeGet2ArrayValue(this.cellList, value.in);
        //     cell && cell.onMsg(MsgType.Portal);
        // })
    };
    /**是否可以创建出生点元素 */
    GameModel.prototype.isCanCreateBornCell = function (pos, model) {
        //是否有锁 
        if (this.lock.isBornPosLocked(pos) || this.lock.isFallLocked(pos) /*!this.lock.isMyLocked(pos, pos.add(cc.v2(0, -1))) */) {
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
    };
    GameModel.prototype.removeNewCreateCell = function (cell) {
        this._newCreatePool.delete(cell);
    };
    GameModel.prototype.checkNeedCreateNewCell = function (pos, groupId) {
        var bornModel = Common_1.default.safeGet2ArrayValue(this.cellList, pos);
        if (this.isCanCreateBornCell(pos, bornModel)) {
            this.lock.lockBornPos(pos);
            var cell = this.createCell({ cfg: null, pos: pos.add(cc.v2(0, -1)), createType: CreateType.Bron, isInsert2Ary: false });
            this.addFallCell(cell, cc.v2(0, 1), groupId);
            this._newCreatePool.add(cell);
        }
    };
    GameModel.prototype._isBorn = function (pos) {
        var ground = Common_1.default.safeGet2ArrayValue(this.GroundList, pos);
        return ground && ground.isBorn;
    };
    GameModel.prototype.cellUpdate = function (dt) {
        var _this = this;
        if (this.fallDict && this.fallDict.size > 0) {
            for (var i = this.cellList.length; i--;) {
                var coll = this.cellList[i];
                for (var j = 0; j < coll.length; j++) {
                    var cell = coll[j];
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
            this._newCreatePool.forEach(function (cell) {
                if (cell && !cell.isDestoryed) {
                    cell.updateFall(dt);
                }
                else {
                    _this._newCreatePool.delete(cell);
                }
            });
        }
    };
    GameModel.prototype.update = function (dt) {
        this.task.update(dt);
        if (RuntimeMgr_1.default.ins.GameState != Constant_1.GameState.Pause) {
            this.cellUpdate(dt);
        }
    };
    GameModel.GridSize = null;
    GameModel._ins = null;
    return GameModel;
}());
exports.default = GameModel;

cc._RF.pop();