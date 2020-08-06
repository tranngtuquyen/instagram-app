import React, { useState, useEffect } from "react";
import "./post.css";
import { Link, useParams } from "react-router-dom";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { connect } from "react-redux";
import { getPost, deletePost, getTagPosts, refreshPost } from "../../actions/postActions";
import Moment from "react-moment"; 
import Spinner from "../common/Spinner";
import {addLike, removeLike, savePost, unsavePost} from "../../actions/postActions";
import TagItem from "./TagItem";
import TagList from "./TagList";
import Search from "./Search";

function Post(props) {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [tag, setTag] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    props.getPost(id, props.history);
    props.getTagPosts(id);
  }, []);
  
  const onDeletePost = (postId, history) => {
    props.deletePost(postId, history);
  }

  const tagClick = (e) => {
    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);
    setShowSearch(!showSearch);
  }

  const {post, loadingPost, tagPosts} = props.post;
  const postId = props.match.params.id;
  
  let content;
  if (loadingPost || post === null || tagPosts === null) {
    content = <Spinner />
  } 
  if (post && post.user && tagPosts) {
    let deleteIcon;
    let alreadyLiked = false;
    if(post.likes !== undefined) {
      if(post.likes.filter(like => like.user === props.auth.user.id).length > 0)
      {
        alreadyLiked = true;
      }
    }
    let alreadySaved = false;
    if (post.saved !== undefined) {
      if (
        post.saved.filter((save) => save.user === props.auth.user.id)
          .length > 0
      ) {
        alreadySaved = true;
      }
    }
 
    if (post.user._id === props.auth.user.id) {
      deleteIcon = (
        <div
          type='button'
          className='delete-post'
          onClick={() => onDeletePost(post._id, props.history)}
        >
          <i
            style={{
              fontSize: "1.5em",
              float: "right",
              padding: "5px",
              marginTop: "-3px",
              fontWeight: "lighter",
            }}
            className='fa fa-trash'
            aria-hidden='true'
          ></i>
        </div>
      );
    }

    const opaqueTagIcon = {
      left: "20px", 
      top: "550px", 
      position: "absolute",
      opacity: "0.5",
    };
    const tagIcon = {
      left: "20px", 
      top: "550px", 
      position: "absolute",
    }

    const tagIconClick = () => {
      setTag(!tag);
    }

    const icons = (
      <div>
        {alreadyLiked === true ? (
          <div type='button' className='icons-post'>
            <i
              onClick={() => {
                props.removeLike(post._id);
              }}
              className='fa fa-heart'
              style={{ fontSize: "1.5em", color: "red" }}
              aria-hidden='true'
            ></i>
          </div>
        ) : (
          <div
            type='button'
            onClick={() => props.addLike(post._id)}
            className='icons-post'
          >
            <i
              className='fa fa-heart-o'
              style={{ fontSize: "1.5em", color: "black" }}
              aria-hidden='true'
            ></i>
          </div>
        )}
        
        {alreadySaved === true ? (
          <div type='button' className='icons-post'>
            <i
              onClick={() => {
                props.unsavePost(post._id);
              }}
              style={{ fontSize: "1.5em" }}
              className='fa fa-bookmark'
              aria-hidden='true'
            ></i>
          </div>
        ) : (
          <div type='button' className='icons-post'>
            <i
              onClick={() => {
                props.savePost(post._id);
              }}
              style={{ fontSize: "1.5em" }}
              className='fa fa-bookmark-o'
              aria-hidden='true'
            ></i>
          </div>
        )}

        {/* delete post */}
        {deleteIcon}
      </div>
    );
      content = (
        <div className='child'>
          <div className='container-post'>
              <div style={{position: "relative"}}>
              <img
                className='size-of-image'
                src={post.image}
                onClick={post.user._id === props.auth.user.id ? tagClick : false}
              />
              {/* Tag icon */}
              <div style={tag ? tagIcon : opaqueTagIcon} onClick={tagIconClick}>
                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-tags-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 7.586 1H3zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  <path d="M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                </svg>
              </div>
              {/* Tag */}
              {tagPosts && tag && <TagList tags={tagPosts}/>}
              {showSearch && <Search x={x} y={y} postId={postId}/>}
            </div>
            
            <div className='style d-none d-xl-block d-md-none d-lg-none d-sm-none '>
              <Link to={`/profile/${post.handle}`}>
                <img className='avatar-icon' src={post.user.avatar} alt='Avatar' />
              </Link>
              <Link to={`/profile/${post.handle}`} className='name-of-account'>
                {post.name}
              </Link>
              <hr style={{ marginBottom: "10px" }} />


              {/*  post description & comments on post */}
              <div>
                <section className='row'>
                  {/* <!-- post description start--> */}

                  <div className='col-lg-2'>
                    <Link to={`/profile/${post.handle}`}>
                      <img className='avatar-icon' src={post.user.avatar} alt='Avatar' />
                    </Link>
                  </div>
                  <div className='col-lg-10'>
                    <div id='col-space'>
                      <Link className='handlename-post' to={`/profile/${post.handle}`}>
                        {post.name}
                      </Link>
                      <span className='textStyle-comment'>
                        &nbsp; {post.text}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
               {/* <!-- post description end--> */}

               {/* comments on post */}
              <div className='comment-wrapper'>
                <section>
                  <Comments comments={post.comments} postId={postId} 
                  // showAvatar={true}
                  />
                </section>
              </div>
              
              <div id='footer'>
                <hr />
                <section>
                  {/* Show like, save, delete icons */}
                  {icons}
                </section>
                <div className='post-textStyle-date'>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "1.4em",
                      color: "black",
                    }}
                  >
                    {post.likes && post.likes.length} Likes
                  </div>
                  <Moment format="D MMM YYYY">{post.date}</Moment>
                </div>
                <hr />
                <AddComment postId={postId}/>
                
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className='parent' style={{minHeight: "90vh"}}>
        {content}
      </div>
    );
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { refreshPost, getPost, deletePost, addLike, removeLike, savePost, unsavePost, getTagPosts })(Post);
