export function getOrCreateInMap<K,V>(map: Map<K,V>, key: K, factory: () => V) {
    let value = map.get(key);
    if (value === undefined) {
        value = factory();
        map.set(key, value);
    }
    return value;
}