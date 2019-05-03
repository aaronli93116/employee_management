import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import managerReducer from "./managerReducer";

const reducers = combineReducers({
  employeeReducer,
  managerReducer
});

export default reducers;
