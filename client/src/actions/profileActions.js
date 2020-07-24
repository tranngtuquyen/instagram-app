import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

// Create Profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/profile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete profile and account
export const deleteAccount = (history) => (dispatch) => {
  console.log("delete ptofile action");
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        });
        history.push("/");
        //Remove token from localStorage otherwise after deleting account, on refreshing page --the navbar shows -- as token will still be there in headers and locastorage 
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};