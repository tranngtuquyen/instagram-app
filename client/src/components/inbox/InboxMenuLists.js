import React from 'react'
import InboxMenuItems from './InboxMenuItems'

function InboxMenuLists(props) {
  return (
    <div className="inboxMenuListsInsideContainer">
      <div className="inboxMenuListsFirst">
        <div className="inboxMenuListsSecond">
          <InboxMenuItems />
        </div>
      </div>
    </div>
  )
}

export default InboxMenuLists;
