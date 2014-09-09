'use strict';

var gulp = require('gulp');

gulp.task('deploy', ['build'], function() {

  var source = './build/**';
  var dest = '..';

  return gulp.src(source)
    .pipe(gulp.dest(dest));
});
