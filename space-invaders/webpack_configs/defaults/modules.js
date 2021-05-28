/* eslint-disable no-undef */

// *** MODULES ***//

const HTML_module = {
    test: /\.html$/i,
    loader: 'html-loader',
};

// * JS
const JS_module = {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
};

// * Typescript
const TS_module = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
};


// * Images
const image_module = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
};

// * module config
const modules_config = {
    rules: [
        HTML_module,
        JS_module,
        TS_module,
        image_module,
    ],
};

module.exports = modules_config;