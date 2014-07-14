module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
            dest: 'js/vendor/bootstrap.min.js'
          },
          {
            src: ['bower_components/jquery/dist/jquery.min.js'],
            dest: 'js/vendor/jquery.min.js'
          },
          {
            src: ['bower_components/jquery/dist/jquery.min.map'],
            dest: 'js/vendor/jquery.min.map'
          },
          {
            src: ['bower_components/bootstrap/dist/css/bootstrap-theme.min.css'],
            dest: 'css/bootstrap-theme.min.css'
          },
          {
            src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
            dest: 'css/bootstrap.min.css'
          },

          {
            src: ['bower_components/google-code-prettify/src/prettify.css'],
            dest: 'css/prettify.css'
          },
          {
            src: ['bower_components/google-code-prettify/src/prettify.js'],
            dest: 'js/vendor/prettify.js'
          },

          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/fonts/',
            src: '**',
            dest: 'fonts/',
            flatten: true,
            filter: 'isFile'
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};