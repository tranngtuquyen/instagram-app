import React from 'react'

function TagTab(props) {
  const {getTaggedPosts, tagIcon} = props;
  return (
    <div type="button" onClick={getTaggedPosts} className={`profileTab ${tagIcon ? "activeStyle" : ""}`}>
      <i className='far fa-user-circle' aria-hidden='true'>
        <span style={{ marginLeft: "5px", fontFamily: "sans-serif" }}>
          TAGGED
        </span>
      </i>
    </div>
  )
}

export default TagTab;
