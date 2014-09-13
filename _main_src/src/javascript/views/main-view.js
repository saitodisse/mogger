'use strict';

// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var ExampleDropdownItem = require('../pages/example-dropdown-item');
var $ = require('jquery');
var _ = require('lodash');
// var tracking = require('../helpers/metrics');

/*

file:     main-view.js
class:    MainView
instance: mainView

*/

module.exports = View.extend({
    template: require('../templates/body'),
    initialize: function () {
        // this marks the correct nav item selected
        this.listenTo(app.router, 'page', this.handleNewPage);
    },
    events: {
        'click a[href]': 'handleLinkClick'
    },

    render: function () {
        // main renderer
        this.renderWithTemplate();

        this.renderCollection(window.app.exampleCollection, ExampleDropdownItem, this.getByRole('dropdown-itens'));

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.getByRole('page-container'), {
            show: function (newView/*, oldView*/) {
                // it's inserted and rendered for me
                document.title = 'Mogger :: ' + _.result(newView, 'pageTitle');
                document.scrollTop = 0;

                // add a class specifying it's active
                $(newView.el).addClass('active');

                // store an additional reference, just because
                app.currentPage = newView;
            }
        });

        // setting a favicon for fun (note, it's dynamic)
        return this;
    },

    handleNewPage: function (view) {
        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);

        // mark the correct nav item selected
        this.updateActiveNav();

        this.sendPageViewGoogleAnalytics();

        var hljs = require('highlight.js');
        $('pre code').each(function(i, block) {
            //console.log('highlight.js', block);
            hljs.highlightBlock(block);
        });
    },

    handleLinkClick: function (e) {
        var aTag = e.target;
        var local = aTag.host === window.location.host;

        // if its not a hash, do not navigate
        var isHash = aTag.hash.length > 0;

        // if it's a plain click (no modifier keys)
        // and it's a local url, navigate internally
        if (local && isHash && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            window.app.navigate(aTag.hash);
        }
    },

    updateActiveNav: function () {
        var path = window.location.hash;

        this.getAll('.nav a[href]').forEach(function (aTag) {

            var aHash = aTag.hash;

            if(aHash.length === 0){
                return;
            }

            if ((!aHash && !path) || (aHash && path.indexOf(aHash) === 0)) {
                $(aTag.parentNode).addClass('active');
            } else {
                $(aTag.parentNode).removeClass('active');
            }
        });
    },

    sendPageViewGoogleAnalytics: function() {
        // var path = window.location.hash;
        // window.ga('send', 'pageview', {
        //   'page': path
        // });
    }
});
