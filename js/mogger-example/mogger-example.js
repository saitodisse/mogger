/*global define*/
define([
	'Mogger',
	'backbone',
	'mogger-example/surrogateTargetsSource',
	'mogger-example/proxyConsole',
	'jquery'
], function (Mogger, Backbone, surrogateTargetsSource, proxyConsole, Targets, $) {
	'use strict';


	// *****************************************
	// get Mogger Tracer instance
	// *****************************************
	var getTracer = function() {
		return new Mogger.Tracer({
			//-------------------------------------------------------
			// enable / disable
			//-------------------------------------------------------
			enabled: true,

			//-------------------------------------------------------
			// prints a pause when no logs are printed for some time
			//-------------------------------------------------------
			showPause: true,

			//-------------------------------------------------------
			// where is our sources objects?
			// in our surrogateTargetsSource
			//-------------------------------------------------------
			surrogateTargets: surrogateTargetsSource,

			//-------------------------------------------------------
			// default output logger
			//-------------------------------------------------------
			loggerConfig: {
				output: proxyConsole
			},

			//-------------------------------------------------------
			// global config
			//-------------------------------------------------------
			before: {
				//css: 'color: blue',
				size: 15
			},
			targetConfig: {
				//css: 'color: red',
				size: 25
			},

			//-------------------------------------------------------
			// interceptors
			//-------------------------------------------------------
			interceptors: [
			{
				filterRegex: /^(trigger|get|has|\$|setFilter|_on\w+|render)/i,
				callback: function(info) {
					return info.method + '("' + info.args[0] + '")';
				}
			},
			{
				filterRegex: /^(on)/i,
				callback: function(info) {
					return '^ ' + info.method + '("' + info.args[0] + '")';
				}
			},
			{
				filterRegex: /^(listenTo)/i,
				callback: function(info) {
					return 'v ' + info.method + '("' + info.args[1] + '")';
				}
			}]

		});
	};



	// *****************************************
	// print "Mogger Example"
	// *****************************************
	var showTitle = function(logger) {
		makeRainbow(logger);
		logger.log({
			message: '  Mogger Example',
			css: 'font-weight: bold; font-size: 10pt'
		});
		makeRainbow(logger);

	};



	// *****************************************
	// print a rainbow of '#'
	// *****************************************
	var makeRainbow = function(logger) {
		// rainbow
		var fontSize = 'font-size: 11pt';
		logger.log(
			[
				{	message: '#',	css: 'color: #f80c12;' + fontSize },
				{	message: '#',	css: 'color: #ee1100;' + fontSize },
				{	message: '#',	css: 'color: #ff3311;' + fontSize },
				{	message: '#',	css: 'color: #ff4422;' + fontSize },
				{	message: '#',	css: 'color: #ff6644;' + fontSize },
				{	message: '#',	css: 'color: #ff9933;' + fontSize },
				{	message: '#',	css: 'color: #feae2d;' + fontSize },
				{	message: '#',	css: 'color: #ccbb33;' + fontSize },
				{	message: '#',	css: 'color: #d0c310;' + fontSize },
				{	message: '#',	css: 'color: #aacc22;' + fontSize },
				{	message: '#',	css: 'color: #69d025;' + fontSize },
				{	message: '#',	css: 'color: #22ccaa;' + fontSize },
				{	message: '#',	css: 'color: #12bdb9;' + fontSize },
				{	message: '#',	css: 'color: #11aabb;' + fontSize },
				{	message: '#',	css: 'color: #4444dd;' + fontSize },
				{	message: '#',	css: 'color: #3311bb;' + fontSize },
				{	message: '#',	css: 'color: #3b0cbd;' + fontSize },
			]
		);
	};



	// *****************************************
	// set all target objects to trace;
	// will log all function executions with AOP (meld);
	// *****************************************
	var configureTraceObjects = function(tracer) {
		//-------------------------------------------------------
		// Router
		// Backbone.Router.prototype
		//-------------------------------------------------------
		tracer.traceObj({
			before: {	message: 'TodoRouter.p', css: 'color: #A42' },
			target: 'TodoRouter.prototype', targetConfig: {	css: 'color: #A42' }
		});


		//---------------------------------------------------------------------------
		// AppView
		//---------------------------------------------------------------------------
		tracer.traceObj({
			before: {	message: 'AppView.p', css: 'color: #55A' },
			target: 'AppView.prototype', targetConfig: {	css: 'color: #55A' }
		});


		//---------------------------------------------------------------------------
		// TodoView
		//---------------------------------------------------------------------------
		tracer.traceObj({
			before: {	message: 'TodoView', css: 'color: #2A2' },
			target: 'TodoView.prototype', targetConfig: {	css: 'color: #2A2' }
		});
		tracer.traceObj({
			before: {	message: ' View', css: 'color: #2A2' },
			target: 'Backbone.View.prototype', targetConfig: {	css: 'color: #2A2' }
		});


		//---------------------------------------------------------------------------
		// Todos
		// Backbone.Collection.prototype
		// Todos.prototype
		//---------------------------------------------------------------------------
		tracer.traceObj({
			before: {	message: '  Todos', css: 'color: #075' },
			target: 'Todos', targetConfig: {	css: 'color: #075' }
		});


		//---------------------------------------------------------------------------
		// Todo
		// Backbone.Model.prototype
		//---------------------------------------------------------------------------
		tracer.traceObj({
			before: {	message: '   Todo.p', css: 'color: #249' },
			target: 'Todo.prototype', targetConfig: {	css: 'color: #249' }
		});
		tracer.traceObj({
			before: {	message: '   Todo', css: 'color: #249' },
			target: 'Todo', targetConfig: {	css: 'color: #249' }
		});
	};







	// *****************************************

	// main()

	// *****************************************
	return function() {

		//-------------------------------------------------------
		// this console can output with simple html
		// to a <pre> element. For now, this is disabled;
		//-------------------------------------------------------
		proxyConsole.htmlOutput = undefined;

		//-------------------------------------------------------
		var tracer = getTracer();

		//-------------------------------------------------------
		showTitle(tracer.logger);

		//-------------------------------------------------------
		configureTraceObjects(tracer);

		//-------------------------------------------------------
		this.tracer = tracer;
	};
});

