// import init from "./scripts/init/init";

import kaboom from "kaboom";
const k = kaboom();

import spaceInvaderPNG from "./assets/space-invader.png";

k.loadSprite("space-invader", spaceInvaderPNG);

// function init() {
// initialize kaboom context

// define a scene
k.scene("main", () => {

    // add a text at position (100, 100)
    k.add([
        k.text("ohhimark", 32),
        k.pos(100, 100),
    ]);

    k.add([
        k.sprite("space-invader")
    ]);

});

// start the game
k.start("main");
// }

// init();