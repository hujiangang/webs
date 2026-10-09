export const PropPresentation = {
    100:{name:'爆破弹',detail:'将选中的元素变为爆破弹'},
    101:{name:'小木锤',detail:'敲除选中格子的一层元素'},
    102:{name:'重排',detail:'重新排列棋盘上的元素'},
    103:{name:'十字消除',detail:'清除选中位置的一行和一列'}
};
export interface JournalEntry {id:string;name:string;image:string;description:string;habitat?:string;note?:string;}
export function levelWindow(current:number,total:number):number[] {
    const start=Math.max(1,Math.min(current-5,total-19));
    return Array.from({length:Math.min(20,total-start+1)},(_,i)=>start+i);
}
/** One synchronous debit/grant; rejected purchases have no side effects. */
export function purchaseProp(runtime:any,config:{id:number;price:number;currencyType:number}):boolean {
    if(!config || config.currencyType!==0 || !Number.isFinite(config.price) || config.price<=0)return false;
    if(runtime.getCurrency(0)<config.price)return false;
    runtime.getPropData(config.id);
    runtime.addCurrency(0,-config.price);runtime.updatePropCount(config.id,1);return true;
}

/** At most one locked preview; the scroll boundary is the current progression, never level 500. */
export function levelPathLimit(current:number,total:number):number {
    return Math.min(total,Math.max(1,Math.floor(current))+1);
}
