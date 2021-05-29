const setupKeyDownHandler = (engine, key, handler) => {
    engine.keyDown(key, handler);
}

const setupKeyPressHandler = (engine, key, handler) => {
    engine.keyPress(key, handler);
}

export {
    setupKeyDownHandler,
    setupKeyPressHandler
}