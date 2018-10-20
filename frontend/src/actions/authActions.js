import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

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
      const { token } = results.data;

      // set token to ls-only stores strings
      localStorage.setItem("jwtToken", token);

      // set token to authorization
      setAuthToken(token);
      // Decode token here to decrypt user's info
      const decoded = jwt_decode(token);
      // decode object will get all user information

      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
