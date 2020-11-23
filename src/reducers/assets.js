import path from 'path';
import { execFile } from 'child_process';

export const issue = ({ chainName, assetDetails, json, binaryPath }) => {
    const { address, asset, restrict, qty, units } = assetDetails;

    let restrictions = null;
    if (restrict.send) {
        restrictions = 'send';
    }

    if (restrict.receive) {
        restrictions === 'send'
            ? restrictions = 'send,receive'
            : restrictions = 'receive';
    }

    const mcCLI = path.join(binaryPath, 'multichain-cli');
    return new Promise((resolve, reject) => {
        execFile(mcCLI, [
            chainName,
            'issue',
            address,
            JSON.stringify({
                name: asset,
                open: restrict.open,
                restrict: restrictions,
            }),
            qty,
            units,
            0,
            JSON.stringify({ json: json }),
        ], (err, res) => {
            err ? reject(err.message) : resolve(res);
        });
    });
}

export const issueFrom = ({ multichain, asset, assetDetails, reducers }) => {
    multichain.issueFrom({

    },
        () => {

        })
}

export const issueMore = ({ multichain, asset, assetDetails, reducers }) => {
    multichain.issueMore({
        address: assetDetails.address,
        asset: asset.name,
        qty: parseInt(assetDetails.qty)
    }, (err, res) => {
        if (err) {
            reducers.feedback('error', err.message);
        } else {
            reducers.feedback('success', 'Asset has been successfully re-issued.');
        }
    })
}

export const sendAsset = ({ multichain, asset, address, qty, reducers }) => {
    multichain.sendAsset({
        asset: asset.name,
        address: address,
        qty: parseInt(qty)
    }, (err, res) => {
        if (err) {
            reducers.feedback('error', err.message);
            return;
        } else {
            reducers.feedback('success', 'Asset has been sent');
        }
    })
}

export const subscribe = ({ chainName, asset, binaryPath }) => {
    return new Promise((resolve, reject) => {
        execFile(path.join(binaryPath, 'multichain-cli'), [
            chainName,
            'subscribe',
            `${asset.name}`
        ], (err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

export const unSubscribe = ({ chainName, asset, binaryPath }) => {
    return new Promise((resolve, reject) => {
        execFile(path.join(binaryPath, 'multichain-cli'), [
            chainName,
            'unsubscribe',
            `${asset.name}`
        ], (err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}