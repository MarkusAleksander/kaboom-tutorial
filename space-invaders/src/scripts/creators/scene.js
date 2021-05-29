const createScene = (engine, sceneName, sceneConfigFn) => {
    engine.scene(sceneName, (args) => sceneConfigFn(args));
};

export default createScene