/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');




gulp.task('default', ['styles'], function() {
    gulp.watch('scss/**/*.scss', ['styles']);
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
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./css/'))

});

gulp.task('copy_scripts', function() {
    gulp.src('js/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('copy_css', function() {
    gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copy_html', function() {
    gulp.src('./*.html')
        .pipe(gulp.dest('./dist/'));
});

// gulp.task('copy_libs', function() {
//     gulp.src('./bower_components/**/*.js')
//         .pipe(gulp.dest('./dist/js/libs/'));
// })