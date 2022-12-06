import React, { useEffect, useState } from "react";
import axios from 'axios'
// import './StudioDetails.css'

function StudioDetails(props) {
    const [studioInfo, setStudioInfo] = useState({name: '', address: '', location: '', postal_code: '', phone: '', images: '', amenities: '', classes: ''})


    useEffect(() => {
        const studio_id = props.studioId
        const url = `http://localhost:8000/studios/${studio_id}/details/`
        axios.get(url).then((result) => {
            const {data} = result;
            setStudioInfo(data)
        })
        console.log(studioInfo)
    }, [])

    return (
    <>
    <div className="studio-details-container">
        <h2>Welcome to {studioInfo['name']}</h2>
        <div className="address">Address: {studioInfo['address']}, {studioInfo['postal_code']}</div>
        <div>Phone: {studioInfo['phone']}</div>
        <div>Images: {studioInfo['images']}</div>
        <div>Amenities: {studioInfo['amenities']}</div>
        {/* <div>Classes: {studioInfo['classes']}</div> */}
    </div>
    </>)
}

export default StudioDetails