import Table from 'react-bootstrap/Table';
import './MyScheduleStyle.css';
import Drop from './Drop.js'
import DropAll from './DropAll.js'
import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';

function MyScheduleList(props) {
    const [counter, setCounter] = useState(1)
    const data = props.myschedulelist[0]
    const config = props.myschedulelist[1]
    console.log(config)
    return (
        <>
        <div className='schedule'>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Start </th>
                        <th>End </th>
                        <th>Enrollment Status</th>
                        <th>Class Status </th>
                        <th></th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((info, index) => (
                        <tr key={'row' + index}>
                            <td key={'class' + index}>{info['class_name']}</td>
                            <td key={'start' + index}>{info['starttime']}</td>
                            <td key={'end' + index}>{info['endtime']}</td>
                            <td key={'active' + index}>{info['is_active']}</td>
                            <td key={'status' + index}>{info['status']}</td>
                            <td>
                                <Button variant="danger" onClick={() => Drop(info['recurrence_id'], props.setRefresh)}>Drop</Button>{' '}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => DropAll(info['class_id'], props.setRefresh)}>Drop All Classes</Button>{' '}

                            </td>
                        </tr>
                    )
                    ) }
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default MyScheduleList;
