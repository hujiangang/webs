import GnomeModel from "./multipleGridCol/GnomeModel";
import TurtlesModel from "./multipleGridCol/TurtlesModel";
import CrabModel from "./multipleGridCol/CrabModel";
import { ILevel, Gnome } from "../../Data/Interface/Level/ILevel";
import GroundCellModel from "./GroundCellModel";
import MultipleGridColBase from "./multipleGridCol/MultipleGridColBase";

export default class MultipleGridColModel {

    private _gnome: GnomeModel = null;
    private _turtles: TurtlesModel = null;
    private _crab: CrabModel = null;

    constructor(data: ILevel, index) {
        if (data.gnome) {
            this._gnome = new GnomeModel(data.gnome, index);
        }
        if (data.turtles) {
            this._turtles = new TurtlesModel(data.turtles, index);
        }
        if (data.crab) {
            this._crab = new CrabModel(data.crab, index);
        }
    }

    public sync2View(list: GroundCellModel[][]) {
        this._crab && this._crab.sync2View(list);
        this._gnome && this._gnome.sync2View(list);
        this._turtles && this._turtles.sync2View(list);
    }

    public getConfig(type: string): Gnome[] {
        let result = null;
        const m = this.getModel(type);
        if (m) {
            result = m.config;
        }
        return result;
    }

    public getData(type: string): { [inx: number]: cc.Vec2[] } {
        let result = null;
        const m = this.getModel(type);
        if (m) {
            result = m.getData();
        }
        return result;
    }

    public checkItemOver(type: string, idx: number | string): boolean {
        let result = null;
        const m = this.getModel(type);
        if (m) {
            result = m.checkItemCompletByIndex(idx);
        }
        return result;
    }

    public updateItemCountByPos(type: string, pos: cc.Vec2): number | string {
        let result = null;
        const m = this.getModel(type);
        if (m) {
            result = m.updateItemCountByPos(pos);
        }
        return result;
    }

    public onComplet(type: string, index: number, topPoint: cc.Vec2) {
        const m = this.getModel(type);
        if (m) {
            m.onComplet(index, topPoint);
        }
    }

    public getModel(type: string): MultipleGridColBase {
        return { gnome: this._gnome, turtles: this._turtles, crab: this._crab }[type];
    }
}