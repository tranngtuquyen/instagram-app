import React from 'react'

function PostTab(props) {
  const {getPosts, postsIcon} = props;
  return (
    <div
      type='button'
      onClick={getPosts}
      className={`profileTab ${postsIcon ? "activeStyle" : ""}`}
    >
      <i
        className='fa fa-picture-o'
        aria-hidden='true'
        style={postsIcon ? { color: "black" } : {}}
      >
        <span style={{ marginLeft: "5px", fontFamily: "sans-serif" }}>
          POSTS
        </span>
      </i>
    </div>
  )
}

export default PostTab;
