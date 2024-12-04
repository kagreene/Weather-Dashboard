import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number; 
}
// TODO: Define a class for the Weather object

class Weather {
  date: string;
  weatherConditions: string; 
  temperature: number;
  windSpeed: number;
  humidity: number;

  constructor(date: string, weatherConditions: string, temperature: number, windSpeed: number, humidity: number){
    this.date = date;
    this.weatherConditions = weatherConditions;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private APIKey?: string;
  cityName: string;
    constructor(cityName: string){
      this.baseURL = process.env.API_BASE_URL || '';
      this.APIKey = process.env.API_KEY || '';
      this.cityName = cityName;
    }

  //Use geocoding to get coordinates

  // TODO: Create fetchLocationData method

  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(query)
      const locationData = await response.json();
      return locationData
    } catch (err) {
      console.log('Error fetching location data', err);
      return err
    }
  }
  // TODO: Create destructureLocationData method
 private destructureLocationData(locationData: any): Coordinates {
      const lat = locationData[0].lat;
      const lon = locationData[0].long;
      return {lat, lon}
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
      const locationData = await this.fetchLocationData(query);
      const coordinates = await this.destructureLocationData(locationData);
      return coordinates;
    } catch (err) {
      console.log(`Error fetching and destructuring data`, err);
      return err;
    }

   }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    const weatherData = response.json();
    return weatherData;
    } catch (err) {
      console.log('Error fetching weather data');
    }
  } 
  // TODO: Build parseCurrentWeather method

 private parseCurrentWeather(response: any): Weather {
  try {const date = response.list[0].dt_txt;
  const weatherConditions = response.list[0].weather[0].icon;
  const temperature = response.list[0].main.temp;
  const windSpeed = response.list[0].wind.speed;
  const humidity = response.list[0].main.humidity;
  const currentWeather = new Weather( date, weatherConditions, temperature, windSpeed, humidity);
  return currentWeather;
  } catch (err) {
    console.log('Error fetching weather data', err);
    throw err;
  }
 }
  // TODO: Complete buildForecastArray method
 
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = weatherData.map((data: any) => {
      const date = data.list.dt_txt;
      const weatherConditions = data.list.weather.icon;
      const temperature = data.list.main.temp;
      const windSpeed = data.list.wind.speed;
      const humidity = data.list.main.humidity;
      return new Weather(date, weatherConditions, temperature, windSpeed, humidity);
    })
    forecastArray.unshift(currentWeather);
    return forecastArray
   }
  // TODO: Complete getWeatherForCity method
 async getWeatherForCity(city: string) {
  try {
    //call Fetch & Destructure location data
    const coordinates: Coordinates = await this.fetchAndDestructureLocationData()
    //then pass result into parseCurrentWeather
    //Fix coordinates thing
    const weatherData = await this.fetchWeatherData(coordinates)
    const weather = await this.parseCurrentWeather(weatherData)
    //pass that result into buildForescastArray
    //need result for Weather and result for WeatherData ()
    const forecast = this.buildForecastArray(weather, weatherData)
    return forecast
  }
  catch (err) {
    console.log('Error', err);
    throw err;
  }
 }
}

export default new WeatherService();
