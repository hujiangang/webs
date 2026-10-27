export type HomeArtKey = 'background' | 'hero' | 'marker' | 'shop' | 'game' | 'book';

/** Home-only artwork. Source PNGs remain unchanged; SpriteFrames omit transparent padding. */
export default class HomeArt {
    private static frames: {[key:string]:cc.SpriteFrame} = {};
    private static pending: Promise<void> = null;

    static frame(key:HomeArtKey):cc.SpriteFrame { return this.frames[key] || null; }

    static load():Promise<void> {
        if (this.pending) return this.pending;
        this.pending = Promise.all(['background','hero','marker','navigation'].map(name => this.loadTexture(name)))
            .then(() => { this.pending = null; });
        return this.pending;
    }

    private static loadTexture(name:string):Promise<void> {
        if (this.frames[name === 'navigation' ? 'shop' : name]) return Promise.resolve();
        return new Promise<void>(resolve => {
            cc.loader.loadRes('texture/home-v4/' + name, cc.Texture2D, (error, texture:cc.Texture2D) => {
                if (error || !texture) { console.warn('主页美术加载失败，保留基础界面:', name); resolve(); return; }
                const add = (key:HomeArtKey, x:number, y:number, width:number, height:number) => {
                    const rect = cc.rect(x,y,width,height);
                    this.frames[key] = new cc.SpriteFrame(texture,rect,false,cc.v2(0,0),cc.size(width,height));
                };
                if (name === 'hero') add('hero',32,100,1549,803);
                else if (name === 'marker') add('marker',140,160,980,940);
                else if (name === 'navigation') {
                    add('shop',30,50,680,620);
                    add('game',755,55,660,610);
                    add('book',1475,55,680,610);
                } else add('background',0,0,texture.width,texture.height);
                resolve();
            });
        });
    }

    static sprite(parent:cc.Node,name:string,key:HomeArtKey,width:number,height:number,x=0,y=0):cc.Node {
        const node=new cc.Node(name);node.parent=parent;node.setPosition(x,y);node.setContentSize(width,height);
        const apply=()=>{
            if(!cc.isValid(node))return;
            const frame=this.frame(key);if(!frame)return;
            const sprite=node.getComponent(cc.Sprite)||node.addComponent(cc.Sprite);
            sprite.spriteFrame=frame;sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
            const size=frame.getOriginalSize(),fit=Math.min(width/size.width,height/size.height);
            node.setContentSize(size.width*fit,size.height*fit);
        };
        if(this.frame(key))apply();else this.load().then(apply);
        return node;
    }

    static background(parent:cc.Node,width:number,height:number):cc.Node {
        const node=new cc.Node('HomeBackground');node.parent=parent;node.setContentSize(width,height);
        const base=node.addComponent(cc.Graphics);base.fillColor=cc.color(66,91,65);
        base.rect(-width/2,-height/2,width,height);base.fill();
        const apply=()=>{
            if(!cc.isValid(node))return;
            const frame=this.frame('background');if(!frame)return;
            const art=new cc.Node('Artwork');art.parent=node;
            const sprite=art.addComponent(cc.Sprite);sprite.spriteFrame=frame;sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
            const size=frame.getOriginalSize(),fit=Math.max(width/size.width,height/size.height);
            art.setContentSize(size.width*fit,size.height*fit);
        };
        if(this.frame('background'))apply();else this.load().then(apply);
        return node;
    }
}
