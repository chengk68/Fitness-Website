import React, { useRef, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import TimePicker from 'react-time-picker';
// import DatePicker from 'react-date-picker';

function ScheduleForm(props) {
    const [name, setName] = useState("");
    const [coaches, setCoaches] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([])
    return (
        <>
        <div className='studio-form-container'>
            <h3>Search by: </h3>
            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="name-label">Class names</InputGroup.Text>
                <Form.Control value={name} 
                    onChange={e => setName(e.target.value)} 
                    aria-label="name"
                    placeholder="Name1,Name2,..." />

                <Button variant="outline-danger" size="sm" onClick={() => setName('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm' className="mb-3">
                <InputGroup.Text id="coach-label">Coaches</InputGroup.Text>
                <Form.Control value={coaches} 
                    onChange={e => setCoaches(e.target.value)} aria-label="coaches" 
                    placeholder="Coach1,Coach2,..."/>

                <Button variant="outline-danger" size="sm" onClick={() => setCoaches('')}>
                    Clear
                </Button>
            </InputGroup>

            <InputGroup size='sm'className="mb-3">
                <InputGroup.Text id="start-time-label">Earliest Time</InputGroup.Text>
                <Form.Control value={startTime} 
                    onChange={e => setStartTime(e.target.value)} aria-label="start-time" 
                    placeholder="HH:MM:SS"/>
            </InputGroup>
            

            <InputGroup size='sm'className="mb-3">
                <InputGroup.Text id="end-time-label">Latest Time</InputGroup.Text>
                <Form.Control value={endTime} 
                    onChange={e => setEndTime(e.target.value)} aria-label="end-time" 
                    placeholder="HH:MM:SS"/>
            </InputGroup>


            <InputGroup size='sm'className="mb-3">
                <InputGroup.Text id="start-date-label">Earliest Date</InputGroup.Text>
                <Form.Control value={startDate} 
                    onChange={e => setStartDate(e.target.value)} aria-label="start-date" 
                    placeholder="YYYY-MM-DD"/>
            </InputGroup>

            <InputGroup size='sm'className="mb-3">
                <InputGroup.Text id="start-date-label">Latest Date</InputGroup.Text>
                <Form.Control value={endDate} 
                    onChange={e => setEndDate(e.target.value)} aria-label="end-date" 
                    placeholder="YYYY-MM-DD"/>
            </InputGroup>
            <div>
                <ul>
                    {errors.map(e => (<li key={e} color='red'>{e}</li>))}
                </ul>
            </div>
            <div >
                <Button variant="primary" onClick={() => querySet(name, coaches, startDate, endDate, startTime, endTime, props.querySetter, ((e) => setErrors(e)))}>
                    Search
                </Button>
            </div>
        </div>
        </>
    )
}

function querySet(name, coaches, startDate, endDate, startTime, endTime, querySetter, setErrors) {
    const errors = []
    if (!(/^(\d{4})-(\d{2})-(\d{2})$/.test(startDate)) && startDate !== '') {
        errors.push('Invalid Earliest Date format')
    }
    if (!(/^(\d{4})-(\d{2})-(\d{2})$/.test(endDate)) && endDate !== '') {
        errors.push('Invalid Latest Date format')
    }
    if (!(/^(\d{2}):(\d{2}):(\d{2})$/.test(startTime)) && startTime !== '') {
        errors.push('Invalid Earliest Time format')
    }
    if (!(/^(\d{2}):(\d{2}):(\d{2})$/.test(endTime)) && endTime !== '') {
        errors.push('Invalid Latest Time format')
    }
    setErrors(errors)
    console.log(errors)
    if (errors.length === 0) {
        setErrors([])
        querySetter({"name": name, "coach": coaches, "start_date": startDate, "end_date": endDate, "start_time": startTime, "end_time": endTime})
    }
}

export default ScheduleForm