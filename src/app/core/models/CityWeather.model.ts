export interface ICityWeather {
  city: ICity
  weather: IWeather
}

export interface ICityDailyWeather {
  city: ICity
  current: IWeather
  daily: IDailyWeather[];
}

export interface ICity {
  id: number;
  name: string;
  country: string;
  coord: ICoord;
  timeZone: string | undefined;
}

export interface IWeather {
  id: number;
  description: string;
  icon: string;
  temp: number;
  minTemp: number | undefined;
  maxTemp: number | undefined;
  feelsLike: number;
  humidity: number;
  wind: IWind;
  sunrise: number;
  sunset: number;
}

export interface IDailyWeather {
  date: number;
  weather: IWeather
}

export interface ICoord {
  lon: number;
  lat: number;
}

export interface IWind {
  speed: number;
  deg: number;
}