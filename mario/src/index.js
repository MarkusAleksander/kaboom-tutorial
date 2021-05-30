// * Engine
import EngineMgr from "./engine/engineManager";

// * Assets
import AssetMgr from "./assets/assetManager";

// * Scene
import SceneMgr from "./scenes/sceneManager";
import * as SCENE_LIST from "./scenes/scene_list";

// * Maplist
import MapMgr from "./maps/mapManager";

// * Input
import InputMgr from "./input/inputManager";

// * Actor
import ActorMgr from "./actors/actorManager";
import * as actorOptions from "./actors/actorOptions";

// * player config
import playerConfig from "./playerConfig";

// * initialise
EngineMgr.initialise();

const engine = EngineMgr.getEngine();

AssetMgr.initialise(engine);

SceneMgr.initialise(engine);

MapMgr.initialise(engine);

InputMgr.initialise(engine);

ActorMgr.initialise(engine);

// * set up
AssetMgr.loadAssets();

// * create scene
SceneMgr.createScene(SCENE_LIST.SCENE_MAIN, () => {

    // * scene constants
    const TIME_LEFT = 10;
    const INVADER_SPEED = 100;
    const LEVEL_DOWN = 200;
    const BULLET_SPEED = -400;

    // * scene variables
    var CURRENT_SPEED = INVADER_SPEED;

    // * level
    SceneMgr.addLevel(MapMgr.createMap(SCENE_LIST.SCENE_MAIN));

    // * layer
    SceneMgr.addLayer([['obj', 'ui'], 'obj']);

    const incrementScore = () => {
        SCORE_ACTOR.value++;
        SCORE_ACTOR.text = SCORE_ACTOR.value;
    }

    // * setup timer and score
    const SCORE_ACTOR = ActorMgr.createActor({
        [actorOptions.ACTOR_NAME]: "SCORE",
        [actorOptions.HAS_TEXT]: '0',
        [actorOptions.HAS_POSITION]: [20, 20],
        [actorOptions.ON_LAYER]: 'ui',
        [actorOptions.HAS_SCALE]: 3,
        [actorOptions.HAS_DATA]: {
            value: 0
        }
    });

    const TIME_ACTOR = ActorMgr.createActor({
        [actorOptions.ACTOR_NAME]: "TIME",
        [actorOptions.HAS_TEXT]: '0',
        [actorOptions.HAS_POSITION]: [90, 20],
        [actorOptions.ON_LAYER]: 'ui',
        [actorOptions.HAS_SCALE]: 2,
        [actorOptions.HAS_ACTIONS]: [
            () => {
                TIME_ACTOR.time -= engine.dt();
                TIME_ACTOR.text = TIME_ACTOR.time.toFixed(2);
                // go to scene
                if (TIME_ACTOR.time <= 0) {
                    // SceneMgr.goToScene(SCENE_LIST.END, );
                }
            }
        ],
        [actorOptions.HAS_DATA]: {
            time: TIME_LEFT
        }
    });

    const PLAYER_ACTOR = ActorMgr.createActor({
        [actorOptions.ACTOR_NAME]: "PLAYER",
        [actorOptions.HAS_SPRITE]: playerConfig.SPRITE,
        [actorOptions.HAS_POSITION]: playerConfig.INITIAL_POSITION(engine),
    })

    InputMgr.createKeyDown("right", () => {
        PLAYER_ACTOR.move(playerConfig.H_MOVE_SPEED, 0);
    });
    InputMgr.createKeyDown("left", () => {
        PLAYER_ACTOR.move(-playerConfig.H_MOVE_SPEED, 0);
    });

    let bullet_count = 0;

    const spawnBullet = (p) => {
        ActorMgr.createActor({
            [actorOptions.ACTOR_NAME]: 'bullet'.concat(bullet_count),
            [actorOptions.HAS_RECT]: [6, 18],
            [actorOptions.HAS_COLOR]: [0.5, 0.5, 1],
            [actorOptions.HAS_POSITION]: [p.x, p.y],
            [actorOptions.HAS_TAGS]: ['bullet']
        });
        bullet_count++;
    }

    InputMgr.createKeyPress("space", () => {
        // * spawn a bullet
        spawnBullet(PLAYER_ACTOR.pos.add(0, -25));
    });

    // * actions
    ActorMgr.createTaggedAction('space-invader', (s) => {
        s.move(CURRENT_SPEED, 0);

        if (s.pos.y > engine.height() / 2) {
            // engine.go()
        }
    });

    ActorMgr.createTaggedAction('bullet', (b) => {
        b.move(0, BULLET_SPEED);

        if (b.pos.y < 0) {
            ActorMgr.destroyActorByObject(b);
        }
    });

    ActorMgr.createTagOverlap(PLAYER_ACTOR, 'space-invader', (s) => {
        // go to end
    });

    // * collisions

    ActorMgr.createTaggedCollision('bullet', 'space-invader', (b, s) => {
        ActorMgr.destroyActorByObject(b);
        // todo
        engine.destroy(s);
        incrementScore();
    });

    ActorMgr.createTaggedCollision('space-invader', 'right-wall', () => {
        CURRENT_SPEED = -INVADER_SPEED;
        engine.every('space-invader', (s) => {
            s.move(0, LEVEL_DOWN);
        });
    });

    ActorMgr.createTaggedCollision('space-invader', 'left-wall', () => {
        CURRENT_SPEED = INVADER_SPEED;
        engine.every('space-invader', (s) => {
            s.move(0, LEVEL_DOWN);
        });
    });

});

// start the game
engine.start(SCENE_LIST.SCENE_MAIN);