import {put, spawn, takeLatest} from 'redux-saga/effects'
import { getCities, getLast, getRoutes, getSeats, getSubcribe, sendOrder } from "../api";
import { 
    citiesFromListFailure,
    citiesFromListRequest,
    citiesFromListSuccess,
    citiesToListFailure,
    citiesToListRequest,
    citiesToListSuccess,
    lastRoutesFailure,
    lastRoutesRequest,
    lastRoutesSuccess,
    sortTrains,
    trainSeatsBackFailure,
    trainSeatsBackRequest,
    trainSeatsBackSuccess,
    trainSeatsRequest,
    trainSeatsSuccess,
    trainsListFailure,
    trainsListRequest, 
    trainsListSuccess
} from '../redux/slice/trainSlice';
import { 
    getSubscribeFailure, 
    getSubscribeRequest, 
    getSubscribeSuccess, 
    orderFailure, 
    orderRequest, 
    orderSuccess
} from '../redux/slice/passengersSlice';

function* handleGetCitiesFromSaga(action) {
    try {
        const data = yield getCities(action.payload);
        yield put(citiesFromListSuccess(data))
    } catch (e) {
        yield put(citiesFromListFailure(e.message))
    }
}

function* watchGetCitiesFromSaga() {
    yield takeLatest(citiesFromListRequest, handleGetCitiesFromSaga)
}

function* handleGetCitiesToSaga(action) {
    try {
        const data = yield getCities(action.payload);
        yield put(citiesToListSuccess(data))
    } catch (e) {
        yield put(citiesToListFailure(e.message))
    }
}

function* watchGetCitiesToSaga() {
    yield takeLatest(citiesToListRequest, handleGetCitiesToSaga)
}

function* handleGetTrainsSaga(action) {
    try { 
        const url = Object.entries(action.payload).map(entry => `${entry[0]}=${entry[1]}`).join('&')
        console.log(url)
        const data = yield getRoutes(url);
        console.log(data)
        yield put(trainsListSuccess(data))
    } catch (e) {
        yield put(trainsListFailure(e.message))
    }
}

function* watchGetTrainsSaga(){
    yield takeLatest(trainsListRequest, handleGetTrainsSaga)
}

function* handleGetLastRoutesSaga() {
    try {
        const data = yield getLast();
        yield put(lastRoutesSuccess(data));
    } catch (e) {
        yield put(lastRoutesFailure(e.message))
    }
}

function* watchGetLastRoutesSaga() {
    yield takeLatest(lastRoutesRequest, handleGetLastRoutesSaga)
}

function* handleSortTrainsSaga(action) {
    try { 
        const url = Object.entries(action.payload).map(entry => `${entry[0]}=${entry[1]}`).join('&')
        console.log(url)
        const data = yield getRoutes(url);
        console.log(data)
        yield put(trainsListSuccess(data))
    } catch (e) {
        yield put(trainsListFailure(e.message))
    }
}

function* watchSortTrainsSaga() {
    yield takeLatest(sortTrains, handleSortTrainsSaga)
}


function* handleGetTrainSeatsSaga(action) {
    try {
        const data = yield getSeats(action.payload);
        yield put(trainSeatsSuccess(data))
    } catch (e) {
        yield put(trainsListFailure(e.message));
    }
}

function* watchGetTrainSeatsSaga() {
    yield takeLatest(trainSeatsRequest, handleGetTrainSeatsSaga)
}

function* handleGetTrainSeatsBackSaga(action) {
    try {
        const data = yield getSeats(action.payload);
        yield put(trainSeatsBackSuccess(data))
    } catch (e) {
        yield put(trainSeatsBackFailure(e.message));
    }
}

function* watchGetTrainSeatsBackSaga() {
    yield takeLatest(trainSeatsBackRequest, handleGetTrainSeatsBackSaga)
}

function* handleGetSubscribeSaga(action) {
    try {
        const data = yield getSubcribe(action.payload);
        yield put(getSubscribeSuccess(data))
    } catch (e) {
        yield put(getSubscribeFailure(e.message))
    }
}

function* watchGetSubscribeSaga() {
    yield takeLatest(getSubscribeRequest, handleGetSubscribeSaga)
}

function* handleSendOrderSaga(action) {
    try {
        const data = yield sendOrder(action.payload)
        yield put(orderSuccess(data))
    } catch (e) {
        yield put(orderFailure(e.message))
    }
}

function* watchSendOrderSaga() {
    yield takeLatest(orderRequest, handleSendOrderSaga)
}

export default function* saga() { 
    yield spawn(watchGetCitiesFromSaga)
    yield spawn(watchGetCitiesToSaga)
    yield spawn(watchGetTrainsSaga)
    yield spawn(watchGetLastRoutesSaga)
    yield spawn(watchSortTrainsSaga)
    yield spawn(watchGetTrainSeatsSaga)
    yield spawn(watchGetTrainSeatsBackSaga)
    yield spawn(watchGetSubscribeSaga)
    yield spawn(watchSendOrderSaga)
}