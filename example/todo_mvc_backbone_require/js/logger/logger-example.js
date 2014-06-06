/*global define*/
define([
	'Mogger',
	'backbone',
	'routers/router',
	'views/app',
	'collections/todos',
	'models/todo',
	'views/todos'
], function (Mogger, Backbone, TodoRouter, AppView, Todos, Todo, TodoView) {
	'use strict';

	var tracer = new Mogger.Tracer({
		showPause: true
	});

	showTitle(tracer.logger);

	// each traced object
	var OBJECT_SIZE = 15;
	var FUNCTION_SIZE = 25;

	//////////////////////
	// Router
	//////////////////////
	tracer.traceObj({
		before: {	message: 'Router', css: 'color: #A42',	size: OBJECT_SIZE },
		target: Backbone.Router.prototype, targetConfig: {	css: 'color: #A42',	size: FUNCTION_SIZE },
		showArguments: true
	});
	tracer.traceObj({
		before: {	message: 'TodoRouter.p', css: 'color: #A42',	size: OBJECT_SIZE },
		target: TodoRouter.prototype, targetConfig: {	css: 'color: #A42',	size: FUNCTION_SIZE },
		showArguments: true
	});


	//////////////////////
	// AppView
	//////////////////////
	tracer.traceObj({
		before: {	message: 'AppView.p', css: 'color: #55A',	size: OBJECT_SIZE },
		target: AppView.prototype, targetConfig: {	css: 'color: #55A',	size: FUNCTION_SIZE },
		showArguments: true
	});


	//////////////////////
	// TodoView
	//////////////////////
	tracer.traceObj({
		before: {	message: 'TodoView', css: 'color: #2A2',	size: OBJECT_SIZE },
		target: TodoView.prototype, targetConfig: {	css: 'color: #2A2',	size: FUNCTION_SIZE },
		showArguments: true
	});
	tracer.traceObj({
		before: {	message: ' View', css: 'color: #2A2',	size: OBJECT_SIZE },
		target: Backbone.View.prototype, targetConfig: {	css: 'color: #2A2',	size: FUNCTION_SIZE },
		showArguments: true
	});


	//////////////////////
	// Todos
	//////////////////////
	tracer.traceObj({
		before: {	message: '  Collection', css: 'color: #075',	size: OBJECT_SIZE },
		target: Backbone.Collection.prototype, targetConfig: {	css: 'color: #075',	size: FUNCTION_SIZE },
		showArguments: true
	});
	tracer.traceObj({
		before: {	message: '  Todos.p', css: 'color: #075',	size: OBJECT_SIZE },
		target: Todos.prototype, targetConfig: {	css: 'color: #075',	size: FUNCTION_SIZE },
		showArguments: true
	});
	tracer.traceObj({
		before: {	message: '  Todos', css: 'color: #075',	size: OBJECT_SIZE },
		target: Todos, targetConfig: {	css: 'color: #075',	size: FUNCTION_SIZE },
		showArguments: true
	});


	//////////////////////
	// Todo
	//////////////////////
	tracer.traceObj({
		before: {	message: '   Model', css: 'color: #249',	size: OBJECT_SIZE },
		target: Backbone.Model.prototype, targetConfig: {	css: 'color: #249',	size: FUNCTION_SIZE },
		showArguments: true
	});
	tracer.traceObj({
		before: {	message: '   Todo.p', css: 'color: #249',	size: OBJECT_SIZE },
		target: Todo.prototype, targetConfig: {	css: 'color: #249',	size: FUNCTION_SIZE },
		showArguments: true
	});
	tracer.traceObj({
		before: {	message: '   Todo', css: 'color: #249',	size: OBJECT_SIZE },
		target: Todo, targetConfig: {	css: 'color: #249',	size: FUNCTION_SIZE },
		showArguments: true
	});

	return function() {};
});


var showTitle = function(logger) {
	makeRainbow(logger);
	logger.log({
		message: '  Mogger Example',
		css: 'font-weight: bold; font-size: 10pt'
	});
	makeRainbow(logger);

};

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