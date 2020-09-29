import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import "./search.css";
import { getAllProfiles, searchProfiles } from "../../actions/profileActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from '../common/Spinner';
import { useState } from 'react';

function Search (props) {
  const [searchMenu, setSearchMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  //delay the search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      props.searchProfiles(searchInput.toLowerCase());
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchInput])

  const showMenu = (event) => {
    event.preventDefault();
    let searchTerm = event.target.value;
    if (searchTerm.length > 0) {
      setSearchMenu(true);
      setSearchInput(searchTerm);
      document.addEventListener('click', closeMenu);
    } else {
      setSearchMenu(false);
      setSearchInput("");
    }
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
  if(search !== null) {
    if (search.length > 0) {
      const searchProfiles = search.filter(profile => {
        return profile.user.name.toLowerCase() && profile.user._id !== auth.user.id;
      });
      if (searchProfiles.length > 0) {
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
      } else {
        content = <div style={{textAlign: "center", fontSize: "14px"}}>No search result</div>
      }
    } else {
      content = <div style={{textAlign: "center", fontSize: "14px"}}>No search result</div>
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
  getAllProfiles, searchProfiles
})(Search);