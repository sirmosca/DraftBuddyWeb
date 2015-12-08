var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('clean', function() {
	return gulp.src('build/js')
		.pipe(vinylPaths(del))
		.pipe(gulp.dest('build'));
});

gulp.task('scripts', ['clean'], function() {
	return gulp.src('client/js/draftbuddy-app.js')
		.pipe(concat('main.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('default', ['clean', 'scripts']);
