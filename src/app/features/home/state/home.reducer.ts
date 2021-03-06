import { createReducer, Action, on } from "@ngrx/store";

import {
  clearHomeState,
  loadCurrentWeather,
  loadCurrentWeatherById,
  loadCurrentWeatherFailed,
  loadCurrentWeatherSuccess 
} from "./home.actions";

export interface IHomeState {
  entity: any;
  loading: boolean;
  error: boolean;
}

export const homeInitialState: IHomeState = {
  entity: undefined,
  loading: false,
  error: false,
};

export const homeKeyReducer: string = 'home';

const reducer = createReducer(
  homeInitialState,
  on(clearHomeState, () => homeInitialState),
  on(
    loadCurrentWeather,
    loadCurrentWeatherById
    ,state => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(loadCurrentWeatherSuccess, (state, { entity }) => ({
    ...state,
    entity,
    loading: false,
  })),
  on(loadCurrentWeatherFailed, state => ({
    ...state,
    loading: false,
    error: true
  })),
);

export function homeReducer(state: IHomeState | undefined, action: Action) {
  return reducer(state, action);
}
