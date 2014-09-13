'use strict';

var BasePage = require('./base-page');
var configuration = require('../configuration');
var StyleGeneratorExecute = require('../data/style-generator-execute');
/*

file:     style-generator-page.js
class:    StyleGenaratorPage
instance: styleGenaratorPage

*/

module.exports = BasePage.extend({
    pageTitle: 'style generator',

    template: require('../templates/style-generator')(configuration),

    events:{
    	'input  [data-hook = font-size-range]'         : 'setBeforeSize',
    	'change [data-hook = font-size-text]'          : 'setBeforeSize',

    	'input  [data-hook = before-font-size-range]'  : 'setBeforeFontSize',
    	'change [data-hook = before-font-size-text]'   : 'setBeforeFontSize',

    	'change [data-hook = before-color-picker]'     : 'setBeforeColor',
    	'change [data-hook = before-color-picker-text]': 'setBeforeColor',

    	'change [data-hook = target-color-picker]'     : 'setTargetColor',
    	'change [data-hook = target-color-picker-text]': 'setTargetColor',
    },

    render: function () {
        this.renderWithTemplate(this);

		// listen to model
        this.listenTo(this.model, 'change:beforeSize', this.beforeSizeChanged);
        this.listenTo(this.model, 'change:beforeFontSize', this.beforeFontSizeChanged);
        this.listenTo(this.model, 'change:beforeColor', this.beforeColorChanged);
        this.listenTo(this.model, 'change:targetColor', this.targetColorChanged);

        this.listenTo(this.model, 'change', function(model) {
    		this.cleanAndShowLogs(model);
        });

        this.initializeLogs();

		// initialize from model
		this.beforeSizeChanged(this.model);
		this.beforeFontSizeChanged(this.model);
		this.beforeColorChanged(this.model);
		this.targetColorChanged(this.model);

        return this;
    },

	// set model state
	setBeforeSize: function(ev) {
		this.model.beforeSize = Number(ev.target.value);
	},

	setBeforeFontSize: function(ev) {
		this.model.beforeFontSize = Number(ev.target.value);
	},

	setBeforeColor: function(ev) {
		this.model.beforeColor = ev.target.value;
	},

	setTargetColor: function(ev) {
		this.model.targetColor = ev.target.value;
	},

	// get model state
    beforeSizeChanged: function(model) {
    	this.queryByHook('font-size-range').value = model.beforeSize;
    	this.queryByHook('font-size-text').value = model.beforeSize;
    },
    beforeFontSizeChanged: function(model) {
    	this.queryByHook('before-font-size-range').value = model.beforeFontSize;
    	this.queryByHook('before-font-size-text').value = model.beforeFontSize;
    },
    beforeColorChanged: function(model) {
    	this.queryByHook('before-color-picker').value = model.beforeColor;
    	this.queryByHook('before-color-picker-text').value = model.beforeColor;
    },
    targetColorChanged: function(model) {
    	this.queryByHook('target-color-picker').value = model.targetColor;
    	this.queryByHook('target-color-picker-text').value = model.targetColor;
    },



    initializeLogs: function() {
        this.styleGeneratorExecute = new StyleGeneratorExecute({
        	model: this.model
        });
		this.styleGeneratorExecute.setModel(this.model);
        this.styleGeneratorExecute.createMogger();
        this.cleanAndShowLogs(this.model);
    },

    cleanAndShowLogs: function(model) {
		this.styleGeneratorExecute.setModel(model);
		this.styleGeneratorExecute.clearConsole();
		this.styleGeneratorExecute.createMogger();
		this.styleGeneratorExecute.callSources();
    },


});
