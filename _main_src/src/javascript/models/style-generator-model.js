'use strict';
var Model = require('ampersand-model');

/*

file:     style-generator-model.js
class:    StyleGeneratorModel
instance: styleGeneratorModel

*/

module.exports = Model.extend({

    props: {
        id: 'string',
        beforeSize: ['number', false, 14],
        beforeColor: ['string', false, '#000000'],
        targetColor: ['string', false, '#000000'],
    },

    derived: {
        beforeCss: {
            deps: ['beforeSize', 'beforeColor'],
            fn: function () {
                return [ 'color:' + this.beforeColor +
                		 ''].join();
            }
        },
        targetCss: {
            deps: ['targetColor'],
            fn: function () {
                return [ 'color:' + this.targetColor +
                		 ''].join();
            }
        },
    }
});