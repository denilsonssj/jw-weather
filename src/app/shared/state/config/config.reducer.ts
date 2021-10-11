import { createReducer, on } from "@ngrx/store";

import { Unit } from "src/app/core/models/Unit.enum";
import { updateUnit } from "./config.actions";

export interface IConfigState  {
  unit: Unit;
}

export const configKeyName: string = 'config';

export const configInitialState: IConfigState = {
  unit: Unit.METRIC,
};

export const configReducer = createReducer(
  configInitialState,
  on(updateUnit, (state, { unit }) => ({
    ...state,
    unit,
  })),
);