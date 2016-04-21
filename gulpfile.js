var gulp = require('gulp');
var webpack = require('webpack-stream');
var batch = require('gulp-batch');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var reporter = require('eslint-html-reporter');
var path = require('path');
var fs = require('fs');

// Run webpack
gulp.task('webpack', ['lint'], function(){
  return gulp.src('./resources/assets/build/**.**')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
});

gulp.task('lint', function () {
    return gulp.src(['resources/assets/build/main.js','resources/assets/build/vue/*.vue','!node_modules/**'])
        .pipe(eslint({
          root: true,
          extends: 'standard',
          plugins: [
            'html'
          ],
          'rules': {
            'arrow-parens': 0,
            'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
          }
        }))
        .pipe(eslint.result(function (result) {
            // Called for each ESLint result.
            console.log('ESLint result: ' + result.filePath);
            console.log('# Messages: ' + result.messages.length);
            console.log('# Warnings: ' + result.warningCount);
            console.log('# Errors: ' + result.errorCount);
        }))
        .pipe(eslint.format(reporter, function(results) {
          fs.writeFileSync(path.join('./public/js/', 'report-results.html'), results);
        }))
        .pipe(eslint.failAfterError());
});

gulp.task('uglify', function() {
  return gulp.src('./public/js/app.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./public/js/'));
});

// Run the webserver
gulp.task('server', function() {

});

// Default task
gulp.task('default', ['webpack', 'uglify']);
