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
                'targetFontSizeDerived',
                'targetColorDerived',
            ],

            fn: function () {
                var fontSize = this.targetFontSizeDerived + 'px';
                return [ 'color: '     + this.targetColorDerived + '; '  +
                         'font-size: ' + fontSize].join();
            }
        },
        targetFontSizeDerived: {
            deps: [
                'targetFontSize',
                'lockFontSize', // when locked with before configs
                'beforeFontSize',
            ],

            fn: function () {
                if(this.lockFontSize){
                    return this.beforeFontSize;
                }
                return this.targetFontSize;
            }
        },
        targetColorDerived: {
            deps: [
                'targetColor',
                'lockColor', // when locked with before configs
                'beforeColor',
            ],

            fn: function () {
                if(this.lockFontSize){
                    return this.beforeColor;
                }
                return this.targetColor;
            }
        },
    }
});