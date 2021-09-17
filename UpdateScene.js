class UpdateScene {

    static update(scene) {
        switch (scene.name) {
            case 'game':
                if (!scene.data.paused) {
                    UpdateScene.updateGame(scene);
                }
                break;
            case 'menu':
                UpdateScene.updateMenu(scene);
                break;
        }
    }

    static updateGame(scene) {
        var frameTime = Date.now();
        var dT = (scene.data.prevFrameTime - frameTime) / 1000;
        var player = scene.data.objects.get('player');

        var pAccel = vec(0, 0);

        var accelMag = 0;
        if (mKeysInput.currentKeyStates.includes("UP")) accelMag -= 1000;
        if (mKeysInput.currentKeyStates.includes("DOWN")) accelMag += 1000;
        if (mKeysInput.currentKeyStates.includes("LEFT")) player.data.body.angle += 5 * dT;
        if (mKeysInput.currentKeyStates.includes("RIGHT")) player.data.body.angle -= 5 * dT;

        player.data.body.vel = vecScale(player.data.body.vel, 0.9);
        player.data.body.vel = vecAdd(player.data.body.vel, vecScale(vec2(accelMag, player.data.body.angle), dT));
        player.data.body.pos = vecAdd(player.data.body.pos, vecScale(player.data.body.vel, dT));

        scene.data.frame++;
        scene.data.prevFrameTime = frameTime;
    }

    static updateMenu(scene) {
        scene.data.frame++;
    }
}