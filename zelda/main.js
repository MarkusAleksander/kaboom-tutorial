kaboom({
    global: true,
    fullscreen: true,
    scale: 0.6,
    debug: true,
    clearColor: [0, 0, 0, 1]
});

// * LOAD SPRITES

loadRoot("https://i.imgur.com/");

const SPRITE_NAMES = {
    LINK_MOVE_LEFT: "LINK_MOVE_LEFT",
    LINK_MOVE_RIGHT: "LINK_MOVE_RIGHT",
    LINK_MOVE_DOWN: "LINK_MOVE_DOWN",
    LINK_MOVE_UP: "LINK_MOVE_UP",
    LEFT_WALL: "LEFT_WALL",
    TOP_WALL: "TOP_WALL",
    BOTTOM_WALL: "BOTTOM_WALL",
    RIGHT_WALL: "RIGHT_WALL",
    BOTTOM_LEFT_WALL: "BOTTOM_LEFT_WALL",
    BOTTOM_RIGHT_WALL: "BOTTOM_RIGHT_WALL",
    TOP_LEFT_WALL: "TOP_LEFT_WALL",
    TOP_RIGHT_WALL: "TOP_RIGHT_WALL",
    TOP_DOOR: "TOP_DOOR",
    FIRE_POT: "FIRE_POT",
    LEFT_DOOR: "LEFT_DOOR",
    LANTERNS: "LANTERNS",
    SLICER: "SLICER",
    SKELETOR: "SKELETOR",
    KABOOM: "KABOOM",
    STAIRS: "STAIRS",
    BG: "BG",
}

const SPRITE_PATHS = {
    [SPRITE_NAMES["LINK_MOVE_LEFT"]]: "1Xq9biB.png",
    [SPRITE_NAMES["LINK_MOVE_RIGHT"]]: "yZIb8O2.png",
    [SPRITE_NAMES['LINK_MOVE_DOWN']]: 'r377FIM.png',
    [SPRITE_NAMES['LINK_MOVE_UP']]: 'UkV0we0.png',
    [SPRITE_NAMES['LEFT_WALL']]: 'rfDoaa1.png',
    [SPRITE_NAMES['TOP_WALL']]: 'QA257Bj.png',
    [SPRITE_NAMES['BOTTOM_WALL']]: 'vWJWmvb.png',
    [SPRITE_NAMES['RIGHT_WALL']]: 'SmHhgUn.png',
    [SPRITE_NAMES['BOTTOM_LEFT_WALL']]: 'awnTfNC.png',
    [SPRITE_NAMES['BOTTOM_RIGHT_WALL']]: '84oyTFy.png',
    [SPRITE_NAMES['TOP_LEFT_WALL']]: 'xlpUxIm.png',
    [SPRITE_NAMES['TOP_RIGHT_WALL']]: 'z0OmBd1.jpg',
    [SPRITE_NAMES['TOP_DOOR']]: 'U9nre4n.png',
    [SPRITE_NAMES['FIRE_POT']]: 'I7xSp7w.png',
    [SPRITE_NAMES['LEFT_DOOR']]: 'okdJNls.png',
    [SPRITE_NAMES['LANTERNS']]: 'wiSiY09.png',
    [SPRITE_NAMES['SLICER']]: 'c6JFi5Z.png',
    [SPRITE_NAMES['SKELETOR']]: 'Ei1VnX8.png',
    [SPRITE_NAMES['KABOOM']]: 'o9WizfI.png',
    [SPRITE_NAMES['STAIRS']]: 'VghkL08.png',
    [SPRITE_NAMES['BG']]: 'u4DVsx6.png',
}

for (const key in SPRITE_PATHS) {
    if (Object.hasOwnProperty.call(SPRITE_PATHS, key)) {
        loadSprite(key, SPRITE_PATHS[key]);
    }
}

// * CREATE SCENE

scene("GAME", ({ level, score }) => {

    // * define layers
    layers(['bg', 'obj', 'ui'], 'obj');

    const map = [
        'yccccccccw',
        'a        b',
        'a        b',
        'a        b',
        'a        b',
        'a        b',
        'a        b',
        'a        b',
        'a        b',
        'xddddddddz',
    ];

    const levelCfg = {
        width: 48,
        height: 48,
        'a': [
            sprite(SPRITE_NAMES.LEFT_WALL),
            solid(),
        ],
        'b': [
            sprite(SPRITE_NAMES.RIGHT_WALL),
            solid(),
        ],
        'c': [
            sprite(SPRITE_NAMES.TOP_WALL),
            solid(),
        ],
        'd': [
            sprite(SPRITE_NAMES.BOTTOM_WALL),
            solid(),
        ],
        'w': [
            sprite(SPRITE_NAMES.TOP_RIGHT_WALL),
            solid(),
        ],
        'x': [
            sprite(SPRITE_NAMES.BOTTOM_LEFT_WALL),
            solid(),
        ],
        'y': [
            sprite(SPRITE_NAMES.TOP_LEFT_WALL),
            solid(),
        ],
        'z': [
            sprite(SPRITE_NAMES.BOTTOM_RIGHT_WALL),
            solid(),
        ],
        '%': [
            sprite(SPRITE_NAMES.LEFT_DOOR),
            solid(),
        ],
        '^': [
            sprite(SPRITE_NAMES.TOP_DOOR),
            solid(),
        ],
        '$': [
            sprite(SPRITE_NAMES.STAIRS),
            solid(),
        ],
        '*': [
            sprite(SPRITE_NAMES.SLICER),
            solid(),
        ],
        '{': [
            sprite(SPRITE_NAMES.SKELETOR),
            solid(),
        ],
        ')': [
            sprite(SPRITE_NAMES.LANTERNS),
            solid(),
        ],
        '(': [
            sprite(SPRITE_NAMES.FIRE_POT),
            solid(),
        ],
    }

    addLevel(map, levelCfg);

    add([sprite(SPRITE_NAMES.BG), layer("bg")]);

});

start("GAME", { level: 0, score: 0 });