import React from 'react'

function SavedTab(props) {
  const {getSavedPosts, savedIcon} = props;
  return (
    <div type="button" onClick={getSavedPosts} className={`profileTab ${savedIcon ? "activeStyle" : ""}`}>
    <i className={`fa fa-bookmark-o ${savedIcon ? "activeTextStyle" : ""}`} aria-hidden='true' style={savedIcon ? {color: "black"}: {}}>
      <span style={{ marginLeft: "5px", fontFamily: "sans-serif" }}>
        SAVED
      </span>
    </i>
  </div>
  )
}
export default SavedTab;
