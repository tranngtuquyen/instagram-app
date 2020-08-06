import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

class ProfilePostItem extends Component {
  render() {
    const { tagged, saved } = this.props;

    return this.props.posts.map((post) => {
      // let id = this.props.saved === false ? post._id : post.postId;
      let id = saved === true ? post.postId : (tagged === true ? post.post : post._id); 
      return (
        <div>
          <div id='posts' className='col-lg-4 col-md-6 col-xs-12 col-xxs-12'>
            <Link to={`/post/${id}`}>
              <figure>
                <img src={post.image} alt='posts' style={{objectFit: "cover"}} />
              </figure>
            </Link>
          </div>
        </div>
      );
    });
  }
}

export default ProfilePostItem;
