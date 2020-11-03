const { src, dest } = require('gulp');
const pug = require('gulp-pug');
const gulpif = require("gulp-if");
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const prettyHtml = require('gulp-pretty-html');
const emitty = require("@zoxon/emitty").setup("app/pug", "pug", {
  makeVinylFile: true,
  basedir: DEV_PATHS.templates.basedir
});

const templates = () => {
  const sourceOptions = global.watch ? { read: false } : {};
  return src(DEV_PATHS.templates.entry, sourceOptions)
    .pipe(plumber())
    .pipe(gulpif(global.watch, emitty.stream(global.emittyChangedFile.path, global.emittyChangedFile.stats)))
    .pipe(pug({
      basedir: DEV_PATHS.templates.basedir,
      pretty: true
    }))
    .pipe(prettyHtml({
      indent_size: 2
    }))
    .pipe(dest(DEV_PATHS.templates.output))
    .on('end', browserSync.reload);
};

exports.templates = templates;
