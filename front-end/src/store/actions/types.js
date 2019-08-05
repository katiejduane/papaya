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
