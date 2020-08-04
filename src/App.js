import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import {Row, Col, Navbar, Nav, Container} from 'react-bootstrap';

import ReportViewer from 'react-lighthouse-viewer';


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
      <Container fluid>
        <Router>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} className="offset-md-1" to="/">Websu</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Row>
                <Col className="col-md-6 offset-md-3">
                  <ScanBar url={this.state.url} onURLChange={this.handleURLChange} onSubmit={this.runScan}/>
                </Col>
              </Row>
              <ReportViewer json={this.state.jsonReport} />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </Container>
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
      <form className="form-inline mr-auto mb-4" onSubmit={this.handleSubmit}>
        <input className="form-control mr-sm-2" name="url" value={this.props.url} onChange={this.handleChange} type="text" placeholder="URL..." aria-label="Scan"></input>
        <button className="btn btn-outline-primary btn-rounded btn-sm my-0 waves-effect waves-light" type="submit">Scan</button>
      </form>
    );
  }
}


export default App;
