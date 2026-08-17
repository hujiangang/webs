export default class Sequence {

    private counter = 100;

    public next(): number {
        return this.counter++;
    }

    public nextString(): string {
        return this.next().toString();
    }

    public reset() {
        this.counter = 1;
    }

}