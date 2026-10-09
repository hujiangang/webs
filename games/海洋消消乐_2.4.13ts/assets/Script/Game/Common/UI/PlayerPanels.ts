import UI, { Palette } from './ForestUI';
import M from '../../../Application/M';
import { Event } from '../../Data/Const/Event';
import { NativeKey, Scene, MaxPowerCount } from '../../Data/Const/Constant';
import { StorageMgr } from '../../Data/StorageMgr';
import Common from '../Common';
import { PropPresentation, purchaseProp } from '../../Home/LobbyCatalog';

export default class PlayerPanels {
    static settings(parent:cc.Node) {
        const modal=UI.modal(parent,'设置',430), p=modal.panel;
        const opts=StorageMgr.Storage.getObject(NativeKey.Sound,{bgm:true,eff:true});
        const vib=cc.sys.localStorage.getItem('forest.vibration')!=='false';
        const states=[opts['bgm'],opts['eff'],vib];
        ['音乐','音效','震动'].forEach((name,i)=>{
            const x=(i-1)*170;UI.text(p,name,27,x,70,Palette.ink,150);
            const button=UI.box(p,'Toggle-'+name,112,112,x,-20,states[i]?Palette.green:'#B8BFD2',40,true);
            UI.icon(button,['music','sound','vibration'][i],0,0,58);
            const state=UI.text(p,states[i]?'已开启':'已关闭',22,x,-110,Palette.muted,150);
            UI.tap(button,()=>{
                states[i]=!states[i];state.string=states[i]?'已开启':'已关闭';
                UI.paintBox(button,states[i]?Palette.green:'#9DAFC1',56,true);
                if(i<2){M.event.send(Event.Sound.UpdateOpt,i===0?'bgm':'eff',states[i]);if(i===0){states[i]?cc.audioEngine.resumeMusic():cc.audioEngine.pauseMusic();}}
                else {cc.sys.localStorage.setItem('forest.vibration',String(states[i]));if(states[i])M.platform.vibrateShort();}
            });
        });
        return modal;
    }
    static profile(parent:cc.Node) {
        const modal=UI.modal(parent,'个人信息',430),p=modal.panel;
        const avatar=UI.box(p,'Avatar',128,128,-185,30,'#D7EBD9',32,true);UI.icon(avatar,'mushroom',0,0,84,Palette.cream);
        const profile=M.runtime.getPlayerProfile();
        UI.text(p,profile.name,32,65,62,Palette.ink,310);
        UI.text(p,profile.id>0?'ID: '+profile.id:'本地玩家',23,65,0,Palette.muted,310);
        const badge=UI.box(p,'Level',460,86,0,-112,'#E6EAFE',24);UI.text(badge,'当前关卡  '+M.runtime.getMatch3Level(),29,0,0);
        return modal;
    }
    static buyProp(parent:cc.Node,type:number,onChanged?:()=>void) {
        const cfg=M.table.PropInfo.getByPrimaryKey(type),info=PropPresentation[type];
        const m=UI.modal(parent,'补充道具',510),p=m.panel;
        const icon=UI.propIcon(p,type,108);icon.y=100;
        UI.text(p,info.name+' × 1',31,0,10);UI.text(p,info.detail,23,0,-45,Palette.muted,500);
        const price=cfg?cfg.price:0;
        const balance=UI.text(p,'金币余额  '+M.runtime.getCurrency(0),24,0,-106,Palette.ink,500);
        UI.button(p,price+' 金币购买',370,78,0,-188,()=>{
            if(!purchaseProp(M.runtime,cfg)){balance.string='金币不足，通关可以获得金币';balance.node.color=cc.color().fromHEX('#C16F75');return;}
            if(onChanged)onChanged();m.close();
        },Palette.green);
        return m;
    }
    static pause(parent:cc.Node) {
        const m=UI.modal(parent,'游戏菜单',560),p=m.panel;
        UI.text(p,'第 '+M.runtime.CurLevel+' 关',30,0,130);
        UI.button(p,'继续游戏',390,78,0,38,m.close,Palette.green);
        UI.button(p,'重新开始',390,78,0,-62,()=>{m.close();M.runtime.SelectLevel=M.runtime.CurLevel;M.event.send(Event.GameCMD.GameReset);});
        UI.button(p,'返回关卡',390,78,0,-162,()=>{m.close();M.ui.closeAllUI();M.runtime.SelectLevel=0;Common.jumpScene(Scene.Home);},Palette.purple);
        return m;
    }
}
