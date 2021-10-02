import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ICustomRouteState, routerKeyName } from "./router.reducer";

const selectRouterReducerState = 
  createFeatureSelector<RouterReducerState<ICustomRouteState>>(routerKeyName);

export const selectRouterState = createSelector(
  selectRouterReducerState,
  (routerReducerState: RouterReducerState<ICustomRouteState>) =>
    (routerReducerState && routerReducerState.state) || {},
);

export const selectRouterQueryParams = createSelector(
  selectRouterState,
  (routerState: ICustomRouteState) =>
    (routerState && routerState.queryParams) || {},
);