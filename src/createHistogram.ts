export type HistogramItem<T> = {from: number; to: number; items: T[]};
export function createHistogram<T>(histogramMap: number[], items: T[], getItemValue: (it: T) => number) {
    const hItems: HistogramItem<T>[] = [];
    for (let i = 1; i < histogramMap.length; i++) {
        const start = histogramMap[i - 1];
        const end = histogramMap[i];
        const hItem: HistogramItem<T> = {from: start, to: end, items: []};
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
