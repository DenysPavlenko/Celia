const browserSync = require('browser-sync');

const server = (done) => {
  browserSync({
    server: DEV_PATHS.server,
    ghostMode: {
      scroll: true
    },
    notify: false,
    scroll: true,
    open: false,
  });
  done();
};

exports.server = server;
