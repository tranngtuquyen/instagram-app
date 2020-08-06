import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import defaultImage from "../../img/defaultImage.jpg";
import classnames from "classnames";
import { connect } from "react-redux";
import { addPicture } from "../../actions/profileActions";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import is_empty from "../../validation/is-empty";

class UploadAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDefault: true,
      fileData: new FormData(),
      src: null,
      crop: {
        unit: "%",
        width: "300",
        aspect: 1 / 1,
      },
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const {currentProfile} = this.props.profile;
    if (currentProfile) {
      this.setState({croppedImageUrl: currentProfile.user.avatar});
    }
  }
  componentWillReceiveProps(nextProps) {
    const {currentProfile} = nextProps.profile;
    if (currentProfile) {
      this.setState({croppedImageUrl: currentProfile.user.avatar});
    }
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      this.uploadImage(croppedImageUrl);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL("image/jpeg");
  }
  // upload cropped image to cloudinary
  uploadImage = (croppedImageUrl) => {
    const data = new FormData();
    data.append("file", croppedImageUrl);
    data.append("upload_preset", "circle");
    this.setState({
      fileData: data,
      showDefault: false,
      // image: URL.createObjectURL(croppedImageUrl),
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = () => {
    // e.preventDefault();
    fetch("https://api.cloudinary.com/v1_1/dk8wp0lsh/image/upload", {
      method: "POST",
      body: this.state.fileData,
    })
      .then((res) => res.json())
      .then((result) => {
        const newPic = {
          avatar: result.secure_url,
        };
        this.props.addPicture(newPic, this.props.history);
      });
  };

  render() {
    const { crop, src, croppedImageUrl } = this.state;
    const {upload, closeUpload} = this.props;
    const enabled = !is_empty(this.state.src);
    if (!upload) {
      return null;
    }
    return (
      <div className="firstsetupload">
        <div className="thirdset">
          <div className="containerset" style={{height: "500px", width: "600px"}}>
          <div style={{justifyContent: "center", marginLeft: "auto", marginRight: "auto"}}>
            <div className="container"
              style={{ marginTop: "30px", position: "relative" }}
            >
              <div className='row'>
                <div className='col-md-6 col-sm-12 d-flex flex-column'>
                  <input
                    type='file'
                    name='file'
                    // onClick={e => this.uploadImage}
                    style={{ marginBottom: "20px", marginTop: "10px" }}
                    accept='image/*'
                    onChange={this.onSelectFile}
                    required
                  />
                  {src && (
                    <ReactCrop
                      src={src}
                      crop={crop}
                      // ruleOfThirds
                      onImageLoaded={this.onImageLoaded}
                      onComplete={this.onCropComplete}
                      onChange={this.onCropChange}
                    />
                  )}
                  {this.state.showDefault && (
                    <img
                      src={defaultImage}
                      className='create-post-default-image-style'
                      alt='default image'
                      style={{marginTop: "0px"}}
                    />
                  )}
                </div>{" "}
                <div className="col-md-6 col-sm-12 d-flex flex-column">
                  <div style={{marginLeft: "20px"}}>
                    {/* Show cropped image */}
                    <div style={{marginTop: "2px"}}><span style={{fontSize: "1.75rem"}}>Update Avatar</span></div>
                    <div style={{height: "300px"}}>
                      {croppedImageUrl && (
                        <img
                          alt='Crop'
                          style={{
                            // maxWidth: "100%",
                            // position: "absolute",
                            top: "56px",
                            // left: "400px",
                            width: "200px",
                            borderRadius: "50%",
                            marginTop: "15px",
                          }}
                          src={croppedImageUrl}
                        />
                      )}
                    </div>

                    <div
                      style={{
                        marginTop: "30px",
                      }}
                    >
                      <button
                        onClick={this.onSubmit}
                        type='submit'
                        value='Upload'
                        className='btn btn-primary'
                        style={{ width: "70px", height: "35px", marginRight: "10px" }}
                        disabled={!enabled}
                      >
                        Upload
                      </button>     

                      <div onClick={closeUpload} className='btn btn-secondary'>
                        Cancel
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { addPicture })(
  withRouter(UploadAvatar)
);
