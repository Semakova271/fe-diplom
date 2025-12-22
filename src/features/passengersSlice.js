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
      payment_method: "", // Пусто - без умолчания
    },
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
      console.log("setDataPassengers called with data:", data);
      
      // Случай 1: Если есть data.seat (выбор места)
      if (data.seat) {
        const idx = state.passengers.findIndex((item) => {
          return item.seat?.seats === data.seat.seats && 
                 item.coach_id === data.coach_id;
        });

        if (idx === -1) {
          state.passengers.push(data);
        } else {
          state.passengers.splice(idx, 1);
        }
      }
      
      // Случай 2: Если есть data.info и data.docs (данные пассажира)
      if (data.info && data.docs) {
        console.log("Setting passenger data:", data);
        
        // Поиск по ID пассажира
        const passengerId = data.info.id;
        const existingIndex = state.passengers.findIndex(
          item => item.dataPass?.info?.id === passengerId
        );
        
        if (existingIndex >= 0) {
          // Обновляем существующего пассажира
          console.log(`Updating passenger ${passengerId} at index ${existingIndex}`);
          state.passengers[existingIndex].dataPass = data;
        } else {
          // Ищем пассажира без данных (только с местом)
          const idxWithoutData = state.passengers.findIndex(
            item => !item.dataPass && item.seat?.type === data.info.type
          );
          
          if (idxWithoutData >= 0) {
            // Добавляем данные к существующему пассажиру с местом
            console.log(`Adding data to passenger at index ${idxWithoutData}`);
            state.passengers[idxWithoutData].dataPass = data;
          } else {
            // Создаем нового пассажира с данными (но без места)
            console.log(`Creating new passenger with id ${passengerId}`);
            state.passengers.push({
              dataPass: data,
              seat: null,
              coach_id: null
            });
          }
        }
      }
      
      // Обновляем счетчики
      const passengersWithData = state.passengers.filter(p => p.dataPass);
      state.totalCount = passengersWithData.length;
      state.totalPrice = getTotalPrice(state.passengers);
      
      console.log("Updated passengers:", state.passengers);
      console.log("Total count:", state.totalCount);
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
        (item) => item.dataPass?.info?.id === id
      );

      if (idx >= 0) {
        // Удаляем данные пассажира, но оставляем место (если есть)
        state.passengers[idx].dataPass = undefined;
      }
      
      const passengersWithData = state.passengers.filter(p => p.dataPass);
      state.totalCount = passengersWithData.length;
      state.totalPrice = getTotalPrice(state.passengers);
    },
    
    addSeats: (state, action) => {
      const { data, price } = action.payload;
      console.log(data, 'data');

      const idx = state.dataSeats.findIndex((item) => item.type === data.type);

      const copySeats = state.dataSeats[idx].seats;
      const seatsIndex = copySeats.findIndex((item) => {
        return item.seats === data.seats && item.coach_id === data.coach_id;
      });

      if (seatsIndex === -1) {
        copySeats.push(data);
      } else {
        copySeats.splice(seatsIndex, 1);
      }
      
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
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    
    addSubscriber: (state, action) => {
      console.log(action.payload, "action.payload");
      const { data } = action.payload;
      state.subscriber = data;
    },
    
    updateAdultTicketsCount: (state, action) => {
      const { count } = action.payload;
      const adultTicket = state.dataSeats.find(item => item.type === "adult");
      if (adultTicket) {
        adultTicket.count = count;
      }
    },
    
    updateChildTicketsCount: (state, action) => {
      const { count } = action.payload;
      const childTicket = state.dataSeats.find(item => item.type === "child");
      if (childTicket) {
        childTicket.count = count;
      }
    },
    
    updatePassengersCount: (state) => {
      const total = state.dataSeats.reduce((total, item) => total + item.count, 0);
      state.totalCount = total;
    },

    // НОВЫЙ РЕДЬЮСЕР для инициализации пассажиров из выбранных мест
    initPassengersFromSeats: (state) => {
      console.log("Initializing passengers from seats...");
      
      // Создаем новый массив пассажиров
      const newPassengers = [];
      
      // Проходим по всем типам билетов
      state.dataSeats.forEach(ticketType => {
        // Для каждого выбранного места создаем пассажира
        ticketType.seats.forEach(seat => {
          newPassengers.push({
            seat: {
              seats: seat.seats,
              coach_id: seat.coach_id,
              price: seat.price,
              type: ticketType.type
            },
            coach_id: seat.coach_id,
            dataPass: null
          });
        });
      });
      
      state.passengers = newPassengers;
      console.log(`Created ${newPassengers.length} passengers from seats`);
    },
  },
});

// ЭКСПОРТИРУЕМ ВСЕ ДЕЙСТВИЯ
export const {
  setDataPassengers,
  setTicketNoSeats,
  setContributor,
  deletePassenger,
  addSeats,
  clearDataSeats,
  addSubscriber,
  updateAdultTicketsCount,
  updateChildTicketsCount,
  updatePassengersCount,
  initPassengersFromSeats,
} = passengersSlice.actions;

export default passengersSlice.reducer;