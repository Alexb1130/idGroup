const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const brSync = require('browser-sync');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const svgSprite = require('gulp-svg-sprite');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const del = require('del');

var svgConfig = {
    shape: {
        dimension: { // Set maximum dimensions
            maxWidth: 500,
            maxHeight: 500
        },
        spacing: {
            padding: 0
        }
    },
    mode: {
        symbol: {
            dest: '.'
        }
    }
};

gulp.task('svgSprite', function (cb) {
    return gulp.src('src/assets/**/*.svg')
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest('build/assets/sprites'));
});

gulp.task('brSync', () => {
    brSync({
        server: {
            baseDir: './build'
        },
        notify: false,
        open: false
    });
});

gulp.task('styles', () => {
    gulp.src('./src/styles/main.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: './node_modules'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 12 versions']
        }))
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./build/css'))
        .pipe(brSync.reload({
            stream: true
        }))
});

gulp.task('html', () => {
    return gulp.src(['./src/layout/pages/*.pug'])
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(brSync.reload({
            stream: true
        }))
});

gulp.task('scripts', () => {
    gulp.src('./')
        .pipe(webpack(webpackConfig))
        .on('error', function handleError() {
            this.emit('end');
        })
        .pipe(gulp.dest('./build/js'))
        .pipe(brSync.reload({
            stream: true
        }))
});

gulp.task('assets', () => {
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets/'))
})

gulp.task('clean', () => del('build'));

gulp.task('watch', ['clean', 'brSync', 'html', 'styles', 'scripts', 'assets', 'svgSprite'], () => {
    gulp.watch('./src/styles/**/*.scss', ['styles']);
    gulp.watch('./src/layout/**/*.pug', ['html']);
    gulp.watch('./src/scripts/main.js', ['scripts']);
});

gulp.task('default', ['watch']);