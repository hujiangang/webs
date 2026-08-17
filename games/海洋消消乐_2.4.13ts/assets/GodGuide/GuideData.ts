export class GuideData {
    //11关之后首次失败
    private static _firstFailed: boolean = false;

    //任务已经完成的Task文件
    private static _finishedTaskName = [];
    //标记未完成且条件不满足的task
    private static _markNoConditionTask = [];

    public static set firstFailed(v: boolean) {
        this._firstFailed = v;
    }

    public static get firstFailed(): boolean {
        return this._firstFailed;
    }

    public static get finishedTaskName() {
        return this._finishedTaskName;
    }

    public static get markNoConditionTask() {
        return this._markNoConditionTask;
    }

    public static pushNoConditionTask(filename: string) {
        if (this._markNoConditionTask.indexOf(filename) == -1) {
            this._markNoConditionTask.push(filename);
        }
        // console.error("标记条件不满足的task", this._markNoConditionTask);

    }

    public static pushFinishedTask(filename: string) {
        if (this._finishedTaskName.indexOf(filename) == -1) {
            this._finishedTaskName.push(filename);
        }
        // console.error("标记删除的task", this._finishedTaskName);
    }

    public static clearMarkTasks() {
        this._finishedTaskName = [];
        this._markNoConditionTask = [];
    }


}
window["GuideData"] = GuideData;