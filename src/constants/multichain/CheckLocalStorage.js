export default () => {
    let binariesPath = localStorage.getItem('binariesPath');
    let blockchainsPath = localStorage.getItem('blockchainsPath');
    return { binariesPath, blockchainsPath };
}