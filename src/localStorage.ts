export function saveToLocalStorage(key: number | string, value: unknown) {
    try {
        localStorage.setItem(`${key}`, JSON.stringify(value ?? null));
    } catch (e) {
        /* istanbul ignore next */
        console.error(e);
    }
}
export function getFromLocalStorage<T>(key: number | string): T | null {
    try {
        const res = localStorage.getItem(`${key}`);
        if (res === null) return null;
        return JSON.parse(res) as T;
    } catch (e) {
        /* istanbul ignore next */
        console.error(e);
        /* istanbul ignore next */
        return null;
    }
}

export class LS<T> {
    constructor(
        public key: string,
        protected validator?: (val: T) => T | undefined,
    ) {}
    save(value: T) {
        saveToLocalStorage(this.key, value);
    }
    get() {
        const val = getFromLocalStorage<T>(this.key) ?? undefined;
        if (val !== undefined) return this.validator === undefined ? val : this.validator(val);
    }
}
