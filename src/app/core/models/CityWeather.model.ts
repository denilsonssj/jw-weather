export interface ICityWeather {
  city: ICity
  weather: IWeather;
}

export interface ICityDailyWeather {
  city: ICity;
  current: IWeather;
  daily: IDailyWeather[];
}

export interface ICity {
  id: number | undefined;
  name: string | undefined;
  country: string | undefined;
  coord: ICoord | undefined;
  timeZone: string | undefined;
}

export interface IWeather {
  id: number;
  description: string;
  icon: string;
  temp: number;
  minTemp: number | unknown;
  maxTemp: number | unknown;
  feelsLike: number;
  humidity: number;
  wind: IWind | undefined;
  sunrise: number;
  sunset: number;
}

export interface IDailyWeather {
  date: number;
  weather: IWeather;
}

export interface ICoord {
  lon: number;
  lat: number;
}

export interface IWind {
  speed: number;
  deg: number;
}