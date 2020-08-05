import React from 'react'
import { Link } from "react-router-dom";

function AddPostTab(props) {
  return (
    <Link to='/create-post' className="profileTab">
    <i className='far fa-plus-square'>
      <span
        style={{
          marginLeft: "5px",
          fontFamily: "sans-serif",
        }}
      >
        ADD POST
      </span>
    </i>
  </Link>
  )
}
export default AddPostTab
