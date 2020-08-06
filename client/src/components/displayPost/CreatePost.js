import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import defaultImage from "../../img/defaultImage.jpg";
import classnames from 'classnames';
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";

function CreatePost(props) {
  const [image, setImage] = useState("");
  const [showDefault, setShowDefault] = useState(true);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [fileData, setFileData] = useState(new FormData());
  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors])
  // Get user uploaded file
  const uploadImage = e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "circle");
    setFileData(data);
    setShowDefault(false);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    // POST image to cloudinary through the cloudinary API and append image
    fetch(
      "https://api.cloudinary.com/v1_1/dk8wp0lsh/image/upload",
      {
        method: "POST",
        body: fileData,
      }
    )
    .then(res => res.json())
    .then(result => {
      const newPost = {
        text: text,
        image: result.secure_url
      };
  
      props.addPost(newPost, props.history, props.profile.currentProfile.handle);
    })
    
  }
  const {currentProfile} = props.profile;

  return (
    <div className="container" style={{marginTop: "30px"}}>
      <div className="row">
        <div className="col-md-4 col-sm-12 d-flex flex-column">

          <input
            type='file'
            name='file'
            onChange={uploadImage}
            style={{ marginBottom: "20px", marginTop: "10px" }}
            accept="image/*"
          />
          
          {image && <img src={image} style={{width: "100%", marginTop: "20px"}}/>}
          {showDefault && <img src={defaultImage} className="create-post-default-image-style" alt="default image"/>}
          {errors.image && (
            <div style={{color: "red", fontSize: "80%"}}>{errors.image}</div>
          )}
        </div>
        <div className="d-flex flex-column col-md-8 col-sm-12">
          <p style={{fontSize: "1.75rem"}}>Create New Post</p>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label className='col-form-label'>Description</label>
              <textarea
                type='text'
                name='text'
                placeholder="Description"
                style={{width: "93%", height: "200px"}}
                value={text}
                onChange={onChange}
                className={classnames("form-control ", {
                  "is-invalid": errors.text,
                })}
              />
              {errors.text && (
                <div className='invalid-feedback'>{errors.text}</div>
              )}
            </div>

            <div style={{ marginTop: "30px" }}>
              <input
                type='submit'
                value='Post'
                className='btn btn-primary'
                style={{ marginRight: "10px" }}
              />
              <Link to={`/profile/${currentProfile.handle}`} className='btn btn-secondary'>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  profile: state.profile,
});

export default connect(mapStateToProps, { addPost })(withRouter(CreatePost));
