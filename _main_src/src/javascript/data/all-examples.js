'use strict';

/*

file:     all-examples.js
class:    AllExamples
instance: allExamples

*/

module.exports = function() {
    return [
        {
            id: 'ex-01',
            title: 'no configuration',
            subTitle: 'only method name',
            description: ['The default behavior is mogger only show'] +
                         ['the name of the methods called.'] +
                         ['Note that as we are using Aspect-oriented programming,'] +
                         ['it is no need to change the main components code,'] +
                         ['but only set the object to monitor.'].join(''),
            script: require('../pages/examples/ex-01-src')
        },
        {
            id: 'ex-02',
            title: 'Titles',
            subTitle: 'you can define titles',
            description: '',
            script: require('../pages/examples/ex-02-src')
        },
        {
            id: 'ex-03',
            title: 'colored logs',
            subTitle: 'log can be colored',
            description: '',
            script: require('../pages/examples/ex-03-src')
        },
        {
            id: 'ex-04',
            title: 'others css',
            subTitle: 'change other css properties',
            description: '',
            script: require('../pages/examples/ex-04-src')
        },
        {
            id: 'ex-05',
            title: 'paddind size',
            subTitle: 'everything can be correctly indented',
            description: '',
            script: require('../pages/examples/ex-05-src')
        },
        {
            id: 'ex-06',
            title: 'title vs target css',
            subTitle: 'the title and the target do not require the same CSS',
            description: '',
            script: require('../pages/examples/ex-06-src')
        },
        {
            id: 'ex-07',
            title: 'global configurations',
            subTitle: 'you can configure global settings that will be default for all traces',
            description: '',
            script: require('../pages/examples/ex-07-src')
        },
    ];
};