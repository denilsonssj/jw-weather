import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IHomeState, homeKeyReducer } from './home.reducer';

export const selectHomeState = createFeatureSelector<IHomeState>(homeKeyReducer);

export const selectCurrentWeather = createSelector(
  selectHomeState,
  (homeState: IHomeState) => homeState.entity
);

export const selectCurrentWeatherLoading = createSelector(
  selectHomeState,
  (homeState: IHomeState) => homeState.loading
);

export const selectCurrentWeatherError = createSelector(
  selectHomeState,
  (homeState: IHomeState) => homeState.error
);