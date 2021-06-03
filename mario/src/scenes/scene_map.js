import * as SCENE_TITLES from "./scene_titles";

import LEVEL_1 from "./scenes/level_1";
import LEVEL_2 from "./scenes/level_2";
import END from "./scenes/end";

export const SCENE_MAP = {
    [SCENE_TITLES.LEVEL_1]: LEVEL_1,
    [SCENE_TITLES.LEVEL_2]: LEVEL_2,
    [SCENE_TITLES.SCENE_END]: END
}