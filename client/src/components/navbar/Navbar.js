import React, { Component } from "react";
import "./navbar.css";
import logo from "../../img/circle.png";
import { Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Search from "../search/Search";
import spinner from "../common/spinner.gif";
import HomeIcon from "./navbarIcons/HomeIcon";
import ExploreIcon from "./navbarIcons/ExploreIcon";
import GalleryIcon from "./navbarIcons/GalleryIcon";
import AvatarIcon from "./navbarIcons/AvatarIcon";
import LogoutIcon from "./navbarIcons/LogoutIcon";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state={
      home: false,
      explore: false,
      gallery: false,
      avatarIcon: false,
    };
    this.logoutUserHandle = this.logoutUserHandle.bind(this);
  }

  logoutUserHandle(e) {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  }

  checkPathName(pathName, currentProfile) {
    if (pathName == "/home") {
      this.setState({
        home: true,
        explore: false,
        gallery: false,
        avatarIcon: false,
      });
    } else if (pathName == "/explore") {
      this.setState({
        home: false,
        explore: true,
        gallery: false,
        avatarIcon: false,
      });
    } else if (pathName == "/gallery") {
      console.log("hit gallery");
      this.setState({
        home: false,
        explore: false,
        gallery: true,
        avatarIcon: false,
      })
    } else if (currentProfile && pathName == `/profile/${currentProfile.handle}`) {
      this.setState({
        home: false,
        explore: false,
        gallery: false,
        avatarIcon: true,
      })
    } else {
      this.setState({
        home: false,
        explore: false,
        gallery: false,
        avatarIcon: false,
      })
    }
  }

  componentDidMount() {
    const pathName = this.props.history.location.pathname;
    this.checkPathName(pathName, this.props.profile.currentProfile);
  };
  componentWillReceiveProps(nextProps) {
    const pathName = nextProps.history.location.pathname;
    this.checkPathName(pathName, this.props.profile.currentProfile);
  }
  
  render() {
    // console.log(this.props.history);
    const {isAuthenticated, user} = this.props.auth;
    const { currentProfile } = this.props.profile;
    
    //Get real avatar of user from redux store
    const avatar = currentProfile ? currentProfile.user.avatar : spinner;
    const {home, explore, gallery, avatarIcon} = this.state;
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
              <LogoutIcon logoutUserHandle={this.logoutUserHandle}/>
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
}
   
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
       
 


