'use strict';

module.exports = function(action) {
    var body = window.document.body;
    var addKeyupEvents = require('add-keyup-events');

    var nextExample = function(event) {
        var targetPage = _getTargetHash(event, 1);
        if(targetPage){
            window.app.router.history.navigate(targetPage, {trigger: true});
        }
    };

    var previousExample = function(event) {
        var targetPage = _getTargetHash(event, -1);
        if(targetPage){
            window.app.router.history.navigate(targetPage, {trigger: true});
        }
    };

    var _getTargetHash = function(event, add) {
        if(!/ex-(\d+)/.test(document.location.hash)){
            if(event){
                event.preventDefault();
            }
            return false;
        }

        var exampleNumber = Number(/ex-(\d+)/.exec(document.location.hash)[1]);
        exampleNumber += add;

        if(exampleNumber === 0){
            // cant go to previous
            if(event){
                event.preventDefault();
            }
            return false;
        }

        if(exampleNumber === window.app.exampleCollection.length+1){
            // cant go to previous
            if(event){
                event.preventDefault();
            }
            return false;
        }

        var exampleString = exampleNumber + '';
        if(exampleString.length === 1){
            exampleString = '0' + exampleString;
        }
        return '#ex-' + exampleString;
    };

    if(action === 'registerShortcuts'){
        addKeyupEvents(body, {
            37: 'left',
            39: 'right'
        });

        body.addEventListener('left', previousExample.bind(this), false);
        body.addEventListener('right', nextExample.bind(this), false);
    }

    if(action === 'previous'){
        previousExample();
    }

    if(action === 'next'){
        nextExample();
    }

    if(action === 'runExample'){
        window.app.runExample();
    }

};
