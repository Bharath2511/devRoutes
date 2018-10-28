//because we want to register a user through actions
import { GET_ERRORS } from "./types";
import axios from "axios";

//register USer
export const registerUser = userData => dispatch => {
  //dispatch something to reducer
  axios
    .post("/api/users/register", userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
