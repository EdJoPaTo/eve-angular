var concat = require( 'gulp-concat' );
var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var uglify = require( 'gulp-uglify' );
var plumber = require( 'gulp-plumber' );
var sass = require( 'gulp-sass' );
var sourcemaps = require( 'gulp-sourcemaps' );

var paths = { in : {
    angular: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js'
    ],
    scripts: [
      'modules/*/app.js',
      'modules/**/*.js'
    ],
    styles: 'style/*.scss',
    stylethemes: 'style/theme/*.scss'
  },
  out: {
    scripts: 'public/js',
    styles: 'public/style',
    stylethemes: 'public/style/theme'
  }
};

// https://www.timroes.de/2015/01/06/proper-error-handling-in-gulp-js/
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply( gulp, arguments )
    .pipe( plumber( function( error ) {
      // Output an error message
      gutil.log( gutil.colors.red( 'Error (' + error.plugin + '): ' + error.message ) );
      // emit the end event, to properly end the task
      this.emit( 'end' );
    } ) );
};

gulp.task( 'connect', function() {
  var connect = require( 'gulp-connect' );
  connect.server( {
    root: 'public',
    livereload: true
  } );
} );

gulp.task( 'angular-init', function() {
  gulp.src( paths.in.angular )
    .pipe( concat( 'angular.min.js' ) )
    .pipe( gulp.dest( paths.out.scripts ) );
} );

gulp.task( 'scripts-init', function() {
  gulp.src( paths.in.scripts )
    .pipe( sourcemaps.init() )
    .pipe( uglify( {
      mangle: false
    } ) )
    .pipe( concat( 'scripts.min.js' ) )
    .pipe( uglify( {
      mangle: false
    } ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.out.scripts ) );
} );

gulp.task( 'styles-init', function() {
  gulp.src( paths.in.styles )
    .pipe( sourcemaps.init() )
    .pipe( concat( 'styles.min.css' ) )
    .pipe( sass( {
      outputStyle: 'compressed'
    } ).on( 'error', sass.logError ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.out.styles ) );
  gulp.src( paths.in.stylethemes )
    .pipe( sourcemaps.init() )
    .pipe( sass( {
      outputStyle: 'compressed'
    } ).on( 'error', sass.logError ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.out.stylethemes ) );
} );

gulp.task( 'watch', function() {
  var watch = require( 'gulp-watch' );
  watch( 'modules/**/*.*', function() {
    gulp.start( 'scripts-init' );
  } );
  watch( 'style/**/*.*', function() {
    gulp.start( 'styles-init' );
  } );
  watch( 'public/**/*.*', function() {
    var connect = require( 'gulp-connect' );
    gulp.src( 'public/**/*.*' )
      .pipe( connect.reload() );
  } );
} );

gulp.task( 'default', [ 'angular-init', 'scripts-init', 'styles-init' ] );

gulp.task( 'dev', [ 'default', 'connect', 'watch' ] );
