import { TEST_DISPATCH } from "./types";

//register USer
export const registerUser = userData => {
  //dispatch something to reducer
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
