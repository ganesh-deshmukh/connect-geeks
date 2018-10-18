// only functional component.

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Find-Geeks</h1>
                <p className="lead">
                  {" "}
                  Create a Geek/Coder portfolio, share Tech-News, showcase your
                  work, projects and <br /> grow Network with other Geeks.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
