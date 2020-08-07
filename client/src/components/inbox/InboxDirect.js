import React from 'react'
import "./inbox.css";
import InboxMenu from './InboxMenu';
import InboxChat from './InboxChat';

function InboxDirect(props) {
  return (
    <div className="inboxContainer">
      <div className="inboxInsideContainer">
        <div className="inboxCore">
          <InboxMenu />
          <InboxChat direct={true}/>
        </div>
      </div>
    </div>
  )
}

export default InboxDirect;
