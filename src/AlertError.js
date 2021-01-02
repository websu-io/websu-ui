import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'


export const AlertError = ({error}) => {
  const [show, setShow] = useState(true);
  return (
    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{error.response ? error.response.data : error.message}</p>
    </Alert>
  )
}
