import React from 'react';
import ReportViewer from 'react-lighthouse-viewer';

import {Spinner} from 'react-bootstrap';

const LoadingReportViewer = ({loading, jsonReport}) => {
    if (loading) {
      return (
          <div className="mt-3 text-center">
            <p>Analysis has started. This takes about 10 to 20 seconds to complete.</p>
            <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
          </div>
      )
    } else {
      return <ReportViewer json={jsonReport} />
    }
};

export default LoadingReportViewer;
