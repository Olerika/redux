import axios from 'axios';

const API_KEY = 'ae457d20dff5c761de104cbb45d23af4';
// const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + API_KEY; //original way
const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather`; //ES6 way

//export it to keep action types consistent between action reducers and action creators.
export const FETCH_WEATHER = 'FETCH_WEATHER';
export const DELETE_CITY = 'DELETE_CITY';

//action creator: always returns an object with a type. Takes in user inputted city.
export function fetchWeather(city) {
	const url =`${ROOT_URL}?q=${city}&appid=${API_KEY}`;
	//npm install axios - used for making ajax like requests.
	//the request returns a promise.
	const request = axios.get(url);
	return {
		type: FETCH_WEATHER,
		//payload contains additional data that describes the acction.
		payload: request
	};
}

//Delete Cities
export function deleteCity(id) {
    return {
        type: DELETE_CITY,
        payload: id
    }
}

//Load Cities
export function loadCity(id) {
    let localState = localStorage.getItem('id');
    return {
        type: LOAD_CITY,
        payload: id
    }
}
