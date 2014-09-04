var gulp = require('gulp');


var sources = ['*.js', 'src/**/*.js', '!gulpfile.js'];
var testSources = ['test/*.test.js'];
var allSources = sources.concat(testSources);


gulp.task('default', ['cover', 'watch']);


gulp.task('watch', function() {
    gulp.watch(allSources, ['cover']);
});


gulp.task('cover', function () {
    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');
    var istanbul = require('gulp-istanbul');

    return gulp.src(sources)
        // Covering files
        .pipe( istanbul() )
        .on('finish', function () {
            gulp.src(testSources)
                .pipe( mocha({ reporter: 'spec', growl: 'true' }) )
                .on('error', gutil.log) // prevent error to stop watch

                .pipe(istanbul.writeReports()) // Creating the reports after tests runned
    ;
    });
});
