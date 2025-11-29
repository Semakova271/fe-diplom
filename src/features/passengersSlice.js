import { createSlice } from "@reduxjs/toolkit";
import { getTotalPrice } from "../utils/WagonSelectionUtils";
const passengersSlice = createSlice({
  name: "passengers",
  initialState: {
    subscriber: "",
    passengers: [],
    contributor: {
      first_name: "",
      last_name: "",
      patronymic: "",
      phone: "",
      email: "",
      payment_method: "cash",
    },
    /* totalPrice: {
      items: [
        { type: "adult", count: 0, price: 0 },
        { type: "child", count: 0, price: 0 },
        { type: "child-no-seats", count: 0, price: 0 },
      ],
    },*/
    dataSeats: [
      {
        type: "adult",
        text: "Взрослых",
        count: 0,
        deskription: "Можно добавить ещё 3 пассажиров",
        seats: [],
        price: 0,
      },
      {
        type: "child",
        text: "Детских",
        count: 0,
        deskription:
          "Можно добавить ещё 3 детей до 10 лет.Своё место в вагоне, как у взрослых, но дешевле в среднем на 50-65% ",
        seats: [],
        price: 0,
      },
      {
        type: "child-no-seats",
        text: 'Детских "без места"',
        count: 0,
        limit: 3,
        seats: [],
        price: 0,
      },
    ],
    totalPrice: 0,
    totalCount: 0,
  },
  reducers: {
    setDataPassengers: (state, action) => {
      const { data } = action.payload;
      const copyState = state.passengers;

      if (data.seat) {
        const idx = copyState.findIndex((item) => {
          let res;
          if (
            item.seat.seats === data.seat.seats &&
            item.coach_id === data.coach_id
          ) {
            res = item;
          }
          return res;
        });

        idx === -1 ? copyState.push(data) : copyState.splice(idx, 1);
        state.passengers = copyState;
      }
      if (data.info && data.docs) {
        const idx = copyState.findIndex(
          (item) => item.seat.type === data.info.type && !item.dataPass
        );

        if (idx !== -1) copyState[idx].dataPass = data;
        else {
          const idx = copyState.findIndex(
            (item) =>
              item.seat.type === data.info.type &&
              item.dataPass.info.id === data.info.id
          );

          if (idx !== -1) copyState[idx].dataPass = data;
        }
      }
//let result = price.reduce((sum, current) => sum + current, 0);
      state.totalCount = state.passengers.length;
      state.totalPrice = getTotalPrice(state.passengers);
    },
    setTicketNoSeats: (state, action) => {
      const { count } = action.payload;
      state.dataSeats[2].count = count;
      state.dataSeats[2].limit = state.dataSeats[0].count;
    },
    setContributor: (state, action) => {
      const { data } = action.payload;
      state.contributor = data;
    },
    deletePassenger: (state, action) => {
      const { id } = action.payload;

      const idx = state.passengers.findIndex(
        (item) => item.dataPass.info.id === id
      );

      state.passengers[idx].dataPass = undefined;
      state.totalCount = state.passengers.length;
      state.totalPrice = getTotalPrice(state.passengers);
    },
    addSeats: (state, action) => {
      const { data, price } = action.payload;
console.log(data, 'data')
      const idx = state.dataSeats.findIndex((item) => item.type === data.type);

      const copySeats = state.dataSeats[idx].seats;
      // eslint-disable-next-line
      const seatsIndex = copySeats.findIndex((item) => {
        if (item.seats === data.seats && item.coach_id === data.coach_id) {
          return item;
        }
      });

      seatsIndex === -1
        ? copySeats.push(data)
        : copySeats.splice(seatsIndex, 1);
      const result = {
        ...state.dataSeats[idx],
        seats: copySeats,
        price: price,
        count: copySeats.length,
        limit: state.dataSeats[idx].limit - copySeats.length,
      };

      state.dataSeats[idx] = result;
      state.dataSeats[2].limit = state.dataSeats[0].count;
     
    },
    clearDataSeats: (state) => {
      const copySeats = state.dataSeats;
      const result = copySeats.map((item) => {
        return (item = { ...item, seats: [], count: 0 });
      });
      state.dataSeats = result;

      state.passengers = [];
      //
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    addSubscriber: (state, action) => {
      console.log(action.payload, "action.payload");
      const { data } = action.payload;
      state.subscriber = data;
    },
  },
});

export const {
  setDataPassengers,
  setContributor,
  deletePassenger,
  addSeats,
  clearDataSeats,
  addSubscriber,
  setTicketNoSeats,
} = passengersSlice.actions;

export default passengersSlice.reducer;
