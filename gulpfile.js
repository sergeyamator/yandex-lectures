'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const webpack = require('gulp-webpack');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const rename = require("gulp-rename");
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');

/* --------- paths --------- */
var paths = {
  scss: {
    location: [
      'source/scss/main.scss'
    ],
    destination: 'prod/css'
  },

  js: {
    location: './source/js/app.js',
    destination: 'prod/js'
  }
};

/* ----- pug ----- */
gulp.task('pug-compile', function() {
  gulp.src('source/pug/index.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('prod/'))
});

/* ------ sass ------ */
gulp.task('sass-compile', function() {
  gulp.src(paths.scss.location)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.destination));
});

/* -------- concat js -------- */
gulp.task('js', function() {
  return gulp.src(paths.js.location)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.js.destination));
});

/* -------- Assets clean ------- */
gulp.task('assets-clean', function() {
  return gulp.src('prod/assets', {read: false})
    .pipe(clean());
});

/* ---------- Assets copy ---------- */
gulp.task('assets-copy', function() {
  return gulp.src('source/assets/**/*')
    .pipe(gulp.dest('prod/assets'));
});

gulp.task('assets', function() {
  runSequence('assets-clean',
    'assets-copy');
});

/* -------- gulp server  -------- */
gulp.task('server', function() {
  browserSync({
    port: 9000,
    server: {
      baseDir: 'prod'
    }
  });
});

/* -------- gulp watching  -------- */
gulp.task('watch', function() {
  gulp.watch('source/pug/**/*.pug', ['pug-compile']);
  gulp.watch('source/scss/**/*.scss', ['sass-compile']);
  gulp.watch('source/js/modules/*.js', ['js']);
  gulp.watch('source/assets/**/*', ['assets']);
  gulp.watch([
    'prod/**/*.html',
    'prod/js/**/*.js',
    'prod/css/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('default', function() {
  runSequence(
    'pug-compile',
    'sass-compile',
    'js',
    'assets',
    'server',
    'watch')
});


