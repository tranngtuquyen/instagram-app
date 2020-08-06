import React from 'react';
import { Link } from 'react-router-dom';

function AddPostIcon(props) {
  const addPost = props.addPost;
  return (
    <Link to='/create-post'>
      {!addPost && <svg width="0.9em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
        <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
        <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      </svg>}
      {addPost && <svg width="0.9em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
      </svg>}
    </Link>
  )
}

export default AddPostIcon;
