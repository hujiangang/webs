/** A cancelled visual resolves false and never dispatches gameplay completion. */
export default class EffectTimeline {
    private jobs: Array<{elapsed: number, duration: number, draw: (t: number) => void, release: () => void, resolve: (done: boolean) => void}> = [];
    public run(duration: number, draw: (t: number) => void, release: () => void): Promise<boolean> {
        return new Promise(resolve => { this.jobs.push({elapsed:0,duration:Math.max(.001,duration),draw,release,resolve}); draw(0); });
    }
    public update(dt: number): void {
        for (const job of this.jobs.slice()) {
            if (this.jobs.indexOf(job) < 0) continue;
            job.elapsed += Math.max(0, dt);
            job.draw(Math.min(1, job.elapsed / job.duration));
            if (job.elapsed >= job.duration) {
                this.jobs.splice(this.jobs.indexOf(job),1);
                job.release(); job.resolve(true);
            }
        }
    }
    public cancel(): void {
        const pending=this.jobs.splice(0);
        pending.forEach(job=>{job.release();job.resolve(false);});
    }
    public get count(): number { return this.jobs.length; }
}
