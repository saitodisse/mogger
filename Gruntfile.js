module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            src: ['bower_components/requirejs/require.js'],
            dest: 'js/vendor/require.js'
          },
          {
            src: ['bower_components/jquery/jquery.js'],
            dest: 'js/vendor/jquery.js'
          },
          {
            src: ['bower_components/underscore/underscore.js'],
            dest: 'js/vendor/underscore.js'
          },
          {
            src: ['bower_components/backbone/backbone.js'],
            dest: 'js/vendor/backbone.js'
          },
          {
            src: ['bower_components/backbone.localStorage/backbone.localStorage.js'],
            dest: 'js/vendor/backbone.localStorage.js'
          },
          {
            src: ['bower_components/requirejs-text/text.js'],
            dest: 'js/vendor/text.js'
          },
          {
            src: ['bower_components/mogger/src/mogger.js'],
            dest: 'js/vendor/mogger.js'
          },
          {
            src: ['bower_components/meld/meld.js'],
            dest: 'js/vendor/meld.js'
          },
          {
            src: ['bower_components/meld/aspect/trace.js'],
            dest: 'js/vendor/trace.js'
          },
          {
            src: ['bower_components/lodash/dist/lodash.js'],
            dest: 'js/vendor/lodash.js'
          },
          {
            src: ['bower_components/colorful-logger/src/colorful-logger.js'],
            dest: 'js/vendor/colorful-logger.js'
          },
          {
            src: ['bower_components/todomvc-common/base.css'],
            dest: 'css/base.css'
          },
          {
            src: ['bower_components/todomvc-common/bg.png'],
            dest: 'css/bg.png'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};