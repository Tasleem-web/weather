import { combineReducers } from "redux";
import weather from "./weather_reducer.js";

const rootReducer = combineReducers({
  weather,
});

export default rootReducer;
