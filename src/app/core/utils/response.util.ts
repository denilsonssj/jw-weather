import { ICityWeather } from "../models/CityWeather.model";

export function responseToCityWheather(response: any): ICityWeather {
  return {
    city: {
      id: response.id,
      name: response.name,
      country: response.sys.country,
      coord: response.coord,
      timeZone: undefined,
    },
    weather: {
      id: response.weather[0].id,
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      temp: response.main.temp,
      minTemp: undefined,
      maxTemp: undefined,
      feelsLike: response.main.feels_like,
      humidity: response.main.humidity,
      wind: {
        speed: response.wind.speed,
        deg: response.wind.deg
      },
      sunrise: response.sys.sunrise,
      sunset: response.sys.sunset
    }
  };
}