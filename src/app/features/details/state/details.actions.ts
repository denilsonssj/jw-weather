import { createAction, props } from "@ngrx/store";

interface LoadWeatherDetailsSuccessProps {
  entity: any;
}

export const loadWeatherDetails = createAction(
  '[Details] Load Weather Details',
);

export const loadWeatherDetailsSuccess = createAction(
  '[Details] Load Weather Detail Success',
  props<LoadWeatherDetailsSuccessProps>(),
);

export const loadWeatherDetailsFailed = createAction(
  '[Details] Load Weather Detail Failed'
);