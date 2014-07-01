var gulp = require('gulp'),
	amTransportGulp = require('gulp-am-transport'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('am-transport', function () {
	gulp.src('./src/**/*.js')
		.pipe(amTransportGulp({family: "AW"}))
		.pipe(gulp.dest('./dist/'))
		.pipe(gulp.dest('./examples/lib'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/'))
		.pipe(gulp.dest('./examples/lib'));
});

gulp.task('doc', function () {
	gulp.src('./doc/*.md')
		.pipe(concat('aw-doc.md'))
		.pipe(gulp.dest('./doc/build'))
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['am-transport']);