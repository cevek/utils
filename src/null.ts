export function nonNull<T>(v: T | null): T {
    if (v === null) throw new Error('Null is not possible here');
    return v;
}

export function nonU<T>(v: T | undefined): T {
    if (v === undefined) throw new Error('Undefined is not possible here');
    return v;
}

export function nonNil<T>(v: T | undefined | null): T {
    if (v === null) throw new Error('Null is not possible here');
    if (v === undefined) throw new Error('Undefined is not possible here');
    return v;
}

export function never(_?: never): never {
    throw new Error('Never possible');
}