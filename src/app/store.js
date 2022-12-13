import { configureStore } from "@reduxjs/toolkit";

import formReducer from "../components/form/reduxSlice";
import productReducer from "../components/tabel/reduxSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    product: productReducer,
  },
});
