export interface ITutorial {
    stages: Array<IStage>;
}

export enum EMoveType {
    up,
    down,
    left,
    right,
    click
}

export interface IStage {
    name: string;
    moves: number;
    bubble: IBubble;
    closeByTouch: boolean;
    cells: Array<ICell>;
    hand: IHand;
    highLightGoal: boolean;
}

export interface IBubble {
    text: any;
    x: number;
    y: number;
}

export interface IHand {
    x: number;
    y: number;
    type: string;
}

export interface ICell {
    x: number;
    y: number;
    hint: string;
    removable: boolean;
}