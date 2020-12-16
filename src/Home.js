import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { GenerateReportForm } from './GenerateReportForm'
import { LoadingReportViewer } from './LoadingReportViewer'
import { Link } from 'react-router-dom'

export const Home = ({ onSubmit, url, setUrl, formFactor, setFormFactor, jsonReport, loading }) => {
  return (
    <div>
      <header className="bg-primary text-white">
        <Container>
          <Row>
            <Col>
              <div className="text-center">
                <h1>How fast is your website?</h1>
                <p className="lead">Try out Websu by generating website performance report below:</p>
                <div className="justify-content-center">
                  <GenerateReportForm
                    onSubmit={onSubmit}
                    url={url}
                    setUrl={setUrl}
                    formFactor={formFactor}
                    setFormFactor={setFormFactor}
                  />
                </div>
              </div>
            </Col>
            <Col xs={5}>
              <h1>What's Websu?</h1>
              <p className="lead">
                Websu is an <span className="font-weight-bold">open source</span> project to provide
                Lighthouse-as-a-Service in any environent. Please read more in the{' '}
                <a className="text-light font-weight-bold" href="https://github.com/websu-io/websu">
                  GitHub repo
                </a>
                .
              </p>
              <p className="lead">
                Websu provides an HTTP REST API to run lighthouse and a Web UI that consumes the API. View the{' '}
                <Link to="/api-docs" className="text-light font-weight-bold">
                  API documentation
                </Link>{' '}
                to try out the API.
              </p>
            </Col>
          </Row>
        </Container>
      </header>
      <div className="container-fluid text-center">
        <LoadingReportViewer loading={loading} jsonReport={jsonReport} />
      </div>
    </div>
  )
}
