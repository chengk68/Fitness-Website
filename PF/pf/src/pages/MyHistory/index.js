import React, { useState, useEffect, useRef } from "react";

import axios from 'axios'
import MyHistoryList from './components/MyHistoryList.js'
import './style.css'


function MyHistory() {

    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext ]= useState(false)
    const [previous, setPrevious] = useState(false)
    let config = {
            headers:{
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
    useEffect(() => {

        const url = `http://localhost:8000/classes/myhistory/?page=${page}`;

        axios.get(url,config).then((res) => {
            const {data} = res;
            setHistory(data['results']);
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
    }, [page]);

    console.log(next)

    return (
        <>
            <link
            rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossOrigin="anonymous"
            />

            <MyHistoryList myhistorylist={history}/>
            <div className="button-page">
                <button  onClick={() => setPage(page - 1) }  disabled={previous === false}>Previous</button>
                <button  onClick={() => setPage(page + 1)} disabled={next === false}>Next</button>
            </div>
        </>
    )
}


export default MyHistory
