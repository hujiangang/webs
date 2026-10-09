import { ILevel } from '../Game/Data/Interface/Level/ILevel';

export const SpecialNames = {100:'爆破弹',101:'横向',102:'纵向',103:'流星球',104:'彩虹球',10:'小爆弹'};
export const SpecialCases: Array<{name: string, first: number, second?: number}> = [
    ...[101,102,100,103,104,10].map(type=>({name:SpecialNames[type],first:type}))
];
for (let first=100;first<=104;first++) for(let second=first;second<=104;second++) {
    SpecialCases.push({name:SpecialNames[first]+'＋'+SpecialNames[second],first,second});
}

/** Developer-only, in-memory fixture. Existing level files and player progression are untouched. */
export function createSpecialValidation(index: number): ILevel {
    const entry=SpecialCases[index];
    if (!entry) throw new Error('Unknown special validation case');
    const map = Array.from({length:9},(_,y)=>Array.from({length:7},(_,x)=>({type:(x+2*y)%5,born:y===0})));
    map[4][2].type=entry.first;
    map[4][3].type=entry.second==null?1:entry.second;
    if (entry.first===10) {
        // Swap the highlighted centre pair to complete a three-small-bomb match.
        map[4][2].type=10;map[4][3].type=1;map[3][3].type=10;map[5][3].type=10;
    }
    return {
        grid:[{collect:null,map}],collect:[{type:1,count:999}],
        chipset:[0,1,2,3,4].map(type=>({type,percent:20})),
        mergeLimit:null,
        levelInfo:{TO_LIGHTNING_ENOUGH:0,background:2,cellColorSeed:921,levelReward:0,movesLimit:99,
            version:'special-validation',timeLimit:0,entry:true,hardness:false,showTargetTitle:entry.name+'：中心两格向右交换',forceUpdate:false,score:[999999,1999999,2999999]}
    };
}
