import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../../img/circle.png';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import "./signup.css"; 

function Signup (props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");
  const [handle, setHandle] = useState("");

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    switch(name) {
      case "name":
        return setName(value);
      case "email":
        return setEmail(value);
      case "handle":
        return setHandle(value);
      case "password":
        return setPassword(value);
      case "password2":
        return setPassword2(value);
    }
  }

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors])

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,      
      password: password,
      password2: password2,
      handle: handle,
    };

    props.signupUser(newUser, props.history);
  }

  const enabled = name.length > 0 ;
  return (
    <div className='margin' style={{marginHeight: "90vh"}}>
      <div className='d-flex flex-column'>
        <div className='card'>
          <div className='card-body'>
            <img className='logo' src={logo} alt='instagram' />
            <p className='info'>
              Sign up to see photos and videos from your friends.
            </p>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name,
                  })}
                  placeholder='Full Name'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
                {errors.name && (
                  <div className='invalid-feedback'>{errors.name}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.handle,
                  })}
                  placeholder='Username'
                  name='handle'
                  value={handle}
                  onChange={onChange}
                />
                {errors.handle && (
                  <div className='invalid-feedback'>{errors.handle}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames("form-control form-control-lg", {
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
                  className={classnames("form-control form-control-lg", {
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
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password2,
                  })}
                  placeholder='Password2'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                />
                {errors.password2 && (
                  <div className='invalid-feedback'>{errors.password2}</div>
                )}
              </div>
              <input
                type='submit'
                value='Sign up'
                disabled={!enabled}
                className='authButton'
              />
            </form>
            <br />
            <p className='terms'>
              By signing up,you agree to our{" "}
              <b>Terms, Data Policy and Cookies Policy.</b>
            </p>

            <p className='more-info'>
              Have an Account? &nbsp;
              <span>
                <Link to='/'>Log in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps, { signupUser })(withRouter(Signup));