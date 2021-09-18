class Scene {
    constructor(name, data) {
        this.name = name;
        this.objHandler =
            this.data = data;
    }

    static createGame() {
        var engine = Engine.create();
        engine.gravity = { x: 0, y: 10, scale: 50 };
        var world = engine.world;
        var data = {
            objects: new ObjectContainer(world),
            frame: 0,
            prevFrameTime: Date.now(),
            engine: engine,

            startTime: Date.now(),
            pausedTime: 0,
            paused: false,
        };


        data.objects.add(Create.polygon(200, 200, Create.squareVerts(50, 90), { mass: 1, restitution: 0, frictionStatic: 0 }), "player");
        data.objects.add(Create.polygon(400, 400, Create.squareVerts(1000, 10), { isStatic: true, angle: -Math.PI / 5 }), "box");
        return new Scene("game", data);
    }

    static createMenu() {
        var data = {
            frame: 0,
        }
        return new Scene("menu", data);
    }

}