class RenderScene {

    static render(scene, ctx) {
        switch (scene.name) {
            case 'game':
                RenderScene.renderGame(scene, ctx);
                break;
            case 'menu':
                RenderScene.renderMenu(scene, ctx);
                break;
        }
    }

    static renderGame(scene, ctx) {
        ctx.fillStyle = "#00C2FF"
        ctx.fillRect(0, 0, rWidth, rHeight);

        scene.data.objects.all().forEach(o => this.renderObject(scene, o, ctx));

    }

    static renderObject(scene, obj, ctx) {
        switch (obj.objClass) {
            case 'Orb':
                RenderScene.renderOrb(scene, obj.data, ctx);
                break;
        }
    }

    static renderOrb(scene, obj, ctx) {
        ctx.fillStyle = "#0000FF";
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    };

    static renderAnimObject(x, y, w, h, anim, ctx) {
        if (anim.sourceType == "SHEET") {
            var sSheet = spritesheets.get(anim.imgSource);
            var frameName = anim.frames[anim.currentFrame];
            sSheet.drawSprite(frameName, ctx, x, y, w, h);
        } else {
            var img = textures.get(anim.frames[anim.currentFrame]);
            ctx.drawImage(img, x, y, w, h);
        }
    }

}