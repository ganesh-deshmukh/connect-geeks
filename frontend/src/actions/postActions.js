import axios from "axios";

import { ADD_POST, GET_ERRORS } from "./types";

// Add our posts now,

export const addPost = postData => dispatch => {
  // dispatch method to make asynchronous request
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
