var gulp = require('gulp');


var sources = ['*.js', 'src/**/*.js', '!gulpfile.js'];
var testSources = ['test/*.test.js'];
var allSources = sources.concat(testSources);

gulp.task('default', ['test']);

/**
 * mocha + watch
 */
gulp.task('test', ['mocha'], function() {
    gulp.watch(allSources, ['mocha']);
});
gulp.task('mocha', function() {
    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');

    return gulp.src(testSources, { read: false })
        .pipe( mocha( {
            reporter: 'spec', growl: 'true'
        } ))
        .on('error', gutil.log);
});


/**
 * instanbul + watch
 */
gulp.task('cover', ['istanbul'], function() {
    gulp.watch(allSources, ['istanbul']);
});
gulp.task('istanbul', function () {
    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');
    var istanbul = require('gulp-istanbul');

    return gulp.src(sources)
        .pipe(istanbul())
        .on('finish', function () {
            //console.log = original;
            gulp.src(testSources)
                .pipe( mocha({ reporter: 'min', growl: 'true' }) )
                .on('error', gutil.log) // prevent error to stop watch
                .pipe(istanbul.writeReports())
           ;
        });
});
