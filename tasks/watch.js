const { parallel, series, watch } = require('gulp');
const electron = require('./electron');
const hotreload = require('./hotreload');
const assets = require('./assets');
const scripts = require('./scripts');

function watchMainScripts() {
  return watch(['app/main/**/**'],
    series(assets.copyMain,scripts.developBuild, electron.stop, electron.start));
}

function watchRendererScripts() {
  return watch(['app/renderer/**/**'],
    series(assets.copyRenderer,scripts.developBuild, electron.stop, electron.start));
}

watchMainScripts.displayName = 'watch-main-scripts';
watchRendererScripts.displayName = 'watch-renderer-scripts';

exports.start = series(
  assets.copyMain,
  assets.copyRenderer,
  scripts.developBuild,
  hotreload.start,
  electron.start,
  parallel(
    watchMainScripts,
    watchRendererScripts
    ),
);
