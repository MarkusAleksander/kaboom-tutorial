import ManagerPrototype from "./../prototypes/manager";

import kaboom from "kaboom";

const EngineManager = function EngineManager(data) {

    this._engine = null;

    ManagerPrototype.call(this, data);

    this.initialise = (cfg) => {
        if (this._engine) {
            console.warn("Engine Manager already initialised");
            return;
        }
        this._engine = kaboom(cfg);

        ManagerPrototype.prototype.initialise.call(this);
    }

    this.getEngine = () => {
        if (!this._engine) {
            console.warn("Engine not set up");
        }
        return this._engine;
    }
}

EngineManager.prototype = Object.create(ManagerPrototype.prototype);
EngineManager.prototype.constructor = EngineManager;

const EngineMgr = new EngineManager({
    managerName: "EngineManager"
});

export default EngineMgr;