import Table from 'react-bootstrap/Table';
import React, { useState, useEffect, useRef } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ScheduleForm from './ScheduleForm';
import Enroll from './Enroll';
import EnrollAll from './EnrollAll';
import { Navigate } from 'react-router-dom';

function StudioSchedule(props) {
  const studioId = props.studioId;
  const hasNext = useRef(false);
  const hasPrev = useRef(false);
  const [params, setParams] = useState({page: 1, filters: {name: "", coach: "", start_date: "", end_date: "", start_time: "", end_time: ""}})
  const [classes, setClasses] = useState([]) 
  const [loggedIn, setLoggedIn] = useState(true)
  const [update, setUpdate] = useState(1)
  var min_class = 0;

  useEffect(() => {
    const { page, filters } = params;
    console.log(page)
    console.log(filters)
    const url = `http://localhost:8000/studios/${studioId}/schedule/?name=${filters['name']}&coach=${filters['coach']}&start_time=${filters['start_time']}&end_time=${filters['end_time']}&start_date=${filters['start_date']}&end_date=${filters['end_date']}&page=${page}`;
    axios.get(url).then((result) => {
      const {data} = result;
      setClasses(data['results']);
      hasNext.current = data['has_next'];
      hasPrev.current = data['has_previous'];
    });
  }, [params, props, update]);
  if (classes.length !== 0) {
    console.log(classes)
    min_class = classes[0]['id']
  if (!loggedIn) {
    return < Navigate to='/' replace={true} />
  }
  }

  return (
    <>
    <div className='schedule-list'>
    <Tab.Container id="test" defaultActiveKey={"#link" + min_class}>
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action onClick={() => setParams({...params, page: params.page - 1})} disabled={!hasPrev.current}>Previous Page</ListGroup.Item>
              {classes.map(c => (
                <ListGroup.Item action href={"#link" + c["id"]} key={c['id']}>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{c["targetclass"]["class_name"]}</div>
                    <div>{c["date"]}</div>
                    <div>{c["targetclass"]["start_time"]} - {c["targetclass"]["end_time"]}</div>
                  </div>
                </ListGroup.Item>
              ))}
              <ListGroup.Item action onClick={() => setParams({...params, page: params.page + 1})} disabled={!hasNext.current}>Next Page</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {classes.map(c => (
                <Tab.Pane eventKey={"#link" + c["id"]} key={c['id']}>
                  <div>Description: {c["targetclass"]["description"]} </div>
                  <div>Coach: {c["targetclass"]["coach"]}</div> 
                  <div>Capacity: {c["capacity"]} / {c["targetclass"]["max_capacity"]}</div>
                  <div>Keywords: 
                    <Table bordered>
                      <tbody>
                      {c["targetclass"]["keyword"].map(word => <tr key={word}><td key={word}>{word}</td></tr>)}
                      </tbody>
                    </Table>
                  </div>
                  <div>
                    <Table>
                      <tbody>
                        <tr>
                          <td>Enroll in this class:</td>
                          <td><Button onClick={() => {Enroll(c['id'], () => setLoggedIn(false)); setUpdate(update + 1)}}>Enroll</Button></td>
                        </tr>
                        <tr>
                          <td>Enroll all future occurences of this class: :</td>
                          <td><Button onClick={() => {EnrollAll(c['targetclass']['class_id'], () => setLoggedIn(false)); setUpdate(update + 1)}}>Enroll</Button></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
    <div className='schedule-form'>
      <ScheduleForm querySetter={f => setParams({page: 1, filters: f})} searches={params['filters']} />
    </div>
    </>
  )
}

export default StudioSchedule
