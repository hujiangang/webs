import UI, { Palette } from './ForestUI';
import M from '../../../Application/M';
import { Event } from '../../Data/Const/Event';
import { NativeKey, Scene, MaxPowerCount } from '../../Data/Const/Constant';
import { StorageMgr } from '../../Data/StorageMgr';
import Common from '../Common';
import { PropPresentation, purchaseProp } from '../../Home/LobbyCatalog';

export default class PlayerPanels {
    static settings(parent:cc.Node) {
        const modal=UI.modal(parent,'设置',450), p=modal.panel;
        const opts=StorageMgr.Storage.getObject(NativeKey.Sound,{bgm:true,eff:true});
        const vib=cc.sys.localStorage.getItem('forest.vibration')!=='false';
        const states=[opts['bgm'],opts['eff'],vib];
        ['音乐','音效','震动'].forEach((name,i)=>{
            const x=(i-1)*170;UI.text(p,name,28,x,82,Palette.ink,150);
            const button=UI.box(p,'Toggle-'+name,118,118,x,-20,states[i]?Palette.green:'#839080',59,true);
            UI.icon(button,['music','sound','vibration'][i],0,2,63,'#FFF4D4');
            const state=UI.text(p,states[i]?'已开启':'已关闭',23,x,-111,states[i]?'#426449':Palette.muted,150);
            UI.tap(button,()=>{
                states[i]=!states[i];state.string=states[i]?'已开启':'已关闭';
                UI.paintBox(button,states[i]?Palette.green:'#839080',59,true);state.node.color=cc.color().fromHEX(states[i]?'#426449':Palette.muted);
                if(i<2){M.event.send(Event.Sound.UpdateOpt,i===0?'bgm':'eff',states[i]);}
                else {cc.sys.localStorage.setItem('forest.vibration',String(states[i]));if(states[i])M.platform.vibrateShort();}
            });
        });
        return modal;
    }
    static profile(parent:cc.Node) {
        const modal=UI.modal(parent,'个人信息',470),p=modal.panel;
        const avatar=UI.box(p,'Avatar',142,142,-182,28,'#526F4D',37,true);UI.icon(avatar,'mushroom',0,3,116,Palette.cream);
        const profile=M.runtime.getPlayerProfile();
        UI.text(p,profile.name,34,80,66,Palette.ink,300);
        UI.text(p,profile.id>0?'ID: '+profile.id:'本地玩家',23,80,3,Palette.muted,300);
        const badge=UI.box(p,'Level',446,91,0,-130,'#587848',30,true);UI.icon(badge,'star',-150,2,51,'#E9C473');UI.text(badge,'当前关卡  '+M.runtime.getMatch3Level(),30,24,0,'#FFF4D4',330);
        return modal;
    }
    static buyProp(parent:cc.Node,type:number,onChanged?:()=>void) {
        const cfg=M.table.PropInfo.getByPrimaryKey(type),info=PropPresentation[type];
        const m=UI.modal(parent,'补充道具',550),p=m.panel;
        const icon=UI.propIcon(p,type,166);icon.y=105;
        UI.text(p,info.name+' × 1',32,0,9);UI.text(p,info.detail,24,0,-47,Palette.muted,500);
        const price=cfg?cfg.price:0;
        const balance=UI.text(p,'金币余额  '+M.runtime.getCurrency(0),24,0,-108,Palette.ink,500);
        UI.purchaseButton(p,price+' 金币购买',390,86,0,-198,()=>{
            if(!purchaseProp(M.runtime,cfg)){balance.string='金币不足，通关可以获得金币';balance.node.color=cc.color().fromHEX('#A1523D');return;}
            if(onChanged)onChanged();m.close();
        });
        return m;
    }
    static pause(parent:cc.Node) {
        const m=UI.modal(parent,'游戏菜单',560),p=m.panel;
        UI.text(p,'第 '+M.runtime.CurLevel+' 关',30,0,130);
        UI.button(p,'继续游戏',390,78,0,38,m.close,Palette.green);
        UI.button(p,'重新开始',390,78,0,-62,()=>{m.close();M.runtime.SelectLevel=M.runtime.CurLevel;M.event.send(Event.GameCMD.GameReset);});
        UI.button(p,'返回关卡',390,78,0,-162,()=>{m.close();M.ui.closeAllUI();M.runtime.SelectLevel=0;Common.jumpScene(Scene.Home);},'#817655');
        return m;
    }
}
