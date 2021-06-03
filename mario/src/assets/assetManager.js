import ManagerPrototype from "./../prototypes/manager";

import { assets } from "./assets";

const AssetManager = function AssetManager(data) {

    this._engine = null;

    ManagerPrototype.call(this, data);

    this.initialise = (engine) => {
        if (this._engine) {
            console.warn("Asset Manager already initialised");
            return;
        }
        this._engine = engine;

        ManagerPrototype.prototype.initialise.call(this);
    }

    this.loadAssets = () => {
        for (const key in assets) {
            if (Object.hasOwnProperty.call(assets, key)) {
                this._engine.loadSprite(key, assets[key]);
            }
        }
    }
}

AssetManager.prototype = Object.create(ManagerPrototype.prototype);
AssetManager.prototype.constructor = AssetManager;

const AssetMgr = new AssetManager({
    managerName: "AssetManager"
});

export default AssetMgr;