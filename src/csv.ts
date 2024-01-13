export function generateCSV(rows: string[][]) {
    let s = '';
    for (const row of rows) {
        s += row.map((c) => `"${c.trim().replace(/"/g, '""')}"`).join(',') + '\n';
    }
    return s;
}
