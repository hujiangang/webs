const { ccclass, property } = cc._decorator;

@ccclass
export default class MapBgScript extends cc.Component {

    // @property(cc.Sprite)
    // mapSprite: cc.Sprite = null;

    _mapScale = 2;

    // @property(cc.String)
    // mapId: string = "";

    // @property(cc.Sprite)
    // spriteBg: cc.Sprite = null;

    onLoad() {
        // this.node.width = 1000;
        // this.node.height = 800;
        this.node.scale = this._mapScale;
    }

    // showInEditor: boolean = true;
    // onEnable() {
    //     if (CC_EDITOR && this.showInEditor) {
    //         console.error("sss");
    //         // cc.loader.loadRes("texture/map/bg/" + this.mapId, cc.SpriteFrame, (error, spriteFrame) => {
    //         //     if (!error) this.spriteBg.spriteFrame = spriteFrame;
    //         // });
    //     }
    //     this.node.scale = this._mapScale;
    // }
}