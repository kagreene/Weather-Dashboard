import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object

class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private APIKey?: string;
  cityName?: string;
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.APIKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  //Use geocoding to get coordinates

  // TODO: Create fetchLocationData method

  private async fetchLocationData(query: string) {
    try {
      console.log(query)
      const response = await fetch(query)
      const locationData = await response.json();
      console.log(locationData)
      return locationData
    } catch (err) {
      console.log('Error fetching location data', err);
      return err
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const lat = locationData[0].lat;
    const lon = locationData[0].lon;
    return { lat, lon }
  }
  // TODO: Create buildGeocodeQuery method

  private buildGeocodeQuery(): string {
    const response = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.APIKey}`
    return response
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const lat = coordinates.lat
    const lon = coordinates.lon
    const query = `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.APIKey}`
    return query
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    try {
      const query = this.buildGeocodeQuery();
      console.log("Query", query)
      const locationData = await this.fetchLocationData(query);
      console.log(locationData)
      const coordinates: Coordinates = await this.destructureLocationData(locationData);
      console.log(coordinates)
      return coordinates;
    } catch (err) {
      console.log(`Error fetching and destructuring data`, err);
      throw err;
      //return err;
    }

  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const weatherQuery = this.buildWeatherQuery(coordinates);
      const response = await fetch(weatherQuery);
      const weatherData = response.json();
      // console.log(weatherQuery,weatherData)
      return weatherData;
    } catch (err) {
      console.log('Error fetching weather data');
    }
  }
  // TODO: Build parseCurrentWeather method

  private parseCurrentWeather(response: any, city: string): Weather {
    try {
      console.log("parseCurrentWeather", response)
      const date = response.list[0].dt_txt;
      const icon = response.list[0].weather[0].icon;
      const iconDescription = response.list[0].weather[0].description;
      const tempF = response.list[0].main.temp;
      const windSpeed = response.list[0].wind.speed;
      const humidity = response.list[0].main.humidity;
      const currentWeather = new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity);
      return currentWeather;
    } catch (err) {
      console.log('Error fetching weather data', err);
      throw err;
    }
  }
  // TODO: Complete buildForecastArray method

  private buildForecastArray(currentWeather: Weather, weatherData: any[], city: string): Weather[] {
    console.log("Buidfor", currentWeather);
    let day :string= weatherData[0].dt_txt.split(" ")[0]
    const forecastArray: Weather[] = [currentWeather]

    weatherData.forEach((data:any) => {
      if (data.dt_txt.split(" ")[0] !== day) {
        const date = data.dt_txt;
        const icon = data.weather[0].icon;
        const iconDescription = data.weather[0].description;
        const windSpeed = data.wind.speed;
        const tempF = data.main.temp; 
        const humidity = data.main.humidity;
        day = data.dt_txt.split(" ")[0];
        forecastArray.push(new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity))
      }
    });
      return forecastArray;
  }
    //forecastArray = weatherData.map((data: any) => {
     // if (data.dt_txt.split(" ")[0] !== day) {
    //    const date = data.dt_txt;
     //   const icon = data.weather[0].icon;
     //   const iconDescription = data.weather[0].description;
     //   const windSpeed = data.wind.speed;
      //  const tempF = data.main.temp;
      //  const humidity = data.main.humidity;
       // day = data.dt_txt.split(" ")[0]
       // return new Weather(city, date, icon, iconDescription, tempF, windSpeed, humidity);
      //}
     
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      this.cityName = city
      console.log(this.cityName)
      //call Fetch & Destructure location data
      const coordinates: Coordinates = await this.fetchAndDestructureLocationData()
      //then pass result into parseCurrentWeather
      //Fix coordinates thing
      const weatherData = await this.fetchWeatherData(coordinates)
      const weather = await this.parseCurrentWeather(weatherData, city)
      //console.log(weather,weatherData)
      ////pass that result into buildForescastArray
      //need result for Weather and result for WeatherData ()
      const forecast = this.buildForecastArray(weather, weatherData.list, city)
      console.log("Forecast", forecast, weatherData)
      return forecast
    }
    catch (err) {
      console.log('Error', err);
      throw err;
    }
  }
}

export default new WeatherService();