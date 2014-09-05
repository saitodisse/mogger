var gulp = require('gulp');


var sources = ['*.js', 'src/**/*.js', '!gulpfile.js'];
var testSources = ['test/*.test.js'];
var allSources = sources.concat(testSources);

gulp.task('default', ['cover', 'watch']);

gulp.task('console', ['disable_console_log', 'cover', 'enable_console_log', 'mocha']);

gulp.task('watch', function() {
    gulp.watch(allSources, ['cover']);
});


var originalConsoleLog = console.log;

gulp.task('disable_console_log', function() {
    originalConsoleLog = console.log;
    console.log = function () {};
});

gulp.task('enable_console_log', function() {
    console.log = originalConsoleLog;
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


gulp.task('mocha', function() {
    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');

    return gulp.src(testSources, { read: false })
        .pipe( mocha( {
            reporter: 'spec', growl: 'true'
        } ))
        .on('error', gutil.log);
});

gulp.task('cover', function () {
    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');
    var istanbul = require('gulp-istanbul');
    var es = require('event-stream');

    return gulp.src(sources)
        .pipe(istanbul())
        .on('finish', function () {
            //console.log = original;
            gulp.src(testSources)
                .pipe( mocha({ reporter: 'spec', growl: 'true' }) )
                .on('error', gutil.log) // prevent error to stop watch


                .pipe(istanbul.writeReports())

                // turn this async function into a stream
                //.on('end', ) // prevent error to stop watch
                // .pipe(es.mapSync(function (data, cb) {
                //     //continue
                //     finished();
                //     cb(null, data);
                // }))
           ;
        });
});
