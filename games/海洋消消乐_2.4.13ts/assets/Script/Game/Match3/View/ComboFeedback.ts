import M from '../../../Application/M';
import { NodePoolKey } from '../../Data/Const/Constant';
import { Event } from '../../Data/Const/Event';
import { AudioID } from '../../Common/AudioCtrl';

export type ComboPraiseName = 'great' | 'awesome' | 'fantastic' | 'blossom';

/** Presentation only. Combo thresholds and score calculation remain in their existing models. */
export default class ComboFeedback {
    private static frames: { [name: string]: cc.SpriteFrame } = {};
    private static pending: Promise<void> = null;
    private static readonly crops: { [name: string]: number[] } = {
        great: [377, 9, 784, 233],
        awesome: [264, 246, 1008, 250],
        fantastic: [257, 496, 1022, 254],
        blossom: [259, 750, 1024, 274]
    };

    private disposed = false;
    private generation = 0;
    private active = new Map<cc.Node, () => void>();

    constructor(private parent: cc.Node, private prefab: cc.Prefab = null) {}

    static voiceFor(name:string):AudioID {
        switch(name){
            case 'great': return AudioID.ComboGreat;
            case 'awesome': return AudioID.ComboAwesome;
            case 'fantastic': return AudioID.ComboFantastic;
            case 'blossom': return AudioID.ComboBlossom;
            default: return null;
        }
    }

    static preload(): Promise<void> {
        if (this.frames.great) return Promise.resolve();
        if (this.pending) return this.pending;
        this.pending = new Promise<void>(resolve => {
            cc.loader.loadRes('texture/mountain-ui/combo-praise', cc.Texture2D, (error, texture: cc.Texture2D) => {
                if (!error && texture) {
                    Object.keys(this.crops).forEach(name => {
                        const crop = this.crops[name];
                        this.frames[name] = new cc.SpriteFrame(texture, cc.rect(crop[0], crop[1], crop[2], crop[3]), false, cc.v2(0, 0), cc.size(crop[2], crop[3]));
                    });
                } else console.warn('连消提示图片加载失败，暂用文字显示');
                resolve();
            });
        }).then(() => { this.pending = null; });
        return this.pending;
    }

    /** Returns a cancellation function so a development panel can close during playback. */
    static preview(parent: cc.Node, name: ComboPraiseName, y = 0, hold = 3): () => void {
        const feedback = new ComboFeedback(parent);
        feedback.play(name, () => M.event.send(Event.Sound.PlaySoundEff, ComboFeedback.voiceFor(name)), y, hold)
            .then(() => feedback.dispose());
        return () => feedback.dispose();
    }

    async play(name: string, onStarted?: () => void, y = 200, hold = .38): Promise<boolean> {
        if (!ComboFeedback.crops[name] || this.disposed || !cc.isValid(this.parent)) return false;
        const generation = this.generation;
        await ComboFeedback.preload();
        if (this.disposed || generation !== this.generation || !cc.isValid(this.parent)) return false;
        const node = this.prefab ? M.nodePool.getItem(NodePoolKey.ComboEff, this.prefab) : new cc.Node('ComboPraisePreview');
        const animation = node.getComponent(cc.Animation);
        if (animation) {
            // A reused legacy node may still carry bound finished listeners or frame tracks.
            animation.off('finished');
            animation.stop();
            animation.enabled = false;
        }
        node.stopAllActions();
        cc.Tween.stopAllByTarget(node);
        node.parent = this.parent;
        node.active = true;
        node.zIndex = 110;
        node.setPosition(0, y);
        node.setScale(.72);
        node.opacity = 0;
        node.color = cc.color(255, 255, 255);
        this.applyArtwork(node, name);

        return new Promise<boolean>(resolve => {
            let finished = false;
            const complete = (played: boolean) => {
                if (finished) return;
                finished = true;
                this.active.delete(node);
                cc.Tween.stopAllByTarget(node);
                if (cc.isValid(node)) {
                    node.stopAllActions();
                    if (this.prefab) M.nodePool.freeItem(NodePoolKey.ComboEff, node);
                    else node.destroy();
                }
                resolve(played);
            };
            this.active.set(node, () => complete(false));
            if (onStarted) onStarted();
            cc.tween(node)
                .to(.14, { scale: 1.08, opacity: 255 }, { easing: 'backOut' })
                .to(.10, { scale: 1 })
                .delay(Math.max(0, hold))
                .to(.28, { y: y + 36, opacity: 0, scale: 1.04 }, { easing: 'quadIn' })
                .call(() => complete(true))
                .start();
        });
    }

    /** Reset the current round while keeping this presenter available for the next round. */
    cancel(): void {
        this.generation++;
        Array.from(this.active.values()).forEach(cancel => cancel());
        this.active.clear();
    }

    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        this.cancel();
    }

    private applyArtwork(node: cc.Node, name: string): void {
        const frame = ComboFeedback.frames[name];
        const sprite = node.getComponent(cc.Sprite) || node.addComponent(cc.Sprite);
        let fallback = node.getChildByName('FallbackPraise');
        if (frame) {
            sprite.enabled = true;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = frame;
            const size = frame.getOriginalSize(), scale = Math.min(440, cc.winSize.width - 80) / 1024;
            node.setContentSize(size.width * scale, size.height * scale);
            if (fallback) fallback.active = false;
        } else {
            sprite.enabled = false;
            if (!fallback) {
                fallback = new cc.Node('FallbackPraise');
                fallback.parent = node;
            }
            fallback.active = true;
            const label = fallback.getComponent(cc.Label) || fallback.addComponent(cc.Label);
            label.string = name[0].toUpperCase() + name.slice(1) + '!';
            label.fontSize = 62;
            label.lineHeight = 70;
            label.enableBold = true;
            label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
            label.verticalAlign = cc.Label.VerticalAlign.CENTER;
            label.overflow = cc.Label.Overflow.SHRINK;
            node.setContentSize(Math.min(480, cc.winSize.width - 80), 120);
            fallback.setContentSize(node.width, node.height);
            fallback.color = cc.color(255, 220, 125);
            const outline = fallback.getComponent(cc.LabelOutline) || fallback.addComponent(cc.LabelOutline);
            outline.color = cc.color(33, 74, 35);
            outline.width = 4;
        }
    }
}
