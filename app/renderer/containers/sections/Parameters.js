// Services
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Components
import List from './components/parameters/List';

export default () => {
  const { state } = useContext(GlobalState);
  const { params } = state;

  return (params &&
    <React.Fragment>
      <List params={params} />
    </React.Fragment>
  );
}
