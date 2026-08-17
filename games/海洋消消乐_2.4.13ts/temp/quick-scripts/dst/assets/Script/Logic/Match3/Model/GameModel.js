
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/GameModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcR2FtZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF3QztBQUN4Qyw4Q0FBeUM7QUFDekMsdUNBQXFDO0FBQ3JDLCtEQUEwRDtBQUMxRCw2Q0FBd0M7QUFDeEMseUNBQXdDO0FBQ3hDLDZDQUE0QztBQUM1QywrQ0FBOEM7QUFDOUMsZ0RBQStDO0FBQy9DLGlEQUFnRDtBQUNoRCxpREFBZ0Q7QUFHaEQsMkRBQXNEO0FBRXRELCtDQUE4QztBQUM5QyxvREFBK0M7QUFDL0Msc0RBQXlGO0FBQ3pGLDZDQUE0QztBQUM1QywwREFBc0Q7QUFDdEQsMkRBQXNEO0FBQ3RELGdEQUEyQztBQUMzQyxnREFBMkM7QUFDM0MsMkNBQXNDO0FBQ3RDLG1EQUE4QztBQWE5QyxJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDbEIsaURBQVcsQ0FBQTtJQUNYLDJDQUFJLENBQUE7SUFDSiwrQ0FBTSxDQUFBO0lBQ04seUNBQUcsQ0FBQTtBQUNQLENBQUMsRUFMVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUtyQjtBQUVEO0lBK0ZJLG1CQUFZLElBQVk7UUFwRnhCLFVBQVU7UUFDRixXQUFNLEdBQVcsSUFBSSxDQUFDO1FBQzlCLFFBQVE7UUFDRCxTQUFJLEdBQWEsSUFBSSxDQUFDO1FBQzdCLE9BQU87UUFDQyxTQUFJLEdBQWEsSUFBSSxDQUFDO1FBQzlCLFFBQVE7UUFDQSxjQUFTLEdBQWMsSUFBSSxDQUFDO1FBQ3BDLGNBQWM7UUFDTixnQkFBVyxHQUFnQixJQUFJLENBQUM7UUFDeEMsY0FBYztRQUNOLGtCQUFhLEdBQWtCLElBQUksQ0FBQztRQUM1QyxlQUFlO1FBQ1AsWUFBTyxHQUF5QixJQUFJLENBQUM7UUFDN0MsVUFBVTtRQUNGLGlCQUFZLEdBQWlCLElBQUksQ0FBQztRQUMxQyxVQUFVO1FBQ0YsYUFBUSxHQUFtQixJQUFJLENB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QyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNwQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN4QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3ZEO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUM1QixJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNILEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNwQztZQUNMLENBQUMsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0lBRU0sMEJBQU0sR0FBYixVQUFjLEVBQVU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsSUFBSSxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksb0JBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFoeERhLGtCQUFRLEdBQTZCLElBQUksQ0FBQztJQUV6QyxjQUFJLEdBQWMsSUFBSSxDQUFDO0lBZ3hEMUMsZ0JBQUM7Q0FweERELEFBb3hEQyxJQUFBO2tCQXB4RG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZWxsTW9kZWwgfSBmcm9tIFwiLi9DZWxsTW9kZWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSAnLi4vLi4vQ29tbW9uL0NvbW1vbic7XG5pbXBvcnQgeyBNc2dUeXBlIH0gZnJvbSBcIi4vQ2VsbEJhc2VcIjtcbmltcG9ydCBNdWx0aXBsZUdyaWRDb2xNb2RlbCBmcm9tIFwiLi9NdWx0aXBsZUdyaWRDb2xNb2RlbFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBQcm9wTW9kZWwgfSBmcm9tICcuL1Byb3BNb2RlbCc7XG5pbXBvcnQgeyBHcm91bmRNb2RlbCB9IGZyb20gXCIuL0dyb3VuZE1vZGVsXCI7XG5pbXBvcnQgeyBMb2cgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9Mb2dcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBVcEdyb3VuZE1vZGVsIH0gZnJvbSBcIi4vVXBHcm91bmRNb2RlbFwiO1xuaW1wb3J0IEdyb3VuZENlbGxNb2RlbCBmcm9tIFwiLi9Hcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCBVcEdyb3VuZENlbGxNb2RlbCBmcm9tIFwiLi9VcEdyb3VuZENlbGxNb2RlbFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IElMZXZlbCwgR3JpZCwgSU1hcERhdGEgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgeyBDb2xsZWN0TW9kZWwgfSBmcm9tIFwiLi9Db2xsZWN0TW9kZWxcIjtcbmltcG9ydCBSdW50aW1lTWdyIGZyb20gXCIuLi8uLi9EYXRhL1J1bnRpbWVNZ3JcIjtcbmltcG9ydCB7IEdhbWVTdGF0ZSwgQ2VsbFR5cGUsIEVsaW1hdGVUeXBlLCBXYXJpbmdUaXBzIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IEVuZXJneU1vZGVsIH0gZnJvbSBcIi4vRW5lcmd5TW9kZWxcIjtcbmltcG9ydCB7IEdhcFRpbWUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9UaW1lQ29uZmlnXCI7XG5pbXBvcnQgU2VxdWVuY2UgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTmV0d29yay9TZXF1ZW5jZVwiO1xuaW1wb3J0IFRhc2tDdHJsIGZyb20gXCIuLi9Db250cm9sL1Rhc2tDdHJsXCI7XG5pbXBvcnQgTG9ja0N0cmwgZnJvbSBcIi4uL0NvbnRyb2wvTG9ja0N0cmxcIjtcbmltcG9ydCBHaXJsIGZyb20gXCIuL1NwZWNpYWxQbHVnL0dpcmxcIjtcbmltcG9ydCBDb252ZXllciBmcm9tIFwiLi9TcGVjaWFsUGx1Zy9Db252ZXllclwiO1xuaW1wb3J0IHsgRGF0YVBvb2wgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9EYXRhUG9vbFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElHcmlkRGF0YSB7XG4gICAgZ206IEdyb3VuZE1vZGVsLFxuICAgIHVnbTogVXBHcm91bmRNb2RlbCxcbiAgICBtZ01vZGVsOiBNdWx0aXBsZUdyaWRDb2xNb2RlbCxcbiAgICBjb2xsZWN0OiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9LFxuICAgIHNpemU6IHsgVzogbnVtYmVyLCBIOiBudW1iZXIgfSxcbiAgICBjZWxsTGlzdDogQXJyYXk8QXJyYXk8Q2VsbE1vZGVsPj4sXG4gICAgYm9ybkFyeTogQXJyYXk8Y2MuVmVjMj5cbn1cblxuZXhwb3J0IGVudW0gQ3JlYXRlVHlwZSB7XG4gICAgSW5pdGlhbCA9IDAsXG4gICAgQnJvbixcbiAgICBNaWR3YXksXG4gICAgTm92XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNb2RlbCB7XG5cbiAgICBwdWJsaWMgc3RhdGljIEdyaWRTaXplOiB7IFc6IG51bWJlciwgSDogbnVtYmVyIH0gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luczogR2FtZU1vZGVsID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnMoKTogR2FtZU1vZGVsIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnMpIHtcbiAgICAgICAgICAgIExvZy5lKCdHYW1lTW9kZWwgTm8gSW5pdCAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW5zO1xuICAgIH1cbiAgICAvKirlhbPljaHmlbDmja4gKi9cbiAgICBwcml2YXRlIGx2RGF0YTogSUxldmVsID0gbnVsbDtcbiAgICAvKirku7vliqEgKi9cbiAgICBwdWJsaWMgdGFzazogVGFza0N0cmwgPSBudWxsO1xuICAgIC8qKumUgSAqL1xuICAgIHByaXZhdGUgbG9jazogTG9ja0N0cmwgPSBudWxsO1xuICAgIC8qKumBk+WFtyAqL1xuICAgIHByaXZhdGUgcHJvcE1vZGVsOiBQcm9wTW9kZWwgPSBudWxsO1xuICAgIC8qKuWcsOWbuuWumumdoi4uLi4gKi9cbiAgICBwcml2YXRlIGdyb3VuZE1vZGVsOiBHcm91bmRNb2RlbCA9IG51bGw7XG4gICAgLyoq5LiK5bGC54m55q6K5aSa5Yqf6IO95bGCICovXG4gICAgcHJpdmF0ZSB1cEdyb3VuZE1vZGVsOiBVcEdyb3VuZE1vZGVsID0gbnVsbDtcbiAgICAvKirmlbTlnZfmlLbpm4bniaks56KO54mH5YyWICovXG4gICAgcHJpdmF0ZSBtZ01vZGVsOiBNdWx0aXBsZUdyaWRDb2xNb2RlbCA9IG51bGw7XG4gICAgLyoq5pS26ZuG55uu5qCHICovXG4gICAgcHJpdmF0ZSBjb2xsZWN0TW9kZWw6IENvbGxlY3RNb2RlbCA9IG51bGw7XG4gICAgLyoq5YWD57Sg5a2X5YW4ICovXG4gICAgcHJpdmF0ZSBjZWxsRGljdDogU2V0PENlbGxNb2RlbD4gPSBudWxsO1xuICAgIC8qKuS4i+iQveeahOWFg+e0oOWIl+ihqCAqL1xuICAgIHByaXZhdGUgZmFsbERpY3Q6IFNldDxDZWxsTW9kZWw+ID0gbnVsbDtcbiAgICAvKirpk77ot6/ov73ouKrnmoTlrrnlmaggKi9cbiAgICBwcml2YXRlIGRlc3RvcnlNYXA6IE1hcDxudW1iZXIsIHsgY291bnQ6IG51bWJlciwgYXJ5OiBTZXQ8Q2VsbE1vZGVsPiB9PiA9IG51bGw7XG4gICAgLyoq5q275Lqh55qE5YWD57SgICovXG4gICAgcHJpdmF0ZSBkZWF0aERpY3Q6IFNldDxDZWxsTW9kZWw+ID0gbnVsbDtcbiAgICAvKirmraPlnKjkvKDpgIHkuK3nmoTlhYPntKAgKi9cbiAgICBwcml2YXRlIHBvcnRhbERpY3Q6IFNldDxDZWxsTW9kZWw+ID0gbnVsbDtcbiAgICAvKirln7rnoYDlhYPntKDmlbDmja7liJfooagqL1xuICAgIHByaXZhdGUgY2VsbExpc3Q6IEFycmF5PEFycmF5PENlbGxNb2RlbD4+ID0gbnVsbDtcbiAgICAvKirmpoLnjofnlJ/miJDmsaAqL1xuICAgIHByaXZhdGUgY2hpcFNldExpc3Q6IEFycmF5PENlbGxUeXBlPiA9IG51bGw7XG4gICAgLyoq5Ye655Sf5YWN55ar5rGgKi9cbiAgICBwcml2YXRlIGluaXROb0NyZWF0ZUxpc3Q6IE1hcDxudW1iZXIsIGJvb2xlYW4+ID0gbnVsbDtcbiAgICAvKirmnIDlsI/mtojpmaTmlbAqL1xuICAgIHByaXZhdGUgbWluRXhlY051bTogbnVtYmVyID0gMztcbiAgICAvKirmraXmlbDpmZDliLYgKi9cbiAgICBwdWJsaWMgc3RlcENvdW50OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBzdGVwTGltaXQ6IG51bWJlciA9IDBcbiAgICAvKirml7bpl7TpmZDliLYgKi9cbiAgICBwdWJsaWMgdGltZUxpbWl0OiBudW1iZXIgPSAwO1xuICAgIC8qKuaYr+WQpuacieWPr+enu+WKqOeahOWcsOWdlyAqL1xuICAgIHB1YmxpYyBpc0hhdmFNb3ZlR3JvdW5kOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgaXNIYXZlR2VtOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGlzTG9uZ0hlaWdodDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB0aW1lclRyaWdnZXJDb3VudCA9IDA7XG5cbiAgICAvKirmmK/lkKbmraPlnKjmj5DnpLrkuK0gKi9cbiAgICBwcml2YXRlIHByb21wdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKuWFqOWxgOajgOa1i+W8gOWFsyAqL1xuICAgIHByaXZhdGUgX2lzT3BlbkF1dG9DaGVjazogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKuajgOa1i+S8oOi+k+W4puW8gOWFsyEgKi9cbiAgICBwcml2YXRlIF9pc09wZW5Db252eWVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5b2T5YmN5qiq5Zyw5Zu+5pWw6YePICovXG4gICAgcHJpdmF0ZSBfbWFwQ291bnQgPSAwO1xuICAgIC8qKuW9k+WJjeato+WcqOWxleekuuS4reeahOWcsOWbviAqL1xuICAgIHByaXZhdGUgX21hcEluZGV4ID0gMDtcblxuICAgIHByaXZhdGUgYm9ybkFyeTogQXJyYXk8Y2MuVmVjMj4gPSBbXTtcblxuICAgIHByaXZhdGUgbWFwRGF0YXM6IHsgW2tleTogbnVtYmVyXTogSUdyaWREYXRhIH0gPSBudWxsO1xuXG4gICAgLyoq5o+S5Lu25a655ZmoISAqL1xuICAgIHByaXZhdGUgX3BsdWdBcnk6IE1hcDx7IG5ldyhjZmcpIH0sIE9iamVjdD4gPSBudWxsO1xuXG4gICAgcHVibGljIENvbGxlY3RQb3M6IGNjLlZlYzIgPSBudWxsO1xuXG4gICAgcHVibGljIGlzTm92THY6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBpc0ZhbGxpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBzZXE6IFNlcXVlbmNlID0gbnVsbDtcblxuICAgIHB1YmxpYyBJY2VDcmVhbVBvb2w6IFNldDxDZWxsTW9kZWw+ID0gbnVsbDtcblxuICAgIHB1YmxpYyBDZWxsVHlwZU1hcDogTWFwPGFueSwgYW55PiA9IG51bGw7XG5cbiAgICBwdWJsaWMgSGF2ZUZsb3dlcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2RhdGFQb29sOiBEYXRhUG9vbDxDZWxsTW9kZWw+ID0gbnVsbDtcblxuXG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBJTGV2ZWwpIHtcbiAgICAgICAgR2FtZU1vZGVsLl9pbnMgPSB0aGlzO1xuICAgICAgICB0aGlzLmluaXQoZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkZXN0b3J5KCkge1xuICAgICAgICB0aGlzLl9pbnMucHJvcE1vZGVsLmRlc3RvcnkoKTtcbiAgICAgICAgLy8gdGhpcy5faW5zLl9kYXRhUG9vbC5mcmVlQWxsKCk7XG4gICAgICAgIC8vIHRoaXMuX2lucy5kZXN0b3J5TWFwLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX2lucyA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoZGF0YTogSUxldmVsID0gbnVsbCkge1xuXG4gICAgICAgIGRhdGEgPSB0aGlzLmx2RGF0YSA9IGRhdGEgfHwgdGhpcy5sdkRhdGE7XG4gICAgICAgIHRoaXMuc2VxID0gbmV3IFNlcXVlbmNlKCk7XG4gICAgICAgIHRoaXMuQ2VsbFR5cGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuSWNlQ3JlYW1Qb29sID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLkNvbGxlY3RQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLkhhdmVGbG93ZXJzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOb3ZMdiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRmFsbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzSGF2ZUdlbSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzSGF2YU1vdmVHcm91bmQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN0ZXBMaW1pdCA9IHRoaXMuc3RlcENvdW50ID0gZGF0YS5sZXZlbEluZm8ubW92ZXNMaW1pdDtcbiAgICAgICAgdGhpcy50aW1lTGltaXQgPSBkYXRhLmxldmVsSW5mby50aW1lTGltaXQ7XG4gICAgICAgIHRoaXMuX21hcENvdW50ID0gZGF0YS5ncmlkLmxlbmd0aDtcblxuICAgICAgICB0aGlzLmxvY2sgPSBuZXcgTG9ja0N0cmwoKTtcbiAgICAgICAgdGhpcy50YXNrID0gbmV3IFRhc2tDdHJsKCk7XG5cbiAgICAgICAgdGhpcy5jZWxsRGljdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5mYWxsRGljdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5kZXN0b3J5TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmRlYXRoRGljdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5wb3J0YWxEaWN0ID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLnByb3BNb2RlbCA9IG5ldyBQcm9wTW9kZWwodGhpcyk7XG4gICAgICAgIHRoaXMuY29sbGVjdE1vZGVsID0gbmV3IENvbGxlY3RNb2RlbChkYXRhLmNvbGxlY3QpO1xuXG4gICAgICAgIC8vIHRoaXMuX2RhdGFQb29sID0gbmV3IERhdGFQb29sKDIwMCwgQ2VsbE1vZGVsLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgLy/liJ3lp4vljJbmlLbpm4bnm67moIdcbiAgICAgICAgdGhpcy5pbml0Q2hpcFNldCgpO1xuICAgICAgICAvL+WIm+W7uuaPkuS7tiFcbiAgICAgICAgdGhpcy5jcmVhdGVQbHVnKCk7XG4gICAgICAgIC8v5Yid5aeL5YyW5Zyw5Zu+XG4gICAgICAgIHRoaXMuaW5pdE1hcCgpO1xuICAgICAgICAvL+WIneWni+WMluaPkuS7tuWKn+iDvVxuICAgICAgICB0aGlzLmluaXRQbHVnKCk7XG4gICAgfVxuXG4gICAgLyoqcGx1ZyBzdGFydCAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVBsdWcoKSB7XG4gICAgICAgIC8qKuaMgui9veWwj+Wls+WtqSAqL1xuICAgICAgICBpZiAodGhpcy5sdkRhdGEuZ2lybCkge1xuICAgICAgICAgICAgdGhpcy5tb3VudFBsdWcoR2lybCwgdGhpcy5sdkRhdGEuZ2lybCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoq5oyC6L295Lyg6YCB5bimICovXG4gICAgICAgIGlmICh0aGlzLmx2RGF0YS5jb252ZXllckxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMubW91bnRQbHVnKENvbnZleWVyLCB0aGlzLmx2RGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRQbHVnKCkge1xuICAgICAgICBpZiAodGhpcy5fcGx1Z0FyeSkge1xuICAgICAgICAgICAgdGhpcy5fcGx1Z0FyeS5mb3JFYWNoKCh2YWx1ZTogYW55LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5pbml0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3VudFBsdWc8VD4oZTogeyBuZXcoY2ZnOiBhbnkpOiBUIH0sIGNmZz86IGFueSk6IFQge1xuICAgICAgICBpZiAoIXRoaXMuX3BsdWdBcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsdWdBcnkgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGx1ZyA9IG5ldyBlKGNmZyk7XG4gICAgICAgIHRoaXMuX3BsdWdBcnkuc2V0KGUsIHBsdWcpO1xuICAgICAgICByZXR1cm4gcGx1ZztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGx1ZzxUPihwbHVnOiB7IG5ldyhjZmc6IGFueSk6IFQgfSk6IFQge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX3BsdWdBcnkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3BsdWdBcnkuZ2V0KHBsdWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICBwdWJsaWMgbm90aWZ5UGx1ZyhwbHVnOiB7IG5ldyhjZmc6IGFueSkgfSkge1xuICAgICAgICBjb25zdCBwID0gdGhpcy5nZXRQbHVnKHBsdWcpO1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgcC5vblRyaWdnZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipwbHVnIGVuZCAgKi9cblxuICAgIHByaXZhdGUgaW5pdE1hcCgpIHtcbiAgICAgICAgdGhpcy5tYXBEYXRhcyA9IHt9O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21hcENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmx2RGF0YS5ncmlkW2ldO1xuICAgICAgICAgICAgdGhpcy5pbml0Q2VsbChkYXRhLCBpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZU1hcCgwKTtcbiAgICB9XG5cbiAgICAvKirlj6/og73kvJrmnInmqKrlkJHlpJrlsY8s5YiH5o2i5pWw5o2uISEgKi9cbiAgICBwdWJsaWMgY2hhbmdlTWFwKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWFwSW5kZXggPSBpbmRleDtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMubWFwRGF0YXNbaW5kZXhdO1xuICAgICAgICB0aGlzLmJvcm5BcnkgPSBkYXRhLmJvcm5Bcnk7XG4gICAgICAgIHRoaXMuY2VsbExpc3QgPSBkYXRhLmNlbGxMaXN0O1xuICAgICAgICB0aGlzLm1nTW9kZWwgPSBkYXRhLm1nTW9kZWw7XG4gICAgICAgIHRoaXMuZ3JvdW5kTW9kZWwgPSBkYXRhLmdtO1xuICAgICAgICB0aGlzLnVwR3JvdW5kTW9kZWwgPSBkYXRhLnVnbTtcblxuICAgICAgICB0aGlzLmNvbGxlY3RNb2RlbC51cGRhdGVDdXJTaW5nbGVDb2xsZWN0KGRhdGEuY29sbGVjdCk7XG4gICAgICAgIEdhbWVNb2RlbC5HcmlkU2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICAgICAgLy8gdGhpcy5sYXN0TGluZVRvZG9Tb21ldGhpbmcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm90aWZ5RmFsbENvbHVtbk92ZXIocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGNvbnN0IGRpcnMgPSBbY2MudjIoLTEsIDApLCBjYy52MigxLCAwKV07XG4gICAgICAgIGZvciAobGV0IGkgPSBkaXJzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgY29uc3QgZGlyID0gZGlyc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIHBvcy5hZGQoZGlyKSk7XG4gICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgIGNlbGwub25Nc2coTXNnVHlwZS5GYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc0Nhbk1lcmdlQm9tYih0eXBlOiBDZWxsVHlwZSwgY2VsbDogQ2VsbE1vZGVsKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5sdkRhdGEubWVyZ2VMaW1pdCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5sdkRhdGEubWVyZ2VMaW1pdFt0eXBlICsgJyddO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZWxsICYmIHRoaXMuaXNIYXZhU3BlKGNlbGwucG9zKSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdENlbGwobWFwRGF0YTogSU1hcERhdGEsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jZWxsTGlzdCA9IFtdO1xuICAgICAgICBjb25zdCBtYXAgPSBtYXBEYXRhLm1hcDtcbiAgICAgICAgY29uc3QgeUxlbmd0aCA9IG1hcC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHhMZW5ndGggPSBtYXBbMF0ubGVuZ3RoXG5cbiAgICAgICAgY29uc3QgZ20gPSBuZXcgR3JvdW5kTW9kZWwoKTtcbiAgICAgICAgY29uc3QgdWdtID0gbmV3IFVwR3JvdW5kTW9kZWwoKTtcbiAgICAgICAgY29uc3QgYm9ybkFyeTogQXJyYXk8Y2MuVmVjMj4gPSBbXTtcbiAgICAgICAgY29uc3QgY2VsbExpc3Q6IEFycmF5PEFycmF5PENlbGxNb2RlbD4+ID0gW107XG4gICAgICAgIGNvbnN0IG1nTW9kZWwgPSBuZXcgTXVsdGlwbGVHcmlkQ29sTW9kZWwodGhpcy5sdkRhdGEsIGluZGV4KTtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHsgSDogbWFwRGF0YS5tYXAubGVuZ3RoLCBXOiBtYXBEYXRhLm1hcFswXS5sZW5ndGggfTtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHlMZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgbGV0IHhDZWxscyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB4TGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gbWFwRGF0YS5tYXBbeV1beF07XG4gICAgICAgICAgICAgICAgLy/liJ3lp4vljJblupXpg6jlnLDlm77mlbDmja5ra2trXG4gICAgICAgICAgICAgICAgY29uc3QgZ0NlbGwgPSBnbS5pbml0R3JvdXBDZWxsKGRhdGEsIHgsIHksIGluZGV4KTtcbiAgICAgICAgICAgICAgICAvL+WIneWni+WMluS4iuWxgueJueauiuWFg+e0oFxuICAgICAgICAgICAgICAgIGNvbnN0IHVnQ2VsbCA9IHVnbS5pbml0VXBHcm91cENlbGwoZGF0YSwgeCwgeSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5YWD57SgY2VsbFxuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGdDZWxsLmlzQ2FuQ3JlYXRlQ2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5jcmVhdGVDZWxsKHsgY2ZnOiBkYXRhLCBwb3M6IGNjLnYyKHgsIHkpLCBjcmVhdGVUeXBlOiBDcmVhdGVUeXBlLkluaXRpYWwsIGluZGV4LCBpc0luaXQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwgJiYgY2VsbC5pbml0QmluZEdyb3VuZChnQ2VsbCwgdWdDZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgeENlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgeENlbGxzLnB1c2gobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChnQ2VsbC5pc0Jvcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgYm9ybkFyeS5wdXNoKGdDZWxsLnBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2VsbExpc3QucHVzaCh4Q2VsbHMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwRGF0YXNbaW5kZXhdID0geyBnbSwgdWdtLCBtZ01vZGVsLCBib3JuQXJ5LCBjZWxsTGlzdCwgc2l6ZSwgY29sbGVjdDogbWFwRGF0YS5jb2xsZWN0IH1cbiAgICAgICAgdGhpcy5jaGVja0luaXRTYW1lQ2VsbChpbmRleCk7XG4gICAgICAgIG1nTW9kZWwuc3luYzJWaWV3KGdtLmdldEdyb3VwQ2VsbExpc3QoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Q2hpcFNldCgpIHtcbiAgICAgICAgdGhpcy5jaGlwU2V0TGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmluaXROb0NyZWF0ZUxpc3QgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBjaGlwcyA9IHRoaXMubHZEYXRhLmNoaXBzZXQ7XG4gICAgICAgIGlmICghY2hpcHMpIHtcbiAgICAgICAgICAgIGNoaXBzID0gW3sgXCJ0eXBlXCI6IDAsIFwicGVyY2VudFwiOiA3NSB9LCB7IFwidHlwZVwiOiAyLCBcInBlcmNlbnRcIjogMTAwIH0sIHsgXCJ0eXBlXCI6IDMsIFwicGVyY2VudFwiOiA3NSB9LCB7IFwidHlwZVwiOiA1LCBcInBlcmNlbnRcIjogMTAwIH1dO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBjaGlwc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBpdGVtLnBlcmNlbnQgLyA1O1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGl0ZW0udHlwZTtcbiAgICAgICAgICAgIGlmIChpdGVtLmlzTm9Jbml0Q3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Tm9DcmVhdGVMaXN0LnNldCh0eXBlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlwU2V0TGlzdC5wdXNoKHR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUNlbGwoZGF0YTogeyBjZmc6IEdyaWQsIHBvczogY2MuVmVjMiwgY3JlYXRlVHlwZT86IENyZWF0ZVR5cGUsIGluZGV4PzogbnVtYmVyLCBpc0luaXQ/OiBib29sZWFuLCBpc0luc2VydDJBcnk/OiBib29sZWFuIH0pIHtcbiAgICAgICAgLy8gZGF0YTogR3JpZCwgcG9zOiBjYy5WZWMyLCBjcmVhdGVUeXBlOiBDcmVhdGVUeXBlID0gQ3JlYXRlVHlwZS5Jbml0aWFsLCBpbmRleDogbnVtYmVyID0gbnVsbCwgaXNJbml0OiBib29sZWFuID0gZmFsc2UsIGlzSW5zZXJ0MkFyeTogYm9vbGVhbiA9IG51bGwpIHtcblxuICAgICAgICBsZXQgaXNJbnNlcnQyQXJ5OiBib29sZWFuID0gZGF0YS5pc0luc2VydDJBcnkgPT0gdW5kZWZpbmVkID8gbnVsbCA6IGRhdGEuaXNJbnNlcnQyQXJ5O1xuICAgICAgICBsZXQgaW5kZXggPSBkYXRhLmluZGV4IHx8IG51bGw7XG4gICAgICAgIGxldCBjcmVhdGVUeXBlID0gZGF0YS5jcmVhdGVUeXBlIHx8IENyZWF0ZVR5cGUuSW5pdGlhbDtcbiAgICAgICAgbGV0IGlzSW5pdCA9IGRhdGEuaXNJbml0IHx8IGZhbHNlO1xuICAgICAgICBsZXQgY2ZnID0gZGF0YS5jZmcgfHwge307XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IG5ldyBDZWxsTW9kZWwoKTsgLy90aGlzLl9kYXRhUG9vbC5nZXREYXRhKCk7XG4gICAgICAgIGlmIChjZWxsID09IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5jZWxsTGlzdCwgY2VsbC5wb3MpKSB7XG4gICAgICAgICAgICBDb21tb24uc2FmZVNldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIGNlbGwucG9zLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm1hcEluZGV4O1xuICAgICAgICB9XG4gICAgICAgIC8v5o+S5YWl566h55CG6Zif5YiXISBcbiAgICAgICAgdGhpcy5jZWxsRGljdC5hZGQoY2VsbCk7XG4gICAgICAgIGlmIChpc0luc2VydDJBcnkgPT0gbnVsbCkge1xuICAgICAgICAgICAgaXNJbnNlcnQyQXJ5ID0gISFjcmVhdGVUeXBlO1xuICAgICAgICB9XG4gICAgICAgIC8v5Yid5aeL5YyW5YWD57Sg5L+h5oGvXG4gICAgICAgIGNlbGwuaW5pdChjZmcsIGluZGV4LCBkYXRhLnBvcywgaXNJbml0LCBpc0luc2VydDJBcnkpO1xuICAgICAgICBpZiAodGhpcy5pc0NvbGxlY3QoY2VsbC5nZXRUeXBlKCkpKSBjZWxsLmlzQ29sbGVjdCA9IHRydWU7XG4gICAgICAgIGlmIChjcmVhdGVUeXBlKSB7XG4gICAgICAgICAgICBjZWxsLmNoYW5nZUJpbmRHcm91bmQoY2VsbC5wb3MpO1xuICAgICAgICAgICAgdGhpcy50YXNrLnB1c2hBZGROZXdUYXNrKGNlbGwsIGNyZWF0ZVR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBmcmVlQ2VsbChjZWxsOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgLy8gdGhpcy5fZGF0YVBvb2wuZnJlZURhdGEoY2VsbCk7XG4gICAgICAgIC8vIENvbW1vbi5zYWZlU2V0MkFycmF5VmFsdWUodGhpcy5jZWxsTGlzdCwgY2VsbC5wb3MsIG51bGwpOyBcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkU3RlcChjb3VudDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RlcExpbWl0ICs9IGNvdW50O1xuICAgIH1cblxuICAgIC8qKiDop6blj5Hlmagt5omn6KGM5Ye95pWwICovXG4gICAgcHVibGljIHRpbWVyVHJpZ2dlcigpIHtcbiAgICAgICAgdGhpcy50aW1lclRyaWdnZXJDb3VudCsrO1xuICAgICAgICB0aGlzLmlzRmFsbGluZyA9IHRoaXMuY2hlY2tIYXZlRmFsbGluZygpO1xuXG4gICAgICAgIHRoaXMubG9jayAmJiB0aGlzLmxvY2sudXBkYXRlKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb21wdGluZyAmJiB0aGlzLnRpbWVyVHJpZ2dlckNvdW50ICUgR2FwVGltZS5Qcm9tcHRFbGltYXRlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTYW1lQ2VsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzRmFsbGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZXJUcmlnZ2VyQ291bnQgJSAyID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZXN0b3J5TWFwLnNpemUgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuZGVzdG9yeU1hcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/mo4DmtYvmmK/lkKbmnInkuI3ljLnphY1cbiAgICAgICAgICAgIGlmICh0aGlzLl9pc09wZW5BdXRvQ2hlY2sgJiYgdGhpcy50aW1lclRyaWdnZXJDb3VudCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJc05lZWRSZXNldEdyaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc09wZW5BdXRvQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v5qOA5rWL5Lyg6YCB5bimXG4gICAgICAgICAgICBpZiAodGhpcy5faXNPcGVuQ29udnllciAmJiB0aGlzLmdldFBsdWcoQ29udmV5ZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNPcGVuQ29udnllciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGx1ZyhDb252ZXllcikub25UcmlnZ2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL+ajgOa1i+aVsOatpeeUqOWwvVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcExpbWl0IDw9IDAgJiYgUnVudGltZU1nci5pbnMuR2FtZVN0YXRlID09IEdhbWVTdGF0ZS5Ob3JtYWwpIHtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuR2FtZUNNRC5HYW1lT3ZlciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omn6KGM5raI6ZmkflxuICAgICAqIEBwYXJhbSBjZW50ZXJNb2RlbCBcbiAgICAgKiBAcGFyYW0gY2xvc2VBcnkgXG4gICAgICogQHBhcmFtIGVUeXBlIFxuICAgICAqIEBwYXJhbSBleHRJbmZvIFxuICAgICAqIEBwYXJhbSBrZWVwVGltZSBcbiAgICAgKiBAcGFyYW0gZ3JvdXBJZCBcbiAgICAgKi9cbiAgICBwdWJsaWMgZXhlY0VsaW1hdGUoY2VudGVyTW9kZWw6IENlbGxNb2RlbCwgY2xvc2VBcnk6IFNldDxDZWxsTW9kZWw+LCBlVHlwZTogRWxpbWF0ZVR5cGUsIGV4dEluZm86IGFueSwga2VlcFRpbWU6IG51bWJlciA9IG51bGwsIGdyb3VwSWQ6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgLy/lgZzmraLmj5DnpLrlip/og70hXG4gICAgICAgIHRoaXMuc3RvcFByb21wdCgpO1xuICAgICAgICAvL+iusOW9leS4quaVsFxuICAgICAgICBsZXQgc2l6ZSA9IDA7XG4gICAgICAgIC8v57qg5q2j5raI6Zmk57G75Z6LIVxuICAgICAgICBlVHlwZSA9IGVUeXBlIHx8IEVsaW1hdGVUeXBlLkRlZmF1bHQ7XG4gICAgICAgIC8v5YmU6Zmk5LiN6IO95raI6Zmk55qE5YWD57SgKOaciemanOeijeeJqeaIluiAheWFtuS7luS4jeiDvea2iOmZpOeahOaDheWGtSEpXG4gICAgICAgIHRoaXMuaXNGYWxsaW5nID0gdHJ1ZTtcbiAgICAgICAgZ3JvdXBJZCA9IGdyb3VwSWQgfHwgdGhpcy5zZXEubmV4dCgpO1xuXG4gICAgICAgIC8vIGlmICghdGhpcy50ZXN0bWFwLmhhcyhncm91cElkKSkge1xuICAgICAgICAvLyAgICAgdGhpcy50ZXN0bWFwLmFkZChncm91cElkKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmIChjbG9zZUFyeSkge1xuICAgICAgICAgICAgc2l6ZSA9IGNsb3NlQXJ5LnNpemU7XG4gICAgICAgICAgICBjbG9zZUFyeS5mb3JFYWNoKChpdGVtTW9kZWw6IENlbGxNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtTW9kZWwuaXNDYW5FbGltYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YCa55+l6L+Z5Liq5Zyw5pa55pyJ5raI6Zmk5pON5L2cLOWlveaJp+ihjOacqOeuseetiemanOeijeeJqeeahOa2iOmZpOaTjeS9nCEhXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpdGVtTW9kZWwub25Nc2coTXNnVHlwZS5FbGltYXRlLCB7IGlkOiBncm91cElkLCB0YXJnZXRNb2RlbDogY2VudGVyTW9kZWwsIHNpemUsIHR5cGU6IGVUeXBlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzov5nkuKrkvY3nva7kuI3mmK/kuK3lv4PngrkgISFcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICghaXRlbU1vZGVsLnBvcy5lcXVhbHMoY2VudGVyTW9kZWwucG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNsb3NlQXJ5LmRlbGV0ZShpdGVtTW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpdGVtTW9kZWwuZG9UZXN0RGVhdGgoKSB8fCB0aGlzLl9uZXdDcmVhdGVQb29sLmhhcyhpdGVtTW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+i/memHjOWwseW3sue7j+aKiua2iOmZpOeahOWFg+e0oGRlYXRo5bGe5oCn5YWo6YOo5byA5ZCvIVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VBcnkuZGVsZXRlKGl0ZW1Nb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy/mraPlvI/pgJrnn6XplIDmr4HnmoTlhYPntKBcbiAgICAgICAgICAgIGNsb3NlQXJ5LmZvckVhY2goKGl0ZW1Nb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtTW9kZWwgJiYgaXRlbU1vZGVsLmlzRGVhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWF0aERpY3QuYWRkKGl0ZW1Nb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Nb2RlbC5vbk1zZyhNc2dUeXBlLkVsaW1hdGUsIHsgaWQ6IGdyb3VwSWQsIHRhcmdldE1vZGVsOiBjZW50ZXJNb2RlbCwgc2l6ZSwgdHlwZTogZVR5cGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2VudGVyTW9kZWwuR3JvdXBJZCA9IGdyb3VwSWQ7XG4gICAgICAgIC8v6ZSB5a6a5ZCI5oiQ54K45by555qE54K5LOmBv+WFjeiiq+S4iuaWueiQveS4i+WFg+e0oOWNoOeUqCFcbiAgICAgICAgY2VudGVyTW9kZWwubG9ja0NyZWF0ZUJvbWJQb3Moc2l6ZSwgZVR5cGUpO1xuICAgICAgICAvL+mjnuacuua2iOmZpOeahOeJueauiuWkhOeQhi4o5a+75om+6aOe5py66JC96ISa54K5ISlcbiAgICAgICAgaWYgKGNlbnRlck1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5Cb21iNCB8fCAoc2l6ZSA9PSAwICYmIGNlbnRlck1vZGVsLmlzUm9ja2V0KSkge1xuICAgICAgICAgICAgZXh0SW5mbyA9IHsgcG9zOiB0aGlzLmZpbmRQbGFuZUVuZFBvcyhleHRJbmZvKSwgdHlwZTogZXh0SW5mbyB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFzay5wdXNoRWxpbWF0ZVRhc2soY2VudGVyTW9kZWwsIGNsb3NlQXJ5LCBzaXplLCBlVHlwZSwgZXh0SW5mbywga2VlcFRpbWUpO1xuICAgICAgICBFbmVyZ3lNb2RlbC5pbnMudXBkYXRhRW5lcmd5KGVUeXBlLCBjZW50ZXJNb2RlbC5nZXRUeXBlKCkpO1xuXG4gICAgICAgIC8vIGlmIChNLnJ1bnRpbWUuR2FtZVN0YXRlID09IEdhbWVTdGF0ZS5FbmQpIHtcbiAgICAgICAgLy8gICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELk1haW5DTUQsIHRhc2tQYWNrYWdlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOa1i+S4gOS4quWFg+e0oOaYr+WQpuWFgeiuuOaWnOedgOaOieiQvSFcbiAgICAgKiBAcGFyYW0gdGFyZ2V0ICAgIOebrueahOWcsOeahOWFg+e0oOaIluiAheWdkOagh1xuICAgICAqIEBwYXJhbSBmYWxsQ2VsbCAg6ZyA6KaB5LiL6JC955qE5YWD57SgXG4gICAgICovXG4gICAgcHVibGljIGlzQ2FuRGlhZ29uYWxseUZhbGwodGFyZ2V0OiBjYy5WZWMyIHwgQ2VsbE1vZGVsLCBmYWxsQ2VsbDogQ2VsbE1vZGVsKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICBsZXQgaXNIYXZlQm9ybiA9IGZhbHNlO1xuICAgICAgICAvL+S4iuaWueaYr+WQpuaciea0u+WKqOS4reeahOaZrumAmuWFg+e0oFxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgQ2VsbE1vZGVsKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucG9zO1xuICAgICAgICB9XG4gICAgICAgIC8qKuajgOa1i+S4i+iQveS9jee9ruaYr+WQpuacieWPr+eUqOeahOS8oOmAgemYtSAqL1xuICAgICAgICBjb25zdCBpc3BvcnQgPSB0aGlzLmlzSGF2YVBvcnRhbE91dCh0YXJnZXQpXG4gICAgICAgIC8qKuajgOa1i+S4i+iQveS9jee9ruaYr+WQpuiiq+WHuueUn+eCueWNoOeUqCAqL1xuICAgICAgICBjb25zdCBpc0NyZWF0ZUJyb24gPSB0aGlzLmxvY2suaXNCb3JuUG9zTG9ja2VkKHRhcmdldCk7XG4gICAgICAgIC8v5qOA5rWL5LiL6JC954K55piv5ZCm5pyJ5aKZLlxuICAgICAgICBjb25zdCB1ZCA9IEdhbWVNb2RlbC5pbnMuY2hlY2tIYXZhV2FsbCh0YXJnZXQsIHRhcmdldC5hZGQoY2MudjIoMCwgLTEpKSk7XG4gICAgICAgIC8v5qOA5rWL5LiL5pa55LiO5LiL6JC954K55piv5ZCm5pyJ5bem5Y+z5qC85qGjXG4gICAgICAgIGNvbnN0IGxyID0gR2FtZU1vZGVsLmlucy5jaGVja0hhdmFXYWxsKGZhbGxDZWxsLnBvcy5hZGQoY2MudjIoMCwgMSkpLCB0YXJnZXQpO1xuICAgICAgICAvL+S4i+aWueacieW3puWPs+agvOaho+WimVxuICAgICAgICBpZiAobHIgfHwgaXNwb3J0IHx8IGlzQ3JlYXRlQnJvbikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIOi/memHjOacieS4queWkemXriA/IDEg5aaC5p6c5Ye655Sf54K55Zyo5LiL6JC954K55LiL5pa5LiAwIOaWnOiQveajgOa1i+S8muaKiuiHquW3seS5n+iuoeeul+S4ii7lr7zoh7Tmo4DmtYvliLDoh6rlt7HmmK/mma7pgJrlhYPntKDogIzkuI3ov5vlhaXkuIvokL1cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGFyZ2V0Lnk7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdG1wUG9zID0gdGFyZ2V0LmFkZChjYy52MigwLCAtaSkpO1xuICAgICAgICAgICAgY29uc3QgZ0NlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuR3JvdW5kTGlzdCwgdG1wUG9zKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0FjdGl2ZSh0bXBQb3MpKSB7ICAvL3x8IHRoaXMuaXNCb3JkZXIodG1wUG9zKVxuICAgICAgICAgICAgICAgIC8v5om+5Yiw5q2j5bi455qE5YWD57SgIVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQmFycmllckNlbGwodG1wUG9zKSkge1xuICAgICAgICAgICAgICAgIC8v5om+5Yiw6Zqc56KN54mpIFxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNIYXZlQm9ybiA9IChnQ2VsbCAmJiBnQ2VsbC5pc0Jvcm4pO1xuICAgICAgICB9XG4gICAgICAgIC8v5aaC5p6c5om+5Yiw5pyA6aG256uv5Lmf5rKh5pyJ6Zqc56KN54mp6Zi75oyhLuWImeS4jeeUqOaWnOenu1xuICAgICAgICBpZiAocmVzdWx0ICYmIGlzSGF2ZUJvcm4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/lpoLmnpzkuIrmlrnmmK/mma7pgJrlhYPntKAs5bm25LiU5pyJ5LiK5oyh5aKZXG4gICAgICAgIGlmICghcmVzdWx0KSByZXN1bHQgPSB1ZCAmJiAhbHI7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3kuIDkuKrlhYPntKDmmK/lkKbmmK/mraPluLjnmoQs5rS75Yqo55qEISDkuIrmlrnmsqHmnInku7vkvZXpmYTliqDpgZPlhbchXG4gICAgICogQHBhcmFtIHBvc1xuICAgICAqL1xuICAgIHByaXZhdGUgX2lzQWN0aXZlKHBvczogY2MuVmVjMikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5DZWxsTGlzdCwgcG9zKTtcbiAgICAgICAgaWYgKCFjZWxsIHx8IChjZWxsICYmIChjZWxsLmlzRGVhdGggfHwgY2VsbC5pc0VtcHR5IHx8IGNlbGwuaXNEZXN0b3J5ZWQpIHx8IHRoaXMuX2lzQmFycmllckNlbGwocG9zKSkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3kuIDkuKrkvY3nva7mmK/lkKbmmK/pmpznoo0o5pyJ5rC0LOacqOeuseetieS4jeWPr+enu+WKqOeJqeWTgSEpXG4gICAgICogQHBhcmFtIHBvcyBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9pc0JhcnJpZXJDZWxsKHBvczogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHVwQ2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5DZWxsTGlzdCwgcG9zKTtcbiAgICAgICAgY29uc3QgdXBHbSA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5Hcm91bmRMaXN0LCBwb3MpO1xuICAgICAgICBjb25zdCB1cFVnbSA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5VcEdyb3VuZExpc3QsIHBvcyk7XG4gICAgICAgIGlmICgodXBHbSAmJiB1cEdtLmlzSG9sZCAmJiAhdXBHbS5pc1Bhc3NhYmxlKSB8fCAvL+acieS4i+WxgumanOeijeeJqSjmsLTmsaAuLi4pXG4gICAgICAgICAgICAodXBVZ20gJiYgdXBVZ20uaXNPYnMpIHx8ICAgLy/mnInkuIrlsYLpmpznoo3niako5pyo566xLi4uKVxuICAgICAgICAgICAgKHVwQ2VsbCAmJiAhdXBDZWxsLmlzTm90Rml4ZWQoKSkpIHsgLy/mnInkuI3lj6/np7vliqjnmoTlhYPntKAo576O5Lq66bG8LOi0neWjsy4uLi4pXG4gICAgICAgICAgICAvL+aciemanOeijSFcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4DmtYvmmK/lkKblj6/ku6XkuIvokL0s6L+U5Zue5LiL6JC955qE5pa55ZCRIVxuICAgICAqIEBwYXJhbSBjaGVja0NlbGwgXG4gICAgICogQHBhcmFtIGN1ckNlbGwgXG4gICAgICogQHBhcmFtIGN1clBvcyDlpIfnlKjlj4LmlbAs5b2T5b2T5YmN5YWD57Sg5Li656m65pe2LOS9v+eUqOatpOWPmOmHj+WBmuWQkemHj+i/kOeul1xuICAgICAqIEByZXR1cm4gZG93biBkaXIgb3IgbnVsbFxuICAgICAqL1xuICAgIHByaXZhdGUgX3Rlc3RDYW5GYWxsKGNoZWNrQ2VsbDogQ2VsbE1vZGVsLCBjdXJDZWxsOiBDZWxsTW9kZWwsIGN1clBvczogY2MuVmVjMik6IGNjLlZlYzIge1xuICAgICAgICAvL+WIpOaWreimgeajgOa1i+eahOaYr+WQpiDpmLXkuqEs56m6LOmanOeijeeJqSzmmK/lkKbmmK/liJrliJvlu7rlh7rmnaXnmoTngrjlvLkhXG4gICAgICAgIC8v5Yik5pat6Ieq6Lqr5piv5ZCm5pivIOepuiDmrbvkuqEv5LiL6JC9IOeKtuaAgSzkuIvkuKrngrnmmK/lkKbooqvplIHlrpohICwg5LiK5bGC5piv5ZCm5pyJ6Zqc56KN54mpXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAoKCFjaGVja0NlbGwuaXNFbXB0eSAmJiAhY2hlY2tDZWxsLmlzRGVhdGggJiYgY2hlY2tDZWxsLmlzTm90Rml4ZWQoKSAmJiB0aGlzLnVwQ2VsbElzQ2FuTW92ZShjaGVja0NlbGwucG9zKSAmJlxuICAgICAgICAgICAgKCFjdXJDZWxsIHx8IChjdXJDZWxsICYmIChjdXJDZWxsLmlzRGVhdGggfHwgY3VyQ2VsbC5pc0ZhbGwgfHwgY3VyQ2VsbC5pc0VtcHR5KSkgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2suaXNNeUxvY2tlZChjdXJQb3MsIGNoZWNrQ2VsbC5wb3MpKSkpIHtcbiAgICAgICAgICAgIC8v5aaC5p6c5Li65pac552A5LiL6JC9LOajgOa1i+aYr+WQpuWPr+S7peaWnOedgOiQvSEgXG4gICAgICAgICAgICBpZiAoKGNoZWNrQ2VsbC5pc0JvbWIgJiYgIWNoZWNrQ2VsbC5pc0JvbWJSZWFkeSkgfHwgKHRoaXMuY2hlY2tIYXZhV2FsbChjaGVja0NlbGwucG9zLCBjdXJQb3MpKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpciA9IGN1clBvcy5zdWIoY2hlY2tDZWxsLnBvcyk7XG4gICAgICAgICAgICAgICAgaWYgKGRpci54ICE9IDAgJiYgZGlyLnkgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NhbkRpYWdvbmFsbHlGYWxsKGN1clBvcywgY2hlY2tDZWxsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGlyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGlyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzSGF2ZUJyb24ocG9zOiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIgPSBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIGRpciA9IGRpciB8fCBjYy52MigwLCAwKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gcG9zLmFkZChkaXIpO1xuICAgICAgICBpZiAodGFyZ2V0LnkgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNCb3JuKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzSGF2ZUJyb24odGFyZ2V0LCBjYy52MigwLCAtMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgdGVzdEZpbmRDYW5GYWxsQ2VsbChjbG9zZUFyeTogU2V0PGNjLlZlYzI+IHwgY2MuVmVjMiwgZ3JvdXA6IG51bWJlcikge1xuICAgICAgICBsZXQgbmV4dERlcHM6IFNldDxjYy5WZWMyPiA9IG5ldyBTZXQoKTtcbiAgICAgICAgaWYgKGNsb3NlQXJ5IGluc3RhbmNlb2YgY2MuVmVjMikge1xuICAgICAgICAgICAgdGhpcy5fZmluZEZhbGxDZWxsKGNsb3NlQXJ5LCBuZXh0RGVwcywgZ3JvdXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xvc2VBcnkuZm9yRWFjaChpdGVtQ2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmluZEZhbGxDZWxsKGl0ZW1DZWxsLCBuZXh0RGVwcywgZ3JvdXApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHREZXBzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRlc3RGaW5kQ2FuRmFsbENlbGwobmV4dERlcHMsIGdyb3VwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuajgOa1i+i/meS4quS9jee9ruaYr+WQpuacieS8oOmAgemYteWHuuWPoyzlubbkuJTkvKDpgIHpmLXlhaXlj6PmmK/mraPluLjpmo/ml7blj6/ku6XkvKDov4fmnaUhICovXG4gICAgcHVibGljIGlzSGF2YVBvcnRhbE91dChwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgY29uc3QgZ20gPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgcG9zKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZ20gJiYgZ20uaXNQb3J0YWxPdXQoKSkge1xuICAgICAgICAgICAgY29uc3QgcG9ydGFsUG9zID0gR2FtZU1vZGVsLmlucy5nZXRVcEdyb3VuZE1vZGVsKCkuZ2V0UG9ydGFsUG9zKGdtLnBvcnRhbElkeCk7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCBwb3J0YWxQb3MuaW4pO1xuICAgICAgICAgICAgLy/mo4DmtYvlhaXlj6PmmK/lkKbmmK/mraPluLjlj6/kvKDpgIHnmoRcbiAgICAgICAgICAgIHJlc3VsdCA9IChjZWxsICYmIHRoaXMuaXNDYW5GYWxsKHBvcywgY2VsbC5wb3MsIGZhbHNlKSAmJiBjZWxsLmlzTm90Rml4ZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maW5kRmFsbENlbGwoYmFzZVBvczogY2MuVmVjMiwgbmV4dERlcHM6IFNldDxjYy5WZWMyPiA9IG51bGwsIGdyb3VucElkOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZ3JvdW5kQ2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5Hcm91bmRMaXN0LCBiYXNlUG9zKTtcbiAgICAgICAgLy/lpoLmnpzmraTml7bmmK/ovrnnlYwuLuS4jeW7tueUn+ajgOa1i1xuICAgICAgICBpZiAoYmFzZVBvcyAmJiAoZ3JvdW5kQ2VsbCAmJiAhZ3JvdW5kQ2VsbC5pc0hvbGQpKSB7XG4gICAgICAgICAgICBsZXQgX3RocmVlRGlyID0gW2NjLnYyKDAsIC0xKSwgY2MudjIoLTEsIC0xKSwgY2MudjIoMSwgLTEpXTtcbiAgICAgICAgICAgIGlmIChiYXNlUG9zLnggPiBHYW1lTW9kZWwuR3JpZFNpemUuVyAvIDIpIHtcbiAgICAgICAgICAgICAgICBfdGhyZWVEaXIgPSBbY2MudjIoMCwgLTEpLCBjYy52MigxLCAtMSksIGNjLnYyKC0xLCAtMSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfdGhyZWVEaXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXIgPSBfdGhyZWVEaXJbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgaXNVcCA9IGRpci5lcXVhbHMoY2MudjIoMCwgLTEpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja1BvcyA9IGJhc2VQb3MuYWRkKGRpcik7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUl0ZW0gPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIGJhc2VQb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrTW9kZWwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIGNoZWNrUG9zKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBjaGVja0dyb3VuZCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5Hcm91bmRMaXN0LCBjaGVja1Bvcyk7XG4gICAgICAgICAgICAgICAgLy/lpoLmnpzkuI3mmK/mraPluLjlhYPntKAo5Yia55Sf5oiQ5rKh5Zyo6L+b5Y67572R5qC855qE5YWD57SgKSzkuI3mo4DmtYtcbiAgICAgICAgICAgICAgICAvLyBpZiAoY2hlY2tHcm91bmQgJiYgIWNoZWNrR3JvdW5kLmlzSG9sZCkge1xuICAgICAgICAgICAgICAgIC8v5p+l6K+i55u45a+55b2T5YmN6IqC54K5LOS4iuS4gOS4quWFg+e0oOaYr+WQpuWPr+S7peenu+WKqCEhISE/Pz8/XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZG93bkRpciA9IHRoaXMuX3Rlc3RDYW5GYWxsKGNoZWNrTW9kZWwsIGJhc2VJdGVtLCBiYXNlUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvd25EaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5mYWxsRGljdC5oYXMoY2hlY2tNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEZhbGxDZWxsKGNoZWNrTW9kZWwsIGRvd25EaXIsIGdyb3VucElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0RGVwcyAmJiBuZXh0RGVwcy5hZGQoY2hlY2tNb2RlbC5wb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tNb2RlbC5yZXNldEZhbGxEaXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1VwICYmICF0aGlzLmlzQm9yZGVyKGNoZWNrUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+ajgOa1i+i/meS4quepuuS9jeaYr+WQpuacieaWnOiQveeahFxuICAgICAgICAgICAgICAgICAgICBuZXh0RGVwcyAmJiBuZXh0RGVwcy5hZGQoY2hlY2tQb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaWsOWinuS4gOS4qumcgOimgeaOieiQveeahOWFg+e0oFxuICAgICAqIEBwYXJhbSBjZWxsIOaOieiQveeahOWFg+e0oFxuICAgICAqIEBwYXJhbSBkb3duRGlyIOaOieiQveeahOaWueWQkVxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRGYWxsQ2VsbChjZWxsOiBDZWxsTW9kZWwsIGRvd25EaXI6IGNjLlZlYzIsIGdyb3VwSWQ6IG51bWJlcikge1xuXG4gICAgICAgIGlmICghY2VsbC5pc0VtcHR5ICYmICFjZWxsLmlzRGVhdGgpIHtcbiAgICAgICAgICAgIGlmICghZ3JvdXBJZCkgZ3JvdXBJZCA9IHRoaXMuc2VxLm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuZmFsbERpY3QuYWRkKGNlbGwpO1xuICAgICAgICAgICAgdGhpcy5faW5zZXJ0MkZhbGxHcm91cChncm91cElkLCBjZWxsKTtcbiAgICAgICAgICAgIGNlbGwuc3RhcnRGYWxsKGRvd25EaXIpO1xuICAgICAgICAgICAgdGhpcy5vcGVuQXV0b0NoZWNrT3B0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyBjb21wbGV0RmFsbChncm91cElkOiBudW1iZXIsIHRlc3RDZWxsOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBEYXRhID0gdGhpcy5kZXN0b3J5TWFwLmdldChncm91cElkKTtcbiAgICAgICAgaWYgKCFncm91cElkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRlc3RDZWxsLnBvcy54LCB0ZXN0Q2VsbC5wb3MueSwgZ3JvdXBJZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwRGF0YSkge1xuICAgICAgICAgICAgLy8gZ3JvdXBEYXRhLmNvdW50LS07XG4gICAgICAgICAgICAvLyBncm91cERhdGEuYXJ5LmRlbGV0ZSh0ZXN0Q2VsbCk7XG4gICAgICAgICAgICAvLyBpZiAoZ3JvdXBEYXRhLmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmRlc3RvcnlNYXAuZGVsZXRlKGdyb3VwSWQpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgZ3JvdXBEYXRhLmNvdW50LS07XG4gICAgICAgICAgICBpZiAoZ3JvdXBEYXRhLmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICAvL+W8gOWni+ajgOa1iyEgXG4gICAgICAgICAgICAgICAgY29uc3QgZWxpbWF0ZUFyeSA9IFtdO1xuICAgICAgICAgICAgICAgIGdyb3VwRGF0YS5hcnkuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwgJiYgIWNlbGwuaXNFbXB0eSAmJiAhY2VsbC5pc0Rlc3RvcnllZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG1wQXJ5ID0gdGhpcy5jaGVja0hhdmFFbGltYXRlKGNlbGwucG9zLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG1wQXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wQXJ5Wydwb3MnXSA9IGNlbGwucG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGltYXRlQXJ5Lmxlbmd0aCA8PSAwIHx8IHRoaXMuaGFzU2FtZUNlbGxJbkVsaW10ZUFyeShlbGltYXRlQXJ5LCB0bXBBcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsaW1hdGVBcnkucHVzaCh0bXBBcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVsaW1hdGVBcnkuZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNFbGltYXRlKENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5jZWxsTGlzdCwgdi5wb3MpLCB2LmNsb3NlQXJ5LCBudWxsLCB2LmJvbWJUeXBlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdG9yeU1hcC5kZWxldGUoZ3JvdXBJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmo4DmtYvmlrAgKi9cbiAgICBwcml2YXRlIGhhc1NhbWVDZWxsSW5FbGltdGVBcnkoZWxpbWF0ZUFyeTogQXJyYXk8eyBjbG9zZUFyeTogU2V0PENlbGxNb2RlbD4gfT4sIGFyeTI6IHsgY2xvc2VBcnk6IFNldDxDZWxsTW9kZWw+IH0pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICAgIGlmIChlbGltYXRlQXJ5ICYmIGFyeTIpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyciA9IEFycmF5LmZyb20oYXJ5Mi5jbG9zZUFyeSk7XG4gICAgICAgICAgICBmb3IgKGxldCBvID0gZWxpbWF0ZUFyeS5sZW5ndGg7IG8tLTspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbkVsaW1hdGVDbG9zZUFyeSA9IGVsaW1hdGVBcnlbb10uY2xvc2VBcnk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluRWxpbWF0ZUNsb3NlQXJ5LmhhcyhhcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+i/memHjOaYr+WQpuWMheWQq+atpOmhuea2iOmZpCEgXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreW9k+WJjeS4quaVsOS4jumYn+WIl+S4reeahOS4quaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluRWxpbWF0ZUNsb3NlQXJ5LnNpemUgPCBhcnkyLmNsb3NlQXJ5LnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGltYXRlQXJ5W29dID0gYXJ5MjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBvID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVsZXRlQ2VsbEZyb21Hcm91cChjZWxsOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgaWYgKGNlbGwgJiYgY2VsbC5Hcm91cElkKSB7XG4gICAgICAgICAgICBjb25zdCBtYXBkYXRhID0gdGhpcy5kZXN0b3J5TWFwLmdldChjZWxsLkdyb3VwSWQpXG4gICAgICAgICAgICBpZiAobWFwZGF0YSAmJiBtYXBkYXRhLmFyeS5oYXMoY2VsbCkpIHtcbiAgICAgICAgICAgICAgICBtYXBkYXRhLmFyeS5kZWxldGUoY2VsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0RmFsbChjZWxsLkdyb3VwSWQsIGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5zZXJ0MkZhbGxHcm91cChncm91cElkOiBudW1iZXIsIGNlbGw6IENlbGxNb2RlbCkge1xuICAgICAgICAvL+i/memHjOacieWPr+iDvSDkuIDkuKrlhYPntKDlkIzml7bliqDlhaUy5Liq5a655ZmoLi4uLi4uLi7opoHljrvph40hXG4gICAgICAgIGlmIChncm91cElkICYmIGNlbGwgJiYgIWNlbGwuaXNEZWF0aCkge1xuICAgICAgICAgICAgLy/mhJ/mn5PkuIvokL3nm67moIdcbiAgICAgICAgICAgIGNlbGwuR3JvdXBJZCA9IGdyb3VwSWQ7XG4gICAgICAgICAgICBjb25zdCBncm91cERhdGEgPSA8YW55PnRoaXMuZGVzdG9yeU1hcC5nZXQoZ3JvdXBJZCkgfHwgeyBjb3VudDogMCwgYXJ5OiBuZXcgU2V0KCkgfTtcbiAgICAgICAgICAgIGlmICghZ3JvdXBEYXRhLmFyeS5oYXMoY2VsbCkpIHtcbiAgICAgICAgICAgICAgICBncm91cERhdGEuY291bnQrKztcbiAgICAgICAgICAgICAgICBncm91cERhdGEuYXJ5LmFkZChjZWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RvcnlNYXAuc2V0KGdyb3VwSWQsIGdyb3VwRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmiZPlvIDkuIDmrKHoh6rliqjmo4DmtYvlvIDlhbMgKi9cbiAgICBwdWJsaWMgb3BlbkF1dG9DaGVja09wdCgpIHtcbiAgICAgICAgdGhpcy5faXNPcGVuQXV0b0NoZWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRmFsbERpY3QoY2VsbDogQ2VsbE1vZGVsKSB7XG4gICAgICAgIHRoaXMuZmFsbERpY3QuZGVsZXRlKGNlbGwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgUG9ydGFsRGljdCgpOiBTZXQ8Q2VsbE1vZGVsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbERpY3Q7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZURlYXRoRGljdChjZWxsOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgdGhpcy5fZGVsZXRlQ2VsbEZyb21Hcm91cChjZWxsKTtcbiAgICAgICAgdGhpcy5jZWxsRGljdC5kZWxldGUoY2VsbCk7XG4gICAgICAgIHRoaXMuZGVhdGhEaWN0LmRlbGV0ZShjZWxsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tHYW1lT3ZlcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuTW9kZWwuQ2hlY2tHYW1lT3ZlciwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jZWxsQWxsQ291bnQgPSAwO1xuICAgIC8qKlxuICAgICAqIOW8uuWItumUgOavgeS4gOS4quagvOS4iuaJgOacieS4nOilvyFcbiAgICAgKiBAcGFyYW0gcG9zIOS9jee9ruWdkOagh1xuICAgICAqIEBwYXJhbSBlVHlwZSDooqvku4DkuYjnjqnmhI/plIDmr4HnmoRcbiAgICAgKiBAcGFyYW0gYXR0YWNrVHlwZSDplIDmr4HogIXnmoTnsbvlnotcbiAgICAgKi9cbiAgICBwdWJsaWMgZXhlY0VsaW1hdGVPbmVBdEFsbChwb3M6IGNjLlZlYzIsIGVUeXBlOiBFbGltYXRlVHlwZSwgYXR0YWNrVHlwZT86IENlbGxUeXBlKSB7XG4gICAgICAgIHRoaXMuX2NlbGxBbGxDb3VudCA9IDE7XG4gICAgICAgIHRoaXMuc3RvcFByb21wdCgpO1xuICAgICAgICBjb25zdCB1cGNlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuVXBHcm91bmRMaXN0LCBwb3MpO1xuICAgICAgICBpZiAodXBjZWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9jZWxsQWxsQ291bnQgKz0gdXBjZWxsLmV4ZWNFbGltYXRlQWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JvdW5kQ2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5Hcm91bmRMaXN0LCBwb3MpO1xuICAgICAgICBncm91bmRDZWxsICYmIGdyb3VuZENlbGwuZXhlY0VsaW1hdGVBbGwoKTtcbiAgICAgICAgY29uc3QgZGVzdG9yeUlkID0gdGhpcy5zZXEubmV4dCgpO1xuICAgICAgICBDb21tb24uZXhlY0RlbGF5VGFzaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRlc3RGaW5kQ2FuRmFsbENlbGwocG9zLCBkZXN0b3J5SWQpO1xuICAgICAgICB9LCAwLjMpO1xuICAgICAgICB0aGlzLmV4ZWNFbGltYXRlT25lKHBvcywgZVR5cGUsIGZhbHNlLCBkZXN0b3J5SWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbEFsbENvdW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBleGVjRWxpbWF0ZU9uZShwb3M6IGNjLlZlYzIsIHR5cGU6IEVsaW1hdGVUeXBlID0gRWxpbWF0ZVR5cGUuRGVmYXVsdCwgaXNGb3JjZWQ6IGJvb2xlYW4gPSBmYWxzZSwgZGVzdG9yeUlkOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIHBvcyk7XG4gICAgICAgIGlmIChjZWxsICYmIChjZWxsLmlzRW1wdHkgfHwgIWNlbGwuaXNEZWF0aCkpIHtcbiAgICAgICAgICAgIGlmIChjZWxsLmlzQ2FuRWxpbWF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5kb1Rlc3REZWF0aCgpO1xuICAgICAgICAgICAgICAgIGRlc3RvcnlJZCA9IGRlc3RvcnlJZCB8fCB0aGlzLnNlcS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwuaXNCb21iICYmIHR5cGUgIT0gRWxpbWF0ZVR5cGUuR2lybCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLm9uTXNnKE1zZ1R5cGUuQm9tYik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsLmlzRGVhdGggfHwgaXNGb3JjZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5faXNBdXRvQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLm9uTXNnKE1zZ1R5cGUuRWxpbWF0ZSwgeyBpZDogZGVzdG9yeUlkLCB0eXBlLCBpc0ZvcmNlZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrLnB1c2hFbGltYXRlVGFzayhjZWxsLCBudWxsLCAwLCB0eXBlLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNlbGwub25Nc2coTXNnVHlwZS5FbGltYXRlLCB7IHR5cGUsIGlzRm9yY2VkIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5pu05paw5pS26ZuG54mp5pWw6YePICovXG4gICAgcHVibGljIHVwZGF0ZUNvbGxlY3RDb3VudCh0eXBlOiBDZWxsVHlwZSB8IHN0cmluZywgaW5kZXg/OiBudW1iZXIgfCBjYy5WZWMyLCBlbGltYXRlVHlwZT86IEVsaW1hdGVUeXBlLCBudW06IG51bWJlciA9IDEpIHtcbiAgICAgICAgdGhpcy5jb2xsZWN0TW9kZWwudXBkYXRlQ29sbGVjdENvdW50KHR5cGUgKyAnJywgbnVtLCBpbmRleCwgZWxpbWF0ZVR5cGUpO1xuICAgICAgICB0aGlzLnVwR3JvdW5kTW9kZWwudXBkYXRlQ29sbGVjdENvdW50KHR5cGUsIDxhbnk+aW5kZXgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wT3ZlckZhbGwoKSB7XG4gICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgPSBHYW1lU3RhdGUucHJlUmVhZHk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0T3ZlckZhbGwoKSB7XG4gICAgICAgIHRoaXMuc3RvcFByb21wdCgpO1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuc2VxLm5leHQoKTtcbiAgICAgICAgdGhpcy5DZWxsRGljdC5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRGYWxsQ2VsbChjZWxsLCBjYy52MigwLCAxKSwgaWQpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIHB1YmxpYyBvbk92ZXJNb3ZlKHBvczogY2MuVmVjMikge1xuICAgIC8vIGNvbnNvbGUuZXJyb3IoQ29tbW9uLmNvbnZldFBvcyhwb3MpKTsgXG4gICAgLy8gdGhpcy5leGVjRWxpbWF0ZU9uZShDb21tb24uY29udmV0UG9zKHBvcykpO1xuICAgIC8vIH1cblxuXG4gICAgcHJpdmF0ZSBfb3ZlckZpbmRGYWxsQ2VsbChwb3NpdGlvbjogY2MuVmVjMik6IENlbGxNb2RlbCB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5jZWxsTGlzdC5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuY2VsbExpc3RbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gcm93Lmxlbmd0aDsgai0tOykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSByb3dbal07XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgJiYgY2VsbC5leHREYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJveCA9IGNlbGwuZXh0RGF0YS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKVxuICAgICAgICAgICAgICAgICAgICBpZiAoYm94LmNvbnRhaW5zKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2VsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljayhwb3NpdGlvbjogY2MuVmVjMiwgaXNDaHVpemk6IGJvb2xlYW4pIHtcblxuICAgICAgICBpZiAoUnVudGltZU1nci5pbnMuR2FtZVN0YXRlID09IEdhbWVTdGF0ZS5FbmQpIHtcbiAgICAgICAgICAgIC8v57uT5p2f5LqGLi4uLueCuea2iFxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign54K55raI54K55Ye7ficpO1xuICAgICAgICAgICAgY29uc3QgdG91Y2hDZWxsID0gdGhpcy5fb3ZlckZpbmRGYWxsQ2VsbChwb3NpdGlvbik7XG5cbiAgICAgICAgICAgIC8vIGNvbnN0IHRvdWNoQ2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5jZWxsTGlzdCwgQ29tbW9uLmNvbnZldFBvcyhwb3NpdGlvbikpO1xuXG4gICAgICAgICAgICBpZiAodG91Y2hDZWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZW5kQ2hlY2tQb2ludChbdG91Y2hDZWxsXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9tYlR5cGUgPSB0aGlzLmdldENsaWNrUG9pbnRCb21iVHlwZShyZXN1bHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNFbGltYXRlKHRvdWNoQ2VsbCwgbmV3IFNldChyZXN1bHQpLCBudWxsLCBib21iVHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wTW9kZWwuZXhlY3V0ZShwb3NpdGlvbiwgaXNDaHVpemkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc3QgcG9zID0gQ29tbW9uLmNvbnZldFBvcyhwb3NpdGlvbik7XG4gICAgICAgIC8vIGNvbnN0IGNlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuR3JvdW5kTGlzdCwgcG9zKTtcbiAgICAgICAgLy8gaWYgKGNlbGwuZ2V0VHlwZSgpID09IEdyb3VuZFR5cGUuVHVpdHVqaSkge1xuICAgICAgICAvLyBHYW1lTW9kZWwuaW5zLkNvbGxlY3RNb2RlbC51cGRhdGVDb2xsZWN0UG93ZXJDZWxsKG51bGwsIGNlbGwudHVpdHVqaUNmZy50eXBlKTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgLy8gY29uc3QgcG9zaXRpb24gPSBjYy52MigxMTQuMDAyMTYwMDAwMDAwNDMsIDU0LjAwMjg3OTk5OTk5OTI4KVxuICAgICAgICAvLyBjb25zdCBwb3MxID0gQ29tbW9uLmNvbnZldFBvcyhwb3NpdGlvbik7XG5cbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihwb3MxKTtcbiAgICAgICAgLy8gY29uc3QgZ3JvdW5kY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5Hcm91bmRMaXN0LCBDb21tb24uY29udmV0UG9zKHBvcykpXG4gICAgICAgIC8vIGdyb3VuZGNlbGwuZXh0Q3RybC5jb21wbGV4Vmlld05vZGUuZGVzdHJveSgpO1xuXG5cbiAgICAgICAgLy8gdGhpcy5nZXRQbHVnKENvbnZleWVyKS5vblRyaWdnZXIoKTtcblxuICAgICAgICAvLyB0aGlzLmV4ZWNSZXNldEdyaWRNb3ZlKENvbW1vbi5jb252ZXRQb3MocG9zKSwgY2MudjIoLTEsIDApKTtcblxuICAgICAgICAvLyB0aGlzLnJlc2V0R3JpZCgpO1xuXG4gICAgICAgIC8vdGVzdCEhISBcbiAgICAgICAgLy8gdGhpcy5leGVjRWxpbWF0ZU9uZShDb21tb24uY29udmV0UG9zKHBvcykpO1xuICAgICAgICAvLyB0aGlzLmV4ZWNFbGltYXRlT25lKENvbW1vbi5jb252ZXRQb3MocG9zKSwgRWxpbWF0ZVR5cGUuR2lybCwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gY29uc3QgdXBjbSA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5VcEdyb3VuZExpc3QsIENvbW1vbi5jb252ZXRQb3MocG9zKSk7XG4gICAgICAgIC8vIGlmICh1cGNtICYmIHVwY20uaXNOb3YpIHtcbiAgICAgICAgLy8gICAgIC8v5o+Q56S6Li4uLi4uLi4uLiBcbiAgICAgICAgLy8gICAgIE0udGlwcy5zaG93KHVwY20uZ2V0Tm92V2FyaW5nVGl0bGUoKSwgMSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Eb3VibGVDbGljayhwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgY29uc3QgY20gPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIHBvcyk7XG4gICAgICAgIGlmIChjbSAmJiBjbS5pc0JvbWIgJiYgY20uaXNCb21iUmVhZHkgJiYgIWNtLmlzRmFsbGluZygpICYmICF0aGlzLmlzSGF2YVNwZShwb3MpKSB7XG4gICAgICAgICAgICBjbS5vbk1zZyhNc2dUeXBlLkJvbWIpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGVwQ291bnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXhlY1Jlc2V0R3JpZE1vdmUoY3BvczogY2MuVmVjMiwgZGlyOiBjYy5WZWMyKSB7XG4gICAgICAgIC8v5YWI5Lqk5o2i5Lik5Liq5L2N572uIVxuICAgICAgICBjb25zdCBlcG9zID0gY3Bvcy5hZGQoZGlyKTtcbiAgICAgICAgaWYgKGVwb3MueCA8IDAgfHwgZXBvcy55IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY01vZGVsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLmNlbGxMaXN0LCBjcG9zKTtcbiAgICAgICAgY29uc3QgZU1vZGVsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLmNlbGxMaXN0LCBlcG9zKTtcblxuICAgICAgICBpZiAoY01vZGVsICYmIGVNb2RlbCAmJiAhY01vZGVsLmlzRW1wdHkgJiYgIWVNb2RlbC5pc0VtcHR5ICYmICFjTW9kZWwuaXNHcm91bmQgJiYgIWVNb2RlbC5pc0dyb3VuZCAmJlxuICAgICAgICAgICAgdGhpcy5pc0NhbkV4Y2hhbmdlKGNwb3MsIGVwb3MpICYmXG4gICAgICAgICAgICBjTW9kZWwuZ2V0VHlwZSgpICE9IGVNb2RlbC5nZXRUeXBlKCkgJiZcbiAgICAgICAgICAgICF0aGlzLmxvY2suaXNBdXRvRXhjaGFuZ2VMb2NrZWQoZXBvcykgJiZcbiAgICAgICAgICAgICF0aGlzLmxvY2suaXNBdXRvRXhjaGFuZ2VMb2NrZWQoY3BvcykpIHtcbiAgICAgICAgICAgIC8v5qOA5rWL5Lqk5o2i5pWw5o2u5ZCO5piv5ZCm5pyJ5Y+v5raI6ZmkXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbdGhpcy5jaGVja1BvaW50KGVwb3MsIGNNb2RlbCksIHRoaXMuY2hlY2tQb2ludChjcG9zLCBlTW9kZWwpXVxuICAgICAgICAgICAgaWYgKCFyZXN1bHRbMF0gJiYgIXJlc3VsdFsxXSkge1xuICAgICAgICAgICAgICAgIC8v5rKh5pyJLOWImei/m+ihjOeVjOmdouWKqOeUuyBcbiAgICAgICAgICAgICAgICBlTW9kZWwucG9zID0gY3BvcztcbiAgICAgICAgICAgICAgICBjTW9kZWwucG9zID0gZXBvcztcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2sucHVzaEV4Y2hhbmdlVGFzayhlTW9kZWwsIGNwb3MsIGNNb2RlbCwgZXBvcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrLmFkZEF1dG9FeGNoYW5nZShlcG9zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2suYWRkQXV0b0V4Y2hhbmdlKGNwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIOenu+WKqOWFg+e0oOS9jee9rlxuICAgICAqIEBwYXJhbSBwb3Mg5Lqk5o2iMeS9jee9rlxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb24g5pa55ZCRIVxuICAgICAqIEBwYXJhbSBpc0F1dG9DaGVjayDmmK/lkKbmmK/ns7vnu5/oh6rliqjmo4DmtYvmsqHmnInlj6/np7vliqjlhYPntKDml7boh6rliqjmi4notbfmm7TmjaLlhYPntKAhXG4gICAgICovXG4gICAgcHVibGljIHRvdWNoTW92ZShwb3M6IGNjLlZlYzIsIGRpcmVjdGlvbjogY2MuVmVjMikge1xuXG4gICAgICAgIGNvbnN0IGVwb3MgPSBwb3MuYWRkKGRpcmVjdGlvbik7XG4gICAgICAgIGlmIChlcG9zLnggPCAwIHx8IGVwb3MueSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtb3ZlU3RhdGUgPSB0aGlzLmV4Y2hhbmdlKHBvcywgZXBvcyk7XG4gICAgICAgIGlmIChtb3ZlU3RhdGUgPT0gMCB8fCBtb3ZlU3RhdGUgPT0gMykgcmV0dXJuO1xuXG4gICAgICAgIC8qKiDmo4DmtYvmtojpmaQgKi9cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW3RoaXMuY2hlY2tQb2ludChlcG9zKSwgdGhpcy5jaGVja1BvaW50KHBvcyldXG4gICAgICAgIGNvbnN0IHBzID0gW2Vwb3MsIHBvc107XG4gICAgICAgIGlmICghcmVzdWx0WzBdICYmICFyZXN1bHRbMV0pIHtcbiAgICAgICAgICAgIC8v5Lik6L656YO95piv5pmu6YCa5YWD57Sg5omN5o2iXG4gICAgICAgICAgICBpZiAobW92ZVN0YXRlID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4Y2hhbmdlKHBvcywgZXBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBzLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLmNlbGxMaXN0LCBwKS5jaGVja0lzRXhpdChwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0ZXBDb3VudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKHIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNtID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLmNlbGxMaXN0LCBwc1tpbmRleF0pO1xuICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY0VsaW1hdGUoY20sIHIuY2xvc2VBcnksIG51bGwsIHIuYm9tYlR5cGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNtLmNoZWNrSXNFeGl0KGNtLnBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RlcENvdW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmo4DmtYvmjIflrprnmoTkuIDkuKrkvY3nva7mmK/lkKbmnInlj6/ku6XljLnphY3mtojpmaTnmoTlhYPntKAu5bm25LiU5omn6KGM5raI6Zmk5pON5L2cISAqL1xuICAgIHB1YmxpYyBjaGVja0hhdmFFbGltYXRlKHBvczogY2MuVmVjMiwgZXhlYzogYm9vbGVhbiA9IHRydWUpOiB7IGNsb3NlQXJ5OiBTZXQ8Q2VsbE1vZGVsPiwgYm9tYlR5cGU6IENlbGxUeXBlIH0ge1xuICAgICAgICBpZiAoTS5ydW50aW1lLkdhbWVTdGF0ZSA9PSBHYW1lU3RhdGUuTm9ybWFsIHx8IE0ucnVudGltZS5HYW1lU3RhdGUgPT0gR2FtZVN0YXRlLlBhdXNlKSB7XG4gICAgICAgICAgICBjb25zdCBhcnkgPSB0aGlzLmNoZWNrUG9pbnQocG9zKVxuICAgICAgICAgICAgaWYgKGFyeSAmJiBleGVjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjRWxpbWF0ZShDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIHBvcyksIGFyeS5jbG9zZUFyeSwgbnVsbCwgYXJ5LmJvbWJUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcnk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoq5qOA5rWL5Zy66Z2i5LiK55qE5YWD57Sg5piv5ZCm5YWo6YOo5q275LqhICovXG4gICAgcHVibGljIGNoZWNrSXNBbGxEZWF0aCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGlzQWxsRGVhdGggPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5DZWxsTGlzdC5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSB0aGlzLkNlbGxMaXN0W2ldLmxlbmd0aDsgai0tOykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLkNlbGxMaXN0W2ldW2pdO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICYmICFjZWxsLmlzRGVhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlzQWxsRGVhdGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0FsbERlYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVTdGVwQ291bnQoKSB7XG4gICAgICAgIHRoaXMuc3RlcExpbWl0LS07XG4gICAgICAgIHRoaXMuX2lzT3BlbkNvbnZ5ZXIgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5zdGVwTGltaXQgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGVwTGltaXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwpO1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuQ2xvc2VUdXRvcmlhbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kUGxhbmVFbmRQb3ModHlwZTogQ2VsbFR5cGUgPSBudWxsKTogY2MuVmVjMiB7XG4gICAgICAgIC8v5LuO5pS26ZuG55qE55uu5qCH5Lit5LyY5YWI5om+5Ye65b2T5YmN5bGP5bmV55qE5Z2Q5qCHIVxuICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSB0aGlzLmNvbGxlY3RNb2RlbC5maW5kT25lQ29sbGVjdFBvcyghIXR5cGUpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0UG9zO1xuICAgIH1cblxuICAgIC8qKuayoeacieWPr+a2iOmZpOeahOWFg+e0oOaXtizph43nva7mo4vnm5ggKi9cbiAgICBwdWJsaWMgcmVzZXRHcmlkKGlzRm9yY2VkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5zdG9wUHJvbXB0KCk7XG4gICAgICAgIGNvbnN0IGFyeTogU2V0PENlbGxNb2RlbD4gPSBuZXcgU2V0KCk7XG4gICAgICAgIGxldCBtYXJrRXhpdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5DZWxsTGlzdC5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuQ2VsbExpc3RbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gcm93Lmxlbmd0aDsgai0tOykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSByb3dbal07XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgJiYgIWNlbGwuaXNEZWF0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRm9yY2VkICYmIGNlbGwuaXNCb21iICYmICF0aGlzLmlzSGF2YVNwZShjZWxsLnBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwOyBqID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtFeGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2VsbC5pc0VtcHR5ICYmIGNlbGwuaXNOb3RGaXhlZCAmJiAhY2VsbC5pc0JvbWIgJiYgIXRoaXMuaXNIYXZhT2JzKGNlbGwucG9zKSAmJiAhdGhpcy5pc0hhdmFTcGUoY2VsbC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnkuYWRkKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtYXJrRXhpdCkgcmV0dXJuO1xuICAgICAgICBsZXQgZGlyID0gW2NjLnYyKC0xLCAwKSwgY2MudjIoMCwgMSldO1xuICAgICAgICBjb25zb2xlLmVycm9yKCfmsqHmnInlj6/mtojpmaTnmoQhIOmHjee9riEnKTtcbiAgICAgICAgLy/lvIDlp4vkuqTmjaLkvY3nva4s5bm25LiU5LiN6IO95pyJ5raI6ZmkISFcbiAgICAgICAgaWYgKGFyeS5zaXplID4gMCkge1xuICAgICAgICAgICAgTS50aXBzLnNob3coV2FyaW5nVGlwcy5Ob0VsaW1hdGUpO1xuICAgICAgICAgICAgYXJ5LmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjUmVzZXRHcmlkTW92ZShjZWxsLnBvcywgZGlyW1V0aWwuVG9vbC5yYW5nZUludCgwLCBkaXIubGVuZ3RoLCBmYWxzZSldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sb2NrLmRlbGV0ZUF1dG9FeGNoYW5nZUFsbCgpO1xuICAgICAgICAgICAgQ29tbW9uLmV4ZWNEZWxheVRhc2soKCkgPT4geyB0aGlzLl9pc09wZW5BdXRvQ2hlY2sgPSB0cnVlOyB9LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOa1i+aYr+WQpumcgOimgemHjee9riFcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrSXNOZWVkUmVzZXRHcmlkKCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgLy8gLy/kuI3nlKjogIPomZHmiYDmnInpgZPlhbfljp/lm6As5byA5aeL5p+l5om+5piv5ZCm5pyJ5Y+v5Lul5LiA6LW35raI6Zmk55qEIVxuICAgICAgICAvLyBpZiAodGhpcy5jaGVja1NhbWVDZWxsKCkpIHtcbiAgICAgICAgLy8gICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAvLyB9IFxuICAgICAgICBjb25zdCByZXN1bHQgPSAhdGhpcy5jaGVja1NhbWVDZWxsKHRydWUpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVzZXRHcmlkKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG5cbiAgICAvKirmo4DmtYvlj6/mtojpmaTniYfmrrUgKi9cbiAgICBwcml2YXRlIGNoZWNrU2FtZUNlbGwoaXNDaGVja05vdGluZzogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgeSA9IHRoaXMuY2VsbExpc3QubGVuZ3RoOyB5LS07KSB7XG4gICAgICAgICAgICBjb25zdCB4TGlzdCA9IHRoaXMuY2VsbExpc3RbeV07XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0geExpc3QubGVuZ3RoOyB4LS07KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gY2MudjIoeCwgeSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbEl0ZW0gPSB4TGlzdFt4XTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNIYXZhT2JzKHBvcykgfHwgdGhpcy5pc0hhdmFTcGUocG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IENvbW1vbi5EaXI0Lmxlbmd0aDsgay0tOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrUG9zID0gY2VsbEl0ZW0ucG9zLmFkZChDb21tb24uRGlyNFtrXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0hhdmFXYWxsKGNlbGxJdGVtLnBvcywgY2hlY2tQb3MpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0hhdmFPYnMoY2hlY2tQb3MpIHx8IHRoaXMuaXNIYXZhU3BlKGNoZWNrUG9zKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxJdGVtLmlzSW52aW5jaWJsZSB8fCBjZWxsSXRlbS5pc0dyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMuY2hlY2tQb2ludChjaGVja1BvcywgY2VsbEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuY2xvc2VBcnkuc2l6ZSA+PSB0aGlzLm1pbkV4ZWNOdW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9tcHRpbmcgJiYgIWlzQ2hlY2tOb3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9tcHRDYW5FbGltYXRlKGNlbGxJdGVtLCByZXMuY2xvc2VBcnksIGNoZWNrUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ID0gMDsgeSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGN1cnJlbnRQcm9tcHRUYXNrID0gbnVsbDtcbiAgICBwcml2YXRlIHN0b3BQcm9tcHQoKSB7XG4gICAgICAgIHRoaXMudGltZXJUcmlnZ2VyQ291bnQgPSAwO1xuICAgICAgICBpZiAodGhpcy5wcm9tcHRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UHJvbXB0VGFzaykge1xuICAgICAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LkdhbWVDTUQuU3RvcFByb21wdHMsIHRoaXMuY3VycmVudFByb21wdFRhc2spO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb21wdFRhc2sgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9tcHRDYW5FbGltYXRlKHNpbmdsZU1vZGVsOiBDZWxsTW9kZWwsIGNsb3NlQXJ5OiBTZXQ8Q2VsbE1vZGVsPiwgY2tQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFByb21wdFRhc2spIHtcbiAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LkdhbWVDTUQuU3RvcFByb21wdHMsIHRoaXMuY3VycmVudFByb21wdFRhc2spO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvbXB0VGFzayA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY2xvc2VBcnkuZm9yRWFjaCgoY20pID0+IHtcbiAgICAgICAgICAgIGlmIChVdGlsLlRvb2wuY29tcGFyZVYyKGNtLnBvcywgY2tQb3MpKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VBcnkuZGVsZXRlKGNtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY3VycmVudFByb21wdFRhc2sgPSB0aGlzLnRhc2sucHVzaFRpc1Rhc2soc2luZ2xlTW9kZWwsIGNsb3NlQXJ5LCBja1Bvcyk7XG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyW5qOA5rWL55u45ZCM5YWD57SgICovXG4gICAgcHJpdmF0ZSBjaGVja0luaXRTYW1lQ2VsbChtYXBJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLm1hcERhdGFzW21hcEluZGV4XS5jZWxsTGlzdDtcbiAgICAgICAgZm9yIChsZXQgeSA9IGxpc3QubGVuZ3RoOyB5LS07KSB7XG4gICAgICAgICAgICBjb25zdCB4TGlzdCA9IGxpc3RbeV07XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0geExpc3QubGVuZ3RoOyB4LS07KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbEl0ZW0gPSB4TGlzdFt4XTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbEl0ZW0gJiYgY2VsbEl0ZW0uaXNSYW5kb20gJiYgdGhpcy5jaGVja1BvaW50KGNlbGxJdGVtLnBvcywgbnVsbCwgbWFwSW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxJdGVtLnNldFJhbmRvbVR5cGUodHJ1ZSwgbWFwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNDb2xsZWN0KHR5cGU6IENlbGxUeXBlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxlY3QoKS5nZXQodHlwZSArICcnKSAhPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQ2FuRXhjaGFuZ2UocG9zMTogY2MuVmVjMiwgcG9zMjogY2MuVmVjMiwgaXNDaGVja1dhbGw6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBjb25zdCB0bXBBcnkgPSBbcG9zMSwgcG9zMl07XG4gICAgICAgIGZvciAobGV0IGkgPSB0bXBBcnkubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSB0bXBBcnlbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5pc0hhdmFTcGUocG9zKSB8fCB0aGlzLmlzSGF2YU9icyhwb3MpIHx8IHRoaXMuaXNIb2xkKHBvcykpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0NoZWNrV2FsbCAmJiByZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9ICF0aGlzLmNoZWNrSGF2YVdhbGwocG9zMSwgcG9zMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4DmtYvmmK/lkKbmnInlopkuLi4uLi4uLi4uLi4uXG4gICAgICogQHBhcmFtIHBvczEgXG4gICAgICogQHBhcmFtIHBvczIgXG4gICAgICovXG4gICAgcHVibGljIGNoZWNrSGF2YVdhbGwocG9zMTogY2MuVmVjMiwgcG9zMjogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGcxID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLkdyb3VuZExpc3QsIHBvczEpO1xuICAgICAgICBjb25zdCBnMiA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5Hcm91bmRMaXN0LCBwb3MyKTtcbiAgICAgICAgaWYgKGcxICYmIGcyKSB7XG4gICAgICAgICAgICAvL+WcqOWQjOS4gOS4quWIlyzmo4DmtYvkuIrkuItcbiAgICAgICAgICAgIGlmIChwb3MxLnggPT0gcG9zMi54KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvczEueSA+IHBvczIueSkge1xuICAgICAgICAgICAgICAgICAgICAvL+ajgOa1izHmmK/lkKbmnInkuIrpnaLnmoQs5qOA5rWLMuaYr+WQpuacieS4i+mdoueahFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAoZzEuY2hlY2tXYWxsKCd0b3AnKSB8fCBnMi5jaGVja1dhbGwoJ2JvdHRvbScpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL+ajgOa1izHmmK/lkKbmnInkuIvpnaLnmoQs5qOA5rWLMuaYr+WQpuacieS4iumdoueahFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAoZzEuY2hlY2tXYWxsKCdib3R0b20nKSB8fCBnMi5jaGVja1dhbGwoJ3RvcCcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvczEueSA9PSBwb3MyLnkpIHtcbiAgICAgICAgICAgICAgICAvL+WcqOWQjOS4gOS4quihjCzmo4DmtYvlt6blj7NcbiAgICAgICAgICAgICAgICBpZiAocG9zMS54ID4gcG9zMi54KSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5qOA5rWLMeaYr+WQpuacieW3pui+ueeahCzmo4DmtYsy5piv5ZCm5pyJ5Y+z6L6555qEXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IChnMS5jaGVja1dhbGwoJ2xlZnQnKSB8fCBnMi5jaGVja1dhbGwoJ3JpZ2h0JykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5qOA5rWLMeaYr+WQpuacieWPs+i+ueeahCzmo4DmtYsy5piv5ZCm5pyJ5bem6L6555qEXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IChnMS5jaGVja1dhbGwoJ3JpZ2h0JykgfHwgZzIuY2hlY2tXYWxsKCdsZWZ0JykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgLyoq5rKh5pyJ5q2j5Zyo5omn6KGM5Lqk5o2iICovXG4gICAgcHJpdmF0ZSBpc05vTW92aW5nKG0xOiBDZWxsTW9kZWwsIG0yOiBDZWxsTW9kZWwpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAobTEgJiYgbTIpIHtcbiAgICAgICAgICAgIGlmIChtMS5leHRDdHJsICYmIG0yLmV4dEN0cmwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAhbTEuZXh0Q3RybC5pc1J1bk1vdmUgJiYgIW0yLmV4dEN0cmwuaXNSdW5Nb3ZlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChtMS5pc0ZhbGwgfHwgbTEuaXNEZWF0aCkgfHwgKG0yLmlzRmFsbCB8fCBtMi5pc0RlYXRoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmiafooYzlhYPntKDkuqTmjaIs5bm25LiU6L+U5Zue5Lqk5o2i54q25oCBXG4gICAgICogQHBhcmFtIGNwb3MgXG4gICAgICogQHBhcmFtIGVwb3NcbiAgICAgKiBAcmV0dXJucyAw5Li65rKh5pyJ5Lqk5o2iIDHkuLrlt7Lnu4/kuqTmjaIgMuS4uuW3sue7j+S6pOaNoizlubbkuJTmnInkuIDogIXkuLrngrjlvLkgM+S4uuS4pOiAhemDveaYr+eCuOW8uVxuICAgICAqL1xuICAgIHByaXZhdGUgZXhjaGFuZ2UoY3BvczogY2MuVmVjMiwgZXBvczogY2MuVmVjMiwganVzdENoYW5nZVBvc0RhdGE6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNNb2RlbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5jZWxsTGlzdCwgY3Bvcyk7XG4gICAgICAgIGNvbnN0IGVNb2RlbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5jZWxsTGlzdCwgZXBvcyk7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IDE7XG4gICAgICAgIC8v5piv5ZCm5q2j5Zyo5LiL6JC954q25oCBXG4gICAgICAgIGlmICghY01vZGVsIHx8ICFlTW9kZWwgfHwgIWNNb2RlbC5pc05vdEZpeGVkKCkgfHwgIWVNb2RlbC5pc05vdEZpeGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIC8v5YW25Lit5LiA5Liq5Li656m6L1xuICAgICAgICBpZiAoZU1vZGVsLmlzRW1wdHkgfHwgY01vZGVsLmlzRW1wdHkgfHwgY01vZGVsLmlzR3JvdW5kIHx8IGVNb2RlbC5pc0dyb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgLy/mmK/lkKbmmK/ljbPlsIbniIbngrjnmoTngrjlvLlcbiAgICAgICAgaWYgKGNNb2RlbC5pc0JvbWIgJiYgIWNNb2RlbC5pc0JvbWJSZWFkeSB8fCBlTW9kZWwuaXNCb21iICYmICFlTW9kZWwuaXNCb21iUmVhZHkpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVNb2RlbC5pc0JvbWIgJiYgY01vZGVsLmlzQm9tYikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMztcbiAgICAgICAgICAgIHRoaXMudGFzay5wdXNoRXhjaGFuZ2VUYXNrKGVNb2RlbCwgY3BvcywgY01vZGVsLCBlcG9zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTm9Nb3ZpbmcoY01vZGVsLCBlTW9kZWwpICYmIHRoaXMuaXNDYW5FeGNoYW5nZShjcG9zLCBlcG9zKSkge1xuICAgICAgICAgICAgICAgIGVNb2RlbC5wb3MgPSBjcG9zO1xuICAgICAgICAgICAgICAgIGNNb2RlbC5wb3MgPSBlcG9zO1xuICAgICAgICAgICAgICAgIC8v5pWw5o2u5Y+Y5o2iflxuICAgICAgICAgICAgICAgIHRoaXMudGFzay5wdXNoRXhjaGFuZ2VUYXNrKGVNb2RlbCwgY3BvcywgY01vZGVsLCBlcG9zKTtcbiAgICAgICAgICAgICAgICBpZiAoZU1vZGVsLmlzQm9tYiB8fCBjTW9kZWwuaXNCb21iKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRVcEdyb3VuZENlbGwocG9zOiBjYy5WZWMyLCBpbmRleDogbnVtYmVyID0gbnVsbCk6IFVwR3JvdW5kQ2VsbE1vZGVsIHtcbiAgICAgICAgbGV0IGxpc3Q6IFVwR3JvdW5kQ2VsbE1vZGVsW11bXSA9IG51bGxcbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxpc3QgPSB0aGlzLm1hcERhdGFzW2luZGV4XS51Z20uZ2V0VUdyb3VwQ2VsbExpc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3QgPSB0aGlzLlVwR3JvdW5kTGlzdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShsaXN0LCBwb3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0R3JvdW5kQ2VsbChwb3M6IGNjLlZlYzIsIGluZGV4OiBudW1iZXIgPSBudWxsKTogR3JvdW5kQ2VsbE1vZGVsIHtcbiAgICAgICAgbGV0IGxpc3Q6IEdyb3VuZENlbGxNb2RlbFtdW10gPSBudWxsXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsaXN0ID0gdGhpcy5tYXBEYXRhc1tpbmRleF0uZ20uZ2V0R3JvdXBDZWxsTGlzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdCA9IHRoaXMuR3JvdW5kTGlzdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShsaXN0LCBwb3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmaj+acuuaLv+S4gOS4quWFg+e0oCFcbiAgICAgKiBAcGFyYW0gaXNOb3RMaW1pdCDmmK/lkKbpnIDopoHpmZDliLbmma7pgJrlhYPntKAgXG4gICAgICovXG4gICAgcHVibGljIGdldFJhbmRvbUNlbGwoaXNOb3RMaW1pdDogYm9vbGVhbiA9IGZhbHNlKTogQ2VsbE1vZGVsIHtcbiAgICAgICAgY29uc3QgeSA9IFV0aWwuVG9vbC5yYW5nZUludCgwLCB0aGlzLmNlbGxMaXN0Lmxlbmd0aCwgZmFsc2UpO1xuICAgICAgICBjb25zdCB4ID0gVXRpbC5Ub29sLnJhbmdlSW50KDAsIHRoaXMuY2VsbExpc3RbeV0ubGVuZ3RoLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IGNzID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLmNlbGxMaXN0LCBjYy52Mih4LCB5KSk7XG4gICAgICAgIGlmICgoY3MgJiYgIWNzLmlzRW1wdHkpICYmIChpc05vdExpbWl0IHx8ICghY3MuaXNCb21iICYmICF0aGlzLmlzSGF2YU9icyhjcy5wb3MpKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJhbmRvbUNlbGwoaXNOb3RMaW1pdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IENvbGxlY3RNb2RlbCgpOiBDb2xsZWN0TW9kZWwge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0TW9kZWxcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q29sbGVjdCgpOiBNYXA8c3RyaW5nLCBudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdE1vZGVsLm1haW5Db2xsZWN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGVja0lzTm9Jbml0Q3JlYXRlKHR5cGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdE5vQ3JlYXRlTGlzdC5nZXQodHlwZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJhbmRvbUNlbGxUeXBlKCk6IENlbGxUeXBlIHtcbiAgICAgICAgbGV0IHR5cGU6IENlbGxUeXBlID0gQ2VsbFR5cGUuRW1wdHk7XG4gICAgICAgIGlmICh0aGlzLmNoaXBTZXRMaXN0KSB7XG4gICAgICAgICAgICB0eXBlID0gdGhpcy5jaGlwU2V0TGlzdFtVdGlsLlRvb2wucmFuZ2VJbnQoMCwgdGhpcy5jaGlwU2V0TGlzdC5sZW5ndGggLSAxKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBHcm91bmRMaXN0KCk6IEFycmF5PEFycmF5PEdyb3VuZENlbGxNb2RlbD4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdW5kTW9kZWwuZ2V0R3JvdXBDZWxsTGlzdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgQ2VsbExpc3QoKTogQXJyYXk8QXJyYXk8Q2VsbE1vZGVsPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jZWxsTGlzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IExvY2soKTogTG9ja0N0cmwge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NrO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgVXBHcm91bmRMaXN0KCk6IEFycmF5PEFycmF5PFVwR3JvdW5kQ2VsbE1vZGVsPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy51cEdyb3VuZE1vZGVsLmdldFVHcm91cENlbGxMaXN0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVwR3JvdW5kTW9kZWwoKTogVXBHcm91bmRNb2RlbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwR3JvdW5kTW9kZWw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRvcFBvc2l0aW9uKG1hcEluZGV4OiBudW1iZXIpOiBjYy5WZWMyIHtcbiAgICAgICAgcmV0dXJuIENvbW1vbi5nZXRQb3MoMCwgMCwgbWFwSW5kZXgpO1xuICAgIH1cblxuICAgIC8qKuiOt+WPluWNoOeUqOWkmuS4quagvOWtkOeahOaUtumbhueJqeaOp+WItuWZqCAqL1xuICAgIHB1YmxpYyBnZXRNZ01vZGVsKCk6IE11bHRpcGxlR3JpZENvbE1vZGVsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWdNb2RlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0THZEYXRhKCk6IElMZXZlbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmx2RGF0YTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0R3JpZFNpemUoKTogeyBXOiBudW1iZXIsIEg6IG51bWJlciB9IHtcbiAgICAgICAgcmV0dXJuIEdhbWVNb2RlbC5HcmlkU2l6ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwRGF0YXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtYXBJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwSW5kZXg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtYXBDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwQ291bnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldExvbmdIZWlnaHQob3B0OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNMb25nSGVpZ2h0ID0gb3B0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0xvbmdNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0xvbmdIZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoq5qOA5rWL5b2T5YmN5piv5ZCm5pyJ5q2j5Zyo5o6J6JC95Lit55qE54mp5ZOBLOivt+aQremFjeWumuaXtuWZqOS9v+eUqCAqL1xuICAgIHByaXZhdGUgY2hlY2tIYXZlRmFsbGluZygpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5mYWxsRGljdC5zaXplID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5DZWxsRGljdC5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICYmICFjZWxsLmlzRW1wdHkgJiYgKGNlbGwuaXNGYWxsIHx8IGNlbGwuaXNEZWF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIC8vIHRoaXMuZGVhdGhEaWN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIC8vICAgICBpZiAoaXRlbSAmJiAoaXRlbS5pc0VtcHR5IHx8IGl0ZW0uaXNEZXN0b3J5ZWQgfHwgaXRlbS5pc1JlbW92ZWQoKSkpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmRlYXRoRGljdC5kZWxldGUoaXRlbSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyByZXR1cm4gKHRoaXMuZmFsbERpY3Quc2l6ZSA+IDAgfHwgdGhpcy5kZWF0aERpY3Quc2l6ZSA+IDApIFxuICAgIH1cblxuICAgIC8qKuajgOa1i1nkuIrmlrnkuIDkuKrkuI3mmK/kuLpudWxs55qE5YWD57SgICovXG4gICAgcHJpdmF0ZSBjaGVja1VwTm90Q2VsbEJ5UG9zKHBvczogY2MuVmVjMik6IENlbGxNb2RlbCB7XG4gICAgICAgIGlmIChVdGlsLlRvb2wuaXNOdWxsKHBvcykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVwUG9zID0gcG9zLmFkZChjYy52MigwLCAtMSkpO1xuICAgICAgICBjb25zdCB1cEl0ZW0gPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIHVwUG9zKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGlmICghdXBJdGVtICYmIHVwUG9zLnkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja1VwTm90Q2VsbEJ5UG9zKHVwUG9zKTtcbiAgICAgICAgfSBlbHNlIGlmICh1cEl0ZW0gLyomJiAhdGhpcy5pc0hhdmFTcGUodXBJdGVtLnBvcykqLykge1xuICAgICAgICAgICAgcmVzdWx0ID0gdXBJdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAgKiDmo4DmtYvmmK/lkKbmnInljLnphY3nmoTmtojpmaTop4TliJkgXG4gICAgICAgKiBAcGFyYW0gcG9zIOajgOa1i+eahOeCuVxuICAgICAgICogQHBhcmFtIGNrTW9kZWwg5qOA5rWL55qE57G75Z6LKOWFvOWuueaJi+WKqOaMh+Wumuexu+WeiylcbiAgICAgICAqIEBwYXJhbSBtYXBJbmRleCDmo4DmtYvnmoTlnLDlm77kuIvmoIco5YW85a655aSa5Zyw5Zu+5qih5byPKVxuICAgICAgICogQHJldHVybnMgLi4uLi5cbiAgICAgICAqL1xuICAgIHB1YmxpYyBjaGVja1BvaW50KHBvczogY2MuVmVjMiwgY2tNb2RlbDogQ2VsbE1vZGVsID0gbnVsbCwgbWFwSW5kZXg6IG51bWJlciA9IG51bGwpOiB7IGNsb3NlQXJ5OiBTZXQ8Q2VsbE1vZGVsPiwgYm9tYlR5cGU6IENlbGxUeXBlIH0ge1xuXG4gICAgICAgIGxldCBjb250YWluZXI6IFNldDxDZWxsTW9kZWw+ID0gbnVsbDtcbiAgICAgICAgbGV0IGJvbWJUeXBlOiBDZWxsVHlwZSA9IG51bGw7XG4gICAgICAgIGxldCBpc1NxdWFyZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuY2VsbExpc3Q7XG5cbiAgICAgICAgaWYgKG1hcEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxpc3QgPSB0aGlzLm1hcERhdGFzW21hcEluZGV4XS5jZWxsTGlzdFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1ck1vZGVsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShsaXN0LCBwb3MpO1xuICAgICAgICBpZiAoY3VyTW9kZWwpIHtcbiAgICAgICAgICAgIGlmIChjdXJNb2RlbC5pc0ludmluY2libGUgfHwgY3VyTW9kZWwuaXNFbXB0eSB8fCBjdXJNb2RlbC5pc0dyb3VuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNIYXZhT2JzKHBvcywgbWFwSW5kZXgpICYmICFjdXJNb2RlbC5pc0JvbWIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBuZXcgU2V0PENlbGxNb2RlbD4oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBuZXcgU2V0PENlbGxNb2RlbD4oKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gY2tNb2RlbCA/IGNrTW9kZWwuZ2V0VHlwZSgpIDogY3VyTW9kZWwuZ2V0VHlwZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1dpdGhEaXJlY3Rpb24ocG9zLCB0eXBlLCByb3csIFtjYy52MigxLCAwKSwgY2MudjIoLTEsIDApXSwgY2tNb2RlbCwgbWFwSW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tXaXRoRGlyZWN0aW9uKHBvcywgdHlwZSwgY29sLCBbY2MudjIoMCwgMSksIGNjLnYyKDAsIC0xKV0sIGNrTW9kZWwsIG1hcEluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmIChja01vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuc2l6ZSA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuYWRkKGN1ck1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2wuc2l6ZSA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wuYWRkKGN1ck1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyb3cuc2l6ZSA9PSAwICYmIGNvbC5zaXplID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYm9tYlR5cGUgPSB0aGlzLmdldEJvbWJUeXBlKHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICAvL+WIpOaWreaYr+WQpuaYr+Wbm+aWuTrmmK/kuKrmipjop5LlubbkuJTmlpzlr7nop5LmmK/nm7jlkIwgIOmjnuaculxuICAgICAgICAgICAgICAgIGlmIChjb2wuc2l6ZSA+PSAyICYmIHJvdy5zaXplID49IDIgJiYgIWJvbWJUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNxdWFyZUNlbGwgPSBDb21tb24uZ2V0U3F1YXJlU2luZ2xlQ2VsbChjb2wsIHJvdywgdHlwZSwgY3VyTW9kZWwucG9zLCBsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxdWFyZUNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hZGQoc3F1YXJlQ2VsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBib21iVHlwZSA9IENlbGxUeXBlLkJvbWI0XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NxdWFyZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocm93LnNpemUgPj0gdGhpcy5taW5FeGVjTnVtIHx8IGlzU3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBuZXcgU2V0PENlbGxNb2RlbD4oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sLnNpemUgPj0gdGhpcy5taW5FeGVjTnVtIHx8IGlzU3F1YXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbC5mb3JFYWNoKG1vZGVsID0+IGNvbnRhaW5lci5hZGQobW9kZWwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLnNpemUgPCB0aGlzLm1pbkV4ZWNOdW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lciA/IHsgY2xvc2VBcnk6IGNvbnRhaW5lciwgYm9tYlR5cGUgfSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1R5cGVNYXRjaGluZyh0eXBlOiBDZWxsVHlwZSwgbmV4dENlbGw6IENlbGxNb2RlbCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGlmICghbmV4dENlbGwuaXNKdXN0Qm9tYkVsaW1hdGUgJiYgdHlwZSA9PSBuZXh0Q2VsbC5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKirmoLnmja7mlrnlkJHpgJLlvZLlr7vmib7lj6/mtojpmaTlhYPntKAgKi9cbiAgICBwcml2YXRlIGNoZWNrV2l0aERpcmVjdGlvbihwb3M6IGNjLlZlYzIsIHR5cGU6IENlbGxUeXBlLCBjb250YWluZXI6IFNldDxDZWxsTW9kZWw+LCBkaXI6IGNjLlZlYzJbXSwgY2tNb2RlbDogQ2VsbE1vZGVsID0gbnVsbCwgbWFwSW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmNlbGxMaXN0O1xuICAgICAgICBpZiAobWFwSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgbGlzdCA9IHRoaXMubWFwRGF0YXNbbWFwSW5kZXhdLmNlbGxMaXN0XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IGRpci5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRQb3MgPSBjYy52Mihwb3MuYWRkKGRpcltpXSkpO1xuICAgICAgICAgICAgY29uc3QgbmV4dE1vZGVsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShsaXN0LCBuZXh0UG9zKTtcbiAgICAgICAgICAgIGlmIChkaXJbaV0ueSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXBJdGVtID0gdGhpcy5jaGVja1VwTm90Q2VsbEJ5UG9zKHBvcyk7XG4gICAgICAgICAgICAgICAgaWYgKHVwSXRlbSAmJiAodXBJdGVtLmlzRmFsbGluZygpICYmIHVwSXRlbS5nZXRUeXBlKCkgPT0gdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udGFpbmVyLmNsZWFyKCk7IFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5leHRNb2RlbCB8fCAobmV4dE1vZGVsICYmIG5leHRNb2RlbC5pc0VtcHR5KSB8fCB0aGlzLmlzSGF2YU9icyhuZXh0UG9zLCBtYXBJbmRleCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChja01vZGVsICYmICh0aGlzLmlzSGF2YU9icyhuZXh0UG9zLCBtYXBJbmRleCkgfHwgVXRpbC5Ub29sLmNvbXBhcmVWMihuZXh0UG9zLCBja01vZGVsLnBvcykpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5leHRNb2RlbC5pc0RlYXRoICYmICFuZXh0TW9kZWwuaXNGYWxsaW5nKCkgJiYgIW5leHRNb2RlbC5pc1BvcnRhbGluZyAmJiB0aGlzLmlzVHlwZU1hdGNoaW5nKHR5cGUsIG5leHRNb2RlbCkgJiYgIWNvbnRhaW5lci5oYXMobmV4dE1vZGVsKSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGQobmV4dE1vZGVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrV2l0aERpcmVjdGlvbihuZXh0TW9kZWwucG9zLCB0eXBlLCBjb250YWluZXIsIGRpciwgY2tNb2RlbCwgbWFwSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW5kQ2hlY2tQb2ludChjZWxsQXJ5OiBBcnJheTxDZWxsTW9kZWw+KTogQXJyYXk8Q2VsbE1vZGVsPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gY2VsbEFyeS5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBjZWxsQXJ5W2ldO1xuICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICBDb21tb24uRGlyNC5mb3JFYWNoKGRpciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRQb3MgPSBjZWxsLnBvcy5hZGQoZGlyKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dENlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIG5leHRQb3MpO1xuICAgICAgICAgICAgICAgICAgICAvL+acieWPr+iDveS8muatu+W+queOr35cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsICYmIG5leHRDZWxsLmdldFR5cGUoKSA9PSBjZWxsLmdldFR5cGUoKSAmJiBjZWxsQXJ5LmluZGV4T2YobmV4dENlbGwpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXh0Q2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMCA/IHRoaXMuX2VuZENoZWNrUG9pbnQoY2VsbEFyeS5jb25jYXQocmVzdWx0KSkgOiBjZWxsQXJ5O1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgX2VuZENoZWNrUG9pbnQocG9zOiBjYy5WZWMyKTogU2V0PENlbGxNb2RlbD4ge1xuICAgIC8vICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLmNlbGxMaXN0LCBwb3MpO1xuICAgIC8vICAgICBsZXQgcmVzdWx0ID0gbmV3IFNldDxDZWxsTW9kZWw+KCk7XG5cblxuICAgIC8vICAgICBpZiAoY2VsbCkge1xuICAgIC8vICAgICAgICAgQ29tbW9uLkRpcjQuZm9yRWFjaChkaXIgPT4ge1xuICAgIC8vICAgICAgICAgICAgIGNvbnN0IG5leHRQb3MgPSBwb3MuYWRkKGRpcik7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgbmV4dENlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuY2VsbExpc3QsIG5leHRQb3MpO1xuICAgIC8vICAgICAgICAgICAgIGlmIChuZXh0Q2VsbCAmJiBuZXh0Q2VsbC5nZXRUeXBlKCkgPT0gY2VsbC5nZXRUeXBlKCkgJiYgKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIC8v5Yy56YWNflxuICAgIC8vICAgICAgICAgICAgICAgICByZXN1bHQuYWRkKG5leHRDZWxsKVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0pXG4gICAgLy8gICAgIH1cblxuXG4gICAgLy8gICAgIHJldHVybjtcbiAgICAvLyB9XG5cbiAgICBwdWJsaWMgZ2V0IENlbGxEaWN0KCk6IFNldDxDZWxsTW9kZWw+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbERpY3Q7XG4gICAgfVxuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKui3n+WFg+e0oOWKn+iDveebuOWFsyAg5b6F5oq95Ye6Ki9cblxuICAgIC8qKuaYr+WQpuacieeJueauiumBruaMoeeJqSAqL1xuICAgIHB1YmxpYyBpc0hhdmFTcGUocG9zOiBjYy5WZWMyLCBpbmRleDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBjb25zdCB1cENlbGwgPSB0aGlzLmdldFVwR3JvdW5kQ2VsbChwb3MsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHVwQ2VsbCA/IHVwQ2VsbC5pc0hhdmFTcGUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKirkuIrlsYLpmpznoo3nianmmK/lkKblj6/ku6Xnp7vliqggICovXG4gICAgcHVibGljIHVwQ2VsbElzQ2FuTW92ZShwb3M6IGNjLlZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdXBDZWxsID0gdGhpcy5nZXRVcEdyb3VuZENlbGwocG9zKTtcbiAgICAgICAgcmV0dXJuICghdXBDZWxsIHx8IHVwQ2VsbCAmJiB1cENlbGwuaXNDYW5GYWxsKCkpO1xuICAgIH1cblxuICAgIC8qKuS4gOWdl+agvOaYr+WQpuaciemanOeijeeJqSwgICovXG4gICAgcHVibGljIGlzSGF2YU9icyhwb3M6IGNjLlZlYzIsIGluZGV4OiBudW1iZXIgPSBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHVwQ2VsbCA9IHRoaXMuZ2V0VXBHcm91bmRDZWxsKHBvcywgaW5kZXgpO1xuICAgICAgICByZXR1cm4gdXBDZWxsID8gdXBDZWxsLmlzT2JzIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLyoq5piv5ZCm5piv5Zyw6Z2i6Zqc56KNKOawtOmdouS7gOS5iOeahCkgKi9cbiAgICBwdWJsaWMgaXNIb2xkKHBvczogY2MuVmVjMiwgaW5kZXg6IG51bWJlciA9IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZ3JvdW5kQ2VsbCA9IHRoaXMuZ2V0R3JvdW5kQ2VsbChwb3MsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGdyb3VuZENlbGwgPyBncm91bmRDZWxsLmlzSG9sZCA6IHRydWU7XG4gICAgfVxuXG4gICAgLyoq5qOA5rWL6L+Z5Z2X5Zyw6Z2i5piv5ZCm5piv5Y+v56m/6YCPICovXG4gICAgcHVibGljIGdldE5vdFBhc3NibGVQb3NzKG5leHRQb3M6IGNjLlZlYzIpOiBjYy5WZWMyIHtcbiAgICAgICAgY29uc3QgZ2MgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuR3JvdW5kTGlzdCwgbmV4dFBvcyk7XG4gICAgICAgIGlmIChnYyAmJiBnYy5pc1Bhc3NhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXROb3RQYXNzYmxlUG9zcyhuZXh0UG9zLmFkZChjYy52MigwLCAxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0UG9zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOa1i+S4gOS4queCueaYr+WQpuaYr+i+ueeVjFxuICAgICAqIEBwYXJhbSBwb3MgXG4gICAgICovXG4gICAgcHVibGljIGlzQm9yZGVyKHBvczogY2MuVmVjMikge1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICAvLyBpZiAoTS5ydW50aW1lLkdhbWVTdGF0ZSA9PSBHYW1lU3RhdGUuRW5kKSB7XG4gICAgICAgIC8vICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgY29uc3QgZ2NlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgcG9zKTtcbiAgICAgICAgaWYgKGdjZWxsKSB7XG4gICAgICAgICAgICAvL+WmguaenOaYr+S4qumanOeijeeJqSzlubbkuJTkuI3orqnpgJrov4dcbiAgICAgICAgICAgIGlmIChnY2VsbC5pc0hvbGQgfHwgZ2NlbGwuZ2V0VHlwZSgpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/lpoLmnpzkuIvpnaLpgqPkuKrmmK/lj6/ku6XpgJrov4fnmoRcbiAgICAgICAgICAgIGlmIChnY2VsbC5pc1Bhc3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDkuIvkuIDkuKrnm67moIfngrnmmK/lkKblj6/ku6XmjonokL0hP1xuICAgICogQHBhcmFtIG5leHRQb3Mg55uu5qCH54K55Z2Q5qCHIVxuICAgICogQHBhcmFtIGlzRmFsbGluZyDmmK/lkKbluKbpgJ/luqbmo4DmtYshXG4gICAgKiBAcmV0dXJucyDmmK/lkKblj6/ku6UgP1xuICAgICovXG4gICAgcHVibGljIGlzQ2FuRmFsbChuZXh0UG9zOiBjYy5WZWMyLCBzZWxmUG9zOiBjYy5WZWMyLCBpc0ZhbGxpbmc6IGJvb2xlYW4gPSB0cnVlLCBpc0NyZWF0ZUJvbWI6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8v5piv5ZCm5bey57uP5LiK6ZSBXG4gICAgICAgIGNvbnN0IGlzTG9ja2VkID0gdGhpcy5sb2NrLmlzTXlMb2NrZWQobmV4dFBvcywgc2VsZlBvcyk7XG4gICAgICAgIC8v5piv5ZCm5Y+v5Lul55u05o6l6YCa6L+HLOayoeaciemanOeijeeJqVxuICAgICAgICBjb25zdCBpc1Bhc3NhYmxlID0gdGhpcy5pc1Bhc3NhYmxlKG5leHRQb3MsIHNlbGZQb3MpO1xuICAgICAgICAvL+aYr+WQpuacieaViFxuICAgICAgICBjb25zdCBpc0ludmFsaWQgPSB0aGlzLl9pc0ludmFsaWRDZWxsKG5leHRQb3MsIGlzRmFsbGluZywgaXNDcmVhdGVCb21iKTtcblxuICAgICAgICByZXR1cm4gaXNMb2NrZWQgJiYgaXNJbnZhbGlkICYmIGlzUGFzc2FibGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5oyH5a6a5L2N572u5YWD57Sg5piv5ZCm5bey57uP5peg5pWIXG4gICAgICogQHBhcmFtIHBvcyBcbiAgICAgKiBAcGFyYW0gaXNGYWxsaW5nIFxuICAgICAqL1xuICAgIHByaXZhdGUgX2lzSW52YWxpZENlbGwocG9zOiBjYy5WZWMyLCBpc0ZhbGxpbmc6IGJvb2xlYW4sIGlzQ3JlYXRlQm9tYjogYm9vbGVhbikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIHBvcyk7XG4gICAgICAgIGlmICghY2VsbCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGNlbGwuaXNFbXB0eSB8fCBjZWxsLmlzUmVtb3ZlZCgpIHx8IChpc0ZhbGxpbmcgPyBjZWxsLmlzRmFsbGluZygpIDogY2VsbC5pc0ZhbGwpIHx8IChpc0NyZWF0ZUJvbWIgJiYgY2VsbC5pc0RlYXRoKSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L2N572u5LiK5piv5ZCm5Y+v5Lul6YCa6KGMIVxuICAgICAqIEBwYXJhbSBwb3MgXG4gICAgICogQHBhcmFtIHNlbGZwb3Mg55So5LqO56m/6YCP6ZmN6JC95pe25qOA5rWL5piv5ZCm5L2N572u6KKr5LiK6ZSBXG4gICAgICovXG4gICAgcHVibGljIGlzUGFzc2FibGUobmV4dFBvczogY2MuVmVjMiwgc2VsZlBvczogY2MuVmVjMikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgLy8gaWYgKE0ucnVudGltZS5HYW1lU3RhdGUgPT0gR2FtZVN0YXRlLkVuZCkge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zdCBnY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5Hcm91bmRMaXN0LCBuZXh0UG9zKTtcbiAgICAgICAgY29uc3QgdWdjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLlVwR3JvdW5kTGlzdCwgbmV4dFBvcyk7XG4gICAgICAgIC8v5aaC5p6c5Zyw6Z2i5Li656m6LOWImeS4jeiDvemAmuihjFxuICAgICAgICBpZiAoIWdjZWxsKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvL+WmguaenOWcsOmdouaciemanOeijeeJqSzliJnkuI3og73pgJrooYxcbiAgICAgICAgaWYgKGdjZWxsICYmIHNlbGZQb3MpIHtcbiAgICAgICAgICAgIGlmIChnY2VsbC5pc0hvbGQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGVja0hhdmFXYWxsKG5leHRQb3MsIHNlbGZQb3MpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/lpoLmnpzmnInkuIrlsYLpmpznoo3niako5pyo566x562JKSzkuI3og73pgJrooYxcbiAgICAgICAgaWYgKHVnY2VsbCAmJiB1Z2NlbGwuaXNPYnMpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHJvdyDmqKpcbiAgICAgKiBAcGFyYW0gY29sIOerllxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0Qm9tYlR5cGUocm93OiBTZXQ8Q2VsbE1vZGVsPiwgY29sOiBTZXQ8Q2VsbE1vZGVsPik6IENlbGxUeXBlIHtcbiAgICAgICAgLy/lvanomblcbiAgICAgICAgaWYgKHJvdy5zaXplID49IDUgfHwgY29sLnNpemUgPj0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIENlbGxUeXBlLkJvbWI1O1xuICAgICAgICB9XG4gICAgICAgIC8v5ZyG5b2iXG4gICAgICAgIGlmIChyb3cuc2l6ZSA+PSAzICYmIGNvbC5zaXplID49IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBDZWxsVHlwZS5Cb21iMTtcbiAgICAgICAgfVxuICAgICAgICAvL+erlueCuOW8uVxuICAgICAgICBpZiAocm93LnNpemUgPj0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIENlbGxUeXBlLkJvbWIzO1xuICAgICAgICB9XG4gICAgICAgIC8v5qiq54K45by5XG4gICAgICAgIGlmIChjb2wuc2l6ZSA+PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4gQ2VsbFR5cGUuQm9tYjI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDbGlja1BvaW50Qm9tYlR5cGUoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAoc2l6ZSA+PSA0ICYmIHNpemUgPCA1KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBDZWxsVHlwZS5Cb21iMjtcbiAgICAgICAgfSBlbHNlIGlmIChzaXplID4gNSAmJiBzaXplIDwgNikge1xuICAgICAgICAgICAgcmVzdWx0ID0gQ2VsbFR5cGUuQm9tYjE7XG4gICAgICAgIH0gZWxzZSBpZiAoc2l6ZSA+IDYpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IENlbGxUeXBlLkJvbWI1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirot5/lhYPntKDnm7jlhbMgIOW+heaKveWHuiovXG5cbiAgICAvKirmo4DmtYvmmK/lkKbmnInlj6/ku6XkvKDpgIHnmoTnjqnmhI8hICovXG4gICAgcHJpdmF0ZSBjaGVja1BvcnRhbCgpIHtcbiAgICAgICAgLy8gY29uc3QgcE1hcCA9IHRoaXMudXBHcm91bmRNb2RlbC5nZXRBbGxQb3J0YWwoKTtcbiAgICAgICAgLy8gcE1hcC5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc3QgY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5jZWxsTGlzdCwgdmFsdWUuaW4pO1xuICAgICAgICAvLyAgICAgY2VsbCAmJiBjZWxsLm9uTXNnKE1zZ1R5cGUuUG9ydGFsKTtcbiAgICAgICAgLy8gfSlcbiAgICB9XG5cbiAgICAvKirmmK/lkKblj6/ku6XliJvlu7rlh7rnlJ/ngrnlhYPntKAgKi9cbiAgICBwcml2YXRlIGlzQ2FuQ3JlYXRlQm9ybkNlbGwocG9zOiBjYy5WZWMyLCBtb2RlbDogQ2VsbE1vZGVsKTogYm9vbGVhbiB7XG4gICAgICAgIC8v5piv5ZCm5pyJ6ZSBIFxuICAgICAgICBpZiAodGhpcy5sb2NrLmlzQm9yblBvc0xvY2tlZChwb3MpIHx8IHRoaXMubG9jay5pc0ZhbGxMb2NrZWQocG9zKS8qIXRoaXMubG9jay5pc015TG9ja2VkKHBvcywgcG9zLmFkZChjYy52MigwLCAtMSkpKSAqLykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8v5piv5ZCm5pyJ6Zqc56KN54mpXG4gICAgICAgIGlmICgodGhpcy5pc0hhdmFTcGUocG9zKSAmJiAhdGhpcy51cENlbGxJc0Nhbk1vdmUocG9zKSkgfHwgdGhpcy5pc0hvbGQocG9zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8v5piv5ZCm5riF55CG5bmy5YeAXG4gICAgICAgIGlmIChtb2RlbCAmJiAhbW9kZWwuaXNFbXB0eSAmJiAhbW9kZWwuaXNEZWF0aCAmJiAhbW9kZWwuaXNGYWxsaW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX25ld0NyZWF0ZVBvb2w6IFNldDxDZWxsTW9kZWw+ID0gbmV3IFNldCgpO1xuXG4gICAgcHVibGljIHJlbW92ZU5ld0NyZWF0ZUNlbGwoY2VsbDogQ2VsbE1vZGVsKSB7XG4gICAgICAgIHRoaXMuX25ld0NyZWF0ZVBvb2wuZGVsZXRlKGNlbGwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjaGVja05lZWRDcmVhdGVOZXdDZWxsKHBvczogY2MuVmVjMiwgZ3JvdXBJZDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGJvcm5Nb2RlbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5jZWxsTGlzdCwgcG9zKTtcblxuICAgICAgICBpZiAodGhpcy5pc0NhbkNyZWF0ZUJvcm5DZWxsKHBvcywgYm9ybk1vZGVsKSkge1xuICAgICAgICAgICAgdGhpcy5sb2NrLmxvY2tCb3JuUG9zKHBvcyk7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5jcmVhdGVDZWxsKHsgY2ZnOiBudWxsLCBwb3M6IHBvcy5hZGQoY2MudjIoMCwgLTEpKSwgY3JlYXRlVHlwZTogQ3JlYXRlVHlwZS5Ccm9uLCBpc0luc2VydDJBcnk6IGZhbHNlIH0pO1xuICAgICAgICAgICAgdGhpcy5hZGRGYWxsQ2VsbChjZWxsLCBjYy52MigwLCAxKSwgZ3JvdXBJZCk7XG4gICAgICAgICAgICB0aGlzLl9uZXdDcmVhdGVQb29sLmFkZChjZWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBfaXNCb3JuKHBvczogY2MuVmVjMikge1xuICAgICAgICBjb25zdCBncm91bmQgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKHRoaXMuR3JvdW5kTGlzdCwgcG9zKTtcbiAgICAgICAgcmV0dXJuIGdyb3VuZCAmJiBncm91bmQuaXNCb3JuO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2VsbFVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5mYWxsRGljdCAmJiB0aGlzLmZhbGxEaWN0LnNpemUgPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5jZWxsTGlzdC5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xsID0gdGhpcy5jZWxsTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbGwubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGNvbGxbal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsICYmIGNlbGwuaXNGYWxsICYmICFjZWxsLmlzRGVzdG9yeWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnVwZGF0ZUZhbGwoZHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzQm9ybihjZWxsLnBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTmVlZENyZWF0ZU5ld0NlbGwoY2VsbC5wb3MsIGNlbGwuR3JvdXBJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbmV3Q3JlYXRlUG9vbCAmJiB0aGlzLl9uZXdDcmVhdGVQb29sLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXdDcmVhdGVQb29sLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgJiYgIWNlbGwuaXNEZXN0b3J5ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC51cGRhdGVGYWxsKGR0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXdDcmVhdGVQb29sLmRlbGV0ZShjZWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGFzay51cGRhdGUoZHQpO1xuICAgICAgICBpZiAoUnVudGltZU1nci5pbnMuR2FtZVN0YXRlICE9IEdhbWVTdGF0ZS5QYXVzZSkge1xuICAgICAgICAgICAgdGhpcy5jZWxsVXBkYXRlKGR0KTtcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==