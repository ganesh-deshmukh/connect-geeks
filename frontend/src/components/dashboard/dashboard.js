import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has created it's profile or not, by checking empty or null.

      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        // User is logged in but hasn't  created profile, so create it now!
        dashboardContent = (
          <div>
            <p className="lead text-muted">Hello, {user.name},</p>
            <p>
              You haven't created your Geek/Coder Profile, please add your info.
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile Now!
            </Link>
          </div>
        );
      }
    } // end of else-loop

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// delcare proptypes
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

// mapping state-from-redux to props of Dashboard
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

// connect Dashboard to Redux-store ()
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);