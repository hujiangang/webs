
import MultipleGridColBase from "./MultipleGridColBase";
import GameModel from "../GameModel";
import { Gnome } from "../../../Data/Interface/Level/ILevel";
import Common from "../../../Common/Common";
import { MsgType } from "../CellBase";
import GroundCellModel from "../GroundCellModel";

export default class TurtlesModel extends MultipleGridColBase {

    public onComplet(index: number, topPoint: cc.Vec2) {
        const stateDirs = [cc.v2(0, 0), cc.v2(1, 0), cc.v2(1, 1), cc.v2(0, 1)];
        stateDirs.forEach(dir => {
            const gcell = Common.safeGet2ArrayValue(GameModel.ins.GroundList, topPoint.add(dir));
            if (gcell) {
                gcell.freeThisPos();
            }
        });
        const notifyDirs = [cc.v2(0, -1), cc.v2(1, -1)];
        notifyDirs.forEach(dir => {
            const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, topPoint.add(dir));
            if (cell) {
                cell.onMsg(MsgType.Fall);
            }
        })
    }

    public sync2View(groundList: GroundCellModel[][]) {
        if (!this._cfg) return;
        this._count = this._cfg.length;
        for (let i = 0; i < this._count; i++) {
            const cfg: Gnome = this._cfg[i];
            if (!this._pool[i]) this._pool[i] = [];
            const pos = cc.v2(cfg.x, cfg.y);
            const topPointModel = Common.safeGet2ArrayValue(groundList, pos);
            topPointModel.initTurtles(pos);
            this._pool[i].push(pos);
            const tmpDirs = [cc.v2(1, 0), cc.v2(0, 1), cc.v2(1, 1)];
            tmpDirs.forEach(dir => {
                const groundItem = Common.safeGet2ArrayValue(groundList, pos.add(dir));
                if (groundItem) {
                    groundItem.initTurtles(pos);
                    this._pool[i].push(groundItem.pos);
                }
            });
        }
    }

}