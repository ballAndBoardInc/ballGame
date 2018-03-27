var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var browserify = require('browserify');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var historyApiFallback = require("connect-history-api-fallback");
var reload = browserSync.reload;

gulp.task('styles', () => {
   return gulp.src('./src/styles/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./public/styles'))
      .pipe(reload({ stream: true }));
});

gulp.task('scripts', () => {
   return browserify('./src/scripts/script.js', { debug: true })
      .transform('babelify', {
         sourceMaps: true,
         presets: ['env']
      })
      .bundle()
      .on('error', notify.onError({
         message: "Error: <%= error.message %>",
         title: 'Error in JS 💀'
      }))
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./public/scripts'))
      .pipe(reload({ stream: true }));
});

gulp.task('bs', () => {
   browserSync.init({
      server: '.'
   });
});

gulp.task('default', ['styles', 'scripts', 'bs'], () => {
   gulp.watch('./**/*.scss', ['styles']);
   gulp.watch('./**/*.js', ['scripts']);
   gulp.watch('*.html', reload);
});