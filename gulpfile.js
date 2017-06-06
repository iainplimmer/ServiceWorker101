var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
 
gulp.task('scripts', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  watch('./src/*.js', function() {
    gulp.run(['scripts']);
  });
});