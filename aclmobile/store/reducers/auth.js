import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  REG_CHECK_PHONE_SUCCESS,
  REG_PASSWORD_SUCCESS,
} from "../actions/auth";

import { updateObject } from "../../utils/utility";

const initialState = {
  //Auth
  loading: false,
  token: null,
  user: null,
  error: null,
  //Driver Registration
  rider: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return setLoading(state, action);
    case AUTH_FAIL:
      return setError(state, action);
    case AUTH_SUCCESS:
      return setUser(state, action);
    case REG_CHECK_PHONE_SUCCESS:
      return setRider(state, action);
    case REG_PASSWORD_SUCCESS:
      return updateObject(state, {
        rider: null,
        loading: false,
      });
    case AUTH_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

const setLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const setError = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const setUser = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.token,
    user: action.user,
  });
};

const setRider = (state, action) => {
  return updateObject(state, {
    loading: false,
    rider: action.rider,
  });
};

const logout = (state, action) => {
  return updateObject(state, initialState);
};

export default reducer;
