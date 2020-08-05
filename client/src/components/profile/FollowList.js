import React, { Fragment } from 'react'
import Followers from "../follow/Followers";
import Following from "../follow/Following";

function FollowList(props) {
  const {showFollowers, showFollowing, followingList, showFollowersList, showFollowingList, followers, following} = props;
  return (
    <Fragment>
      {showFollowers && <Followers
        showFollowers={showFollowers}
        followingList={followingList}
        close={showFollowersList}
        followers={followers}
      />}
      { showFollowing && <Following
        showFollowing={showFollowing}
        followingList={followingList}
        close={showFollowingList}
        following={following}
      />}
    </Fragment>
  )
}

export default FollowList
