import React, { Fragment } from 'react'

function ProfileDesc(props) {
  const {profile} = props;
  return (
    <Fragment>
      <p style={{ marginTop: "20px" }} className='profileName'>
        {profile.handle}
      </p>
      <br />
      {profile.bio && (
        <div
          style={{
            wordBreak: "break-word",
            marginTop: "-30px",
            fontWeight: "400",
            fontStyle: "Roboto, Helvetica, Arial, sans-serif",
            fontSize: "16px",
            marginBottom: "5px",
          }}
        >
          {profile.bio}
        </div>
      )}
      {profile.website && (
        <span>
          <a
            href={profile.website}
            style={{ color: "rgba(var(--fe0,0,55,107),1)" }}
          >
            {profile.website}
          </a>
        </span>
      )}

      {/* Social network Links */}
      <span>
        {profile.social && profile.social.facebook && (
          <a href={profile.social.facebook}>
            <i className='fa fa-facebook-square'></i>
          </a>
        )}
        {profile.social && profile.social.youtube && (
          <a href={profile.social.youtube}>
            <i
              className='fa fa-youtube-play youtube'
              aria-hidden='true'
            ></i>
          </a>
        )}
        {profile.social && profile.social.twitter && (
          <a href={profile.social.twitter}>
            <i className='fa fa-twitter twitter' aria-hidden='true'></i>
          </a>
        )}
      </span>
    </Fragment>
  )
}

export default ProfileDesc;
