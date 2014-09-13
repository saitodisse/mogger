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
        beforeFontSize: ['number', false, 12],
        targetColor: ['string', false, '#000000'],
    },

    derived: {
        beforeCss: {
            deps: ['beforeSize', 'beforeFontSize', 'beforeColor'],
            fn: function () {
                return [ 'color: '     + this.beforeColor + '; '  +
                		 'font-size: ' + this.beforeFontSize + 'px'].join();
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