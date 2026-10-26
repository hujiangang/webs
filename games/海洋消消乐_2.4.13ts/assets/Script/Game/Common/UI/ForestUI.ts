import ToyArt from './ToyArt';
import SpecialPieceArt from '../../Match3/View/SpecialPieceArt';
import MountainArt, { MountainTheme } from './MountainArt';
/** Shared engine UI: natural colours, solid game controls and local artwork. */
export const Palette = { ink:'#243E35', muted:'#6B7761', blue:'#456E59', purple:'#797D9A', cream:'#F3E8CB', green:'#89B844', gold:'#E9B95F' };
export default class ForestUI {
    static clear(parent: cc.Node) { parent.children.slice().forEach(n=>{n.removeFromParent();n.destroy();}); }
    static node(parent: cc.Node, name:string, x=0,y=0):cc.Node {
        const n=new cc.Node(name);n.parent=parent;n.setPosition(x,y);return n;
    }
    static box(parent:cc.Node,name:string,w:number,h:number,x=0,y=0,color='#FFFFFF',r=24,shadow=false):cc.Node {
        const n=this.node(parent,name,x,y);n.setContentSize(w,h);
        this.paintBox(n,color,r,shadow);return n;
    }
    /** Quiet supporting surfaces; reserve the illustrated bevel for primary actions. */
    static panel(parent:cc.Node,name:string,w:number,h:number,x=0,y=0,color=Palette.cream,r=28):cc.Node {
        const n=this.node(parent,name,x,y);n.setContentSize(w,h);
        const g=n.addComponent(cc.Graphics),base=cc.color().fromHEX(color);
        g.fillColor=cc.color(18,39,27,70);g.roundRect(-w/2,-h/2-8,w,h,r);g.fill();
        g.fillColor=cc.color(base.r*.70,base.g*.73,base.b*.68);g.roundRect(-w/2,-h/2-3,w,h,r);g.fill();
        g.fillColor=base;g.roundRect(-w/2,-h/2,w,h,r);g.fill();
        g.lineWidth=2;g.strokeColor=cc.color(255,253,223,170);g.roundRect(-w/2+2,-h/2+2,w-4,h-4,Math.max(1,r-2));g.stroke();
        return n;
    }
    static paintBox(n:cc.Node,color:string,r=24,shadow=false):void {
        const w=n.width,h=n.height,g=n.getComponent(cc.Graphics)||n.addComponent(cc.Graphics);g.clear();
        const oldSurface=n.getChildByName('Surface');if(oldSurface){oldSurface.removeFromParent();oldSurface.destroy();}
        const base=cc.color().fromHEX(color),rr=Math.min(r,w/2,h/2);
        const tone=(factor:number)=>cc.color(Math.min(255,base.r*factor),Math.min(255,base.g*factor),Math.min(255,base.b*factor));
        if(shadow){g.fillColor=cc.color(17,37,26,90);g.roundRect(-w/2-2,-h/2-10,w+4,h+3,rr);g.fill();}
        g.fillColor=tone(.55);g.roundRect(-w/2,-h/2-6,w,h+6,rr);g.fill();
        g.fillColor=tone(1.12);g.roundRect(-w/2,-h/2+3,w,h-3,rr);g.fill();
        const iw=w-8,ih=h-10,ir=Math.max(0,rr-5);
        const bands=Math.max(20,Math.ceil(ih/3));
        for(let i=0;i<bands;i++){
            const y=-ih/2+i*ih/bands,mid=y+ih/(bands*2),edge=Math.max(0,Math.abs(mid)-(ih/2-ir));
            const inset=ir-Math.sqrt(Math.max(0,ir*ir-edge*edge));
            g.fillColor=tone(.86+.22*i/(bands-1));g.rect(-iw/2+inset,y,iw-2*inset,ih/bands+.3);g.fill();
        }
        g.lineWidth=2;g.strokeColor=cc.color(255,249,209,125);g.roundRect(-w/2+6,-h/2+9,w-12,h-18,Math.max(2,rr-7));g.stroke();
    }
    static text(parent:cc.Node,text:string,size=28,x=0,y=0,color=Palette.ink,width=600,height=60):cc.Label {
        const n=this.node(parent,'Text',x,y);n.setContentSize(width,height);n.color=cc.color().fromHEX(color);
        const label=n.addComponent(cc.Label);label.string=text;label.fontSize=size;label.lineHeight=size+9;
        label.horizontalAlign=cc.Label.HorizontalAlign.CENTER;label.verticalAlign=cc.Label.VerticalAlign.CENTER;
        label.overflow=cc.Label.Overflow.SHRINK;label.enableBold=size>=25;
        if(color==='#FFFFFF'){const outline=n.addComponent(cc.LabelOutline);outline.color=cc.color(32,64,43);outline.width=size>=30?2:1;}
        n.setContentSize(width,height);return label;
    }
    static tap(n:cc.Node,action:()=>void) {
        const sx=n.scaleX,sy=n.scaleY;
        const release=()=>{cc.Tween.stopAllByTarget(n);cc.tween(n).to(.14,{scaleX:sx,scaleY:sy},{easing:'backOut'}).start();};
        n.on(cc.Node.EventType.TOUCH_START,()=>{cc.Tween.stopAllByTarget(n);n.setScale(sx*.94,sy*.94);});
        n.on(cc.Node.EventType.TOUCH_CANCEL,release);
        n.on(cc.Node.EventType.TOUCH_END,(e:cc.Event.EventTouch)=>{
            release();
            if(e.getLocation().sub(e.getStartLocation()).mag()>18)return;
            e.stopPropagation();action();
        });
    }
    static button(parent:cc.Node,text:string,w:number,h:number,x:number,y:number,action:()=>void,color=Palette.blue):cc.Node {
        const n=this.box(parent,'Button-'+text,w,h,x,y,color,Math.min(24,h/2),true);
        this.text(n,text,27,0,0,color==='#EDF0FA'?Palette.ink:'#FFFFFF',w-20,h-4);this.tap(n,action);return n;
    }
    /** Sage purchase controls share the forest palette; coins supply the gold accent. */
    static purchaseButton(parent:cc.Node,text:string,w:number,h:number,x:number,y:number,action:()=>void):cc.Node {
        const n=this.node(parent,'PurchaseButton',x,y);n.setContentSize(w,Math.max(90,h));
        const g=n.addComponent(cc.Graphics),radius=20;
        g.fillColor=cc.color().fromHEX('#718267');g.roundRect(-w/2,-h/2-5,w,h,radius);g.fill();
        g.fillColor=cc.color().fromHEX('#E0E6CD');g.roundRect(-w/2,-h/2,w,h,radius);g.fill();
        g.fillColor=cc.color().fromHEX('#C8D5B4');g.roundRect(-w/2+3,-h/2+3,w-6,h-10,radius-3);g.fill();
        this.text(n,text,30,0,0,'#293F32',w-24,h-4);this.tap(n,action);return n;
    }
    static background(parent:cc.Node,w:number,h:number,game:boolean|MountainTheme=false):cc.Node {
        const n=MountainArt.background(parent,w,h,typeof game==='string'?game:game?'pine':'home');
        n.name='ForestBackground';
        return n;
    }
    static icon(parent:cc.Node,kind:string,x=0,y=0,size=64,color='#FFFFFF'):cc.Node {
        const n=this.node(parent,'Icon-'+kind,x,y);n.setContentSize(size,size);n.scale=size/64;
        const frame=ToyArt.frame(kind);
        if(frame){n.scale=1;const sprite=n.addComponent(cc.Sprite);sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;sprite.spriteFrame=frame;const rect=frame.getOriginalSize(),fit=size/Math.max(rect.width,rect.height);n.setContentSize(rect.width*fit,rect.height*fit);return n;}
        const g=n.addComponent(cc.Graphics);g.fillColor=cc.color().fromHEX(color);g.strokeColor=g.fillColor;g.lineWidth=5;g.lineCap=cc.Graphics.LineCap.ROUND;
        const line=(points:number[][])=>{g.moveTo(points[0][0],points[0][1]);points.slice(1).forEach(p=>g.lineTo(p[0],p[1]));g.stroke();};
        if(kind==='coin'){g.circle(0,0,25);g.fill();g.strokeColor=cc.color().fromHEX('#CF9131');g.circle(0,0,18);g.stroke();g.fillColor=g.strokeColor;g.roundRect(-4,-11,8,22,3);g.fill();}
        else if(kind==='heart'){g.moveTo(0,-24);g.bezierCurveTo(-50,7,-22,39,0,18);g.bezierCurveTo(22,39,50,7,0,-24);g.fill();}
        else if(kind==='mushroom'){g.fillColor=cc.color().fromHEX('#EBD8B6');g.roundRect(-10,-25,20,29,8);g.fill();g.fillColor=cc.color().fromHEX('#B091DB');g.moveTo(-29,0);g.bezierCurveTo(-28,40,28,40,29,0);g.close();g.fill();g.fillColor=cc.color(255,250,234);g.circle(-11,12,5);g.fill();g.circle(13,9,4);g.fill();}
        else if(kind==='hammer'){g.roundRect(-5,-26,10,36,4);g.fill();g.fillColor=cc.color().fromHEX('#F5CD7B');g.roundRect(-22,3,44,25,8);g.fill();}
        else if(kind==='cross'){g.roundRect(-8,-27,16,54,5);g.fill();g.roundRect(-27,-8,54,16,5);g.fill();}
        else if(kind==='shuffle'){line([[-25,15],[-13,15],[12,-15],[25,-15]]);line([[-25,-15],[-13,-15],[12,15],[25,15]]);line([[17,24],[26,15],[17,6]]);line([[17,-6],[26,-15],[17,-24]]);}
        else if(kind==='profile'){g.circle(0,13,12);g.fill();g.roundRect(-23,-25,46,24,12);g.fill();}
        else if(kind==='book'){g.roundRect(-24,-25,48,50,6);g.stroke();line([[0,-24],[0,24]]);line([[-16,12],[-8,12]]);line([[8,12],[16,12]]);}
        else if(kind==='shop'){g.roundRect(-23,-23,46,40,5);g.stroke();g.roundRect(-29,10,58,15,5);g.fill();line([[-10,-22],[-10,-3],[9,-3],[9,-22]]);}
        else if(kind==='settings'){for(let i=0;i<8;i++){const a=i*Math.PI/4;line([[Math.cos(a)*18,Math.sin(a)*18],[Math.cos(a)*28,Math.sin(a)*28]]);}g.circle(0,0,18);g.stroke();g.circle(0,0,6);g.stroke();}
        else if(kind==='menu'){for(const y of [-16,0,16]){g.circle(-23,y,3);g.fill();line([[-10,y],[24,y]]);}}
        else if(kind==='music'){line([[-8,-12],[-8,21],[17,26],[17,-7]]);g.circle(-15,-15,8);g.fill();g.circle(10,-10,8);g.fill();}
        else if(kind==='sound'){g.moveTo(-24,-8);g.lineTo(-14,-8);g.lineTo(0,-21);g.lineTo(0,21);g.lineTo(-14,8);g.lineTo(-24,8);g.close();g.fill();line([[12,15],[20,0],[12,-15]]);}
        else if(kind==='vibration'){g.roundRect(-12,-23,24,46,5);g.stroke();line([[-22,14],[-27,0],[-22,-14]]);line([[22,14],[27,0],[22,-14]]);}
        else if(kind==='lock'){g.roundRect(-18,-22,36,29,6);g.fill();g.roundRect(-12,-2,24,28,12);g.stroke();}
        else if(kind==='star'){for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,r=i%2?12:27; i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r);}g.close();g.fill();}
        else if(kind==='close'){line([[-13,-13],[13,13]]);line([[-13,13],[13,-13]]);}
        return n;
    }
    static modal(parent:cc.Node,title:string,height=550,onClose?:()=>void):{root:cc.Node,panel:cc.Node,close:()=>void} {
        const root=this.node(parent,'Modal');root.zIndex=999;root.setContentSize(cc.winSize);root.addComponent(cc.BlockInputEvents);
        const g=root.addComponent(cc.Graphics);g.fillColor=cc.color(13,30,22,190);g.rect(-cc.winSize.width/2,-cc.winSize.height/2,cc.winSize.width,cc.winSize.height);g.fill();
        const width=Math.min(cc.winSize.width-64,620);this.box(root,'Rim',width+16,height+18,0,-3,'#324F3C',38,true);const panel=this.panel(root,'Panel',width,height,0,0,Palette.cream,34);
        const head=this.box(panel,'Heading',width-80,86,0,height/2-20,Palette.blue,28,true);this.text(head,title,34,0,0,'#FFFFFF',width-155);
        const close=()=>{if(onClose)onClose();root.removeFromParent();root.destroy();};
        const cross=this.button(panel,'',58,58,width/2-12,height/2-13,close,'#B66B4E');this.icon(cross,'close',0,0,38);
        panel.scale=.94;cc.tween(panel).to(.18,{scale:1},{easing:'backOut'}).start();
        return {root,panel,close};
    }
    static propIcon(parent:cc.Node,type:number,size=72):cc.Node {
        const n=this.node(parent,'PropIcon');n.setContentSize(size,size);
        const body=this.node(n,'Toy');const sprite=body.addComponent(cc.Sprite);sprite.sizeMode=cc.Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame=type===100?SpecialPieceArt.frame(100):ToyArt.frame(type===101?'hammer':type===102?'shuffle':'cross');
        const frame=sprite.spriteFrame;
        if(frame){const rect=frame.getOriginalSize(),fit=size*1.03/Math.max(rect.width,rect.height);body.setContentSize(rect.width*fit,rect.height*fit);}
        else body.setContentSize(size,size);
        body.y=5;
        return n;
    }
}
