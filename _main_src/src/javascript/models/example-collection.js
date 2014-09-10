'use strict';

/*

file:     example-collection.js
class:    ExampleCollection
instance: exampleCollection

*/

var Collection = require('ampersand-collection');
var ExampleModel = require('./example-model');

module.exports = Collection.extend({
    //url: '/api/people',
    model: ExampleModel
});