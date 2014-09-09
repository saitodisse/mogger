'use strict';

var View = require('ampersand-view');

/*

file:     base-page.js
class:    BasePage
instance: basePage

*/

module.exports = View.extend({
    // register keyboard handlers
    registerKeyboardShortcuts: function () {
        /*
        var self = this;
        _.each(this.keyboardShortcuts, function (value, k) {
            // register key handler scoped to this page
            key(k, self.cid, _.bind(self[value], self));
        });
        key.setScope(this.cid);
        */
    },
    unregisterKeyboardShortcuts: function () {
        //key.deleteScope(this.cid);
    }
});
