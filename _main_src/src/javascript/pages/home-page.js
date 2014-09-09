'use strict';

var BasePage = require('./base-page');

/*

file:     home-page.js
class:    HomePage
instance: homePage

*/

module.exports = BasePage.extend({
    pageTitle: 'home',
    template: require('../templates/home')
});
