/** Shared, generated RGBA atlas. The original PNG is retained without image processing. */
export default class ToyArt {
    private static frames:{[key:string]:cc.SpriteFrame}={};
    private static pending:Promise<void>=null;
    static load():Promise<void>{
        if(this.pending)return this.pending;
        this.pending=new Promise<void>((resolve,reject)=>{
            cc.loader.loadRes('texture/toy-ui/toy-atlas',cc.Texture2D,(error,texture:cc.Texture2D)=>{
                if(error){this.pending=null;reject(error);return;}
                const keys=['100','101','102','103','104','10','hammer','shuffle','cross','coin','heart','star','shop','book','lock','mushroom'];
                keys.forEach((key,i)=>{
                    const x=Math.round(i%4*texture.width/4),y=Math.round(Math.floor(i/4)*texture.height/4);
                    const right=Math.round((i%4+1)*texture.width/4),bottom=Math.round((Math.floor(i/4)+1)*texture.height/4);
                    // Untrimmed board sprites use originalSize; it must describe this cell, not the atlas.
                    this.frames[key]=new cc.SpriteFrame(texture,cc.rect(x,y,right-x,bottom-y),false,cc.v2(0,0),cc.size(right-x,bottom-y));
                });
                this.loadMountainIcons().then(resolve);
            });
        });
        return this.pending;
    }
    static frame(key:string|number):cc.SpriteFrame{return this.frames[String(key)]||null;}
    /** Keep original special pieces; replace UI-only sprites with the natural material set. */
    private static loadMountainIcons():Promise<void>{
        return new Promise<void>(resolve=>{
            cc.loader.loadRes('texture/mountain-ui/icons',cc.Texture2D,(error,texture:cc.Texture2D)=>{
                if(!error&&texture){
                    // Explicit source bounds avoid neighbouring art and retain the mallet handle.
                    const areas:{[key:string]:number[]}={
                        hammer:[.025,.015,.325,.34],shuffle:[.37,.02,.29,.325],cross:[.69,.035,.29,.30],
                        coin:[.025,.365,.31,.29],heart:[.37,.375,.295,.27],star:[.70,.37,.28,.28],
                        shop:[.025,.66,.325,.30],book:[.375,.675,.32,.275],lock:[.715,.65,.25,.315]
                    };
                    Object.keys(areas).forEach(key=>{
                        const a=areas[key],rect=cc.rect(Math.floor(a[0]*texture.width),Math.floor(a[1]*texture.height),Math.floor(a[2]*texture.width),Math.floor(a[3]*texture.height));
                        this.frames[key]=new cc.SpriteFrame(texture,rect,false,cc.v2(0,0),cc.size(rect.width,rect.height));
                    });
                }else console.warn('自然风格图标加载失败，保留现有图标');
                cc.loader.loadRes('texture/match3/objects/cells/obj0',cc.SpriteFrame,(mushroomError,frame:cc.SpriteFrame)=>{
                    if(!mushroomError&&frame)this.frames.mushroom=frame;
                    resolve();
                });
            });
        });
    }
}
