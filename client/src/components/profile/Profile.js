import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import { deleteAccount, getFollowingList } from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
import ProfilePicture from "./ProfilePicture";
import { removeAvatar } from "../../actions/profileActions";
import ProfileDesc from "./subComponents/ProfileDesc";
import FollowList from "./FollowList";
import Count from "./subComponents/Count";
import ProfileButtons from "./ProfileButtons";
import ProfilePosts from "./ProfilePosts";

function Profile(props) {
  const [show, setShow] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [change, setChange] = useState(false);
  const [posts, setPosts] = useState([]);
  const [saved, setSaved] = useState(false);
  const [postsIcon, setPostsIcon] = useState(true);
  const [savedIcon, setSavedIcon] = useState(false);
  useEffect(() => {
    setPosts(props.userPosts);
  }, [props.userPosts])

  const showFollowersList = (e) => {
    setShowFollowers(!showFollowers);
  };
  
  const showFollowingList = (e) => {
    setShowFollowing(!showFollowing);
  };

  const showSettings = (e) => {
    setShow(!show);
  };
  
  const changeProfilePicture = (e) => {
    setChange(!change);
  };

  const onDelete = (e) => {
    props.deleteAccount(this.props.history);
  };

  const onRemove =(e) => {
    props.removeAvatar();
  }
  const logoutUserHandle = (e) => {
    e.preventDefault();
    alert("Logging out..");
    props.logoutUser();
  };
  
  const getPosts = () => {
    setPosts(props.userPosts);
    setSaved(false);
    setPostsIcon(true);
    setSavedIcon(false);
  }

  const getSavedPosts = () => {
    setPosts(props.profile.saved);
    setSaved(true);
    setPostsIcon(false);
    setSavedIcon(true);
  }
  
  let profileContent;
  let following = [];
  let followers = [];
  const { profile, loading, followingList, userPosts, loadingPost } = props;
  const { user } = props.auth;
  // filtering out deleted profiles
  if(profile.following.length > 0) {
    following = profile.following.filter(item => item.user !== null)
  } 
  if (profile.followers.length > 0) {
    followers = profile.followers.filter(item=> item.user !== null);
  }
  if (profile === null || loading || loadingPost || !userPosts) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <Fragment>
        <div className='margin'>
          {/* Avatar */}
          <Link onClick={user.id === profile.user._id ? changeProfilePicture : false}>
            <img className='profile-photo'alt='profile-photo' src={profile.user.avatar} />
          </Link>
          <ProfilePicture
            change={change}
            close={changeProfilePicture}
            remove={onRemove}
          />
          <div className='d-flex flex-column space'>
            <h2 className='HandleName'>
              {profile.user.name}
              {user.id === profile.user._id && (
                <ProfileButtons
                  showSettings={showSettings}
                  show={show}
                  onDelete={onDelete}
                  logoutUserHandle={logoutUserHandle} 
                />
              )}
            </h2>
            <div className='textsize'>
              <span>
                <Count
                  userPosts={userPosts}
                  showFollowersList={showFollowersList}
                  showFollowingList={showFollowingList}
                  followers={followers}
                  following={following}
                />
                {/* Show modal follow list */}
                <FollowList
                  showFollowers={showFollowers}
                  showFollowing={showFollowing}
                  followingList={followingList}
                  showFollowersList={showFollowersList}
                  showFollowingList={showFollowingList}
                  followers={followers}
                  following={following}
                />
                
              </span>
            </div>
            {/* Profile description */}
            <ProfileDesc profile={profile}/>
          </div>
        </div>
        {/* <hr className='horizontalLine' /> */}
        <ProfilePosts 
          getPosts={getPosts}
          postsIcon={postsIcon}
          user={user}
          profile={profile}
          getSavedPosts={getSavedPosts}
          savedIcon={savedIcon}
          posts={posts}
          saved={saved}
        />
      </Fragment>
    );
    }
  
    return (
      <div>
        <div className='container'>
          {profileContent}
 
        </div>
      </div>
    );
}

Profile.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
 const mapStateToProps = (state) => ({ 
   auth: state.auth
 });
export default connect(mapStateToProps, {
  deleteAccount,
  logoutUser,
  getFollowingList,
  removeAvatar,
})(Profile);
