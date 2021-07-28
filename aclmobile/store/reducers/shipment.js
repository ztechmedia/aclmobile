//Constants
import {
  SET_SHIPMENT_FILTER,
  SET_SHIPMENT_FILTER_MONTHLY,
  SHIPMENT_DAILY_SUCCESS,
  SHIPMENT_MONTHLY_SUCCESS,
  SHIPMENT_SUCCESS,
  SHIPMENT_START,
  SHIPMENT_START_1,
  SHIPMENT_FAIL,
  RIDER_PERFORMANCE_SUCCESS,
  SHIPMENT_CLEAR,
  SHIPMENT_MONTHLY_LOAD_MORE_SUCCESS,
  SHIPMENT_DAILY_LOAD_MORE_SUCCESS,
  SHIPMENT_OUTGOING_DETAIL_SUCCESS,
  SHIPMENT_OUTGOING_SUCCESS,
} from "../actions/shipment";
//Utils
import { toMonth, updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  loading1: false,
  filters: {
    date: new Date(),
    month: toMonth(new Date().getMonth() + 1),
    year: new Date().getFullYear(),
  },
  shipmentsDaily: null,
  dailyNextPage: null,
  dailyTotal: 0,
  shipmentsMonthly: null,
  monthlyNextPage: null,
  monthlyTotal: 0,
  shipment: null,
  riderPerformance: null,
  outgoings: null,
  outgoingDetail: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIPMENT_START:
      return setStart(state, action);
    case SHIPMENT_START_1:
      return setStart1(state, action);
    case SET_SHIPMENT_FILTER:
      return setFilter(state, action);
    case SET_SHIPMENT_FILTER_MONTHLY:
      return setFilterMonthly(state, action);
    case SHIPMENT_DAILY_SUCCESS:
      return setShipmentDaily(state, action);
    case SHIPMENT_MONTHLY_SUCCESS:
      return setShipmentMonthly(state, action);
    case SHIPMENT_SUCCESS:
      return setShipment(state, action);
    case RIDER_PERFORMANCE_SUCCESS:
      return riderPerformance(state, action);
    case SHIPMENT_MONTHLY_LOAD_MORE_SUCCESS:
      return setShipmentMonthlyLoadMore(state, action);
    case SHIPMENT_DAILY_LOAD_MORE_SUCCESS:
      return setShipmentDailyLoadMore(state, action);
    case SHIPMENT_OUTGOING_DETAIL_SUCCESS:
      return setOutgoingDetail(state, action);
    case SHIPMENT_OUTGOING_SUCCESS:
      return setOutgoings(state, action);
    case SHIPMENT_CLEAR:
      return clearShipment(state, action);
    case SHIPMENT_FAIL:
      return setFail(state, action);
    default:
      return state;
  }
};

const setStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const setStart1 = (state, action) => {
  return updateObject(state, {
    loading1: true,
    error: null,
  });
};

const setFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const setShipment = (state, action) => {
  return updateObject(state, {
    shipment: action.shipment,
    loading: false,
    error: null,
  });
};

const clearShipment = (state, action) => {
  return updateObject(state, {
    shipment: null,
  });
};

const setShipmentDaily = (state, action) => {
  return updateObject(state, {
    shipmentsDaily: action.shipments,
    loading: false,
    error: null,
  });
};

const setShipmentDailyLoadMore = (state, action) => {
  return updateObject(state, {
    shipmentsDaily: [...state.shipmentsDaily, ...action.shipments],
    dailyNextPage: action.next,
  });
};

const setShipmentMonthly = (state, action) => {
  return updateObject(state, {
    shipmentsMonthly: action.shipments,
    monthlyNextPage: action.next,
    loading: false,
    error: null,
  });
};

const setOutgoingDetail = (state, action) => {
  return updateObject(state, {
    outgoingDetail: action.outgoing,
    loading: false,
    error: null,
  });
};

const setShipmentMonthlyLoadMore = (state, action) => {
  return updateObject(state, {
    shipmentsMonthly: [...state.shipmentsMonthly, ...action.shipments],
    monthlyNextPage: action.next,
    monthlyTotal: action.total,
  });
};

const setOutgoings = (state, action) => {
  return updateObject(state, {
    outgoings: action.outgoings,
    loading1: false,
    error: null,
  });
};

const riderPerformance = (state, action) => {
  return updateObject(state, {
    riderPerformance: action.performance,
    loading: false,
    error: null,
  });
};

const setFilter = (state, action) => {
  return updateObject(state, {
    filters: updateObject(state.filters, { date: action.date }),
    loading: false,
  });
};

const setFilterMonthly = (state, action) => {
  return updateObject(state, {
    filters: updateObject(state.filters, {
      month: action.month,
      year: action.year,
    }),
    loading: false,
  });
};

export default reducer;
