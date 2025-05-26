import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  // disabling devtools in PROD
  devTools: process.env.ENVIRONMENT?.toLowerCase() !== "production"
});

const makeStore = () => store;

export { store };

export const wrapper = createWrapper(makeStore, {
  // disabling next-redux-wrapper stroe logs in PROD
  debug: process.env.ENVIRONMENT?.toLowerCase() !== "production"
});
