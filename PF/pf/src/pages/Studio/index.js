import React, { useState, useEffect, useRef } from "react";
import './style.css'
import StudioDetails from './components/StudioDetails'
import Button from 'react-bootstrap/Button'
import StudioNav from './components/StudioNav'
import StudioMap from './components/StudioMap'
import axios from 'axios'
// import StudioList from './StudioList'
import StudioForm from './components/StudioForm'
import InputGroup from 'react-bootstrap/InputGroup';

function Studio() {
  const [studios, setStudios] = useState([]);
  const [params, setParams] = useState({page: 1, filters: {'name': '', 'address': '', 'coaches': '', 'classes': '', 'amenities': ''}})
  const hasNext = useRef(false);
  const hasPrev = useRef(false);
  const [latitude, setLatitude] = useState(43.6544);
  const [longitude, setLongitude] = useState(79.3807);
  const [curr, setCurr] = useState(0);

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

  navigator?.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
    const pos = {lat, lng}
    console.log(pos)
    setLatitude(pos["lat"])
    setLongitude(pos["lng"])
    console.log(latitude)
    console.log(longitude)
  })
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossOrigin="anonymous"
      />
      <h1> Studios </h1>
      <StudioNav studioList={studios} setId={(id) => setCurr(id)} curr={curr} />
      <div className="page-button-container">
        <InputGroup className="mb-3">
          <PageButton text='previous' onClick={() => setParams({...params, page: params.page - 1})} disabled={!hasPrev.current}/>
          <PageButton text='next' onClick={() => setParams({...params, page: params.page + 1})} disabled={!hasNext.current}/>
        </InputGroup>
      </div>
      <div className="set-location-container"></div>
      <Content curr = {curr}
        setId = {(id) => setCurr(id)}
        setParams = {(params) => setParams(params)}
        latitude = {latitude}
        longitude = {longitude}
        studios = {studios}
        searches = {params["filters"]}
      />
    </>
  )
}

function Content(props) {
  if (props.curr === 0) {
    return (
      <>
      <div className="studio-search-container">
        <StudioForm querySetter={f => props.setParams({page: 1, filters: f})} searches={props.searches}/>
      </div>
      <div className="studio-map-container">
        <StudioMap latitude={props.latitude} longitude={props.longitude} studios={props.studios}/>
      </div>
      </>    
    )
  }
  else {
    return (
      <>
      <StudioDetails studioId={props.curr} lat={props.latitude} lng={props.longitude}/>
      </>
    )
  }
}

function PageButton(props) {
  return (
      <Button variant="primary" onClick={props.onClick} disabled={props.disabled}>{props.text}</Button>
  )
}

export default Studio