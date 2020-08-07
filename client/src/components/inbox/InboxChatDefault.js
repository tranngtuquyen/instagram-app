import React from 'react'

function InboxChatDefault(props) {
  return (
    <div className="inboxChatSecondContainer">
      <div className="inboxChatDefaultMessageContainer">
        <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-chat-left-dots inboxChatDefaultMessage" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: "auto", marginRight: "auto"}}>
          <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
      </div>
      <div className="inboxChatDefaultMessageContainer">
        <div className="inboxChatDefaultMessage">
          Your Messages
        </div>
      </div>
      <div className="inboxChatDefaultSubContainer">
        <div className="inboxChatDefaultSub">
          Send private photos and messages to a friend or group.
        </div>
      </div>
      <button className="inboxChatDefaultButton">Send Message</button>
    </div>
  )
}

export default InboxChatDefault;
