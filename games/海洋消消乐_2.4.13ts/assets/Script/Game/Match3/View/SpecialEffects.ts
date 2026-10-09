import SpecialPieceArt from './SpecialPieceArt';
import EffectTimeline from './EffectTimeline';
import Common from '../../Common/Common';
import GameModel from '../Model/GameModel';

const { ccclass } = cc._decorator;
type Visual = {node: cc.Node, graphics: cc.Graphics, icon: cc.Sprite};

/** Scene-owned procedural effects. Visual capacity never drops gameplay callbacks. */
@ccclass
export default class SpecialEffects extends cc.Component {
    private timeline = new EffectTimeline();
    private pool: Visual[] = [];
    private active = 0;
    private disposed = false;
    public update(dt: number): void { this.timeline.update(dt); }
    public cancel(): void { this.timeline.cancel(); }
    public onDestroy(): void {
        this.disposed = true;
        this.cancel();
        this.pool.forEach(v => v.node.destroy());
        this.pool = [];
    }
    private acquire(): Visual {
        if (this.active >= 64) return null;
        let visual = this.pool.pop();
        if (!visual) {
            const node = new cc.Node('SpecialEffect');
            const graphics = node.addComponent(cc.Graphics);
            const iconNode = new cc.Node('Icon'); iconNode.parent = node;
            const icon = iconNode.addComponent(cc.Sprite);
            icon.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            iconNode.setContentSize(Common.GRID_W, Common.GRID_H);
            visual = {node, graphics, icon};
        }
        visual.node.parent = this.node; visual.node.active = true;
        visual.node.opacity = 255; visual.node.scale = 1; visual.node.angle = 0;
        visual.icon.node.active = false; visual.icon.node.angle=0;visual.icon.node.setPosition(0,0);visual.icon.node.setContentSize(Common.GRID_W,Common.GRID_H);
        visual.graphics.clear(); this.active++;
        return visual;
    }
    private release(v: Visual): void {
        if (!v) return;
        v.graphics.clear();v.node.active=false;v.icon.spriteFrame=null;this.active--;
        if (this.disposed) v.node.destroy(); else this.pool.push(v);
    }
    private run(seconds: number, draw: (v: Visual, t: number) => void): Promise<boolean> {
        if (this.disposed) return Promise.resolve(false);
        const visual=this.acquire();
        return this.timeline.run(seconds, t=>{if(visual){visual.graphics.clear();draw(visual,t);}},()=>this.release(visual));
    }
    private local(world: cc.Vec2): cc.Vec2 { return this.node.convertToNodeSpaceAR(world) as cc.Vec2; }
    private color(type: number): cc.Color {
        return cc.color().fromHEX(type===101?'#2EAEE3':type===102||type===10?'#F79B33':type===103?'#3CBE96':'#9F5CE0');
    }
    public pulse(world: cc.Vec2, type: number, duration=.4, radius=1): Promise<boolean> {
        const p=this.local(world), color=this.color(type), size=Common.GRID_W;
        return this.run(duration,(v,t)=>{
            v.node.setPosition(p);v.node.opacity=255*(1-t);
            const g=v.graphics;g.strokeColor=color;g.lineWidth=5*(1-t)+1;
            g.circle(0,0,size*(.15+t*.75)*radius);g.stroke();
            g.fillColor=color;
            for(let i=0;i<8;i++){const a=i*Math.PI/4,r=size*(.15+t*.8)*radius;g.circle(Math.cos(a)*r,Math.sin(a)*r,3*(1-t)+1);g.fill();}
        });
    }
    public charge(world: cc.Vec2, type: number, duration=.4): Promise<boolean> {
        const p=this.local(world);
        return this.run(duration,(v,t)=>{
            v.node.setPosition(p);v.icon.node.active=true;v.icon.spriteFrame=SpecialPieceArt.frame(type);
            v.node.scale=1+Math.sin(t*Math.PI)*.22;v.node.opacity=255*(1-Math.max(0,t-.65)/.35);
            if(type===104)v.icon.node.angle=t*50;
        });
    }
    public line(world: cc.Vec2, type: number, duration=.5): Promise<boolean> {
        const p=this.local(world), color=this.color(type);
        const vertical=type===102;
        const size=GameModel.GridSize;
        const first=this.local(Common.convertCurWorldPos(Common.getPos(-.5,-.5)));
        const last=this.local(Common.convertCurWorldPos(Common.getPos(size.W-.5,size.H-.5)));
        const low=vertical?last.y-p.y:first.x-p.x, high=vertical?first.y-p.y:last.x-p.x;
        return this.run(duration,(v,t)=>{
            v.node.setPosition(p);v.node.opacity=255*(1-t);
            const g=v.graphics, progress=Math.min(1,t*2), from=low*progress, to=high*progress;
            g.strokeColor=color;g.lineWidth=Common.GRID_W*.18;
            g.moveTo(vertical?0:from,vertical?from:0);g.lineTo(vertical?0:to,vertical?to:0);g.stroke();
            g.strokeColor=cc.color(255,249,225);g.lineWidth=3;
            g.moveTo(vertical?0:from,vertical?from:0);g.lineTo(vertical?0:to,vertical?to:0);g.stroke();
        });
    }
    private ribbon(g:cc.Graphics,points:cc.Vec2[],color:cc.Color,width:number) {
        g.strokeColor=color;g.lineWidth=width;g.lineCap=cc.Graphics.LineCap.ROUND;g.lineJoin=cc.Graphics.LineJoin.ROUND;
        g.moveTo(points[0].x,points[0].y);points.slice(1).forEach(p=>g.lineTo(p.x,p.y));g.stroke();
    }
    private spark(g:cc.Graphics,x:number,y:number,r:number,color:cc.Color) {
        g.fillColor=color;g.moveTo(x,y+r);g.lineTo(x+r*.3,y+r*.3);g.lineTo(x+r,y);
        g.lineTo(x+r*.3,y-r*.3);g.lineTo(x,y-r);g.lineTo(x-r*.3,y-r*.3);
        g.lineTo(x-r,y);g.lineTo(x-r*.3,y+r*.3);g.close();g.fill();
    }
    public flight(start: cc.Vec2, end: cc.Vec2, duration: number, carry?: number): Promise<boolean> {
        const a=this.local(start), b=this.local(end),bend=Math.min(155,a.sub(b).mag()*.23+45);
        const point=(p:number)=>cc.v2(a.x+(b.x-a.x)*p,a.y+(b.y-a.y)*p+Math.sin(p*Math.PI)*bend);
        return this.run(duration,(v,t)=>{
            const p=Math.max(0,(t-.12)/.88),head=point(p);
            v.node.setPosition(0,0);v.icon.node.active=true;v.icon.spriteFrame=SpecialPieceArt.frame(103);
            v.icon.node.setPosition(head);v.icon.node.setContentSize(102,102);
            const dx=b.x-a.x,dy=b.y-a.y+Math.cos(p*Math.PI)*Math.PI*bend;
            // Atlas comet tail points up-right, so its head travels toward the lower-left diagonal.
            v.icon.node.angle=Math.atan2(dy,dx)*180/Math.PI+135;
            const g=v.graphics,points=[];
            for(let i=0;i<=10;i++)points.push(point(Math.max(0,p-.24+i*.024)));
            this.ribbon(g,points,cc.color(37,184,232,65),42);
            this.ribbon(g,points,cc.color(65,227,189,175),25);
            this.ribbon(g,points,cc.color(220,255,220,235),10);
            for(let i=0;i<4;i++){
                const q=point(Math.max(0,p-.06-i*.045));
                this.spark(g,q.x+Math.sin(i*2+t*12)*12,q.y+Math.cos(i*3+t*10)*12,7-i,cc.color(245,255,200,210-i*35));
            }
            if(SpecialPieceArt.supports(carry)){g.fillColor=this.color(carry);g.circle(head.x+24,head.y-23,14);g.fill();}
        });
    }
    public link(start: cc.Vec2, end: cc.Vec2, duration=.48): Promise<boolean> {
        const a=this.local(start),b=this.local(end),delta=b.sub(a);
        const bend=Math.min(50,Math.sqrt(delta.x*delta.x+delta.y*delta.y)*.08);
        const point=(p:number)=>cc.v2(delta.x*p,delta.y*p+Math.sin(p*Math.PI)*bend);
        const colors=[cc.color(255,113,142,190),cc.color(255,216,79,215),cc.color(79,225,235,210)];
        return this.run(duration,(v,t)=>{
            v.node.setPosition(a);const g=v.graphics,progress=Math.min(1,t/.72),head=point(progress);
            v.node.opacity=t<.72?255:255*(1-(t-.72)/.28);
            const points=[];for(let i=0;i<=8;i++)points.push(point(Math.max(0,progress-.38+i*.0475)));
            this.ribbon(g,points,cc.color(174,118,255,70),38);
            colors.forEach((color,i)=>this.ribbon(g,points.map(p=>cc.v2(p.x,p.y+(i-1)*6)),color,9));
            g.fillColor=cc.color(255,255,230);g.circle(head.x,head.y,10);g.fill();
            this.spark(g,head.x,head.y,17,cc.color(255,255,240,220));
            if(t>.68){const hit=(t-.68)/.32;g.strokeColor=cc.color(255,229,115,240);g.lineWidth=7*(1-hit)+2;g.circle(delta.x,delta.y,16+hit*22);g.stroke();
                for(let i=0;i<5;i++){const angle=i*Math.PI*2/5,r=16+hit*30;this.spark(g,delta.x+Math.cos(angle)*r,delta.y+Math.sin(angle)*r,7*(1-hit)+2,colors[i%3]);}}
        });
    }
}
