var gulp = require('gulp');
var webpack = require('webpack-stream');
var batch = require('gulp-batch');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Run webpack
gulp.task('webpack', function(){
  return gulp.src('./resources/assets/build/**.**')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
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
