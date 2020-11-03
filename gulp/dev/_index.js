const { watch, series, parallel } = require('gulp');

global.DEV_PATHS = {
  server: './app/static',
  clean: ['./app/static/**/*', '!./app/static/images', '!./app/static/fonts'],
  templates: {
    basedir: './app/pug',
    entry: './app/pug/*.pug',
    watch: './app/pug/**/*.pug',
    regex: /app\/pug\//,
    output: './app/static/',
  },
  styles: {
    entry: ['./app/sass/vendor.sass', './app/sass/main.sass'],
    watch: './app/sass/**/*.sass',
    output: './app/static/styles',
  },
  scripts: {
    entry: ['./app/scripts/vendor.js', './app/scripts/main.js'],
    watch: './app/scripts/**/*.js',
    output: './app/static/scripts',
  },
  svg: {
    entry: './app/static/images/svg/*.svg',
    watch: './app/static/images/svg/*.svg',
    output: './app/static/images/svg/svg-sprite',
  },
  static: {
    entry: ['./app/static/images/**/*', './app/fonts/**/*'],
    watch: ['./app/static/images/**/*', './app/fonts/**/*'],
  }
};

global.watch = false;
global.emittyChangedFile = {
  path: '',
  stats: null
};

const clean = require('./clean').clean;
const server = require('./server').server;
const templates = require('./templates').templates;
const styles = require('./styles').styles;
const scripts = require('./scripts').scripts;
const svg = require('./svg').svg;
const static = require('./static').static;

const watcher = () => {
  global.watch = true;
  watch(DEV_PATHS.templates.watch, series(templates))
    .on("all", (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats
      };
    });
  watch(DEV_PATHS.styles.watch, series(styles))
  watch(DEV_PATHS.scripts.watch, series(scripts))
  watch(DEV_PATHS.svg.watch, series(svg))
  watch(DEV_PATHS.static.watch, series(static))
};


exports.default = series(
  clean,
  parallel(templates, styles, scripts, static, svg),
  server,
  watcher,
);
