'use strict';
var Model = require('ampersand-model');

/*

file:     example-model.js
class:    ExampleModel
instance: exampleModel

*/

module.exports = Model.extend({

    props: {
        id: 'string',
        title: 'string',
        subTitle: 'string',
        description: 'string',
        script: 'function'
    },

    derived: {
        sourceExampleUrl: {
            deps: ['id'],
            fn: function () {
                return 'https://github.com/saitodisse/mogger/blob/gh-pages/_main_src/src/javascript/pages/examples/' + this.id + '-src.js';
            }
        },
        hashUrl: {
            deps: ['id'],
            fn: function () {
                return '#' + this.id;
            }
        },
    }
});