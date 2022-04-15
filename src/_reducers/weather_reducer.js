import { FETCH_WEATHER_DATA } from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_WEATHER_DATA:
      return { ...state, payload: action.payload };

    default:
      return state;
  }
}
