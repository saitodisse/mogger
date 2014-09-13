'use strict';

var BasePage = require('./base-page');
var configuration = require('../configuration');

/*

file:     style-generator-page.js
class:    StyleGenaratorPage
instance: styleGenaratorPage

*/

module.exports = BasePage.extend({
    pageTitle: 'style generator',

    template: require('../templates/style-generator')(configuration),

    bindings:{
        'model.beforeSize': [
	        {
	            type: 'attribute',
	            name: 'value',
	            hook: 'font-size-range'
	        },
	        {
	            type: 'attribute',
	            name: 'value',
	            hook: 'font-size-text'
	        },
        ],
        'model.beforeColor': [
	        {
	            type: 'attribute',
	            name: 'value',
	            hook: 'color-picker'
	        },
	        {
	            type: 'attribute',
	            name: 'value',
	            hook: 'color-picker-text'
	        },
        ],
    },

    events:{
    	'change [data-hook=font-size-range]': 'sizeChanged',
    	'change [data-hook=font-size-text]': 'sizeChanged',
    	'change [data-hook=color-picker]': 'colorChanged',
    	'change [data-hook=color-picker-text]': 'colorChanged',
    },

    render: function () {
        this.renderWithTemplate(this);

        return this;
    },

    sizeChanged: function(ele) {
    	console.log(Number(ele.target.value));
    	this.model.beforeSize = Number(ele.target.value);
    },
    colorChanged: function(ele) {
    	console.log(ele.target.value);
    	this.model.beforeColor = ele.target.value;
    },
});
