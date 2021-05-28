/* eslint-disable no-undef */

const modules_config = require("./../defaults/modules.js");

// * Add production modules here
// modules_config.rules.push({
//     test: /\.(scss|css)$/,
//     use: [
//         'style-loader',
//         {
//             loader: 'css-loader',
//             options: {
//                 sourceMap: true,
//                 modules: false,
//             }
//         },
//         {
//             loader: 'postcss-loader',
//             options: {
//                 sourceMap: true,
//             }
//         },
//         {
//             loader: 'sass-loader',
//             options: {
//                 sourceMap: true
//             }
//         }
//     ],
// });

module.exports = modules_config