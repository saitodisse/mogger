#mogger.js
###[beta 0.0.5]
meld + trace + colorful logger

###node.js
```
npm install saitodisse/mogger --save
```

###AMD (require.js)
```
bower install git@github.com:saitodisse/mogger.git --save
```

####configure
```javascript
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		Mogger: {
			deps: ['lodash']
		}
	},
	paths: {
		lodash: '../bower_components/lodash/dist/lodash',
		Mogger: '../bower_components/mogger/src/mogger'
	}
});
```

####call
```javascript
define([
	'Mogger'
], function (Mogger) {
	var logger = new Mogger.Tracer();

	// a simple usage, not fun
	logger.log('Welcome to Meld Trace Logger');

	// here it is a green colored message
	logger.log({
		message: 'this message must be green',
		css: 'color: #0A0'
	});
});
```

###tests
####pre-requirements
```
sudo npm i jshint nodeunit supervisor grunt-cli -g
```

####test + jshint
```
grunt
```

####watch for changes: test + jshint
```
grunt test
```

####nodeunit + node-debug
from: http://stackoverflow.com/questions/16652358/how-to-debug-nodeunit-using-node-inspector
```shell
npm -g install supervisor node-inspector

# console 1: supervisor restarts node-inspector when it quits, ignores file changes
supervisor -i . -x node-inspector .

# console 2
supervisor --debug-brk -- `which nodeunit` tests/
```


