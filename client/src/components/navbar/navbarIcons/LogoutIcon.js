import React from 'react';
import { Link } from 'react-router-dom';

function LogoutIcon(props) {
  const {logoutUserHandle} = props;

  return (
    <Link
      onClick={logoutUserHandle}
    >
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-box-arrow-right navbarIcon" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M11.646 11.354a.5.5 0 0 1 0-.708L14.293 8l-2.647-2.646a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"/>
        <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
        <path fillRule="evenodd" d="M2 13.5A1.5 1.5 0 0 1 .5 12V4A1.5 1.5 0 0 1 2 2.5h7A1.5 1.5 0 0 1 10.5 4v1.5a.5.5 0 0 1-1 0V4a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 1 1 0V12A1.5 1.5 0 0 1 9 13.5H2z"/>
      </svg>
    </Link>
  )
}
export default LogoutIcon;
