/*global define*/
define(['lodash'], function (_) {
	'use strict';

	var slice = Array.prototype.slice;
	var localConsole = console;

	return {

		log: function() {
			var args = slice.call(arguments);

			// send to build-in browser console
			localConsole.log.apply(localConsole, args);

			// //send to html output
			if(this.htmlOutput && _.isString(args[0])){
				this.htmlOutput.append(args[0].replace(/\%c/gi, ''));
				this.htmlOutput.append('\n');
			}
			// var no_CSS_message = args[0].toString().replace(/\%c/gi, '');
			// if(_.isFunction(args[0])){
			// 	no_CSS_message = 'FUNCtion';
			// }
			// this.htmlOutput.append(no_CSS_message);
			// this.htmlOutput.append('\n');
		},

		info: function() {

		},

		warn: function() {

		},

		error: function() {

		},

		trace: function() {

		},

		dir: function() {

		},

		group: function() {

		},

		groupCollapsed: function() {
			var args = slice.call(arguments);
			localConsole.groupCollapsed.apply(localConsole, args);

			//send to html output
			var no_CSS_message;
			if(typeof args[0] !== 'undefined'){
				no_CSS_message = args[0].toString().replace(/\%c/gi, '');
			}
			this.htmlOutput && this.htmlOutput.append('<div class="colapse">' + no_CSS_message + '</div>');
		},

		groupEnd: function() {
			var args = slice.call(arguments);
			localConsole.groupEnd.apply(localConsole, args);
		},

		time: function() {

		},

		timeEnd: function() {

		},

		profile: function() {

		},

		profileEnd: function() {

		},

		dirxml: function() {

		},

		assert: function() {

		},

		count: function() {

		},

		markTimeline: function() {

		},

		timeStamp: function() {

		},

		clear: function() {

		}
	};
});