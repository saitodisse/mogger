/*global define*/
define([
	'backbone',
	'routers/router',
	'views/app',
	'collections/todos',
	'models/todo',
	'views/todos'
],function (
	Backbone,
	TodoRouter,
	AppView,
	Todos,
	Todo,
	TodoView)
 {
	'use strict';

	return {
		'TodoRouter.prototype': TodoRouter.prototype,
		'AppView.prototype': AppView.prototype,
		'TodoView.prototype': TodoView.prototype,
		'Backbone.View.prototype': Backbone.View.prototype,
		'Todos': Todos,
		'Todo.prototype': Todo.prototype,
		'Todo': Todo
	};
});