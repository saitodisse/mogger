'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concatCss', ['sass'], function () {
  return gulp.src(['./build/app.css', './node_modules/highlight.js/styles/monokai.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build'));
});
