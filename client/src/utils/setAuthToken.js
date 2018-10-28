//setting a default header for axios
import axios from "axios";
//if we are logged in its always gonna attach authorix=zation error
const setAuthToken = token => {
  if (token) {
    //apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete the auth header if token isn't there
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
