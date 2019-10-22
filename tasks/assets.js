const { src, dest } = require('gulp');

function copyHtml() {
  return src('app/renderer/**/**.html').pipe(dest('build/renderer'));
}
function copyCss() {
  return src('app/renderer/**/*.css').pipe(dest('build/renderer'));
}

copyHtml.displayName = 'copy-html';
copyCss.displayName = 'copy-css';

exports.copyHtml = copyHtml;
exports.copyCss = copyCss;
