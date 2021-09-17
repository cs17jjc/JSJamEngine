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

function vec(x, y) {
    return { x, y };
}

function vec2(mag, angle) {
    return { x: mag * Math.cos(angle), y: mag * Math.sin(angle) };
}

function vecAdd(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
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