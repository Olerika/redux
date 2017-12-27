import { FETCH_WEATHER, DELETE_CITY } from '../actions/index';

import { loadState, saveState } from '../store/localStorage';
export default function(state = [], action) {
	//npm install: redux-promise stopped the action and once request finished it dispatches new action with payload of resolved request.

	switch (action.type) {

		case FETCH_WEATHER:
			//concat returns a new instance of state. .push will manipulate the state, which we don't want.
			// return state.concat([ action.payload.data ]); //old way
			// return [ action.payload.data, ...state]; //ES6 returns [city, city, city] taking exising array, flattern out to make a new one.

      //concat to prevent state mutation
      saveState(state);
      return state.concat([action.payload.data]);

      case DELETE_CITY: {
        saveState(state.filter(city => city.id !== action.payload));
        return  state.filter(city => city.id !== action.payload);
      }
  }
	return state;
}
