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
            description: 'The default behavior is Mogger only show the name of the methods called. Note that as we are using Aspect-oriented programming, it is no need to change the main components code, but only set the object to monitor.',
            script: require('./examples/ex-01-src')
        },
        {
            id: 'ex-02',
            title: 'titles',
            subTitle: 'text before log',
            description: 'You can add a prefix to each log. Thus we know that the methods log is coming from object "Simple Obj".',
            script: require('./examples/ex-02-src')
        },
        {
            id: 'ex-03',
            title: 'colored logs',
            subTitle: 'colors are beautiful',
            description: 'Since 2012 browsers can render colored logs in Google Chrome and Firebug. This way its easier distinguish the source every method call.',
            script: require('./examples/ex-03-src')
        },
        {
            id: 'ex-04',
            title: 'stylish logs',
            subTitle: 'a lot of css properties',
            description: 'Not only is it possible to change the colors, as you can change fonts, fonts sizes and several other properties in logs. You can, for example, display what is most important in bold and leave the whichever is less important with smaller fonts.',
            script: require('./examples/ex-04-src')
        },
        {
            id: 'ex-05',
            title: 'padding size',
            subTitle: 'correctly indentation',
            description: 'in this example, we set a fixed size for the titles. This makes it much more beautiful and organized as if they were tables.',
            script: require('./examples/ex-05-src')
        },
        {
            id: 'ex-06',
            title: 'stylish targets',
            subTitle: 'the title and the target can be stylish',
            description: 'note that the color of the titles and targets can be different. This can be configured with localBeforeConfig and the localTargetConfig.',
            script: require('./examples/ex-06-src')
        },
        {
            id: 'ex-07',
            title: 'global configurations',
            subTitle: 'default styles',
            description: 'you can configure global settings that will be default for all logs. Note that, in this case, we increase the font size and set color to red',
            script: require('./examples/ex-07-src')
        },
        {
            id: 'ex-08',
            title: 'all arguments',
            subTitle: 'arguments in an expandable group',
            description: 'We can know what were the arguments passed to each method. Mogger uses "Console.groupCollapsed" to create expandable groups.',
            script: require('./examples/ex-08-src')
        },
        {
            id: 'ex-09',
            title: 'pointcut',
            subTitle: 'filtering only what I want',
            description: 'pointcuts receives a regular expression, and will only show the methods whose names match. In the example, only the methods ending with "_A" will be displayed.',
            script: require('./examples/ex-09-src')
        },
        {
            id: 'ex-10',
            title: 'interceptors',
            subTitle: 'change target output',
            description: 'the interceptors act by modifying the output of the matched method. They receives a "filterRegex" and a "callback". The "filterRegex" will act as a "pointcut", ie, acts only if match his regular expression. The "callback" function takes as argument an object called "info" that has all the arguments and the method name. The return of this function will be displayed replacing the method name. In this example we are only including a string "! MATCH !:" only on methods that end with "_A"',
            script: require('./examples/ex-10-src')
        },
        {
            id: 'ex-11',
            title: 'intercept arguments',
            subTitle: 'show arguments easily',
            description: 'Another thing you can do with the interceptors, is to show arguments without having to create expandable groups.',
            script: require('./examples/ex-11-src')
        },
    ];
};