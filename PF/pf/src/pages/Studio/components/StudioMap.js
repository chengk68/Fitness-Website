import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import mm from './blue_MarkerO.png'


function StudioMap(props) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyAKH7CEpq7Mos2vncPosyllVZjqosi2-Ug",
    });
    console.log(props.latitude)
    console.log(props.longitude)
    console.log(props.studio)
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map-container">
            <Map lat={props.latitude} lng={props.longitude} data={props.studios}/>
        </div>
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
        <Marker position={{lat: props.lat, lng: props.lng}} icon={mm} />
        </GoogleMap>
    );
}
    
function Mark(props) {
    return (
        <Marker position={props.pos}/>
    )
}

export default StudioMap