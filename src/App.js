import React from 'react';
import config from './config.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import {Spinner, Button, Navbar, Nav} from 'react-bootstrap';

import ReportViewer from 'react-lighthouse-viewer';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.runScan = this.runScan.bind(this);
    this.state = {url: '', jsonReport: '', loading: false};
  }

  handleURLChange(url) {
    this.setState({url: url});
  }

  runScan(url) {
    this.setState({url: url, loading: true});
    fetch(config.apiHost+'/scans', {
      method: 'post',
      body: `{"URL": "`+this.state.url+`"}`,
    }).then((response) => response.json() )
        .then((jsonResponse) => {
          this.setState({jsonReport: JSON.parse(jsonResponse.json), loading: false});
        });
  }

  render() {
    let reportViewer;
    if (this.state.loading) {
      reportViewer = <div className="mt-3 text-center"><p>Analysis has started. This takes about 10 to 20 seconds to complete.</p><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>;
    } else {
      reportViewer = <ReportViewer json={this.state.jsonReport} />;
    }
    return (
      <Router>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Navbar.Brand as={Link} className="offset-md-1" to="/">Websu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/api">API Reference</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <header className="bg-primary text-white">
              <div className="container text-center">
                <h1>Websu - Optimizing web app performance</h1>
                <p className="lead">Optimize your web applications for speed using Lighthouse. Run an analysis below or integrate with the API.</p>
                <ScanBar url={this.state.url} onURLChange={this.handleURLChange} onSubmit={this.runScan}/>
              </div>
            </header>
            <div className="container-fluid text-center">
              {reportViewer}
            </div>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    );
  }
}

function NoMatch() {
  const location = useLocation();

  return (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  );
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
      <form className="centered form-inline mr-auto mb-4" onSubmit={this.handleSubmit}>
        <input className="form-control mr-sm-2" name="url" value={this.props.url} onChange={this.handleChange} type="text" placeholder="Enter your URL..." aria-label="Scan"></input>
        <Button variant="light" className="btn btn-rounded btn-sm my-0 waves-effect waves-light" type="submit">Analyze</Button>
      </form>
    );
  }
}


export default App;
