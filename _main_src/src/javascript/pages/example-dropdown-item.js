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
        'model.title': {
            type: 'text',
            role: 'itemLink'
        },

        'model.subTitle': {
            type: 'attribute',
            name: 'title',
            role: 'subTitle'
        },

        'model.hashUrl': {
            type: 'attribute',
            name: 'href',
            role: 'itemLink'
        },

    },

});
