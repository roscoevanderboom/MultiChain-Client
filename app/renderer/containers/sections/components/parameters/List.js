// Services
import React, { useState, useEffect } from 'react';

// Components
import Collapse from '../../../components/Collapse';

const newStyle = {
  footer: {
    display: 'flex',
    flexDirection: 'column'
  },
  listItem: {
    margin: 10,
  }
}

export default ({ params }) => {
  const [dataKeys, setDataKeys] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const paramKeys = {
    genesis: [
      'genesis-hash',
      'genesis-nbits',
      'genesis-nonce',
      'genesis-pubkey',
      'genesis-pubkey-hash',
      'genesis-timestamp',
      'genesis-version',
      'initial-block-reward',
      'setup-first-blocks'
    ],
    consensus: [
      'admin-consensus-activate',
      'admin-consensus-admin',
      'admin-consensus-create',
      'admin-consensus-issue',
      'admin-consensus-mine',
      'admin-consensus-txfilter',
      'admin-consensus-upgrade',
    ],
    mining: [
      'mine-empty-rounds',
      'mining-diversity',
      'mining-requires-peers',
      'mining-turnover',
      'support-miner-precheck'
    ],
    network: [
      'default-network-port',
      'default-rpc-port',
    ],
    parameters: [
      'anyone-can-activate',
      'anyone-can-admin',
      'anyone-can-connect',
      'anyone-can-create',
      'anyone-can-issue',
      'anyone-can-mine',
      'anyone-can-send',
      'anyone-can-receive',
      'anyone-can-receive-empty',
    ],
  }

  const sortedParameters = () => {
    const sortedArrays = {
      genesis: [],
      consensus: [],
      mining: [],
      network: [],
      parameters: [],
    };
    const keys = Object.keys(sortedArrays);
    keys.forEach(val => {
      paramKeys[val].forEach(key => {
        sortedArrays[val].push({ [key]: params[key] });
      })
    });
    setDataKeys(Object.keys(sortedArrays));
    setDataValues(Object.values(sortedArrays));
  }

  useEffect(() => {
    if (params !== undefined) {
      sortedParameters()
    }
  }, [params])


  return (params &&
    <React.Fragment>
      {dataValues.map((key, i) =>
        <Collapse
          props={key}
          newStyle={newStyle}
          name={dataKeys[i].toUpperCase()} />
      )}
    </React.Fragment>
  );
}
