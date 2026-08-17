import GameModel from "../Match3/Model/GameModel";
import { CellModel } from "../Match3/Model/CellModel";
import { Util } from "../../Base/Utils/Util";
import { CellType, NodePoolKey, ScoreConfig, Scene, MinOfflineTime } from '../Data/Const/Constant';
import NodePoolMgr from "../../Base/Manager/NodePoolMgr";
import SpinePlayerCtrl from "../../Base/CustomComponent/SpinePlayerCtrl";
import { ILevel } from "../Data/Interface/Level/ILevel";
import { CurrencyId } from "../../Base/BaseConst";
import M from "../../Base/Manager/M";


const backgrundInfo = {
    "idx_1": { "name": "bg", "type": "water", "cfg": "ext", "isWater": true },
    "idx_2": { "name": "bg", "type": "grass", "cfg": "ext", },
    "idx_3": { "name": "bg", "type": "sand", "cfg": "ext", } //
}

const GroundBorderInfo = {
    "0001": ["0001", cc.v2(1, 1)],
    "0010": ["0001", cc.v2(-1, 1)],
    "0100": ["0001", cc.v2(1, -1)],
    "1000": ["0001", cc.v2(-1, -1)],
    "0011": ["0011", cc.v2(1, 1)],
    "1100": ["0011", cc.v2(1, -1)],
    "0101": ["0101", cc.v2(1, 1)],
    "1010": ["0101", cc.v2(-1, 1)],
    "0111": ["0111", cc.v2(1, 1)],
    "1011": ["0111", cc.v2(-1, 1)],
    "1101": ["0111", cc.v2(1, -1)],
    "1110": ["0111", cc.v2(-1, -1)],
    "0110": ["0110", cc.v2(1, 1)],
    "1001": ["0110", cc.v2(-1, 1)]
}

export default class Common {

    public static preScene: string = null;
    public static curScene: string = null;
    public static GRID_H = 84;
    public static GRID_W = 84;
    public static CurrentCtrlView: cc.Node = null;
    public static Dir4 = [cc.v2(-1, 0), cc.v2(1, 0), cc.v2(0, 1), cc.v2(0, -1)];

    public static safeGet2ArrayValue<T>(data: T[][], pos: cc.Vec2): T {
        let result = null;
        if (pos && data[pos.y]) {
            result = data[pos.y][pos.x]
        }
        return result;
    }

    public static safeSet2ArrayValue<T>(list: T[][], pos: cc.Vec2, data: T) {
        list[pos.y] && (list[pos.y][pos.x] = data);
    }

    /**将界面坐标转换成网格坐标 */
    public static convetPos(pos, index: number = null): cc.Vec2 {
        let c_x = 0, c_y = 0;
        let gs = GameModel.GridSize;
        if (index != null) {
            gs = GameModel.ins.getMaps()[index].size;
        }
        pos.x = Math.round(pos.x);
        pos.y = Math.round(pos.y);
        if (gs.W % 2 == 0) {
            c_x = gs.W / 2 + Math.floor(pos.x / this.GRID_W);
        } else {
            c_x = (gs.W - 1) / 2 + Math.floor(pos.x / this.GRID_W + 0.5);
        }

        if (gs.H % 2 == 0) {
            c_y = gs.H / 2 - Math.ceil(pos.y / this.GRID_H);
        } else {
            c_y = (gs.H - 1) / 2 - Math.ceil(pos.y / this.GRID_H - 0.5);
        }
        return cc.v2(c_x, c_y);
    }

    /**网格坐标转换成界面坐标 */
    public static getPos(x, y, index: number = null): cc.Vec2 {
        let s_x, s_y, s_px, s_py;
        let gs = GameModel.GridSize;
        if (index != null) {
            gs = GameModel.ins.getMaps()[index].size;
        }
        s_px = 0.5; s_py = 0.5;
        if (gs.W % 2 == 0) {
            s_x = gs.W / 2;
        } else {
            s_x = (gs.W - 1) / 2; s_px = 0;
        }
        if (gs.H % 2 == 0) {
            s_y = gs.H / 2;
        } else {
            s_y = (gs.H - 1) / 2; s_py = 0;
        }
        return cc.v2(
            (x - s_x + s_px) * this.GRID_W,
            - (y - s_y + s_py) * this.GRID_H
        );
    }

    public static getBgInfo(bgIndex: number): { name: string, type: string, cfg: string, isWater: boolean } {
        return backgrundInfo[`idx_${bgIndex}`];
    }

    public static getGroundBorderInfo(key: string): Array<any> {
        return GroundBorderInfo[key];
    }

    /**
     * 从一个中心点获取周边的圆环行的目标
     * @param center 
     * @param depth 
     * @returns Cell Model List
     */
    public static getAroundCircleCells(center: cc.Vec2, depth: number = 1, isLast: boolean): Set<CellModel> {
        //周围一圈的方向参数     
        const rstAry: Set<CellModel> = new Set();
        if (center) {
            const rowNum = (depth * 2) + 1;
            const list = GameModel.ins.CellList;
            for (let j = 0; j < rowNum; j++) {
                const v = Math.ceil((j / 2));
                const v2 = ((j % 2) * -1) == 0 ? v : -v;
                //④个方向    
                const dirs = [cc.v2(depth, v2), cc.v2(v2, depth), cc.v2(-depth, v2), cc.v2(v2, -depth)]
                for (let i = 0; i < dirs.length; i++) {
                    const dir = dirs[i];
                    if (this.isBombRand(isLast, depth, dir)) {
                        const item = this.safeGet2ArrayValue(list, center.add(dir));
                        item && rstAry.add(item);
                    }
                }
            }
        }
        return rstAry;
    }

    /**
     * 获取一个坐标在基本中心坐标的方向
     * @param targetPos 
     * @param selfPos 
     */
    public static getDirction(targetPos: cc.Vec2, selfPos: cc.Vec2): cc.Vec2 {
        //确定上下 
        let y = 0
        if (selfPos.y < targetPos.y)
            y = 1;
        else if (selfPos.y > targetPos.y)
            y = -1;
        //确定左右
        let x = 0
        if (selfPos.x < targetPos.x)
            x = 1;
        else if (selfPos.x > targetPos.x)
            x = -1;

        return cc.v2(x, y);
    }

    public static convertCurWorldPos(pos: cc.Vec2): cc.Vec2 {
        return this.CurrentCtrlView && this.CurrentCtrlView.convertToWorldSpaceAR(pos);
    }

    public static getWorldPos(self: cc.Node) {
        let pos = null;
        if (self && self.parent) {
            pos = self.parent.convertToWorldSpaceAR(self.position);
        }
        return pos;
    }

    /**拿一个指定点的周围的元素 */
    public static getRoundOnePos(pos: cc.Vec2): cc.Vec2 {
        let newPos = null;
        for (let i = this.Dir4.length; i--;) {
            const p = pos.add(this.Dir4[i]);
            const cell = this.safeGet2ArrayValue(GameModel.ins.CellList, p)
            if (p.x >= 0 && p.y >= 0 && cell && !cell.isEmpty && !cell.isBomb &&
                !GameModel.ins.isHavaSpe(cell.pos) && !GameModel.ins.isHold(cell.pos)) {
                newPos = p;
                break;
            }
        }
        return newPos;
    }

    public static setAlignment(node: cc.Node, dir: string, value: number) {
        let w = node.getComponent(cc.Widget);
        if (!w) {
            w = node.addComponent(cc.Widget);
        }
        const letter = dir[0].toUpperCase();
        w[`isAlign${letter}${dir.substring(1, dir.length)}`] = true;
        w[dir] = value;
        w.updateAlignment();
    }

    public static getRes<T>(path, type): Promise<T> {
        return new Promise((resolve) => {
            cc.loader.loadRes(path, type, (err, res) => {
                if (err || !res) {
                    console.error(err ? err : 'loadRes res is null!');
                    return resolve(null);
                }
                resolve(res);
            })
        })
    }

    public static getRemotPic(url, size?: cc.Size, type: string = 'jpg'): Promise<cc.SpriteFrame> {
        return new Promise((resolve) => {
            cc.loader.load({ url, type }, (err, tex) => {
                if (err || !tex) {
                    resolve(null);
                } else {
                    if (size) {
                        tex.height = size.width;
                        tex.width = size.height;
                    }
                    resolve(new cc.SpriteFrame(tex));
                }
            })
        })
    }

    private static isBombRand(isLast: boolean, depth: number, pos: cc.Vec2): boolean {
        return !isLast || Math.abs(pos.x) != depth || Math.abs(pos.y) != depth
    }

    /**
     * 判断是否是一个特殊的正方形队形
     * @param col 竖的收集标本
     * @param row 横的收集标本
     * @param checkType 检测目标类型
     * @param checkPos 检测的下标
     * @param list 当前检测的棋盘
     */
    public static getSquareSingleCell(col: Set<CellModel>, row: Set<CellModel>, checkType: CellType, checkPos: cc.Vec2, list: CellModel[][]): CellModel {
        //找出消除点的夹角的2个元素 
        let mainArr = null
        let subArr = null;
        let mainKey = null;
        if (col.size > row.size) {
            mainArr = Array.from(col);
            subArr = Array.from(row);
            mainKey = 'y'
        } else {
            mainArr = Array.from(row);
            subArr = Array.from(col);
            mainKey = 'x'
        }
        const subKey = (mainKey == 'x' ? 'y' : 'x');
        let result = null;
        for (let i = mainArr.length; i--;) {
            const cell = mainArr[i];
            if (Math.abs(cell.pos[mainKey] - checkPos[mainKey]) == 1) {
                for (let j = subArr.length; j--;) {
                    const scell = subArr[j];
                    if (Math.abs(scell.pos[subKey] - checkPos[subKey]) == 1 &&
                        Math.abs(cell.pos[mainKey] - scell.pos[mainKey]) == 1) {
                        let targetPos = cc.v2(0, 0);
                        if (checkPos.x == cell.pos.x) {
                            targetPos.y = cell.pos.y
                        } else {
                            targetPos.y = scell.pos.y
                        }
                        if (checkPos.y == cell.pos.y) {
                            targetPos.x = cell.pos.x
                        } else {
                            targetPos.x = scell.pos.x
                        }
                        const target = Common.safeGet2ArrayValue(list, targetPos);
                        if (target && target.getType() == checkType) {
                            result = target;
                            i = 0;
                            break;
                        }
                    }
                }
            }
        }
        //根据夹角元素找出与消除点对角元素  
        return result;
    }

    public static isMergeBomb(bombType1: CellType, bombType2: CellType, type1: CellType, type2: CellType) {
        //tangtangtangtang 4种组合
        let result = false;
        if (type1 == bombType1 && type2 == bombType2 ||
            type1 == bombType2 && type2 == bombType1 ||
            ((type1 == bombType1 && type2 == bombType1) &&
                (type1 == bombType2 && type2 == bombType2))
        ) {
            result = true;
        }
        return result;
    }


    public static randomGetOneCell(): cc.Vec2 {
        const y = Util.Tool.rangeInt(0, GameModel.GridSize.H, false);
        const x = Util.Tool.rangeInt(0, GameModel.GridSize.W, false);
        const cell = this.safeGet2ArrayValue(GameModel.ins.CellList, cc.v2(x, y));
        if (!cell) {
            return this.randomGetOneCell();
        }
        return cell.pos;
    }

    /**
     * 设置一个sprite的灰色状态
     * @param opt 
     * @param node 
     */
    public static switchGray(opt: boolean, node: cc.Node) {
        // if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
        //     return;
        // }
        // if (node['isGray'] && opt || !node['isGray'] && !opt) {
        //     return;
        // }
        // let material;
        // let tmpMaterial: any = cc.Material;
        // let sprite = node.getComponent(cc.Sprite);
        // if (opt) {
        //     material = tmpMaterial.getInstantiatedMaterial(tmpMaterial.getBuiltinMaterial('2d-gray-sprite'), sprite);
        // } else {
        //     material = tmpMaterial.getInstantiatedMaterial(tmpMaterial.getBuiltinMaterial('2d-sprite', sprite), sprite);
        // }
        // node['isGray'] = opt;
        // sprite.setMaterial(0, material);
    }

    public static createSprite(key: NodePoolKey, frame: cc.SpriteFrame, parent: cc.Node = null): cc.Sprite {
        let node = NodePoolMgr.ins.getItem(key, null);
        const sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = frame;
        if (parent) {
            node.parent = parent;
        }
        return sprite
    }


    public static createEffPrefab(parent: cc.Node, key: NodePoolKey, prefab: cc.Prefab, pos: cc.Vec2 | cc.Vec3 = null): { node: cc.Node, ctrl: cc.Animation } {
        let node = null;
        if (key) {
            node = M.nodePool.getItem(key, prefab);
        } else {
            node = M.nodePool.createItem(prefab);
        }
        node.parent = parent;
        pos && node.setPosition(pos);
        const ctrl = node.getComponent(cc.Animation);
        return { node, ctrl };
    }


    public static createSpineNode(parent: cc.Node, prefab: cc.Prefab, key?: NodePoolKey, pos: cc.Vec2 | cc.Vec3 = null): { node: cc.Node, ctrl: SpinePlayerCtrl } {
        let node = null;
        if (key) {
            node = NodePoolMgr.ins.getItem(key, prefab);
        } else {
            node = NodePoolMgr.ins.createItem(prefab);
        }
        node.parent = parent;
        pos && node.setPosition(pos);
        const ctrl = node.getComponent(SpinePlayerCtrl);
        return { node, ctrl };
    }

    public static isBombType(type: CellType): boolean {
        return type >= CellType.Bomb1 && type < CellType.Bomb100;
    }

    public static parseRankData(value: number) {
        return { score: value & 0b11111111111111111111, level: value >> 20 }
    }

    public static stringifyRankData(lv: number, socre: number): number {
        return (lv << 20) | socre;
    }

    public static testGroundBorderDisplay(x: number, y: number, models, type) {
        return [!this.getStatusByType(x, y - 1, models, type),
        !this.getStatusByType(x, y + 1, models, type),
        !this.getStatusByType(x - 1, y, models, type),
        !this.getStatusByType(x + 1, y, models, type)]
    }

    public static getSpriteNameByType(x: number, y: number, models: any, type: any): string {
        let coff = '';
        coff += this.getStatusByType(x - 1, y - 1, models, type);
        coff += this.getStatusByType(x, y - 1, models, type);
        coff += this.getStatusByType(x - 1, y, models, type);
        coff += this.getStatusByType(x, y, models, type);
        return coff;
    }

    private static getStatusByType(x, y, models, type): number {
        let result = 1;
        if (!models[y]) {
            result = 0;
        } else if (!models[y][x]) {
            result = 0;
        } else if (models[y][x].getType() != type || models[y][x].isDeath) {
            result = 0;
        }
        return result;
    }

    public static execDelayTask(fun: Function, delayTime: number) {
        setTimeout(fun, delayTime * 1000);
    }

    public static getStringkey(pos: cc.Vec2): string {
        return `${pos.x}_${pos.y}`
    }

    public static getSpecialAddScoreByType(type: any): string {
        return ScoreConfig.Special[type];
    }

    public static getOfflineTime(lastOfflineTime: number, currentTime: number): number {
        const offlineTime = (currentTime - lastOfflineTime) / 1000 / 60
        if (offlineTime > MinOfflineTime) {
            return offlineTime
        }

        return 0
    }

    public static jumpScene(targetSceneName: string, lanuchedNext?, delayTime: number = 0) {
        if (targetSceneName !== this.curScene) {
            this.preScene = this.curScene;
        }
        this.curScene = targetSceneName;
        let time = delayTime * 1000;
        if (time > 0) {
            setTimeout(() => {
                cc.director.loadScene(targetSceneName, lanuchedNext);
            }, time);
        } else {
            cc.director.loadScene(targetSceneName, lanuchedNext);
        }
    }

    /** 单位转换 */
    static bytesToSize(bytes: number, isBlood: boolean = false): string {
        if (bytes < 10000) {
            return Math.floor(bytes).toString();
        }
        if (bytes === 0) return '0';
        let k = 1000, // or 1024
            sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'mm', 'nn', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'zz'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        let unit = '';
        if (i < sizes.length) {
            unit = sizes[i];
        } else {
            const numLenght = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (var index = 0; index < 1 + Math.floor(numLenght / 65); index++) {
                unit = unit + unit;
            }
        }
        if (isBlood) {
            return Math.abs(parseInt((bytes / Math.pow(k, i)).toPrecision(3))) + unit;
        } else {
            return (bytes / Math.pow(k, i)).toPrecision(3) + '' + unit;
        }
    }

    public static getCurrencyName(type: CurrencyId): string {
        return ['金币', '钻石', '能量'][type];
    }

    /**组合奖励信息 */
    public static getRewardArray(rewardData: any) {
        const arr: Array<{ type: Number, count: number }> = [];
        if (rewardData) {
            for (let key in rewardData) {
                if (key == 'box') {
                    for (let boxKey in rewardData[key]) {
                        const v = rewardData[key][boxKey];
                        arr.push({ type: Number(boxKey), count: v });
                    }
                } else {
                    arr.push({ type: Number(key), count: rewardData[key] });
                }
            }
        }
        return arr;
    }
}

window["Common"] = Common;