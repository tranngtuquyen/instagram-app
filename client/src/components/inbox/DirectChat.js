import React, { Fragment } from 'react'
import DirectChatHeader from './DirectChatHeader'
import DirectChatBody from './DirectChatBody'

function DirectChat(props) {
  return (
    <Fragment>
      <DirectChatHeader />
      <DirectChatBody />
    </Fragment>
  )
}

export default DirectChat;