import ManagerPrototype from "./../prototypes/manager";

import { SCENE_MAP } from "./scene_map";

const SceneManager = function SceneManager(data) {

    this._engine = null;
    this._actorMgr = null

    ManagerPrototype.call(this, data);

    // * initialise
    this.initialise = (engine, actorMgr) => {
        if (this._engine) {
            console.warn("Scene Manager already initialised");
            return;
        }
        this._engine = engine;
        this._actorMgr = actorMgr;

        ManagerPrototype.prototype.initialise.call(this);
    }

    // * create a scene
    this.createScene = (sceneName) => {

        if (!Object.hasOwnProperty.call(SCENE_MAP, sceneName)) {
            // * attempting to create unlisted scene
            console.warn("Attempting to create unlisted scene [" + sceneName + "]");
            return null;
        }

        return this._engine.scene(
            sceneName, (args) => { return SCENE_MAP[sceneName](args, this._engine, this) }
        )
    }

    this.addLevel = (mapCfg) => {
        return this._engine.addLevel(...mapCfg);
    }

    this.addLayer = (layerCfg) => {
        return this._engine.layer(...layerCfg);
    }

    this.goToScene = (sceneName, data) => {
        this._actorMgr.destroyAll();

        this._engine.go(sceneName, data);
    }
}

SceneManager.prototype = Object.create(ManagerPrototype.prototype);
SceneManager.prototype.constructor = SceneManager;

const SceneMgr = new SceneManager({
    managerName: "SceneManager"
});

export default SceneMgr;