const { RESTDataSource } = require('apollo-datasource-rest');

class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=chennai&appid=36e7bbbb4ce89be60781903189fcc5f1';
  }

  async getClimate() {
    //return this.get(`weather?q=${cityname}&appid=36e7bbbb4ce89be60781903189fcc5f1`);
    //const response = await this.get(`http://api.openweathermap.org/data/2.5/weather?q=chennai&appid=36e7bbbb4ce89be60781903189fcc5f1`);
    const data = await this.get(``);
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