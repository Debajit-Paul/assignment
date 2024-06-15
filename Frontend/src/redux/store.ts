import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./feature/carSlice";

const store = configureStore({
  reducer: {
    car: carReducer,
  },
});

export default store;
