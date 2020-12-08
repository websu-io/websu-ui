import React, { useState } from 'react';
import config from './config.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import {Row, Col, Spinner, Button, ToggleButtonGroup, ToggleButton, Navbar, Nav, Form} from 'react-bootstrap';

import ReportViewer from 'react-lighthouse-viewer';

import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"


function App() {
    const [url, setUrl] = useState("");
    const [formFactor, setFormFactor] = useState("desktop");
    const [loading, setLoading] = useState(false);
    const [jsonReport, setJsonReport] = useState("");

    function runScan() {
        // prepend http if http(s) isn't added
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url
        }
        setUrl(url);
        setLoading(true);

        fetch(config.apiHost+'/reports', {
          method: 'post',
          body: `{"url": "`+url+`", "form_factor": "`+formFactor+`"}`,
        }).then((response) => response.json()).then((jsonResponse) => {
                setJsonReport(JSON.parse(jsonResponse.raw_json));
                setLoading(false)
        });
    }

    return (
      <Router>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Navbar.Brand as={Link} className="offset-md-1" to="/">Websu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/api-docs">API documentation</Nav.Link>
          </Nav>
         <iframe className="mr-sm-4" src="https://ghbtns.com/github-btn.html?user=websu-io&repo=websu&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <header className="bg-primary text-white">
              <div className="container text-center">
                  <h1>Websu - Optimizing web app performance</h1>
                  <p className="lead">Optimize your web applications for speed using Lighthouse. Generate a report below or integrate with the API.</p>
                <div class="row">
                  <div class="col"></div>
                  <div class="col-6">
                    <GenerateReportForm onSubmit={runScan} url={url} setUrl={setUrl} formFactor={formFactor} setFormFactor={setFormFactor} />
                  </div>
                  <div class="col"></div>
              </div>
            </div>
            </header>
            <div className="container-fluid text-center">
              <LoadingReportViewer loading={loading} jsonReport={jsonReport} />
            </div>
          </Route>
          <Route exact path="/api-docs">
            <SwaggerUI url={config.apiHost + "/docs/doc.json"} />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    );
};


function NoMatch() {
  const location = useLocation();
  return (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  );
}


const GenerateReportForm = ({onSubmit, url, setUrl, formFactor, setFormFactor}) => {
    function handleSubmit (event) {
        event.preventDefault();
        onSubmit();
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control size="lg" type="url" name="url" placeholder="e.g. https://www.google.com" value={url} onChange={e => setUrl(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} sm={2}>
            <Button variant="success" size="lg" className="btn btn-rounded btn-md my-0 waves-effect waves-light" type="submit">Analyze</Button>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={4}>
            <Form.Label>Form Factor</Form.Label>
            <ToggleButtonGroup type="radio" name="options" value={formFactor} onChange={(val, e) => setFormFactor(val)} defaultValue="desktop">
              <ToggleButton variant="secondary" value="desktop">Desktop</ToggleButton>
              <ToggleButton variant="secondary" value="mobile">Mobile</ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
        </Form.Row>
      </Form>
    )
};

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



export default App;
