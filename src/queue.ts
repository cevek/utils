

export class Queue<T> {
    protected set = new Set<T>();
    add(item: T) {
        this.set.add(item);
    }
    getFirst(): T | null {
        return this.set.values().next().value ?? null;
    }
    remove(item: T) {
        this.set.delete(item);
    }
}
