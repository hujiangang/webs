export type MountainTheme = 'loading' | 'home' | 'pine' | 'rain' | 'red-earth';

/** Presentation-only backgrounds. Never changes level background IDs or ground rules. */
export default class MountainArt {
    private static frames: {[path: string]: Promise<cc.SpriteFrame>} = {};
    /** Portrait phones use their full height; desktop windows keep the playable portrait frame. */
    static prepareCanvas(): void {
        const canvas=cc.Canvas.instance;
        if(!canvas)return;
        const frame=cc.view.getFrameSize();
        canvas.fitWidth=true;
        canvas.fitHeight=frame.width/Math.max(1,frame.height)>750/1334;
    }
    static gameTheme(level: number): MountainTheme {
        const themes: MountainTheme[] = ['pine', 'rain', 'red-earth'];
        return themes[Math.floor(Math.max(0, level - 1) / 20) % themes.length];
    }
    static frame(name: string): Promise<cc.SpriteFrame> {
        const path = 'texture/mountain-ui/' + name;
        if (!this.frames[path]) {
            this.frames[path] = new Promise<cc.SpriteFrame>((resolve) => {
                cc.loader.loadRes(path, cc.SpriteFrame, (error, frame: cc.SpriteFrame) => {
                    if (error) { delete this.frames[path]; console.warn('界面美术加载失败，使用底色:', path); resolve(null); }
                    else resolve(frame);
                });
            });
        }
        return this.frames[path];
    }
    static background(parent: cc.Node, width: number, height: number, kind: MountainTheme = 'home'): cc.Node {
        const root = new cc.Node('MountainBackground-' + kind);
        root.parent = parent; root.setContentSize(width, height);
        const g = root.addComponent(cc.Graphics);
        g.fillColor = cc.color().fromHEX(kind === 'loading' ? '#7B9476' : '#405C4E');
        g.rect(-width / 2, -height / 2, width, height); g.fill();
        const name = kind === 'home' || kind === 'loading' ? kind + '-mountain' : 'game-' + kind;
        this.frame(name).then(frame => {
            if (!frame || !cc.isValid(root)) return;
            const art = new cc.Node('Artwork'); art.parent = root;
            const sprite = art.addComponent(cc.Sprite); sprite.spriteFrame = frame;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            const size = frame.getOriginalSize(), scale = Math.max(width / size.width, height / size.height);
            art.setContentSize(size.width * scale, size.height * scale);
        });
        return root;
    }
}
