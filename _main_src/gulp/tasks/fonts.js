'use strict';

var gulp = require('gulp');

gulp.task('fonts', function() {

  var source = './node_modules/bootstrap-sass/assets/fonts/bootstrap/**';
  var dest = './build/bootstrap';

  return gulp.src(source)
    .pipe(gulp.dest(dest));
});
