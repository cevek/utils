export function strSplit(s: string, regexp: RegExp) {
    const arr = s.split(regexp);
    if (arr.length >= 4 && arr[0] === '') {
        const delimeterBegin = arr[1];
        arr.shift();
        arr.shift();
        arr[0] = delimeterBegin + arr[0];
    }
    if (arr.at(-1) === '') arr.pop();
    const res: string[] = [];
    for (let i = 0; i < arr.length; i += 2) {
        res.push(arr[i] + (arr[i + 1] ?? ''));
    }
    return res;
}

export function splitIntoSentenses(s: string) {
    return strSplit(s, /([.!?]+\s*)/);
}
export function splitIntoWords(s: string) {
    return s.split(/(\[[\s\S]*?\]\s*)/).flatMap((ss, i) => {
        if (i % 2 === 0) {
            return strSplit(ss, /(\n)/).flatMap((line) => strSplit(line, /([^\wа-я\d$]+)/i));
        }
        return [ss.replace(/\n/g, ' ')];
    });
}
export function splitWord(s: string) {
    const x = s.match(/([\wа-я\d$]+)/i)!;
    return {prefix: s.slice(0, x.index!), word: x[1], suffix: s.slice(x.index! + x[1].length)};
}

export function stringHash(str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

export function randomString(length = 10) {
    return Math.random()
        .toString(33)
        .slice(3, 3 + length);
}