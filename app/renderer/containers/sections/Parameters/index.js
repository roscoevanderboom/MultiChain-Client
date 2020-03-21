// Services
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../../state';

// Components
import List from './List';

export default () => {
  const { state } = useContext(GlobalState);
  const { params } = state;

  return (params &&
    <React.Fragment>
      <List params={params} />
    </React.Fragment>
  );
}
