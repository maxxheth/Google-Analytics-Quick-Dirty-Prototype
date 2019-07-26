/* global require, module */

require('babel-register')({
    presets: ['env']
});

module.exports = require('file-watch.js');
