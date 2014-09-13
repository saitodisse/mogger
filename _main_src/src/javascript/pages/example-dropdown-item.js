'use strict';

var BasePage = require('./base-page');
var configuration = require('../configuration');

/*

file:     example-dropdown-item.js
class:    ExampleDropdownItem
instance: exampleDropdownItem

*/

module.exports = BasePage.extend({
    template: require('../templates/example-dropdown-item')(configuration),

    bindings: {
        'model.exampleTitle': {
            type: 'text',
            hook: 'itemLink'
        },

        'model.subTitle': {
            type: 'attribute',
            name: 'title',
            hook: 'itemLink'
        },

        'model.hashUrl': {
            type: 'attribute',
            name: 'href',
            hook: 'itemLink'
        },

    },

});
