'use strict';

var BasePage = require('../base-page');
var configuration = require('../../configuration');

/*

file:     home-page.js
class:    HomePage
instance: homePage

*/

module.exports = BasePage.extend({
    pageTitle: 'Example 01',
    template: require('../../templates/examples/ex-01')(configuration)
});
