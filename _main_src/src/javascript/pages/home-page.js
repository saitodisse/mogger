'use strict';

var BasePage = require('./base-page');
var $ = require('jquery');
var configuration = require('../configuration');

/*

file:     home-page.js
class:    HomePage
instance: homePage

*/

module.exports = BasePage.extend({
    pageTitle: 'home',
    template: require('../templates/home')(configuration),

    render: function () {
    this.renderWithTemplate(this);

    $(function() {
        // console.log($(this.getByRole('color-picker')));
    });

    return this;
},

});
