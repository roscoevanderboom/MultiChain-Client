const { src, dest } = require('gulp');

function copyHtml() {
  return src('app/renderer/**/**.html').pipe(dest('build/renderer'));
}
function copyCss() {
  return src('app/renderer/**/*.css').pipe(dest('build/renderer'));
}
function copyMultichain() {
  return src('app/main/multichain/**/**/*.*').pipe(dest('build/main/multichain'));
}

copyHtml.displayName = 'copy-html';
copyCss.displayName = 'copy-css';
copyMultichain.displayName = 'copy-multichain';

exports.copyHtml = copyHtml;
exports.copyCss = copyCss;
exports.copyMultichain = copyMultichain;
