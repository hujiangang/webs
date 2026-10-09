export default class ChapterInfo {

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.detail = data.detail || '';
        this.resId = data.res;
        this.setLv(data.lv)
    }

    public readonly id: number = null;

    public readonly name: string = null;

    public readonly detail: string = null;

    public readonly resId: string = null;

    public minLv: number = 0;

    public maxLv: number = 0;


    private setLv(cs: string) {
        if (cs) {
            const sc = <any>cs.split('|')
            this.minLv = Number(sc[0]);
            this.maxLv = Number(sc[1]);
        }
    }
}