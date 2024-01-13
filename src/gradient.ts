export type Color = {r: number; g: number; b: number};
export function gradientColorAtPos(colors: Color[], pos: number): string {
    return toHEXColor(gradientColorAtPosRGB(colors, pos));
}
export function gradientColorAtPosRGB(colors: Color[], pos: number): Color {
    if (typeof pos !== 'number' || isNaN(pos)) {
        return colors[0];
    }
    const index = Math.max(Math.min(Math.floor(pos * (colors.length - 1)) + 1, colors.length - 1), 1);
    const betweenColorPercent = Math.max(Math.min(pos, 1), 0) * (colors.length - 1) - (index - 1);
    const fromColor = colors[index - 1];
    const toColor = colors[index];
    return {
        r: getValueBetween(fromColor.r, toColor.r, betweenColorPercent),
        g: getValueBetween(fromColor.g, toColor.g, betweenColorPercent),
        b: getValueBetween(fromColor.b, toColor.b, betweenColorPercent),
    };
}

function getValueBetween(left: number, right: number, percent: number): number {
    return Math.round(left + percent * (right - left));
}

function toHEXColor(color: Color): string {
    return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b
        .toString(16)
        .padStart(2, '0')}`;
}
