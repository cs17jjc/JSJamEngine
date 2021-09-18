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
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, rWidth, rHeight);

        scene.data.objects.all().forEach(o => this.renderObject(scene, o, ctx));

        ctx.resetTransform();
    }

    static renderObject(scene, obj, ctx) {
        switch (obj.objClass) {
            case 'Polygon':
                RenderScene.renderPolygon(scene, obj.data, ctx);
                break;
        }
    }

    static renderPolygon(scene, obj, ctx) {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(obj.body.vertices[0].x, obj.body.vertices[0].y);
        obj.body.vertices.slice(1).forEach(v => ctx.lineTo(v.x, v.y));
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