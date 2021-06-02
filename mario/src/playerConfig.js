import { assetNames } from "./assets/assets";

const move_speed = 120;
const jump_force = 300;

const playerConfig = {
    H_MOVE_SPEED: move_speed,
    JUMP_FORCE: jump_force,
    BIG_JUMP_FORCE: jump_force * 1.5,
    INITIAL_POSITION: (engine) => [30, 30],
    SPRITE: assetNames.MARIO_STANDING
}

export default playerConfig;