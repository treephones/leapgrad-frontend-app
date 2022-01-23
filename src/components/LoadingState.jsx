import Spinner from 'react-bootstrap/Spinner';

const LoadingState = ({ msg }) => {
    return (
        <div id='loading'>
            <Spinner id='spinner' animation='border' />
            <h2>{msg}</h2>
        </div>
    );
}

export default LoadingState;