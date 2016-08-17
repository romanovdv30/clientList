var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    cleanCSS = require('gulp-clean-css'),
    jsHint = require('gulp-jshint'),
    preprocess = require('gulp-preprocess'),
    express = require('express'),
    server = require('gulp-express'),
    stylish = require('jshint-stylish');

gulp.task('less', function () {
    return gulp.src('app/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(preprocess({context: {NODE_ENV: 'production'}}))
        .pipe(gulp.dest('dist'))
});

gulp.task('min-css', ['less'], function () {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS({debug: true}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task("min-js", ['hint'], function () {
    return gulp.src('app/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'html', 'min-css', 'min-js'], function () {
    gulp.src('app/data/**/*')
        .pipe(gulp.dest('dist/data'));
});

gulp.task('clear-cache', function () {
    return cache.clearAll();
});

gulp.task('hint', function () {
    gulp.src(['app/js/**/*.js'])
        .pipe(jsHint('.jshintrc'))
        .pipe(jsHint.reporter(stylish));
});

gulp.task('watch', ['server', 'less'], function () {
    gulp.watch('app/less/**/*.less', ['less']);
});

gulp.task('server', ['build'], function () {
    server.run(['server.js']);
    gulp.watch(['app/**/*.html'], server.notify);
    gulp.watch(['app/styles/**/*.css'], function (event) {
        gulp.run('styles:css');
        server.notify(event);
    });
});