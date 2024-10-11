import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./slices/budget/budget.slice";
export const store = configureStore({
  reducer: {
    budget: budgetReducer,
  },
});
