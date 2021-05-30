/* eslint-disable no-undef */
const plugins = require("./../defaults/plugins");
const ESLintPlugin = require('eslint-webpack-plugin');

// * Add development plugins here

plugins.push(new ESLintPlugin({}));

module.exports = plugins;