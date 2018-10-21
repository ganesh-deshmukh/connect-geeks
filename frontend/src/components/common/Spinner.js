import spinner from "./spinner.gif";

import React from "react";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "250px", margin: "auto", display: "block" }}
        alt="Please Wait..."
      />
    </div>
  );
};
