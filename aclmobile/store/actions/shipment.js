import axios from "../../axios/default";
import { Alert } from "react-native";

//Auth Constants
export const SET_SHIPMENT_FILTER = "SET_SHIPMENT_FILTER";
export const SET_SHIPMENT_FILTER_MONTHLY = "SET_SHIPMENT_FILTER_MONTHLY";
export const SHIPMENT_START = "SHIPMENT_START";
export const SHIPMENT_START_1 = "SHIPMENT_START_1";
export const SHIPMENT_FAIL = "SHIPMENT_FAIL";
export const SHIPMENT_SUCCESS = "SHIPMENT_SUCCESS";
export const SHIPMENT_DAILY_SUCCESS = "SHIPMENT_DAILY_SUCCESS";
export const SHIPMENT_MONTHLY_SUCCESS = "SHIPMENT_MONTHLY_SUCCESS";
export const RIDER_PERFORMANCE_SUCCESS = "RIDER_PERFORMANCE_SUCCESS";
export const SHIPMENT_CLEAR = "SHIPMENT_CLEAR";
export const IMAGE_UPLOAD_SUCCESS = "IMAGE_UPLOAD_SUCCESS";
export const SHIPMENT_MONTHLY_LOAD_MORE_SUCCESS =
  "SHIPMENT_MONTHLY_LOAD_MORE_SUCCESS";
export const SHIPMENT_DAILY_LOAD_MORE_SUCCESS =
  "SHIPMENT_DAILY_LOAD_MORE_SUCCESS";
export const SHIPMENT_OUTGOING_SUCCESS = "SHIPMENT_OUTGOING_SUCCESS";
export const SHIPMENT_OUTGOING_DETAIL_SUCCESS =
  "SHIPMENT_OUTGOING_DETAIL_SUCCESS";

//Error Handler
import alertHandler from "../../utils/alertHandler";
import { toM } from "../../utils/utility";

//Axios Config
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//Set Filter Daily
export const setFilter = (date) => {
  return {
    type: SET_SHIPMENT_FILTER,
    date,
  };
};

//Set Filter Monthly
export const setFilterMonthly = (month, year) => {
  return {
    type: SET_SHIPMENT_FILTER_MONTHLY,
    month,
    year,
  };
};

//Clear AWB Detail
export const clearShipment = () => {
  return {
    type: SHIPMENT_CLEAR,
  };
};

//Load Shipment By Awb
export const shipmentByAwb = (awbNumber) => async (dispatch) => {
  const data = {
    awbNumber,
  };

  try {
    dispatch(start());
    const request = await axios.post("api/v1/shipment/by-awb", data, config);
    dispatch(success(request.data.shipment));
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

//Load Shipment Daily
export const shipmentDaily = () => async (dispatch, getState) => {
  const filters = getState().shipment.filters;
  const rider = getState().auth.user;

  const data = {
    rider: rider.Rider_Name,
    date: filters.date,
    status: "all",
    page: 1,
  };

  try {
    dispatch(start());
    const request = await axios.post("api/v1/shipment/by-date", data, config);
    dispatch(dailySuccess(request.data.shipments));
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

//Load More Shipment Daily
export const shipmentDailyLoadMore = (page) => async (dispatch, getState) => {
  const shipment = getState().shipment;
  const total = shipment.dailyTotal;
  const filters = shipment.filters;
  const rider = getState().auth.user;

  const data = {
    rider: rider.Rider_Name,
    date: filters.date,
    status: "all",
    page,
    total,
  };

  try {
    dispatch({ type: "UI_LOADING_START" });
    const request = await axios.post("api/v1/shipment/by-date", data, config);
    dispatch({
      type: SHIPMENT_DAILY_LOAD_MORE_SUCCESS,
      next: request.data.next,
      shipments: request.data.shipments,
    });
    dispatch({ type: "UI_RESET" });
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

//Load Shipment Monthly
export const shipmentMonthly = () => async (dispatch, getState) => {
  const filters = getState().shipment.filters;
  const rider = getState().auth.user;

  const data = {
    rider: rider.Rider_Name,
    month: toM(filters.month),
    year: filters.year,
    status: "all",
    page: 1,
  };

  try {
    dispatch(start());
    const request = await axios.post("api/v1/shipment/by-month", data, config);
    dispatch(monthlySuccess(request.data.next, request.data.shipments));
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

//Load More Monthly
export const shipmentMonthlyLoadMore = (page) => async (dispatch, getState) => {
  const shipment = getState().shipment;
  const total = shipment.monthlyTotal;
  const filters = shipment.filters;
  const rider = getState().auth.user;

  const data = {
    rider: rider.Rider_Name,
    month: toM(filters.month),
    year: filters.year,
    status: "all",
    page,
    total,
  };

  try {
    dispatch({ type: "UI_LOADING_START" });
    const request = await axios.post("api/v1/shipment/by-month", data, config);
    dispatch({
      type: SHIPMENT_MONTHLY_LOAD_MORE_SUCCESS,
      total: request.data.total,
      next: request.data.next,
      shipments: request.data.shipments,
    });
    dispatch({ type: "UI_RESET" });
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

export const changeAwbStatus = (awbNumber, status) => async (dispatch) => {
  const data = { awbNumber, status };

  try {
    dispatch({ type: "UI_LOADING_START" });
    await axios.post("api/v1/shipment/change-status", data, config);
    dispatch({ type: "UI_SUCCESS" });
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

export const changeAwbStatusWithReason =
  (awbNumber, status, reason, taskId) => async (dispatch, getState) => {
    const rider = getState().auth.user.Rider_Name;
    const data = { awbNumber, status, reason, rider, taskId };

    try {
      dispatch({ type: "UI_LOADING_START" });
      await axios.post(
        "api/v1/shipment/change-status-with-reason",
        data,
        config
      );
      dispatch({ type: "UI_SUCCESS" });
    } catch (err) {
      alertHandler("Ops!", err.request.data.error);
      dispatch(fail(err.request.data.error));
    }
  };

//Load Outgoings
export const shipmentOutgoings = (awbNumber) => async (dispatch) => {
  const data = { awbNumber };

  try {
    dispatch(start1());
    const request = await axios.post("api/v1/shipment/outgoings", data, config);
    dispatch(outgoingsSuccess(request.data.outgoings));
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

//Load Outgoing Detail
export const shipmentOutgoingDetail = (taskID) => async (dispatch) => {
  const data = { taskID };

  try {
    dispatch(start());
    const request = await axios.post(
      "api/v1/shipment/outgoing-detail",
      data,
      config
    );
    dispatch(outgoingDetailSuccess(request.data.outgoing));
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

//Rider Performance
export const riderPerformance = (rider) => async (dispatch) => {
  const data = {
    rider,
  };

  try {
    dispatch(start());
    const request = await axios.post(
      "api/v1/shipment/rider-performance",
      data,
      config
    );
    dispatch(performanceSuccess(request.data.performance));
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

//Shipment Document Upload
export const shipmentUpload = (id, photoURI, location) => async (dispatch) => {
  const data = new FormData();
  data.append("id", id);
  data.append("location", JSON.stringify(location));
  data.append("photo", {
    type: "image/jpg",
    uri: photoURI,
    name: `${id}.jpg`,
  });

  try {
    dispatch({
      type: "UI_LOADING_START",
    });
    await axios.post("api/v1/shipment/upload-document", data, {
      "Content-Type": "multipart/form-data",
    });
    dispatch({ type: "UI_SUCCESS" });
    Alert.alert("Upload Success", "Berhasil mengupload document");
  } catch (err) {
    alertHandler("Ops!", err.request.data.error);
    dispatch(fail(err.request.data.error));
  }
};

const start = () => {
  return {
    type: SHIPMENT_START,
  };
};

const start1 = () => {
  return {
    type: SHIPMENT_START_1,
  };
};

const success = (shipment) => {
  return {
    type: SHIPMENT_SUCCESS,
    shipment,
  };
};

const dailySuccess = (shipments) => {
  return {
    type: SHIPMENT_DAILY_SUCCESS,
    shipments,
  };
};

const monthlySuccess = (next, shipments) => {
  return {
    type: SHIPMENT_MONTHLY_SUCCESS,
    next,
    shipments,
  };
};

const outgoingsSuccess = (outgoings) => {
  return {
    type: SHIPMENT_OUTGOING_SUCCESS,
    outgoings,
  };
};

const outgoingDetailSuccess = (outgoing) => {
  return {
    type: SHIPMENT_OUTGOING_DETAIL_SUCCESS,
    outgoing,
  };
};

const performanceSuccess = (performance) => {
  return {
    type: RIDER_PERFORMANCE_SUCCESS,
    performance,
  };
};
