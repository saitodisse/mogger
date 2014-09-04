var _ = require('lodash');

/*
    interceptorsObj:
    {
        globalInterceptors: config.interceptors,
        localInterceptors: options.interceptors,
        info: info
    }
*/


/**
 * localInterceptor are prevalent among globalInterceptor
 * @param  {object} interceptorsObj
 * @return {boolean} false if does not have any interceptors
 */
var checkExistingInterceptors = function(interceptorsObj) {
    var hasLocalInterceptors = !_.isUndefined(interceptorsObj.localInterceptors);
    var hasGlobalInterceptors = !_.isUndefined(interceptorsObj.globalInterceptors);
    return (hasLocalInterceptors || hasGlobalInterceptors);
};


/**
 * localInterceptor are prevalent among globalInterceptor
 * @param  {object} interceptors interceptor to match
 * @param  {string} methodName  name of method
 * @return {depends} interceptor if match or false if not match
 */
var selectInterceptor = function(interceptors, methodName) {
    // interceptors === Array
    if(interceptors && _.isArray(interceptors)){
        for (var i = 0; i < interceptors.length; i++) {
            var interceptorItem = interceptors[i];
            if( matchInterceptor(interceptorItem, methodName) ){
                return interceptorItem;
            }
        }
    }
    // interceptors === single obj
    else if(interceptors && !_.isArray(interceptors)){
        return matchInterceptor(interceptors, methodName);
    }

    // no filter match
    return false;
};
var matchInterceptor = function(interceptor, methodName) {
    var filterRegex = interceptor.filterRegex;
    var matchFilterResult = filterRegex.test(methodName);
    if(matchFilterResult){
        return interceptor;
    }
    return false;
};

var applyInterceptor = function(interceptorsObj, interceptor) {
    return interceptor.callback(interceptorsObj.info);
};


var checkAndApplyInterceptor = function(interceptorsObj) {
    if(!checkExistingInterceptors(interceptorsObj)){
        return interceptorsObj.info.method;
    }

    var interceptor = selectInterceptor(interceptorsObj.localInterceptors,  interceptorsObj.info.method);
    if (interceptor === false) {
        interceptor = selectInterceptor(interceptorsObj.globalInterceptors, interceptorsObj.info.method);
    }

    if (interceptor) {
        return applyInterceptor(interceptorsObj, interceptor);
    }
    else {
        return interceptorsObj.info.method;
    }
};


module.exports = {
    checkExistingInterceptors: checkExistingInterceptors,
    selectInterceptor: selectInterceptor,
    matchInterceptor: matchInterceptor,
    applyInterceptor: applyInterceptor,
    checkAndApplyInterceptor: checkAndApplyInterceptor,
};
