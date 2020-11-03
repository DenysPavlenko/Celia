const { src, dest } = require('gulp');

const fonts = () => {
  return src(BUILD_PATHS.fonts.src, BUILD_PATHS.fonts.base)
    .pipe(dest(BUILD_PATHS.fonts.dest))
};

exports.fonts = fonts;
