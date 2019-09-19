// Services
import React, { useState, useEffect } from 'react';

// Constants

// Components
import Button from '@material-ui/core/Button';


// Styles

export default function Streams({ props }) {

  const [activestream, setActivestream] = useState(false)

  const { streams, streamDetails, selectStream, subscribe, unsubscribe } = props;



  useEffect(() => {
    setActivestream(props.streamDetails);

  })

  return (activestream &&
    <div>
      <Button variant="outlined" color="primary"
        onClick={subscribe}>
        Subscribe
      </Button>
      <Button variant="outlined" color="secondary"
        onClick={unsubscribe}>
        Unsubscribe
      </Button>
      <br></br>
      <br></br>
      <div>{`txid: ${activestream.createtxid}`}</div>
      <div>{`Details: ${activestream.details.text}`}</div>
      <div>{`Streamref: ${activestream.streamref}`}</div>
      <div>{`Subscribed: ${activestream.subscribed}`}</div>
      <br></br>
      <div>Restrictions:</div>
      <div>{`Read: ${activestream.restrict.read}`}</div>
      <div>{`Write: ${activestream.restrict.write}`}</div>
      <div>{`Onchain: ${activestream.restrict.onchain}`}</div>
      <div>{`Offchain: ${activestream.restrict.offchain}`}</div>
    </div>
  );
}

