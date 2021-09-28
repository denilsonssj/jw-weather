import { createAction, props } from '@ngrx/store';

interface IChangeTextActionProps {
  query: string;
}

export const loadCurrentWeather = createAction(
  '[Home] Load Current Weather',
  props<IChangeTextActionProps>(),
);

export const loadCurrentWeatherSuccess = createAction(
  '[Weather API] Load Current Weather Success',
  props<{ entity: any }>(),
);

export const loadCurrentWeatherFailed = createAction(
  '[Weather API] Load Current Weather Failed',
);