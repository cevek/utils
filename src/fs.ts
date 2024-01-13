import {readFileSync, writeFileSync} from 'fs';

export function readJSONFile<T>(file: string) {
    return JSON.parse(readFileSync(file, 'utf-8')) as T;
}

export function writeJSONFile(file: string, data: unknown) {
    return writeFileSync(file, JSON.stringify(data));
}
