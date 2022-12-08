import React, { useState, useEffect } from "react";

import axios from 'axios'
import MyScheduleList from './components/MyScheduleList.js'
import './style.css'
import { useNavigate } from 'react-router-dom';
import {styled} from "@mui/material/styles";
import Button from 'react-bootstrap/Button';
function MySchedule() {
    const navigate = useNavigate()
    const [schedule, setSchedule] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext ]= useState(false)
    const [previous, setPrevious] = useState(false)
    const [refresh, setRefresh] = useState(1)
    const [subscribe, setSubscribe] = useState(false)
    const [unknown, setUnknown] = useState(false)
    let config = {
            headers:{
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
    useEffect(() => {

        const url = `http://localhost:8000/classes/myschedule/?page=${page}`;

        axios.get(url,config).then((res) => {
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
             setSubscribe(true)
        }).catch((error) => {
            if(error.response.status === 403){
                setSubscribe(false)
            } else if (error.response.status === 401) {
                console.log('401')
                navigate('/')
            } else if (error.response.status === 404) {
                return(
                    <>
                        <h1>
                            You are not registered for any classes
                        </h1>
                    </>
                )
            }
            else{
                setUnknown(true)
            }
        });
    }, [page, refresh]);

    if (unknown === true){
        return(
            <>
                <h1>
                    Some error occurred, please reload the window and try again!!
                </h1>
            </>
        )
    }
    if (subscribe === true){
        return (
        <>
            <link
            rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossOrigin="anonymous"
            />
            <br/>

            <div class="schedule">
                 <h1> My Schedule </h1>
            </div>
            <br/>
            <br/>
            <div className="button">
                <Button className="Primary" size="sm" onClick={() => setRefresh(refresh + 1)} >Refresh</Button>{' '}
                <Button  className="Primary" size="sm" onClick={() => setPage(page - 1) }  disabled={previous === false}>Previous</Button>{' '}
                <Button className="Primary" size="sm" onClick={() => setPage(page + 1) }  disabled={next === false}>Next</Button>{' '}
            </div>

            <MyScheduleList myschedulelist={[schedule,config]} setRefresh={() => setRefresh(refresh + 1)}/>

        </>
    )
    }
    else{
        return (
            <>
                <br/>

                <div className="error">
                    <h1>You do not have an active subscription. Please subscribe first!!</h1>
                </div>

                <div className="redirect">
                     <BootstrapButton variant="contained" onClick={() => navigate('/subscription')} >
                        Subscription page
                    </BootstrapButton>

                </div>


            </>
        )
    }

}

//reference https://mui.com/material-ui/react-button/
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 18,
  padding: '1px 60px',
  border: '1px solid',
  lineHeight: 1,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export default MySchedule
