'use strict';

/*

file:     all-examples.js
class:    AllExamples
instance: allExamples

*/

module.exports = function() {
	return [
		{
			id: 'ex-01',
			title: 'Hello World',
			subTitle: 'trace a simple object',
			script: require('../pages/examples/ex-01-src')
		},
		{
			id: 'ex-02',
			title: 'Titles',
			subTitle: 'you can define titles',
			script: require('../pages/examples/ex-02-src')
		},
		{
			id: 'ex-03',
			title: 'colored logs',
			subTitle: 'log can be colored',
			script: require('../pages/examples/ex-03-src')
		},
		{
			id: 'ex-04',
			title: 'others css',
			subTitle: 'change other css properties',
			script: require('../pages/examples/ex-04-src')
		},
		{
			id: 'ex-05',
			title: 'paddind size',
			subTitle: 'everything can be correctly indented',
			script: require('../pages/examples/ex-05-src')
		},
		{
			id: 'ex-06',
			title: 'title vs target css',
			subTitle: 'the title and the target do not require the same CSS',
			script: require('../pages/examples/ex-06-src')
		},
	];
};