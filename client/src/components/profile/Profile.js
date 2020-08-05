import React, { Component, Fragment } from "react";
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

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showFollowers: false,
      showFollowing: false,
      change: false,
      posts: [],
      saved: false,
      postsIcon: true,
      savedIcon: false,
    };
  }
  showFollowersList = (e) => {
    this.setState({
      showFollowers: !this.state.showFollowers,
    });
  };
  showFollowingList = (e) => {
    this.setState({
      showFollowing: !this.state.showFollowing,
    });
  };
  showSettings = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  changeProfilePicture = (e) => {
    this.setState({
      change: !this.state.change,
    });
  };

  onDelete = (e) => {
    this.props.deleteAccount(this.props.history);
  };

  onRemove =(e) => {
    this.props.removeAvatar();
  }
  logoutUserHandle = (e) => {
    e.preventDefault();
    alert("Logging out..");
    // this.props.history.push("/");
    this.props.logoutUser();
  };

  componentDidMount() {
    if (this.props.profile !== null && !this.props.loading && !this.props.loadingPost && this.props.userPosts) {
      this.setState({
        posts: this.props.userPosts,
        saved: false
      });
    }
  }

  getPosts() {
    this.setState({
      posts: this.props.userPosts,
      saved: false,
      postsIcon: true,
      savedIcon: false,
    });
  }

  getSavedPosts() {
    this.setState({
      posts: this.props.profile.saved,
      saved: true,
      postsIcon: false,
      savedIcon: true,
    });
  }
  
  render() {
    let profileContent;
    let following = [];
    let followers = [];
    const { profile, loading, followingList, userPosts, loadingPost } = this.props;
    const { user } = this.props.auth;
    const {postsIcon, savedIcon, showFollowers, showFollowing} = this.state;
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
            <Link onClick={user.id === profile.user._id ? this.changeProfilePicture.bind(this) : false}>
              <img className='profile-photo'alt='profile-photo' src={profile.user.avatar} />
            </Link>
            <ProfilePicture
              change={this.state.change}
              close={this.changeProfilePicture}
              remove={this.onRemove}
            />
            <div className='d-flex flex-column space'>
              <h2 className='HandleName'>
                {profile.user.name}
                {user.id === profile.user._id && (
                  <ProfileButtons
                    showSettings={this.showSettings.bind(this)}
                    show={this.state.show}
                    onDelete={this.onDelete.bind(this)}
                    logoutUserHandle={this.logoutUserHandle.bind(this)} 
                  />
                )}
              </h2>
              <div className='textsize'>
                <span>
                  <Count
                    userPosts={userPosts}
                    showFollowersList={this.showFollowersList.bind(this)}
                    showFollowingList={this.showFollowingList.bind(this)}
                    followers={followers}
                    following={following}
                  />
                  {/* Show modal follow list */}
                  <FollowList
                    showFollowers={showFollowers}
                    showFollowing={showFollowing}
                    followingList={followingList}
                    showFollowersList={this.showFollowersList.bind(this)}
                    showFollowingList={this.showFollowingList.bind(this)}
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
            getPosts={this.getPosts.bind(this)}
            postsIcon={postsIcon}
            user={user}
            profile={profile}
            getSavedPosts={this.getSavedPosts.bind(this)}
            savedIcon={savedIcon}
            posts={this.state.posts}
            saved={this.state.saved}
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
