import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './StudioForm.css'



function StudioForm(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [coaches, setCoaches] = useState("");
    const [classes, setClasses] = useState("");
    const [amenities, setAmenities] = useState("");

    // useEffect(() => {
    //     props.querySetter({'name': name, 'address': address, 'coaches': coaches, 'classes': classes, 'amenities': amenities});
    //   }, [name, address, coaches, classes, amenities]);

    return (
        <>
        <div className='studio-form-container'>
            <h3>Search by: </h3>
            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="name-label">Studio name</InputGroup.Text>
                <Form.Control value={name} 
                    onChange={e => setName(e.target.value)} aria-label="name" />

                <Button variant="outline-secondary" onClick={() => setName('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="address-label">Address</InputGroup.Text>
                <Form.Control value={address} 
                    onChange={e => setAddress(e.target.value)} aria-label="address" />

                <Button variant="outline-secondary" onClick={() => setAddress('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="coach-label">Coaches (separated by commas)</InputGroup.Text>
                <Form.Control value={coaches} 
                    onChange={e => setCoaches(e.target.value)} aria-label="coaches" />

                <Button variant="outline-secondary" onClick={() => setCoaches('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm'className="mb-3">
                <InputGroup.Text id="classes-label">Class names(separated by commas)</InputGroup.Text>
                <Form.Control value={classes} 
                    onChange={e => setClasses(e.target.value)} aria-label="classes" />

                <Button variant="outline-secondary" onClick={() => setClasses('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="amenities-label">Amenities (separated by commas)</InputGroup.Text>
                <Form.Control value={amenities} 
                    onChange={e => setAmenities(e.target.value)} aria-label="amenities" />

                <Button variant="outline-secondary" onClick={() => setAmenities('')}>
                    Clear
                </Button>
            </InputGroup>

            <Button variant="primary" onClick={() => props.querySetter({'name': name, 'address': address, 'coaches': coaches, 'classes': classes, 'amenities': amenities})}>
                Search
            </Button>
        </div>
        </>
    )
}


export default StudioForm