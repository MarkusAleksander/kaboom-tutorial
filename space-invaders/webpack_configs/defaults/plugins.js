/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var webpack = require("webpack");

const plugins = [
    new CleanWebpackPlugin({
    }),
    new HtmlWebpackPlugin({
        // * injected HTML title
        title: 'Compiled Assets',
        // * name of the HTML template to inject into
        template: "template.html",
    }),
    // new ESLintPlugin({}),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
        // e.g. Output each progress message directly to the console:
        console.info(percentage, message, ...args);
    }),
];

// module.exports = plugin_config;

module.exports = plugins;