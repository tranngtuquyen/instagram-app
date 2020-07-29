import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "../../img/avatar.png"
import "./home.css"; 
import { connect } from "react-redux";
import SuggestionLists from "./SuggestionLists";
import { getSuggestionList } from "../../actions/profileActions";
import Comments from "../displayPost/Comments";
import AddComment from "../displayPost/AddComment";
import Moment from "react-moment"; 
import { getPost } from "../../actions/postActions";
import { addLike ,removeLike} from "../../actions/postActions";
import { savePost, unsavePost } from "../../actions/postActions";
import PropTypes from 'prop-types';
import Spinner from "../common/Spinner";

class PostItem extends Component {
  
         constructor() {
           super();
           this.state = {
             follow: false,
             
           };
          
         }
         componentDidMount() {
           this.props.getSuggestionList();
           
         }       

         render() {
           const { post, auth,postId, loadingPost, profile} = this.props;    
           let suggestionList;
           if (profile.profiles && profile.profiles.length > 0) {
            suggestionList = <SuggestionLists profiles={profile.profiles}/>
           } 
           let alreadyLiked = false;
           if (post.likes !== undefined) {
             if (post.likes.filter(like => like.user === this.props.auth.user.id).length > 0) {
               alreadyLiked = true;
             }
           }
           let alreadySaved = false;
           if (post.saved !== undefined) {
             if (post.saved.filter(save => save.user === this.props.auth.user.id).length > 0) {
               alreadySaved = true;
             }
           }

           const icons = (
             <div>
               {alreadyLiked === true ? (
                 <div type='button' className='icons-post'>
                   <i
                     onClick={() => {
                       this.props.removeLike(post._id);
                     }}
                     className='fa fa-heart'
                     style={{ fontSize: "1.5em", color: "red" }}
                     aria-hidden='true'
                   ></i>
                 </div>
               ) : (
                   <div
                     type='button'
                     onClick={() => this.props.addLike(post._id)}
                     className='icons-post'
                   >
                     <i
                       className='fa fa-heart-o'
                       style={{ fontSize: "1.5em", color: "black" }}
                       aria-hidden='true'
                     ></i>
                   </div>
                 )}
               <div type='button' className='icons-post'>
                 <i
                   style={{ fontSize: "1.5em" }}
                   className='fa fa-comment-o'
                   aria-hidden='true'
                 ></i>
               </div>               
               {alreadySaved === true ? (
                 <div type='button' className='icons-post'>
                   <i
                     onClick={() => {
                       this.props.unsavePost(post._id);
                     }}
                     className='fa fa-bookmark'
                     style={{ fontSize: "1.5em" }}
                     aria-hidden='true'
                   ></i>
                 </div>
               ) : (
                   <div
                     type='button'
                     onClick={() => this.props.savePost(post._id)}
                     className='icons-post'
                   >
                     <i
                       className='fa fa-bookmark-o'
                       style={{ fontSize: "1.5em", color: "black" }}
                       aria-hidden='true'
                     ></i>
                   </div>
                 )}           
             </div>
           );
           let content;
           if (loadingPost) {
             content = <Spinner />
           } else {
             content = (
               <div class='container-fluid'>
                 <div class='row'>
                   <div class='offset-sm-1 '>
                     <div className='card-header'>
                       <Link to='#'>
                         <img
                           className='avatar-icon'
                           src={post.avatar}
                           alt='Avatar'
                         />
                       </Link>
                       <Link to='' className='name-of-account'>
                         {post.name}
                       </Link>
                       <hr style={{ marginBottom: "10px" }} />
                       <img className='card-img-top' src={post.image} />
                       {/*  post description & comments on post */}
                       <div className='comment-wrapper'>
                         <section className='row'>
                           <section id='icons'>
                             {/* Show like, save icons */}
                             {icons}

                             <div className='textStyle-date'>
                               <div
                                 style={{
                                   fontWeight: "600",
                                   fontSize: "1.4em",
                                   color: "black",
                                   marginLeft: "10px",
                                 }}
                               >
                                 {post.likes && post.likes.length} Likes
                               </div>
                             </div>
                           </section>
                           {/* <!-- post description start--> */}

                           <div className='col-lg-10'>
                             <div id='col-space'>
                               <Link className='handlename-post' to=''>
                                 {post.name}
                               </Link>
                               <span className='textStyle-comment'>
                                 &nbsp; {post.text}
                               </span>
                             </div>
                           </div>
                           {/* <!-- post description end--> */}
                           {/* comments on post */}
                           <Comments
                             comments={post.comments}
                             postId={postId}
                             showAvatar={true}
                           />
                         </section>
                         <hr />

                         <AddComment postId={postId} />
                       </div>
                     </div>
                   </div>
                   {/* Suggestions*/}
                   <div
                     className='col-auto fixed'
                     style={{
                       marginTop: "20px",
                       marginLeft: "10px",
                       backgroundColor: "#fafafa",
                       width: "300px",
                       height: "400px",
                       border: "none",
                       float: "right",
                     }}
                   >
                     {/* Avatar of current user */}
                     <div
                       className='card-header'
                       style={{
                         backgroundColor: "#fafafa",
                         border: "none",
                       }}
                     >
                       <Link to='/current-profile'>
                         <img
                           className='avatar-icon'
                           src={auth.user.avatar}
                           alt='Avatar'
                           style={{
                             marginLeft: ".5px",
                             width: "60px",
                           }}
                         />
                       </Link>
                       <Link to='/current-profile' className='name-of-account'>
                         {auth.user.name}
                       </Link>
                     </div>

                     {/* Suggestions lists */}
                     <div
                       style={{
                         marginLeft: "10px",
                         color: "gray",
                         fontWeight: "600",
                       }}
                     >
                       Suggestions For You
                       <Link
                         to='/explore'
                         style={{ float: "right", color: "black" }}
                       >
                         See All
                       </Link>
                     </div>

                     {/* <SuggestionLists profiles={profile.profiles}/> */}
                     {suggestionList}
                   </div>
                 </div>
               </div>
             );
         }
    return (
      <div >
        {content}
      </div>
    );
  }
}
PostItem.propTypes = {
  
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  
});

export default connect(mapStateToProps, { getSuggestionList,getPost,addLike,removeLike,savePost,unsavePost})(PostItem);
