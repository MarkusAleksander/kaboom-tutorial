import * as actorOptions from "./actorOptions";

const createActor = (engine, config) => {
    const setup = [
        engine.origin('center')
    ];

    // debugger;

    for (const key in config) {
        if (Object.hasOwnProperty.call(config, key)) {
            // const element = config[key];

            switch (key) {
                case actorOptions.HAS_SPRITE:
                    setup.push(engine.sprite(config[key]));
                    break;
                case actorOptions.HAS_POSITION:
                    setup.push(engine.pos(config[key][0], config[key][1]));
                    break;
                case actorOptions.IS_BODY:
                    setup.push(engine.body());
                    break;
                case actorOptions.IS_SOLID:
                    setup.push(engine.solid());
                    break;
                case actorOptions.HAS_TAGS:
                    for (let i = 0; i < config[key].length; i++) {
                        setup.push(config[key][i]);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    return engine.add(setup);
}

export default createActor;