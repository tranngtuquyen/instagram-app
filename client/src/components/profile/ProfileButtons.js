import React from 'react'
import {Link} from 'react-router-dom';
import Settings from './Settings';

function ProfileButtons(props) {
  const {showSettings, show, onDelete, logoutUserHandle} = props;
  return (
    <span>
      <Link
        to='/edit-profile'
        type='button'
        className='btn profileButton'
      >
        Edit profile
      </Link>
      <Link onClick={showSettings}>
        <i
          style={{ fontSize: "1.5rem", color: "black" }}
          className='fas fa-cog'
        ></i>
      </Link>
      <Settings
        show={show}
        close={showSettings}
        onDelete={onDelete}
        onLogout={logoutUserHandle}
      />
    </span>
  )
}
export default ProfileButtons;
