import React, { useState, useEffect } from 'react'
import { Container, Row, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from './config.js'

export const Reports = () => {
  const [reports, setReports] = useState([])
  const [skip, setSkip] = useState(50)
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(config.apiHost + '/reports?limit=50')
      setReports(result.data)
    }
    fetchData()
  }, [])

  const loadReports = async () => {
    const result = await axios(config.apiHost + `/reports?limit=50&skip=${skip}`)
    let newReports = reports
    newReports.push(...result.data)
    setReports(newReports)
    if (result.data.length < 50) {
      setShowButton(false)
    } else {
      setSkip(skip + 50)
    }
  }

  return (
    <Container className="mt-4">
      <Row>
        <h1>List of previous website performance reports</h1>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>URL</th>
              <th>Performance Score</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((value, index) => {
              return (
                <tr key={value.id}>
                  <td>
                    <Link to={`/r/id/` + value.id}>{value.id}</Link>
                  </td>
                  <td>
                    <a rel="noopener noreferrer" target="_blank" href={value.url}>
                      {value.url}
                    </a>
                  </td>
                  <td>{value.performance_score}</td>
                  <td>{value.created_at}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Row>
      {showButton && reports.length >= 50 && <Button onClick={loadReports}>Load older reports...</Button>}
    </Container>
  )
}
