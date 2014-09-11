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
            role: 'title'
        },

        'model.subTitle': {
            type: 'text',
            role: 'subTitle'
        },

        'model.description': {
            type: 'text',
            role: 'description'
        },

        'model.sourceExampleUrl': {
            type: 'attribute',
            name: 'href',
            role: 'sourceExampleUrl'
        },

        'model.id': {
            type: 'text',
            role: 'button-example-title'
        },
    },

    events: {
        'click [role="button-example-title"]': 'runExampleAgain',
        'click [role="button-next"]': 'nextExample',
        'click [role="button-previous"]': 'previousExample'
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
