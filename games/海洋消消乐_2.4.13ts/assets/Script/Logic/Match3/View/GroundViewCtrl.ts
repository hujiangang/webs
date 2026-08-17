
import Common from '../../Common/Common';
import BaseView from "./BaseView";
import M from "../../../Base/Manager/M";
import ItemGroundCtrl from "./ItemGroundCtrl";
import { Event } from "../../Data/Const/Event";
import GroundCellModel from "../Model/GroundCellModel";
import { NodePoolKey, CellType, GroundType } from "../../Data/Const/Constant";
import { Gnome, ILevel, ILawnmower } from "../../Data/Interface/Level/ILevel";
import { CollectType } from "../Model/CollectModel";
import GameModel, { IGridData } from "../Model/GameModel";
import SpinePlayerCtrl from "../../../Base/CustomComponent/SpinePlayerCtrl";
import { GapTime } from "../../Data/Const/TimeConfig";
import CrabModel from "../Model/multipleGridCol/CrabModel";
import ActionCtrl from "../../Common/ActionCtrl";

const { ccclass, property } = cc._decorator;

interface IMonkeyTree { tree: SpinePlayerCtrl; pos: cc.Vec2, exp: number, remainLabel: cc.Label }

/**托盘基于中心的偏移量 */
const TrayOffset: cc.Vec2 = cc.v2(12, 45);

@ccclass
export default class GroundViewCtrl extends BaseView<GroundCellModel[][]> {

    @property([cc.SpriteFrame])
    borderFrames: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    middleFrames: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    waterFrames: cc.SpriteFrame[] = [];

    @property(cc.Node)
    borderParent: cc.Node = null;
    //地板之上树叶等之下(河道等..)
    @property(cc.Node)
    waterParent: cc.Node = null;
    //地板上遮住收集物的物品(树叶...等)
    @property(cc.Node)
    multFuncParent: cc.Node = null;

    @property(cc.Node)
    gnomeParent: cc.Node = null;

    @property(cc.Prefab)
    gnomePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    turtlesPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    crabPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    monkeyTreePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    groundBasePrefab: cc.Prefab = null;

    //用来做收集时动画使用!
    @property(cc.Prefab)
    gemPrefab: cc.Prefab = null;
    //萤火虫用来做收集时动画使用!
    @property(cc.Prefab)
    firefly: cc.Prefab = null;

    @property([cc.SpriteFrame])
    baseFrames: cc.SpriteFrame[] = [];

    private _cfg: ILevel = null;

    private _complexItemMap: Array<Array<cc.Node>> = null;

    /**当前地图类型 water grass */
    private type: string = null;

    private gnomeAry: { [inx: number]: cc.Node } = {};
    private crabAry: { [inx: number]: cc.Node } = {};
    private monkeyTreeAry: { [inx: number]: IMonkeyTree } = {};
    private turtlesAry: { [inx: number]: { ctrl: SpinePlayerCtrl, pos: cc.Vec2 } } = {};

    onLoad() { }

    public initView(models: GroundCellModel[][], data?: IGridData, cfg?: ILevel, groundType?: string) {
        super.initView(models);
        this.type = groundType;
        this._cfg = cfg;
        M.nodePool.create(NodePoolKey.GroundCell, this.groundBasePrefab, 150);
        if (GameModel.ins.isHaveGem) {
            M.nodePool.create(NodePoolKey.GemNode, this.gemPrefab, 20);
        }

        // M.nodePool.create(NodePoolKey.GroundMulti, this.ItemPrefab, 130);

        this.initBaseView(models);
        this.initGnome(data.mgModel.getConfig(CollectType.gnome));
        this.initTurtles(data.mgModel.getConfig(CollectType.turtles));
        this.initCrab(data.mgModel.getConfig(CollectType.crab));
        this.initMonkeyTree(cfg.monkeyTree);
        this.initLawnmower(cfg.lawnmower);
    }

    private initCrab(crabCfg: Array<Gnome>) {
        if (!crabCfg) return;
        for (let i = 0; i < crabCfg.length; i++) {
            const cfg = crabCfg[i];
            const node = M.nodePool.createItem(this.crabPrefab);
            const topPos = Common.getPos(cfg.x, cfg.y, cfg.index);
            const tmpScaleHeight = 20;
            node['cfg'] = cfg;
            node.parent = this.gnomeParent;
            node.x = topPos.x - Common.GRID_W / 2;
            node.y = topPos.y + Common.GRID_H / 2;

            node.setScale((Common.GRID_H - tmpScaleHeight) / (node.height / ((Math.floor(cfg.type / 2) + 1) * 2)));
            if (cfg.type % 2 == 0) {
                node.angle = 90;
                node.y -= (node.width * node.scale);
                cfg.type < 2 && (node.x += tmpScaleHeight)
            } else {
                cfg.type < 2 && (node.y -= tmpScaleHeight)
            }
            if (cfg.x < (GameModel.GridSize.W - 1) / 2) {
                const item = node.getChildByName('item');
                item.scaleX = -item.scaleX;
            }
            this.crabAry[i] = node;
        }
    }

    private initMonkeyTree(monkeyTreeCfg: Array<Gnome>) {
        if (!monkeyTreeCfg) return;
        for (let i = 0; i < monkeyTreeCfg.length; i++) {
            const cfg = monkeyTreeCfg[i];
            const pos = cc.v2(cfg.x, cfg.y);
            const data = this.createMonkeyTree(Common.getPos(pos.x, pos.y, cfg.index));
            data.pos = pos;
            data.exp = 0;
            data.remainLabel = cc.find('qipao/count', data.tree.node).getComponent(cc.Label);
            this.monkeyTreeAry[i] = data;
            this.updateMoneyTreeState(i);
        }
    }

    private initLawnmower(lawnmowerCfg: ILawnmower[]) {
        if (!lawnmowerCfg) return;
        for (let i = 0; i < lawnmowerCfg.length; i++) {
            const cfg = lawnmowerCfg[i];
            const pos = cc.v2(cfg.x, cfg.y);
            const groundCell = Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
            if (groundCell) {
                //锁定这个坐标!
                groundCell.change2TargetType(GroundType.Tuituji, cfg);
            }
            GameModel.ins.CollectModel.collectPowerCells[cfg.type] = groundCell;
        }
    }

    private initTurtles(turtlesCfg: Array<Gnome>) {
        if (!turtlesCfg) return;
        for (let i = 0; i < turtlesCfg.length; i++) {
            const cfg = turtlesCfg[i];
            const pos = Common.getPos(cfg.x, cfg.y, cfg.index);
            const result = Common.createSpineNode(this.gnomeParent, this.turtlesPrefab, null, pos.add(cc.v2(Common.GRID_W / 2, -Common.GRID_H / 2)));
            this.turtlesAry[i] = { ctrl: result.ctrl, pos: cc.v2(cfg.x, cfg.y) };
        }
    }

    private initGnome(gnomeCfg: Array<Gnome>) {
        if (!gnomeCfg) return;
        for (let i = 0; i < gnomeCfg.length; i++) {
            const cfg = gnomeCfg[i];
            const node = M.nodePool.createItem(this.gnomePrefab);
            const topPos = Common.getPos(cfg.x, cfg.y, cfg.index);
            const tmpScaleHeight = 20;

            node.parent = this.gnomeParent;
            node.x = topPos.x - Common.GRID_W / 2;
            node.y = topPos.y + Common.GRID_H / 2;
            node.setScale(Common.GRID_H / (node.height / ((Math.floor(cfg.type / 2) + 1) * 2)));
            if (cfg.type % 2 == 0) {
                node.angle = 90;
                node.y -= (node.width * node.scale - tmpScaleHeight * node.scale);
            }
            this.gnomeAry[i] = node;
        }
    }

    public playCrabAni(upLayer: cc.Node, index: number) {
        const item = this.crabAry[index];
        if (item) {
            item.parent = upLayer;
            item.setPosition(upLayer.convertToNodeSpaceAR(Common.getWorldPos(item)));
            const pxCtrl = item.getChildByName('item').getComponent(SpinePlayerCtrl);
            const cfg: Gnome = item['cfg'];
            let dir = cc.v2(-1, 0);
            M.event.send(Event.UI.UpdateInfoPanel, CollectType.crab);
            if (cfg.x < (GameModel.GridSize.W - 1) / 2) {
                dir.x = 1;
            }
            pxCtrl.play('pangxie2', 0, false, () => {
                item.destroy();
            });
            //开始执行消除操作! 
            this.scheduleOnce(() => {
                GameModel.ins.getMgModel().onComplet(CollectType.crab, dir.x, cc.v2(cfg.x, cfg.y));
                this.scheduleOnce(() => {
                    const m = GameModel.ins.getMgModel().getModel(CollectType.crab) as CrabModel
                    m && m.freeGrid(cc.v2(cfg.x, cfg.y), index);
                }, GapTime.CrabStartedFallGap);
            }, GapTime.CrabStartElimate);
        }
    }

    public playTurtlesAni(upLayer: cc.Node, index: number) {
        const item = this.turtlesAry[index];
        if (item) {
            item.ctrl.node.parent = upLayer;
            item.ctrl.play('haigui_run', 0, false, () => {
                // const targetPos = cc.v2(-1000, 700);
                const node = item.ctrl.node;
                // const rotation = Math.atan2(Math.abs(targetPos.y) - Math.abs(node.y), Math.abs(targetPos.x) - Math.abs(node.x)) / Math.PI * 180;
                // const a0 = cc.rotateTo(1, rotation);
                // const a1 = cc.callFunc(() => {
                //     //通知上面开始掉落!!!
                //     GameModel.ins.getGnomeModel().turtlesComplet(index, item.pos);
                // });
                // const a2 = cc.moveTo(2, targetPos);
                // const a3 = cc.callFunc(() => {
                node.destroy();
                // });
                // node.runAction(cc.sequence(a0, a1, a2, a3)); 
            });

            this.scheduleOnce(() => {
                M.event.send(Event.UI.UpdateInfoPanel, CollectType.turtles);
                GameModel.ins.getMgModel().onComplet(CollectType.turtles, index, item.pos);
            }, GapTime.TurtlesOver);
        }
    }

    public playFireflyAni(parent: cc.Node, selfPos: cc.Vec2, targetPos: cc.Vec2) {
        const node = M.nodePool.getItem(NodePoolKey.Firefly, this.firefly);
        node.parent = parent;
        node.setPosition(parent.convertToNodeSpaceAR(this.waterParent.convertToWorldSpaceAR(selfPos)));

        ActionCtrl.ins.runCollectGem(node, targetPos, parent).then(() => {
            M.nodePool.freeItem(NodePoolKey.Firefly, node);
            M.event.send(Event.UI.UpdateInfoPanel, CollectType.firefly);
        })
    }

    public playGemAni(parent: cc.Node, selfPos: cc.Vec2, targetPos: cc.Vec2) {
        const node = M.nodePool.getItem(NodePoolKey.GemNode, this.gemPrefab);
        node.parent = parent;
        node.setPosition(parent.convertToNodeSpaceAR(this.waterParent.convertToWorldSpaceAR(selfPos)));

        ActionCtrl.ins.runCollectGem(node, targetPos, parent).then(() => {
            M.nodePool.freeItem(NodePoolKey.GemNode, node);
            M.event.send(Event.UI.UpdateInfoPanel, CollectType.gem);
        })
    }

    public playGnomeAni(parent: cc.Node, index: number, targetPos: cc.Vec2) {
        const gn = this.gnomeAry[index];
        if (gn) {
            ActionCtrl.ins.runCollectGnome(gn, targetPos, parent).then(() => {
                gn.destroy();
                M.event.send(Event.UI.UpdateInfoPanel, CollectType.gnome);
            });
        }
    }

    public getGnomeAry(): { [inx: number]: cc.Node } {
        return this.gnomeAry;
    }

    /**
     * 获取老头收集物的移动距离
     * @param curView 
     * @param maskNode 
     */
    public checkCollectMoveDistance(curView: cc.Node, maskNode: cc.Node): number {
        let moveGap = 0;
        if (curView.height > 0) {
            //遍历检测所有的收集物是否有在中心的 
            for (let key in this.gnomeAry) {
                const gnomeNode = this.gnomeAry[key];
                const wp = gnomeNode.parent.convertToWorldSpaceAR(gnomeNode.position);
                const mp = maskNode.convertToNodeSpaceAR(wp);
                if (mp.y < 0 && mp.y < maskNode.height / 3) {
                    const distance = Math.abs(mp.y) + (gnomeNode.angle != 0 ? gnomeNode.width : gnomeNode.height) * gnomeNode.scale;
                    const maxDistance = (curView.height / 2 - curView.y) - maskNode.height / 2 + Common.GRID_H / 2
                    moveGap = distance > maxDistance ? maxDistance : distance;
                } else {
                    moveGap = 0;
                    break;
                }
            }
        }
        return moveGap;
    }

    private initBaseView(models: Array<Array<GroundCellModel>>) {
        const yLength = models.length;
        const xLength = models[0].length;
        let index = null;
        for (let y = 0; y <= yLength; y++) {
            for (let x = 0; x <= xLength; x++) {
                const gItem = models[y] ? models[y][x] : null;
                //显示地板
                let cmp: ItemGroundCtrl = null;
                if (gItem) {
                    if (index == null) {
                        index = gItem.getMapIndex();
                    }
                    let baseSprite: cc.Sprite = null;
                    if (gItem.getType() != null) {
                        const groundBase = M.nodePool.getItem(NodePoolKey.GroundCell, this.groundBasePrefab);
                        groundBase.setPosition(gItem.getPosition());
                        baseSprite = groundBase.getComponent(cc.Sprite);
                        this.setGroundSprite(baseSprite, x, y);
                        groundBase.parent = this.borderParent;
                        groundBase.zIndex = 2;
                    }
                    const node = M.nodePool.getItem(NodePoolKey.GroundMulti, this.ItemPrefab);
                    node['baseSprite'] = baseSprite;
                    node.parent = this.multFuncParent;
                    cmp = node.getComponent(ItemGroundCtrl);
                    cmp.init(gItem, this.borderParent);
                    gItem.extData = node;
                    gItem.extCtrl = cmp;
                }

                this.showComplexItem(x, y, GroundType.Water);
                // this.showComplexItem(x, y, GroundType.Ground);

                const borderCoff = this.getBorderSpriteName(x, y);
                if (Common.getGroundBorderInfo(borderCoff)) {
                    this.initBorderView(borderCoff, x, y, index);
                }
            }
        }
        // this.checkTray();
    }

    /**
     * 更新指定位置的复杂水/地块显示
     * @param pos 
     */
    public updateComlexIteamByPos(pos: cc.Vec2) {
        //删除指定点周围的显示
        // if (this._complexItemMap) {
        //     //删除位置的原始信息!
        //     const dirs = [cc.v2(0, 0), cc.v2(1, 0), cc.v2(0, 1), cc.v2(1, 1)];
        //     for (let index = 0; index < dirs.length; index++) {
        //         const targetPos = pos.add(dirs[index]);
        //         if (this._complexItemMap[targetPos.y]) {
        //             const targetNode = this._complexItemMap[targetPos.y][targetPos.x];
        //             M.nodePool.freeItem(NodePoolKey.ComplexGround, targetNode);
        //             this.showComplexItem(targetPos.x, targetPos.y, GroundType.Ground);
        //         }
        //     }
        // }
    }

    public showComplexItem(x: number, y: number, type: GroundType) {
        const groundCoff = Common.getSpriteNameByType(x, y, this.models, type);
        if (groundCoff != "0000") {
            this.initViewByType(groundCoff, x, y, type);
        }
    }

    /**设置地面的格子颜色! */
    private setGroundSprite(sprite: cc.Sprite, x: number, y: number) {
        let startIndex = 0;
        switch (this.type) {
            case 'water': startIndex = 0; break;
            case 'grass': startIndex = 2; break;
            case 'sand': startIndex = 4; break;
        }
        sprite.spriteFrame = this.baseFrames[startIndex];
        // if (y % 2 == 0) {
        //     if (x % 2 == 0) {
        //         sprite.spriteFrame = this.baseFrames[startIndex];
        //     } else {
        //         sprite.spriteFrame = this.baseFrames[startIndex + 1];
        //     }
        // } else {
        //     if (x % 2 == 1) {
        //         sprite.spriteFrame = this.baseFrames[startIndex];
        //     } else {
        //         sprite.spriteFrame = this.baseFrames[startIndex + 1];
        //     }
        // }
    }

    private getBorderSpriteName(x: number, y: number): string {
        var coff = "";
        coff += this.getCellEmptyStatus(x - 1, y - 1);
        coff += this.getCellEmptyStatus(x, y - 1);
        coff += this.getCellEmptyStatus(x - 1, y);
        coff += this.getCellEmptyStatus(x, y);
        return coff;
    }

    private initBorderView(coff: string, x, y, index: number) {
        const cfg = Common.getGroundBorderInfo(coff);
        const pos = Common.getPos(x, y, index);

        pos.x -= Common.GRID_W / 2;
        pos.y += Common.GRID_H / 2;

        this.createMiddleBorder(pos, coff);
        this.createUpBorder(pos, cfg, coff);
    }

    /*
    private checkTray() {
        if (this.type != 'water') {
            return;
        }
        const fragments = GameModel.ins.getLastFragment();
        fragments.forEach((f: Array<GroundCellModel>) => {
            const l = f.length;
            if (l >= 2 && l < 4) {
                this.createTray(0, f[0].pos);
            } else if (l >= 4 && l < 6) {
                this.createTray(1, f[l - 1].pos, false);
            } else if (l >= 6) {
                this.createTray(0, f[0].pos);
                this.createTray(1, f[l - 1].pos, false);
            }
        });
    }

    private createTray(type: number, pos: cc.Vec2, isPre: boolean = true) {
        const frame = this.trayFrames[type];
        if (frame) {
            const taryNode = new cc.Node();
            const sprite = taryNode.addComponent(cc.Sprite);
            sprite.spriteFrame = frame;
            taryNode.parent = this.borderParent;
            taryNode.setAnchorPoint(isPre ? 0 : 1, 1);
            taryNode.zIndex = 2;
            let basePos = Common.getPos(pos.x, pos.y + 1);
            let position = cc.v2(basePos.x - Common.GRID_W / 2 - TrayOffset.x, basePos.y + Common.GRID_H / 2 - TrayOffset.y);
            if (!isPre) {
                position = cc.v2(basePos.x + Common.GRID_W / 2 + TrayOffset.x, basePos.y + Common.GRID_H / 2 - TrayOffset.y);
            }
            taryNode.setPosition(position)
        }
    }
    */

    private createMonkeyTree(pos: cc.Vec2): IMonkeyTree {
        let ctrls: IMonkeyTree = <any>{};
        const result = Common.createSpineNode(this.gnomeParent, this.monkeyTreePrefab, null, pos.add(cc.v2(Common.GRID_W / 2, -Common.GRID_H / 2)))
        ctrls.tree = result.ctrl;
        result.ctrl._setMix('yezishu_yaoshu', 'yezishu_xiuxian');
        return ctrls;
    }

    public getRandMonkeyTree(): { index: number, data: IMonkeyTree } {
        let data = null;
        for (let key in this.monkeyTreeAry) {
            data = { index: key, data: this.monkeyTreeAry[key] };
            break;
        }
        return data
    }

    public monkeyTreeExpUp(upLayer: cc.Node, index: number) {
        const data = this.monkeyTreeAry[index];
        if (data) {
            data.exp++;
            data.remainLabel.string = `x${9 - (data.exp % 9)}`
            if (data.exp % 9 == 0) {
                this.scheduleOnce(() => {
                    this.monkeyWakeUp(upLayer, index);
                }, 0.5);
            }
        }
    }

    private monkeyWakeUp(upLayer: cc.Node, index: number) {
        const data = this.monkeyTreeAry[index];
        if (data) {
            data.tree.play('yezishu_yaoshu', 0, false, () => {
                data.tree.play('yezishu_xiuxian', 0, true);
            });
            M.event.send(Event.GameCMD.ChangeCell, CellType.Coconut);
        }
    }

    private updateMoneyTreeState(index: number) {
        const data = this.monkeyTreeAry[index];
        if (data) {
            this.scheduleOnce(() => {
                data.tree.play('yezishu_xiuxian', 0, true);
                let baseDirs = [cc.v2(0, 0), cc.v2(1, 0), cc.v2(0, -1), cc.v2(1, -1), cc.v2(0, -2), cc.v2(1, -2)];
                baseDirs.forEach(dir => {
                    const cm = Common.safeGet2ArrayValue(GameModel.ins.GroundList, data.pos.add(dir));
                    cm && cm.initMonkeyTreePos();
                });
            }, 0);
        }
    }

    private createMiddleBorder(pos: cc.Vec2, name: string) {

        if (name == '1101' || name == '1110' || name == '0110' || name == '1001') {
            name = '1100';
        }

        const frame = this.getBorderFrame(this.middleFrames, `m${name}`, 3);
        if (frame) {
            const borderNode = new cc.Node();
            const sprite = borderNode.addComponent(cc.Sprite);
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            borderNode.parent = this.borderParent;
            borderNode.anchorY = 1;
            borderNode.zIndex = 1;
            sprite.spriteFrame = frame;
            let offset = cc.v2(0, -14);
            switch (name) {
                case '0100':
                    borderNode.anchorX = 16 / (51.5);
                    offset = cc.v2(0, Common.GRID_H / 2 - 8);
                    break;
                case '1000':
                    borderNode.anchorX = 1 - (16 / (51.5));
                    offset = cc.v2(0, Common.GRID_H / 2 - 8);
                    break;
                case '1100':

                    borderNode.setContentSize(cc.size(Common.GRID_W, borderNode.height));
                    break;
            }
            borderNode.setPosition(pos.add(offset));
        }
    }

    private createUpBorder(pos: cc.Vec2, cfg: any, name: string) {
        const borderNode = new cc.Node();
        const sprite = borderNode.addComponent(cc.Sprite);
        sprite.trim = false;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        borderNode.parent = this.borderParent;
        borderNode.name = `${name}_${cfg[0]}`;
        borderNode.zIndex = 2;
        sprite.spriteFrame = this.getBorderFrame(this.borderFrames, cfg[0], 5);
        borderNode.setPosition(pos);
        borderNode.setScale(cfg[1]);
        borderNode.setContentSize(Common.GRID_W, Common.GRID_H);
    }

    private getBorderFrame(container: Array<cc.SpriteFrame>, sid: string, gapIndex: number): cc.SpriteFrame {
        let startIdx = 0;
        switch (this.type) {
            case 'water':
                startIdx = 0;
                break;
            case 'grass':
                startIdx = gapIndex;
                break;
            case 'sand':
                startIdx = gapIndex * 2;
                break;
        }
        let frame = null;
        for (let i = 5; i--;) {
            const f = container[startIdx + i];
            if (f && f.name == `${this.type}_${sid}`) {
                frame = f;
                break;
            }
        }
        return frame;
    }

    /**
     * 初始化水的显示!  
     * @param coff  搞定这里.就能搞定50个dc
     */
    private initViewByType(coff: string, x, y, type: GroundType) {
        let offset = cc.v2(-Common.GRID_W / 2, Common.GRID_H / 2);
        const node = M.nodePool.getItem(NodePoolKey.ComplexGround);
        node.name = coff;
        const sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.getFrameByType(coff, type);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.trim = false;
        node.parent = this.waterParent
        node.setPosition(Common.getPos(x, y).add(offset));
        node.setContentSize(cc.size(Common.GRID_W, Common.GRID_H));
        // if (type == GroundType.Ground) {
        //     this._saveComplexObject(x, y, node);
        // }
    }

    /**
     * 存储复杂水或者地块的对象
     * @param x 
     * @param y 
     * @param node 
     */
    private _saveComplexObject(x: number, y: number, node: cc.Node) {
        if (!this._complexItemMap) {
            this._complexItemMap = [];
        }
        if (!this._complexItemMap[y]) {
            this._complexItemMap[y] = [];
        }
        this._complexItemMap[y][x] = node;
    }

    private getFrameByType(coff: string, type: GroundType): cc.SpriteFrame {
        let result: cc.SpriteFrame = null;
        const frames = type == GroundType.Water ? this.waterFrames : [];
        for (let i = frames.length; i--;) {
            let water = frames[i];
            if (water.name.indexOf(coff) != -1) {
                result = water;
                break;
            }
        }
        if (!result) {
            console.error('没找到资源:----->', coff);
        }
        return result;
    }


    private getCellEmptyStatus(x, y): number {
        let result = 1;
        if (!this.models[y]) {
            result = 0;
        } else if (!this.models[y][x]) {
            result = 0;
        } else if (this.models[y][x].getType() == null) {
            result = 0;
        }
        return result;
    }


    update(dt) {

    }
}
