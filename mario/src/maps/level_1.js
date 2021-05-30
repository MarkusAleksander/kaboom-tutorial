import { assetNames } from "./../assets/assets";

const mapConfig = (engine) => {
    return [
        [
            '                                             ',
            '                                             ',
            '                                             ',
            '                                             ',
            '                                             ',
            '    %   =*=%=                                ',
            '                                             ',
            '                                  -+         ',
            '                       ^  ^       ()         ',
            '==============================   ============',
        ], {
            width: 30,
            height: 25,
            '=': [],
            '%': [],
            '^': [],
            '*': [],
            '-': [],
            '+': [],
            '(': [],
            ')': [],
        }
    ];
}

export default mapConfig;