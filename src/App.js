import React from 'react'
import config from './config.js'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { isBrowser } from "react-device-detect"
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { Home } from './Home.js'
import { Reports } from './Reports.js'
import { ReportDetail } from './ReportDetail.js'

function App() {
  return (
    <Router>
      <Container fluid="xs">
      <Navbar sticky="top" expand="sm" bg="dark" variant="dark">
        <Navbar.Brand as={Link} className="offset-md-3" to="/">
          Websu
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/all-reports">
            Reports
          </Nav.Link>
          <Nav.Link as={Link} to="/api-docs">
            API Docs
          </Nav.Link>
        </Nav>
        { isBrowser && (
        <iframe
          className="ml-5"
          src="https://ghbtns.com/github-btn.html?user=websu-io&repo=websu&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"></iframe>
        )}
      </Navbar>
      </Container>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/api-docs">
          <SwaggerUI url={config.apiHost + '/docs/doc.json'} />
        </Route>
        <Route path="/r/id/:id">
          <ReportDetail />
        </Route>
        <Route exact path="/all-reports">
          <Reports />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}

function NoMatch() {
  const location = useLocation()
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default App
