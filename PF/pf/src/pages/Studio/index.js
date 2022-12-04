import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import './style.css'
import StudioList from './components/StudioList'
// import StudioForm from './components/StudioForm'

function Studio() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyAKH7CEpq7Mos2vncPosyllVZjqosi2-Ug",
  });

  const [studios, setStudios] = useState([]);
  const [page, setPage] = useState(1);
  const hasNext = useRef(false);
  const hasPrev = useRef(false);
  const [latitude, setLatitude] = useState(43.6544);
  const [longitude, setLongitude] = useState(79.3807);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [coachList, setCoachList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    console.log(page)
    const url = `http://localhost:8000/studios/all/?loc=(${latitude},${longitude})&name=${name}&address=${address}&coach=${coachList.join(',')}&class=${classList.join(',')}&amenities=${amenities.join(',')}&page=${page}`;
    axios.get(url).then((result) => {
      const {data} = result;
      console.log(data);
      setStudios(data['results']);
      hasNext.current = data['has_next'];
      hasPrev.current = data['has_previous'];
      console.log(hasNext);
      console.log(hasPrev);
    });
  }, [page, name, address, coachList, classList, amenities, latitude, longitude]);


  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      {/* <StudioForm /> */}
      <StudioList studioList={studios}/>
      <div className="page-button-container">
        <PageButton text='previous' onClick={() => setPage(page - 1)} disabled={!hasPrev.current}/>
        <PageButton text='next' onClick={() => setPage(page + 1)} disabled={!hasNext.current}/>
      </div>

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
  console.log("here!");
  console.log(props.lat);
  console.log(props.data);
  // const coords = props.data.map()
  return (
    <GoogleMap 
      zoom={14} 
      center={{lat: props.lat, lng: props.lng}}
      mapContainerClassName="map-container"
    > 
      {props.data.map((info) => (
        <Mark key={info['id']} pos={{lat: parseInt(info['location'].slice(1,-1).split(',')[0]), lng: parseInt(info['location'].slice(1,-1).split(',')[1])}} />
      ))}
      <Mark pos={{lat: props.lat, lng: props.lng}}/>
    </GoogleMap>
  );
}

function Mark(props) {
  return (
    <Marker position={props.pos}/>
  )
}

export default Studio