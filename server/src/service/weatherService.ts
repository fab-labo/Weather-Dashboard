import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
class Weather {
  city: string 
  icon: string
  iconDescription: string 
  tempF: number
  windSpeed: number
  humidity: number
  date: Date

  constructor(
    city: string, 
    icon: string,
    iconDescription: string, 
    tempF: number,
    windSpeed: number,
    humidity: number,
    date: string,
  ) {
    this.city = city
    this.icon = icon
    this.iconDescription = iconDescription
    this.tempF = tempF
    this.windSpeed = windSpeed
    this.humidity = humidity
    this.date = new Date(date)
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = process.env.API_BASE_URL || '';
  private cityName: string = process.env.GEO_API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    try {
      const response = await fetch(`${this.cityName}?${query}`)
      return await response.json()
    } catch (error) {
      console.error(error)
      return {}
    }
  }
    // TODO: Create destructureLocationData method
    private destructureLocationData(locationData: any): Coordinates {
      return {
        latitude: locationData.coord.lat,
        longitude: locationData.coord.lon,
      };
    }
    
    // TODO: Create buildGeocodeQuery method
    private buildGeocodeQuery(): string {
      const urlEncodedCity = encodeURIComponent(this.cityName)
      return `q=${urlEncodedCity}&appid=${this.apiKey}`;
    }
    
    // TODO: Create buildWeatherQuery method
    private buildWeatherQuery(coordinates: Coordinates): string {
      return `lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&lang=en&appid=${this.apiKey}`;
    }
    
    // TODO: Create fetchAndDestructureLocationData method
    private async fetchAndDestructureLocationData(): Promise<Coordinates> {
      try {
        const query = this.buildGeocodeQuery();
        const locationData = await this.fetchLocationData(query);
        return this.destructureLocationData(locationData);    
      } catch (error) {
        console.error(error);
        return { latitude: 0, longitude: 0};
      }
    }
    
    // TODO: Create fetchWeatherData method
    private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
      try {
        const query = this.buildWeatherQuery(coordinates);
        const response = await fetch(`${this.baseURL}?${query}`);
        return await response.json();
      } catch (error) {
        console.error(error);
        return {};
    }};
    
    // TODO: Build parseCurrentWeather method
    private parseCurrentWeather(response: any) {
      try {
        const { list } = response; 
        return new Weather(
          this.cityName, 
          list[0].weather[0].icon,
          list[0].weather[0].description,
          list[0].main.temp,
          list[0].wind.speed,
          list[0].main.humidity,
          list[0].dt_txt
        )
      } catch (error) {
        console.error(error)
        return new Weather ("","","", 0, 0, 0, new Date().toString());
      }
    }
    
    // TODO: Complete buildForecastArray method
    private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
      try {
        const forecastArray: Weather[] = [currentWeather]
        for (let i = 1; i < weatherData.length; i += 8) {
          const { weather, main, wind, dt_txt } = weatherData[i]
          forecastArray.push(
            new Weather(
              this.cityName,
              weather[0].icon,
              weather[0].description,
              main.temp,
              wind.speed,
              main.humidity,
              dt_txt
            )
          );
      }
      return forecastArray;
    } catch (error) {
      console.error(error);
      return [];
    }}
    
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city: string): Promise<Weather[]> {
      try {
        this.cityName = city
        const coordinates = await this.fetchAndDestructureLocationData();
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        return this.buildForecastArray(currentWeather, weatherData.list);
      } catch (error) {
        console.error(error);
        return [];
      }
    }};
  
  export default new WeatherService();