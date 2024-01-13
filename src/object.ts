export function objectsAreEqual(a: unknown, b: unknown) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return a === b;
    if (a === null || b === null) return false;

    const aObj = a as {[key: string]: unknown};
    const bObj = b as {[key: string]: unknown};
    for (const k in aObj) {
        if (!objectsAreEqual(aObj[k], bObj[k])) return false;
    }
    for (const k in bObj) {
        if (!objectsAreEqual(aObj[k] as {[key: string]: unknown}, bObj[k] as {[key: string]: unknown})) return false;
    }
    return true;
}

export function deepEqual<T>(x: T, y: T) {
    if (x === y) return true;
    const xArray = Array.isArray(x);
    const yArray = Array.isArray(y);
    if (xArray !== yArray) return false;
    if (xArray && yArray) {
        if (x.length !== y.length) return false;
        if (!x.every((v, i) => deepEqual(y[i], v))) return false;
        return true;
    }
    if (isObject(x) && isObject(y)) {
        if (x.constructor !== Object) return false;
        const xProps = Object.keys(x);
        if (xProps.length !== Object.keys(y).length) {
            return false;
        }
        for (const prop of xProps) {
            if (!deepEqual(x[prop as never], y[prop as never])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export function objectKeys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
}

export function isObject(v: unknown): v is object {
    return typeof v === 'object' && v !== null;
}

export function foreachObject<T>(
    obj: T | undefined,
    fn: (key: Exclude<keyof T, 'brand'>, value: T[Exclude<keyof T, 'brand'>]) => void,
) {
    if (obj !== undefined) {
        for (const x of Object.keys(obj as object)) {
            fn(x as never, (obj as any)[x as never]);
        }
        // for (const x in obj) {
        //     fn(x as never, obj[x] as never);
        // }
    }
}
export function mapObject<T extends object, R>(
    obj: T,
    map: (value: T[Exclude<keyof T, 'brand'>], key: Exclude<keyof T, 'brand'>) => R,
) {
    const newObj = {} as Record<Exclude<keyof T, 'brand'>, R>;
    foreachObject(obj, (k, v) => {
        newObj[k] = map(v, k);
    });
    return newObj;
}

export function getValueOrInsert<T>(obj: T, key: keyof T, factory: () => Exclude<T[keyof T], undefined>) {
    let v = obj[key];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (v === undefined) {
        v = factory();
        obj[key] = v;
    }
    return v as Exclude<T[keyof T], undefined>;
}

export function deepCopy<T>(val: T): T {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (Array.isArray(val)) return val.map((v) => deepCopy(v)) as unknown as T;
    if (val !== null && typeof val === 'object') {
        const r = {};
        for (const k in val) {
            r[k as never] = deepCopy(val[k]) as never;
        }
        return r as T;
    }
    return val;
}

export function reconcile<T>(xx: T, yy: T): T {
    if (xx === yy) return yy;
    const xArray = Array.isArray(xx);
    const yArray = Array.isArray(yy);
    if (xArray !== yArray) return yy;
    if (xArray && yArray) {
        const x = xx as any;
        const y = yy as any;
        if (x.length !== y.length) return y as T;
        let res = x;
        for (let i = 0; i < y.length; i++) {
            const xEl = x[i];
            const yEl = y[i];
            const r = reconcile(xEl, yEl);
            if (xEl !== r) {
                if (res === x) {
                    res = x.slice();
                }
                res[i] = r;
            }
        }
        return res as T;
    }
    if (isObject(xx) && isObject(yy)) {
        const x = xx as any;
        const y = yy as any;
        if (x.constructor !== Object) return yy;
        const xProps = Object.keys(x);
        const yProps = Object.keys(y);
        if (yProps.length === xProps.length) {
            let res = x;
            for (const prop of xProps) {
                const xEl = x[prop];
                const yEl = y[prop];
                if (yEl === undefined && !(prop in y)) {
                    const res = {} as any;
                    for (const prop of yProps) {
                        const xEl = x[prop];
                        const yEl = y[prop];
                        res[prop] = reconcile(xEl, yEl);
                    }
                    return res;
                }
                const r = reconcile(xEl, yEl);
                if (xEl !== r) {
                    if (res === x) {
                        res = {...x};
                    }
                    res[prop] = r;
                }
            }
            return res;
        } else {
            const res = {} as any;
            for (const prop of yProps) {
                const xEl = x[prop];
                const yEl = y[prop];
                res[prop] = reconcile(xEl, yEl);
            }
            return res;
        }
    }
    return yy;
}
export function kv<T, K extends keyof T>(obj: T, key: K) {
    return obj[key] as T[K] | undefined;
}

export function setWithPath2<
    K1 extends keyof O,
    K2 extends keyof NonNullable<O[K1]>,
    K3 extends keyof NonNullable<NonNullable<O[K1]>[K2]>,
    O extends Record<number | string, Record<number | string, Record<number | string, unknown> | undefined> | undefined>,
>(
    obj: O,
    k1: K1,
    factory1: () => NonNullable<O[K1]>,
    k2: K2,
    factory2: () => NonNullable<NonNullable<O[K1]>[K2]>,
    k3: K3,
    value: NonNullable<NonNullable<O[K1]>[K2]>[K3],
) {
    let p1 = obj[k1];
    if (p1 === undefined) {
        p1 = factory1();
        obj[k1] = p1;
    }
    let p2 = p1[k2 as never];
    if (p2 === undefined) {
        p2 = factory2();
        p1[k2 as never] = p2;
    }
    p2[k3 as never] = value;
    return obj;
}

export function setWithPath<
    K1 extends keyof O,
    K2 extends keyof NonNullable<O[K1]>,
    O extends Record<number | string, Record<number | string, unknown> | undefined>,
>(obj: O, k1: K1, factory1: () => NonNullable<O[K1]>, k2: K2, val: NonNullable<O[K1]>[K2]) {
    let p1 = obj[k1];
    if (p1 === undefined) {
        p1 = factory1();
        obj[k1] = p1;
    }
    p1[k2 as never] = val;
    return obj;
}
