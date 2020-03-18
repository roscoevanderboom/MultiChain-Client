//
let binary_filenames;

switch (process.platform) {
  case 'win32':
    // binary_filenames = 'QmUH4ykeQhEAtapxnaE792F4hiAYsrRrCGpXJuc1nHE6Vy.zip';
    binary_filenames = 'multichain-windows-2.0.3.zip';
    break;
  case 'linux':
      // binary_filenames = 'QmUH4ykeQhEAtapxnaE792F4hiAYsrRrCGpXJuc1nHE6Vy.tar.gz';
    binary_filenames = 'multichain-2.0-latest.tar.gz';
    break;
  default:
    url = '';
    break;
}
module.exports = binary_filenames;