import React from 'react';
import {ToggleButtonGroup, ToggleButton, Button, Col, Form} from 'react-bootstrap';

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
        <Form.Row className="text-left">
          <Form.Group as={Col} >
            <Form.Label>Form Factor</Form.Label><br/>
            <ToggleButtonGroup type="radio" name="options" value={formFactor} onChange={(val, e) => setFormFactor(val)} defaultValue="desktop">
              <ToggleButton variant="secondary" value="desktop">Desktop</ToggleButton>
              <ToggleButton variant="secondary" value="mobile">Mobile</ToggleButton>
            </ToggleButtonGroup>
          </Form.Group>
        </Form.Row>
      </Form>
    )
};



export default GenerateReportForm;
