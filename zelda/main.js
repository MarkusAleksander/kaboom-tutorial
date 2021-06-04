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

    const maps = [
        [
            'ycc)cc^ccw',
            'a        b',
            'a     *  b',
            'a   (    b',
            '%        b',
            'a   (    b',
            'a *      b',
            'a        b',
            'xdd)dd)ddz',
        ], [
            'yccccccccw',
            'a        b',
            ')        )',
            'a        b',
            '%        b',
            'a   $    b',
            ')   {    )',
            'a        b',
            'xdd)dd)ddz',
        ]
    ];

    const levelCfg = {
        width: 48,
        height: 48,
        'a': [
            sprite(SPRITE_NAMES.LEFT_WALL),
            solid(),
            'wall',
        ],
        'b': [
            sprite(SPRITE_NAMES.RIGHT_WALL),
            solid(),
            'wall',
        ],
        'c': [
            sprite(SPRITE_NAMES.TOP_WALL),
            solid(),
            'wall',
        ],
        'd': [
            sprite(SPRITE_NAMES.BOTTOM_WALL),
            solid(),
            'wall',
        ],
        'w': [
            sprite(SPRITE_NAMES.TOP_RIGHT_WALL),
            solid(),
            'wall',
        ],
        'x': [
            sprite(SPRITE_NAMES.BOTTOM_LEFT_WALL),
            solid(),
            'wall',
        ],
        'y': [
            sprite(SPRITE_NAMES.TOP_LEFT_WALL),
            solid(),
            'wall',
        ],
        'z': [
            sprite(SPRITE_NAMES.BOTTOM_RIGHT_WALL),
            solid(),
            'wall',
        ],
        '%': [
            sprite(SPRITE_NAMES.LEFT_DOOR),
        ],
        '^': [
            sprite(SPRITE_NAMES.TOP_DOOR),
            'next-level',
        ],
        '$': [
            sprite(SPRITE_NAMES.STAIRS),
            'next-level',
        ],
        '*': [
            sprite(SPRITE_NAMES.SLICER),
            {
                dir: -1
            },
            'slicer',
            'dangerous',
        ],
        '{': [
            sprite(SPRITE_NAMES.SKELETOR),
            {
                dir: -1,
                timer: 0
            },
            'skeletor',
            'dangerous',
        ],
        ')': [
            sprite(SPRITE_NAMES.LANTERNS),
            solid(),
            'wall',
        ],
        '(': [
            sprite(SPRITE_NAMES.FIRE_POT),
            solid(),
        ],
    }

    // * add map
    addLevel(maps[level], levelCfg);

    // add bg
    add([sprite(SPRITE_NAMES.BG), layer("bg")]);

    const scoreLabel = add([
        text(score ?? '0'),
        pos(400, 450),
        layer('ui'),
        scale(4),
        {
            value: score
        }
    ])

    // * add player

    const player = add([
        sprite(SPRITE_NAMES.LINK_MOVE_RIGHT),
        pos(5, 190),
        {
            dir: vec2(1, 0)
        }
    ]);

    // * stop player going through sprites marked solid
    player.action(() => {
        player.resolve();
    });

    const PLAYER_MOVE_SPEED = 120;

    keyDown('left', () => {
        player.changeSprite(SPRITE_NAMES.LINK_MOVE_LEFT);
        player.move(-PLAYER_MOVE_SPEED, 0);
        player.dir = vec2(-1, 0);
    });
    keyDown('right', () => {
        player.changeSprite(SPRITE_NAMES.LINK_MOVE_RIGHT);
        player.move(PLAYER_MOVE_SPEED, 0);
        player.dir = vec2(1, 0);
    });
    keyDown('up', () => {
        player.changeSprite(SPRITE_NAMES.LINK_MOVE_UP);
        player.move(0, -PLAYER_MOVE_SPEED);
        player.dir = vec2(0, -1);
    });
    keyDown('down', () => {
        player.changeSprite(SPRITE_NAMES.LINK_MOVE_DOWN);
        player.move(0, PLAYER_MOVE_SPEED);
        player.dir = vec2(0, 1);
    });

    function spawnKaboom(p) {
        const k = add([
            sprite(SPRITE_NAMES.KABOOM),
            pos(p),
            'kaboom',
        ]);

        wait(1, () => {
            destroy(k);
        });
    }

    keyPress('space', () => {
        spawnKaboom(player.pos.add(player.dir.scale(48)));
    });

    player.overlaps('dangerous', () => {
        go('LOSE', { score: scoreLabel.value })
    });
    player.overlaps('next-level', () => {
        go('GAME', { level: (level + 1) % maps.length, score: scoreLabel.value })
    });

    const SLICER_SPEED = 120;
    const SKELETOR_SPEED = 60;

    action('slicer', (s) => {
        s.move(SLICER_SPEED * s.dir, 0);
    });

    action('skeletor', (s) => {
        s.move(0, SKELETOR_SPEED * s.dir);
        // * change direction after a random time
        s.timer -= dt();
        if (s.timer <= 0) {
            s.dir = -s.dir;
            s.timer = rand(5);
        }
    });

    collides('slicer', 'wall', (s, w) => {
        s.dir = -s.dir;
    });
    collides('skeletor', 'wall', (s, w) => {
        s.dir = -s.dir;
    });

    collides('kaboom', 'skeletor', (k, s) => {
        camShake(4);
        wait(1, () => {
            destroy(k)
        });
        destroy(s)
        scoreLabel.value++;
        scoreLabel.text = scoreLabel.value;
    });


});

scene("LOSE", ({ score }) => {
    add([
        text(score, 32),
        origin('center'),
        pos(width() / 2, height() / 2)
    ])
});

start("GAME", { level: 1, score: 0 });