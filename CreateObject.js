class Create {
    static gameObject(objClass, data) {
        return { objClass, data, alive: true };
    }

    static animation(imgSource, sourceType, frames, rate, frame) {
        return { imgSource, sourceType, frames, rate, currentFrame: 0, lastFrameTime: frame }
    }

    static convexBody(pos, verts, mass) {
        var vertsCent = vecScale(verts.reduce((acc, v) => vecAdd(acc, v), vec(0, 0)), 1 / verts.length);
        return { pos, verts, vertsCent, mass, vel: vec(0, 0), angle: 0 };
    }

    static square(x, y, width, height) {
        return this.gameObject("Square", { body: this.convexBody(vec(x, y), this.squareVerts(width, height), 1) });
    }

    static squareVerts(width, height) {
        var hW = width;
        var hH = height / 2;
        return [vec(-hW, -hH), vec(hW, -hH), vec(hW, hH), vec(-hW, hH)];
    }
}