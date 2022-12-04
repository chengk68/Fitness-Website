import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import StudioList from './StudioList'
import StudioForm from './StudioForm'
import '../style.css'


function StudioAll() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyAKH7CEpq7Mos2vncPosyllVZjqosi2-Ug",
    });
    
    const [studios, setStudios] = useState([]);
    // const [page, setPage] = useState(1);
    const [params, setParams] = useState({page: 1, filters: {'name': '', 'address': '', 'coaches': '', 'classes': '', 'amenities': ''}})
    const hasNext = useRef(false);
    const hasPrev = useRef(false);
    const [latitude, setLatitude] = useState(43.6544);
    const [longitude, setLongitude] = useState(79.3807);
    // const [filters, setFilters] = useState({})
    
    useEffect(() => {
        const { page, filters } = params;
        console.log(page)
        console.log(filters)
        const url = `http://localhost:8000/studios/all/?loc=(${latitude},${longitude})&name=${filters['name']}&address=${filters['address']}&coach=${filters['coaches']}&class=${filters['classes']}&amenities=${filters['amenities']}&page=${page}`;
        axios.get(url).then((result) => {
            const {data} = result;
            setStudios(data['results']);
            hasNext.current = data['has_next'];
            hasPrev.current = data['has_previous'];
        });
    }, [params, latitude, longitude]);
    
    
    if (!isLoaded) return <div>Loading...</div>;
    return (
        <>
            <link
            rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossOrigin="anonymous"
            />
            <StudioList studioList={studios}/>
            <div className="page-button-container">
                <PageButton text='previous' onClick={() => setParams({...params, page: params.page - 1})} disabled={!hasPrev.current}/>
                <PageButton text='next' onClick={() => setParams({...params, page: params.page + 1})} disabled={!hasNext.current}/>
            </div>
            <StudioForm querySetter={f => setParams({page: 1, filters: f})}/>
            <div className="map-container">
                <Map lat={latitude} lng={longitude} data={studios}/>
            </div>
        </>
    )
}
    
function PageButton(props) {
    return (
        <Button variant="primary" onClick={props.onClick} disabled={props.disabled}>{props.text}</Button>
    )
}
    
    
function Map(props) {
    return (
        <GoogleMap 
            zoom={14} 
            center={{lat: props.lat, lng: props.lng}}
            mapContainerClassName="map-container"
        > 
        {props.data.map((info) => (
            <Mark key={info['id']} pos={{lat: parseInt(info['location'].slice(1,-1).split(',')[0]), lng: parseInt(info['location'].slice(1,-1).split(',')[1])}} />
        ))}
        </GoogleMap>
    );
}
    
function Mark(props) {
    return (
        <Marker position={props.pos}/>
    )
}

export default StudioAll