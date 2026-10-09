/** Page content remains configurable while the three-page navigation stays stable. */
export const HomePages = [
    { id: "shop", title: "商店" },
    { id: "home", title: "游戏" },
    { id: "journal", title: "图鉴" }
];

export class HomeNavigation {
    public index = 1;

    public select(index: number): number {
        this.index = Math.max(0, Math.min(HomePages.length - 1, Math.floor(index)));
        return this.index;
    }

    public swipe(deltaX: number, deltaY: number): number {
        if (Math.abs(deltaX) < 60 || Math.abs(deltaX) <= Math.abs(deltaY)) return this.index;
        return this.select(this.index + (deltaX < 0 ? 1 : -1));
    }
}
