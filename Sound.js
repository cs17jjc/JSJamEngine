class Sound {
    constructor(soundMap) {
        this.soundMap = soundMap;
        this.isActive = true;
    }
    static new() {
        return new Sound(new Map());
    }
    addSound(name, soundArr) {
        this.soundMap.set(name, soundArr);
    }
    playSound(name) {
        var soundArr = this.soundMap.get(name);
        if (soundArr != null && this.isActive) {
            zzfx(...soundArr).start();
        }
    }
    defineSounds() {}
}