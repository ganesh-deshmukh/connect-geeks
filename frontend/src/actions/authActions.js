import { TEST_DISPATCH } from "./types";

// actual functions
// Register function

export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
