import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from './config.js'
import { Spinner, ToggleButtonGroup, ToggleButton, Button, Col, Form } from 'react-bootstrap'

export const GenerateReportForm = (props) => {
  const [formFactor, setFormFactor] = useState('desktop')
  const [url, setUrl] = useState('')
  const [throttling, setThrottling] = useState('50000')
  const [loading, setLoading] = useState(false)
  const [locationVal, setLocation] = useState('')
  const [locations, setLocations] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    // prepend http if http(s) isn't added
    let newUrl = url
    if (!/^https?:\/\//i.test(url)) {
      newUrl = 'http://' + url
    }
    setUrl(newUrl)
    if (props.onLoading) props.onLoading(true)
    setLoading(true)
    let data = {
      url: newUrl,
      form_factor: formFactor,
      throughput_kbps: parseInt(throttling),
    }
    if (locationVal !== '') {
      data['location'] = locationVal
    }

    // send a POST request
    axios({
      method: 'post',
      url: config.apiHost + '/reports',
      data: data,
    })
      .then((response) => {
        props.onSuccess(response.data)
      })
      .catch((error) => {
        console.log(error)
        if (props.onError) props.onError(error)
      })
      .then(() => {
        setLoading(false)
        if (props.onLoading) props.onLoading(false)
      })
  }

  // Initial mount
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md={9} xs={8}>
          <Form.Control
            size="lg"
            type="url"
            name="url"
            placeholder="e.g. https://www.google.com"
            value={url || ''}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md={3} xs={4}>
          <Button
            variant={loading ? 'secondary' : 'success'}
            size="lg"
            block
            className="btn btn-rounded btn-md my-0 waves-effect waves-light"
            type="submit">
            {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
            {!loading && 'Analyze'}
          </Button>
        </Form.Group>
      </Form.Row>
      <Form.Row className="text-left">
        <Form.Group className="text-center" as={Col} md={4} xs={6}>
          <Form.Label>Simulate</Form.Label>
          <br />
          <ToggleButtonGroup
            type="radio"
            name="options"
            value={formFactor}
            onChange={(val, e) => setFormFactor(val)}
            defaultValue="desktop">
            <ToggleButton variant="secondary" value="desktop">
              Desktop
            </ToggleButton>
            <ToggleButton variant="secondary" value="mobile">
              Mobile
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group className="text-center" as={Col} md={3} xs={3}>
          <Form.Label>Throttling</Form.Label>
          <br />
          <Form.Control as="select" value={throttling} onChange={(e) => setThrottling(e.target.value)}>
            <option value="1000">1 Mbps</option>
            <option value="5000">5 Mbps</option>
            <option value="10000">10 Mbps</option>
            <option value="50000">50 Mbps</option>
          </Form.Control>
        </Form.Group>
        {locations.length > 0 && (
          <Form.Group className="text-center" as={Col} md={4} xs={3}>
            <Form.Label>Location</Form.Label>
            <br />
            <Form.Control as="select" value={locationVal} onChange={(e) => setLocation(e.target.value)}>
              {locations.map((loc, index) => (
                <option key={loc.name} value={loc.name}>
                  {loc.display_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}
      </Form.Row>
    </Form>
  )
}
