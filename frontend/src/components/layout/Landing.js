// only functional component.

import React from "react";

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
                <a href="register.html" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </a>
                <a href="login.html" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
