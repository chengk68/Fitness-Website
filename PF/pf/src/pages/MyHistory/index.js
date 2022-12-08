import React, { useState, useEffect, useRef } from "react";

import axios from 'axios'
import MyHistoryList from './components/MyHistoryList.js'
import './style.css'
import {styled} from "@mui/material/styles";
import Button from 'react-bootstrap/Button';

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
            <br/>
            <div className="history">
                 <h1>My History</h1>
            </div>


             <div className="button">
                <Button  class="Primary" size="sm" onClick={() => setPage(page - 1) }  disabled={previous === false}>Previous</Button>{' '}
                <Button class="Primary" size="sm" onClick={() => setPage(page + 1) }  disabled={next === false}>Next</Button>{' '}
            </div>
            <MyHistoryList myhistorylist={history}/>

        </>
    )
}


export default MyHistory
