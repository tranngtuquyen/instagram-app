import React from 'react';
import { Link } from 'react-router-dom';

function ExploreIcon(props) {
  const explore = props.explore;
  return (
    <Link to='/explore'>
      {!explore && <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cursor navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
      </svg>}
      {explore && <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cursor-fill navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
      </svg>}
    </Link>
  )
}

export default ExploreIcon;
