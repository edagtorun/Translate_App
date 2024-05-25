import { configureStore } from "@reduxjs/toolkit";
import translateReducer from "./slices /translateSlice";
import languageReducer from "./slices /languageSlice";

export default configureStore({
  reducer: { languageReducer, translateReducer },
});
