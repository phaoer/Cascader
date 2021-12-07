var gulp = require('gulp'),
  clean = require('gulp-clean'),
  notify = require('gulp-notify'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  autoprefix = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  eslint = require('gulp-eslint'),
  connect = require('gulp-connect');

var dev = false;

gulp.task('js', function () {
  (function () {
    var file = gulp.src('src/*.js').pipe(concat('cascader.min.js'))
      .pipe(notify({
        message: 'lint javascript'
      }))
      .pipe(eslint())
      .pipe(eslint.format());

    if (dev) {
      return file;
    } else {
      return file.pipe(eslint.failAfterError())
        .pipe(notify({
          message: 'uglify javascript'
        }))
        .pipe(uglify())
    }
  })(dev).pipe(gulp.dest('dist/js/'))
    .pipe(notify({
      message: 'javascript compile complete'
    }));
});

gulp.task('css', function () {
  gulp.src('src/*.css').pipe(concat('cascader.min.css')).pipe(cssmin()).pipe(autoprefix({
    cascade: false
  })).pipe(gulp.dest('dist/css/'))
  .pipe(notify({
    message: 'css compile complete'
  }));
});

gulp.task('clean', function () {
  return gulp.src(['dist/'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('default', ['clean'], function () {
  dev = false;
  gulp.start(['js', 'css']);
});


gulp.task('watch', function () {

  dev = true;

  connect.server({
    port: 3333
  });

  gulp.watch('src/*.css', ['css']);

  gulp.watch('src/*.js', ['js']);

  gulp.watch(['dist/**', '*.html']).on('change', function (event) {
    notify({
      message: event.path + 'was' + event.type
    });
  });

});
