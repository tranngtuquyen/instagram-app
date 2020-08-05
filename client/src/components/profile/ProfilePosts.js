import React, { Fragment } from 'react'
import PostTab from './subComponents/PostTab';
import AddPostTab from './subComponents/AddPostTab';
import SavedTab from './subComponents/SavedTab';
import TagTab from './subComponents/TagTab';
import ProfilePostItem from './ProfilePostItem';
import NoPost from './subComponents/NoPost';

function ProfilePosts(props) {
  const {getPosts, postsIcon, user, profile, getSavedPosts, savedIcon, posts, saved} = props;

  return (
    <Fragment>
      {/* Profile tabs */}
      <div className='profileTabs icons'>
        <PostTab getPosts={getPosts} postsIcon={postsIcon}/>
        {user.id === profile.user._id && <AddPostTab />}
        {user.id === profile.user._id && <SavedTab getSavedPosts={getSavedPosts} savedIcon={savedIcon}/>}
        <TagTab />
      </div>

      {/* Show posts */}
      {posts.length > 0 ? (
        <section className='row responsiveness hover-effect'>
          <ProfilePostItem posts={posts} saved={saved} />
        </section>
      ) : (
        <NoPost />
      )}
    </Fragment>
  )
}

export default ProfilePosts;

