const { src, dest } = require('gulp');
const image = require('gulp-image');

const images = () => {
  return src(BUILD_PATHS.images.src)
    .pipe(image({
      pngquant: ['--quality', '80-97'],
      mozjpeg: ['-quality', '97'],
    }))
    .pipe(dest(BUILD_PATHS.images.dest))
};

exports.images = images;
