import { combineReducers } from "redux";
import login from "./login/reducer";
import company from "./company/reducer";

export default combineReducers({
  user: login,
  company,
});
