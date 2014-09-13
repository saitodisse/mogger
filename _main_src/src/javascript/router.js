'use strict';

var Router = require('ampersand-router');
var HomePage = require('./pages/home-page');
var ScreenshotsPage = require('./pages/screenshots-page');
var StyleGeneratorPage = require('./pages/style-generator-page');

module.exports = Router.extend({
    routes: {
        ''                : 'load_home',
        'screenshots'     : 'load_screenshots',
        'style-generator' : 'load_styleGenerator',
        'ex-(*path)'      : 'examples',
        '(*path)'         : 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    load_home: function () {
        this.trigger('page', new HomePage());
    },

    load_screenshots: function () {
        this.trigger('page', new ScreenshotsPage());
    },

    load_styleGenerator: function () {
        var StyleGeneratorModel = require('./models/style-generator-model');
        var styleGeneratorModel = new StyleGeneratorModel();
        this.trigger('page', new StyleGeneratorPage({
            model: styleGeneratorModel
        }));
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
