const { series, parallel } = require('gulp');

// Paths
global.BUILD_PATHS = {
  root: './build',
  templates: {
    entry: './app/pug/*.pug',
    basedir: './app/pug',
    src: './app/pug/**/*.pug',
    dest: './build/',
  },
  styles: {
    entry: ['./app/sass/vendor.sass', './app/sass/main.sass'],
    src: './app/sass/**/*.sass',
    dest: './build/styles',
  },
  scripts: {
    entry: ['./app/scripts/vendor.js', './app/scripts/main.js'],
    src: './app/scripts/**/*.js',
    dest: './build/scripts',
  },
  images: {
    src: './app/static/images/**/*.*',
    dest: './build/images',
  },
  fonts: {
    src: './app/static/fonts/**/*',
    base: { base: 'app/static/' },
    dest: './build/',
    clean: './build/fonts/',
  }
};

const clean = require('./clean').clean;
const templates = require('./templates').templates;
const styles = require('./styles').styles;
const scripts = require('./scripts').scripts;
const images = require('./images').images;
const fonts = require('./fonts').fonts;

exports.build = series(
  clean,
  parallel(
    templates,
    styles,
    scripts,
    images,
    fonts
  )
);
