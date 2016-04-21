var gulp = require('gulp');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var connect = require('gulp-connect');

// Run webpack
gulp.task('webpack', function(){
  return gulp.src('resources/assets/build/main.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

// Run the webserver
/*gulp.task('server', function() {

});

// Default task
gulp.task('default', ['webpack', 'server']);*/
