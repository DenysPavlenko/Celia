const { src } = require('gulp');
const ftp = require('vinyl-ftp');
const log = require('fancy-log');
let hostingConfig;

try {
  hostingConfig = require('../../hosting.config.js');
} catch (error) {
  hostingConfig = null;
}

const deploy = () => {
  if (!hostingConfig) {
    throw new Error('hostingConfig is missing.')
  }
  const conn = ftp.create({
    host: hostingConfig.host,
    user: hostingConfig.user,
    password: hostingConfig.password,
    parallel: 10,
    log: log
  });
  const globs = [
    'build/**',
  ];
  return src(globs, { buffer: false })
    .pipe(conn.dest(hostingConfig.dest));
};

exports.deploy = deploy;
