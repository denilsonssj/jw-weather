import { createFeatureSelector, createSelector } from "@ngrx/store";

import { detailsKeyName, IDetailsState } from "./details.reducer";

export const selectDetailsState =
  createFeatureSelector<IDetailsState>(detailsKeyName);

export const selectDetailsEntity = createSelector(
  selectDetailsState,
  (details: IDetailsState) => details.entity,
);

export const selectDetailsLoading = createSelector(
  selectDetailsState,
  (details: IDetailsState) => details.loading,
);

export const selectDetailsError = createSelector(
  selectDetailsState,
  (details: IDetailsState) => details.error,
);