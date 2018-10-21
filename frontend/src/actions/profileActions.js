import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from "./types";

// get current profile of user
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    ) // if profile is not found then return empty payload-data.
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
