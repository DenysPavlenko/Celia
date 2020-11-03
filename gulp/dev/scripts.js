const { src, dest } = require('gulp');
const rollup = require('gulp-better-rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const babel = require('rollup-plugin-babel')

const scripts = () => {
  return src(DEV_PATHS.scripts.entry)
    .pipe(plumber())
    .pipe(rollup({
      plugins: [
        nodeResolve(),
        babel({
          presets: [
            ["@babel/preset-env", {
              "modules": false
            }]
          ],
          sourceMaps: true,
          babelrc: false,
          exclude: 'node_modules/**'
        })
      ],
      context: 'this'
    }, {
      format: 'cjs',
    }))
    .pipe(dest(DEV_PATHS.scripts.output))
    .on('end', browserSync.reload);
};

exports.scripts = scripts;
