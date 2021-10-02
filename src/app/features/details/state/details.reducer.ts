import { createReducer, on, Action } from "@ngrx/store";

import { ICityDailyWeather } from "src/app/core/models/CityWeather.model";
import { 
  loadWeatherDetails,
  loadWeatherDetailsFailed,
  loadWeatherDetailsSuccess 
} from "./details.actions";

export interface IDetailsState {
  entity: ICityDailyWeather | undefined;
  loading: boolean;
  error: boolean;
}

export const detailsKeyName: string = 'details';

export const detailsInitialState: IDetailsState = {
  entity: undefined,
  loading: false,
  error: false,
};

const reducer = createReducer(
  detailsInitialState,
  on(loadWeatherDetails, state => ({
    ...state,
    loading: true,
    error: false
  })),
  on(loadWeatherDetailsSuccess, (state, { entity }) => ({
    ...state,
    entity,
    loading: false,
    error: false
  })),
  on(loadWeatherDetailsFailed, state => ({
    ...state,
    entity: undefined,
    loading: false,
    error: true
  })),
);

export function detailsReducer(state: IDetailsState | undefined, action: Action) {
  return reducer(state, action);
}