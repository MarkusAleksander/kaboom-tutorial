import { assetNames } from "../../assets/assets";
import worldConfig from "../../worldConfig";

const mapConfig = (engine) => {
    return [
        [
            '                                    ',
            '                                    ',
            '                                    ',
            '                                    ',
            '                                    ',
            '                                    ',
            '                                    ',
            '                                    ',
            '    %   x*x%x                       ',
            '                                    ',
            '                             -+     ',
            '                  ^  ^       ()     ',
            '=========================   ========',
        ], {
            width: worldConfig.x_size,
            height: worldConfig.y_size,
            '=': [
                engine.sprite(assetNames.BRICK),
                engine.solid(),
            ],
            'x': [
                engine.sprite(assetNames.BLOCK),
                engine.solid(),
            ],
            '$': [
                engine.sprite(assetNames.COIN),
                engine.body(),
                'coin',
            ],
            '%': [
                engine.sprite(assetNames.QUESTION),
                engine.solid(),
                'coin-surprise',
            ],
            '*': [
                engine.sprite(assetNames.QUESTION),
                engine.solid(),
                'mushroom-surprise',
            ],
            '#': [
                engine.sprite(assetNames.MUSHROOM),
                engine.body(),
                'mushroom',
            ],
            '}': [
                engine.sprite(assetNames.UNBOXED),
                engine.solid(),
            ],
            '^': [
                engine.sprite(assetNames.EVIL_SHROOM_1),
                engine.solid(),
                'dangerous',
            ],
            '-': [
                engine.sprite(assetNames.PIPE_TOP_LEFT_SIDE),
                engine.scale(0.5),
                engine.solid(),
            ],
            '+': [
                engine.sprite(assetNames.PIPE_TOP_RIGHT_SIDE),
                engine.scale(0.5),
                engine.solid(),
            ],
            '(': [
                engine.sprite(assetNames.PIPE_LEFT),
                engine.scale(0.5),
                engine.solid(),
            ],
            ')': [
                engine.sprite(assetNames.PIPE_RIGHT),
                engine.scale(0.5),
                engine.solid(),
            ],
        }
    ];
}

export default mapConfig;