import { assetNames } from "../../assets/assets";
import worldConfig from "../../worldConfig";

const mapConfig = (engine) => {
    return [
        [
            '£                                  £',
            '£                                  £',
            '£                                  £',
            '£                                  £',
            '£                                  £',
            '£££7££7££££              s s       £',
            '£                      s s s       £',
            '£                    s s s s    -+ £',
            '£             !    s s s s s    () £',
            '£zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz£',
        ], {
            width: worldConfig.x_size,
            height: worldConfig.y_size,
            '@': [
                engine.sprite(assetNames.BLUE_BRICK),
                engine.solid(),
                engine.scale(0.5),
            ],
            '7': [
                engine.sprite(assetNames.BLUE_SURPRISE),
                engine.solid(),
                engine.scale(0.5),
                'coin-surprise',
            ],
            's': [
                engine.sprite(assetNames.BLUE_STEEL),
                engine.solid(),
                engine.scale(0.5),
            ],
            'z': [
                engine.sprite(assetNames.BLUE_BLOCK),
                engine.solid(),
                engine.scale(0.5),
            ],
            '!': [
                engine.sprite(assetNames.BLUE_EVIL_SHROOM),
                engine.body(),
                engine.scale(0.5),
                'dangerous'
            ],
            '£': [
                engine.sprite(assetNames.BLUE_BLOCK),
                engine.solid(),
                engine.scale(0.5),
            ],
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
                'pipe'
            ],
            '+': [
                engine.sprite(assetNames.PIPE_TOP_RIGHT_SIDE),
                engine.scale(0.5),
                engine.solid(),
                'pipe'
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