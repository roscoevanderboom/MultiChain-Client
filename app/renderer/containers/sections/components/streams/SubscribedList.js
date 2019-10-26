// Services
import React from 'react';

import DetailsCollapse from '../Details-Collapse';
import ParamsCollapse from '../Params-Collapse';
import InfoCollapse from '../Info-Collapse';
import IndexesCollapse from '../Indexes-Collapse';

export default ({ stream }) => {
  return (
    <React.Fragment>
      <br></br>
      <br></br>
      <DetailsCollapse details={stream.details} />
      <ParamsCollapse restrict={stream.restrict} />
      <InfoCollapse props={stream} />
      <IndexesCollapse indexes={stream.indexes} />
    </React.Fragment>
  )
}
