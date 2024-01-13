export function roundedPolyline(dots: Point[], radiuses: number[]) {
    let prevDot = dots[0];
    let path = '';
    const newDots = dots.concat(dots[0], dots[1]);
    const newRadiuses = radiuses.concat(radiuses[0], radiuses[1]);

    for (let i = 1; i < newDots.length - 1; i++) {
        const dot = newDots[i];
        const radius = newRadiuses[i];
        const nextDot = newDots[i + 1];
        const angle = angleBetweenLines(dot, newDots[i + 1], dot, prevDot) / 2;
        const length = angle === 0 ? 0 : ((angle < 0 ? -1 : 1) * radius) / Math.tan(angle);

        const {x: x1, y: y1} = pointAtLine(dot, prevDot, length);
        const {x: x2, y: y2} = pointAtLine(dot, nextDot, length);

        path += `${i === 1 ? 'M' : 'L'} ${x1.toFixed(1)} ${y1.toFixed(1)} `;
        path += `A ${radius} ${radius} 0 0 ${angle > 0 ? 1 : 0} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
        prevDot = dot;
    }
    return `${path}z`;
}

export function pointAtLine(a: Point, b: Point, distFromA: number): Point {
    const th = Math.atan2(b.y - a.y, b.x - a.x);
    return {x: a.x + distFromA * Math.cos(th), y: a.y + distFromA * Math.sin(th)};
}

export function tabBorder({
    width,
    height,
    topRadius,
    bottomRadius,
    strokeWidth,
    type,
}: {
    width: number;
    height: number;
    topRadius: number;
    bottomRadius: number;
    strokeWidth: number;
    type: 'left' | 'right';
}) {
    const skew = width - bottomRadius - topRadius;
    const h = strokeWidth / 2;
    const top = h;
    const bottom = height - h;
    const offset = type === 'left' ? 0 : width;
    const sign = type === 'left' ? -1 : 1;

    const path = roundedPolyline(
        [
            {x: sign * (offset - 0), y: bottom},
            {x: sign * (offset - bottomRadius), y: bottom},
            {x: sign * (offset - (bottomRadius + skew)), y: top},
            {x: sign * (offset - width), y: top},
        ],
        [0, bottomRadius, topRadius, 0],
    );

    const bgPath = roundedPolyline(
        [
            {x: sign * (offset - 0), y: height},
            {x: sign * (offset - 0), y: bottom},
            {x: sign * (offset - bottomRadius), y: bottom},
            {x: sign * (offset - (bottomRadius + skew)), y: top},
            {x: sign * (offset - width), y: top},
            {x: sign * (offset - width), y: height},
        ],
        [0, 0, bottomRadius, topRadius, 0, 0],
    );

    return {path, bgPath};
}

export type Point = {x: number; y: number};

export function angleBetweenLines(A1: Point, A2: Point, B1: Point, B2: Point) {
    const dAx = A2.x - A1.x;
    const dAy = A2.y - A1.y;
    const dBx = B2.x - B1.x;
    const dBy = B2.y - B1.y;
    return Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
}
