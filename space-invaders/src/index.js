// import init from "./scripts/init/init";

import kaboom from "kaboom";

import wallSprite from "./sprites/wall.json";

function init() {
    // initialize kaboom context
    const k = kaboom();

    // define a scene
    k.scene("main", () => {

        // add a text at position (100, 100)
        k.add([
            k.text("ohhimark", 32),
            k.pos(100, 100),
            k.sprite(wallSprite)
        ]);

    });

    // start the game
    k.start("main");
}

init();