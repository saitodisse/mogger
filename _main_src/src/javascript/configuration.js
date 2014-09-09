'use strict';

module.exports = {
	rootDir: function() {
		var localRegex = /(127.0.0.1|localhost|192.168.\d+.\d+)/;
		var isLocalHost = localRegex.test(document.location.host);
		if(!isLocalHost){
			return '/mogger/';
		}
		return '';
	}
};