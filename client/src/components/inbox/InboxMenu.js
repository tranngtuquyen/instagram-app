import React from 'react'
import InboxTitle from './InboxTitle'
import InboxMenuLists from './InboxMenuLists'

function InboxMenu(props) {
  return (
    <div className="inboxMenuContainer">
      <div className="inboxMenuTitleContainer">
        <InboxTitle />
      </div>
      <div className="inboxMenuListsContainer">
        <InboxMenuLists />
      </div>
    </div>
  )
}

export default InboxMenu;
