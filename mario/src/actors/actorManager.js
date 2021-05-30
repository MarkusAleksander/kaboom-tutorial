import ManagerPrototype from "./../prototypes/manager";

import * as actorOptions from "./actorOptions";

const ActorManager = function ActorManager(data) {

    this._engine = null;

    this._actorList = [];

    ManagerPrototype.call(this, data);

    this.initialise = (engine) => {
        if (this._engine) {
            console.warn("Actor Manager already initialised");
            return;
        }
        this._engine = engine;

        ManagerPrototype.prototype.initialise.call(this);
    }

    this.createActor = (actorCfg) => {

        if (this.getActor(actorCfg[actorOptions.ACTOR_NAME])) {
            console.warn("[" + actorCfg[actorOptions.ACTOR_NAME] + "] Actor already exists");
            return null;
        }

        const setup = [
            this._engine.origin('center')
        ];

        for (const key in actorCfg) {
            if (Object.hasOwnProperty.call(actorCfg, key)) {
                switch (key) {
                    case actorOptions.HAS_SPRITE:
                        setup.push(this._engine.sprite(actorCfg[key]));
                        break;
                    case actorOptions.HAS_POSITION:
                        setup.push(this._engine.pos(actorCfg[key][0], actorCfg[key][1]));
                        break;
                    case actorOptions.IS_BODY:
                        setup.push(this._engine.body());
                        break;
                    case actorOptions.IS_SOLID:
                        setup.push(this._engine.solid());
                        break;
                    case actorOptions.HAS_TAGS:
                        for (let i = 0; i < actorCfg[key].length; i++) {
                            setup.push(actorCfg[key][i]);
                        }
                        break;
                    case actorOptions.HAS_COLLISIONS:
                        for (let i = 0; i < actorCfg[key].length; i++) {
                            let cfg = actorCfg[key][i];

                            this._engine.collides(
                                actorCfg[actorOptions.ACTOR_NAME],
                                cfg.actorName,
                                cfg.handler
                            )
                        }
                        break;
                    case actorOptions.HAS_RECT:
                        setup.push(this._engine.rect(actorCfg[key][0], actorCfg[key][1]));
                        break;
                    case actorOptions.HAS_COLOR:
                        setup.push(this._engine.color(
                            actorCfg[key][0],
                            actorCfg[key][1],
                            actorCfg[key][2]
                        ));
                        break;
                    case actorOptions.HAS_SCALE:
                        setup.push(this._engine.scale(actorCfg[key]));
                        break;
                    case actorOptions.HAS_TEXT:
                        setup.push(this._engine.text(actorCfg[key]));
                        break;
                    case actorOptions.ON_LAYER:
                        setup.push(this._engine.layer(actorCfg[key]));
                        break;
                    default:
                        break;
                }
            }
        }

        // * setup extra data
        const extra_data = {
            actorName: actorCfg[actorOptions.ACTOR_NAME],
        };

        if (actorCfg[actorOptions.HAS_DATA]) {
            let data = actorCfg[actorOptions.HAS_DATA];
            for (const d in data) {
                if (Object.hasOwnProperty.call(data, d)) {
                    extra_data[d] = data[d];
                }
            }
        }

        setup.push(extra_data);

        const actor = this._engine.add(setup);

        // * set up actions
        if (actorCfg[actorOptions.HAS_ACTIONS]) {
            for (let i = 0; i < actorCfg[actorOptions.HAS_ACTIONS].length; i++) {
                let handler = actorCfg[actorOptions.HAS_ACTIONS][i];

                actor.action(handler);
            }
        }

        this._actorList.push({
            actorName: actorCfg[actorOptions.ACTOR_NAME],
            actor: actor
        })

        return actor;
    }

    this.destroyActorByName = (actorName) => {
        let actor = this.getActor(actorName);

        this.destroyActorByObject(actor);
    }


    this.destroyActorByObject = (actorObj) => {
        // * remove actor from array      
        let actorIdx = this.getActorIdx(actorObj.actorName);
        if (actorIdx < 0) {
            console.warn("Actor [" + actorObj.actorName + "] not found");
            return;
        }

        this._actorList.splice(actorIdx, 0);

        this._engine.destroy(actorObj);
    }

    this.getActor = (actorName) => {
        return this._actorList.find(actor => actor.actorName === actorName);
    }

    this.getActorIdx = (actorName) => {
        return this._actorList.findIndex(actor => actor.actorName === actorName);
    }

    this.createAction = (handler) => {
        this._engine.action(handler);
    }

    this.createTaggedAction = (tag, handler) => {
        this._engine.action(tag, handler);
    }

    this.createOverlap = (actor_1, actor_2, handler) => {
        // 
    }

    this.createTagOverlap = (actor_obj, tag, handler) => {
        actor_obj.overlaps(tag, handler);
    }

    this.createTaggedCollision = (tag_1, tag_2, handler) => {
        this._engine.collides(tag_1, tag_2, handler);
    }
}

ActorManager.prototype = Object.create(ManagerPrototype.prototype);
ActorManager.prototype.constructor = ActorManager;

const ActorMgr = new ActorManager({
    managerName: "ActorManager"
});

export default ActorMgr;