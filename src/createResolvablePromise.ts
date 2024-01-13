export function createResolvablePromise<Resolve, Reject>() {
    let resolve!: (res: Resolve) => void;
    let reject!: (reason: Reject) => void;
    const promise = new Promise<Resolve>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return {resolve, reject, promise};
}
