import React, { Component, useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../img/circle.png";
import { Link, withRouter, useLocation} from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Search from "../search/Search";
import spinner from "../common/spinner.gif";
import HomeIcon from "./navbarIcons/HomeIcon";
import ExploreIcon from "./navbarIcons/ExploreIcon";
import GalleryIcon from "./navbarIcons/GalleryIcon";
import AvatarIcon from "./navbarIcons/AvatarIcon";
import LogoutIcon from "./navbarIcons/LogoutIcon";

function Navbar (props) {
  let location = useLocation();
  let [home, setHome] = useState(false);
  let [explore, setExplore] = useState(false);
  let [gallery, setGallery] = useState(false);
  let [avatarIcon, setAvatar] = useState(false);
  
  useEffect(() => {
    if (location.pathname === "/home") {
      setHome(true);
      setExplore(false);
      setGallery(false);
      setAvatar(false);
    } else if (location.pathname === "/explore") {
      setHome(false);
      setExplore(true);
      setGallery(false);
      setAvatar(false);
    } else if (location.pathname === "/gallery") {
      setHome(false);
      setExplore(false);
      setGallery(true);
      setAvatar(false);
    } else if (props.profile.currentProfile && location.pathname === `/profile/${props.profile.currentProfile.handle}`) {
      setHome(false);
      setExplore(false);
      setGallery(false);
      setAvatar(true);
    } else {
      setHome(false);
      setExplore(false);
      setGallery(false);
      setAvatar(false);
    }
  }, [location, props.profile.currentProfile]);
  const logoutUserHandle = (e) => {
    e.preventDefault();
    props.logoutUser();
  }

  
  const {isAuthenticated, user} = props.auth;
  const { currentProfile } = props.profile;
  //Get real avatar of user from redux store
  const avatar = currentProfile ? currentProfile.user.avatar : spinner;

  //Put all navbar contents into variable "navbar" 
  const navbar = (
    <nav
      className='navbar navbar-light navbar-expand-lg'
      style={{ backgroundColor: "white", padding: "0px" }}
    >
      <div className='container'>
        <Link className='navbar-brand' to=''>
          <img className='logo-navbar' alt='Circle' src={logo} />
        </Link>

        <Search/>

        {/* Navbar Icons */}
        <ul style={{ marginTop: "auto", marginBottom: "auto" }}>
          <li>
            <HomeIcon home={home}/>
          </li>
          <li>
            <ExploreIcon explore={explore}/>
          </li>
          <li>
            <GalleryIcon gallery={gallery}/>
          </li>
          <li>
            <AvatarIcon currentProfile={currentProfile} avatarIcon={avatarIcon} avatar={avatar} />
          </li>
          <li>
            <LogoutIcon logoutUserHandle={(e) => logoutUserHandle(e)}/>
          </li>
        </ul>
      </div>
    </nav>
  );
    return (
      <div>
        {/* Check if user is isAuthenticated, if yes - show Navbar, if no - hide Navbar */}
        {isAuthenticated ? navbar : null}
      </div>
    );
}
   
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
       
 


