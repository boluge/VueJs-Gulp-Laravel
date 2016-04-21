var gulp = require('gulp');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

// Run webpack
gulp.task('webpack', function(){
  return gulp.src('src/main.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js/'));
});

// Run the webserver
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: 'dist'
  });
});

// Default task
gulp.task('default', ['webpack', 'webserver']);
