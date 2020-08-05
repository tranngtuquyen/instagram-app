import React, { Fragment } from 'react'
import {Link} from 'react-router-dom';

function Count(props) {
  const {userPosts, showFollowersList, showFollowingList, followers, following} = props;
  return (
    <Fragment>
      <Link to='#'>
        <b>{userPosts.length}</b> posts
      </Link>
      &nbsp; &nbsp; &nbsp;&nbsp;
      <Link onClick={followers.length ? showFollowersList : false}>
        <b>{followers.length}</b> followers
      </Link>
      &nbsp; &nbsp; &nbsp;
      <Link onClick={following.length ? showFollowingList : false}>
        <b>{following.length}</b> following
      </Link>
    </Fragment>
  )
}

export default Count;
