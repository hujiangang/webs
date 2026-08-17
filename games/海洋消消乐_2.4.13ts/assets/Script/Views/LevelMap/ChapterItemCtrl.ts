import ChapterInfo from "../../Base/Tabls/ChapterInfo";
import Common from "../../Logic/Common/Common";
import Paths from "../../Base/Utils/Paths";
import M from "../../Base/Manager/M";
import EventMgr from "../../Base/Manager/EventMgr";
import { Event } from "../../Logic/Data/Const/Event";

const { ccclass, property } = cc._decorator;
const ContentOffsetX = 120;

@ccclass
export default class ChapterItemCtrl extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Node)
    islandParent: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Label)
    lvScope: cc.Label = null;

    @property(cc.Label)
    chapterName: cc.Label = null;

    @property(cc.Label)
    detailLab: cc.Label = null;

    @property(cc.Node)
    lockNode: cc.Node = null;

    @property(cc.Node)
    infoNode: cc.Node = null;

    private _data: ChapterInfo = null;
    private _isLocked: boolean = false;
    private _clickCallBack: Function = null;

    public init(data: ChapterInfo, isLandScale: number = 1, clickCallback?: Function) {
        this.lockNode.active = false;
        if (data) {
            this._data = data;
            this.chapterName.string = data.name;
            this.detailLab.string = data.detail;
            this.islandParent.scale = isLandScale;
            this._clickCallBack = clickCallback;
            this.lockNode.scale = isLandScale;
            this.lvScope.string = `${data.minLv}-${data.maxLv}关`;
            this.lockNode.active = this._isLocked = (M.runtime.getMatch3Level() < data.minLv);
            this._initIsland(data.resId);
        }
    }

    private _onClick() {
        if (this._data && !this._isLocked) {
            this._clickCallBack && this._clickCallBack(this._data);

            // M.event.send(Event.UI.ShowSelectLevelView, this._data);
        }
    }

    private _initIsland(resId: string) {
        Common.getRes(`${Paths.LevelMapPath}island_${resId}`, cc.Prefab).then(eff => {
            if (eff) {
                const island = M.nodePool.createItem(eff);
                island.parent = this.islandParent;
                island.on(cc.Node.EventType.TOUCH_END, this._onClick, this);
                this.infoNode.active = false;

                if (this.islandParent.scale != 1) {
                    this._setIslandOffset(Number(resId));
                }
                this._showLock(island);
            } else {
                console.error('章节岛屿加载失败!');
            }
        });
    }

    private _showLock(islandNode: cc.Node) {
        if (this._isLocked) {
            islandNode.getComponent(cc.Button).interactable = false;
            this.chapterName.getComponent(cc.LabelOutline).enabled = true;
        } else {
            islandNode.getComponent(cc.Button).interactable = true;
            this.chapterName.getComponent(cc.LabelOutline).enabled = false;
        }
    }

    private _setIslandOffset(resId: number) {
        this.infoNode.active = true;
        if (resId % 2 == 0) {
            this.node.x += ContentOffsetX;
        } else {
            this.node.x += -ContentOffsetX;
        }
    }

    public doCloudUnlock() {
        this.lockNode.active = true;
        this.scheduleOnce(() => {
            let animation = this.lockNode.getComponent(cc.Animation);
            animation.play();
            EventMgr.ins.send(Event.UI.LevelSceneTouched, true);
        }, 1.5);
    }

    public onFinished() {
        console.error("播放解锁动画完毕");
        this.lockNode.active = false;
    }
}
