import UI from './ForestUI';

/** A solid, readable progress track shared by startup and level transitions. */
export default class LoadingProgress {
    readonly node:cc.Node;
    readonly percent:cc.Label;
    private ink:cc.Graphics;

    constructor(parent:cc.Node,private width:number,x=0,y=0) {
        this.node=UI.node(parent,'LoadingProgress',x,y);this.node.setContentSize(width,48);
        this.ink=this.node.addComponent(cc.Graphics);
        this.percent=UI.text(this.node,'0%',27,0,0,'#FFFFFF',width-32,40);
        const outline=this.percent.node.getComponent(cc.LabelOutline);
        if(outline){outline.color=cc.color().fromHEX('#314334');outline.width=2;}
        this.set(0);
    }

    set(value:number):number {
        const progress=Number.isFinite(value)?Math.max(0,Math.min(100,value)):0;
        if(!cc.isValid(this.node))return progress;
        const g=this.ink,w=this.width;g.clear();
        // Three solid surfaces keep the rim crisp at phone scale, without fine stacked highlights.
        g.fillColor=cc.color().fromHEX('#BE923F');g.roundRect(-w/2,-24,w,48,24);g.fill();
        g.fillColor=cc.color().fromHEX('#F7E8BB');g.roundRect(-w/2+3,-21,w-6,42,21);g.fill();
        g.fillColor=cc.color().fromHEX('#294634');g.roundRect(-w/2+8,-16,w-16,32,16);g.fill();
        const fill=(w-20)*progress/100;
        if(fill>0){
            g.fillColor=cc.color().fromHEX('#E5AD42');
            g.roundRect(-w/2+10,-14,fill,28,Math.min(14,fill/2));g.fill();
        }
        this.percent.string=Math.ceil(progress)+'%';
        return progress;
    }
}
