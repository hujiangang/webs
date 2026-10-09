import MultipleGridColBase from "./MultipleGridColBase";
import GroundCellModel from "../GroundCellModel";
import { Gnome } from "../../../Data/Interface/Level/ILevel";
import Common from "../../../Common/Common";
import GameModel from "../GameModel";
import { CellModel } from "../CellModel";
import { MsgType } from "../CellBase";
import { ElimateType, GroundType } from "../../../Data/Const/Constant";

export default class CrabModel extends MultipleGridColBase {

    public sync2View(groundList: GroundCellModel[][]) {
        if (!this._cfg) return;

        this._count = this._cfg.length;
        for (let i = 0; i < this._count; i++) {
            const cfg: Gnome = this._cfg[i];
            if (!this._pool[i]) this._pool[i] = [];

            let isCross = false;
            if (cfg.type % 2 == 0) {
                //横着的 
                isCross = true;
            }
            const max = ((Math.floor(cfg.type / 2) + 1) * 2);
            const min = max / 2;
            let dir = null;

            for (let k = 0; k < min; k++) {
                for (let j = 0; j < max; j++) {
                    isCross ? (dir = cc.v2(j, k)) : (dir = cc.v2(k, j));
                    const pos = cc.v2(cfg.x, cfg.y).add(dir);
                    const groundItem = Common.safeGet2ArrayValue(groundList, pos);
                    if (groundItem) {
                        groundItem.initCrab(i);
                        this._pool[i].push(pos);
                    }
                }
            }
        }
    }

    public onComplet(dir: number, pos: cc.Vec2) {
        const line = GameModel.ins.CellList[pos.y];
        let closeAry: Array<CellModel> = null;
        if (dir > 0) {
            closeAry = line.slice(pos.x, line.length);
        } else {
            closeAry = line.slice(0, pos.x);
            closeAry.sort((a, b) => {
                if (a && b) {
                    return b.pos.x - a.pos.x;
                }
            })
        }
        GameModel.ins.execElimate(closeAry[0], new Set(closeAry), ElimateType.Bomb6, null, null);
    }

    public freeGrid(point: cc.Vec2, index: number) {
        const list = GameModel.ins.GroundList;
        for (let i = 0; i < list.length; i++) {
            const listx = list[i];
            for (let x = 0; x < listx.length; x++) {
                const gc = listx[x];
                if (gc && gc.getType() == GroundType.Crab && gc.zIndex == index) {
                    gc.freeThisPos();
                }
            }
        }
        let notifyPosY = point.y == 0 ? 0 : point.y - 1;
        const notifyCell = GameModel.ins.CellList[notifyPosY];
        notifyCell.forEach(c => {
            c && c.onMsg(MsgType.Fall);
        })
    }

}