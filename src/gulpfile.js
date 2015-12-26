var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var Server = require('karma').Server;
var runSequence = require('run-sequence');
var replace = require('gulp-token-replace');
var destination = "build/";
var destinationJs = destination + 'js/'


gulp.task('clean', function() {
	return gulp.src('build')
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(destination));
});

gulp.task('scripts', function() {
	var config = require('./client/js/app/config.dev.json');
	return gulp.src(['client/js/app/app.js', 'client/js/app/playerService.js'])
		.pipe(concat('app.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(replace({tokens:config}))
//		.pipe(uglify())
		.pipe(gulp.dest(destinationJs));
});

gulp.task('test', function(done) {
	new Server({
		configFile: __dirname +  '/client/tests/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('html', function() {
	gulp.src('client/index.html')
		.pipe(gulp.dest(destination));
});

gulp.task('css', function() {
	gulp.src('client/style.css')
		.pipe(gulp.dest(destination));
});

gulp.task('libs', function() {
	gulp.src('client/js/jquery-2.1.1.js')
		.pipe(gulp.dest(destinationJs));
	gulp.src('client/js/ui-bootstrap-tpls-0.13.0.js')
		.pipe(gulp.dest(destinationJs));
	gulp.src('client/js/angular.min.js')
		.pipe(gulp.dest(destinationJs));
});

gulp.task('build', function(cb) {
	runSequence('clean', ['html', 'css', 'scripts'], 'libs', cb);
});

gulp.task('default', function(cb) {
	runSequence('build', cb);
});

gulp.task('runTests', function(cb) {
	runSequence(['build', 'test'], cb);
});
