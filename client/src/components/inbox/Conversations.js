import React from 'react'
import ConversationItem from './ConversationItem';

function Conversations(props) {
  const arr = [1,2,3,4,5,6,7,8,9];
  const content = arr.map(item => <ConversationItem />);
  return (
    <div>
      {content}
    </div>
  )
}
export default Conversations;
