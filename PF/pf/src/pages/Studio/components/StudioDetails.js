import React, { useEffect, useState } from "react";
import axios from 'axios'
import Table from 'react-bootstrap/Table'

function StudioDetails(props) {
    const [studioInfo, setStudioInfo] = useState({name: '', address: '', location: '', postal_code: '', phone: '', images: [], amenities: [], classes: []})


    useEffect(() => {
        const studio_id = props.studioId
        const url = `http://localhost:8000/studios/${studio_id}/details/`
        axios.get(url).then((result) => {
            const {data} = result;
            setStudioInfo(data)
        })
        console.log(studioInfo)
    }, [props])

    const images = studioInfo['images'].map(path => ('http://localhost:8000' + path))
    console.log(images)

    return (
    <>
    <div className="studio-details-container">
        <h2>Welcome to {studioInfo['name']}</h2>
        <div className="address"><h3>Address</h3> {studioInfo['address']}, {studioInfo['postal_code']}</div>
        <div><h3>Phone</h3> {studioInfo['phone']}</div>
        <div className="images"><h3>Images</h3>
            <div className="studio-image-container">{images.map(path => <img id={path} src={path} className="studio-image"/>)}</div>
        </div>
        <div className="amenities"><h3>Amenities</h3>
            <div className="amenities-container">
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studioInfo["amenities"].map(info => (
                            <tr>
                                <th>{info.split(':')[0]}</th>
                                <th>{info.split(':')[1]}</th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>    
        </div>
        <div className="classes">
            <h3>Classes</h3> 
            <StudioClasses classes={studioInfo['classes']} />
        </div>
    </div>
    </>)
}

function StudioClasses(props) {
    return (
        <ul className="class-list">
            {props.classes.map(c => (<li>{c['class_name']}</li>))}
        </ul>
    )
}

export default StudioDetails