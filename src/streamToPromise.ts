import {Readable} from 'stream';

export function streamToPromise(stream: Readable): Promise<Buffer> {
    return new Promise(function (resolve, reject) {
        if (!stream.readable) return reject(new Error('Stream is not readable'));
        const arr: Buffer[] = [];
        stream.on('data', onData);
        stream.on('end', onEnd);
        stream.on('error', onEnd);
        stream.on('close', onClose);

        function onData(doc: Buffer) {
            arr.push(doc);
        }

        function onEnd(err: unknown) {
            if (err) reject(err);
            else resolve(Buffer.concat(arr));
            cleanup();
        }

        function onClose() {
            resolve(Buffer.concat(arr));
            cleanup();
        }

        function cleanup() {
            stream.removeListener('data', onData);
            stream.removeListener('end', onEnd);
            stream.removeListener('error', onEnd);
            stream.removeListener('close', onClose);
        }
    });
}
