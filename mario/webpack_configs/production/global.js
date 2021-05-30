/* eslint-disable no-undef */

const global = require("./../defaults/global.js");

// * Any production based changes to global here

global.output.dir = 'dist';
global.output.filename = '[name].[contenthash].min.js'

module.exports = global;