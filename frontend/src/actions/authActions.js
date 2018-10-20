import { GET_ERRORS } from "./types";
import axios from "axios";

// actual functions
// Register function

export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(result => console.log(result.data))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};
