import axios from "../../axiosInstance";

import * as actionTypes from "./actionTypes";

// GET TYPES //
export const typeStart = () => {
  return {
    type: actionTypes.TYPE_START
  };
};

export const typeSuccess = (types, userId) => {
  return {
    type: actionTypes.TYPE_SUCCESS,
    types: types,
    userId: userId
  };
};

export const typeFail = error => {
  return {
    type: actionTypes.TYPE_FAIL,
    error: error
  };
};

export const noTypesYet = () => {
  return {
    type: actionTypes.TYPES_NONE,
    types: [{ typename: "No types yet! Add one!", id: "" }] //i don't think this is an ideal permanent solution, but is fine for now!
  };
};

export const getProjectTypes = () => {
  return dispatch => {
    dispatch(typeStart());
    axios({
      method: "GET",
      url: `${window.apiHost}/getTypes`
    })
      .then(response => {
        if (response.data.length > 0) {
          dispatch(typeSuccess(response.data, response.data[0].userId));
        } else {
          console.log("types none ", response);
          dispatch(noTypesYet());
          console.log(
            "no types yet; here is where I could create a dummy type maybe??"
          );
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(typeFail("Error, please try again"));
      });
  };
};

export const clearProjectTypes = () => {
  return {
    type: actionTypes.TYPES_CLEAR
  };
};
