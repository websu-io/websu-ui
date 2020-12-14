import React from 'react'
import { ToggleButtonGroup, ToggleButton, Button, Col, Form } from 'react-bootstrap'

export const GenerateReportForm = ({ onSubmit, url, setUrl, formFactor, setFormFactor }) => {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} xs={9}>
          <Form.Control
            size="lg"
            type="url"
            name="url"
            placeholder="e.g. https://www.google.com"
            value={url || ""}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} xs={3}>
          <Button
            variant="success"
            size="lg"
            block
            className="btn btn-rounded btn-md my-0 waves-effect waves-light"
            type="submit">
            Analyze
          </Button>
        </Form.Group>
      </Form.Row>
      <Form.Row className="text-left">
        <Form.Group as={Col}>
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
      </Form.Row>
    </Form>
  )
}
