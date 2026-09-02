import { CellType } from "../Data/Const/Constant";
import RuntimeMgr from "../Data/RuntimeMgr";
import Common from "../Common/Common";
import GameModel from "./Model/GameModel";
import ResourcePath, { ResourcePathRoot, ResourcePathValue } from "./Config/ResourcePath";

const { ccclass } = cc._decorator;

const ConfigPath = "config/match3_res/default";
const UuidReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Match3ResValue = ResourcePathValue;
type Match3ResArray = Array<Match3ResValue>;

interface Match3ResConfig extends ResourcePathRoot {
    BombFlashingBg?: Match3ResArray;
    BombStaticFrame?: Match3ResArray;
    NormalCellFrame?: Match3ResArray;
    pearlFrame?: Match3ResValue;
    Map2NormalCellFrame?: Match3ResArray;
    CellPrefab?: Match3ResArray;
    lockFrames?: Match3ResArray;
    boxFrames?: Match3ResArray;
    iceFrames?: Match3ResArray;
    stoneFrames?: Match3ResArray;
    LeaveFrames?: Match3ResArray;
    GroundFrames?: Match3ResArray;
    GemFrames?: Match3ResArray;
    FlowerFrames?: Match3ResArray;
    FireflyFrames?: Match3ResArray;
    CollectIcon?: Match3ResArray;
    groundPrefabs?: Match3ResArray;
    groundCenter?: Match3ResValue;
    rocketPrefab?: Match3ResValue;
    mushroomFrames?: Match3ResArray;
}

interface Match3ResData {
    BombFlashingBg: Array<cc.SpriteFrame | null>;
    BombStaticFrame: Array<cc.SpriteFrame | null>;
    NormalCellFrame: Array<cc.SpriteFrame | null>;
    pearlFrame: cc.SpriteFrame;
    Map2NormalCellFrame: Array<cc.SpriteFrame | null>;
    CellPrefab: Array<cc.Prefab | null>;
    lockFrames: Array<cc.SpriteFrame | null>;
    boxFrames: Array<cc.SpriteFrame | null>;
    iceFrames: Array<cc.SpriteFrame | null>;
    stoneFrames: Array<cc.SpriteFrame | null>;
    LeaveFrames: Array<cc.SpriteFrame | null>;
    GroundFrames: Array<cc.SpriteFrame | null>;
    GemFrames: Array<cc.SpriteFrame | null>;
    FlowerFrames: Array<cc.SpriteFrame | null>;
    FireflyFrames: Array<cc.SpriteFrame | null>;
    CollectIcon: Array<cc.SpriteFrame | null>;
    groundPrefabs: Array<cc.Prefab | null>;
    groundCenter: cc.SpriteFrame;
    rocketPrefab: cc.Prefab;
    mushroomFrames: Array<cc.SpriteFrame | null>;
}

@ccclass
export default class ResCtrl extends cc.Component {

    public static ins: ResCtrl = null;

    private static _config: Match3ResConfig = {};
    private static _loading: Promise<void> = null;
    private static _data: Match3ResData = ResCtrl.createEmptyData();

    onLoad() {
        ResCtrl.ins = this;
    }

    onDestroy() {
        if (ResCtrl.ins === this) {
            ResCtrl.ins = null;
        }
    }

    public static async load(): Promise<void> {
        if (this._loading) {
            return this._loading;
        }
        this._loading = this._load();
        try {
            await this._loading;
        } catch (err) {
            this._loading = null;
            console.error("[ResCtrl] load failed:", err);
            throw err;
        }
        this._loading = null;
    }

    public static destory() {
        this._config = {};
        this._data = this.createEmptyData();
        this._loading = null;
    }

    public getCellPrefab(index: number): cc.Prefab {
        return ResCtrl._data.CellPrefab[index];
    }

    public getBombBg(index: number): cc.SpriteFrame {
        return ResCtrl._data.BombFlashingBg[index];
    }

    public getCellFrame(type: CellType, index: number) {
        let frames = ResCtrl._data.NormalCellFrame;
        if (Common.isBombType(type)) {
            frames = ResCtrl._data.BombStaticFrame;
        }
        let frame = frames[index];
        if (type == CellType.Flower && GameModel.ins.HaveFlowers) {
            frame = ResCtrl._data.pearlFrame;
        }
        if (type < CellType.Bomb1 && RuntimeMgr.ins.CurBgIndex == 2) {
            const bg2frame = ResCtrl._data.Map2NormalCellFrame[index];
            if (bg2frame) {
                frame = bg2frame;
            }
        }
        return frame;
    }

    public getLockFrame(index: number): cc.SpriteFrame {
        return ResCtrl._data.lockFrames[index];
    }

    public getBoxFrame(index: number, type: number = null): cc.SpriteFrame {
        let area = 0;
        if (type != null) {
            area = (type + 1) * 3;
        }
        return ResCtrl._data.boxFrames[area + index];
    }

    public getIceFrame(index: number): cc.SpriteFrame {
        return ResCtrl._data.iceFrames[index];
    }

    public getStoneFrame(index: number): cc.SpriteFrame {
        return ResCtrl._data.stoneFrames[index];
    }

    public getLeavesFrame(index: number): cc.SpriteFrame {
        return ResCtrl._data.LeaveFrames[index];
    }

    public getGroundFrame(index: number): cc.SpriteFrame {
        return ResCtrl._data.GroundFrames[index];
    }

    public getFlowerFrame(index: number): cc.SpriteFrame {
        return ResCtrl._data.FlowerFrames[index];
    }

    public getFirefly(index: number): cc.SpriteFrame {
        return ResCtrl._data.FireflyFrames[index];
    }

    public getGemFrame(index: number): cc.SpriteFrame {
        return ResCtrl._data.GemFrames[index];
    }

    public getCollectFrame(index: number): cc.SpriteFrame {
        return ResCtrl._data.CollectIcon[index];
    }

    public getGroundBorderPrefab(index: number): cc.Prefab {
        return ResCtrl._data.groundPrefabs[index];
    }

    public getGroundCenter(): cc.SpriteFrame {
        return ResCtrl._data.groundCenter;
    }

    public getRoketPrefab(): cc.Prefab {
        return ResCtrl._data.rocketPrefab;
    }

    public getMushroomFrame(index: number) {
        return ResCtrl._data.mushroomFrames[index];
    }

    private static async _load(): Promise<void> {
        const jsonAsset = await Common.getRes<cc.JsonAsset>(ConfigPath, cc.JsonAsset);
        this._config = jsonAsset && jsonAsset.json ? jsonAsset.json : {};
        this._data = this.createEmptyData();

        if (!jsonAsset) {
            console.error(`[ResCtrl] missing config: resources/${ConfigPath}.json`);
            return;
        }

        const tasks = [
            this.loadSpriteFrameArray("BombFlashingBg").then(list => this._data.BombFlashingBg = list),
            this.loadSpriteFrameArray("BombStaticFrame").then(list => this._data.BombStaticFrame = list),
            this.loadSpriteFrameArray("NormalCellFrame").then(list => this._data.NormalCellFrame = list),
            this.loadSpriteFrame("pearlFrame").then(frame => this._data.pearlFrame = frame),
            this.loadSpriteFrameArray("Map2NormalCellFrame").then(list => this._data.Map2NormalCellFrame = list),
            this.loadPrefabArray("CellPrefab").then(list => this._data.CellPrefab = list),
            this.loadSpriteFrameArray("lockFrames").then(list => this._data.lockFrames = list),
            this.loadSpriteFrameArray("boxFrames").then(list => this._data.boxFrames = list),
            this.loadSpriteFrameArray("iceFrames").then(list => this._data.iceFrames = list),
            this.loadSpriteFrameArray("stoneFrames").then(list => this._data.stoneFrames = list),
            this.loadSpriteFrameArray("LeaveFrames").then(list => this._data.LeaveFrames = list),
            this.loadSpriteFrameArray("GroundFrames").then(list => this._data.GroundFrames = list),
            this.loadSpriteFrameArray("GemFrames").then(list => this._data.GemFrames = list),
            this.loadSpriteFrameArray("FlowerFrames").then(list => this._data.FlowerFrames = list),
            this.loadSpriteFrameArray("FireflyFrames").then(list => this._data.FireflyFrames = list),
            this.loadSpriteFrameArray("CollectIcon").then(list => this._data.CollectIcon = list),
            this.loadPrefabArray("groundPrefabs").then(list => this._data.groundPrefabs = list),
            this.loadSpriteFrame("groundCenter").then(frame => this._data.groundCenter = frame),
            this.loadPrefab("rocketPrefab").then(prefab => this._data.rocketPrefab = prefab),
            this.loadSpriteFrameArray("mushroomFrames").then(list => this._data.mushroomFrames = list),
        ];

        await Promise.all(tasks);
    }

    private static async loadPrefabArray(key: keyof Match3ResConfig): Promise<Array<cc.Prefab | null>> {
        const paths = this.getArrayPaths(key);
        return Promise.all(paths.map(path => this.loadAsset(path, cc.Prefab)));
    }

    private static async loadSpriteFrameArray(key: keyof Match3ResConfig): Promise<Array<cc.SpriteFrame | null>> {
        const paths = this.getArrayPaths(key);
        return Promise.all(paths.map(path => this.loadAsset(path, cc.SpriteFrame)));
    }

    private static async loadPrefab(key: keyof Match3ResConfig): Promise<cc.Prefab> {
        const path = this.getStringPath(key);
        return this.loadAsset(path, cc.Prefab);
    }

    private static async loadSpriteFrame(key: keyof Match3ResConfig): Promise<cc.SpriteFrame> {
        const path = this.getStringPath(key);
        return this.loadAsset(path, cc.SpriteFrame);
    }

    private static async loadAsset<T extends cc.Asset>(path: string, type: any): Promise<T> {
        path = this.normalizePath(path);
        if (path) {
            if (UuidReg.test(path)) {
                return this.loadAssetByUuid<T>(path, type);
            }
            return Common.getRes<T>(path, type);
        }
        return null;
    }

    private static async loadAssetByUuid<T extends cc.Asset>(uuid: string, type: any): Promise<T> {
        if (!uuid) {
            return null;
        }

        return new Promise<T>((resolve) => {
            const assetManager = (<any>cc).assetManager;
            if (!assetManager || !assetManager.loadAny) {
                console.error("[ResCtrl] cc.assetManager.loadAny is unavailable, uuid config cannot be loaded:", uuid);
                return resolve(null);
            }

            assetManager.loadAny({ uuid, type }, (err: Error, asset: T) => {
                if (err || !asset) {
                    console.error("[ResCtrl] load asset failed:", uuid, err);
                    return resolve(null);
                }
                resolve(asset);
            });
        });
    }

    private static getStringPath(key: keyof Match3ResConfig): string {
        const value = this._config ? this._config[key] : null;
        if (!value) {
            return "";
        }
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const path = ResourcePath.resolve(value[i], this._config);
                if (path) {
                    return path;
                }
            }
            return "";
        }
        return ResourcePath.resolve(value as Match3ResValue, this._config);
    }

    private static getArrayPaths(key: keyof Match3ResConfig): string[] {
        const value = this._config ? this._config[key] : null;
        return ResourcePath.resolveArray(value as Match3ResValue | Match3ResValue[], this._config);
    }

    private static normalizeValue(value: string): string {
        return typeof value == "string" ? value.trim() : "";
    }

    private static normalizePath(path: string): string {
        return ResourcePath.normalize(path);
    }

    private static createEmptyData(): Match3ResData {
        return {
            BombFlashingBg: [],
            BombStaticFrame: [],
            NormalCellFrame: [],
            pearlFrame: null,
            Map2NormalCellFrame: [],
            CellPrefab: [],
            lockFrames: [],
            boxFrames: [],
            iceFrames: [],
            stoneFrames: [],
            LeaveFrames: [],
            GroundFrames: [],
            GemFrames: [],
            FlowerFrames: [],
            FireflyFrames: [],
            CollectIcon: [],
            groundPrefabs: [],
            groundCenter: null,
            rocketPrefab: null,
            mushroomFrames: [],
        };
    }
}
