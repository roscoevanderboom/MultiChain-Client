const { src, dest } = require('gulp');

function copyHtml() {
  return src('app/renderer/**/**.html').pipe(dest('build/renderer'));
}
function copyCss() {
  return src('app/renderer/**/*.css').pipe(dest('build/renderer'));
}
function copyMC() {
  return src('app/renderer/multichain/**/**').pipe(dest('build/renderer/multichain/'));
}

copyHtml.displayName = 'copy-html';
copyCss.displayName = 'copy-css';
copyMC.displayName = 'copy-multichain';

exports.copyHtml = copyHtml;
exports.copyCss = copyCss;
exports.copyMC = copyMC;
