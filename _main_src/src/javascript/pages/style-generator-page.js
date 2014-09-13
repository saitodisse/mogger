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

    // bindings:{
    //     // 'model.beforeSize': [
	   //     //  {
	   //     //      type: 'attribute',
	   //     //      name: 'value',
	   //     //      hook: 'font-size-range'
	   //     //  },
	   //     //  {
	   //     //      type: 'attribute',
	   //     //      name: 'value',
	   //     //      hook: 'font-size-text'
	   //     //  },
    //     // ],
    //     // 'model.beforeColor': [
	   //     //  {
	   //     //      type: 'attribute',
	   //     //      name: 'value',
	   //     //      hook: 'before-color-picker'
	   //     //  },
	   //     //  {
	   //     //      type: 'attribute',
	   //     //      name: 'value',
	   //     //      hook: 'before-color-picker-text'
	   //     //  },
    //     // ],
    //     // 'model.targetColor': [
	   //     //  {
	   //     //      type: 'attribute',
	   //     //      name: 'value',
	   //     //      hook: 'target-color-picker'
	   //     //  },
	   //     //  {
	   //     //      type: 'attribute',
	   //     //      name: 'value',
	   //     //      hook: 'target-color-picker-text'
	   //     //  },
    //     // ],
    // },

    events:{
    	'input  [data-hook=font-size-range]'         : 'setBeforeSize',
    	'change [data-hook=font-size-text]'          : 'setBeforeSize',
    	'change [data-hook=before-color-picker]'     : 'setBeforeColor',
    	'change [data-hook=before-color-picker-text]': 'setBeforeColor',
    	'change [data-hook=target-color-picker]'     : 'setTargetColor',
    	'change [data-hook=target-color-picker-text]': 'setTargetColor',
    },

    render: function () {
        this.renderWithTemplate(this);

		// initialize from model
		this.beforeSizeChanged(this.model);
		this.beforeColorChanged(this.model);
		this.targetColorChanged(this.model);

		// listen to model
        this.listenTo(this.model, 'change:beforeSize', this.beforeSizeChanged);
        this.listenTo(this.model, 'change:beforeColor', this.beforeColorChanged);
        this.listenTo(this.model, 'change:targetColor', this.targetColorChanged);

        return this;
    },

	setBeforeSize: function(ev) {
		this.model.beforeSize = Number(ev.target.value);
	},

	setBeforeColor: function(ev) {
		this.model.beforeColor = ev.target.value;
	},

	setTargetColor: function(ev) {
		this.model.targetColor = ev.target.value;
	},



    beforeSizeChanged: function(model) {
    	this.queryByHook('font-size-range').value = model.beforeSize;
    	this.queryByHook('font-size-text').value = model.beforeSize;
    },
    beforeColorChanged: function(model) {
    	this.queryByHook('before-color-picker').value = model.beforeColor;
    	this.queryByHook('before-color-picker-text').value = model.beforeColor;
    },
    targetColorChanged: function(model) {
    	this.queryByHook('target-color-picker').value = model.targetColor;
    	this.queryByHook('target-color-picker-text').value = model.targetColor;
    },
});
