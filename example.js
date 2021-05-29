// import init from "./scripts/init/init";

import kaboom from "kaboom";
const k = kaboom();

import spaceInvaderPNG from "./assets/space-invader.png";
import enemyPNG from "./assets/enemy.png";
import groundJPG from "./assets/ground.jpg";

k.loadSprite("space-invader", spaceInvaderPNG);
k.loadSprite("ground", groundJPG);
k.loadSprite("enemy", enemyPNG);

// function init() {
// initialize kaboom context

// define a scene
k.scene("main", () => {

    // add a text at position (100, 100)
    // k.add([
    //     k.text("ohhimark", 32),
    //     k.pos(100, 100),
    // ]);

    const player = k.add([
        k.sprite("space-invader"),
        k.pos(20, 20),
        k.body()
    ]);

    const MOVE_SPEED = 200;

    k.keyDown("right", () => {
        player.move(MOVE_SPEED, 0)
    });
    k.keyDown("left", () => {
        player.move(-MOVE_SPEED, 0)
    });
    k.keyDown("up", () => {
        player.move(0, -MOVE_SPEED * 2)
    });

    k.addLevel([
        '             ',
        '             ',
        '             ',
        '      @      ',
        '             ',
        '             ',
        '             ',
        'xxxxxxxxxxxxx',
    ], {
        width: 40,
        height: 40,
        'x': [
            k.sprite('ground'),
            k.solid()
        ],
        '@': [
            k.sprite('enemy'),
            k.body(),
            'dangerous'
        ]
    });

    player.collides('dangerous', () => {
        k.destroy(player);
    });

});

// start the game
k.start("main");
// }

// init();