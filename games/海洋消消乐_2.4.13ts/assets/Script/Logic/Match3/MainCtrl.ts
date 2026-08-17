import Common from '../Common/Common';
import M from "../../Base/Manager/M";
import Level from "../Data/Interface/Level";
import Tutorial from "../Data/Interface/Tutorial";
import GameModel, { IGridData } from "./Model/GameModel";
import Paths from "../../Base/Utils/Paths";
import { Log } from "../../Base/Utils/Log";
import { Event } from "../Data/Const/Event";
import { CellModel } from "./Model/CellModel"
import MainUiCtrl from "./View/UI/MainUiCtrl";
import GroundViewCtrl from "./View/GroundViewCtrl";
import UpGroundViewCtrl from "./View/UpGroundViewCtrl";
import ItemBasicCellCtrl from "./View/ItemBasicCellCtrl";
import BasicCellViewCtrl from "./View/BasicCellViewCtrl";
import { GameTaskModel } from "./Model/GameTaskModel";
import EffLayerCtrl from "./View/EffLayerCtrl";
import { Util } from "../../Base/Utils/Util";
import { GameState, ScoreConfig, CellType, ElimateType, RunTimeGate, NewbieOpt, Scene, ComboLevel, comboRatio } from "../Data/Const/Constant";
import ActionCtrl from "../Common/ActionCtrl";
import { CollectType } from "./Model/CollectModel";
import GroupAnimatCtrl from "../Common/GroupAnimatCtrl";
import { GapTime } from "../Data/Const/TimeConfig";
import { MsgType, CellBase } from "./Model/CellBase";
import UIMgr from "../../Base/Manager/UIMgr";
import { UIHudDef } from "../Data/Interface/UIData";
import Match3TutorialCtrl from "./View/Match3TutorialCtrl";
import { ITutorial } from "../Data/Interface/Level/ITutorial";
import Apps from '../../Base/Apps';
import { GuideUtils } from '../../../GodGuide/GuideUtils';
import ShaderHelper from '../../Base/Shader/ShaderHelper';
import ShaderTime from '../../Base/Shader/ShaderTime';
import { AudioID } from '../Common/AudioCtrl';
import OverHightLightCtrl from '../Common/UI/OverHightLightCtrl';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainCtrl extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Node)
    uiNode: cc.Node = null;

    @property(cc.Node)
    effNode: cc.Node = null;

    @property(cc.Prefab)
    gridBoard: cc.Prefab = null;

    @property(cc.Prefab)
    planePrefab: cc.Prefab = null;

    @property(cc.Node)
    maskNode: cc.Node = null;

    // @property(cc.Node)
    // GmPanel: cc.Node = null;

    @property(cc.Node)
    TutorialPanel: cc.Node = null;

    @property(cc.Node)
    overMask: cc.Node = null;

    @property(cc.Node)
    overHightLightNode: cc.Node = null;

    public gameModel: GameModel = null;

    private touchCount: number = 0;
    private groundType: string = null;

    private uiCtrl: MainUiCtrl = null;
    private effCtrl: EffLayerCtrl = null;

    private touchTimer = null;
    private touchLock: boolean = false;
    private touchOpenGMPanelCount = 0;
    private touchStartPos: cc.Vec2 = cc.v2(0, 0);

    private groundViewCtrl: GroundViewCtrl = null;
    private basicCellViewCtrl: BasicCellViewCtrl = null;
    private upGroundViewCtrl: UpGroundViewCtrl = null;

    // private gameOverBombPool: Array<CellModel> = [];

    private gridCtrlPool: Map<number, { gc: GroundViewCtrl, mc: BasicCellViewCtrl, ugc: UpGroundViewCtrl }> = null;
    private gridViewPool: Map<number, cc.Node> = null;

    private currentBgIndex: number = null;
    private currentCtrlView: cc.Node = null;
    private isShowEndView: boolean = false;

    private _isOverMark: boolean = null;

    private tutorialData: ITutorial = null;

    private _useStepCount = 0;

    private _loadingCount: number = 0;
    private _loadingProgre: number = 0;

    private _overClickCount: number = -1;

    // private overTuoweiNode: cc.Node = null;

    onLoad() {

        cc.game.setFrameRate(RunTimeGate);

        if (Apps.isDebug) {
            Util.Tool.showDebugView(true);
        }
        M.init();
        M.changeScene();
        this.initGame();
        this.initEvent();
        this.initTimerEvent();
    }

    onDestroy() {
        this.removeEvent();
        GameModel.destory();
        M.nodePool.destory();
        GroupAnimatCtrl.ins.destory();
        Common.CurrentCtrlView = null;
        this.unscheduleAllCallbacks();
        clearTimeout(this.touchTimer);
    }

    private removeEvent() {
        M.event.unRegister(Event.GameCMD.GameOver, this.onGameOver, this);
        M.event.unRegister(Event.GameCMD.GameResume, this.onGameResume, this);
        M.event.unRegister(Event.GameCMD.MoveGrid, this.onMoveGrid, this);
        M.event.unRegister(Event.GameCMD.GameReset, this.reStartGame, this);
        M.event.unRegister(Event.GameCMD.MainCMD, this.onGameViewTask, this);
        M.event.unRegister(Event.GameCMD.StopPrompts, this.onStopPrompts, this);
        M.event.unRegister(Event.UI.CollectComplet, this.onCollectComplet, this);
        M.event.unRegister(Event.GameCMD.SpeCollect, this.onSpeCollectComplet, this);
        M.event.unRegister(Event.GameCMD.ChangeCell, this.onChangeCellType, this);
        M.event.unRegister(Event.GameCMD.ShowGameResult, this.showGameOverDialog, this);
        M.event.unRegister(Event.GameCMD.UpdateComplexView, this.onUpdateComplexView, this);
        M.event.unRegister(Event.GameCMD.UpdateCollectPower, this.collectPower, this);
        M.event.unRegister(Event.GameCMD.GameOverFall, this._startFall, this);
    }

    private initEvent() {
        M.event.register(Event.GameCMD.GameOver, this.onGameOver, this);
        M.event.register(Event.GameCMD.GameResume, this.onGameResume, this);
        M.event.register(Event.GameCMD.MoveGrid, this.onMoveGrid, this);
        M.event.register(Event.GameCMD.GameReset, this.reStartGame, this);
        M.event.register(Event.GameCMD.MainCMD, this.onGameViewTask, this);
        M.event.register(Event.GameCMD.StopPrompts, this.onStopPrompts, this);
        M.event.register(Event.UI.CollectComplet, this.onCollectComplet, this);
        M.event.register(Event.GameCMD.ChangeCell, this.onChangeCellType, this);
        M.event.register(Event.GameCMD.SpeCollect, this.onSpeCollectComplet, this);
        M.event.register(Event.GameCMD.UpdateComplexView, this.onUpdateComplexView, this);
        M.event.register(Event.GameCMD.UpdateCollectPower, this.collectPower, this);
        M.event.register(Event.GameCMD.ShowGameResult, this.showGameOverDialog, this);
        M.event.register(Event.GameCMD.GameOverFall, this._startFall, this);
    }

    private async initGame() {
        M.runtime.addGameCount();
        this.setZorder(0);
        this.overHightLightNode.getComponent(OverHightLightCtrl).showStepNode();

        this._useStepCount = M.runtime.MatchGameTime = 0;

        // M.runtime.UsePorpRecord = [];

        this._isOverMark = null;
        this.overMask.active = false;
        this._overClickCount = -1;
        this.isShowEndView = false;

        const lv = M.runtime.SelectLevel || null;
        const data = await Level.ins.getLvCfgData(lv);
        M.event.send(Event.UI.UpdateTmpLoadingProgress, 60);
        if (NewbieOpt) {
            this.tutorialData = await Tutorial.ins.getTurCfgData(lv);
        }
        if (!data) return;
        Level.ins.preLoadNextCfg(lv);
        M.runtime.gameStar();
        M.runtime.GameState = GameState.preReady;
        this.uiCtrl = this.uiNode.getComponent(MainUiCtrl);
        this.effCtrl = this.effNode.getComponent(EffLayerCtrl);
        this.gameModel = new GameModel(data);


        this.initBg();
        this.initMapGridView();
        this.uiCtrl.init(this, data);
    }

    private setZorder(index: number = 0) {
        if (index == 0) {
            this.node.zIndex = 0;
            this.uiNode.zIndex = 1;
        } else {
            this.node.zIndex = 1;
            this.uiNode.zIndex = 0;
        }
    }

    private startGame() {
        if (UIMgr.ins.isShowing(UIHudDef.GameLoading)) {
            this.scheduleOnce(() => {
                UIMgr.ins.closeUI(UIHudDef.GameLoading, false, () => {
                    this.showTargetView();
                })
            }, 1);
        } else {
            this.showTargetView();
        }
    }

    private reStartGame() {
        this.removeCurrentGame();
        this.initGame();
    }

    private removeCurrentGame() {
        GameModel.destory();
        GroupAnimatCtrl.ins.destory();
        Common.CurrentCtrlView = null;
        this.gameModel = null;
        this.maskNode.destroyAllChildren(); // removeAllChildren
    }

    private showTargetView() {
        M.event.send(Event.Sound.PlayBGM, AudioID.BGM2);
        this.uiCtrl.showTargetDialog(this.preStartShowGrid.bind(this));
        GuideUtils.onMatch3Begin(M.runtime.SelectLevel || M.runtime.CurLevel);
    }

    /** 开启触发器 */
    private initTimerEvent() {
        this.schedule(() => {
            this.gameModel && this.gameModel.timerTrigger();
            this.checkShowGameOver();
            M.runtime.MatchGameTime++;
        }, 1, cc.macro.REPEAT_FOREVER, 1);
    }

    public showCurrentMemory() {
        let deps = cc.loader.getDependsRecursively(this.node);
        console.error('m:', deps);
    }

    private async initBg() {
        const lvData = this.gameModel.getLvData();
        const bgIndex = M.runtime.CurBgIndex = lvData.levelInfo.background || 1;
        if (this.currentBgIndex != bgIndex) {
            this.currentBgIndex = bgIndex;
            //移除老旧背景与效果!
            this.bg.node.destroyAllChildren();
            this.bg.node.parent.getChildByName('bbg').destroyAllChildren();
            cc.find('top/Auto_record/collectNode/role', this.uiNode).destroyAllChildren();

            const bgInfo = Common.getBgInfo(bgIndex)
            this.groundType = bgInfo.type;

            if (!bgInfo.isWater) {
                this.bg.node.removeComponent(ShaderHelper);
                this.bg.node.removeComponent(ShaderTime);
            }

            const task = [];

            task.push(Common.getRes(`${Paths.Match3Bg}${bgIndex}/${bgInfo.name}`, cc.SpriteFrame));
            task.push(Common.getRes(`${Paths.Match3Bg}${bgIndex}/${bgInfo.cfg}`, cc.JsonAsset));

            Promise.all(task).then(data => {
                this.bg.spriteFrame = data[0];
                const cfg = data[1];
                if (cfg && cfg.json) {
                    this.updateBgTopAlign(cfg.json.top);
                    const t1 = [];
                    const sub: Array<any> = cfg.json.sub;
                    if (sub) {
                        for (let i = sub.length; i--;) {
                            t1.push(this.addItem2Bg(sub[i]));
                        }
                    }
                    const txu: Array<any> = cfg.json.texture;
                    if (txu) {
                        for (let i = txu.length; i--;) {
                            t1.push(this.fillItemTexture(txu[i]));
                        }
                    }
                    this._loadingCount = t1.length;
                    Promise.all(t1).then(res => {
                        console.error('全部加载完成!!!!', res.length);
                        this.sendUpdateLoadingEvent(100);
                        this.startGame();
                    });
                }
            });
        } else {
            this.startGame();
        }
    }

    private fillItemTexture(textureCfg: { path: string, parent: string }): Promise<any> {
        if (textureCfg) {
            const path = `${Paths.Match3Bg}${this.currentBgIndex}/${textureCfg.path}`;
            return Common.getRes<cc.SpriteFrame>(path, cc.SpriteFrame).then(res => {
                if (res) {
                    const node: cc.Node = cc.find(`Canvas/${textureCfg.parent}`);
                    if (node) {
                        node.getComponent(cc.Sprite).spriteFrame = res;
                    }
                    this.sendUpdateLoadingEvent();
                }
            })
        }
    }

    private addItem2Bg(itemCfg: { path: string, parent: string, z: number, type: string, anchor?: Array<number>, pos?: Array<number>, top?: number }): Promise<any> {
        if (itemCfg) {
            const path = `${Paths.Match3Bg}${this.currentBgIndex}/${itemCfg.path}`;
            let type = null;
            switch (itemCfg.type) {
                case 'sprite': type = cc.SpriteFrame; break;
                case 'prefab': type = cc.Prefab; break;
            }
            return Common.getRes(path, type).then(res => {
                if (res) {
                    let node: cc.Node = null;
                    switch (itemCfg.type) {
                        case 'sprite':
                            node = M.nodePool.createItem(null);
                            const sprite = node.addComponent(cc.Sprite);
                            sprite.spriteFrame = res as cc.SpriteFrame;
                            break;
                        case 'prefab':
                            node = M.nodePool.createItem(res);
                            break;
                    }
                    if (node) {
                        node.parent = cc.find(`Canvas/${itemCfg.parent}`);
                        if (itemCfg.pos) {
                            node.setPosition(itemCfg.pos[0], itemCfg.pos[1]);
                        }
                        const dirs = ['top', 'left', 'right', 'bottom'];
                        dirs.forEach(d => {
                            if (itemCfg[d] != null && itemCfg[d] != undefined) {
                                (Common.setAlignment(node, d, itemCfg[d]))
                            }
                        });
                        const anc = itemCfg.anchor;
                        if (anc) {
                            node.setAnchorPoint(anc[0], anc[1]);
                        }
                        const z = itemCfg.z;
                        if (z != null && z != undefined) {
                            node.zIndex = z;
                        }
                    }
                }
                this.sendUpdateLoadingEvent();
            });
        }
    }

    private sendUpdateLoadingEvent(zdtarget: number = null) {
        this._loadingProgre++;
        M.event.send(Event.UI.UpdateTmpLoadingProgress, zdtarget || Math.ceil((60 + (this._loadingProgre / this._loadingCount) * 60)))
    }

    private updateBgTopAlign(top: number) {
        const lvLabPos = this.uiCtrl.getLevelLabelPos();
        //根据上部关卡节点来确认偏移量
        let topGap = 0;
        if (this.currentBgIndex == 1) {
            topGap = (cc.winSize.height - lvLabPos.y) - 307;
        }
        Common.setAlignment(this.bg.node, 'top', top + topGap);
    }

    private onSpeCollectComplet(cm: CellModel) {
        const type = cm.getType();
        const pos = cm.getPosition();
        if (type == CellType.Banana) {
            const tree = this.groundViewCtrl.getRandMonkeyTree();
            if (tree) {
                const targetPos: cc.Vec2 = Common.getWorldPos(tree.data.tree.node);
                const offset = cc.v2(50, 50);
                this.basicCellViewCtrl.playCollectAni(this.uiNode, type, pos, targetPos.add(offset), null, () => {
                    this.groundViewCtrl.monkeyTreeExpUp(this.uiNode, tree.index);
                });
            }
        } else if (type == CellType.BottleCaps) {
            this.basicCellViewCtrl.playCollectStepAni(this.uiCtrl, cm);
        }
    }

    private onCollectComplet(type: CellType | string, index?: number, elimateType?: ElimateType) {
        const targetPos = this.gameModel.CollectPos || this.uiCtrl.getCollectPos(type);
        let isCanCollect = true;
        switch (type) {
            case CollectType.gnome:
                this.groundViewCtrl.playGnomeAni(this.uiNode, index, targetPos);
                break
            case CollectType.box:
                this.upGroundViewCtrl.playCollectAniByType(this.uiNode, <any>index, targetPos, CollectType.box);
                break
            case CollectType.colorbox:
                this.upGroundViewCtrl.playCollectAniByType(this.uiNode, <any>index, targetPos, CollectType.colorbox);
                break
            case CollectType.gem:
                this.groundViewCtrl.playGemAni(this.uiNode, <any>index, targetPos);
                break
            case CollectType.firefly:
                this.groundViewCtrl.playFireflyAni(this.uiNode, <any>index, targetPos);
                break
            case CollectType.turtles:
                this.groundViewCtrl.playTurtlesAni(this.uiNode, index);
                break
            case CollectType.crab:
                this.groundViewCtrl.playCrabAni(this.uiNode, index);
                break
            case CellType.Conch:
                console.error('收集收集收集收集收集贝壳');
                isCanCollect = false;
                break;
            default:
                isCanCollect = false;
                this.basicCellViewCtrl.playCollectAni(this.uiNode, <any>type, <any>index, targetPos, elimateType);
        }
        if (isCanCollect) {
            M.runtime.addCollectCount(type);
        }
    }

    /**同步当前棋盘状态! */
    public syncGridBoard() {
        const index = this.gameModel.mapIndex;
        const cd = this.gridCtrlPool.get(index)
        Common.CurrentCtrlView = this.currentCtrlView = this.gridViewPool.get(index);
        if (cd) {
            this.groundViewCtrl = cd.gc;
            this.basicCellViewCtrl = cd.mc;
            this.upGroundViewCtrl = cd.ugc;
        }
        this.gridViewPool.forEach((item, key) => {
            if (key != index) {
                item.active = false;
            }
        })
    }

    private initMapGridView() {
        const maps = this.gameModel.getMaps();
        this.gridCtrlPool = new Map();
        this.gridViewPool = new Map();
        for (let i = 0; i < this.gameModel.mapCount; i++) {
            const gridCtrlView = cc.instantiate(this.gridBoard);
            const gridData = maps[i];
            const gc = this.initGround(gridCtrlView, gridData);
            const mc = this.initMainLayer(gridCtrlView, gridData);
            const ugc = this.initUpGround(gridCtrlView, gridData);
            this.gridCtrlPool.set(i, { gc, mc, ugc })
            this.gridViewPool.set(i, gridCtrlView);
            this.setGirdViewSize(gridCtrlView, i);
            gridCtrlView.parent = this.maskNode;
            gridCtrlView.x = i * cc.winSize.width;
        }
    }

    private setGirdViewSize(view: cc.Node, index: number) {
        const topPos = this.gameModel.getTopPosition(index);
        const height = topPos.y * 2 + Common.GRID_H;
        if (height > this.maskNode.height) {
            this.gameModel.setLongHeight(true);
            view.setContentSize(this.node.width, height);
        }
    }

    private gameReadyOK() {
        this.syncGridBoard();
        M.runtime.GameState = GameState.Normal;
        Log.w('准备完毕,开启触摸!');
        //开局检测一次!
        this.gameModel.openAutoCheckOpt();
        this.checkUseProp();
        this.initTouch();
        this.checkTutorial();
    }

    private onMoveGrid(target: number, type: number) {
        const checkIsNoFall = () => {
            if (!this.gameModel.isFalling) {
                Log.i('开始检测棋盘移动!');
                if (type == 0) {
                    M.runtime.GameState = GameState.preReady;
                    this.moveCross(target);
                } else {
                    this.moveRow(this.groundViewCtrl.checkCollectMoveDistance(this.currentCtrlView, this.maskNode));
                }
                this.unschedule(checkIsNoFall);
            }
        }
        this.schedule(checkIsNoFall, 1);
    }

    private _moveRowLock = false;
    private moveRow(distance: number) {
        //检测是否够长度 
        if (distance != 0 && !this._moveRowLock) {
            this._moveRowLock = true;
            M.runtime.GameState = GameState.preReady;
            ActionCtrl.ins.runMoveRow(this.currentCtrlView, distance).then(() => {
                this._moveRowLock = false;
                M.runtime.GameState = GameState.Normal;
            });
        }
    }

    private _moveCrossLock = false;
    private moveCross(nextIndex: number) {
        if (!this._moveCrossLock) {
            this._moveCrossLock = true;
            if (this.gridViewPool.size > 0) {
                this._moveCrossLock = false;
                this.gridViewPool.forEach((value, key) => {
                    value.active = true;
                    ActionCtrl.ins.runMoveCross(value).then(() => {
                        console.error('移动结束!!');
                        M.runtime.GameState = GameState.Normal;
                        this.gameModel.changeMap(nextIndex);
                        this.syncGridBoard();
                    });
                });
            } else {
                this._moveCrossLock = false;
            }
        }
    }

    /**开始游戏前展示棋盘,不支持同时展示横向与纵向 */
    private preStartShowGrid() {
        //如果有多个屏幕,或者当前关卡长度超过设定长度
        const gridView = this.gridViewPool.get(this.gameModel.mapIndex);
        if (this.gameModel.mapCount > 1) {
            //展示所有的地图
            this.maskNode.removeComponent(cc.Mask);
            this.playShowCross();
        } else if (gridView.height > 0) {
            this.playShowRow(gridView);
        } else {
            this.gameReadyOK();
        }
    }

    private playShowRow(gridView) {
        ActionCtrl.ins.runShowRow(gridView, this.maskNode.height).then(this.gameReadyOK.bind(this));
    }

    private playShowCross() {
        ActionCtrl.ins.runShowCross(this.node, this.gridViewPool).then(this.gameReadyOK.bind(this));
    }

    private initGround(node: cc.Node, data: IGridData) {
        node = node.getChildByName('ground')
        const gCtrl = node.getComponent(GroundViewCtrl);
        gCtrl.initView(data.gm.getGroupCellList(), data, this.gameModel.getLvData(), this.groundType);
        return gCtrl;
    }

    private initMainLayer(node: cc.Node, data: IGridData) {
        node = node.getChildByName('mainLayer')
        const mCtrl = node.getComponent(BasicCellViewCtrl);
        mCtrl.initView(data.cellList);
        return mCtrl;
    }

    private initUpGround(node: cc.Node, data: IGridData) {
        node = node.getChildByName('upGround')
        const ugCtrl = node.getComponent(UpGroundViewCtrl);
        ugCtrl.initView(data.ugm.getUGroupCellList());
        return ugCtrl;
    }

    private initTouch() {
        const curMapView = this.gridViewPool.get(this.gameModel.mapIndex);
        let node = this.node;
        if (curMapView.height > 0) node = curMapView;
        node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    private onTouchStart(event) {
        this.touchStartPos = event.touch.getLocation();

    }

    private onTouchMove(event) {
        this.checkMoveCell(event.touch.getLocation());
    }

    private onTouchEnd(event) {
        //加上操作区域移动后的偏移量,修正触摸坐标取棋盘坐标!  
        let pos = this.currentCtrlView.convertToNodeSpaceAR(event.touch.getLocation());

        this._overClick(event.touch.getLocation());

        if (M.runtime.GameState != GameState.Normal) return;

        this.touchLock = false;

        clearTimeout(this.touchTimer);
        this.touchCount++;
        if (this.touchCount >= 2) {
            this.touchCount = 0;
            this.doubleClick(pos);
        }
        this.touchTimer = setTimeout(() => {
            this.touchCount = 0;
            this.touchOpenGMPanelCount = 0;
        }, 500);
        if (!event || (event && !event.istutorial)) {
            this.click(pos);
        }
    }

    private click(curPos: cc.Vec2) {
        this.gameModel.onClick(curPos, true);

        // const model = Common.safeGet2ArrayValue(GameModel.ins.GroundList, Common.convetPos(curPos));
        // model.cleanGround();
        // this.groundViewCtrl.updateComlexIteamByPos(Common.convetPos(curPos));
    }

    private doubleClick(curPos: cc.Vec2) {
        this.gameModel.onDoubleClick(Common.convetPos(curPos));
    }

    private checkMoveCell(curPos: cc.Vec2) {
        if (this.touchLock || M.runtime.GameState != GameState.Normal) {
            return;
        }
        const sp = curPos.sub(this.touchStartPos);
        if (Math.abs(sp.x) > Common.GRID_W / 3 || Math.abs(sp.y) > Common.GRID_H / 3) {
            let dir = cc.v2(0, 0);
            if (Math.abs(sp.x) > Math.abs(sp.y)) {
                dir.x = sp.x > 0 ? 1 : -1;
            } else {
                dir.y = sp.y > 0 ? -1 : 1;
            }
            let pos = this.currentCtrlView.convertToNodeSpaceAR(this.touchStartPos);
            this.gameModel.touchMove(Common.convetPos(pos), dir);
            this.touchLock = true;
        }
    }

    private onGameViewTask(task: GameTaskModel) {
        switch (task.action) {
            case Event.GameCMD.Elimate:
                this.execElimate(task);
                break;
            case Event.GameCMD.Exchange:
                this.execExchange(task);
                break;
            case Event.GameCMD.AddNewCell:
                this.execAddNewCell(task);
                break;
            case Event.GameCMD.PromptCanElimate:
                this.execTisAnimation(task);
                break;
        }
    }

    public testGameOver() {
        // this.onGameOver(true);\
        this.reStartGame();
    }

    private onGameResume() {
        if (this._isOverMark != null) {
            this.onGameOver(this._isOverMark);
        }
    }

    private async onGameOver(result: boolean) {
        console.error('游戏结束', result);
        if (M.runtime.GameState == GameState.Normal) {
            this._useStepCount = (this.gameModel.stepCount - this.gameModel.stepLimit);
            if (result) {
                //设置不不可操作
                M.runtime.GameState = GameState.Win;
                // this.showGameOverDialog(result);
                this.gameOverStartBomb();
            } else {
                M.runtime.GameState = GameState.Fail;
                this.showGameOverDialog(result);
            }
        } else {
            this._isOverMark = true;
        }
    }

    private _startOverClick() {
        M.runtime.GameState = GameState.End;
        UIMgr.ins.showUI(UIHudDef.OverShow, { type: UIHudDef.OverShow }, null, () => {
            //高亮棋盘与步数!开启黑色遮罩~
            this.setZorder(1);
            this.overMask.active = true;
            this.overHightLightNode.getComponent(OverHightLightCtrl).showCountDown();
        });

        // UIMgr.ins.showUI(UIHudDef.OverShow, { type: UIHudDef.OverShow }, null, () => {
        //     //开启显示效果...开启点消 
        //     if (this.gameModel.stepLimit > 0) {
        //         this._overClickCount = this.gameModel.stepLimit;
        //         this.setZorder(1);
        //         this.overMask.active = true;
        //         M.runtime.OverStepCount = 0;
        //         M.tips.show('请点击棋盘,进行疯狂的消除吧!', 1)
        //     } else {
        //         this.showGameOverDialog(true);
        //     }
        // });
    }

    private _overClick(pos: cc.Vec2) {
        this.gameModel.onClick(pos, false)

        // if (this._overClickCount != -1) {
        //     if (this.gameModel.stepLimit > 0) {
        //         const pos = Common.convetPos(position);
        //         const cell = Common.safeGet2ArrayValue(this.gameModel.CellList, pos);
        //         if (cell) {
        //             cell.change2Bomb(CellType.Bomb1);
        //             cell.onMsg(MsgType.Bomb, null);
        //             this.gameModel.stepLimit--;
        //             M.event.send(Event.UI.UpdateInfoPanel);
        //             M.runtime.OverStepCount++
        //             if (M.runtime.OverStepCount > 7) {
        //                 M.runtime.OverStepCount = 7;
        //             }
        //             M.event.send(Event.UI.AddScore, ScoreConfig.OverStep[M.runtime.OverStepCount], position, true)
        //         }
        //     }
        // }
    }

    // private checkShowGameOver() {
    //     if (M.runtime.GameState == GameState.Win && !this.gameModel.isFalling) {
    //         // this._startOverClick();
    //     }
    //     // else if (M.runtime.GameState == GameState.End && !this.isShowEndView) {
    //     // if (this.gameModel.stepLimit <= 0 && !this.gameModel.isFalling) {
    //     //     this.showGameOverDialog(true);
    //     // }
    //     // }
    // }

    private checkShowGameOver() {
        if (M.runtime.GameState == GameState.Win) {
            if (!this.gameModel.isFalling) {
                M.runtime.GameState = GameState.ChangeBomb;
                if (this.gameModel.CellDict.size <= 0 || this.gameModel.stepLimit <= 0) {
                    this.showGameOverDialog(true);
                } else {
                    UIMgr.ins.showUI(UIHudDef.OverShow, { type: UIHudDef.OverShow }, null, () => {
                        //开始将步数转换成炸弹.! 
                        this.delayExecFun(0.2, this.conversionStep2Bomb.bind(this));
                    });
                }
            }
        } else if (M.runtime.GameState == GameState.End && !this.isShowEndView) {
            if (!this.gameModel.isFalling) {
                this.showGameOverDialog(true);
            }
        }
    }

    private conversionStep2Bomb(): Promise<any> {
        // return new Promise((resolve) => {
        if (!this.gameModel) return;
        const closeAry: Set<CellModel> = new Set();
        M.runtime.OverStepCount = 0;
        this.gameModel.CellDict.forEach(cell => {
            if (cell && !cell.isEmpty && !cell.isDeath && !cell.isBomb && !cell.isGround && !this.gameModel.isHavaSpe(cell.pos)) {
                if (closeAry.size < this.gameModel.stepLimit) {
                    closeAry.add(cell);
                }
            }
        })
        const centerPos = this.uiCtrl.getStepPos();
        GroupAnimatCtrl.ins.overShootEff(closeAry, centerPos, () => {
            this && this.gameOverStartBomb(0.3, true);
        });
        // });
    }

    private _startFall() {
        this.gameModel.startOverFall();
    }

    private showGameOverDialog(result: boolean) {
        this.isShowEndView = true;
        const storyData = M.table.ChapterStory.getByPrimaryKey(M.runtime.CurLevel);

        this.gameModel.stopOverFall();
        if (result && storyData) {
            //展示对话框!
            UIMgr.ins.showUI(UIHudDef.StoryTalkPanel, storyData, null, () => {
                this.delayExecFun(1, () => {
                    this.uiCtrl.showResultDialog(result, this._useStepCount, M.runtime.MatchGameTime);
                });
            });
        } else {
            this.delayExecFun(1, () => {
                this.uiCtrl.showResultDialog(result, this._useStepCount, M.runtime.MatchGameTime);
            });
        }
    }

    private gameOverStartBomb(gaptime: number = 0, isOver: boolean = false) {
        let index = 0;
        this.gameModel.CellDict.forEach(cell => {
            if (cell && cell.isBomb) {
                index++
                let time = gaptime;
                if (gaptime) {
                    time *= index;
                } else {
                    time = 0.1;
                }
                this.delayExecFun(time, () => {
                    cell.onMsg(MsgType.Bomb);
                    if (isOver) {
                        M.runtime.GameState = GameState.End;
                    }
                });
            }
        });
    }

    private onStopPrompts(task: GameTaskModel) {
        if (task.model1 && task.model1.extCtrl) {
            (<CellModel>task.model1).extCtrl.stopPromptAction();
        }
        task.closeAry.forEach((cm: CellModel) => {
            cm.extCtrl && cm.extCtrl.stopPromptAction();
        })
    }

    private execTisAnimation(task: GameTaskModel) {
        if (task.model1 && task.model1.extCtrl) {
            (<CellModel>task.model1).extCtrl.playSinglePrompt(task.cp1);
        }
        task.closeAry.forEach((cm: CellModel) => {
            cm.extCtrl && cm.extCtrl.playMulPrompt();
        });
        // this.gameModel.task.freeTask(task);
    }

    private execAddNewCell(task: GameTaskModel) {
        // if (this.basicCellViewCtrl) {
        this.basicCellViewCtrl.createNewCell(task.model1, task.extData);
        // }
        this.gameModel.task.freeTask(task);
    }

    private execElimate(task: GameTaskModel) {
        switch (task.type) {
            case ElimateType.Default:
                this.checkMergeBomb(task);
                break;
            case ElimateType.All:
                this.execDoubleRainbow(task);
                break
            case ElimateType.Bomb6:
                GroupAnimatCtrl.ins.playCrabBomb(task.closeAry);
                break

            case ElimateType.ThreeRowAndCol:
                this.execThreeRowAndCol(task);
                break;
            default:
                this.execBomb(task);
                break;
        }
        if (task.type > ElimateType.Prop) {
            //   this.playPropEff(task);
        }
    }

    /**
     * 执行普通消除接口
     * @param task 消除任务
     * @param forcedElimate 强制消除(不会触发炸弹连爆)
     */
    private execNormalElimate(task: GameTaskModel, forcedElimate: boolean = false) {
        if (task.size == 0) {
            (task.model1.extCtrl && task.model1.isDeath) && task.model1.extCtrl.elimate(task.size, task.model1.pos, task.type);
        } else {
            this.delayExecFun(task.keepTime, () => {
                this.checkFishBomb(task.model1, task.size);
                task.closeAry.forEach((m: CellModel) => {
                    if (m && m.extCtrl && m.isDeath) {
                        m.isBomb = forcedElimate ? false : m.isBomb;
                        m.extCtrl.elimate(task.size, task.model1.pos, task.type);
                    }
                    /**销毁上位或者下位的障碍物 */
                    m && m.execUpElimate(task.type);
                });
                this.gameModel.task.freeTask(task);
            });
        }
    }

    private execExchange(task: GameTaskModel) {
        const c2 = <ItemBasicCellCtrl>task.model2.extCtrl
        //这里的 extData 指定是否单个移动
        if (task.model1.isBomb && task.model2.isBomb || task.extData) {
            c2 && c2.exchangeDoubleBombAni(task.model1)
        } else {
            const c1 = <ItemBasicCellCtrl>task.model1.extCtrl;
            c1 && c1.exchange(task.cp1, task.keepTime, task.model2);
            c2 && c2.exchange(task.cp2, task.keepTime, task.model1);
        }
        this.gameModel.task.freeTask(task);
    }

    private checkFishBomb(model: CellModel, size: number) {
        if (model && model.getType() == CellType.Fish && size == 3) {
            //炸弹鱼爆炸!
            model.extCtrl && model.extCtrl.execFishBomb();
        }
    }

    private checkMergeBomb(task: GameTaskModel) {
        //普通消除!
        let scoreModel = task.model1;
        if (task.size >= 4) {
            if (this.gameModel.isCanMergeBomb(task.extData, task.model1)) {
                M.event.send(Event.Sound.PlaySoundEff, AudioID.merge_boom);
                let isExec = false;
                if (M.runtime.GameState == GameState.End) {
                    isExec = true;
                }
                GroupAnimatCtrl.ins.playCreateBomb(task.extData, task.model1.pos, isExec, GapTime.MergeBombSpeed + 0.2, true, scoreModel.GroupId);
                M.runtime.addMergeCount(task.extData);
            } else {
                task.model1.unlockCreateBombPos();
            }
        } else if (task.closeAry) {
            //找出边界的那个 横的左边,竖的右边
            let tempModel = null;
            task.closeAry.forEach((model: CellModel) => {
                if (!tempModel) {
                    tempModel = model
                } else if (tempModel.pos.x == model.pos.x && model.pos.y < tempModel.pos.y) {
                    tempModel = model;
                } else if (tempModel.pos.y == model.pos.y && model.pos.x < tempModel.pos.x) {
                    tempModel = model;
                }
            });
            scoreModel = tempModel;
        }
        //绑定添加分数回调
        if (scoreModel && scoreModel.extCtrl) {
            scoreModel.extCtrl.BindAddScoreTask = (pos, count) => {
                count = count > 5 ? 5 : count
                const comboName = ComboLevel[M.runtime.CurCombo];
                if (comboName) {
                    let ratio = comboRatio[comboName];
                    ratio = ratio > 2 ? 2 : ratio;
                    Log.i('combo:', ratio, ScoreConfig.Combo[ratio]);
                    this.uiCtrl.updateScore(ScoreConfig.Combo[ratio], pos);
                } else {
                    this.uiCtrl.updateScore(ScoreConfig.Normal[count], pos);
                }
            }
        }
        this.execNormalElimate(task);
    }

    private execBomb(task: GameTaskModel) {
        //执行爆炸动画!  
        if (task.type == ElimateType.Girl) {
            const ctrl: ItemBasicCellCtrl = task.model1.extCtrl;
            ctrl.elimate(0, task.model1.pos, task.type);
            this.gameModel.task.freeTask(task);
            return;
        }

        if (task.type == ElimateType.Rocket) {
            this.execOctopus(task);
            return
        }

        if (task.model1 && task.model1.extCtrl) {
            task.model1.extCtrl.BindAddScoreTask = (pos, size) => {
                let socre = ScoreConfig.Special[task.model1.getType()];
                if (task.model1.isBomb) {
                    socre = ScoreConfig.BombElimate[task.model1.getType()]
                }
                this.uiCtrl.updateScore(socre, pos);
            }
        }

        switch (task.model1.getType()) {
            case CellType.Bomb1:
                this.execBeikeBomb(task);
                break;
            case CellType.Fish:
                this.execFishBomb(task);
                break;
            case CellType.Bomb4:
                this.execOctopus(task);
                break;
            case CellType.Bomb2:
            case CellType.Bomb3:
                this.execRowAndCol(task);
                break;
            case CellType.Bomb5:
                task.model1.isBomb = false;
                this.execRainbow(task);
                break
            default:
                this.execNormalElimate(task);
                break
        }
    }

    private execThreeRowAndCol(task: GameTaskModel) {
        const elimateData: Array<{ pos: cc.Vec2, keepTime: number, type, closeAry: Set<CellModel> }> = task.extData;
        elimateData.forEach(item => {
            this.playRowAndColAni(item.type, item.pos, task.closeAry, task.type)
        });
        this.gameModel.task.freeTask(task);
    }

    /**
     * 执行双彩虹全局消除!
     * @param task 
     */
    private execDoubleRainbow(task: GameTaskModel) {
        task.size = null;
        task.type = ElimateType.Default;
        if (task.extData == 0) {
            this.delayExecFun(GapTime.DoubleRainbowResume, () => {
                M.runtime.resumeGame();
            })
        }
        this.execNormalElimate(task, true);
    }

    /**
     * 执行章鱼跳跃
     * @param task 
     */
    private async execOctopus(task) {
        task.model1.isBomb = false;
        task.type = ElimateType.Bomb4;
        if (task.model1.extCtrl) {
            task.model1.extCtrl.playBombSingleDestoryEff(0, 0.5);
        }
        const targetPos = task.extData.pos;
        const conveType = task.extData.type;
        const wpos = Common.convertCurWorldPos(task.model1.getPosition());
        if (targetPos) {
            const tpos = Common.convertCurWorldPos(Common.getPos(targetPos.x, targetPos.y));


            M.runtime.pushZhangyuTimePause();

            /* 策划说这种效果不太好，还是沿用原来的抛物线
            if(conveType){ 

                var animName = "";
                if (conveType == CellType.Bomb2) {
                    //章鱼+剑鱼
                    animName= "zhangyu_tiao_jianyu";
                } else if (conveType == CellType.Bomb1) {
                    //章鱼+气泡鱼
                    animName= "zhangyu_tiao_hetun";
                }

                await EffLayerCtrl.ins.playZhangyuAndJianyu(animName,Common.convertCurWorldPos(<any>task.model1.extData.position),
                Common.getPos(targetPos.x, targetPos.y),() => {
                   
                    //cc.log("这里有什么毛病 ???")
                     // 这里有什么毛病 ???
                    GroupAnimatCtrl.ins.playCreateBomb(conveType, targetPos, true, 0, false);

                    this.delayExecFun(0.5, () => {
                    M.runtime.deleteZhangyuTime()
                      });
                    GameModel.ins.CollectModel.removeMark(targetPos);
                    GroupAnimatCtrl.ins.playCellBombShocks(targetPos, 1, 1, true);
                });
            }else{

                this.effCtrl.playZyJump(wpos, tpos, () => {
                    if (conveType) {
                        this.gameModel.execElimateOne(targetPos, ElimateType.Bomb4);
                        // 这里有什么毛病 ???
                        GroupAnimatCtrl.ins.playCreateBomb(conveType, targetPos, true, 0, false);
                    } else {
                        this.gameModel.execElimateOne(targetPos, ElimateType.Bomb4);
                    }
                    this.delayExecFun(0.5, () => {
                        M.runtime.deleteZhangyuTime()
                    });
                    GameModel.ins.CollectModel.removeMark(targetPos);
                    GroupAnimatCtrl.ins.playCellBombShocks(targetPos, 1, 1, true);
                });
            }*/


            this.effCtrl.playZyJump(wpos, tpos, () => {
                if (conveType) {
                    this.gameModel.execElimateOne(targetPos, ElimateType.Bomb4);
                    // 这里有什么毛病 ???
                    GroupAnimatCtrl.ins.playCreateBomb(conveType, targetPos, true, 0, false);
                } else {
                    this.gameModel.execElimateOne(targetPos, ElimateType.Bomb4);
                }
                this.delayExecFun(0.5, () => {
                    M.runtime.deleteZhangyuTime()
                });
                GameModel.ins.CollectModel.removeMark(targetPos);
                GroupAnimatCtrl.ins.playCellBombShocks(targetPos, 1, 1, true);
            }, conveType);


        }
        this.execNormalElimate(task);
    }

    private execBeikeBomb(task: GameTaskModel) {
        if (task.model1.extCtrl) {
            const ctrl: ItemBasicCellCtrl = task.model1.extCtrl;
            ctrl.playBombSingleDestoryEff(0, 1);
            const [centerPos, bombLv] = [task.model1.pos, task.extData];
            const pos = Common.convertCurWorldPos(<any>task.model1.extData.position);
            if (task.type != ElimateType.DoubleBomb) {
                this.effCtrl.playBombEff(bombLv, pos);
            }
            M.event.send(Event.Sound.PlaySoundEff, AudioID.Bomb);
            this.execNormalElimate(task);
            this.delayExecFun(task.keepTime, () => {
                GroupAnimatCtrl.ins.playCellBombShocks(centerPos, bombLv);
            });
        }
    }

    // 吸附型爆炸
    // private execBeikeBomb(task) {
    //     if (task.model1.extCtrl) {
    //         const ctrl: ItemBasicCellCtrl = task.model1.extCtrl;
    //         ctrl.playBombSingleDestoryEff(0, 1 + GapTime.BeikeDelayShaking + GapTime.BeikeDelaySuction);
    //         const pos = Common.convertCurWorldPos(task.model1.extData.position);
    //         this.effCtrl.playBombEff(task.extData, pos);
    //         this.delayExecFun(GapTime.BeikeDelayShaking, () => {
    //             //吸他 
    //             task.closeAry.forEach((cell: CellModel) => {
    //                 if (cell && cell.extCtrl) {
    //                     cell.extCtrl.playShaking();
    //                 }
    //             });
    //             this.delayExecFun(GapTime.BeikeDelaySuction, () => {
    //                 task.closeAry.forEach((cell: CellModel) => {
    //                     if (cell && cell.extCtrl && cell.getType() < CellType.Bomb1 && task.model1.extData && cell.getType() != CellType.Fish) {
    //                         cell.extCtrl.playRotatingMerge(task.model1.extData.position);
    //                     }
    //                 });
    //                 this.execNormalElimate(task);
    //             })
    //         });
    //         this.delayExecFun(GapTime.BombPreShocks, () => {
    //             GroupAnimatCtrl.ins.playCellBombShocks(task.model1.pos, task.extData);
    //         });
    //     }
    // }

    private execFishBomb(task) {
        this.execNormalElimate(task);
        const pos = Common.convertCurWorldPos(task.model1.getPosition());
        this.effCtrl.playFishBombEff(pos);
        const [centerPos, bombLv] = [task.model1.pos, task.extData]
        this.delayExecFun(GapTime.FishBombPreShocks, () => {
            GroupAnimatCtrl.ins.playCellBombShocks(centerPos, bombLv);
        });
        task.model1.extCtrl && task.model1.extCtrl.playBombSingleDestoryEff(0, task.keepTime);
    }

    /**
     * 创建一个飞机,网格坐标!
     * @param startPos 起点位置 
     * @param targetPos 终点位置
    
    private createPlane(startPos: cc.Vec2, targetData: { pos: cc.Vec2, type: CellType }) {
        const planeNode = M.nodePool.getItem(NodePoolKey.Plane, this.planePrefab);
        planeNode.parent = this.maskNode;
        const ctrl = planeNode.getComponent(PlaneCtrl);
        ctrl.shootPlane(startPos, targetData.pos, GapTime.CreatePlaneDelayTime).then(() => {
            if (targetData.type) {
                this.gameModel.execElimateOne(targetData.pos, ElimateType.Bomb4);
                GroupAnimatCtrl.ins.playCreateBomb(targetData.type, targetData.pos, true, 0);
            } else {
                this.gameModel.execElimateOne(targetData.pos, ElimateType.Bomb4);
            }
        });
    }
    */

    /**
     * 执行横竖消除
     * @param task 
     */
    private execRowAndCol(task: GameTaskModel) {
        // const type = task.model1.getType();
        const pos = task.model1.pos;
        if (task.model1.extCtrl) {
            task.model1.isBomb = false;
            task.model1.extCtrl.playBombSingleDestoryEff(0, GapTime.RowAndColSelfElimate, true);
        }
        this.playRowAndColAni(task.extData, pos, task.closeAry);
        this.gameModel.task.freeTask(task);
    }

    /**
     * 
     * @param type 横的还是竖的
     * @param pos
     * @param closeAry
     */
    private playRowAndColAni(type: CellType, pos: cc.Vec2, closeAry: Set<CellModel>, elimateType?: ElimateType) {
        this.effCtrl.playRowColEff(type, Common.convertCurWorldPos(Common.getPos(pos.x, pos.y)));
        if (closeAry && closeAry.size > 0) {
            let [count, maxCount, isHavaBorn] = [1, closeAry.size, false];
            let eType = elimateType || type;
            GroupAnimatCtrl.ins.playRowElimate(pos, closeAry, <any>eType, (isborn) => {
                if (!this.gameModel) return
                if (isborn) isHavaBorn = true;
                count++;
                if (type == CellType.Bomb3 && !isHavaBorn) {
                    if (maxCount == count) {
                        console.error('竖消结束!');
                        this.gameModel.notifyFallColumnOver(pos);
                    }
                }
            });
        }
    }

    private collectPower(start: CellBase<any, any>, end: CellBase<any, any>) {

        this.basicCellViewCtrl.playCollectPower(this.uiNode, start, end);

    }

    private onUpdateComplexView(pos: cc.Vec2) {
        this.groundViewCtrl.updateComlexIteamByPos(pos);
    }

    private delayExecFun(time: number, fun: Function) {
        this.scheduleOnce(fun.bind(this), time);
    }

    /**
     * 执行彩虹消除
     * @param task 
     */
    private execRainbow(task: GameTaskModel) {
        task.type = ElimateType.Bomb5;
        const centerModel = <CellModel>task.model1;
        const worldPos = Common.getWorldPos(centerModel.extData);

        M.runtime.pauseGame();
        centerModel.extCtrl.playBombSingleDestoryEff(0, GapTime.RainbowCenterDelayElimate);
        this.effCtrl.playRainbowBomb(worldPos, () => {
            GroupAnimatCtrl.ins.playRainbowBomb(task.closeAry, worldPos, () => {
                M.runtime.resumeGame();
                if (!this.gameModel) return;
                this.delayExecFun(GapTime.StarsElimate, () => { this.effCtrl.removeShootStars() });
                this.execNormalElimate(task);
            });
        });


    }

    private playPropEff(task: GameTaskModel) {
        //执行道具消除动画 
        // if (task.extData == PropType.Bomb1) {
        //     task.model1.extCtrl && task.model1.extCtrl.elimate(task.size, task.model1.pos, task.type);
        //     GroupAnimatCtrl.ins.playRowElimate(task.model1, task.closeAry, task.type, null);
        // } else if (task.extData == PropType.Bomb2) {
        //     task.model1.extCtrl && task.model1.extCtrl.elimate(task.size, task.model1.pos, task.type);
        //     GroupAnimatCtrl.ins.playRowElimate(task.model1, task.closeAry, task.type, null);
        // } else if (task.extData == PropType.Rainbow) {
        //     this.execNormalElimate(task);
        // } 
    }

    private onChangeCellType(type: CellType, count: number = 3, isDelayCreate: boolean = true) {
        if (M.runtime.GameState == GameState.Normal) {
            //随机获取n个位置用来转换成指定类型
            const getOneCell = (): CellModel => {
                const y = Util.Tool.rangeInt(0, GameModel.GridSize.H, false);
                const x = Util.Tool.rangeInt(0, GameModel.GridSize.W, false);
                const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, cc.v2(x, y));
                if (cell && cell.extCtrl && !cell.isDeath && !this.gameModel.isHavaObs(cell.pos) && cell.getType() < CellType.Banana && cell.getType() != type) {
                    return cell;
                } else {
                    return getOneCell();
                }
            }

            if (!this.gameModel.checkIsAllDeath()) {
                for (let i = count; i--;) {
                    this.scheduleOnce(() => {
                        const cell = getOneCell();
                        cell.change2Cell(type);
                        cell.extCtrl.playChange2Cell();
                        const pos = this.uiNode.convertToNodeSpaceAR(Common.getWorldPos(cell.extData));
                        M.event.send(Event.Effect.CollectOver, pos, 'shanxian');
                    }, isDelayCreate ? i * 0.5 : 0);
                }
            }
        }
    }


    public onTestBtnClick() {
        // const data = M.table.ChapterStory.getByPrimaryKey(7);
        // UIMgr.ins.showUI(UIHudDef.StoryTalkPanel, data);

        // M.runtime.setMatch3Level(M.runtime.CurLevel + 1);
        // cc.director.loadScene('Match3');

        // const closeAry = BombModel.test11111(cc.v2(3, 3), 2);
        // console.error(closeAry);
        // closeAry.forEach(cell => {
        //     if (cell && cell.extCtrl) {
        //         cell.extData.setScale(1.1);
        //         // private createPlane(startPos: cc.Vec2, targetData: { pos: cc.Vec2, type: CellType })
        //         this.createPlane(cell.pos, { pos: cc.v2(3, 3), type: 1 });
        //     }
        // }); 
    }

    private checkUseProp() {
        if (M.runtime.SelectProp) {
            M.event.send(Event.GameCMD.PropClick, M.runtime.SelectProp);
            M.runtime.SelectProp = null;
        }
    }

    private checkTutorial() {
        // this.TutorialPanel.active = false;
        if (!this.tutorialData) {
            this.TutorialPanel.active = false;
        } else {
            this.TutorialPanel.active = true;
            this.TutorialPanel.getComponent(Match3TutorialCtrl).initView(this.tutorialData, this);
            this.startTutorial();
        }
    }

    startTutorial() {
        this.TutorialPanel.getComponent(Match3TutorialCtrl).startTutorial();
    }

    closeTutorial() {
        this.TutorialPanel.getComponent(Match3TutorialCtrl).closeTutorial();
    }

    /**********************GM ctrl star***********************/
    // private openGMPanel() {
    //     this.touchOpenGMPanelCount++;
    //     if (this.touchOpenGMPanelCount > 10 /*&& Apps.isDebug*/) {
    //         this.GmPanel.active = true;
    //         this.touchOpenGMPanelCount = 0;
    //     }
    // }

    // public onCloseGmPanel() {
    //     this.GmPanel.active = false;
    // }

    // public onJumpLv() {
    //     M.runtime.SelectLevel = 0;
    //     const edit: cc.EditBox = cc.find('jumpLv/box', this.GmPanel).getComponent(cc.EditBox);
    //     const nextLv = Number(edit.string);
    //     M.runtime.setMatch3Level(nextLv, true);
    //     Common.jumpScene(Scene.Match);
    // }

    /**********************GM ctrl end***********************/


    update(dt) {
        this.gameModel && this.gameModel.update(dt);
    }
}
