/* eslint-disable no-undef */
// * Standard config - production

// * Get the path module
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

// * set mode
const mode = "production";

// * global config
const global = require(`./webpack_configs/${mode}/global.js`);

// * module config
const modules_config = require(`./webpack_configs/${mode}/modules.js`);

// * plugin configs
const plugins = require(`./webpack_configs/${mode}/plugins.js`);

// *** FILE *** //

// * entry/output file config
const file_config = {
    entry: `${global.entry.dir}${global.entry.filename}`,
    output: {
        filename: global.output.filename,
        path: path.resolve(__dirname, global.output.dir),
    },
};

// *** EXPORT ***//
module.exports = {
    // * where is the entry point?
    entry: file_config.entry,
    output: file_config.output,
    plugins: plugins,
    module: modules_config,
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: mode,
    target: "es5",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(
            { extractComments: false }
        )],

    },
};