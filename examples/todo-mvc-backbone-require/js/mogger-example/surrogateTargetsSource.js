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

	return [
		{
			title: 'TodoRouter.prototype',
			target: TodoRouter.prototype
		},
		{
			title: 'AppView.prototype',
			target: AppView.prototype
		},
		{
			title: 'TodoView.prototype',
			target: TodoView.prototype
		},
		{
			title: 'Backbone.View.prototype',
			target: Backbone.View.prototype
		},
		{
			title: 'Todos',
			target: Todos
		},
		{
			title: 'Todo.prototype',
			target: Todo.prototype
		},
		{
			title: 'Todo',
			target: Todo
		},
	];
});