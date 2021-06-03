// * Engine
import EngineMgr from "./engine/engineManager";

// * Assets
import AssetMgr from "./assets/assetManager";

// * Scene
import SceneMgr from "./scenes/sceneManager";
import * as SCENE_LIST from "./scenes/scene_titles";

// * Maplist
import MapMgr from "./maps/mapManager";

// * Input
import InputMgr from "./input/inputManager";

// * Actor
import ActorMgr from "./actors/actorManager";

// * initialise
EngineMgr.initialise({
    canvas: document.querySelector("#game-world"),
    crisp: true,
    scale: 2,
    clearColor: [0, 0, 0, 1]
});

const engine = EngineMgr.getEngine();

AssetMgr.initialise(engine);

ActorMgr.initialise(engine);

SceneMgr.initialise(engine, ActorMgr);

MapMgr.initialise(engine);

InputMgr.initialise(engine);


// * set up
AssetMgr.loadAssets();

// * create scene
SceneMgr.createScene(SCENE_LIST.LEVEL_1);
// * create scene
SceneMgr.createScene(SCENE_LIST.LEVEL_2);

// * create end scene
SceneMgr.createScene(SCENE_LIST.SCENE_END);

// start the game
engine.start(SCENE_LIST.LEVEL_1);