import { GET_ERRORS } from "./types";
import axios from "axios";

// actual functions
// Register function

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(result => {
      history.push("/login");
      console.log(result.data);
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Login user and get token to store it in local storage

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(results => {
      // save token to local storage
      const { token } = res.data;

      // set token to ls-only stores strings
      localStorage.setItem("jwtToken", token);

      // set token to authorization
      setAuthToken(token);
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};
