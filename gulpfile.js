'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let pump = require('pump');
let rename = require('gulp-rename');


gulp.task('style', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('js/index.es5.js'),
            rename('index.js'),
            uglify(),
            gulp.dest('dist/')
        ],
        cb
    );
});

gulp.task('style:watch', function () {
    gulp.watch('./sass/*.scss', ['style']);
});