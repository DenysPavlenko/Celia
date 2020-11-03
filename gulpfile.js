const runDev = require('./gulp/dev/_index').default;
const runBuild = require('./gulp/build/_index').build;
const runDeploy = require('./gulp/deploy/_index').deploy;

exports.default = runDev;
exports.build = runBuild;
exports.deploy = runDeploy;
