class Scene {
    constructor(name, data) {
        this.name = name;
        this.objHandler =
            this.data = data;
    }

    static createGame() {
        var data = {
            objects: new ObjectContainer(),
            frame: 0,

            startTime: Date.now(),
            pausedTime: 0,
            paused: false,
        };

        data.objects.add(Create.orb(200, 200, 20));
        data.objects.add(Create.orb(250, 200, 20), "player");
        return new Scene("game", data);
    }

    static createMenu() {
        var data = {
            frame: 0,
        }
        return new Scene("menu", data);
    }

}