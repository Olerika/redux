import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCity } from '../actions/index';
import { v4 } from 'node-uuid';

function convertToCelsius(degK) {
    return Math.round(degK - 273.15);
}
class WeatherList extends Component {

	renderWeather(cityData) {
    //set uniq API_KEY
    const id = v4();

		const name = cityData.name;
  	const temps = parseInt(convertToCelsius(cityData.main.temp));
    const sing = temps > 0 ? `+` : ``;
    const tempC = `${sing}${temps}°C`;
		const pressures = cityData.weather[0].description;
		const humidities = cityData.weather[0].icon;

		// const lon = cityData.city.coord.lon;
		// const lat = cityData.city.coord.lat;
		//ES6 Destructuring: lon, lat must be same in coord object.
		const { lon, lat } = cityData.coord;

		return (
      <div className='items_item' key={id}>
        <h3>{name}</h3>
        <ul>
          <li>temp: {tempC}</li>
  				<li>description: {pressures} </li>
        </ul>
        <i>
            <button className="btn delete" onClick={() => this.props.deleteCity(cityData.id)}>Delete</button>
        </i>
			</div>
		)
	}
	render() {
		return(
      <div className='items'>
          {this.props.weather.map(this.renderWeather, this)}
      </div>
		);
	}
}

//old syntax
// function mapStateToProps(state) {
// 	return {
// 		weather: state.weather;
// 	}
// }

//ES6 SYNTAX
//same as const weather = state.weather
function mapStateToProps({ weather }) {
	return { weather };
}

function mapDispatchToProps(dispatch) { return bindActionCreators({deleteCity}, dispatch) }

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);
