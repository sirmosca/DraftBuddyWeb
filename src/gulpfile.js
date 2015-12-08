var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var Server = require('karma').Server;
var runSequence = require('run-sequence');

gulp.task('clean', function() {
	return gulp.src('build')
		.pipe(vinylPaths(del))
		.pipe(gulp.dest('build'));
});

gulp.task('scripts', function() {
	return gulp.src(['client/js/draftbuddy-app.js', 'client/js/app-factory.js'])
		.pipe(concat('app.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('test', function(done) {
	new Server({
		configFile: __dirname +  '/client/js/tests/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('html', function() {
	gulp.src('client/index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('css', function() {
	gulp.src('client/style.css')
		.pipe(gulp.dest('build'));
});

gulp.task('build', function(cb) {
	runSequence('clean', ['html', 'css', 'scripts'], cb);
});

gulp.task('default', function(cb) {
	runSequence('build', cb);
});

gulp.task('runTests', function(cb) {
	runSequence('build', 'test', cb);
});
