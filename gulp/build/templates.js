const { src, dest } = require('gulp');
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const inject = require('gulp-inject-string');

const templates = () => {
  return src(BUILD_PATHS.templates.entry)
    .pipe(pug({
      pretty: true,
      basedir: DEV_PATHS.templates.basedir
    }))
    // Inject concatenated styles link
    .pipe(replace(/<link.*href=["|\']?(.*[\\\|\/]?.*)\.css["|\']?.*/g, ''))
    .pipe(inject.before(`</head>`, `\n<link rel="stylesheet" type="text/css" href="./styles/main.css">`))
    // Inject concatenated scripts
    .pipe(replace(/<script.*src=["|\']?(.*[\\\|\/]?.*)\.js["|\']?.*/g, ''))
    .pipe(inject.before(`</body>`, `\n<script src="./scripts/main.js"></script>`))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(BUILD_PATHS.templates.dest))
};

exports.templates = templates;
