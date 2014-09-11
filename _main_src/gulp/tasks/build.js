'use strict';

var gulp = require('gulp');

gulp.task('build', ['browserify', 'sass', 'concatCss', 'images', 'fonts', 'markup']);
