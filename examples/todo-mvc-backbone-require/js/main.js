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
		},
		Mogger:{
			deps: [
				'colorful-logger',
				'lodash',
				'meld'
			]
		}
	},
	paths: {
		jquery: 'vendor/jquery',
		underscore: 'vendor/underscore',
		backbone: 'vendor/backbone',
		backboneLocalstorage: 'vendor/backbone.localStorage',
		text: 'vendor/text',

		Mogger: 'vendor/mogger',
		meld: 'vendor/meld',
		traceMeld: 'vendor/trace',
		lodash: 'vendor/lodash',
		'colorful-logger': 'vendor/colorful-logger'
	}
});

require([
	'backbone',
	'views/app',
	'routers/router',
	'mogger-example/mogger-example'
], function (Backbone, AppView, Workspace, MoggerExample) {

	new MoggerExample();

	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	new Workspace();
	Backbone.history.start();


	// Initialize the application view
	new AppView();
});
