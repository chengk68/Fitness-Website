import React, { useState, useEffect, useRef } from "react";

import axios from 'axios'
import MyScheduleList from './components/MyScheduleList.js'
import './style.css'
import Table from "react-bootstrap/Table";
import Drop from "./components/Drop";


function MySchedule() {

    const [schedule, setSchedule] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext ]= useState(false)
    const [previous, setPrevious] = useState(false)
    const [refresh, setRefresh] = useState(1)
    let config = {
            headers:{
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
    useEffect(() => {

        const url = `http://localhost:8000/classes/myschedule/?page=${page}`;

        axios.get(url,config).then((res) => {
            console.log("here")
            const {data} = res;
            setSchedule(data['results']);
            if (data['next'] !== null){
                setNext(true)
            }else{
                setNext(false)
            }
             if (data['previous'] !== null){
                setPrevious(true)
            }else{
                setPrevious(false)
            }

        });
    }, [page, refresh]);


    return (
        <>
            <link
            rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossOrigin="anonymous"
            />


            <MyScheduleList myschedulelist={[schedule,config]}/>
            <div className="button-page">
                <button  onClick={() => setPage(page - 1) }  disabled={previous === false}>Previous</button>
                <button  onClick={() => setPage(page + 1)} disabled={next === false}>Next</button>
            </div>
             <button onClick={() => setRefresh(refresh + 1)}>Refresh</button>
        </>
    )
}





export default MySchedule
