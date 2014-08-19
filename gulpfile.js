var gulp = require('gulp'),
	rename = require('gulp-rename'),
	amTransportGulp = require('gulp-am-transport'),
	uglify = require('gulp-uglify'),
	amwDest = require('gulp-amw-dest');

gulp.task('build', function () {
	gulp.src('./src/gallery/**/*.js')
		.pipe(amTransportGulp({family: "AW"}))
		.pipe(gulp.dest('./examples/lib/gallery/'))
		.pipe(uglify())
		.pipe(amwDest('./dist/'));
});

gulp.task('buildCMD', function () {
	gulp.src('./src/gallery/**/*.js')
		.pipe(amTransportGulp({family: "AW", loader: "cmd", uglify: true}))
		.pipe(rename({extname: ".cmd.js"}))
		.pipe(amwDest('./dist/', "cmd"));
	gulp.src('./src/gallery/**/README.md')
		.pipe(amwDest('./dist/', "cmd"));

});

gulp.task('doc', function () {
	gulp.src('./doc/*.md')
		.pipe(concat('aw-doc.md'))
		.pipe(gulp.dest('./doc/build'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);