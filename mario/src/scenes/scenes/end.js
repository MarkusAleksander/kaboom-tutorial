import ActorMgr from "./../../actors/actorManager";
import * as actorOptions from "./../../actors/actorOptions";

import * as SCENE_LIST from "./../scene_titles";

// * Input
import InputMgr from "./../../input/inputManager";

const scene = (args, engine, SceneMgr) => {
    ActorMgr.createActor({
        [actorOptions.ACTOR_NAME]: "FINAL_SCORE",
        [actorOptions.HAS_TEXT]: args.score,
        [actorOptions.HAS_SCALE]: 10,
        [actorOptions.HAS_POSITION]: [engine.width() / 2, engine.height() / 2]
    });

    InputMgr.createKeyPress("space", () => {
        // * spawn a bullet
        SceneMgr.goToScene(SCENE_LIST.SCENE_MAIN);
    });
}

export default scene;