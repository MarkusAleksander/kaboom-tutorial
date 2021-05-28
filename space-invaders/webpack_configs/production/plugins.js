/* eslint-disable no-undef */
const plugins = require("./../defaults/plugins");
var fs = require("fs");
var webpack = require("webpack");

// * Add production plugins here

plugins.push(
    new webpack.BannerPlugin({
        banner: fs.readFileSync('./banner', 'utf8'),
        entryOnly: true
    })
);

module.exports = plugins;