import { ICoord } from "./CityWeather.model";

export interface IBookmark {
  id: number;
  coord: ICoord;
  name: string;
  country: string;
}