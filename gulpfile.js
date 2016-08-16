var gulp 			= require('gulp'),
	less 			= require('gulp-less'),
	browserSync 	= require('browser-sync'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglifyjs'),
	del 			= require('del'),
	autoprefixer 	= require('gulp-autoprefixer'),
	cache 			= require('gulp-cache'),
	cleanCSS		= require('gulp-clean-css'),
	jsHint			= require('gulp-jshint'),
	stylish			= require('jshint-stylish');

gulp.task('less', function() {
	return gulp.src('app/less/**/*.less')
		   .pipe(less())
		   .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		   .pipe(gulp.dest('app/css'))
		   .pipe(browserSync.reload({stream:true}));
});

gulp.task('min-css',['less'], function(){
	return gulp.src('app/css/*.css')
	.pipe(cleanCSS({debug:true}))
	.pipe(gulp.dest('dist/css'));
});

gulp.task("min-js",['hint'] ,function(){
	return gulp.src('app/js/**/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir:'app'
		},
		notify:false
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('build',['clean', 'min-css', 'min-js'], function(){
	var buildHTML = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildData = gulp.src('app/data/**/*')
	.pipe(gulp.dest('dist/data'));
});

gulp.task('clear-cache', function(){
	return cache.clearAll();
});

gulp.task('hint', function() {
   gulp.src(['app/js/**/*.js'])
    .pipe(jsHint('.jshintrc'))
    .pipe(jsHint.reporter(stylish));
 });

gulp.task('watch',['browser-sync', 'less'], function(){
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build-watch',['browser-sync','build'], function(){
	gulp.watch('dist/css/**/*.css', browserSync.reload);
	gulp.watch('dist/*.html', browserSync.reload);
	gulp.watch('dist/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['build-watch']);
