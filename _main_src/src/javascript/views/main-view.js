'use strict';

// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var $ = require('jquery');
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

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.getByRole('page-container'), {
            show: function (newView/*, oldView*/) {
                // it's inserted and rendered for me
                // document.title = _.result(newView, 'pageTitle');
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
    },

    handleLinkClick: function (e) {
        var aTag = e.target;
        var local = aTag.host === window.location.host;

        // if it's a plain click (no modifier keys)
        // and it's a local url, navigate internally
        if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            app.navigate(aTag.pathname);
        }
    },

    updateActiveNav: function () {
        var path = window.location.pathname.slice(1);

        this.getAll('.nav a[href]').forEach(function (aTag) {
            var aPath = aTag.pathname.slice(1);

            if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
                $(aTag.parentNode).addClass('active');
            } else {
                $(aTag.parentNode).removeClass('active');
            }
        });
    }
});
