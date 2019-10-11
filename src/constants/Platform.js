let platform;
switch (process.platform) {
    case 'win32':
        platform = 'Windows'
        break;
    case 'darwin':
        platform = 'MacOS'
        break;
    default:
        platform = 'Linux'
        break;
}
export default platform;