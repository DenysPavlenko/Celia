const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gcmq = require('gulp-group-css-media-queries');
const browserSync = require('browser-sync');

const styles = () => {
  return src(DEV_PATHS.styles.entry)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded', includePaths: ['./node_modules', '../node_modules'] }).on("error", notify.onError()))
    .pipe(autoprefixer(['last 2 versions']))
    .pipe(gcmq())
    .pipe(dest(DEV_PATHS.styles.output))
    .pipe(browserSync.reload({ stream: true }))
};

exports.styles = styles;
