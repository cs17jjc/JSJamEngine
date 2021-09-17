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
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, rWidth, rHeight);

        scene.data.objects.all().forEach(o => this.renderObject(scene, o, ctx));

        ctx.resetTransform();
    }

    static renderObject(scene, obj, ctx) {
        switch (obj.objClass) {
            case 'Square':
                RenderScene.renderSquare(scene, obj.data, ctx);
                break;
        }
    }

    static renderSquare(scene, obj, ctx) {
        ctx.translate(obj.body.pos.x + obj.body.vertsCent.x, obj.body.pos.y + obj.body.vertsCent.y);
        ctx.rotate(obj.body.angle);
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(obj.body.verts[0].x, obj.body.verts[0].y);
        obj.body.verts.slice(1).forEach(v => ctx.lineTo(v.x, v.y));
        ctx.closePath();
        ctx.fill();
        ctx.rotate(-obj.body.angle);
        ctx.translate(-obj.body.pos.x - obj.body.vertsCent.x, -obj.body.pos.y - obj.body.vertsCent.y);
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