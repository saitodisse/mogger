var Reporter            = require('./reporter');

module.exports = {
    defaultConsole     : console,
    Reporter           : Reporter,
    enabled            : true,
    showPause          : true,
    showArguments      : false,
    ignoreRegexPattern : null,
    globalInterceptors : null,
    globalTargetConfig : null,
    waitForPause       : 100,
    pauseCallBack	   : null
};
