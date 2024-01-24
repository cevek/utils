import {sleep} from './sleep';

export async function runJobWithRetries<T>(
    params: {
        maxAttempts: number;
        onAttemptError?: (err: unknown, i: number) => void;
        onAttemptsAreOver?: (err: unknown) => void;
        waitMsBetweenAttempts: number;
    },
    cb: (tryNum: number) => Promise<T>,
) {
    let err;
    for (let i = 0; i < params.maxAttempts; i++) {
        try {
            return await cb(i);
        } catch (error) {
            err = error;
            params.onAttemptError?.(error, i);
            if (i < params.maxAttempts - 1) {
                await sleep(params.waitMsBetweenAttempts);
            }
        }
    }
    params.onAttemptsAreOver?.(err);
    throw err;
}
