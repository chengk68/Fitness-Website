import Table from 'react-bootstrap/Table';
import './StudioList.css';




function StudioList(props) {
    const data = props.studioList
    return (
        <>
        <div className='studio-list-container'>
            <h1> Studios </h1>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((info) => (
                        <tr key={'row' + info['id']}>
                            <td key={'name' + info['id']}>{info['name']}</td>
                            <td key={'ad' + info['id']}>{info['address']}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default StudioList;