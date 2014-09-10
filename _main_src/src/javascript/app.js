'use strict';

var Router = require('./router');
var MainView = require('./views/main-view');
var $ = require('jquery');
// var domReady = require('domready');

module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        var self = window.app = this;

        // init our URL handlers and the history tracker
        this.router = new Router();

        // load all examples
        var data = require('./data/all-examples')();
        var ExampleCollection = require('./models/example-collection');
        var exampleCollection = new ExampleCollection(data);
        window.app.exampleCollection = exampleCollection;


        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        $(function () {
            // init our main view
            var mainView = self.view = new MainView({
                el: document.body
            });

            // ...and render it
            mainView.render();

            // listen for new pages from the router
            self.router.on('newPage', mainView.setPage, mainView);

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: false, root: '/'});

            // activating bootstrap JS
            window.jQuery = $;require('bootstrap');
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};

// run it
module.exports.blastoff();
