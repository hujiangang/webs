export default class Titles {

    constructor(data: any) {
        this.lv = data.lv;
        this.setTC(data.showTargetContent);
        this.setNC(data.novContent);
    }

    public lv: number;

    public showTargetContent: string = null;

    public novContent: string = null;

    private setTC(c: string) {
        if (c && c != '') {
            this.showTargetContent = c;
        }
    }

    private setNC(c: string) {
        if (c && c != '') {
            this.novContent = c;
        }
    }
}