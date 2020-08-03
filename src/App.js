import React from 'react';
import './App.css';
import ReportViewer from 'react-lighthouse-viewer';

// import jsonReport from './report.json';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.runScan = this.runScan.bind(this);
    this.state = {url: '', jsonReport: '', state: ''};
  }

  handleURLChange(url) {
    this.setState({url: url});
  }

  runScan(url) {
    this.setState({url: url, state: 'Requesting'});
    fetch(process.env.REACT_APP_API_SERVER+'/scans', {
      method: 'post',
      body: `{"URL": "`+this.state.url+`"}`,
    }).then((response) => response.json() )
        .then((jsonResponse) => {
          console.log(jsonResponse);
          this.setState({jsonReport: JSON.parse(jsonResponse.json)});
        });
  }


  render() {
    return (
      <div className="App">
        <ScanBar url={this.state.url} onURLChange={this.handleURLChange} onSubmit={this.runScan}/>
        <ReportViewer json={this.state.jsonReport} />
      </div>
    );
  }
}


class ScanBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onURLChange(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.url);
  }

  render() {
    return (
      <form className="form-inline mr-auto mb-4" onSubmit={this.handleSubmit}>
        <input className="form-control mr-sm-2" name="url" value={this.props.url} onChange={this.handleChange} type="text" placeholder="URL..." aria-label="Scan"></input>
        <button className="btn btn-outline-primary btn-rounded btn-sm my-0 waves-effect waves-light" type="submit">Scan</button>
      </form>
    );
  }
}


export default App;
