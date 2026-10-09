/** Cocos Creator 2.x supplies its own CommonJS module loader in built games. */
declare function require(moduleName: string): any;

/** Public 2.4 cache API missing from this project's older creator.d.ts. */
declare namespace cc {
    namespace assetManager {
        const assets: { readonly count: number };
    }
}

declare namespace wx {
    namespace env {
        const USER_DATA_PATH: string;
    }
}
