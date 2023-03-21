import { combineReducers } from "redux";

import laundry from "./laundry";
import auth from "./auth";

export const reducers = combineReducers({ laundry, auth });
