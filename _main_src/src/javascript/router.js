'use strict';

var Router = require('ampersand-router');
var HomePage = require('./pages/home-page');
var Example01 = require('./pages/examples/ex-01');

module.exports = Router.extend({
    routes: {
        ''            : 'load_home',
        'ex-01'      : 'example_01',
        '(*path)'           : 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    load_home: function () {
        this.trigger('page', new HomePage());
    },

    example_01: function () {
        this.trigger('page', new Example01());
    },

    catchAll: function () {
        console.log(arguments)
        this.redirectTo('');
    }
});
