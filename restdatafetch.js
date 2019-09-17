const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config()


class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.openweathermap.org/data/2.5/';
  }

  async getClimate(cityName) {
    const data = await this.get(`weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`);
    return data;
  }

  async getMostViewedMovies(limit = 10) {
    const data = await this.get('movies', {
      per_page: limit,
      order_by: 'most_viewed',
    });
    return data.results;
  }
}

module.exports = WeatherAPI;