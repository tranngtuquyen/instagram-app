import React from 'react'
import InboxChatDefault from './InboxChatDefault'
import DirectChat from './DirectChat';

function InboxChat(props) {
  const {direct} = props;
  return (
    <div className="inboxChatFirstContainer">
      {!direct && <InboxChatDefault />}
      {direct && <DirectChat />}
    </div>
  )
}

export default InboxChat;
