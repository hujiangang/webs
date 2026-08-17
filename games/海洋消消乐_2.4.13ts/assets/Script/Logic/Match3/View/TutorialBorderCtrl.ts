import { IStage } from '../../Data/Interface/Level/ITutorial';
import Common from '../../Common/Common';

const { ccclass, property } = cc._decorator;

@ccclass
export default class TutorialBorderCtrl extends cc.Component {

    @property([cc.SpriteFrame])
    borderFrames: cc.SpriteFrame[] = [];

    private stage: IStage = null;

    // onLoad () {}

    setData(stage: IStage) {
        this.stage = stage;
        if (this.stage && this.stage.cells) {
            let xMin = Number.MAX_VALUE, xMax = 0, yMin = Number.MAX_VALUE, yMax = 0;
            this.stage.cells.forEach(element => {
                xMin = xMin < element.x ? xMin : element.x;
                xMax = xMax > element.x ? xMax : element.x;

                yMin = yMin < element.y ? yMin : element.y;
                yMax = yMax > element.y ? yMax : element.y;
            });

            for (let y = yMin - 1; y <= yMax + 1; y++) {
                for (let x = xMin - 1; x <= xMax + 1; x++) {
                    const borderName = this.getBorderSpriteName(x, y);
                    if (Common.getGroundBorderInfo(borderName)) {
                        this.initBorderView(borderName, x, y);
                    }
                }
            }
        }


    }

    private initBorderView(name: string, x, y) {
        const cfg = Common.getGroundBorderInfo(name);
        const pos = Common.getPos(x, y);

        pos.x -= Common.GRID_W / 2;
        pos.y += Common.GRID_H / 2;

        this.createBorder(pos, cfg, name)
    }

    private createBorder(pos: cc.Vec2, cfg: any, name: string) {
        const borderNode = new cc.Node();
        const sprite = borderNode.addComponent(cc.Sprite);

        borderNode.parent = this.node;
        borderNode.zIndex = 2;
        sprite.trim = false;
        sprite.spriteFrame = this.getBorderFrame(cfg[0]);
        borderNode.setPosition(pos);
        borderNode.setScale(cfg[1]);
        borderNode.setContentSize(cc.size(Common.GRID_W, Common.GRID_H));
    }

    private getBorderFrame(name: string): cc.SpriteFrame {
        let result: cc.SpriteFrame = null;
        for (let i = this.borderFrames.length; i--;) {
            let frame = this.borderFrames[i];
            if (frame.name.includes(name)) {
                result = frame;
            }
        }
        if (!result) {
            console.error('没找到资源:----->', name);
        }
        return result;
    }

    private getBorderSpriteName(x, y): string {
        let name = "";
        name += this.getCellEmptyStatus(x - 1, y - 1);
        name += this.getCellEmptyStatus(x, y - 1);
        name += this.getCellEmptyStatus(x - 1, y);
        name += this.getCellEmptyStatus(x, y);
        return name;
    }

    private getCellEmptyStatus(x, y): number {
        let result = 0;
        this.stage.cells.forEach(element => {
            if (element.x == x && element.y == y) {
                result = 1;
            }
        });
        return result;
    }

    // update (dt) {}
}
