class Create {
    static gameObject(objClass, data) {
        return { objClass, data, alive: true };
    }

    static animation(imgSource, sourceType, frames, rate, frame) {
        return { imgSource, sourceType, frames, rate, currentFrame: 0, lastFrameTime: frame }
    }

    static orb(x, y, r) {
        return this.gameObject("Orb", { x, y, r });
    }
}