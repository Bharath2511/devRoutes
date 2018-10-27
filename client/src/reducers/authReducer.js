const initialState = {
  isAuthenticated: false,
  user: {},
  hello: "test"
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
