import RoadUtils from "../../../../../Base/Utils/RoadUtil";
import Walk from "./Walk";
import { Util } from "../../../../../Base/Utils/Util";
import { Event } from "../../../../Data/Const/Event";
import EventMgr from "../../../../../Base/Manager/EventMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TrafficSystem extends cc.Component {
    private walkMap: Map<string, Array<cc.Vec2>> = new Map<string, Array<cc.Vec2>>();
    private walkNode: Map<string, Array<string>> = new Map<string, Array<string>>();

    @property([cc.Prefab])
    walkPrefab: cc.Prefab[] = [];

    @property([cc.Node])
    area: cc.Node[] = [];

    walkList: cc.Node[] = [];

    onLoad() {
    }

    onDestroy() {
        EventMgr.ins.unRegister(Event.Map.WalkEnd, this.doNextWalk, this)
    }

    start() {
        EventMgr.ins.register(Event.Map.WalkEnd, this.doNextWalk, this)

        this.initWalkRoad();
        this.executeWalk();
    }

    private initWalkRoad() {
        let anim_com = this.node.getComponent(cc.Animation);
        var clips = anim_com.getClips();
        var clip = clips[0];
        var paths = clip.curveData.paths;

        for (let key in paths) {
            var data = paths[key].props.position;
            this.walkMap.set(key, RoadUtils.getRoadData(data));

            let node = key.split('-');
            let arr1 = this.walkNode.get(node[0]) || [];
            arr1.push(key);
            this.walkNode.set(node[0], arr1);

            let arr2 = this.walkNode.get(node[1]) || [];
            arr2.push(key.split('').reverse().join(''));
            this.walkNode.set(node[1], arr2);
        }
    }

    private executeWalk() {
        let walkPrefab = [].concat(this.walkPrefab);
        let startKeys = Array.from(this.walkNode.keys());

        for (var i = 0; i < 3; i++) {
            let start = startKeys.splice(Util.Tool.rangeInt(0, startKeys.length, false), 1)[0];
            let [end, path] = this.getRandomPath(start);

            let idx = Util.Tool.rangeInt(0, walkPrefab.length, false);
            let walk = cc.instantiate(walkPrefab.splice(idx, 1)[0]);
            walk.getComponent(Walk).startWalk({
                start: start,
                end: end,
                path: path
            });
            this.area[0].addChild(walk);
        }
    }

    private getRandomPath(start: string): [string, cc.Vec2[]] {
        let pathArr = this.walkNode.get(start);
        let pathName = pathArr[Util.Tool.rangeInt(0, pathArr.length, false)];
        let end = pathName.replace(start + '-', '');

        let pathdata = this.walkMap.get(this.walkMap.has(pathName) ? pathName : `${end}-${start}`);
        let path = this.walkMap.has(`${start}-${end}`) ? [].concat(pathdata) : [].concat(pathdata).reverse();
        return [end, path]
    }

    private doNextWalk(walk: Walk) {
        let start = walk.road.end;
        let [end, path] = this.getRandomPath(start);
        walk.startWalk({
            start: start,
            end: end,
            path: path
        }, true);
    }



}