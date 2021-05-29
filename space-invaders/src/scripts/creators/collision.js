const createCollision = (engine, a, b, cb) => {
    engine.collides(a, b, cb);
}

export default createCollision;