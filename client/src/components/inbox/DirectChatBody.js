import React from 'react'
import ConversationBox from './ConversationBox'
import AddMessage from './AddMessage'

function DirectChatBody(props) {
  return (
    <div className="directChatBodyFirstContainer">
      <div className="directChatBodySecondContainer">
        <ConversationBox />
      </div>
      <div className="directChatBodyThirdContainer">
        <AddMessage />
      </div>
    </div>
  )
}

export default DirectChatBody;
