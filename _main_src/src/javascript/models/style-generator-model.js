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
        targetFontSize: ['number', false, 12],
        lockColor: ['boolean', false, true],
        lockFontSize: ['boolean', false, true],
    },

    derived: {
        beforeCss: {
            deps: ['beforeSize', 'beforeColor', 'beforeFontSize'],
            fn: function () {
                return [ 'color: '     + this.beforeColor + '; '  +
                		 'font-size: ' + this.beforeFontSize + 'px'].join();
            }
        },
        targetCss: {
            deps: [
                'targetColor',
                'targetFontSize',


                'lockFontSize', // when locked with before configs
                'lockColor',
                'beforeColor',
                'beforeFontSize',
            ],

            fn: function () {

                if(this.lockColor){
                    this.targetColor = this.beforeColor;
                }

                if(this.lockFontSize){
                    this.targetFontSize = this.beforeFontSize;
                }
                var fontSize = this.targetFontSize + 'px';

                return [ 'color: '     + this.targetColor + '; '  +
                		 'font-size: ' + fontSize].join();
            }
        },
    }
});