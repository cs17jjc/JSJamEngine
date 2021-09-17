//Configure canvas sizes
var dspCont1Style = window.getComputedStyle(document.getElementById("c1"));
var dspCont2 = document.getElementById("c2");
var displayCanvas = document.getElementById("canvas");

var displayContext = displayCanvas.getContext("2d");
displayContext.mozImageSmoothingEnabled = false;
displayContext.imageSmoothingEnabled = false;

var renderCanvas = document.createElement("canvas");
renderCanvas.width = 1920;
renderCanvas.height = 1080;
var ctx = renderCanvas.getContext("2d");
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var rWidth = renderCanvas.width;
var rHeight = renderCanvas.height;

resizeDisplay();

//add mouse event handlers
var isMouseDown = false;
var prevMouseDown = false;
var mPos = { x: 0, y: 0 };
var boundingRect = displayCanvas.getBoundingClientRect();
document.addEventListener('mousedown', (e) => {
    isMouseDown = true;
});
document.addEventListener('mouseup', (e) => {
    isMouseDown = false;
});

document.addEventListener('mousemove', (e) => {
    var x = (e.clientX - boundingRect.left) / (boundingRect.right - boundingRect.left);
    var y = (e.clientY - boundingRect.top) / (boundingRect.bottom - boundingRect.top);
    if (x > 0 && x < boundingRect.width && y > 0 && y < boundingRect.height) {
        mPos = { x, y };
    }
});

//add keyboard inputs
var mKeysInput = Input.new();
mKeysInput.attachInput("UP", 'w');
mKeysInput.attachInput("DOWN", 's');
mKeysInput.attachInput("LEFT", 'a');
mKeysInput.attachInput("RIGHT", 'd');
document.addEventListener('keydown', (e) => {
    mKeysInput.update(e.key, true);
});
document.addEventListener('keyup', (e) => {
    mKeysInput.update(e.key, false);
});

//Load textures
var textures = new Map();
var spritesheets = new Map();
Array.from(document.images).forEach(i => {
    if (i.src.includes("Sheets")) {
        var texSheet = new TextureSheet(i, 16);
        //Specify how to chop up the texture sheet using defineSprite
        switch (i.id) {
            default:
            //eg texSheet.defineSprite("sprite1", 0, 0, 1, 1);
                break;
        }
        spritesheets.set(i.id, texSheet);
    } else {
        textures.set(i.id, i);
    }
});


//Add sounds
var sound = Sound.new();
sound.defineSounds();

var scene = Scene.createGame();

function onNextFrame() {

    UpdateScene.update(scene);
    RenderScene.render(scene, ctx);

    displayContext.drawImage(renderCanvas, 0, 0, displayCanvas.width, displayCanvas.height);


    mKeysInput.updateKeyStates();
    prevMouseDown = isMouseDown;
}

//Add music
/*
var mySongData = zzfxM(...song);
var myAudioNode = zzfxP(...mySongData);
myAudioNode.loop = true;
myAudioNode.start();
*/
var music = true;


//Wait for image to load before running update loop
var loadedImages = false;
var loadChecker;

var boundPattern;
var seafloorPattern;

loadChecker = setInterval(() => {

    if (loadedImages) {
        clearInterval(loadChecker);
        setInterval(() => onNextFrame(), 50);

    } else {
        loadedImages = true;
        Array.from(textures.keys()).forEach(i => {
            if (!textures.get(i).complete) {
                loadedImages = false;
            }
        })
    }

}, 50);

var disableTransition = false;

function resizeDisplay() {
    dspCont1Style = window.getComputedStyle(document.getElementById("c1"));
    var w = parseInt(dspCont1Style.getPropertyValue("width")) * 0.98;
    var h = Math.floor(parseInt(dspCont1Style.getPropertyValue("height")) * 0.98);

    var outW = 0;
    var outH = 0;
    if (h < w * 0.5625) {
        outW = Math.floor(h * 1.7777);
        outH = h;
    } else {
        outW = w;
        outH = Math.floor(w * 0.5625);
    }

    dspCont2.style.width = outW + "px";
    dspCont2.style.height = outH + "px";
    displayCanvas.width = outW;
    displayCanvas.height = outH;

    displayContext.drawImage(renderCanvas, 0, 0, displayCanvas.width, displayCanvas.height);

    document.body.classList.add("stop-transitions");
    if (!disableTransition) {
        disableTransition = true;
        setTimeout(() => {
            document.body.classList.remove("stop-transitions");
            disableTransition = false;
        }, 200);
    }
}

function toggleSound() {
    sound.isActive = !sound.isActive;
}

function toggleMusic() {
    if (music) {
        music = false;
        myAudioNode.disconnect();
    } else {
        music = true;
        var g = zzfxX.createGain();
        g.gain.setValueAtTime(-0.3, zzfxX.currentTime);
        g.connect(zzfxX.destination);
        myAudioNode.connect(g);
        myAudioNode.connect(zzfxX.destination);
    }
}

(function() {
    var script = document.createElement('script');
    script.onload = function() {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(script);
})