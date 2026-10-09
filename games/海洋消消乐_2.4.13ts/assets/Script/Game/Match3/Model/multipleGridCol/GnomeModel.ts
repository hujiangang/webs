import MultipleGridColBase from "./MultipleGridColBase";
import { Gnome } from "../../../Data/Interface/Level/ILevel";
import Common from "../../../Common/Common";
import GroundCellModel from "../GroundCellModel";

export default class GnomeModel extends MultipleGridColBase {

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
                        groundItem.isGnome = true;
                        this._pool[i].push(pos);
                    }
                }
            }
        }
    }

    public onComplet(index: number, topPoint: cc.Vec2) {

    }

}