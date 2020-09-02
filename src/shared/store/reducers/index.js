import { combineReducers } from "redux";
import { default as buckets } from "./buckets";
import { default as todos } from "./todos";
export default combineReducers({ todos, buckets });
