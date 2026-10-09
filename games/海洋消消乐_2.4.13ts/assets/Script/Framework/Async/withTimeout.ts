/** Resolve once, clear the timer, and consume late rejections after a timeout. */
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T, name: string): Promise<T> {
    return new Promise<T>((resolve) => {
        let finished = false;
        const finish = (value: T) => {
            if (finished) return;
            finished = true;
            clearTimeout(timer);
            resolve(value);
        };
        const timer = setTimeout(() => {
            if (finished) return;
            console.warn(`${name}超时，使用本地兜底继续游戏`);
            finish(fallback);
        }, timeoutMs);
        promise.then(finish, (error) => {
            if (finished) return;
            console.warn(`${name}失败，使用本地兜底继续游戏:`, error);
            finish(fallback);
        });
    });
}
