import ToyArt from '../../Common/UI/ToyArt';
export const SpecialTypes = [10, 100, 101, 102, 103, 104];
/** Special pieces use the shared production atlas loaded before gameplay. */
export default class SpecialPieceArt {
    public static supports(type:number):boolean{return SpecialTypes.indexOf(Number(type))>=0;}
    public static frame(type:number):cc.SpriteFrame{return this.supports(type)?ToyArt.frame(type):null;}
}
