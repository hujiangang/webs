export type ResourcePathValue = string | ResourcePathGroup | null;

export interface ResourcePathGroup {
    _base?: string;
    items?: ResourcePathValue[] | { [key: string]: ResourcePathValue };
    path?: string;
    sourcePath?: string;
}

export interface ResourcePathRoot {
    _bases?: { [key: string]: string };
}

export default class ResourcePath {

    public static resolve(value: ResourcePathValue, root: ResourcePathRoot = null, base: string = ""): string {
        if (!value) {
            return "";
        }
        if (typeof value == "string") {
            return this.join(this.resolveBase(root, base), value);
        }

        const nextBase = this.resolveBase(root, value._base || base);
        const path = value.path || this.sourcePathToResourcesPath(value.sourcePath);
        return path ? this.join(nextBase, path) : "";
    }

    public static resolveArray(value: ResourcePathValue | ResourcePathValue[], root: ResourcePathRoot = null, base: string = ""): string[] {
        if (!value) {
            return [];
        }
        if (Array.isArray(value)) {
            return value.map(item => this.resolve(item, root, base));
        }
        if (typeof value == "object" && Array.isArray(value.items)) {
            const nextBase = this.resolveBase(root, value._base || base);
            return value.items.map(item => this.resolve(item, root, nextBase));
        }
        return [this.resolve(value, root, base)];
    }

    public static resolveMap(value: ResourcePathGroup | { [key: string]: ResourcePathValue }, root: ResourcePathRoot = null, base: string = ""): { [key: string]: string } {
        const result: { [key: string]: string } = {};
        if (!value) {
            return result;
        }

        const map = <any>value;
        const nextBase = this.resolveBase(root, map._base || base);
        const source = map.items && !Array.isArray(map.items) ? map.items : map;
        Object.keys(source).forEach(key => {
            if (key == "_base" || key == "items") {
                return;
            }
            result[key] = this.resolve(source[key], root, nextBase);
        });
        return result;
    }

    public static normalize(path: string): string {
        path = typeof path == "string" ? path.trim().replace(/\\/g, "/") : "";
        if (!path) {
            return "";
        }
        path = path.replace(/^assets\/resources\//, "");
        path = path.replace(/\.(png|jpg|jpeg|json|prefab)$/i, "");
        return path.replace(/\/+/g, "/").replace(/^\.\//, "");
    }

    private static resolveBase(root: ResourcePathRoot, base: string): string {
        base = this.normalize(base);
        if (!base || !root || !root._bases) {
            return base;
        }
        return this.normalize(root._bases[base] || base);
    }

    private static join(base: string, path: string): string {
        path = this.normalize(path);
        if (!path) {
            return "";
        }
        if (this.isAbsoluteResourcePath(path) || !base) {
            return path;
        }
        return this.normalize(`${base}/${path}`);
    }

    private static isAbsoluteResourcePath(path: string): boolean {
        return /^(config|csv|effect|font|prefab|sound|texture)\//.test(path);
    }

    private static sourcePathToResourcesPath(sourcePath: string): string {
        sourcePath = typeof sourcePath == "string" ? sourcePath.trim().replace(/\\/g, "/") : "";
        sourcePath = sourcePath.replace(/\.(png|jpg|jpeg|json|prefab)$/i, "");
        const prefix = "assets/resources/";
        return sourcePath.indexOf(prefix) == 0 ? sourcePath.substring(prefix.length) : "";
    }
}
