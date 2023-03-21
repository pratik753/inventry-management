import { FETCH_ALL, CREATE } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getInventory = () => async (dispatch) => {
  try {
    const { data } = await api.getAllInventory();
    // dispatch({ type: FETCH_ALL, payload: data });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createInventory = (post) => async (dispatch) => {
  try {
    const { data } = await api.createInventory(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
