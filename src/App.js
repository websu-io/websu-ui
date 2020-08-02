import React from 'react';
import './App.css';
import ReportViewer from 'react-lighthouse-viewer';

import jsonReport from './report.json';


function App() {
  return (
    <div className="App">
      <ScanBar/>
      <ReportViewer json={jsonReport} />
    </div>
  );
}


class ScanBar extends React.Component {
    render() {
        return (
<form class="form-inline mr-auto mb-4">
          <input className="form-control mr-sm-2" type="text" placeholder="URL..." aria-label="Scan"></input>
          <button className="btn btn-outline-primary btn-rounded btn-sm my-0 waves-effect waves-light" type="submit">Scan</button>
        </form>
        )
    }
}



export default App;
