import Table from 'react-bootstrap/Table';
import './MyHistoryStyle.css';

function MyHistoryList(props) {
    const data = props.myhistorylist
    return (
        <>
        <div className='history'>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Start </th>
                        <th>End </th>
                        <th>Enrollment Status</th>
                        <th>Class Status </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((info) => (
                        <tr key={'row' + info['id']}>
                            <td key={'class' + info['id']}>{info['class_name']}</td>
                            <td key={'start' + info['id']}>{info['starttime']}</td>
                            <td key={'end' + info['id']}>{info['endtime']}</td>
                            <td key={'active' + info['id']}>{info['is_active']}</td>
                            <td key={'status' + info['id']}>{info['status']}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default MyHistoryList;
