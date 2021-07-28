import axios from "../../axios/default";
import {
  saveDataToStorage,
  removeDataFromStorage,
  getDataFromStorage,
} from "../../utils/utility";
import * as NavigationServices from "../../services/navigation/NavigationServices";

//Error Handler
import alertHandler from "../../utils/alertHandler";

//Auth Constants
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
//Register Constants
export const REG_CHECK_PHONE_SUCCESS = "REG_CHECK_PHONE_SUCCESS";
export const REG_PASSWORD_SUCCESS = "REG_PASSWORD_SUCCESS";

//Axios Config
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//Check Phone
export const checkPhone = (phone) => async (dispatch) => {
  const data = { phone };

  try {
    dispatch(start());
    const request = await axios.post("api/v1/auth/check-phone", data, config);
    dispatch(checkPhoneSuccess(request.data.rider));
    NavigationServices.navigate("DriverRegDetail");
  } catch (err) {
    alertHandler("Ops!", err.response.data.error);
    dispatch(fail(err.response.data.error));
  }
};

//Generate Driver Password
export const setDriverPassword = (phone) => async (dispatch) => {
  const data = { phone };
  try {
    dispatch(start());
    const request = await axios.post(
      "api/v1/auth/create-driver-password",
      data,
      config
    );
    dispatch({
      type: REG_PASSWORD_SUCCESS,
    });
    alertHandler("Sukses!", request.data.message);
    NavigationServices.navigate("ShipmentLogin");
  } catch (err) {
    alertHandler("Ops!", err.response.data.error);
    dispatch(fail(err.response.data.error));
  }
};

//Login Action
export const login = (phone, password) => async (dispatch) => {
  const data = {
    phone,
    password,
  };

  try {
    dispatch(start());
    const request = await axios.post("api/v1/auth/login", data, config);
    await saveDataToStorage("@user", {
      token: request.data.token,
      user: request.data.user,
    });
    dispatch(success(request.data.token, request.data.user));
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${request.data.token}`;
    NavigationServices.navigate("ShipmentTracker");
  } catch (err) {
    alertHandler("Ops!", err.response.data.error);
    dispatch(fail(err.response.data.error));
  }
};

//Check Auth State if Appliation Reopen
export const checkState = () => async (dispatch) => {
  const userData = await getDataFromStorage("@user");

  if (!userData) {
    dispatch(logout());
  } else {
    const { token, user } = userData;
    dispatch(success(token, user));
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    NavigationServices.navigate("ShipmentTracker");
  }
};

//Destroy Auth State
export const logout = () => async (dispatch) => {
  delete axios.defaults.headers.common["authorization"];
  await removeDataFromStorage("@user");
  dispatch({
    type: AUTH_LOGOUT,
  });
  NavigationServices.navigate("Auth");
};

//Set Auth Loading
const start = () => {
  return {
    type: AUTH_START,
  };
};

//Set Token & User Data to Reducer
const success = (token, user) => {
  return {
    type: AUTH_SUCCESS,
    token,
    user,
  };
};

//Set Rider
const checkPhoneSuccess = (rider) => {
  return {
    type: REG_CHECK_PHONE_SUCCESS,
    rider,
  };
};

//Set Error to Reducer
const fail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};
