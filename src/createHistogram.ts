export type HistogramItem<T, K> = {from: K; to: K; items: T[]};
export function createHistogram<T, K extends string | number>(histogramMap: K[], items: T[], getItemValue: (it: T) => K) {
    const hItems: HistogramItem<T, K>[] = [];
    for (let i = 1; i < histogramMap.length; i++) {
        const start = histogramMap[i - 1];
        const end = histogramMap[i];
        const hItem: HistogramItem<T, K> = {from: start, to: end, items: []};
        hItems.push(hItem);
        for (let j = 0; j < items.length; j++) {
            const item = items[j];
            const val = getItemValue(item);
            if (start <= val && val < end) {
                hItem.items.push(item);
            }
        }
    }
    return hItems;
}
