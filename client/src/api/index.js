import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

export const getInventory = () => API.get("/inventry");
export const getAllInventory = () => API.get("/inventry/getInventryName");

export const createInventory = (newinventory) => API.post("/inventry", newinventory);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
