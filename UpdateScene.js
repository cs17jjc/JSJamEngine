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
        var player = scene.data.objects.get('player');
        if (mKeysInput.currentKeyStates.includes("UP")) player.data.y -= 5;
        if (mKeysInput.currentKeyStates.includes("DOWN")) player.data.y += 5;
        if (mKeysInput.currentKeyStates.includes("LEFT")) player.data.x -= 5;
        if (mKeysInput.currentKeyStates.includes("RIGHT")) player.data.x += 5;

        scene.data.frame++;
    }

    static updateMenu(scene) {
        scene.data.frame++;
    }
}