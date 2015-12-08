var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
	return gulp.src('client/js/draftbuddy-app.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'));
});

gulp.task('default', ['scripts']);
