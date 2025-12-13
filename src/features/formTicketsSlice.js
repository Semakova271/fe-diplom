import { createSlice } from "@reduxjs/toolkit";
import { parsedUrlString } from "../utils/trainSelectionUtils";

const search = parsedUrlString(window.location.search).formData;

const formSlice = createSlice({
  name: "formTickets",
  initialState: {
    name: "",
    status: false,
    formData:
      window.location.search === ""
        ? {
            status: false,
            from: { 
              date: null, 
              city: { _id: "", name: "" } // name тоже должно быть строкой
            },
            to: { 
              date: null, 
              city: { _id: "", name: "" }
            },
          }
        : {
            status: false,
            from: {
              date: search.date_start || null,
              city: { 
                _id: search.from_city_id || "", 
                name: search.from_city_name || "" 
              },
            },
            to: {
              date: search.date_end ? search.date_end : null,
              city: { 
                _id: search.to_city_id || "", 
                name: search.to_city_name || "" 
              },
            },
          },
  },
  reducers: {
    inputValue: (state, action) => {
      const { name } = action.payload;
      state.name = name;
    },
    setForm: (state, action) => {
      const { type, data, status } = action.payload;
      if (type === "startCity") state.formData.from.city = data;
      if (type === "finishCity") state.formData.to.city = data;
      if (type === "startDate") state.formData.from.date = data;
      if (type === "finishDate") state.formData.to.date = data;
      state.formData.status = status;
    },
    setReverseData: (state) => {
      const startCity = state.formData.to.city;
      const finishCity = state.formData.from.city;
      const startDate = state.formData.to.date;
      const finishDate = state.formData.from.date;
      
      state.formData.from.city = startCity;
      state.formData.to.city = finishCity;
      state.formData.from.date = startDate;
      state.formData.to.date = finishDate;
    },
    upDateForm: (state, action) => {
      const { data } = action.payload;
      state.formData = data;
    },
  },
});

export const { inputValue, setForm, setReverseData, upDateForm } =
  formSlice.actions;

export default formSlice.reducer;