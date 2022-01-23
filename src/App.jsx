import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';

import Button from 'react-bootstrap/Button';


const App = () => {
  let [selectedCall, setSelectedCall] = useState({});
  let [showDetail, setShowDetail] = useState(false);
  let [showArchived, setShowArchived] = useState(false);

  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        <div className='container-header'>
          <h1 className='pageTitle'>{showArchived ? 'Archived' : 'Recents'}</h1>
          <Button 
          id='toggleArchived'
          size='sm'
          onClick={() => {
            setShowArchived(!showArchived);
          }}>Show {showArchived ? 'All Calls' : 'Archived'}</Button>
        </div>
        <ActivityFeed setSelectedCall={setSelectedCall} setShowDetail={setShowDetail} showDetail={showDetail} showArchived={showArchived} />
      </div>
      <ActivityDetail id='detailModal' onHide={() => setShowDetail(false)} show={showDetail} id={selectedCall.id} is_archived={selectedCall.archived} />
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
