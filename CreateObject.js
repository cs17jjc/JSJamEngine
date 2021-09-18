class Create {
    static gameObject(objClass, data) {
        return { objClass, data, alive: true };
    }

    static animation(imgSource, sourceType, frames, rate, frame) {
        return { imgSource, sourceType, frames, rate, currentFrame: 0, lastFrameTime: frame }
    }

    static polygon(x, y, verts, opts) {
        return this.gameObject("Polygon", { body: Bodies.fromVertices(x, y, verts, opts) });
    }

    static squareVerts(width, height) {
        var hW = width / 2;
        var hH = height / 2;
        return [vec(-hW, -hH), vec(hW, -hH), vec(hW, hH), vec(-hW, hH)];
    }

    static regPolyVerts(radius, nPoints) {
        var verts = [];
        for (var i = 0; i < nPoints; i++) {
            var angle = 2 * Math.PI * i / nPoints;
            verts.push(vec2(radius, angle));
        }
        return verts;
    }
}