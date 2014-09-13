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
        beforeColor: ['string', true, '#000000'],
        beforeSize: ['number', true, 12],
    },

    derived: {
    }
});