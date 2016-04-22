var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();
var batch = require('gulp-batch');
var sass = require('gulp-sass');
var please = require('gulp-pleeease');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var reporter = require('eslint-html-reporter');
var path = require('path');
var fs = require('fs');

var SassOptions = {
    errLogToConsole: true,
    includePaths: require('node-normalize-scss').includePaths
};

var PleeeaseOptions = {
	sourcemaps: false,
	filters: true,
	rem: ['14px'],
	pseudoElements: true,
	removeAllComments: true,
	opacity: true,
	minifier: true,
    mqpacker: true,
	autoprefixer: {
		browsers: [
         'ie >= 9',
         'ie_mob >= 10',
         'ff >= 30',
         'chrome >= 34',
         'safari >= 7',
         'opera >= 23',
         'ios >= 7',
         'android >= 4.4',
         'bb >= 10'
      ]
	}
};

// Run webpack
gulp.task('webpack', function(){
  return gulp.src('./resources/assets/build/**.**')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('./resources/assets/sass/app.scss')
        .pipe( sass( SassOptions ))
        .on( "error", function( e ) { console.error( e ); })
        .pipe( please( PleeeaseOptions ) )
        .pipe(gulp.dest('./public/css'));
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
gulp.task('serve', function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("public/js/app.js", ['webpack']);
    gulp.watch("resources/assets/sass/**/*.scss", ['sass']);
    gulp.watch(['public/**/*.*']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['webpack', /*'uglify',*/ 'serve']);
