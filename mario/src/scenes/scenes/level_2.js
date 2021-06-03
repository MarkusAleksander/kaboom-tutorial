import ActorMgr from "../../actors/actorManager";
import * as actorOptions from "../../actors/actorOptions";
import MapMgr from "../../maps/mapManager";

import * as SCENE_LIST from "../scene_titles";

// * Input
import InputMgr from "../../input/inputManager";

// * player config
import playerConfig from "../../playerConfig";

// * world config
import worldConfig from "../../worldConfig";

const scene = (args, engine, SceneMgr) => {
    // debugger;
    // * layer
    SceneMgr.addLayer([['obj', 'ui'], 'obj']);

    // * level
    const GAME_LEVEL = SceneMgr.addLevel(MapMgr.createMap(SCENE_LIST.LEVEL_2));

    // * make mario big when eating a mushroom
    function makeBig() {
        let timer = 0;
        let isBig = false;
        return {
            update() {
                if (isBig) {
                    timer -= engine.dt();
                    if (timer <= 0) {
                        this.smallify();
                    }
                }
            },
            isBig() {
                return isBig;
            },
            smallify() {
                this.scale = engine.vec2(1);
                timer = 0;
                isBig = false;
                current_jump_force = playerConfig.JUMP_FORCE
            },
            biggify(time) {
                this.scale = engine.vec2(2);
                timer = time;
                isBig = true;
                current_jump_force = playerConfig.BIG_JUMP_FORCE
            }
        }
    }

    let isJumping = false;
    let isFalling = false;

    // * create player
    const PLAYER_ACTOR = ActorMgr.createActor({
        [actorOptions.ACTOR_NAME]: "PLAYER",
        [actorOptions.HAS_SPRITE]: playerConfig.SPRITE,
        [actorOptions.HAS_POSITION]: playerConfig.INITIAL_POSITION(engine),
        [actorOptions.IS_BODY]: true,
        [actorOptions.HAS_EXTRA]: [makeBig()]
    });

    PLAYER_ACTOR.collides('mushroom', (m) => {
        // * move any mushrooms
        PLAYER_ACTOR.biggify(6);
        engine.destroy(m);
    });

    PLAYER_ACTOR.collides('dangerous', (d) => {
        if (isJumping || isFalling) {
            engine.destroy(d);
        } else {
            SceneMgr.goToScene(SCENE_LIST.SCENE_END, { score: SCORE_ACTOR.value });
        }
    });


    PLAYER_ACTOR.collides('pipe', () => {
        engine.keyPress('down', () => {
            SceneMgr.goToScene(SCENE_LIST.LEVEL_1, { score: SCORE_ACTOR.value });
        });
    });

    const FALL_DEATH = worldConfig.y_size * 20;

    PLAYER_ACTOR.action(() => {
        engine.camPos(PLAYER_ACTOR.pos);
        if (PLAYER_ACTOR.pos.y >= FALL_DEATH) {
            SceneMgr.goToScene(SCENE_LIST.SCENE_END, { score: SCORE_ACTOR.value });
        }
    });

    InputMgr.createKeyDown("right", () => {
        PLAYER_ACTOR.move(playerConfig.H_MOVE_SPEED, 0);
    });
    InputMgr.createKeyDown("left", () => {
        PLAYER_ACTOR.move(-playerConfig.H_MOVE_SPEED, 0);
    });

    let current_jump_force = playerConfig.JUMP_FORCE;

    PLAYER_ACTOR.action(() => {
        if (PLAYER_ACTOR.grounded()) {
            isJumping = false;
        } else {
            isFalling = true;
        }
    });

    InputMgr.createKeyPress("space", () => {
        if (PLAYER_ACTOR.grounded()) {
            // * only jump if grounded
            isJumping = true;
            PLAYER_ACTOR.jump(current_jump_force);
        }
    });

    // * collisions
    PLAYER_ACTOR.on("headbump", (obj) => {
        if (obj.is('coin-surprise')) {
            // spawn a coin when headbump with tag coin-surprise
            // * then replace with unboxed
            let c = GAME_LEVEL.spawn('$', obj.gridPos.sub(0, 1));
            SCORE_ACTOR.value++;
            SCORE_ACTOR.text = SCORE_ACTOR.value;
            setTimeout(() => {
                engine.destroy(c);
            }, 1500);
            engine.destroy(obj);
            GAME_LEVEL.spawn('}', obj.gridPos.sub(0, 0));
        }
    });
    PLAYER_ACTOR.on("headbump", (obj) => {
        if (obj.is('mushroom-surprise')) {
            // spawn a coin when headbump with tag coin-surprise
            // * then replace with unboxed
            GAME_LEVEL.spawn('#', obj.gridPos.sub(0, 1));
            engine.destroy(obj);
            GAME_LEVEL.spawn('}', obj.gridPos.sub(0, 0));
        }
    });

    // * actions
    engine.action('mushroom', (m) => {
        // * move any mushrooms
        m.move(20, 0);
    });

    const ENEMY_SPEED = 20;
    engine.action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0);
    });

    // * collisions

    // // * setup timer and score
    const SCORE_ACTOR = ActorMgr.createActor({
        [actorOptions.ACTOR_NAME]: "SCORE",
        [actorOptions.HAS_TEXT]: (args && args.score) ? args.score : 0,
        [actorOptions.HAS_POSITION]: [worldConfig.x_size, worldConfig.y_size],
        [actorOptions.HAS_ORIGIN]: actorOptions.ORIGIN_TOP_LEFT,
        [actorOptions.ON_LAYER]: 'ui',
        [actorOptions.HAS_SCALE]: 3,
        [actorOptions.HAS_DATA]: {
            value: (args && args.score) ? args.score : 0
        }
    });

    const LEVEL_TITLE = ActorMgr.createActor({
        [actorOptions.ACTOR_NAME]: "LevelTitle",
        [actorOptions.HAS_TEXT]: 'Level 2',
        [actorOptions.HAS_POSITION]: [worldConfig.x_size, worldConfig.y_size * 3],
        [actorOptions.HAS_ORIGIN]: actorOptions.ORIGIN_TOP_LEFT,
        [actorOptions.ON_LAYER]: 'ui',
        [actorOptions.HAS_SCALE]: 2,
    });

    // const TIME_ACTOR = ActorMgr.createActor({
    //     [actorOptions.ACTOR_NAME]: "TIME",
    //     [actorOptions.HAS_TEXT]: '0',
    //     [actorOptions.HAS_POSITION]: [90, 20],
    //     [actorOptions.ON_LAYER]: 'ui',
    //     [actorOptions.HAS_SCALE]: 2,
    //     [actorOptions.HAS_ACTIONS]: [
    //         () => {
    //             TIME_ACTOR.time -= engine.dt();
    //             TIME_ACTOR.text = TIME_ACTOR.time.toFixed(2);
    //             // go to scene
    //             if (TIME_ACTOR.time <= 0) {
    //                 SceneMgr.goToScene(SCENE_LIST.SCENE_END, {
    //                     score: SCORE_ACTOR.value
    //                 });
    //             }
    //         }
    //     ],
    //     [actorOptions.HAS_DATA]: {
    //         time: TIME_LEFT
    //     }
    // });

}

export default scene;