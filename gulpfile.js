var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var buildtargetjs = "public/js/";
var buildtargetstyle = "public/style/"
var buildtargetstyletheme = "public/style/theme"

var paths = {};

paths.all = [
  'public/**/*.*'
];

paths.angular = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-route/angular-route.min.js'
];

paths.scripts = [
  'modules/*/app.js',
  'modules/**/*.js'
];

paths.styles = [
  'style/*.css'
];

paths.stylethemes = [
  'style/theme/*.css'
];

gulp.task('connect', function () {
  var connect = require('gulp-connect');
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('angular-init', function () {
  gulp.src(paths.angular)
    .pipe(concat('angular.min.js'))
    .pipe(gulp.dest(buildtargetjs));
});

gulp.task('scripts-init', function () {
  gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildtargetjs));
});

gulp.task('styles-init', function () {
  gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildtargetstyle));
  gulp.src(paths.stylethemes)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildtargetstyletheme));
});

gulp.task('watch', function () {
  var watch = require('gulp-watch');
  watch(paths.scripts, function () {
    gulp.start('scripts-init');
  });
  watch(paths.styles, function () {
    gulp.start('styles-init');
  });
  watch(paths.all, function () {
    var connect = require('gulp-connect');
    gulp.src(paths.all)
      .pipe(connect.reload());
  });
});

gulp.task('default', ['angular-init', 'scripts-init', 'styles-init']);

gulp.task('dev', ['default', 'connect', 'watch']);
