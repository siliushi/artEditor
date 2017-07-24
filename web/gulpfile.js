var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var reload = browsersync.reload;
var bump = require('gulp-bump')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var del = require('del')
var concat = require('gulp-concat')

gulp.task('watch', function () {
    browsersync.init({
        server: {
            baseDir: "."
        }
    });
    gulp.watch("*.html").on('change', reload);
    gulp.watch("src/*.js").on('change', reload);
    gulp.watch("example/*").on('change', reload);
});

/**
 * 自动更新版本号
 */
gulp.task('bump', function () {

    gulp.src('./package.json')

        .pipe(bump())

        .pipe(gulp.dest('./'));

});
gulp.task('default', function () {
    return gulp.src('src/editor.js')
        .pipe(plumber())
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist'));  //输出
});

