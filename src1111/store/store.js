import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "../features/myApi";
import { other } from "../features/otherApi";
import formReducer from "../features/formTicketsSlice";
import catalogTrainsReducer from "../features/catalogTrainsSlice";
import passengersReducer from "../features/passengersSlice";

const rtkMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware).concat(other.middleware);

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [other.reducerPath]: other.reducer,
    formTickets: formReducer,
    catalogTrains: catalogTrainsReducer,
    passengers: passengersReducer,
  },
  middleware: rtkMiddleware,
});
export default store;

setupListeners(store.dispatch);