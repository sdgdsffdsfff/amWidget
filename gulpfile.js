var gulp = require('gulp'),
	amTransportGulp = require('gulp-am-transport'),
	concat = require('gulp-concat');

gulp.task('am-transport', function () {
	gulp.src('./src/**/*.js')
		.pipe(amTransportGulp({uglify:true}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('doc', function () {
	gulp.src('./doc/*.md')
		.pipe(concat('aw-doc.md'))
		.pipe(gulp.dest('./doc/build'))
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['am-transport']);