import {kv} from './object';

export function findSubArray<A, B>(arr: A[], subarr: B[], compare: (a: A, b: B) => boolean) {
    const arrLength = arr.length;
    const subarrLength = subarr.length;
    if (subarrLength > arrLength) {
        return null;
    }
    for (let i = 0; i <= arrLength - subarrLength; i++) {
        let match = true;
        for (let j = 0; j < subarrLength; j++) {
            if (!compare(arr[i + j], subarr[j])) {
                match = false;
                break;
            }
        }
        if (match) {
            return i;
        }
    }
    return null;
}

export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}

export function splitBy<T>(arr: T[], splitter: (v: T) => boolean) {
    const res: T[][] = [];
    let part: T[] = [];
    for (const it of arr) {
        part.push(it);
        if (splitter(it)) {
            res.push(part);
            part = [];
        } else {
        }
    }
    if (part.length > 0) {
        res.push(part);
    }
    return res;
}

export function filterMap<T, R>(arr: T[], fn: (v: T, i: number) => R | undefined): R[] {
    const newArr: R[] = [];
    for (let i = 0; i < arr.length; i++) {
        const val = fn(arr[i], i);
        if (val !== undefined) {
            newArr.push(val);
        }
    }
    return newArr;
}

export function filterNonUndefined<T>(arr: (T | undefined)[]): T[] {
    return arr.filter((v): v is T => v !== undefined);
}

export function groupObjBy<T>(arr: T[], key: (item: T) => string) {
    const obj = {} as Record<string, T[]>;
    for (const item of arr) {
        const k = key(item);
        let items = kv(obj, k);
        if (items === undefined) {
            items = [];
            obj[k] = items;
        }
        items.push(item);
    }
    return obj;
}

type GroupByKey = string | number | bigint | symbol | boolean;
export function groupBy<T, K extends GroupByKey>(arr: T[], key: (item: T) => K) {
    const obj = new Map<K, T[]>();
    for (const item of arr) {
        const k = key(item);
        let items = obj.get(k);
        if (items === undefined) {
            items = [];
            obj.set(k, items);
        }
        items.push(item);
    }
    return obj;
}

export function groupObjOneBy<T, K extends string | number>(arr: T[], key: (item: T) => K) {
    const obj = {} as Record<K, T>;
    for (const item of arr) {
        const k = key(item);
        obj[k] = item;
    }
    return obj;
}
export function groupOneBy<T, K extends GroupByKey>(arr: T[], key: (item: T) => K) {
    const obj = new Map<K, T>();
    for (const item of arr) {
        const k = key(item);
        obj.set(k, item);
    }
    return obj;
}

export function groupGroupOneObjBy<T, K1 extends number | string, K2 extends number | string>(
    arr: T[],
    key: (item: T) => [K1, K2],
) {
    const obj = {} as Record<K1, Record<K2, T>>;
    for (const item of arr) {
        const [k1, k2] = key(item);
        let sub = kv(obj, k1);
        if (sub === undefined) {
            sub = {} as Record<K2, T>;
            obj[k1] = sub;
        }
        sub[k2] = item;
    }
    return obj;
}
export function groupGroupOneBy<T, K1 extends GroupByKey, K2 extends GroupByKey>(arr: T[], key: (item: T) => [K1, K2]) {
    const obj = new Map<K1, Map<K2, T>>();
    for (const item of arr) {
        const [k1, k2] = key(item);
        let sub = obj.get(k1);
        if (sub === undefined) {
            sub = new Map();
            obj.set(k1, sub);
        }
        sub.set(k2, item);
    }
    return obj;
}

export function createZeroArray(len: number) {
    return Array.from({length: len}, () => 0);
}
