'use strict'

// const gulp = require('gulp');
// const sass = require('gulp-sass');
// gulp.task('scss', function(){
//     let watcher = gulp.watch('scss/**/*.scss');
//     watcher.on('change',function(event){
//        console.log('event path is ',event.path,' works');
//        return gulp.src('scss/**/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('css'))
//     });
// });
// gulp.task('default', ['scss']);

const gulp = require('gulp');
const sass = require('gulp-sass');
// const jshint = require('gulp-jshit');
// const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
// const minifyCSS = require('gulp-minify-css');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');


var config = {
    src: '/src',
    build: '/build',
    js: {
        src: 'js/**/*.js',
        dest: 'js/compiled/'
    },
    css: {
        src: 'scss/styles.scss',
        dest: './css/'
    }
};

gulp.task('scss', function() {
    // console.log(watcher)
    return gulp.src(config.css.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest(config.css.dest))

});

gulp.task('js', function() {
    return gulp.src(config.js.src)
        .pipe(sourcemaps.init())
        //only uglify if gulp is ran with '--type production'
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.js.dest));
});
// gulp.task('watch',function(){
// let watcher = gulp.watch('scss/**/*.scss');
//   watcher.on('change', function(event){
//     console.log('file ', event.path, ' was changed');  });
//   });


gulp.task('default', function() {
    gulp.watch('scss/**/*.scss', ['scss']);
    gulp.watch('js/**/*.js', ['js']);
});