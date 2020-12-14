import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Container, Row, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import config from './config.js'

export const ReportDetail = () => {
  const [report, setReport] = useState({})
  let { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(config.apiHost + '/reports/' + id)
      setReport(result.data)
      console.log(result.data.audit_results)
    }
    fetchData()
  }, [id])

  return (
    <Container className="mt-4">
      <h1>Website performance report: {report.url}</h1>
      <p className="lead">
        A website performance report run for{' '}
        <a rel="noopener noreferrer" target="_blank" href={report.url}>
          {report.url}
        </a>{' '}
        was run at {report.created_at}. At that time the performance score given was {report.performance_score}.
        See the below cards for more details about how the performance score was calculated.
      </p>
      {report.audit_results && (
        <Row>
          {Object.entries(report.audit_results).map(([key, value]) => {
            return (
              <Card
                key={key}
                bg={value.score > 0.8 ? 'success' : 'warning'}
                text="white"
                style={{ width: '18rem' }}
                className="mx-2 mb-3">
                <Card.Header className="text-center">{value.title}</Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">{value.score}</Card.Title>
                  <Card.Text>
                    The actual metric value was {value.DisplayValue}.{' '}
                    <ReactMarkdown renderers={{ paragraph: 'span' }}>{value.description}</ReactMarkdown>
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      )}
    </Container>
  )
}
