const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const styles = () => {
  return src(BUILD_PATHS.styles.entry)
    .pipe(sass({ outputStyle: 'compressed', includePaths: ['node_modules'] }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gcmq())
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(dest(BUILD_PATHS.styles.dest))
};

exports.styles = styles;
