import {nonU} from './null';

const throttleMap = new Map<
    unknown,
    {
        lastCall: number;
        lastTimer: NodeJS.Timeout | undefined;
    }
>();
export function throttle(key: unknown, fn: () => void, time: number) {
    let data = throttleMap.get(key);
    if (data === undefined) {
        data = {lastTimer: undefined, lastCall: 0};
        throttleMap.set(key, data);
    }
    if (data.lastTimer !== undefined) {
        clearTimeout(data.lastTimer);
        data.lastTimer = undefined;
    }
    if (data.lastCall + time < Date.now()) {
        data.lastCall = Date.now();
        setTimeout(() => {
            fn();
        });
    } else {
        data.lastTimer = setTimeout(() => {
            nonU(data).lastCall = Date.now();
            fn();
        }, Date.now() - data.lastCall);
    }
}

const debounceMap = new Map<unknown, NodeJS.Timeout>();
export function debounce(key: unknown, fn: () => void, time: number) {
    const existsTimer = debounceMap.get(key);
    if (existsTimer !== undefined) {
        clearTimeout(existsTimer);
    }
    const timer = setTimeout(() => {
        debounceMap.delete(key);
        fn();
    }, time);
    debounceMap.set(key, timer);
    // if (existsTimer !== u) {
    //     clearTimeout(existsTimer);
    //     const timer = setTimeout(() => {
    //         debounceMap.delete(key);
    //         fn();
    //     }, time);
    //     debounceMap.set(key, timer);
    // } else {
    //     fn();
    //     const timer = setTimeout(() => {
    //         debounceMap.delete(key);
    //     }, time);
    //     debounceMap.set(key, timer);
    // }
}

// export function debounce<Args extends unknown[]>(f: (...args: Args) => Promise<void>, ms: number) {
//     let isCooldown = false;
//     return (...args: Args) => {
//         if (isCooldown) return Promise.resolve();
//         isCooldown = true;
//         f(...args);
//         setTimeout(() => {
//             isCooldown = false;
//         }, ms);
//         return Promise.resolve();
//     };
// }
