import React from 'react'
import InboxMenuItem from './InboxMenuItem';

function InboxMenuItems(props) {
  const arr = [1,2,3];
  const content = arr.map(item => <InboxMenuItem />);
  return (
    <div className="inboxMenuListsThird">
      {content}
    </div>
  )
}

export default InboxMenuItems;
