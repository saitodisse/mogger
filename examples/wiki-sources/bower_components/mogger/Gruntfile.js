/*
 * A) Simple Watch Events
 */
module.exports = function(grunt) {
  grunt.initConfig({
    buster: {
      foo: {}
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', '*.js', 'test/{,*/}*.js']
    },    

    watch: {
      jshint:{
        files: ['Gruntfile.js', 'src/*.js', 'test/*.js'],
        tasks: ['jshint']
      },
      buster:{
        files: ['src/*.js', 'test/*.test.js'],
        tasks: ['buster']
      }
    }
  });

  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['buster', 'jshint']);
  grunt.option('force', true);

  grunt.registerTask('test', [
    'jshint',
    'buster',
    'watch'
  ]);

};