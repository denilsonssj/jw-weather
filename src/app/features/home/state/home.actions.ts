import { createAction, props } from '@ngrx/store';
import { IBookmark } from 'src/app/core/models/Bookmark.model';

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

export const toggleBookmark = createAction(
  '[Home] Toggle Bookmark',
  props<{ entity: IBookmark }>(),
);

export const clearHomeState = createAction(
  '[Home] Clear Home State',
);

export const loadCurrentWeatherById = createAction(
  '[Home] Load Current Weather By Id',
  props<{ id: string }>(),
);