'use strict';

var BasePage = require('./base-page');
var configuration = require('../configuration');
var shortcuts = require('../shortcuts');
var $ = require('jquery');

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
            hook: 'title'
        },

        'model.subTitle': {
            type: 'text',
            hook: 'subTitle'
        },

        'model.description': {
            type: 'text',
            hook: 'description'
        },

        'model.sourceExampleUrl': {
            type: 'attribute',
            name: 'href',
            hook: 'sourceExampleUrl'
        },

        'model.id': {
            type: 'text',
            hook: 'button-example-title'
        },
    },

    events: {
        'click [data-hook="button-example-title"]': 'runExampleAgain',
        'click [data-hook="button-next"]': 'nextExample',
        'click [data-hook="button-previous"]': 'previousExample'
    },

    runExampleAgain: function() {
        this.model.script();
    },

    previousExample: function() {
        shortcuts('previous');
    },

    nextExample: function() {
        shortcuts('next');
    },

    render: function () {
        this.renderWithTemplate(this);

        // run example script
        this.model.script();
        this.pageTitle = this.model.title;

        $(function() {
            // from app.js
            window.app.devTools.verifyConsole();
        });

        return this;
    },

});
