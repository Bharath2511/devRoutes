//because we want to register a user through actions
import { GET_ERRORS } from "./types";
import axios from "axios";

//register USer
export const registerUser = (userData, history) => dispatch => {
  //dispatch something to reducer
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
