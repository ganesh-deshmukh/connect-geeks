const initialState = {
  isAuthenticated: false,
  user: {},
  Hello_state: "testing"
};

export default function(state = initialState, action) {
  switch (action.type) {
    // eg. case SET_CURRENT_USER :
    default:
      return state;
  }
}
