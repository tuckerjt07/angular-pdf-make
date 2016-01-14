/*global require, autoprefixer, __dirname */

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    copy = require('gulp-contrib-copy');

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: 35729}));
    app.use(express.static(__dirname));
    app.listen(4000, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('styles', function() {
    return sass('sass', { style: 'expanded' })
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('*.html', notifyLiveReload);
    gulp.watch('css/*.css', notifyLiveReload);
    gulp.watch('src/**/*.js', notifyLiveReload);
});

gulp.task('javascript', function() {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('angular-pdf-make.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
    gulp.src('src/angular-pdf-make.tpl.html')
        .pipe(copy())
        .pipe(gulp.dest('dist/'));
});


gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {

});

gulp.task('release', ['javascript', 'copy']);
