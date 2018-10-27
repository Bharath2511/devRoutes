import { TEST_DISPATCH } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  hello: "test"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        //we donot alter the state we just mutate it
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
