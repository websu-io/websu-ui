import React, { useState } from 'react'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { GenerateReportForm } from './GenerateReportForm'
import { AlertError } from './AlertError'
import { isBrowser, isMobile } from 'react-device-detect'
import ReportViewer from 'react-lighthouse-viewer'

export const Home = () => {
  const [jsonReport, setJsonReport] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  function setReportData(report) {
    setJsonReport(JSON.parse(report.raw_json))
  }

  return (
    <div>
      <header className="bg-primary text-white">
        <Container>
          <Row>
            <Col xs={12} md={7}>
              <div className="text-center">
                <h1>How fast is your website?</h1>
                <p className="lead">Try out Websu by generating website performance report below:</p>
                <div className="justify-content-center">
                  <GenerateReportForm onSuccess={setReportData} onLoading={setLoading} onError={setError} />
                </div>
              </div>
            </Col>
            {isBrowser && <HomeContent />}
          </Row>
        </Container>
      </header>
      <div className="container-fluid text-center">
        {loading === true && (
          <div className="mt-3 text-center">
            <p>Analysis has started. This takes about 10 to 20 seconds to complete.</p>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        {loading === false && jsonReport !== '' && <ReportViewer json={jsonReport} />}
        {Object.keys(error).length > 0 && (
            <AlertError error={error} />
        )}
      </div>
      {isMobile && (
        <header className="bg-primary text-white">
          <Container>
            <Row>
              <HomeContent />
            </Row>
          </Container>
        </header>
      )}
    </div>
  )
}

function HomeContent() {
  return (
    <Col xs={12} md={5}>
      <h2>Performance Optimization</h2>
      <p className="lead">
      Websu helps you optimize your web applications for speed
      by generating detailed speed reports.
      </p>
      <p className="lead">
      Liking it?
      Consider starring the {' '}
        <a className="text-light font-weight-bold" href="https://github.com/websu-io/websu">
          GitHub repo
        </a>, tweets are welcome too.
      </p>
    </Col>
  )
}
