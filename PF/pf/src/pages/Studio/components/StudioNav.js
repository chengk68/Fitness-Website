import ListGroup from 'react-bootstrap/ListGroup';

function StudioNav(props) {
  const data = props.studioList
  console.log(data)
  return (
    <>
    <div className='studio-list-container'>
      <ListGroup as="ul" defaultActiveKey={'#' + props.curr}>
        <ListGroup.Item action href="#0" onClick={() => props.setId(0)}>
          <div className="fw-bold">
            Search for studios
          </div>
        </ListGroup.Item>
        {data.map((studio) => (
          <ListGroup.Item action href={"#" + studio.id} onClick={() => props.setId(studio.id)} key={'l' + studio.id}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{studio.name}</div>
              {studio.address}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    </>
  )
}

export default StudioNav