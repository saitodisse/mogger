'use strict';

var Router = require('ampersand-router');
var HomePage = require('./pages/home-page');

module.exports = Router.extend({
    routes: {
        ''                  : 'load_home',
        '(*path)'           : 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    load_home: function () {
        this.trigger('page', new HomePage());
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
