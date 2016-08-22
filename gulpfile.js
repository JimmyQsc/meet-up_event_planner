/*eslint-env node */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var rename = require('gulp-rename');

var reload      = browserSync.reload;

gulp.task('serve', ['styles'], function() {
    gulp.watch('src/scss/**/*.scss', ['styles']);

    browserSync.init({
        server: {
            baseDir: './src/',
            routes: {
            '/bower_components': 'bower_components'
        }
        }
    });

    gulp.watch('src/css/*.css').on('change', reload);
    gulp.watch('src/js/**/*.js').on('change', reload);
});

gulp.task('serve:dist', function() {
    browserSync.init({
        server: {
            baseDir: './dist/',
            routes: {
            '/bower_components': 'bower_components'
        }
        }
    });
});

gulp.task('dist', ['copy_html', 'copy_css', 'copy_scripts']);

gulp.task('lint', function(){
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('styles', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('src/css/'))

});

gulp.task('copy_scripts', function() {
    gulp.src(['./src/js/models/*.js','./src/js/**/*'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('copy_css', function() {
    gulp.src('./src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copy_html', function() {
    gulp.src('./src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./dist/'));
});