'use strict';
var Model = require('ampersand-model');

/*

file:     example-model.js
class:    ExampleModel
instance: exampleModel

*/

////
// PersonModel
module.exports = Model.extend({
    //urlRoot: '/api/persons',

    // initialize: function () {
    //     this.fetch();
    // },

    // Aqui declaramos explicitamente as propriedades
    // serve como um documentação
    props: {
        id: 'string',
        title: 'string',
        subTitle: 'string',
        script: 'function'
    },

    derived: {
        sourceExampleUrl: {
            deps: ['id'],
            fn: function () {
                return 'https://github.com/saitodisse/mogger/blob/gh-pages/_main_src/src/javascript/pages/examples/' + this.id + '-src.js';
            }
        }
    }
});