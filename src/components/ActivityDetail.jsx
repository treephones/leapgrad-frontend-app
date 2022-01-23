import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import LoadingState from './LoadingState.jsx';
import { beautifyTime } from '../util.js';

const ActivityDetail = ({ onHide, show, id, is_archived }) => {
    let [callInfo, setCallInfo] = useState({});
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if(id) {
            fetch(`https://aircall-job.herokuapp.com/activities/${id}`)
            .then(res => res.json())
            .then(data => {
                setCallInfo(data);
                setLoading(false);
            });
        }
    }, [id, is_archived]);

    return (
        <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Call Details
                </Modal.Title>
            </Modal.Header>
            {
                !loading
                ?   <Modal.Body id='callStats'>
                        <div className='callStat'>
                            <h5>Caller</h5>
                            <h6>{callInfo.from}</h6>
                        </div>
                        <div className='callStat'>
                            <h5>{callInfo.direction == 'inbound' ? 'Recieved' : 'Sent'} at</h5>
                            <h6>{beautifyTime(callInfo.created_at)}</h6>
                        </div>
                        <div className='callStat'>
                            <h5>Duration</h5>
                            <h6>{callInfo.duration ? callInfo.duration : 0} minutes</h6>
                        </div>
                        <div className='callStat'>
                            <h5>Via</h5>
                            <h6>{callInfo.via}</h6>
                        </div>
                        <div className='callStat'>
                            <h5>Status</h5>
                            <h6 id='status'>{callInfo.is_archived ? 'Archived' : 'Not Archived'}</h6>
                        </div>
                    </Modal.Body>
                :   <LoadingState msg='Loading call information...' />
            }
            <Modal.Footer>
                <Button onClick={(e) => {
                    let send;
                    if(e.target.textContent == 'Archive') {
                        e.target.textContent = 'Unarchive';
                        document.querySelector('#status').textContent = 'Archived';
                        send = true;
                    }
                    else {
                        e.target.textContent = 'Archive';
                        document.querySelector('#status').textContent = 'Unarchived';
                        send = false;
                    }
                    fetch(`https://aircall-job.herokuapp.com/activities/${id}`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          is_archived: send,
                        })
                    });
                }}>{is_archived ? 'Unarchive' : 'Archive'}</Button>
                <Button onClick={() => {
                    onHide();
                }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ActivityDetail;