'use strict';

var BasePage = require('./base-page');
var configuration = require('../configuration');

/*

file:     screenshots-page.js
class:    ScreenshotsPage
instance: screenshotsPage

*/

module.exports = BasePage.extend({
    pageTitle: 'screenshots',
    template: require('../templates/screenshots')(configuration),
});
