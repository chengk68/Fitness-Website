import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import './StudioForm.css'



function StudioForm(props) {
    const searches = props.searches
    const [name, setName] = useState(searches["name"]);
    const [address, setAddress] = useState(searches["address"]);
    const [coaches, setCoaches] = useState(searches["coaches"]);
    const [classes, setClasses] = useState(searches["classes"]);
    const [amenities, setAmenities] = useState(searches["amenities"]);

    // useEffect(() => {
    //     props.querySetter({'name': name, 'address': address, 'coaches': coaches, 'classes': classes, 'amenities': amenities});
    //   }, [name, address, coaches, classes, amenities]);
    // setName(searches["name"])
    // setAddress(searches["address"])
    // setCoaches(searches["coaches"])
    // setClasses(searches["classes"])
    // setAmenities(searches["amenities"])
    return (
        <>
        <div className='studio-form-container'>
            <h3>Search by: </h3>
            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="name-label">Studio name</InputGroup.Text>
                <Form.Control value={name} 
                    onChange={e => setName(e.target.value)} 
                    aria-label="name"
                    placeholder="Name" />

                <Button variant="outline-danger" size="sm" onClick={() => setName('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="address-label">Address</InputGroup.Text>
                <Form.Control value={address} 
                    onChange={e => setAddress(e.target.value)} 
                    aria-label="address" 
                    placeholder="Address"/>

                <Button variant="outline-danger" size="sm" onClick={() => setAddress('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="coach-label">Coaches</InputGroup.Text>
                <Form.Control value={coaches} 
                    onChange={e => setCoaches(e.target.value)} aria-label="coaches" 
                    placeholder="Coach1,Coach2,..."/>

                <Button variant="outline-danger" size="sm" onClick={() => setCoaches('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm'className="mb-3">
                <InputGroup.Text id="classes-label">Class names</InputGroup.Text>
                <Form.Control value={classes} 
                    onChange={e => setClasses(e.target.value)} aria-label="classes" 
                    placeholder="Class1,Class2,..."/>
                    

                <Button variant="outline-danger" size="sm" onClick={() => setClasses('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="amenities-label">Amenities</InputGroup.Text>
                <Form.Control value={amenities} 
                    onChange={e => setAmenities(e.target.value)} aria-label="amenities" 
                    placeholder="Amenity1,Amenity2,..."/>

                <Button variant="outline-danger" size="sm" onClick={() => setAmenities('')}>
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