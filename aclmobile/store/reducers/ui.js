//Utils
import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UI_LOADING_START":
      return setStart(state, action);
    case "UI_SUCCESS":
      return setSuccess(state, action);
    case "UI_RESET":
      return setReset(state, action);
    default:
      return state;
  }
};

const setStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    success: false,
    error: null,
  });
};

const setSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    success: true,
  });
};

const setReset = (state, action) => {
  return updateObject(state, {
    loading: false,
    success: false,
    error: null,
  });
};

export default reducer;
