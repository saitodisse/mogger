'use strict';

var Router = require('ampersand-router');
var HomePage = require('./pages/home-page');

module.exports = Router.extend({
    routes: {
        ''            : 'load_home',
        'ex-(*path)'  : 'example_01',
        '(*path)'     : 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    load_home: function () {
        this.trigger('page', new HomePage());
    },

    example_01: function () {

        /*

        hash = 'ex-01'
        exampleNumber = 1
        exampleString = '01'

         */
        var exampleNumber = Number(/ex-(\d+)/.exec(document.location.hash)[1]);
        var exampleString = exampleNumber + '';
        if(exampleString.length === 1){
            exampleString = '0' + exampleString;
        }

        var ExamplesPage = require('./pages/examples-page');

        var data = require('./data/all-examples')();
        var ExampleCollection = require('./models/example-collection');
        var exampleCollection = new ExampleCollection(data);

        var exampleModel = exampleCollection.at(exampleNumber-1);

        window.app.exampleCollection = exampleCollection;
        window.app.examplesModel = exampleModel;

        this.trigger('page', new ExamplesPage({
            model: exampleModel
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
