import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../img/circle.png";
import mobile from "../../img/mobile.png";
import classnames from 'classnames';
import "./login.css"; 
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from 'prop-types';

function Login (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/home');
    }
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.auth, props.errors]);
  

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
    props.loginUser(user);
  }

  const enabled = email.length > 0 && password.length > 0;
  return (
    <div className='margin' style={{marginHeight: "90vh"}}>
      <img className='mobile d-none d-xl-block d-md-block' src={mobile} />
      <div className='d-flex flex-column height'>
        <div className='card'>
          <div className='card-body'>
            <img className='logo' src={logo} alt='instagram' />
            <br />
            <br />
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  id='myText'
                  className={classnames("form-control", {
                    "is-invalid": errors.email,
                  })}
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames("form-control ", {
                    "is-invalid": errors.password,
                  })}
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
                {errors.password && (
                  <div className='invalid-feedback'>{errors.password}</div>
                )}
              </div>

              <input
                type='submit'
                value='Log In'
                disabled={!enabled}
                className='authButton'
              />
            </form>
            <br />
            <div>
              <hr id='one' />
              <span id='or'>OR</span>
              <hr id='two' />
            </div>
            <br />
            <p className='more-info'>
              Don't have an account? &nbsp;
              <span>
                <Link to='/signup'>Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
Login.propTypes = {
 loginUser: PropTypes.func.isRequired,
 errors: PropTypes.object.isRequired,
 auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
