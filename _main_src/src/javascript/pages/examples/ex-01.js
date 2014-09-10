'use strict';

var BasePage = require('../base-page');
var configuration = require('../../configuration');
var exampleSource = require('./ex-01-src');
/*

file:     ex-01.js
class:    Example01
instance: example01

*/

module.exports = BasePage.extend({
    pageTitle: 'Example 01',
    template: require('../../templates/examples/ex-01')(configuration),
    initialize: function() {
    	exampleSource();
    }
});
