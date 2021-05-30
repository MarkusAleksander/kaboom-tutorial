import { assetNames } from "./assets/assets";

const move_speed = 200;

const playerConfig = {
    H_MOVE_SPEED: move_speed,
    V_MOVE_SPEED: move_speed,
    INITIAL_POSITION: (engine) => [engine.width() / 2, engine.height() / 2],
    SPRITE: assetNames.SPACE_SHIP
}

export default playerConfig;