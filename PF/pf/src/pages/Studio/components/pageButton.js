import Button from 'react-bootstrap/Button';

function PageButton(props) {
    return (
        <Button variant="primary" onClick={props.onClick} disabled={props.disabled}>{props.text}</Button>
    )
}

export default PageButton;