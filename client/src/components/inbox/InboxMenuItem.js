import React from 'react'
import { Link } from "react-router-dom";
import avatar from "../../img/avatar.png";

function InboxMenuItem(props) {
  return (
    <div className="inboxMenuItemContainer">
      <Link to="#" className="inboxMenuItemButton">
        <div className="inboxMenuItemInsideContainer">
          <div className="inboxMenuItemAvatarContainer">
            <div className="inboxMenuItemAvatar">
              <span className="inboxMenuItemSpan">
                <img src={avatar} style={{width: "100%", height: "100%"}}/>
              </span>
            </div>
          </div>
          <div className="inboxMenuItemHandleContainer">
            <div className="inboxMenuItemHandle">
              handle
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default InboxMenuItem;
