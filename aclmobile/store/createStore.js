import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import uiReducer from "./reducers/ui";
import authReducer from "./reducers/auth";
import shipmentReducer from "./reducers/shipment";

const rootReducers = combineReducers({
  auth: authReducer,
  shipment: shipmentReducer,
  ui: uiReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
