import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allSeats: {
        departure: [],
        arrival: []
    },
    totalPrice: 0,
    totalPriceBack: 0,
    passengers: [],
    personalData: {
        name: '',
        surname: '',
        secondName: '',
        mail: '',
        telephone: '',
        payment: '' 
    },
    email: '',
    loading: false,
    success: null,
    error: null,
    train: {},
    seats: [
    {
        type: 'adult',
        count: 0,
        seats: [],
        price: 0
    },
    {
        type: 'child',
        count: 0,
        seats: [],
        price: 0,
    },
    {
        type: 'child_no_eats',
        count: 0,
        seats: [],
        price: 0
    }
   ],
   seatsBack: [
    {
        type: 'adult',
        count: 0,
        seats: [],
        price: 0
    },
    {
        type: 'child',
        count: 0,
        seats: [],
        price: 0,
    },
    {
        type: 'child_no_eats',
        count: 0,
        seats: [],
        price: 0
    }
   ],
   order: null,
   loadingOrder: false,
   errorOrder: null,
   successOrder: null
}

export const passengersSlice = createSlice({
    name: 'passengers',
    initialState, 
    reducers: {
        setCountNoSeats: (state, action) => {
            state.seats[2].count = action.payload;
        },
        setCountNoSeatsBack: (state, action) => {
            state.seatsBack[2].count = action.payload;
        }, 
        addSeat: (state, action) => {
            const { data } = action.payload;
            const index = state.seats.findIndex(item => item.type === data.type);
            const selectSeats = state.seats[index].seats;
            const indexSeat = state.seats[index].seats.findIndex(seat => {
                if (seat.seat_id === data.seat_id && seat.vagon_id === data.vagon_id) {
                    return seat;
                }
                return -1;
            });
            if (indexSeat === -1) {
                selectSeats.push(data);
            } else {
                selectSeats.splice(indexSeat, 1);
            }
            state.seats[index] = {
                ...state.seats[index],
                seats: selectSeats,
                count: selectSeats.length,
                price: selectSeats.map(item => item.price).reduce((sum, current) => Number(sum) + Number(current), 0)
            };
        },
        addSeatBack: (state, action) => {
            const { data } = action.payload;
            const index = state.seatsBack.findIndex(item => item.type === data.type);
            const selectSeats = state.seatsBack[index].seats;
            const indexSeat = state.seatsBack[index].seats.findIndex(seat => {
                if (seat.seat_id === data.seat_id && seat.vagon_id === data.vagon_id) {
                    return seat;
                }
                return -1;
            });
            if (indexSeat === -1) {
                selectSeats.push(data);
            } else {
                selectSeats.splice(indexSeat, 1);
            }
            state.seatsBack[index] = {
                ...state.seatsBack[index],
                seats: selectSeats,
                count: selectSeats.length,
                price: selectSeats.map(item => item.price).reduce((sum, current) => Number(sum) + Number(current), 0)
            };
        },
        setData: (state, action) => {
            const { data } = action.payload;
            if (data.seat) {
                const index = state.allSeats.departure.findIndex((item) => {
                    if (item.seat.seat_id === data.seat.seat_id && item.id === data.id) {
                        return item;
                    }
                    return -1;
                });
                if (index === -1) {
                    state.allSeats.departure = [...state.allSeats.departure.concat(data)];
                } else {
                    const seats = state.allSeats.departure;
                    seats.splice(index, 1);
                    state.allSeats.departure = seats;
                }
            }
            state.totalPrice = state.allSeats.departure.map(item => item.seat.price).reduce((sum, current) => Number(sum) + Number(current), 0);
        },
        setTrain: (state, action) => {
            state.train = action.payload;
        },
        setDataBack: (state, action) => {
            const { data } = action.payload;
            if (data.seat) {
                const index = state.allSeats.arrival.findIndex((item) => {
                    if (item.seat.seat_id === data.seat.seat_id && item.id === data.id) {
                        return item;
                    }
                    return -1;
                });
                if (index === -1) {
                    state.allSeats.arrival = [...state.allSeats.arrival.concat(data)];
                } else {
                    const seats = state.allSeats.arrival;
                    seats.splice(index, 1);
                    state.allSeats.arrival = seats;
                }
            }
            state.totalPriceBack = state.allSeats.arrival.map(item => item.seat.price).reduce((sum, current) => Number(sum) + Number(current), 0);
        },
        addPassengers: (state, action) => {
            const { data } = action.payload;
            const index = state.passengers.findIndex(item => item.id === data.id);
            if (index === -1) {
                state.passengers = [...state.passengers.concat(data)];
            } else {
                const persons = state.passengers;
                persons.splice(index, 1);
                persons.push(data);
                state.passengers = persons;
            }
        },
        deletePassenger: (state, action) => {
            const { id } = action.payload;
            const passengers = state.passengers;
            const index = passengers.findIndex(item => item.id === id);
            if (index !== -1) {
                passengers.splice(index, 1); // Исправлено: было indexSeat, должно быть index
                state.passengers = passengers;
            }
        },
        setPersonalData: (state, action) => {
            const { data } = action.payload;
            state.personalData = data;
        },
        getSubscribeRequest: (state, action) => {
            state.email = action.payload;
            state.loading = true;
        },
        getSubscribeSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        getSubscribeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderRequest: (state, action) => {
            state.order = action.payload;
            state.loadingOrder = true;
            state.errorOrder = false;
        },
        orderFailure: (state, action) => {
            state.loadingOrder = false;
            state.errorOrder = action.payload;
        },
        orderSuccess: (state, action) => {
            state.successOrder = action.payload;
            state.errorOrder = false;
            state.loadingOrder = false;
            state.seats = [
                {
                    type: 'adult',
                    count: 0,
                    seats: [],
                    price: 0
                },
                {
                    type: 'child',
                    count: 0,
                    seats: [],
                    price: 0,
                },
                {
                    type: 'child_no_eats',
                    count: 0,
                    seats: [],
                    price: 0
                }
            ];
            state.seatsBack = [
                {
                    type: 'adult',
                    count: 0,
                    seats: [],
                    price: 0
                },
                {
                    type: 'child',
                    count: 0,
                    seats: [],
                    price: 0,
                },
                {
                    type: 'child_no_eats',
                    count: 0,
                    seats: [],
                    price: 0
                }
            ];
            state.allSeats = {
                departure: [],
                arrival: []
            };
            state.passengers = [];
        },
        orderResult: (state) => {
            state.successOrder = null;
            state.totalPrice = 0;
            state.totalPriceBack = 0;
            state.personalData = {
                name: '',
                surname: '',
                secondName: '',
                mail: '',
                telephone: '',
                payment: '' 
            };
        }
    }
});

export const {
    setCountNoSeats,
    setCountNoSeatsBack,
    addSeat,
    addSeatBack,
    setData,
    setDataBack,
    setTrain,
    addPassengers,
    deletePassenger,
    setPersonalData,
    getSubscribeRequest,
    getSubscribeSuccess,
    getSubscribeFailure,
    orderRequest,
    orderFailure,
    orderSuccess,
    orderResult
} = passengersSlice.actions;

export default passengersSlice.reducer;