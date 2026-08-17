
export interface ILevel {
    grid: Array<IMapData>;
    gnome?: Gnome[];
    crab?: Gnome[];
    turtles?: Gnome[];
    monkeyTree?: Gnome[];
    lawnmower?: ILawnmower[];
    girl?: { index: number, path: number[][] };
    collect: Collect[];
    chipset: Chipset[];
    levelInfo: LevelInfo;
    conveyerList?: Array<Array<{ x: number, y: number, exist: boolean }>>
    mergeLimit: { [key: string]: boolean }
}

export interface IMapData { collect: { [key: string]: number }, map: Grid[][] }

export interface LevelInfo {
    TO_LIGHTNING_ENOUGH: number;
    background: number;
    cellColorSeed: number;
    levelReward: number;
    movesLimit: number;
    version: string;
    timeLimit: number;
    entry: boolean;
    hardness: boolean;
    showTargetTitle: string;
    forceUpdate: boolean;
    score: Array<number>
}

export interface Chipset {
    type: number;
    percent: number;
    isNoInitCreate?: boolean;
}

export interface Collect {
    count: number;
    type: string | number;
}

export interface Gnome {
    index: number;
    type: number;
    x: number;
    y: number;
}
/**除草机 */
export interface ILawnmower {
    x: number,
    y: number,
    type: number,
    count: number,
    /**角度 0为朝右 90 朝上 180朝左 270 朝下 */
    degree: number
}

export interface Grid {
    born?: boolean;
    type?: number;
    leaves?: number;
    flowers?: number;
    stone?: number;
    firefly?: number;
    counter_level?: number;
    water?: boolean;
    exit?: boolean; //出口
    ivy?: number;
    box_level?: number;
    rocket_type?: number;
    box_type?: number;
    ice?: number;
    locks?: number;
    portal_idx?: number;
    passable?: boolean;
    wall_right?: boolean;
    wall_left?: boolean;
    wall_top?: boolean;
    wall_bottom?: boolean;
    empty?: boolean;
    ground?: number,
    gem?: number,
    mushroom?: number,
    nov_grass?: number;
    nov_conch?: number;
}
