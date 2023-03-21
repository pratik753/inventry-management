import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (laundry = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...laundry, action.payload];
    case "CLEAR":
      return [];
    default:
      return laundry;
  }
};
