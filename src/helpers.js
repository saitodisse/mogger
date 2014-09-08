var _ = require('lodash');

var merge = function(object, sources) {
    return _.merge(object, sources);
};

var checkRelevantArguments = function(args) {


  if(args.length === 0){
    return false;
  }

  for (var i = 0; i < args.length; i++) {
    var argument = args[i];

    var isString = _.isString(argument) && argument.length > 0;
    var isNumber = _.isNumber(argument);
    var isBoolean = _.isBoolean(argument);
    var isArray = _.isArray(argument) && argument.length > 0;
    var isEmpty = _.isEmpty(argument);
    var isObject = _.isObject(argument);

    var hasValues = isString || isNumber || isBoolean || isArray || (isObject && !isEmpty);
    if(hasValues){
      return true;
    }
  }
  return false;
};

module.exports = {
    merge: merge,
    checkRelevantArguments: checkRelevantArguments,
};
