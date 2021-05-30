/* eslint-disable no-undef */
// * Standard config - development

// * Get the path module
const path = require('path');

// * set mode
const mode = "development";

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
        // * name of fileout
        filename: global.output.filename,
        // * resolve where output dir is relative to this config
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
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
};