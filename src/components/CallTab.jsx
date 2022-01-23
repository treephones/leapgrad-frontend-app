import { beautifyTime } from "../util";

const CallTab = ({ setShowDetail, setSelectedCall, id, identifier, time, direction, type, is_archived}) => {

    return (
        <div>
            <div 
            className='callItem'
            onClick={() => {
                setSelectedCall({id: id, archived: is_archived});
                setShowDetail(true);
            }}
            >
                <div className='direction-img-container'>
                    {
                        direction == 'inbound' ? <img className='direction-img' src="../public/inbound.png"></img> : <img className='direction-img' src="../public/outbound.png"></img>
                    }
                </div>
                <div className='details'>
                    <h2 className={type == 'missed' ? 'missed-call type' : 'taken-call type'}>{ identifier }</h2>
                    <h3 className='time-prev'>{beautifyTime(time)}</h3>
                </div>
            </div>
        </div>
    );
}

export default CallTab;