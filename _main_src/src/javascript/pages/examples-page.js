'use strict';

var BasePage = require('./base-page');
var configuration = require('../configuration');

/*

file:     examples-page.js
class:    ExamplesPage
instance: examplesPage

*/

module.exports = BasePage.extend({
    template: require('../templates/examples')(configuration),

    bindings: {
        'model.title': {
            type: 'text',
            role: 'title'
        },

        'model.subTitle': {
            type: 'text',
            role: 'subTitle'
        },

        'model.sourceExampleUrl': {
            type: 'attribute',
            name: 'href',
            role: 'sourceExampleUrl'
        },
    },

    render: function () {
        this.renderWithTemplate(this);

        //run example script
        this.model.script();
        this.pageTitle = this.model.title;

        return this;
    },

});
