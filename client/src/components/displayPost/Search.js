import React, { useState, Fragment } from 'react';
import {Link} from "react-router-dom";
import "./search.css";
import { getFollowingList } from "../../actions/profileActions";
import { tagToPost } from "../../actions/postActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from '../common/Spinner';

function Search (props) {
  const [searchMenu, setSearchMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showInput, setShowInput] = useState(true);
    
  const showMenu = (event) => {
    event.preventDefault();
    setSearchMenu(true);
    setSearchInput(event.target.value);
    document.addEventListener('click', closeMenu);
  }
  
  const closeMenu = (event) => {
    setSearchMenu(false);
    setSearchInput("");
    setShowInput(false);
    document.removeEventListener('click', closeMenu); 
  }

  const tagUser = (profileId) => {
    const newTag = {
      leftX: props.x/600,
      topY: props.y/600,
    };
    props.tagToPost(props.postId, profileId, newTag);
  }
  
  const {currentProfile, loading} = props.profile;
  const followingList = currentProfile.following;
  const {auth} = props;
  let content;
  if(followingList === null || loading){
    content = <Spinner />;
  }
  if(followingList !== null && followingList.length > 0) {
    const searchProfiles = followingList.filter(profile => {
      return profile.handle.toLowerCase().includes(searchInput.toLowerCase());
    });
    if (searchProfiles.length === 0) {
      content = <div style={{textAlign: "center", fontSize: "14px"}}>No search result</div>
    } else {
      content = searchProfiles.map(profile =>  {
        return (
        <Link  to="#" className="searchOption" onClick={() => tagUser(profile.profile)}>
          <div className="searchData">
            <div className="searchAvatarBox">
              <img className="searchAvatar" src={profile.user.avatar}/>
            </div>
            <div className="searchNameBox">
              <div className="searchName">{profile.name}</div>
              <div className="searchHandle">{profile.handle}</div>
            </div>
          </div>
        </Link>
      )});
    }
  }
  const searchStyle={
    width: "200px",
    position: "absolute",
    top: props.y + "px",
    left: props.x + "px",
  }
  return (
    <Fragment>
      {showInput && <div style={searchStyle}>
        <span className='fa fa-search searchIcon'></span>
        <input
          className='searchInput'
          type='search'
          placeholder='Search..'
          onChange={showMenu}
          value={searchInput}
        />

        {searchMenu ? (
          <div className='searchDropDown'>
            <div
              className='searchDropDownMenu'
            >
              <div className='searchOptions'>{content}</div>
            </div>
          </div>
        ) : null}
      </div>}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getFollowingList, tagToPost
})(Search);