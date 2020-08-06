import React, { useState, useEffect , Fragment } from "react";
import Profile from "./Profile";
import { getOtherUsersPosts } from "../../actions/postActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfileByHandle, getFollowingList, getTagPostsProfile } from '../../actions/profileActions';
import { withRouter } from "react-router-dom";

function HandleProfile(props) {
  useEffect(() => {
    props.getProfileByHandle(props.match.params.handle, props.history);
    props.getOtherUsersPosts(props.match.params.handle);
    props.getFollowingList();
    props.getTagPostsProfile(props.match.params.handle);
  }, [props.match.params.handle]);

  const { profile, loading, followingList, tagPosts } = props.profile;
  let content;
  const { userPosts, loadingPost } = props.post;

  if (loading || loadingPost || profile === null || userPosts === null || followingList === null || tagPosts === null) {
    content = ( <Spinner /> )
  } else {
    content = (
      <div>
        <Profile
          profile={profile}
          loading={loading}
          userPosts={userPosts}
          loadingPost={loadingPost}
          isCurrentProfile={true}
          followingList={followingList}
          tagPosts={tagPosts}
        />
      </div>
    );
  }
  return <div style={{minHeight: "90vh"}}> {content}</div>;
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getOtherUsersPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  // auth: state.auth,
  profile: state.profile,
  post: state.post,
});
export default connect(mapStateToProps, {
  getOtherUsersPosts,
  getProfileByHandle,
  getFollowingList,
  getTagPostsProfile
})(withRouter(HandleProfile));
