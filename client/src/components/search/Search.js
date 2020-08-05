import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./search.css";
import { getAllProfiles } from "../../actions/profileActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from '../common/Spinner';
import { useState } from 'react';

function Search (props) {
  const [searchMenu, setSearchMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
    
  const showMenu = (event) => {
    event.preventDefault();
    setSearchMenu(true);
    setSearchInput(event.target.value);
    document.addEventListener('click', closeMenu);
    props.getAllProfiles();
  }
  
  const closeMenu = (event) => {
    setSearchMenu(false);
    setSearchInput("");
    document.removeEventListener('click', closeMenu); 
  }
  
  const {search, loading} = props.profile;
    const {auth} = props;
    let content;
    if(search === null || loading){
      content = <Spinner />;
    }
    if(search !== null && search.length > 0) {
      const searchProfiles = search.filter(profile => {
        return profile.user.name.toLowerCase().includes(searchInput.toLowerCase()) && profile.user._id !== auth.user.id;
      });
      if (searchProfiles.length === 0) {
        content = <div style={{textAlign: "center", fontSize: "14px"}}>No search result</div>
      } else {
        content = searchProfiles.map(profile =>  {
          return (
          <Link  to={`/profile/${profile.handle}`} className="searchOption">
            <div className="searchData">
              <div className="searchAvatarBox">
                <img className="searchAvatar" src={profile.user.avatar}/>
              </div>
              <div className="searchNameBox">
                <div className="searchName">{profile.user.name}</div>
                <div className="searchHandle">{profile.handle}</div>
              </div>
            </div>
          </Link>
        )});
      }
    }
  return (
    <div className='searchBox d-none d-xl-block'>
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getAllProfiles,
})(Search);