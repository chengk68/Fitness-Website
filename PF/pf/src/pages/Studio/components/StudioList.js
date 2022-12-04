import Table from 'react-bootstrap/Table';
import './StudioList.css';



function StudioList(props) {
    const data = props.studioList
    console.log(data)
    return (
        <>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
            integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
            crossorigin="anonymous"
        />
        <div className='studio-list-container'>
            <h3> List of Studios </h3>
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