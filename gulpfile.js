const runDev = require('./gulp/dev/_index').default;
const runBuild = require('./gulp/build/_index').build;

exports.default = runDev;
exports.build = runBuild;
