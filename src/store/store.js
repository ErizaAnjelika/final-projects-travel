import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/loginSlice";
import registerReducer from "../reducer/registerslice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});

console.log("store", store);
