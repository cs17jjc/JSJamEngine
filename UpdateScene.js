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


        var moveVec = vec(0, 0);
        if (mKeysInput.currentKeyStates.includes("UP")) moveVec.y -= 100;
        if (mKeysInput.currentKeyStates.includes("LEFT")) moveVec.x -= 1000
        if (mKeysInput.currentKeyStates.includes("RIGHT")) moveVec.x += 1000
        moveVec = vecScale(moveVec, player.data.body.mass);
        Body.applyForce(player.data.body, player.data.body.position, moveVec);

        Engine.update(scene.data.engine, dT);

        Body.setAngle(player.data.body, 0);

        scene.data.frame++;
        scene.data.prevFrameTime = frameTime;
    }

    static updateMenu(scene) {
        scene.data.frame++;
    }
}