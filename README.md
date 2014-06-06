#mogger
meld + trace + colorful logger

version: 0.0.5

##install
###node.js
```
npm install saitodisse/mogger --save
```

###AMD (require.js)
```
bower install git@github.com:saitodisse/mogger.git --save
```

##test
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


