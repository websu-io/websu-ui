import React, { useState, useEffect } from 'react'
import config from './config.js'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import axios from 'axios'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { Home } from './Home.js'
import { Reports } from './Reports.js'
import { ReportDetail } from './ReportDetail.js'

function App() {
  const [url, setUrl] = useState('')
  const [formFactor, setFormFactor] = useState('desktop')
  const [loading, setLoading] = useState(false)
  const [jsonReport, setJsonReport] = useState('')
  const [throttling, setThrottling] = useState('50000')
  const [locationVal, setLocation] = useState('')
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(config.apiHost + '/locations')
      setLocations(result.data)
      if (result.data.length > 0) {
        setLocation(result.data[0].name)
      }
    }
    fetchData()
  }, [])

  function runScan() {
    // prepend http if http(s) isn't added
    let newUrl = url
    if (!/^https?:\/\//i.test(url)) {
      newUrl = 'http://' + url
    }
    setUrl(newUrl)
    setLoading(true)
    let locationJson = ''
    if (locationVal !== '') {
      locationJson = `"location": "` + locationVal + `", `
    }

    fetch(config.apiHost + '/reports', {
      method: 'post',
      body:
        `{"url": "` +
        newUrl +
        `", ` +
        locationJson +
        ` "form_factor": "` +
        formFactor +
        `", "throughput_kbps": ` +
        throttling +
        `}`,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setJsonReport(JSON.parse(jsonResponse.raw_json))
        setLoading(false)
      })
  }

  return (
    <Router>
      <Navbar sticky="top" bg="dark" variant="dark">
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
        <iframe
          className="ml-5"
          src="https://ghbtns.com/github-btn.html?user=websu-io&repo=websu&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"></iframe>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Home
            onSubmit={runScan}
            url={url}
            setUrl={setUrl}
            formFactor={formFactor}
            setFormFactor={setFormFactor}
            loading={loading}
            jsonReport={jsonReport}
            throttling={throttling}
            setThrottling={setThrottling}
            locationVal={locationVal}
            setLocation={setLocation}
            locations={locations}
          />
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
