const { src, dest } = require('gulp');

function copyMain() {
  return src('app/main/**/**').pipe(dest('build/main'));
}
function copyRenderer() {
  return src('app/renderer/**/**').pipe(dest('build/renderer'));
}

copyMain.displayName = 'copyMain';
copyRenderer.displayName = 'copyRenderer';

exports.copyMain = copyMain;
exports.copyRenderer = copyRenderer;
