var gulp = require('gulp');

var sources = ['*.js', 'src/**/*.js', '!gulpfile.js'];
var testSources = ['test/*.test.js'];
var allSources = sources.concat(testSources);

gulp.task('default', ['test', 'watch-mocha']);

gulp.task('test', ['cover', 'mocha']);

gulp.task('mocha', function() {
    var mocha = require('gulp-mocha');
    var gutil = require('gulp-util');

    return gulp.src(testSources, { read: false })
        .pipe( mocha( {
            reporter: 'spec', growl: 'true'
        } ))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(allSources, ['cover', 'mocha']);
});

// Run tests and output reports
gulp.task('cover', function (cb) {
    var mocha = require('gulp-mocha');
    var istanbul = require('gulp-istanbul');

    gulp.src(sources)
        .pipe(istanbul()) // Covering files
        .on('finish', function () {
            gulp.src(testSources)
                .pipe(mocha())
                .pipe(istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', cb);
    });
});

gulp.task('start_cover', function (cb) {
  var istanbul = require('gulp-istanbul');

  gulp.src(sources)
    .pipe(istanbul())
    .on('end', cb);
});
