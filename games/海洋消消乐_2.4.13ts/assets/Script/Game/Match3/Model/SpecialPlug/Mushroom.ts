import GroundCellModel from "../GroundCellModel";
import GameModel from "../GameModel";

export default class Mushroom {

    private _content: Set<GroundCellModel> = null;
    private _map: Map<cc.Vec2, GroundCellModel> = null;

    constructor() {
        this._content = new Set();
        this._map = new Map();
    }

    public init() {

    }

    public add(pos: cc.Vec2, model: GroundCellModel) {
        this._content.add(model);
        this._map.set(pos, model);
    }

    public del(pos: cc.Vec2) {
        this._map.delete(pos);
        if (this._map.size <= 0) {
            requestAnimationFrame(this._destory.bind(this));
        }
    }

    private _destory() {
        this._content.forEach(cell => {
            cell.freeThisPos();
            GameModel.ins.testFindCanFallCell(cell.pos, GameModel.ins.seq.next());
            cell.extCtrl && cell.extCtrl.hideMushroom();
            cell.extCtrl && cell.extCtrl.PlayShanhuAnim();
        });
        this._content.clear();
    }

}