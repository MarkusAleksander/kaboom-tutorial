import ManagerPrototype from "./../prototypes/manager";

import mapList from "./mapList";

const MapManager = function MapManager(data) {

    this._engine = null;

    ManagerPrototype.call(this, data);

    // * initialise
    this.initialise = (engine) => {
        if (this._engine) {
            console.warn("Map Manager already initialised");
            return;
        }
        this._engine = engine;

        ManagerPrototype.prototype.initialise.call(this);
    }

    // * create a scene
    this.createMap = (mapName) => {
        return mapList[mapName](this._engine);
    }

}

MapManager.prototype = Object.create(ManagerPrototype.prototype);
MapManager.prototype.constructor = MapManager;

const SceneMgr = new MapManager({
    managerName: "MapManager"
});

export default SceneMgr;