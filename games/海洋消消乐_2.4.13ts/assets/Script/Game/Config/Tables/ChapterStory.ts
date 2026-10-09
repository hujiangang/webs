export default class ChapterStory {

    constructor(data: any) {
        this.chapterId = data.id;
        this.trigger = data.trigger;
        this.infomation = data.infomation;
        this.resetContentAry(data.content);
    }

    public readonly chapterId: number = null;

    public readonly trigger: number = null;

    public readonly infomation: string = null;

    public storys: Array<{ rid: number, name: string, content: string, isLeft: boolean }> = null;

    private resetContentAry(cs: Array<string>) {
        if (cs) {
            this.storys = [];
            cs.forEach(c => {
                if (c) {
                    const sc = <any>c.split('|')
                    this.storys.push({ rid: Number(sc[0]), name: sc[1], isLeft: !Number(sc[2]), content: sc[3] });
                }
            });
        }
    }
}