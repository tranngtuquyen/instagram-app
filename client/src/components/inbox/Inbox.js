import React from 'react'
import "./inbox.css";
import InboxMenu from './InboxMenu';
import InboxChat from './InboxChat';

function Inbox(props) {
  return (
    <div className="inboxContainer">
      <div className="inboxInsideContainer">
        <div className="inboxCore">
          <InboxMenu />
          <InboxChat />
        </div>
      </div>
    </div>
  )
}

export default Inbox;
