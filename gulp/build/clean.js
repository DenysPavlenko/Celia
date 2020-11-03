const del = require('del');

const clean = () => {
  return del(BUILD_PATHS.root)
};

exports.clean = clean;
