import { CellBase, MsgType } from "./CellBase";
import { CellModel } from "./CellModel";
import ItemBasicCellCtrl from "../View/ItemBasicCellCtrl";
import GameModel from "./GameModel";
import Common from "../../Common/Common";
import RuntimeMgr from "../../Data/RuntimeMgr";
import { CellType, ElimateType, NodePoolKey } from "../../Data/Const/Constant";
import { GapTime } from "../../Data/Const/TimeConfig";
import { Chipset } from "../../Data/Interface/Level/ILevel";
import EffLayerCtrl from "../View/EffLayerCtrl";

export class BombModel extends CellBase<CellType, ItemBasicCellCtrl> {

    constructor() {
        super();
        this.type = null;
    }

    public init(type: any, x?: number, y?: number) {
        this.type = type;
    }

    public async execBomb(bombCell: CellModel, type: CellType = null, groupId: number = null) {

        if (bombCell.getType() == CellType.Bomb5 && type == null) return;
        const closeAry = this.getBombCloseAry(bombCell.getType(), bombCell.pos, type);
        if (bombCell.isDeath && closeAry.size == 0 && bombCell.getType() != CellType.Bomb4) {
            bombCell.isBomb = false;
            bombCell.extCtrl.elimate(1, null)
            return;
        }
        const keepTime = this.getBombDelayExecDestoryTime(bombCell.getType());
        const boomLevel = this.getBombLv(this.type);

        // await this.playBombEff(this.type); 
        GameModel.ins.execElimate(bombCell, closeAry, <any>bombCell.getType(), boomLevel, keepTime, groupId);
    }

    private _execOneBombByPos(type: CellType, pos: cc.Vec2) {
        if (Common.isBombType(type) && pos) {
            const closeAry = this.getBombCloseAry(type, pos, type);
            const keepTime = this.getBombDelayExecDestoryTime(type);
            const boomLevel = this.getBombLv(this.type);
            const centerCell = Common.safeGet2ArrayValue(GameModel.ins.CellList, pos);
            GameModel.ins.execElimate(centerCell, closeAry, <any>type, boomLevel, keepTime);
        }
    }

    public onChangePos(pos: cc.Vec2) {

    }

    public onMsg(type: MsgType) {

    }

    public onBind() {

    }

    public onUnBind() {

    }



    /**
     * 获取炸弹延迟执行销毁动画的时间
     * @param type 
     */
    private getBombDelayExecDestoryTime(type: CellType): number {
        let time = null;
        switch (type) {
            case CellType.Bomb1:
                time = GapTime.NormalBombDelayElimate;
                break
            case CellType.Bomb4:
                time = GapTime.OctopusDelayElimate;
                break
            case CellType.Fish:
                time = GapTime.FishBombDelayElimate;
                break
        }
        return time;
    }

    private getBombLv(type: CellType): number {
        let lv = null;
        switch (type) {
            case CellType.Bomb1:
                lv = BOMBS_LEVEL[0];
                break;
            case CellType.Fish:
                lv = BOMBS_LEVEL[3];
                break;
            case CellType.Bomb2:
            case CellType.Bomb3:
                lv = type;
                break
        }
        return lv;
    }

    /**
     * 合计一个炸弹的范围
     * @param type 类型
     * @param pos 坐标
     * @param rainbowType 彩虹匹配的元素!
     */
    private getBombCloseAry(type: CellType, pos: cc.Vec2, rainbowType: CellType = null): Set<CellModel> {
        let closeAry = null;

        switch (type) {
            case CellType.Bomb1:        //圆形炸弹
                closeAry = this.getBombRangeCell(pos, 2);
                break;
            case CellType.Bomb2:        //横向炸弹
                closeAry = this.rowBomb(pos);
                break;
            case CellType.Bomb3:        //竖向炸弹
                closeAry = this.colBomb(pos);
                break;
            case CellType.Bomb5:        //彩虹炸弹
                if (!rainbowType) {
                    const chipset = GameModel.ins.getLvData().chipset;
                    let tempItem: Chipset = null;
                    chipset.forEach(item => {
                        if (item && item.type < CellType.IceCream && (!tempItem || item.percent > tempItem.percent)) {
                            tempItem = item;
                        }
                    })
                    rainbowType = tempItem.type;
                }
                closeAry = this.rainbow(rainbowType);
                break;
            case CellType.Bomb4:        //飞机
                closeAry = this.getBombRangeCell(pos, 0);
                break;
            case CellType.Fish:
                closeAry = this.getBombRangeCell(pos, 1);
                break;
        }
        return closeAry;
    }

    private _tempGroupId = null;
    public onBombMergeBomb(type1: CellType, type2: CellType, target: CellModel, groupId: number) {
        this._tempGroupId = groupId;
        if (Common.isMergeBomb(CellType.Bomb5, CellType.Bomb1, type1, type2)) {
            //棋盘上选择若干随机元素变成圆形炸弹，然后引爆
            console.error('彩虹圆爆!');
            this.fireRainbow(target, CellType.Bomb1);
        } else if (Common.isMergeBomb(CellType.Bomb5, CellType.Bomb2, type1, type2)) {
            //棋盘上选择若干随机元素变成横向炸弹，然后引爆。
            console.error('彩虹横爆!');
            this.fireRainbow(target, CellType.Bomb2);
        } else if (Common.isMergeBomb(CellType.Bomb5, CellType.Bomb3, type1, type2)) {
            //棋盘上选择若干随机元素变成竖向炸弹，然后引爆。 
            console.error('彩虹竖爆!');
            this.fireRainbow(target, CellType.Bomb3);
        } else if (Common.isMergeBomb(CellType.Bomb5, CellType.Bomb4, type1, type2)) {
            //棋盘上选择若干随机元素变成飞机，然后所有飞机引爆。 
            console.error('彩虹飞机爆!');
            this._caihongZhangyu(target, CellType.Bomb4);

        } else if (Common.isMergeBomb(CellType.Bomb5, CellType.Bomb5, type1, type2)) {
            //棋盘上所有元素被消除。 
            console.error('彩虹彩虹爆!');
            this.fireRainbow(target, CellType.Bomb5);
        } else if (Common.isMergeBomb(CellType.Bomb4, CellType.Bomb1, type1, type2)) {
            //飞机飞起，选择随机地点降落后，降落点圆形炸弹爆炸。
            console.error('飞机圆爆!');
            this.fireExecTypePlane(target, CellType.Bomb4, CellType.Bomb1);
        } else if (Common.isMergeBomb(CellType.Bomb4, CellType.Bomb2, type1, type2)) {
            //飞机飞起，选择随机地点降落后，降落点横向炸弹爆炸。
            console.error('飞机横爆!');
            this.fireExecTypePlane(target, CellType.Bomb4, CellType.Bomb2);
        } else if (Common.isMergeBomb(CellType.Bomb4, CellType.Bomb3, type1, type2)) {
            //飞机飞起，选择随机地点降落后，降落点竖向炸弹爆炸。
            console.error('飞机竖爆!');
            this.fireExecTypePlane(target, CellType.Bomb4, CellType.Bomb3);
        } else if (Common.isMergeBomb(CellType.Bomb4, CellType.Bomb4, type1, type2)) {
            //生成3个飞机并且激活。 
            console.error('章鱼章鱼!');
            this.fireThreePlane(target);
        } else if (Common.isMergeBomb(CellType.Bomb3, CellType.Bomb1, type1, type2)) {
            //形成三行宽的十字方向爆炸。
            console.error('三行十字爆!');
            this.threeColAndRow(target, 1);
        } else if (Common.isMergeBomb(CellType.Bomb3, CellType.Bomb2, type1, type2)) {
            //十字方向横竖爆破。
            console.error('十字爆!');
            this.colAndRow(target);
        } else if (Common.isMergeBomb(CellType.Bomb3, CellType.Bomb3, type1, type2)) {
            //十字方向横竖爆破。
            console.error('十字爆!');
            this.colAndRow(target);
        } else if (Common.isMergeBomb(CellType.Bomb2, CellType.Bomb1, type1, type2)) {
            //形成三行宽的十字方向爆炸。
            console.error('三行十字爆!');
            this.threeColAndRow(target, 0);
        } else if (Common.isMergeBomb(CellType.Bomb2, CellType.Bomb2, type1, type2)) {
            //十字方向横竖爆破。
            console.error('十字爆!');
            this.colAndRow(target, 101);
        } else if (Common.isMergeBomb(CellType.Bomb1, CellType.Bomb1, type1, type2)) {
            //形成7*7（去掉四个角）的范围的大爆炸。
            console.error('圆爆圆爆!');
            this.doubleRoundBomb(target);
        }
        this._tempGroupId = null;
    }

    private async doubleRoundBomb(target: CellModel) {
        const groupId = this._tempGroupId;
        target.extCtrl.playBombSingleDestoryEff(0, GapTime.BombMergeBombChangeTime, false, groupId);
        await EffLayerCtrl.ins.playBombAndBomb(Common.convertCurWorldPos(<any>target.extData.position));
        const closeAry = this.getBombRangeCell(target.pos, 3);
        const keepTime = this.getBombDelayExecDestoryTime(CellType.Bomb1);
        target.forcedResetType(CellType.Bomb1);
        GameModel.ins.execElimate(target, closeAry, ElimateType.DoubleBomb, this.getBombLv(CellType.Bomb1), keepTime, groupId);
    }

    // private centerFill(centerPos: cc.Vec2, closeAry: Set<CellModel>, isRow: boolean = false): CellModel {
    //     if (closeAry.size <= 0) return;
    //     let newCenterModel = null;
    //     if (isRow) {
    //         const ary = Array.from(closeAry);
    //         const dirs = [cc.v2(0, 1), cc.v2(0, -1)];
    //         for (let i = ary.length; i--;) {
    //             for (let j = dirs.length; j--;) {
    //                 const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, centerPos.add(dirs[j]));
    //                 if (cell && closeAry.has(cell)) {
    //                     newCenterModel = cell;
    //                     i = 0; break;
    //                 }
    //             }
    //         }
    //     } else {

    //     }
    //     return newCenterModel;
    // }

    private async threeColAndRow(target: CellModel, convertType: number) {
        const groupId = this._tempGroupId;

        target.extCtrl.playBombSingleDestoryEff(0, GapTime.BombMergeBombChangeTime, false, groupId);

        await EffLayerCtrl.ins.playBombAndFish(Common.convertCurWorldPos(<any>target.extData.position));

        /*
        if (convertType == 0) {
                //气泡鱼+箭鱼
                await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                NodePoolKey.hetuanAndJianyu,EffLayerCtrl.ins.hetuanAndJianyu,"jianyuHetun");
        }else if(convertType == 1){
               
        }*/

        let _closeAry: CellModel[] = [];
        let extInfo = [];
        for (let i = Common.Dir4.length; i--;) {
            const dir = Common.Dir4[i];
            const pos = target.pos.add(dir);
            let type = null;
            if (dir.x == 0) {
                type = CellType.Bomb2
            } else {
                type = CellType.Bomb3
            }
            const closeAry = this.getBombCloseAry(type, pos);
            const keepTime = this.getBombDelayExecDestoryTime(type);
            extInfo.push({ pos, keepTime, closeAry, type })
            _closeAry = _closeAry.concat(Array.from(closeAry))
        }
        for (let i = 2; i--;) {
            let type = i % 2 == 0 ? CellType.Bomb2 : CellType.Bomb3;
            const closeAry = this.getBombCloseAry(type, target.pos);
            const keepTime = this.getBombDelayExecDestoryTime(type);
            extInfo.push({ pos: target.pos, keepTime, closeAry, type })
            _closeAry = _closeAry.concat(Array.from(closeAry))
        }
        target.extCtrl.preDestory();
        GameModel.ins.execElimate(target, new Set(_closeAry), ElimateType.ThreeRowAndCol, extInfo, null, groupId);
    }


    private async colAndRow(target: CellModel, index: number = 0, isShowAni: boolean = true, eType: ElimateType = ElimateType.RowAndCol) {
        const groupId = this._tempGroupId;
        if (isShowAni) {
            /*
            if (index != 101) {
            await target.extCtrl.playComplexBombAni(null);
            }*/
            target.extCtrl.playBombSingleDestoryEff(0, GapTime.BombMergeBombChangeTime, false, groupId);
            await EffLayerCtrl.ins.playFishAndFish(Common.convertCurWorldPos(<any>target.extData.position));
        }

        /*
        if (index == 101) {
             //箭鱼+箭鱼
             await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
             NodePoolKey.hetuanAndJianyu,EffLayerCtrl.ins.hetuanAndJianyu,"jianyuJianyu");
        }*/

        const cs = [this.rowBomb(target.pos), this.colBomb(target.pos)];
        cs.forEach((closeAry, index) => {
            GameModel.ins.execElimate(target, closeAry, eType, (index == 0 ? CellType.Bomb2 : CellType.Bomb3), null, groupId);
        })
    }

    private async _caihongZhangyu(target: CellModel, convertType: CellType) {
        const groupId = this._tempGroupId;
        //await target.extCtrl.playComplexBombAni(null);
        target.extCtrl.playBombSingleDestoryEff(0, GapTime.BombMergeBombChangeTime, false, groupId);
        await EffLayerCtrl.ins.playHaimaAndZhangyu(Common.convertCurWorldPos(<any>target.extData.position));
        this.fireRainbow(target, convertType, groupId);
    }

    private async fireRainbow(target: CellModel, convertType: CellType, groupId: number = null) {
        if (!groupId) {
            groupId = this._tempGroupId;;
        }

        await target.extCtrl.playComplexBombAni(null);

        if (convertType == CellType.Bomb5) {

            //海马+海马
            // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
            //     NodePoolKey.HaimaAndHetun, EffLayerCtrl.ins.haimaAndHetuanPrefab, "haimaHaima");
            // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
            //     NodePoolKey.HaimaAndHaima, EffLayerCtrl.ins.haimaAndHaima, "haimaHaima");
            target.extCtrl.playBombSingleDestoryEff(0, GapTime.BombMergeBombChangeTime, false, groupId);
            await EffLayerCtrl.ins.playHaimaAndHaima(Common.convertCurWorldPos(<any>target.extData.position));

            RuntimeMgr.ins.pauseGame();
            const timeline = new gsap.TimelineMax();
            timeline.autoRemoveChildren = true;
            let count = 0;
            for (let i = 0; i < 50; i++) {
                const ary = Common.getAroundCircleCells(target.pos, i, false);
                if (ary.size == 0) break;
                count++;
                timeline.add(gsap.TweenLite.delayedCall(GapTime.DoubleRainbowWaves, () => {
                    count--;
                    GameModel.ins.execElimate(target, ary, ElimateType.All, count, null, groupId);
                }));
            }
        } else {

            target.extCtrl.playBombSingleDestoryEff(0.2, 0.2, false, groupId);
            if (convertType == CellType.Bomb1) {
                //气泡鱼+海马
                await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                    NodePoolKey.HaimaAndHetun, EffLayerCtrl.ins.haimaAndHetuanPrefab, "hetunHaima");
            } else if (convertType == CellType.Bomb2) {
                //箭鱼+海马
                await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                    NodePoolKey.HaimaAndHetun, EffLayerCtrl.ins.haimaAndHetuanPrefab, "jianyuHaima");
            }
            else if (convertType == CellType.Bomb4) {
                /*
                //章鱼+海马
                 await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                 NodePoolKey.HaimaAndHetun,EffLayerCtrl.ins.haimaAndHetuanPrefab,"zhangyuHaima");
                 */
            }

            const chipset = GameModel.ins.getLvData().chipset;
            let closeAry = null;

            for (let i = chipset.length; i--;) {
                const type = chipset[i].type;
                if (type < CellType.Banana) {
                    closeAry = this.rainbow(type);
                    if (closeAry.size > 5) {
                        break;
                    }
                }
            }
            closeAry.forEach((cell: CellModel) => {
                if (cell && cell.extCtrl && !GameModel.ins.isHavaSpe(cell.pos)) {
                    cell.isExecBomb = true;
                    cell.GroupId = groupId;
                    cell.extCtrl.change2Bomb(convertType);
                }
            });
        }
    }

    private async fireExecTypePlane(target: CellModel, type1: CellType, execType: CellType) {
        const groupId = this._tempGroupId;
        await target.extCtrl.playComplexBombAni(null);


        if (execType == CellType.Bomb2) {
            //章鱼+剑鱼
            // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
            //     NodePoolKey.ZhangyuAndJianyu, EffLayerCtrl.ins.zhangyuAndJianyu, "zhangyu_tiao_jianyu");

            // await EffLayerCtrl.ins.playZhangyuAndJianyu(Common.convertCurWorldPos(<any>target.extData.position));

        } else if (execType == CellType.Bomb1) {
            //章鱼+气泡鱼
            // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
            //     NodePoolKey.ZhangyuAndJianyu, EffLayerCtrl.ins.zhangyuAndJianyu, "zhangyu_tiao_hetun");

        }

        const closeAry = this.getBombCloseAry(type1, target.pos);
        target.forcedResetType(type1);

        GameModel.ins.execElimate(target, closeAry, <any>execType, execType, null, groupId);
    }

    private async fireThreePlane(target: CellModel) {
        const groupId = this._tempGroupId;
        //await target.extCtrl.playComplexBombAni(null);

        //章鱼+章鱼
        // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
        //     NodePoolKey.HaimaAndHetun, EffLayerCtrl.ins.haimaAndHetuanPrefab, "zhangyuZhangyu");

        //章鱼+章鱼
        await EffLayerCtrl.ins.playZhangyuAndZhangyu(Common.convertCurWorldPos(<any>target.extData.position));


        const timeline1 = new gsap.TimelineMax();
        timeline1.autoRemoveChildren = true;
        const closeAry = this.getBombCloseAry(target.getType(), target.pos);
        for (let i = 3; i--;) {
            timeline1.add(gsap.TweenLite.delayedCall(GapTime.ThreePlaneCreate, () => {
                GameModel.ins.execElimate(target, closeAry, ElimateType.ThreeOctopus, null, null, groupId);
            }));
        }
    }


    // public static test11111(bombPos: cc.Vec2, level: number): Set<CellModel> {
    //     const closeAry = new Set<CellModel>();
    //     const range = BOMBS_RANGE[level];//BOMBS_RANGE[this.type - 10];
    //     //找到中心
    //     const cy = (range.length - 1) / 2;
    //     const cells = GameModel.ins.CellList;
    //     for (let i = -cy; i <= cy; i++) {
    //         for (let j = -cy; j <= cy; j++) {
    //             if (i == 0 && j == 0) continue;
    //             if (range[i + cy][j + cy] == 1) {
    //                 const cellPos = cc.v2(bombPos.x + j, bombPos.y + i);
    //                 //边界的不能炸!
    //                 if (cellPos.x < 0 || cellPos.y < 0) continue;
    //                 const model = Common.safeGet2ArrayValue(cells, cellPos);
    //                 if (model && !model.isDeath /* && !model.isFalling()*/) {
    //                     closeAry.add(model);
    //                     GameModel.ins.Lock.unLockFallPos(cellPos);
    //                     GameModel.ins.Lock.unLockFallLockByKey(cellPos);
    //                 }
    //             }
    //         }
    //     }
    //     return closeAry;
    // }


    private getBombRangeCell(bombPos: cc.Vec2, level: number): Set<CellModel> {
        const closeAry = new Set<CellModel>();
        const range = BOMBS_RANGE[level];//BOMBS_RANGE[this.type - 10];
        //找到中心
        const cy = (range.length - 1) / 2;
        const cells = GameModel.ins.CellList;
        for (let i = -cy; i <= cy; i++) {
            for (let j = -cy; j <= cy; j++) {
                if (i == 0 && j == 0) continue;
                if (range[i + cy][j + cy] == 1) {
                    const cellPos = cc.v2(bombPos.x + j, bombPos.y + i);
                    //边界的不能炸!
                    if (cellPos.x < 0 || cellPos.y < 0) continue;

                    const cell = Common.safeGet2ArrayValue(cells, cellPos);
                    if (cell && !cell.isDeath /*&& !cell.isFalling()*/) {
                        closeAry.add(cell);
                        GameModel.ins.Lock.unLockFallPos(cellPos);
                        GameModel.ins.Lock.unLockFallLockByKey(cellPos);
                    }
                }
            }
        }
        return closeAry;
    }

    //横消 
    private rowBomb(pos: cc.Vec2): Set<CellModel> {
        const cmList = GameModel.ins.CellList;
        const closeAry = new Set<CellModel>(cmList[pos.y]);
        return closeAry
    }

    //竖消
    private colBomb(pos: cc.Vec2): Set<CellModel> {
        const cmList = GameModel.ins.CellList;
        const closeAry = new Set<CellModel>();
        for (let i = GameModel.GridSize.H; i--;) {
            const cm = Common.safeGet2ArrayValue(cmList, cc.v2(pos.x, i));
            cm && closeAry.add(cm);
        }
        return closeAry;
    }

    private rainbow(rainType: CellType): Set<CellModel> {
        //同色
        const cmList = GameModel.ins.CellList;
        const closeAry = new Set<CellModel>();
        for (let y = cmList.length; y--;) {
            const xList = cmList[y];
            for (let x = xList.length; x--;) {
                const cm = xList[x];
                if (cm && cm.getType() == rainType && !GameModel.ins.isHavaObs(cm.pos)) {
                    closeAry.add(cm);
                }
            }
        }
        return closeAry
    }

}


const BOMBS_LEVEL = [
    2, 2, 2, 1, 1, 1
];
const BOMBS_RANGE = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ], [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ], [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
    ], [
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
    ],
    [
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
    ]
]

