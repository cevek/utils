export function perfectHash(v: number) {
    var m = 0x5bd1e995;
    var r = 24;
    v = Math.imul(v, m);
    v ^= v >>> r;
    return v;
}