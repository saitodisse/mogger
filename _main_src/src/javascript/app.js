'use strict';

var Router = require('./router');
var MainView = require('./views/main-view');
var shortcuts = require('./shortcuts');
var $ = require('jquery');

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

            self._enableGoogleAnalytics();

            // ...and render it
            mainView.render();

            // listen for new pages from the router
            self.router.on('newPage', mainView.setPage, mainView);

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: false, root: '/'});

            // activating bootstrap JS
            window.jQuery = $;require('bootstrap');

            //shortcuts
            shortcuts('registerShortcuts');

            // is devtools open?
            self._detectDevToolsOpen();

        });
    },

    _detectDevToolsOpen: function() {
        // export helper to global "window.app.devTools"
        window.app.devTools = {
            devtools_detect: require('devtools-detect'),
            isOpen: null,
            verifyConsole: this._verifyConsole,
            openModal: this._openModal,
            closeModal: this._closeModal,
        };

        // on "browser event"
        window.addEventListener('devtoolschange', function (e) {
            if(e.detail.open){
                window.app.devTools.closeModal();
            }
            else{
                window.app.devTools.openModal();
            }
        });
    },

    _verifyConsole: function() {
        if(window.app.devTools.isOpen === true){
            window.app.devTools.closeModal();
        }
        else if (window.app.devTools.isOpen === false){
            window.app.devTools.openModal();
        }
        else if (window.app.devTools.isOpen === null){
            setTimeout(function() {
                // console.log('call again...');
                window.app.devTools.isOpen = window.app.devTools.devtools_detect.open;
                window.app.devTools.verifyConsole()
            }, 600);
        }
    },
    // _checkConsoleOpen: function() {
    // },
    _openModal: function() {
        $('#detectConsoleModal').modal('show');
    },
    _closeModal: function() {
        $('#detectConsoleModal').modal('hide');
    },

    _enableGoogleAnalytics: function() {
        /**
         * google analytics
         */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        window.ga('create', 'UA-54745828-1', 'auto');
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
