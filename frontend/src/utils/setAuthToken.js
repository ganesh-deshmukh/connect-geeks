// import axios from "axios";

// // attach token with each request in header

// const setAuthToken = token => {
//   if (token) {
//     // then apply that token to each request, if not then you are not autorized and get token first.

//     axios.defaults.headers.common["Authorization"] = token;
//   } else {
//     // no token
//     //  then delete auth head
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };

// export default setAuthToken;
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
