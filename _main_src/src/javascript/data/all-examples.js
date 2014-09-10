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
	];
};