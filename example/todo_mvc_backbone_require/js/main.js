/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		text: '../bower_components/requirejs-text/text',

		Mogger: '../bower_components/mogger/src/mogger'
	}
});

require([
	'backbone',
	'views/app',
	'routers/router',
	'Mogger'
], function (Backbone, AppView, Workspace, Mogger) {
	
	var tracer = new Mogger.Tracer();
	tracer.traceObj(Backbone.View.prototype);

	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	new Workspace();
	Backbone.history.start();


	// Initialize the application view
	new AppView();
});
