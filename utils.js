function lerp(a, b, t) {
    return (1 - t) * a + (t * b);
}

function checkIfPointInRectange(point, rect) {
    return (point.x >= rect.x) &&
        (point.x <= (rect.x + rect.width)) &&
        (point.y >= rect.y) &&
        (point.y <= (rect.y + rect.height));
}

function checkRectangeCollisions(rect1, rect2) {
    return checkRectangeCornerIntersects(rect1, rect2) || checkRectangeCornerIntersects(rect2, rect1);
}

function checkRectangeCornerIntersects(cRect, rect) {
    return checkIfPointInRectange({ x: cRect.x, y: cRect.y }, rect) ||
        checkIfPointInRectange({ x: cRect.x + cRect.width, y: cRect.y }, rect) ||
        checkIfPointInRectange({ x: cRect.x, y: cRect.y + cRect.height }, rect) ||
        checkIfPointInRectange({ x: cRect.x + cRect.width, y: cRect.y + cRect.height }, rect);
}

function updateAnimObject(anim, frameCounter) {
    if (frameCounter - anim.lastFrameTime > anim.rate) {
        anim.currentFrame = (anim.currentFrame == anim.frames.length - 1) ? 0 : (anim.currentFrame + 1);
        anim.lastFrameTime = frameCounter;
    }
}

function rnd(min, max) {
    return lerp(min, max, Math.random());
}

function calcDistance(a, b) { return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) }

function calcAngle(a, b) {
    var o = b.x - a.x;
    var a = a.y - b.y;
    return Math.atan2(o, a);
}

function calcComponents(a, b) { return { x: a * Math.cos(b), y: a * Math.sin(b) } }

function scaleImage(image, scale) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;
    var ctx = canvas.getContext("2d");
    //disable image smoothing 
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

function makeTimeString(a) {
    var b = Math.trunc(a / 1E3),
        d = parseInt(b / 60, 10),
        e = parseInt(b % 60, 10);
    a = Math.trunc(1E3 * ((a - b) / 1E3 - Math.trunc((a - b) / 1E3)));
    return (10 > d ? "0" + d : d) + ":" + (10 > e ? "0" + e : e)
}

function rndPick(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function bodyVertsWorld(body) {
    var offset = vec(body.pos.x + body.vertsCent.x, body.pos.y + body.vertsCent.y)
    return rotateVerts(body.verts, body.angle).map(v => vecAdd(v, offset));
}

function vertsToLines(verts) {
    var lines = [];
    for (var i = 0; i < verts.length - 1; i++) {
        lines.push([verts[i], verts[i + 1]]);
    }
    lines.push([verts[verts.length - 1], verts[0]]);
    return lines;
}

function vec(x, y) {
    return { x, y };
}

function vec2(mag, angle) {
    return { x: mag * Math.cos(angle), y: mag * Math.sin(angle) };
}

function vecAdd(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function vecSub(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
}

function vecScale(v, s) {
    return { x: v.x * s, y: v.y * s };
}

function vecLerp(v1, v2, t) {
    return { x: lerp(v1.x, v2.x, t), y: lerp(v1.y, v2.y, t) };
}

function vecDecomp(v) {
    return { mag: Math.sqrt(v.x * v.x + v.y * v.y), angle: Math.atan2(v.y, v.x) };
}

function vecNorm(v) {
    var mag = vecDecomp(v).mag;
    return { x: v.x / mag, y: v.y / mag };
}

function vecDot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

function satBody(body1, body2) {

    var lines1 = vertsToLines(body1.worldVerts);
    var lines2 = vertsToLines(body2.worldVerts);

    ctx.strokeStyle = "#FF0000";
    lines1.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);
        ctx.lineTo(line[1].x, line[1].y);
        ctx.stroke();
    });
    lines2.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);
        ctx.lineTo(line[1].x, line[1].y);
        ctx.stroke();
    });

    var minOverlap = Number.MAX_VALUE;
    var minAxis;
    var vertBody;

    ctx.strokeStyle = "#00FF00";
    var flag = lines1.some(l => {
        var axis = vecNorm(vecSub(l[1], l[0]));
        var proj1 = projectVertsToAxis(axis, body1.worldVerts);
        var proj2 = projectVertsToAxis(axis, body2.worldVerts);

        var overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);

        if ((proj1.max > proj2.max && proj1.min < proj2.min) ||
            (proj1.max < proj2.max && proj1.min > proj2.min)) {
            var min = Math.abs(proj1.min - proj2.min);
            var max = Math.abs(proj1.max - proj2.max);
            if (min < max) {
                overlap += min;
            } else {
                overlap += max;
                axis = vecScale(axis, -1);
            }
        }

        if (overlap < minOverlap) {
            minOverlap = overlap;
            minAxis = axis;
            vertBody = body2;
            if (proj1.max > proj2.max) {
                minAxis = vecScale(minAxis, -1);
            }
        }

        if (overlap < 0) {
            ctx.beginPath();
            ctx.moveTo(l[0].x, l[0].y);
            ctx.lineTo(l[1].x, l[1].y);
            ctx.stroke();
        }

        return overlap < 0;
    });

    if (flag) {
        return { collision: false };
    }

    flag = lines2.some(l => {
        var axis = vecNorm(vecSub(l[1], l[0]));
        var proj1 = projectVertsToAxis(axis, body2.worldVerts);
        var proj2 = projectVertsToAxis(axis, body1.worldVerts);

        var overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);

        if ((proj1.max > proj2.max && proj1.min < proj2.min) ||
            (proj1.max < proj2.max && proj1.min > proj2.min)) {
            var min = Math.abs(proj1.min - proj2.min);
            var max = Math.abs(proj1.max - proj2.max);
            if (min < max) {
                overlap += min;
            } else {
                overlap += max;
                axis = vecScale(axis, -1);
            }
        }

        if (overlap < minOverlap) {
            minOverlap = overlap;
            minAxis = axis;
            vertBody = body1;
            if (proj1.max > proj2.max) {
                minAxis = vecScale(minAxis, -1);
            }
        }
        if (overlap < 0) {
            ctx.beginPath();
            ctx.moveTo(l[0].x, l[0].y);
            ctx.lineTo(l[1].x, l[1].y);
            ctx.stroke();
        }
        return overlap < 0;
    });

    if (flag) {
        return { collision: false };
    }

    ctx.strokeStyle = "#0000FF";
    var contact = projectVertsToAxis(minAxis, vertBody.worldVerts).vCol;

    if (vertBody === body2) {
        minAxis = vecScale(minAxis, -1);
    }

    ctx.beginPath();
    ctx.moveTo(contact.x, contact.y);
    var end = vecAdd(contact, vecScale(minAxis, minOverlap));
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    return { collision: true, axis: minAxis, overlap: minOverlap, contact };
}

function projectVertsToAxis(axis, verts) {
    var min = vecDot(axis, verts[0]);
    var vCol = verts[0];
    var max = min;
    verts.slice(1).forEach(v => {
        var d = vecDot(axis, v);
        if (d < min) {
            min = d;
            vCol = v;
        }
        if (d > max) { max = d; }
    });
    return { min, max, vCol };
}

function rotateVerts(verts, angle) {
    return verts.map(v => { var v2 = vecDecomp(v); return vec2(v2.mag, v2.angle + angle); });
}