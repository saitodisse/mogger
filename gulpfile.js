var gulp = require('gulp');


var sources = ['*.js', 'src/**/*.js', '!gulpfile.js'];
var testSources = ['test/*.test.js'];
var allSources = sources.concat(testSources);

gulp.task('default', ['cover', 'watch']);


gulp.task('watch', function() {
    gulp.watch(allSources, ['cover']);
});


var originalConsoleLog = console.log;
gulp.task('disable-console-log', function() {
    originalConsoleLog = console.log;
    console.log = function () {};
});

gulp.task('enable-console-log', function() {
    console.log = originalConsoleLog;
});



gulp.task('cover', ['disable-console-log', 'enable-console-log'], function () {
    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');
    var istanbul = require('gulp-istanbul');


    // Instambul
    return gulp.src(sources)
        .pipe( istanbul() )
        .on('finish', function () {
            //console.log = original;
            gulp.src(testSources)
                .pipe( mocha({ reporter: 'spec', growl: 'true' }) )
                .on('error', gutil.log) // prevent error to stop watch

                //.pipe(logCapture.start(fs, 'writeFileSync'))
                .pipe(istanbul.writeReports()) // Creating the reports after tests runned
                //.pipe(logCapture.stop('xml'))
    ;
    });
});
