var fakeConsole = {};
var slice = Array.prototype.slice;
fakeConsole.logRecorder = [];

fakeConsole.THISiStHEfAKEcONSOLE = 'THISiStHEfAKEcONSOLE';

fakeConsole.log = function() {
    var args = slice.call(arguments);
    var message = args.shift();

    fakeConsole.logRecorder.push({
        'methodName': 'log',
        'message': message,
        'cssList': args
    });
};

fakeConsole.info = function() {

};

fakeConsole.warn = function() {

};

fakeConsole.error = function() {

};

fakeConsole.trace = function() {

};

fakeConsole.dir = function() {

};

fakeConsole.group = function() {

};

fakeConsole.groupCollapsed = function() {
    var args = slice.call(arguments);
    var message = args.shift();

    fakeConsole.logRecorder.push({
        'methodName': 'groupCollapsed',
        'message': message,
        'cssList': args
    });
};

fakeConsole.groupEnd = function() {
    var args = slice.call(arguments);
    var message = args.shift();

    fakeConsole.logRecorder.push({
        'methodName': 'groupEnd',
        'message': message,
        'cssList': args
    });
};

fakeConsole.time = function() {

};

fakeConsole.timeEnd = function() {

};

fakeConsole.profile = function() {

};

fakeConsole.profileEnd = function() {

};

fakeConsole.dirxml = function() {

};

fakeConsole.assert = function() {

};

fakeConsole.count = function() {

};

fakeConsole.markTimeline = function() {

};

fakeConsole.timeStamp = function() {

};

fakeConsole.clear = function() {

};


module.exports = fakeConsole;