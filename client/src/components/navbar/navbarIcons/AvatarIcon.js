import React from 'react';
import { Link } from 'react-router-dom';

function AvatarIcon(props) {
  const { currentProfile, avatarIcon, avatar} = props;
  return (
    <Link to={currentProfile ? `/profile/${currentProfile.handle}` : "/home"}>
      {!avatarIcon && <img className='avatar navbarIcon' src={avatar} alt='Avatar' />}
      {avatarIcon && <img className='avatar navbarIcon' src={avatar} alt='Avatar'  style={{border: "1px solid black", padding: "1.5px"}}/>}
    </Link>
  )
}

export default AvatarIcon;
