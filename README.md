by: [saitodisse](http://saitodisse.github.io/)

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
sudo npm i jshint buster supervisor grunt-cli -g
```

####run buster
```
buster-test
```

####TDD
```
buster-autotest
```

####test + jshint
```
grunt
```

####watch for changes: test + jshint
```
grunt test
```

####buster-test live debug with node-inspector
here: http://docs.busterjs.org/en/latest/developers/developing/#debugging-a-buster-js-run