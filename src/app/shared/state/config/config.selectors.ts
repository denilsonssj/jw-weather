import { createFeatureSelector, createSelector } from "@ngrx/store";

import { configKeyName, IConfigState } from "./config.reducer";

export const selectConfigState =
  createFeatureSelector<IConfigState>(configKeyName);

export const selectUnitConfig = createSelector(
  selectConfigState,
  (configState: IConfigState) => configState.unit,
);