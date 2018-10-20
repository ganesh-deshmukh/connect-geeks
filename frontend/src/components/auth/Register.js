import React, { Component } from "react";
// import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  // each field will have it's state.
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    // we want to prevent origional behaviour of form. i.e. form-action= submit-values.

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // instead of making requests through `axios` library,
    //  we can make request to store through dispatching action
    this.props.registerUser(newUser);

    // axios- alternative way.
    //   .post("/api/users/register", newUser)
    //   .then(result => console.log(result.data))
    //   .catch(error => this.setState({ errors: error.response.data }));
  }

  render() {
    const { errors } = this.state;
    // const errors = this.state.errors;  // both syntax are same.

    const { user } = this.props.auth;

    return (
      <div>
        <div className="register">
          {user ? user.name : null}
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto border border-warning">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your Find-Geeks account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name // add this class, only if you have name error
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name} </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email // add this class, only if you have email error
                      })}
                      placeholder="Email Address"
                      value={this.state.email}
                      name="email"
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email} </div>
                    )}
                    <small className="form-text text-muted">
                      Preferably use that email, which has Profile-Picture on
                      Account.
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password // add this class, only if you have password error
                      })}
                      placeholder="Password"
                      value={this.state.password}
                      name="password"
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password} </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2 // add this class, only if you have password2 error
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">
                        {errors.password2}{" "}
                      </div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth // props:store.state.value
});
export default connect(
  mapStateToProps,
  { registerUser }
)(Register);

// registerUser is action to take and connect it with component Register.
