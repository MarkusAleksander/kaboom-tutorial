import kaboom from "kaboom";

// * Engines
// import engine from "./scripts/engines/kaboom";

const engine = kaboom({
    debug: true,
    clearColor: [0, 0, 0, 1]
});

// import kaboom from "kaboom";
// const k = kaboom();

// * Loaders
import loadAsset from "./scripts/loaders/loadAsset";

// * Creaters
import createScene from "./scripts/creators/scene";
import createActor from "./scripts/creators/actor";
import * as actorOptions from "./scripts/creators/actorOptions";
import createLevel from "./scripts/creators/level";
import createLayer from "./scripts/creators/layer";
import {
    createObjectAction,
    // createSceneAction,
    createTagAction
} from "./scripts/creators/action";
import createCollision from "./scripts/creators/collision";

// * Input
import { setupKeyDownHandler, setupKeyPressHandler } from "./scripts/input/keyboard";

// * Player config
import playerConfig from "./playerConfig";

// * Maps
import map_config from "./maps/map_1";

// * --- PREP

// * Assets
import { assets } from "./assets/assets";

// loop through and load assets
for (const key in assets) {
    if (Object.hasOwnProperty.call(assets, key)) {
        loadAsset(engine, key, assets[key]);
    }
}

const SCENE_MAIN = "SCENE_MAIN";
const SCENE_END = "SCENE_END";

// Game constants
const TIME_LEFT = 10;
const INVADER_SPEED = 100;
const LEVEL_DOWN = 200;

const BULLET_SPEED = -400;

// * create a scene
createScene(engine, SCENE_MAIN, () => {

    // * scene variables
    var CURRENT_SPEED = INVADER_SPEED;

    // * scene functions
    const GOTO_SCENE = (scene, data) => {
        engine.go(scene, data);
    }

    // * create level
    createLevel(engine, ...map_config(engine));

    // ui layer for scoring
    createLayer(engine, [['obj', 'ui'], 'obj']);

    const SCORE = engine.add([
        engine.text('0'),
        engine.pos(20, 20),
        engine.layer('ui'),
        engine.scale(3),
        {
            value: 0
        }
    ]);

    // * timer for end
    const TIMER = engine.add([
        engine.text('0'),
        engine.pos(90, 20),
        engine.scale(2),
        engine.layer('ui'),
        {
            time: TIME_LEFT
        }
    ]);

    // * create action
    createObjectAction(TIMER, () => {
        TIMER.time -= engine.dt();
        TIMER.text = TIMER.time.toFixed(2);

        if (TIMER.time <= 0) {
            GOTO_SCENE(SCENE_END, { score: SCORE.value })
        }
    });

    // * setup player
    const player = createActor(engine, {
        [actorOptions.HAS_SPRITE]: playerConfig.SPRITE,
        [actorOptions.HAS_POSITION]: playerConfig.INITIAL_POSITION(engine),
    });

    // * player functions
    // * spawn bullets
    const spawnBullet = (p) => {
        engine.add([
            engine.rect(6, 18),
            engine.pos(p),
            engine.origin('center'),
            engine.color(0.5, 0.5, 1),
            'bullet'
        ]);
    }

    // * player key presses
    setupKeyDownHandler(engine, "right", () => {
        player.move(playerConfig.H_MOVE_SPEED, 0);
    });
    setupKeyDownHandler(engine, "left", () => {
        player.move(-playerConfig.H_MOVE_SPEED, 0);
    });
    setupKeyPressHandler(engine, "space", () => {
        spawnBullet(player.pos.add(0, -25));
    });

    // * for space invaders
    createTagAction(engine, 'space-invader', (s) => {
        s.move(CURRENT_SPEED, 0);
    });

    // * overlap
    player.overlaps('space-invader', () => {
        engine.go(SCENE_END, { score: SCORE.value });
    });

    createTagAction(engine, 'space-invader', (s) => {
        if (s.pos.y >= engine.height() / 2) {
            engine.go(SCENE_END, { score: SCORE.value });
        }
    });

    createTagAction(engine, 'bullet', (b) => {
        b.move(0, BULLET_SPEED);

        if (b.pos.y < 0) {
            engine.destroy(b);
        }
    });

    // * set collisions
    createCollision(engine, 'space-invader', 'right-wall', () => {
        CURRENT_SPEED = -INVADER_SPEED;
        engine.every('space-invader', (s) => {
            s.move(0, LEVEL_DOWN);
        });
    });

    createCollision(engine, 'space-invader', 'left-wall', () => {
        CURRENT_SPEED = INVADER_SPEED;
        engine.every('space-invader', (s) => {
            s.move(0, LEVEL_DOWN);
        });
    });

    createCollision(engine, 'bullet', 'space-invader', (b, s) => {
        engine.camShake(4);
        engine.destroy(b);
        engine.destroy(s);
        SCORE.value++;
        SCORE.text = SCORE.value;
    });

});

// * create end scene
createScene(engine, SCENE_END, (args) => {
    engine.add([
        engine.text(args.score),
        engine.origin('center'),
        engine.scale(10),
        engine.pos(engine.width() / 2, engine.height() / 2)
    ]);
});

// start the game
engine.start(SCENE_MAIN);