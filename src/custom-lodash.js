var find = require('lodash.find');
var isarray = require('lodash.isarray');
var isboolean = require('lodash.isboolean');
var isempty = require('lodash.isempty');
var isnumber = require('lodash.isnumber');
var isobject = require('lodash.isobject');
var isstring = require('lodash.isstring');
var isundefined = require('lodash.isundefined');
var merge = require('lodash.merge');

module.exports = {
	find : find,
	isArray: isarray,
	isBoolean: isboolean,
	isEmpty: isempty,
	isNumber: isnumber,
	isObject: isobject,
	isString: isstring,
	isUndefined: isundefined,
	merge: merge,
};