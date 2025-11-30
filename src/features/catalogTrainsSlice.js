import { createSlice } from "@reduxjs/toolkit";

const catalogTrainsSlice = createSlice({
  name: "catalogTrains",
  initialState: {
    id: "",

    searchData: {
      travelData: {
        from: { date: null, city: { _id: "", name: "" } },
        to: { date: null, city: { _id: "", name: "" } },
      },
      parameters: {
        sort: { type: "date", text: "времени" },
        limit: 5,
        offset: 0,
      },
      trainsParameters: {
        have_first_class: false,
        have_second_class: false,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: false,
        have_air_conditioning: false,
        have_express: false,
        price_from: 500,
        price_to: 9000,
        start_departure_hour_from: 0, //Час отбытия от (число)
        start_departure_hour_to: 24, //Час отбытия до (число)
        start_arrival_hour_from: 0, //Час прибытия от (число)
        start_arrival_hour_to: 24, //Час прибытия до (число)
        end_departure_hour_from: 0, //Час отбытия назад от (число)
        end_departure_hour_to: 24, //Час отбытия назад до (число)
        end_arrival_hour_from: 0, //Час прибытия назад от (работает при установленном параметре date_end)
        end_arrival_hour_to: 24, //Час прибытия назад до (работает при установленном параметре date_end)
      },
    },
    seleсtedTrain: null,
    dataWagons: {},
  },
  reducers: {
    setDataRequest: (state, action) => {
      const { data } = action.payload;
      state.searchData.travelData = data;
    },
    setParameters: (state, action) => {
      const { sort, limit, offset } = action.payload;

      if (sort) state.searchData.parameters.sort = sort;
      if (limit) state.searchData.parameters.limit = limit;
      if (offset >= 0) state.searchData.parameters.offset = offset;
    },
    setTrainsParameters: (state, action) => {
      const { data } = action.payload;

      if (data.name === "price") {
        state.searchData.trainsParameters.price_from = data.value.price_from;
        state.searchData.trainsParameters.price_to = data.value.price_to;
      } else if (data.name === "start_departure") {
        state.searchData.trainsParameters.start_departure_hour_from =
          data.value.start_departure_hour_from;
        state.searchData.trainsParameters.start_departure_hour_to =
          data.value.start_departure_hour_to;
      } else if (data.name === "start_arrival") {
        state.searchData.trainsParameters.start_arrival_hour_from =
          data.value.start_arrival_hour_from;
        state.searchData.trainsParameters.start_arrival_hour_to =
          data.value.start_arrival_hour_to;
      } else if (data.name === "end_departure") {
        state.searchData.trainsParameters.end_departure_hour_from =
          data.value.end_departure_hour_from;
        state.searchData.trainsParameters.end_departure_hour_to =
          data.value.end_departure_hour_to;
      } else if (data.name === "end_arrival") {
        state.searchData.trainsParameters.end_arrival_hour_from =
          data.value.end_arrival_hour_from;
        state.searchData.trainsParameters.end_arrival_hour_to =
          data.value.end_arrival_hour_to;
      } else {
        for (let key in state.searchData.trainsParameters) {
          if (key.includes(data.name)) {
            state.searchData.trainsParameters[key] = data.status;
          }
        }
      }
    },
    setTrainsList(state, action) {
      const { data } = action.payload;

      state.searchTrainsItems = data;
    },
    setTrainId(state, action) {
      const { id } = action.payload;
      state.id = id;
    },
    setSelectionTrain(state, action) {
      const { data } = action.payload;
      state.seleсtedTrain = data;
    },
    setDataWagons(state, action) {
      const { data } = action.payload;
      state.dataWagons = data;
    },
    upDateCatalog(state, action) {
      const { data } = action.payload;

      state.searchData.travelData = data.formData;
      state.searchData.trainsParameters = data.trainsParameters;
      state.searchData.parameters.limit = data.parameters.limit;
      state.searchData.parameters.offset = data.parameters.offset;
      state.searchData.parameters.sort =
        data.parameters.sort === "date"
          ? { type: "date", text: "времени" }
          : data.parameters.sort === "min_price"
          ? { type: "price", text: "стоимости" }
          : { type: "duration", text: "длительности" };
    },
  },
});

export const {
  setTrainsList,
  setParameters,
  setDataRequest,
  setTrainId,
  setSelectionTrain,
  setDataWagons,
  setTrainsParameters,
  upDateCatalog,
} = catalogTrainsSlice.actions;

export default catalogTrainsSlice.reducer;
