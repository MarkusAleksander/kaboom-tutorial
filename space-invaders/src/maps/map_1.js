import { assetNames } from "./../assets/assets";

const mapConfig = (engine) => {
    return [
        [
            '!$£$£$£$£$£$£      &',
            '!£$£$£$£$£$£$      &',
            '!$£$£$£$£$£$£      &',
            '!                  &',
            '!                  &',
            '!                  &',
            '!                  &',
            '!                  &',
            '!                  &',
            '!                  &',
            '!                  &',
            '!                  &',
        ], {
            width: 30,
            height: 25,
            '!': [
                engine.sprite(assetNames.LEFT_WALL),
                engine.solid(),
                'left-wall',
            ],
            '&': [
                engine.sprite(assetNames.RIGHT_WALL),
                engine.solid(),
                'right-wall',
            ],
            '$': [
                engine.sprite(assetNames.ENEMY1),
                engine.scale(0.7),
                'space-invader'
            ],
            '£': [
                engine.sprite(assetNames.ENEMY2),
                engine.scale(0.7),
                'space-invader'
            ]
        }
    ];
}

export default mapConfig;