'use strict';

var BasePage = require('./base-page');
var configuration = require('../configuration');

/*

file:     style-generator-page.js
class:    StyleGenaratorPage
instance: styleGenaratorPage

*/

module.exports = BasePage.extend({
    pageTitle: 'style',
    template: require('../templates/style-generator')(configuration),
    bindings:{
        'model.beforeColor': {
            type: 'attribute',
            name: 'value',
            hook: 'color-picker'
        },
        'model.beforeSize': {
            type: 'attribute',
            name: 'value',
            hook: 'font-size'
        },
    }
});
