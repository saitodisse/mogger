var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
// var grep = require('gulp-grep-stream');
// var plumber = require('gulp-plumber');

gulp.task('default', ['mocha', 'watch-mocha']);


gulp.task('mocha', function() {
    return gulp.src(['test/*.test.js'], { read: false })
        .pipe( mocha( {
        	reporter: 'spec', growl: 'true'
        } ))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['lib/**', 'test/*.test.js'], ['mocha']);
});