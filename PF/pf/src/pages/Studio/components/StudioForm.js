import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

function StudioForm(props) {
    return (
        <>
        <ListInput 
            placeholder='hey'
        />
        </>
    )
}

function ListInput(props) {
    return (
        <InputGroup className='mb-3'>
            <Form.Control
                placeholder={props.placeholder} 
            />
            <Button variant="outline-secondary" onChange={() => ListInput(props)}>
                +
            </Button>
            <Button variant="outline-secondary" onClick={props.delete}>
                -
            </Button>
        </InputGroup>
    )
}

export default StudioForm