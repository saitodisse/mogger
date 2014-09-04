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

var matchInterceptor = function(interceptor, methodName) {
    var filterRegex = interceptor.filterRegex;
    var matchFilterResult = filterRegex.test(methodName);
    if(matchFilterResult){
        return interceptor;
    }
    return false;
};

var selectInterceptor = function(interceptor, methodName) {
    // interceptor Array
    if(interceptor && _.isArray(interceptor)){
        for (var i = 0; i < interceptor.length; i++) {
            var interceptorItem = interceptor[i];
            if( matchInterceptor(interceptorItem, methodName) ){
                return interceptorItem;
            }
        }
    }
    // interceptor single obj
    else if(interceptor && !_.isArray(interceptor)){
        return matchInterceptor(interceptor, methodName);
    }

    // no filter match
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
    matchInterceptor: matchInterceptor,
    selectInterceptor: selectInterceptor,
    applyInterceptor: applyInterceptor,
    checkAndApplyInterceptor: checkAndApplyInterceptor,
};
