import GodGuide from "./GodGuide";
import { Locator } from "./Locator";
import { GuideUtils } from "./GuideUtils";
import { GuideData } from "./GuideData";

let async = require('async');

const { ccclass, property } = cc._decorator;
@ccclass
export default class LoadGuide extends cc.Component {

    //显示的文本
    callback: any;


    @property(cc.Prefab)
    PREFAB: cc.Prefab = null; //预制件

    @property(cc.Node)
    parent: cc.Node = null;  //预制件实例化后所在的父节点

    @property()
    zIndex = 0;

    @property([cc.String])
    tasks = []

    _godGuide: GodGuide;

    // onLoad() {
    //     if (!CC_EDITOR) {
    //         this.loadPrefab();
    //     }
    // }

    // start() {
    //     this.runTask();
    // }


    loadPrefab() {
        try {
            let node = cc.instantiate(this.PREFAB);
            node.zIndex = this.zIndex;
            node.setPosition(cc.v2(0, 0));
            //不持久化到编辑器
            // node._objFlags = cc.Object.Flags.DontSave;
            node.parent = this.parent || this.node;
            this._godGuide = node.getComponent('GodGuide');
        }
        catch (error) {
            cc.error(this.PREFAB);
            cc.error(error);
        }
    }

    init() {
        this.loadPrefab();
        this.runTask();
        Locator.init();
    }

    runTask() {
        GuideUtils.logError("LoadGuide runTask");
        async.eachSeries(this.tasks, (taskFile, cb) => {
            GuideUtils.logError('taskFile---------->', taskFile)
            let { task } = require(taskFile);
            this._godGuide.setTask(task);
            this._godGuide.run(cb);
        }, (err) => {
            // if (err) {
            //     console.error('task err = ', err);
            // }
            GuideUtils.logError('任务全部完成');
            this.checkTaskFile();
        });
    }

    public checkTaskFile() {
        let finishedTask = GuideData.finishedTaskName;
        let noConditionTask = GuideData.markNoConditionTask;
        // console.error(" ------ ", finishedTask, noConditionTask);
        for (var j = 0; j < this.tasks.length; ++j) {
            if (finishedTask.indexOf(this.tasks[j]) != -1 && noConditionTask.indexOf(this.tasks[j]) == -1) {
                this.tasks.splice(j, 1);
                // console.error("删除文件", this.tasks[j]);
                j = j - 1;
            }
        }
        // console.error("当前task文件", this.tasks);
        GuideData.clearMarkTasks();
    }

    //实时推入引导文件
    public pushTask(taskName, forceRun) {
        if (!taskName) return;
        if (this.tasks.indexOf(taskName) == -1) {
            let newTask = [];
            let taskIndex = this.taskFiles.indexOf(taskName);
            if (taskIndex == -1) {
                console.error("没有添加配置文件到TaskFiles中", taskName);
                return;
            }
            newTask[taskIndex] = taskName;
            for (var i = 0; i < this.tasks.length; ++i) {
                taskIndex = this.taskFiles.indexOf(this.tasks[i]);
                if (taskIndex == -1) {
                    console.error("没有添加配置文件到TaskFiles中", this.tasks[i]);
                    break;
                }
                newTask[taskIndex] = this.tasks[i];
            }
            for (var j = 0; j < newTask.length; ++j) {
                if (newTask[j] == null) {
                    newTask.splice(j, 1);
                    j = j - 1;
                }
            }
            this.tasks = newTask;
            this.runTask();
        } else {
            forceRun && this.runTask();
        }
        // console.error(this.tasks);
    }

    //移除引导文件 如果本引导全部执行完毕
    public removeTask(taskName: string) {
        console.error(taskName);
    }

    //当前所有的指引文件 顺序很重要
    public taskFiles = ["_Guide_level1", "_Guide_level3", "_Guide_level3_1", "_Guide_level3_2",
        "_Guide_level4", "_Guide_level10", "_Guide_level11", "_Guide_level11_1", "_Guide_level15_rank",
        "_Guide_level21", "_Guide_level30"];

}
