import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    // const errors = this.state.errors;  // both syntax are same.

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto border border-warning">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your Find-Geeks account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="Preferably use that email, which has Gravatar/Profile-Picture on
                    Account."
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="Confirm &amp; Match Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, // props:store.state.value
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

// registerUser is action to take and connect it with component Register.
