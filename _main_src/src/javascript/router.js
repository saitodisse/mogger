'use strict';

var Router = require('ampersand-router');
var HomePage = require('./pages/home-page');
var Screenshots = require('./pages/screenshots');

module.exports = Router.extend({
    routes: {
        ''            : 'load_home',
        'screenshots' : 'load_screenshots',
        'ex-(*path)'  : 'examples',
        '(*path)'     : 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    load_home: function () {
        this.trigger('page', new HomePage());
    },

    load_screenshots: function () {
        this.trigger('page', new Screenshots());
    },


    examples: function () {
        /*
        document.location.hash => '#ex-01'
        exampleNumber          => 1
        exampleString          => '01'
         */
        var exampleNumber = Number(/ex-(\d+)/.exec(document.location.hash)[1]);
        var exampleString = exampleNumber + '';
        if(exampleString.length === 1){
            exampleString = '0' + exampleString;
        }

        var ExamplesPage = require('./pages/examples-page');

        var exampleModel = window.app.exampleCollection.at(exampleNumber-1);

        this.trigger('page', new ExamplesPage({
            model: exampleModel
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
