import Common from "../../Common/Common";
import ResourcePath from "../Config/ResourcePath";

export type Match3SkinTheme = "water" | "grass" | "sand" | string;

export interface Match3SkinFrameMap {
    [key: string]: any;
}

export interface Match3SkinPathMap {
    [key: string]: any;
}

export interface Match3SkinThemeConfig {
    _base?: string;
    cellBase?: string | string[];
    upBorders?: Match3SkinFrameMap;
    middleBorders?: Match3SkinFrameMap;
    complexGround?: Match3SkinFrameMap;
}

export interface Match3SkinGroundConfig {
    _base?: string;
    lotusleaf?: string;
    girlRoad?: string;
}

export interface Match3SkinConfig {
    _bases?: { [key: string]: string };
    prefabs?: Match3SkinPathMap;
    themes?: { [key: string]: Match3SkinThemeConfig };
    ground?: Match3SkinGroundConfig;
}

const ConfigPath = "config/match3_skin/default";

export default class Match3Skin {

    private static _config: Match3SkinConfig = null;
    private static _spriteFrames: { [path: string]: cc.SpriteFrame } = {};
    private static _prefabs: { [path: string]: cc.Prefab } = {};

    public static async load(): Promise<void> {
        this._config = {};
        this._spriteFrames = {};
        this._prefabs = {};

        const jsonAsset = await Common.getRes<cc.JsonAsset>(ConfigPath, cc.JsonAsset);
        this._config = jsonAsset && jsonAsset.json ? jsonAsset.json : {};

        const spritePaths: string[] = [];
        const prefabPaths: string[] = [];
        this.collectPaths(this._config, spritePaths, prefabPaths);

        await Promise.all([
            this.loadSpriteFrames(spritePaths),
            this.loadPrefabs(prefabPaths),
        ]);
    }

    public static getConfig(): Match3SkinConfig {
        return this._config || {};
    }

    public static getThemeConfig(theme: Match3SkinTheme): Match3SkinThemeConfig {
        return this._config && this._config.themes ? this._config.themes[theme] : null;
    }

    public static getCellBaseFrame(theme: Match3SkinTheme, index: number = 0): cc.SpriteFrame {
        const themeConfig = this.getThemeConfig(theme);
        if (!themeConfig || !themeConfig.cellBase) {
            return null;
        }
        const path = Array.isArray(themeConfig.cellBase) ? themeConfig.cellBase[index] || themeConfig.cellBase[0] : themeConfig.cellBase;
        return this.getSpriteFrame(path, themeConfig._base);
    }

    public static getUpBorderFrame(theme: Match3SkinTheme, key: string): cc.SpriteFrame {
        const themeConfig = this.getThemeConfig(theme);
        return this.getFrameFromMap(themeConfig && themeConfig.upBorders, key, themeConfig && themeConfig._base);
    }

    public static getMiddleBorderFrame(theme: Match3SkinTheme, key: string): cc.SpriteFrame {
        const themeConfig = this.getThemeConfig(theme);
        return this.getFrameFromMap(themeConfig && themeConfig.middleBorders, key, themeConfig && themeConfig._base);
    }

    public static getComplexGroundFrame(theme: Match3SkinTheme, key: string): cc.SpriteFrame {
        const themeConfig = this.getThemeConfig(theme);
        return this.getFrameFromMap(themeConfig && themeConfig.complexGround, key, themeConfig && themeConfig._base);
    }

    public static getLotusleafFrame(): cc.SpriteFrame {
        const ground = this._config && this._config.ground;
        return this.getSpriteFrame(ground && ground.lotusleaf, ground && ground._base);
    }

    public static getGirlRoadFrame(): cc.SpriteFrame {
        const ground = this._config && this._config.ground;
        return this.getSpriteFrame(ground && ground.girlRoad, ground && ground._base);
    }

    public static getPrefab(key: string, index: number = 0): cc.Prefab {
        const path = this.getConfigPath("prefabs", key, index);
        return this.getPrefabByPath(path);
    }

    public static getPrefabList(key: string): cc.Prefab[] {
        const paths = this.getConfigPaths("prefabs", key);
        return paths.map(path => this.getPrefabByPath(path)).filter(item => !!item);
    }

    public static requirePrefab(key: string, index: number = 0): cc.Prefab {
        const prefab = this.getPrefab(key, index);
        if (!prefab) {
            const path = this.getConfigPath("prefabs", key, index);
            console.error(`[Match3Skin] missing prefab: ${key}${path ? ` -> ${path}` : ""}`);
        }
        return prefab;
    }

    private static getFrameFromMap(map: Match3SkinFrameMap, key: string, base: string = ""): cc.SpriteFrame {
        if (!map) {
            return null;
        }
        const mapBase = map._base || base;
        const source = map.items && !Array.isArray(map.items) ? map.items : map;
        return this.getSpriteFrame(source && source[key], mapBase);
    }

    private static getSpriteFrame(path: string, base: string = ""): cc.SpriteFrame {
        path = ResourcePath.resolve(path, this._config, base);
        return path ? this._spriteFrames[path] : null;
    }

    private static getPrefabByPath(path: string): cc.Prefab {
        path = this.normalizePath(path);
        return path ? this._prefabs[path] : null;
    }

    private static async loadSpriteFrames(paths: string[]): Promise<void> {
        await Promise.all(this.unique(paths).map(async path => {
            const frame = await Common.getRes<cc.SpriteFrame>(path, cc.SpriteFrame);
            if (frame) {
                this._spriteFrames[path] = frame;
            }
        }));
    }

    private static async loadPrefabs(paths: string[]): Promise<void> {
        await Promise.all(this.unique(paths).map(async path => {
            const prefab = await Common.getRes<cc.Prefab>(path, cc.Prefab);
            if (prefab) {
                this._prefabs[path] = prefab;
            }
        }));
    }

    private static collectPaths(config: Match3SkinConfig, spritePaths: string[], prefabPaths: string[]) {
        if (!config) {
            return;
        }

        this.pushPathMap(prefabPaths, config.prefabs, config);

        if (config.themes) {
            Object.keys(config.themes).forEach(themeKey => {
                const theme = config.themes[themeKey];
                this.pushPath(spritePaths, theme.cellBase, config, theme._base);
                this.pushMapPaths(spritePaths, theme.upBorders, config, theme._base);
                this.pushMapPaths(spritePaths, theme.middleBorders, config, theme._base);
                this.pushMapPaths(spritePaths, theme.complexGround, config, theme._base);
            });
        }

        if (config.ground) {
            this.pushPath(spritePaths, config.ground.lotusleaf, config, config.ground._base);
            this.pushPath(spritePaths, config.ground.girlRoad, config, config.ground._base);
        }
    }

    private static pushPathMap(paths: string[], map: Match3SkinPathMap, config: Match3SkinConfig) {
        if (!map) {
            return;
        }
        const base = map._base || "";
        const source = map.items && !Array.isArray(map.items) ? map.items : map;
        Object.keys(source).forEach(key => {
            if (key == "_base" || key == "items") {
                return;
            }
            this.pushPath(paths, source[key], config, base);
        });
    }

    private static pushMapPaths(paths: string[], map: Match3SkinFrameMap, config: Match3SkinConfig, base: string = "") {
        if (!map) {
            return;
        }
        const mapBase = map._base || base;
        const source = map.items && !Array.isArray(map.items) ? map.items : map;
        Object.keys(source).forEach(key => {
            if (key == "_base" || key == "items") {
                return;
            }
            this.pushPath(paths, source[key], config, mapBase);
        });
    }

    private static pushPath(paths: string[], path: string | string[], config: Match3SkinConfig, base: string = "") {
        if (!path) {
            return;
        }
        if (Array.isArray(path)) {
            path.forEach(item => this.pushPath(paths, item, config, base));
            return;
        }
        path = ResourcePath.resolve(path, config, base);
        if (path) {
            paths.push(path);
        }
    }

    private static getConfigPaths(section: "prefabs", key: string): string[] {
        const value = this._config && this._config[section] ? this._config[section][key] : null;
        if (!value) {
            return [];
        }
        const values = Array.isArray(value) ? value : [value];
        const sectionBase = (<any>this._config[section])._base || "";
        return values.map(item => ResourcePath.resolve(item, this._config, sectionBase)).filter(item => !!item);
    }

    private static getConfigPath(section: "prefabs", key: string, index: number = 0): string {
        const paths = this.getConfigPaths(section, key);
        return paths[index] || paths[0] || "";
    }

    private static unique(paths: string[]): string[] {
        const result = [];
        const map = {};
        paths.forEach(path => {
            if (path && !map[path]) {
                map[path] = true;
                result.push(path);
            }
        });
        return result;
    }

    private static normalizePath(path: string): string {
        return ResourcePath.normalize(path);
    }
}
