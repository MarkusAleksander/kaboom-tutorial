const createObjectAction = (obj, cb) => {
    obj.action(cb);
}

const createSceneAction = (engine, cb) => {
    engine.action(cb);
}

const createTagAction = (engine, tag, cb) => {
    engine.action(tag, cb);
}

export {
    createObjectAction,
    createSceneAction,
    createTagAction,
};