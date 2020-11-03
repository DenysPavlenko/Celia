const del = require('del');

const clean = () => {
  return del(DEV_PATHS.clean)
};

exports.clean = clean;
