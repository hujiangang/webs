/** Shared, generated RGBA atlas. The original PNG is retained without image processing. */
export default class ToyArt {
    private static frames:{[key:string]:cc.SpriteFrame}={};
    private static pending:Promise<void>=null;
    private static surfaces:cc.SpriteFrame[]=[];
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
                cc.loader.loadRes('texture/toy-ui/surfaces',cc.Texture2D,(surfaceError,atlas:cc.Texture2D)=>{
                    if(surfaceError){this.pending=null;reject(surfaceError);return;}
                    for(let i=0;i<8;i++){
                        const cw=atlas.width/4,ch=atlas.height/2;
                        const rect=cc.rect(Math.round(i%4*cw+cw*.075),Math.round(Math.floor(i/4)*ch+ch*.07),Math.round(cw*.87),Math.round(ch*.89));
                        const frame=new cc.SpriteFrame(atlas,rect,false,cc.v2(0,0),cc.size(rect.width,rect.height));
                        frame.insetLeft=frame.insetRight=112;frame.insetTop=frame.insetBottom=112;
                        this.surfaces.push(frame);
                    }
                    resolve();
                });
            });
        });
        return this.pending;
    }
    static frame(key:string|number):cc.SpriteFrame{return this.frames[String(key)]||null;}
    static surface(color:cc.Color):cc.SpriteFrame {
        const {r,g,b}=color;
        const index=r>210&&g>200?4:g>r*1.25&&g>b*1.2?0:r>g*1.3&&r>b*1.3?6:r>g*1.12&&b>g*1.2?3:r>105&&Math.max(r,g,b)-Math.min(r,g,b)<100?2:g>150&&b>180?5:1;
        return this.surfaces[index]||null;
    }
}
