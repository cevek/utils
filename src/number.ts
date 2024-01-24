export function normalizeValue(min: number, max: number, value: number, withinRange = false) {
    const v = (value - min) / (max - min);
    return withinRange ? Math.min(Math.max(v, 0), 1) : v;
}

export function averageValue(items: number[]) {
    return sum(items) / items.length;
}
export function sum(items: number[]) {
    return items.reduce((sum, item) => sum + item, 0);
}

export function round(val: number, step: number) {
    return Math.round(val * (1 / step)) / (1 / step);
}
export function roundFraction(val: number, fraction: number) {
    return Math.round(val * 10 ** fraction) / 10 ** fraction;
}

export function random(from: number, to: number) {
    return Math.random() * (to - from) + from;
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function isNum(val: string | number | undefined): val is number {
    return typeof val === 'number' && !Number.isNaN(val);
}

export function toNum(val: string | number | undefined) {
    const v = Number(val);
    return typeof v === 'number' && !Number.isNaN(v) ? v : undefined;
}
export function toInt(val: string | number | undefined) {
    const v = Number(val);
    return typeof v === 'number' && !Number.isNaN(v) ? Math.round(v) : undefined;
}
export function toPercent(val: string | number) {
    if (typeof val !== 'number') return undefined;
    return Math.min(Math.max(val, 0), 1);
}

export function calcPercent(start: number, end: number) {
    return (end - start) / start;
}
