import ManagerPrototype from "./../prototypes/manager";

import { SCENE_LIST } from "./scene_list";

const SceneManager = function SceneManager(data) {

    this._engine = null;

    ManagerPrototype.call(this, data);

    // * initialise
    this.initialise = (engine) => {
        if (this._engine) {
            console.warn("Scene Manager already initialised");
            return;
        }
        this._engine = engine;

        ManagerPrototype.prototype.initialise.call(this);
    }

    // * create a scene
    this.createScene = (sceneName, setupFn) => {

        if (!SCENE_LIST.includes(sceneName)) {
            // * attempting to create unlisted scene
            console.warn("Attempting to create unlisted scene [" + sceneName + "]");
            return;
        }

        this._engine.scene(
            sceneName, setupFn
        )
    }

    this.addLevel = (mapCfg) => {
        this._engine.addLevel(...mapCfg);
    }

    this.addLayer = (layerCfg) => {
        this._engine.layer(...layerCfg);
    }

    this.goToScene = (sceneName, data) => {
        this._engine.go(sceneName, data);
    }
}

SceneManager.prototype = Object.create(ManagerPrototype.prototype);
SceneManager.prototype.constructor = SceneManager;

const SceneMgr = new SceneManager({
    managerName: "SceneManager"
});

export default SceneMgr;