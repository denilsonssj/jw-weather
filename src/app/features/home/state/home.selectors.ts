import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IHomeState } from './home.reducer';

export const homeKey = 'home';

export const selectHomeState = createFeatureSelector<IHomeState>(homeKey);

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