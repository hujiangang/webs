
// View显示的动画类型
export enum SHOW_ACT_TYPE {
    DEFAULT = 1,
    SCALE = 2,
}

export default abstract class View {

    protected mRootNode: cc.Node = null;
    protected mNode: cc.Node = null;

    private mType: string = null;

    protected showActType = SHOW_ACT_TYPE.DEFAULT;

    constructor(type: string) {
        this.mType = type;
        this.init();
    }

    public init() {
        this.mRootNode = new cc.Node;//cc.find('Canvas');
        this.mRootNode.x = cc.winSize.width / 2;
        this.mRootNode.y = cc.winSize.height / 2;
        this.mRootNode.width = cc.winSize.width;
        this.mRootNode.height = cc.winSize.height;
        cc.game.addPersistRootNode(this.mRootNode);
    }

    //有关闭
    protected onHide() {
        this.mNode && (this.playHideAnimate());
    }

    //有开启
    protected onShow() {
        if (this.mNode) {
            this.playShowAnimate();
        } else {
            throw (new Error('Error: View must be init ! '));
        }
    }

    // 显示的动画类型
    public setShowActType(showActType: SHOW_ACT_TYPE) {
        this.showActType = showActType;
    }

    public destroy() {
        this.mNode = null;
        this.mRootNode = null;
    }

    protected abstract playShowAnimate();
    protected abstract playHideAnimate();
};




