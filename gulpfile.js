'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');

gulp.task('compress:js', function() {
	return gulp.src(['./scripts/**/*.js', '!./scripts/config/dist.js', '!./scripts/libs/*.js'])
		.pipe(changed('./dist/scripts'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('sass', ['clean:css'], function() {
	return gulp.src('./sass/style.scss')
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rev())
		.pipe(gulp.dest('./dist/styles'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./rev'));
});

gulp.task('rev', ['sass'], function() {
	return gulp.src(['./rev/**/*.json', './views/*.html'])
		.pipe(revCollector({
			replaceReved: true
		}))
		.pipe(gulp.dest('./views'));
});

gulp.task('clean:css', function() {
	del(['./dist/styles/*']);
});

gulp.task('clean:images', function() {
	del(['./dist/images/*']);
});

gulp.task('imagemin', ['clean:images'], function() {
	return gulp.src('./images/*.{png,jpg,gif,ico}')
		.pipe(changed('./dist/images'))
		.pipe(cache(imagemin({
			optimizationLevel: 5,
			progressive: true
		})))
		.pipe(gulp.dest('./dist/images'));
});

gulp.task('default', ['compress:js', 'rev', 'imagemin'], function() {
	gulp.watch('./scripts/**/*.js', ['compress:js']);
	gulp.watch('./sass/*.scss', ['rev']);
	gulp.watch('./images/*.{png,jpg,gif,ico}', ['imagemin']);
});